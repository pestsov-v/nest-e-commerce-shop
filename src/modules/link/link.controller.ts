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

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @HttpCode(201)
  @Post()
  async createLink(@Body() dto) {
    await this.linkService.createLink(dto);
  }

  @HttpCode(200)
  @Get()
  async getLinks() {
    return await this.linkService.getLinks();
  }

  @HttpCode(200)
  @Get(':linkId')
  async getLink(@Param() id: string) {
    return await this.linkService.getLink(id);
  }

  @HttpCode(200)
  @Patch(':linkId')
  async updateLink(@Param() id: string, @Body() dto) {
    return await this.linkService.updateLink(id, dto);
  }

  @HttpCode(200)
  @Delete(':linkId')
  async deleteLink(@Param() id: string) {
    return await this.linkService.deleteLink(id);
  }
}
