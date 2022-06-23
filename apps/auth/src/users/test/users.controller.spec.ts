import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { usersStub } from './stubs/users.stub';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule, DatabaseModule } from '@app/common';
import { connections } from 'mongoose';

jest.mock('../users.service');

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required(),
            PORT: Joi.number().required(),
          }),
          envFilePath: './apps/auth/.env',
        }),
        DatabaseModule,
        RmqModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    describe('When createUser is called', () => {
      let user;

      beforeEach(async () => {
        const callUserStub = usersStub();
        const createUserDto = {
          email: callUserStub.email,
          password: callUserStub.password,
          _id: callUserStub._id,
        };
        user = await usersController.createUser(createUserDto);
      });

      test('Then it should call createUser', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(user);
      });
    });
  });

  afterAll(() => {
    connections[1].close();
  });
});
