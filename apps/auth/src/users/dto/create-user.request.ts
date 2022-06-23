import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({ description: 'User email', default: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', default: '123123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
