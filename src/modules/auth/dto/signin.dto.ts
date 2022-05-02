import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  password: string;
}
