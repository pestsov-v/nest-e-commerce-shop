import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private userRepository: Repository<User> ) {}

  async createUser (dto: ) {

  }
}
