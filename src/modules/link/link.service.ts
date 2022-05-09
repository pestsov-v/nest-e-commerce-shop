import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkRepository } from './link.repository';
import { Repository } from 'typeorm';
import { Link } from './link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkRepository) private linkRepository: Repository<Link>,
  ) {}

  async createLink(dto) {}
  async getLinks() {}
  async getLink(id) {}
  async updateLink(id) {}
  async deleteLink(id) {}
}
