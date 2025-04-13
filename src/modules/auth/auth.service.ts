import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { RegisterDto } from './dto/create-auth.dto';
import UserService from 'src/modules/user/user.service';
import { CustomHttpException } from 'src/helpers/custom-http-error-handler';
import * as MSG from '../../helpers/custom-messages';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async createNewUser(registerDto: RegisterDto) {
    const checkEmailExists = await this.userService.getUserRecord({
      identifier: registerDto.email,
      identifierType: 'email',
    });

    if (checkEmailExists)
      throw new CustomHttpException(
        MSG.USER_ACCOUNT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    await this.userService.createUser(registerDto);
    const user = await this.userService.getUserRecord({
      identifier: registerDto.email,
      identifierType: 'email',
    });
    if (!user)
      throw new CustomHttpException(
        MSG.FAILED_TO_CREATE_USER,
        HttpStatus.BAD_REQUEST,
      );
    // create otp if possible
    const access_token = this.jwtService.sign({
      id: user.id,
      sub: user.id,
      email: user.email,
    });
    const { id, email } = user;
    return {
      message: MSG.USER_CREATED_SUCCESSFULLY,
      access_token,
      data: { user: { id, email } },
    };
  }
  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUserRecord({
      identifier: email,
      identifierType: 'email',
    });
    if (!user)
      throw new CustomHttpException(
        MSG.INVALID_CREDENTIALS,
        HttpStatus.BAD_REQUEST,
      );
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new CustomHttpException(
        MSG.INVALID_CREDENTIALS,
        HttpStatus.BAD_REQUEST,
      );

    const access_token = this.jwtService.sign({
      id: user.id,
      sub: user.id,
      email: user.email,
    });
    const { id } = user;
    return {
      message: MSG.LOGIN_SUCCESSFUL,
      access_token,
      data: { user: { id, email: user.email } },
    };
  }
}
