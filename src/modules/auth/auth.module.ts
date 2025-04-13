import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import appConfig from '../../../config/auth.config';
import UserService from 'src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, Repository],
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: appConfig().jwtSecret,
        signOptions: { expiresIn: `${appConfig().jwtExpiry}h` },
      }),
      global: true,
      // secret: appConfig().jwtSecret,
      // signOptions: { expiresIn: `${appConfig().jwtExpiry}s` },
    }),
  ],
})
export class AuthModule {}
