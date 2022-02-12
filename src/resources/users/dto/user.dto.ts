import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export default class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
