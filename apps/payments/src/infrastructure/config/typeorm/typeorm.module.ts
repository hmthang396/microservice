import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm';
import { PaymentEntity } from 'apps/payments/src/domain/entities/payment.entity';
import { PspTransactionEntity } from 'apps/payments/src/domain/entities/psp-transaction.entity';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): DataSourceOptions & SeederOptions =>
  ({
    type: 'mysql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    schema: config.getDatabaseSchema(),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
    factories: [__dirname + '/factories/**/*{.ts,.js}'],
    synchronize: config.getDatabaseSync(),
    logging: config.getTypeORMLogging(),
    migrationsRun: config.getTypeORMMigrationsRun(),
    migrationsTableName: 'typeorm_migrations',
    seedTracking: true,
    logger: 'advanced-console',
  }) as DataSourceOptions & SeederOptions;
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature([PaymentEntity, PspTransactionEntity]),
  ],
})
export class TypeOrmConfigModule {}
