import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { SignupDto } from './dto/signup.dto';
import { AuthHelper } from './auth.helper';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './type/tokens.type';
import { USER_NOT_FOUND } from '../user/user.constants';
import { compare } from 'bcryptjs';
import {
  PASSWORD_NOT_MATCHED,
  REFRESH_TOKEN_NOT_MATCHED,
  SIGNUP_SUCCESS,
} from './auth.constants';
import { SigninDto } from './dto/signin.dto';
import { Role } from '../user/user-role.enum';
import { SignupResponse } from './response/signup.response';
import { statusEnum } from '../../core/enum/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authHelper: AuthHelper,
    @InjectRepository(UserRepository) private userRepository: Repository<User>,
  ) {}

  async localSignup(dto: SignupDto): Promise<User> {
    const user: User = await this.userRepository.save({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await this.authHelper.hashData(dto.password),
    });

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }

  async localSignin(dto: SigninDto): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    await this.authHelper.comparePassword(dto.password, user.password);
    return user;
  }

  async localLogout(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.hashedRefreshToken = 'null';

    await this.userRepository.save(user);

    return user;
  }

  async localRefreshToken(userId: string, refreshToken: string): Promise<User> {
    const user: User = await this.userRepository.findOne(userId);
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    await this.authHelper.compareTokens(refreshToken, user.hashedRefreshToken);
    return user;
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    const hash = await this.authHelper.hashData(refreshToken);

    const user: User = await this.userRepository.findOne(userId);
    user.hashedRefreshToken = hash;
    return this.userRepository.save(user);
  }

  async setTokens(id: string, email: string, role: Role): Promise<Tokens> {
    const tokens: Tokens = await this.getTokens(id, email, role);
    await this.updateRefreshTokenHash(id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string, email: string, role: Role) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: 'access-token-secret',
          expiresIn: 60 * 15,
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: 'refresh-token-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
