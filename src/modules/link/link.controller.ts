import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @HttpCode(201)
  @Post('link')
  async createLink(@Body() dto) {
    const link = await this.linkService.createLink(dto);
    console.log(link)
  }

  @HttpCode(200)
  @Get('link')
  async getLinks() {
    return await this.linkService.getLinks();
  }

  @HttpCode(200)
  @Get('link/:linkId')
  async getLink(@Param() id: string) {
    return await this.linkService.getLink(id);
  }

  @Get('user/link/:linkId')
  async getUserLink(@Param() id: string) {
    return await this.linkService.getUserLink(id);
  }

  @HttpCode(200)
  @Patch('link/:linkId')
  async updateLink(@Param() id: string, @Body() dto) {
    return await this.linkService.updateLink(id, dto);
  }

  @HttpCode(200)
  @Delete('link/:linkId')
  async deleteLink(@Param() id: string) {
    return await this.linkService.deleteLink(id);
  }
}
