import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { skipAuth } from 'src/helpers/skipAuth';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginErrorResponseDto } from './dto/login-error.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthResponseDto } from './dto/create-auth-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // CREATE NEW USER
  @skipAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'User already exist' })
  @Post('register')
  @HttpCode(201)
  create(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authService.createNewUser(registerDto);
  }

  // LOGIN USER
  @skipAuth()
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials',
    type: LoginErrorResponseDto,
  })
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
