import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { Span } from 'nestjs-ddtrace';

@Injectable()
export class BillingService {
  constructor(
    @InjectPinoLogger(BillingService.name) private readonly logger: PinoLogger,
  ) {}

  @Span()
  getHello(): string {
    return 'Hello World!';
  }

  @Span()
  bill(data: any) {
    this.logger.info(data.payload.request);
  }
}
