import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentRepository<EntityManager> {
  getEntityManager(): EntityManager;
  create(entity: PaymentEntity): Promise<PaymentEntity>;
  update(): Promise<PaymentEntity>;
  softDelete(): Promise<PaymentEntity>;
}
