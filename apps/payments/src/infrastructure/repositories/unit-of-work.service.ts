import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { IUnitOfWork } from '../../domain/repositories/unit-of-work.service.interface';
import { AsyncLocalStorage } from 'async_hooks';
import { Inject } from '@nestjs/common';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { PaymentRepository } from './payment.repository';
import { IPspTransactionRepository } from '../../domain/repositories/psp-transaction.repository.interface';
import { PspTransactionRepository } from './psp-transaction.repository';

export class UnitOfWork implements IUnitOfWork<Repository<ObjectLiteral>, EntityTarget<ObjectLiteral>, EntityManager> {
  constructor(
    private readonly dataSource: DataSource,
    @Inject('LocalStorage')
    private readonly _asyncLocalStorage: AsyncLocalStorage<any>,
    @Inject(PaymentRepository)
    private readonly paymentRepository: IPaymentRepository<EntityManager>,
    @Inject(PspTransactionRepository)
    private readonly pspTransactionRepository: IPspTransactionRepository<EntityManager>,
  ) {}

  getPspTransactionRepositor(): IPspTransactionRepository<EntityManager> {
    return this.pspTransactionRepository;
  }

  getPaymentRepository(): IPaymentRepository<EntityManager> {
    return this.paymentRepository;
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  async doTransactional<W>(work: () => W | Promise<W>): Promise<W> {
    const queryRunner = this.getDataSource().createQueryRunner('master');
    return await this._asyncLocalStorage.run(new Map<string, EntityManager>(), async () => {
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        this._asyncLocalStorage.getStore().set('typeOrmEntityManager', queryRunner.manager);
        const result: W = await work();
        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    });
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
