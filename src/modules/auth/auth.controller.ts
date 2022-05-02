import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './type/tokens.type';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('local/logout')
  async localLogout(@Req() req: Request) {
    const userId = req.user['sub'];
    return await this.authSevice.localLogout(userId);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('local/refresh')
  async localRefreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authSevice.localRefreshToken(userId, refreshToken);
  }
}
