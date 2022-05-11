import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LinkListener {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @OnEvent('linkUpdated')
  async handleLinksUpdatedEvent() {
    await this.cacheManager.del('getLinks');
  }
}
