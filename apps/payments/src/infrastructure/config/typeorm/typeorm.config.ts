import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./dist/apps/payments/apps/payments/src/domain/entities/*.entity.js'],
  migrations: ['./apps/payments/src/database/migrations/*{.ts}'],
  migrationsRun: false,
  migrationsTableName: 'typeorm_migrations',
};

const config = new DataSource(options);

export default config;
