import { usersStub } from '../test/stubs/users.stub';

export const UsersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockReturnValue(usersStub()),
});
