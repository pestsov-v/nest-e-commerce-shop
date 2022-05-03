import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
} from './auth.constants';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './type/tokens.type';
import { SigninDto } from './dto/signin.dto';
import { RefreshTokenGuard } from '../../core/guard/refreshToken.guard';
import { GetCurrentRefreshToken } from '../../core/decorator/GetCurrentRefreshToken.decorator';
import { GetCurrentUserId } from '../../core/decorator/getCurrentUserId.decorator';
import { Public } from '../../core/decorator/public.decorator';
import { statusEnum } from '../../core/enum/status.enum';
import { SignupResponse } from './response/signup.response';
import { User } from '../user/user.entity';
import { SigninResponse } from './response/signin.response';
import { LogoutResponse } from './response/logout.response';
import { RefreshTokenResponse } from './response/refreshToken.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/signup')
  async localSignup(@Body() dto: SignupDto): Promise<SignupResponse> {
    const user: User = await this.authService.localSignup(dto);
    const tokens: Tokens = await this.authService.setTokens(
      user.id,
      user.email,
      user.role,
    );

    return {
      status: statusEnum.SUCCESS,
      message: SIGNUP_SUCCESS,
      data: {
        tokens,
        user,
      },
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/signin')
  async localSignin(@Body() dto: SigninDto): Promise<SigninResponse> {
    const user: User = await this.authService.localSignin(dto);
    const tokens: Tokens = await this.authService.setTokens(
      user.id,
      user.email,
      user.role,
    );

    return {
      status: statusEnum.SUCCESS,
      message: SIGNIN_SUCCESS,
      data: {
        tokens,
        user,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('local/logout')
  async localLogout(
    @GetCurrentUserId() userId: string,
  ): Promise<LogoutResponse> {
    const user: User = await this.authService.localLogout(userId);

    return {
      status: statusEnum.SUCCESS,
      message: LOGOUT_SUCCESS,
      data: {
        user,
      },
    };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('local/refresh')
  async localRefreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentRefreshToken('refreshToken') refreshToken: string,
  ): Promise<RefreshTokenResponse> {
    const user = await this.authService.localRefreshToken(userId, refreshToken);
    const tokens: Tokens = await this.authService.setTokens(
      user.id,
      user.email,
      user.role,
    );

    return {
      status: statusEnum.SUCCESS,
      message: REFRESH_TOKEN_SUCCESS,
      data: {
        tokens,
        user,
      },
    };
  }
}
