import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductListener {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @OnEvent('productUpdated')
  async handleProductUpdatedEvent() {
    await this.cacheManager.del('getProducts');
  }
}
