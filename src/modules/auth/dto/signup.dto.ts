import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  password: string;
}
