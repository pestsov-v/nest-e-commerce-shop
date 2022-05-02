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
import { PASSWORD_NOT_MATCHED } from './auth.constants';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authHelper: AuthHelper,
    @InjectRepository(UserRepository) private userRepository: Repository<User>,
  ) {}

  async localSignup(dto: SignupDto): Promise<Tokens> {
    const user = await this.userRepository.save({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await this.authHelper.hashData(dto.password),
    });
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async localSignin(dto: SigninDto): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    const passwordMatches = await compare(dto.password, user.password);

    if (!passwordMatches)
      throw new HttpException(PASSWORD_NOT_MATCHED, HttpStatus.NOT_FOUND);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async localLogout(userId: string) {
    const user = await this.userRepository.findOne(userId);

    user.hashedRefreshToken = 'null';

    await this.userRepository.save(user);
  }

  localRefreshToken() {}

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await this.authHelper.hashData(refreshToken);

    const user = await this.userRepository.findOne(userId);
    user.hashedRefreshToken = hash;
    return this.userRepository.save(user);
  }

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
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
