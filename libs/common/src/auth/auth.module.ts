import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
