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
import { User } from '../user/user.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkRepository) private linkRepository: Repository<Link>,
  ) {}

  async createLink(products, user: User): Promise<Link> {
    const link: Link = await this.linkRepository.save({
      code: Math.random().toString(36).substr(6),
      user,
      products: products.map((id) => ({ id })),
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
      where: { user: userId },
      relations: ['orders'],
    });

    if (!links)
      throw new HttpException(USER_LINKS_NOT_FOUND, HttpStatus.NOT_FOUND);

    const link = links.map((link) => {
      const completedOrders = link.orders.filter((o) => o.complete);

      return {
        code: link.code,
        count: completedOrders.length,
        revenue: completedOrders.reduce((s, o) => s + o.total, 0),
      };
    });

    return link;
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
