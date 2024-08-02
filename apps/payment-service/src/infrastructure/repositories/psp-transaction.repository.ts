import { Inject, Injectable } from '@nestjs/common';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';
import { DataSource, EntityManager } from 'typeorm';
import { IPspTransactionRepository } from '../../domain/repositories/psp-transaction.repository.interface';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class PspTransactionRepository implements IPspTransactionRepository<EntityManager> {
  constructor(
    @Inject('LocalStorage')
    private readonly localStorage: AsyncLocalStorage<any>,
    private readonly dataSource: DataSource,
  ) {}

  get pspTransactionEntityRepository() {
    const storage = this.localStorage.getStore();
    if (storage && storage.has('typeOrmEntityManager')) {
      return storage.get('typeOrmEntityManager').getRepository(PspTransactionEntity);
    }
    return this.dataSource.getRepository(PspTransactionEntity);
  }

  getEntityManager(): EntityManager {
    return this.pspTransactionEntityRepository.manager;
  }
  async create(entity: PspTransactionEntity): Promise<PspTransactionEntity> {
    return await this.pspTransactionEntityRepository.save(entity);
  }
}
