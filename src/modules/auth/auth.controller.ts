import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from './user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(@Req() request: Request) {
    const data = request.user as User;
    return this.service.login(data);
  }

  @Post('register')
  async signUp(@Req() request: Request) {
    const data = request.body as User;
    return this.service.register(data);
  }
}
