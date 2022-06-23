import { User } from '../../schemas/user.schema';

export const usersStub = (): User => {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _id: '62978c813dcd03e6188cec05',
    email: 'test@example.com',
    password: '$2b$10$6ItSo0SgDHPN/8AnFmjXuO5mLtU.Is3s78tbqxA7YvNeGA1HiSE1S',
  };
};
