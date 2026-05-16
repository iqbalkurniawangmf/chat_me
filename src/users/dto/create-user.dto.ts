import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string | undefined;
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string | undefined;
  @ApiProperty({ example: 30, description: 'The age of the user' })
  age: number | undefined;
}
