import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { AuthModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import * as Joi from 'joi';
import { GCPubSubClient } from '@app/common';
import configuration from './config/configuration';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: { level: process.env.prod !== 'prod' ? 'trace' : 'info' },
    }),
    DatadogTraceModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GOOGLE_CREDENTIALS_KEY: Joi.string().required(),
      }),
      load: [configuration],
      envFilePath: './apps/billing/.env',
    }),
    AuthModule,
  ],
  controllers: [BillingController],
  providers: [
    BillingService,
    {
      provide: 'PUBSUB_CLIENT',
      useFactory: () => {
        return new GCPubSubClient({});
      },
      inject: [],
    },
  ],
})
export class BillingModule {}
