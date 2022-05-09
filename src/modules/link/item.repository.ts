import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../item/item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}
