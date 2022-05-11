import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Session as GetSession,
} from '@nestjs/common';
import {
  GET_USER_LINK_SUCCESS_MESSAGE,
  LINK_CREATED_SUCCESS,
  LINK_DELETED_SUCCESS_MESSAGE,
  LINK_NOT_CREATED,
  LINK_NOT_FOUND,
  LINK_UPDATED_SUCCESS_MESSAGE,
  LINKS_LIST_EMPTY,
  USER_LINKS_NOT_FOUND,
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
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetLinksResponse } from './response/get-links.response';
import { GetLinkResponse } from './response/get-link.response';
import { GetUserLinkResponse } from './response/get-user-link.response';
import { UpdateLinkDto } from './dto/update-link.dto';
import { UpdateLinkResponse } from './response/update-link.response';
import { DeleteLinkResponse } from './response/delete-link.response';

@Controller()
export class LinkController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UserService,
    private readonly linkService: LinkService,
    private eventEmitter: EventEmitter2,
  ) {}

  @HttpCode(201)
  @Post('link')
  async createLink(
    @Body('products') products: CreateLinkDto,
    @GetSession() session: UserSession,
  ): Promise<createLinkResponse> {
    const userId: string = session.user.userId;
    if (!userId) throw new HttpException(USER_NOT_AUTH, HttpStatus.NOT_FOUND);

    const user: User = await this.userService.getUser(userId);

    const link: Link = await this.linkService.createLink(products, user);
    if (!link)
      throw new HttpException(LINK_NOT_CREATED, HttpStatus.BAD_REQUEST);

    this.eventEmitter.emit('linkUpdated');

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
  async getLinks(): Promise<GetLinksResponse> {
    const links = await this.linkService.getLinks();

    if (!links) throw new HttpException(LINKS_LIST_EMPTY, HttpStatus.NOT_FOUND);

    return {
      status: statusEnum.SUCCESS,
      amount: links.length,
      data: {
        data: links,
      },
    };
  }

  @HttpCode(200)
  @Get('link/:linkId')
  async getLink(@Param() id: string): Promise<GetLinkResponse> {
    const link = await this.linkService.getLink(id);

    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    return {
      status: statusEnum.SUCCESS,
      data: link,
    };
  }

  @Get('user/link/:linkId')
  async getUserLink(
    @Param('id') id: string,
    @GetSession() session: UserSession,
  ): Promise<GetUserLinkResponse> {
    const userId = session.user.userId;
    if (!userId) throw new HttpException(USER_NOT_AUTH, HttpStatus.FORBIDDEN);

    const userLinks = await this.linkService.getUserLink(userId);
    if (!userLinks)
      throw new HttpException(USER_LINKS_NOT_FOUND, HttpStatus.NOT_FOUND);

    return {
      status: statusEnum.SUCCESS,
      message: GET_USER_LINK_SUCCESS_MESSAGE,
      data: userLinks,
    };
  }

  @HttpCode(200)
  @Patch('link/:linkId')
  async updateLink(
    @Param('id') id: string,
    @Body() dto: UpdateLinkDto,
  ): Promise<UpdateLinkResponse> {
    const link = await this.linkService.updateLink(id, dto);

    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    this.eventEmitter.emit('linkUpdated');

    return {
      status: statusEnum.SUCCESS,
      message: LINK_UPDATED_SUCCESS_MESSAGE,
      data: link,
    };
  }

  @HttpCode(200)
  @Delete('link/:linkId')
  async deleteLink(@Param('id') id: string): Promise<DeleteLinkResponse> {
    const link = await this.linkService.deleteLink(id);

    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    this.eventEmitter.emit('linkUpdated');

    return {
      status: statusEnum.SUCCESS,
      message: LINK_DELETED_SUCCESS_MESSAGE,
      deletedLink: link,
    };
  }
}
