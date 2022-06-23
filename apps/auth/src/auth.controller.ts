import { Controller, Post, Res, UseGuards, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { CreateUserRequest } from './users/dto/create-user.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() us: CreateUserRequest,
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    // response.send(user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authentication-topic')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
