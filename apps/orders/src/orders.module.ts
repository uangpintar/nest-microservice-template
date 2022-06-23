import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import * as Joi from 'joi';
import { OrdersService } from './orders.service';
import { DatabaseModule, AuthModule } from '@app/common';
import { OrdersRepository } from './orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { LoggerModule } from 'nestjs-pino';
import { DatadogTraceModule } from 'nestjs-ddtrace';
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
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      load: [configuration],
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    {
      provide: 'PUBSUB_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new GCPubSubClient({
          projectId: 'pubsubdemo-100-353913',
          keyFile: configService.get<string>('GOOGLE_CREDENTIALS_KEY'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class OrdersModule {}
