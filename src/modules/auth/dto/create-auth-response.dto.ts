import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '12345',
  })
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Full Name of the user',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Phone Number of the user',
    example: '+2348012345678',
  })
  phoneNumber: string;
}
export class DataDto {
  @ApiProperty({
    description: 'User details',
    type: UserDto,
  })
  user: UserDto;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Status message of the authentication response',
    example: 'Authentication successful',
  })
  message: string;

  @ApiProperty({
    description: 'Access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Additional data containing user object',
    type: DataDto,
    additionalProperties: true,
  })
  data: DataDto;
}
