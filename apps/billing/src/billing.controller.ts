import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';
// import { JwtAuthGuard } from '@app/common';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('orders-topic')
  // @UseGuards(JwtAuthGuard)
  handleOrderCreated(@Payload() data: any) {
    this.billingService.bill(data);
  }
}
