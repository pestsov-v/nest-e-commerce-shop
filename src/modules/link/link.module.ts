import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinkRepository } from "./link.repository";
import { Link } from "./link.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LinkRepository, Link])],
  providers: [LinkService],
  controllers: [LinkController]
})
export class LinkModule {}
