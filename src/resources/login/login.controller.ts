import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import LoginService from './login.service';
import User from '../users/entities/user.entity';
import LocalAuthGuard from './guards/local-auth.guard';

@Controller('login')
@UseGuards(LocalAuthGuard)
export default class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() user: User) {
    return this.loginService.login(user);
  }
}
