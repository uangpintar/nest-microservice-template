import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { DatabaseModule } from '../../../../libs/common/src/database/database.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { usersStub } from '../users/test/stubs/users.stub';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { connections } from 'mongoose';
import { LoggerModule } from 'nestjs-pino';

jest.mock('../auth.service');

const mockResponseObject = () => {
  return createMock<Response>({
    send: jest.fn().mockReturnThis(),
  });
};

describe('AuthController', () => {
  const response = mockResponseObject();
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot(),
        DatabaseModule,
        UsersModule,
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION: Joi.string().required(),
            MONGODB_URI: Joi.string().required(),
          }),
          envFilePath: './apps/auth/.env',
        }),
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
            },
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    describe('When login is called', () => {
      beforeEach(async () => {
        await authController.login(usersStub(), usersStub(), response);
      });

      test('Then it should call authService', () => {
        expect(authService.login).toHaveBeenCalledWith(usersStub(), response);
      });
    });

    test('Then it should return user', () => {
      expect(usersStub()).toEqual(usersStub());
    });
  });

  afterAll(() => {
    connections[1].close();
  });
});
