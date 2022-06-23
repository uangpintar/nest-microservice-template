import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsPhoneNumber,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderRequest {
  @ApiProperty({ description: 'the name of product ', default: 't-shirt' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'the price of product ', default: 15 })
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'user phone number', default: '+628798678623' })
  @IsPhoneNumber()
  phoneNumber: string;
}
