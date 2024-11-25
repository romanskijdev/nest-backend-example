import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
      JwtModule.register({
        secret: process.env.JWT_PRIVATE_KEY || 'secret',
        signOptions: {
          expiresIn: process.env.JWT_SESSION_LIVE || '24h',
        }
      })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
