import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PaymentEntity } from 'apps/payment-service/src/domain/entities/payment.entity';
import { PspTransactionEntity } from 'apps/payment-service/src/domain/entities/psp-transaction.entity';
import { addTransactionalDataSource } from '../../storage/local-storage.module';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): DataSourceOptions & SeederOptions =>
  ({
    type: 'mysql',
    entities: ['dist/payment-service/apps/payment-service/src/domain/entities/*.entity.js'],
    migrations: ['./apps/payment-service/src/database/migrations/*{.ts}'],
    seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
    factories: [__dirname + '/factories/**/*{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',
    seedTracking: true,
    logger: 'advanced-console',
    replication: {
      master: {
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
      },
      slaves: [
        {
          host: config.getDatabaseHost(),
          port: config.getDatabasePort(),
          username: config.getDatabaseUser(),
          password: config.getDatabasePassword(),
          database: config.getDatabaseName(),
        },
      ],
    },
  }) as DataSourceOptions & SeederOptions;
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
      dataSourceFactory: async (options) => {
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    TypeOrmModule.forFeature([PaymentEntity, PspTransactionEntity]),
  ],
})
export class TypeOrmConfigModule {}
