import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { IUnitOfWork } from '../../domain/repositories/unit-of-work.service.interface';
import { AsyncLocalStorage } from 'async_hooks';
import { Inject } from '@nestjs/common';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { PaymentRepository } from './payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { IPspTransactionRepository } from '../../domain/repositories/psp-transaction.repository.interface';
import { PspTransactionRepository } from './psp-transaction.repository';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';

export class UnitOfWork
  implements IUnitOfWork<Repository<ObjectLiteral>, EntityTarget<ObjectLiteral>, ObjectLiteral, EntityManager>
{
  constructor(
    private readonly dataSource: DataSource,
    @Inject('LocalStorage')
    private readonly _asyncLocalStorage: AsyncLocalStorage<any>,
    @Inject(PaymentRepository)
    private readonly paymentRepository: IPaymentRepository<PaymentEntity, EntityManager>,
    @Inject(PspTransactionRepository)
    private readonly pspTransactionRepository: IPaymentRepository<PspTransactionEntity, EntityManager>,
  ) {}

  getPspTransactionRepositor(): IPspTransactionRepository<PspTransactionEntity, EntityManager> {
    return this.pspTransactionRepository;
  }

  getPaymentRepository(): IPaymentRepository<PaymentEntity, EntityManager> {
    return this.paymentRepository;
  }

  doTransactional<W>(work: () => W | Promise<W>): Promise<W> {
    throw new Error('Method not implemented.');
  }

  getTransactionManager(): EntityManager | null {
    const storage = this._asyncLocalStorage.getStore();
    if (storage && storage.has('typeOrmEntityManager')) {
      return storage.get('typeOrmEntityManager');
    }
    return null;
  }

  getRepository(target: EntityTarget<ObjectLiteral>): Repository<ObjectLiteral> {
    return this.dataSource.getRepository(target);
  }
}
