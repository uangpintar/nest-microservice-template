import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, KafkaOptions } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.configService.get<string>('CLIENT_ID'),
          brokers: [this.configService.get<string>('BROKERS')],
        },
        consumer: {
          groupId: this.configService.get<string>('GROUP_ID'),
        },
      },
    };
  }
}
