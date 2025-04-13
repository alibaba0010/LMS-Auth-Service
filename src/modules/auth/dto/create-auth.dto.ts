import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Phone number with country code',
    example: '+2348012345678',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'Email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)',
    example: 'Password123',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password (must match password)',
    example: 'Password123',
  })
  @IsString()
  confirmPassword: string;
}
