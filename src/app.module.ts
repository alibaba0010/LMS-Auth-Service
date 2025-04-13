import { Module, ValidationPipe } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import dataSource from './database/data.source';
import * as Joi from 'joi';
import serverConfig from '../config/server.config';
import authConfig from '../config/auth.config';
import HealthController from './health.controller';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { APP_PIPE } from '@nestjs/core';
@Module({
  controllers: [HealthController],
  providers: [
    {
      provide: 'CONFIG',
      useClass: ConfigService,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
      load: [serverConfig, authConfig],

      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => dataSource,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
