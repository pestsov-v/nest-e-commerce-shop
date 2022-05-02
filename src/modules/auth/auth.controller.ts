import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './type/tokens.type';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSevice: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('local/signup')
  async localSignup(@Body() dto: SignupDto): Promise<Tokens> {
    return await this.authSevice.localSignup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/signin')
  async localSignin(@Body() dto: SigninDto): Promise<Tokens> {
    return await this.authSevice.localSignin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/logout')
  async localLogout() {
    const logout = await this.authSevice.localLogout();
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/refresh')
  async localRefreshToken() {
    const refreshToken = await this.authSevice.localRefreshToken();
  }
}
