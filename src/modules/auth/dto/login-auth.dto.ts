import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'test@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  @IsStrongPassword(
    {},
    {
      message:
        'password is too weak, Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
