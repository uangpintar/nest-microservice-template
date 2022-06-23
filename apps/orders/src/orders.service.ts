import { Injectable, Inject } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderRequest } from './dto/create-order.request';
import { Span } from 'nestjs-ddtrace';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject('PUBSUB_CLIENT') private readonly client: ClientProxy,
  ) {}

  @Span()
  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = this.ordersRepository.create(request, { session });

      this.client.emit('orders-topic', {
        request,
        Authentication: authentication,
      }),
        await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  @Span()
  async getOrders() {
    return this.ordersRepository.find({});
  }
}
