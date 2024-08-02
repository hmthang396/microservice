import { Inject, Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { DataSource, EntityManager } from 'typeorm';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class PaymentRepository implements IPaymentRepository<EntityManager> {
  constructor(
    @Inject('LocalStorage')
    private readonly localStorage: AsyncLocalStorage<any>,
    private readonly dataSource: DataSource,
  ) {}

  get paymentEntityRepository() {
    const storage = this.localStorage.getStore();
    if (storage && storage.has('typeOrmEntityManager')) {
      return storage.get('typeOrmEntityManager').getRepository(PaymentEntity);
    }
    return this.dataSource.getRepository(PaymentEntity);
  }

  public getEntityManager(): EntityManager {
    return this.paymentEntityRepository.manager;
  }

  public async create(payment: PaymentEntity) {
    return await this.paymentEntityRepository.save(payment);
  }

  update(): Promise<PaymentEntity> {
    throw new Error('Method not implemented.');
  }
  softDelete(): Promise<PaymentEntity> {
    throw new Error('Method not implemented.');
  }
}
