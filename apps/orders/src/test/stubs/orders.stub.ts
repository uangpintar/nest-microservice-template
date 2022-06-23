import { Order } from '../../schemas/order.schema';

export const ordersStub = (): Order => {
  return {
    name: 'Shoe',
    price: 1000,
    phoneNumber: '+62789654123',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _id: '29977d65-8389-42d9-8807-d41ea4dfb963',
  };
};
