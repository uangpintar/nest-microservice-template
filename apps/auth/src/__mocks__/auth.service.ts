import { usersStub } from '../users/test/stubs/users.stub';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockReturnValue(usersStub()),
});
