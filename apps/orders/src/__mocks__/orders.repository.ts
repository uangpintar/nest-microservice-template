import { ordersStub } from '../test/stubs/orders.stub';

export const OrdersRepository = jest.fn().mockReturnValue({
  find: jest.fn().mockReturnValue([ordersStub()]),
  create: jest.fn().mockReturnValue(ordersStub()),
  findOne: jest.fn().mockReturnValue(ordersStub()),
});
