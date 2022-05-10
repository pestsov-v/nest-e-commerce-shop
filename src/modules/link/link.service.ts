import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkRepository } from './link.repository';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import {
  LINK_NOT_FOUND,
  LINKS_NOT_FOUND,
  USER_LINKS_NOT_FOUND,
} from './link.constants';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkRepository) private linkRepository: Repository<Link>,
  ) {}

  async createLink(dto) {
    const link = await this.linkRepository.save({
      code: dto.code,
      user: dto.userId,
      products: dto.productId,
    });

    return link;
  }

  async getLinks() {
    const links = await this.linkRepository.find({
      relations: ['products'],
    });

    if (!links) throw new HttpException(LINKS_NOT_FOUND, HttpStatus.NOT_FOUND);

    return links;
  }

  async getLink(id) {
    const link = await this.linkRepository.findOne(id);

    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    return link;
  }

  async getUserLink(userId) {
    const links = await this.linkRepository.find({
      relations: ['orders'],
      loadRelationIds: true,
      where: { user: userId },
    });

    if (!links)
      throw new HttpException(USER_LINKS_NOT_FOUND, HttpStatus.NOT_FOUND);

    return links;
  }

  async updateLink(id, dto) {
    const link = await this.getLink(id);

    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    link.code = dto.code;
    link.user = dto.user;
    link.products = dto.products;

    return await this.linkRepository.save(link);
  }

  async deleteLink(id) {
    const link = await this.getLink(id);

    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    return await this.linkRepository.remove(link);
  }
}
