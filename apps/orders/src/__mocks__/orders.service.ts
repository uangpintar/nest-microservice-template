import { ordersStub } from '../test/stubs/orders.stub';

export const OrdersService = jest.fn().mockReturnValue({
  createOrder: jest.fn().mockReturnValue(ordersStub()),
  getOrders: jest.fn().mockReturnValue([ordersStub()]),
});
