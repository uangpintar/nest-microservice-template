import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from '../billing.controller';
import { BillingService } from '../billing.service';
import { AuthModule } from '@app/common';
import { LoggerModule } from 'nestjs-pino';

describe('BillingController', () => {
  let billingController: BillingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot(),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AuthModule,
      ],
      controllers: [BillingController],
      providers: [BillingService],
    }).compile();

    billingController = app.get<BillingController>(BillingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingController.getHello()).toBe('Hello World!');
    });
  });

  describe('root', () => {
    it('should return undefined', () => {
      const mockData = {
        payload: {
          request: {
            name: 't-shirt',
            price: 1000,
            phoneNumber: '+628129876543',
          },
        },
      };
      expect(billingController.handleOrderCreated(mockData)).toBe(undefined);
    });
  });
});
