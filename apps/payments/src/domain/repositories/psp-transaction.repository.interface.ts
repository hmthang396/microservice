import { PspTransactionEntity } from '../entities';

export interface IPspTransactionRepository<EntityManager> {
  getEntityManager(): EntityManager;
  create(entity: PspTransactionEntity): Promise<PspTransactionEntity>;
}
