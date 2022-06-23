import './tracing';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OrdersModule } from './orders.module';
import { description, name, version } from '../package.json';
import { DEFAULT_TAG, SWAGGER_API_ROOT } from './constant/document';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(PinoLogger));
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag(DEFAULT_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  const serviceURL = `http://localhost:${configService.get('PORT')}`;
  const openApiURL = `${serviceURL}/${SWAGGER_API_ROOT}`;

  await app.listen(configService.get('PORT'));

  Logger.log(`🔵 swagger listening at ${openApiURL}`);
  Logger.log(`🔵 service listening at ${serviceURL}`);
}
bootstrap();
