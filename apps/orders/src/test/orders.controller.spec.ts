import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { AuthModule, DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Order } from '../schemas/order.schema';
import { ordersStub } from './stubs/orders.stub';
import { connections } from 'mongoose';

jest.mock('../orders.service');

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
        AuthModule,
      ],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
    ordersService = app.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  describe('getOrders', () => {
    describe('When getOrders is called', () => {
      let orders;

      beforeEach(async () => {
        orders = await ordersController.getOrders();
      });

      test('Then it should call ordersService', () => {
        expect(ordersService.getOrders).toBeCalled();
      });

      test('Then it should return orders', () => {
        expect(orders).toEqual([ordersStub()]);
      });
    });
  });

  describe('createOrder', () => {
    describe('When createOrder is called', () => {
      let orderCreated;
      let createOrderDto;

      beforeEach(async () => {
        const callOrdersStub = ordersStub();
        createOrderDto = {
          name: callOrdersStub.name,
          price: callOrdersStub.price,
          phoneNumber: callOrdersStub.phoneNumber,
          _id: callOrdersStub._id,
        };
        orderCreated = await ordersController.createOrder(createOrderDto);
      });

      test('Then it should call createOrder', () => {
        expect(ordersService.createOrder).toHaveBeenCalledWith(
          createOrderDto,
          undefined,
        );
      });

      test('Then it should return order', () => {
        expect(orderCreated).toEqual(createOrderDto);
      });
    });
  });

  afterAll(() => {
    connections[1].close();
  });
});
