import { Test } from '@nestjs/testing';
import { OrdersRepository } from '../orders.repository';
import { Order, OrderSchema } from '../schemas/order.schema';
import { ordersStub } from './stubs/orders.stub';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { connections } from 'mongoose';
import * as Joi from 'joi';

jest.mock('../orders.repository');

describe('OrdersRepository', () => {
  let ordersRepository: OrdersRepository;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required(),
            PORT: Joi.number().required(),
          }),
          envFilePath: './apps/orders/.env',
        }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
      ],
      providers: [OrdersRepository],
    }).compile();

    ordersRepository = app.get<OrdersRepository>(OrdersRepository);
    jest.clearAllMocks();
  });

  describe('find', () => {
    describe('When find is called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersRepository.find({});
      });

      test('Then it should call the find', () => {
        expect(ordersRepository.find).toHaveBeenCalled();
      });

      test('Then it should return orders', () => {
        expect(orders).toEqual([ordersStub()]);
      });
    });
  });

  describe('create', () => {
    describe('When create is called', () => {
      let order: Order;

      beforeEach(async () => {
        order = await ordersRepository.create(ordersStub());
      });

      test('Then it should call the create', () => {
        expect(ordersRepository.create).toHaveBeenCalledWith(ordersStub());
      });

      test('Then it should return order', () => {
        expect(order).toEqual(ordersStub());
      });
    });
  });

  describe('findOne', () => {
    describe('When findOne is called', () => {
      let order: Order;
      const id = ordersStub()._id;

      beforeEach(async () => {
        order = await ordersRepository.findOne(id);
      });

      test('Then it should call the findOne', () => {
        expect(ordersRepository.findOne).toHaveBeenCalledWith(id);
      });

      test('Then it should return order', () => {
        expect(order).toEqual(ordersStub());
      });
    });
  });

  afterAll(() => {
    connections[1].close();
  });
});
