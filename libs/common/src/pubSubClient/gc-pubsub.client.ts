import {
  GCPubSub,
  GooglePubSubOptions,
  PubSubFactory,
  Transport,
} from '@algoan/pubsub';
import { Logger } from '@nestjs/common';
import {
  ClientProxy,
  ReadPacket,
  WritePacket,
  IncomingResponse,
} from '@nestjs/microservices';
// import { ERROR_EVENT, MESSAGE_EVENT } from '@nestjs/microservices/constants';

export type GCPubSubClientOptions = GooglePubSubOptions & {
  messageMetadataKey?: string;
};

export class GCPubSubClient extends ClientProxy {
  protected logger: Logger = new Logger(GCPubSubClient.name);
  protected pubSub?: GCPubSub;

  private readonly options?: GCPubSubClientOptions;

  constructor(options?: GCPubSubClientOptions) {
    super();
    this.options = options;
    this.initializeSerializer(options);
    this.initializeDeserializer(options);
  }

  public async connect(): Promise<GCPubSub> {
    const isPubSubInstanceExisting: boolean = this.pubSub !== undefined;

    if (this.options?.debug === true) {
      this.logger.debug(
        {
          isPubSubInstanceExisting,
        },
        `Trying to connect to the Google PubSub Client Proxy`,
      );
    }

    if (isPubSubInstanceExisting) {
      return;
    }

    this.pubSub = PubSubFactory.create({
      transport: Transport.GOOGLE_PUBSUB,
      options: this.options,
    });

    // this.pubSub.client
    //   .subscription('gateway-sub')
    //   .on(MESSAGE_EVENT, async (message: Message) => {
    //     await this.handleResponse(message.data);
    //     message.ack();
    //   })
    //   .on(ERROR_EVENT, (err: any) => this.logger.error(err));
    // return this.pubSub;
  }

  public async handleResponse(data: Buffer) {
    const rawMessage = JSON.parse(data.toString());
    const { err, response, isDisposed, id } = this.deserializer.deserialize(
      rawMessage,
    ) as IncomingResponse;
    const callback = this.routingMap.get(id);
    if (!callback) {
      return;
    }

    if (err || isDisposed) {
      return callback({
        err,
        response,
        isDisposed,
      });
    }
    callback({
      err,
      response,
    });
  }

  public async close(): Promise<void> {
    if (this.options?.debug === true) {
      this.logger.debug('Closing the GooglePubSubClient Proxy');
      if (this.pubSub !== undefined) {
        await this.pubSub.client.close();
      }
      this.pubSub = undefined;
    }
  }

  public async dispatchEvent(_packet: ReadPacket): Promise<any> {
    if (this.pubSub === undefined) {
      return undefined;
    }

    const opts: { metadata?: { [key: string]: string } } = {};
    if (
      this.options?.messageMetadataKey !== undefined &&
      _packet.data[this.options?.messageMetadataKey] !== undefined
    ) {
      opts.metadata = _packet.data[this.options?.messageMetadataKey];
      // tslint:disable-next-line: no-dynamic-delete
      delete _packet.data[this.options?.messageMetadataKey];
    }

    const pattern: string = this.normalizePattern(_packet.pattern);
    if (this.options?.debug === true) {
      this.logger.debug(
        {
          pattern,
          data: _packet.data,
          opts,
        },
        'Emitting an event through the GCPubSubClient',
      );
    }

    return this.pubSub.emit(pattern, _packet.data, opts);
  }

  public publish(
    partialPacket: ReadPacket,
    callback: (packet: WritePacket) => any,
  ): () => void {
    try {
      const packet = this.assignPacketId(partialPacket);

      const topic = this.normalizePattern(partialPacket.pattern);

      const serializedPacket = this.serializer.serialize(packet);
      this.routingMap.set(packet.id, callback);
      this.pubSub.emit(topic, serializedPacket);
      return () => this.routingMap.delete(packet.id);
    } catch (err) {
      callback({ err });
    }
  }
}
