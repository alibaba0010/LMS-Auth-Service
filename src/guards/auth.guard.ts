import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as MSG from '../helpers/custom-messages';
import appConfig from '../../config/auth.config';
import { CustomHttpException } from 'src/helpers/custom-http-error-handler';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/helpers/skipAuth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = request.query.token || request.headers['authorization'];
    //  const token = request.headers['authorization'];
    const token = this.extractTokenFromHeader(request);
    console.log('token: ' + token);
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) {
      return true;
    }
    // TODO: Implements public key functionality
    if (!token) {
      throw new CustomHttpException(
        MSG.UNAUTHENTICATED_MESSAGE,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = await this.jwtService
      .verifyAsync(token, {
        secret: appConfig().jwtSecret,
      })
      .catch((err) => null);
    if (!payload)
      throw new CustomHttpException(
        MSG.UNAUTHENTICATED_MESSAGE,
        HttpStatus.UNAUTHORIZED,
      );

    if (this.isExpiredToken(payload)) {
      ``;
      throw new CustomHttpException(
        MSG.UNAUTHENTICATED_MESSAGE,
        HttpStatus.UNAUTHORIZED,
      );
    }
    request['user'] = payload;
    request['token'] = token;

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request as any).headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private isExpiredToken(token: any) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) {
      return true;
    }
    return false;
  }
}
