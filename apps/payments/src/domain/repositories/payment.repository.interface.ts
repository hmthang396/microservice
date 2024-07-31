import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentRepository<Entity, EntityManager> {
  getEntityManager(): EntityManager;
  create(entity: Entity): Promise<Entity>;
  update(): Promise<PaymentEntity>;
  softDelete(): Promise<PaymentEntity>;
}
