import { IPaymentRepository } from './payment.repository.interface';
import { IPspTransactionRepository } from './psp-transaction.repository.interface';

export interface IUnitOfWork<T, U, EntityManager> {
  doTransactional<W>(work: () => W | Promise<W>): Promise<W>;
  getTransactionManager(): EntityManager | null;
  getRepository(target: U): T;
  getPaymentRepository(): IPaymentRepository<EntityManager>;
  getPspTransactionRepositor(): IPspTransactionRepository<EntityManager>;
}
