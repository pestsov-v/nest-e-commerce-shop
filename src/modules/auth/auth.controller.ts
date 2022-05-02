import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './type/tokens.type';
import { SigninDto } from './dto/signin.dto';
import { RefreshTokenGuard } from '../../core/guard/refreshToken.guard';
import { GetCurrentUser } from '../../core/decorator/getCurrentUser.decorator';
import { GetCurrentUserId } from '../../core/decorator/getCurrentUserId.decorator';
import { Public } from '../../core/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/signup')
  async localSignup(@Body() dto: SignupDto): Promise<Tokens> {
    return await this.authService.localSignup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/signin')
  async localSignin(@Body() dto: SigninDto): Promise<Tokens> {
    return await this.authService.localSignin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/logout')
  async localLogout(@GetCurrentUserId() userId: string) {
    return await this.authService.localLogout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('local/refresh')
  async localRefreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.localRefreshToken(userId, refreshToken);
  }
}
