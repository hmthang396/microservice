import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentRepository } from './payment.repository';
import { PspTransactionRepository } from './psp-transaction.repository';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PaymentEntity, PspTransactionEntity])],
  providers: [PaymentRepository, PspTransactionRepository],
  exports: [PaymentRepository, PspTransactionRepository],
})
export class RepositoriesModule {}
