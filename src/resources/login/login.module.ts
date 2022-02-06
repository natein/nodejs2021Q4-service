import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UsersModule from '../users/users.module';
import LoginService from './login.service';
import LoginController from './login.controller';
import { JWT_SECRET_KEY } from '../../configs/config';
import LocalStrategy from './strategies/local.strategy';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({ secret: JWT_SECRET_KEY }),
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export default class LoginModule {}
