import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model, Connection } from 'mongoose';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  constructor(
    @InjectModel(Order.name) orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
    @InjectPinoLogger(OrdersRepository.name)
    protected readonly logger: PinoLogger,
  ) {
    super(orderModel, connection, logger);
  }
}
