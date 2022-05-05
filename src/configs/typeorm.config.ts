import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'admin',
  username: 'postgres',
  password: 'root',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
