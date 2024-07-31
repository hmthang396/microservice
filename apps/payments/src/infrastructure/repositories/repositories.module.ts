import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentRepository } from './payment.repository';
import { PspTransactionRepository } from './psp-transaction.repository';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';
import { StorageModule } from '../storage/local-storage.module';
import { UnitOfWork } from './unit-of-work.service';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PaymentEntity, PspTransactionEntity]), StorageModule],
  providers: [PaymentRepository, PspTransactionRepository, UnitOfWork],
  exports: [PaymentRepository, PspTransactionRepository, UnitOfWork],
})
export class RepositoriesModule {}
