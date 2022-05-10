import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Session as GetSession,
} from '@nestjs/common';
import {
  LINK_CREATED_SUCCESS,
  LINK_NOT_CREATED,
  USER_NOT_AUTH,
} from './link.constants';
import { LinkService } from './link.service';
import { UserService } from '../user/user.service';
import { UserSession } from '../auth/type/session.type';
import { statusEnum } from '../../core/enum/status.enum';
import { CreateLinkDto } from './dto/create-link.dto';
import { createLinkResponse } from './response/create-link.response';
import { User } from '../user/user.entity';
import { Link } from './link.entity';

@Controller()
export class LinkController {
  constructor(
    private readonly userService: UserService,
    private readonly linkService: LinkService,
  ) {}

  @HttpCode(201)
  @Post('link')
  async createLink(
    @Body() products: CreateLinkDto,
    @GetSession() session: UserSession,
  ): Promise<createLinkResponse> {
    const userId: string = session.user.userId;
    if (!userId) throw new HttpException(USER_NOT_AUTH, HttpStatus.NOT_FOUND);

    const user: User = await this.userService.getUser(userId);

    const link: Link = await this.linkService.createLink(products, user);
    if (!link)
      throw new HttpException(LINK_NOT_CREATED, HttpStatus.BAD_REQUEST);

    return {
      status: statusEnum.SUCCESS,
      message: LINK_CREATED_SUCCESS,
      data: {
        link,
      },
    };
  }

  @HttpCode(200)
  @Get('link')
  async getLinks() {
    return await this.linkService.getLinks();
  }

  @HttpCode(200)
  @Get('link/:linkId')
  async getLink(@Param() id: number) {
    return await this.linkService.getLink(id);
  }

  @Get('user/link/:linkId')
  async getUserLink(@Param() id: number, @GetSession() session: UserSession) {
    const userId = session.user.userId;
    return await this.linkService.getUserLink(userId);
  }

  @HttpCode(200)
  @Patch('link/:linkId')
  async updateLink(@Param() id: number, @Body() dto) {
    return await this.linkService.updateLink(id, dto);
  }

  @HttpCode(200)
  @Delete('link/:linkId')
  async deleteLink(@Param() id: number) {
    return await this.linkService.deleteLink(id);
  }
}
