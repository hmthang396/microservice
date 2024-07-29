// apps/order/ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'orders_db',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrationsTableName: 'typeorm_migrations',
  migrations: [join(__dirname, 'database', 'migrations', '*.{ts,js}')],
};

export = ormconfig;
