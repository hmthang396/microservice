import { PaymentEntity } from '../entities/payment.entity';

export interface ICreatePaymentUseCases<T> {
  execute(dto: T): Promise<PaymentEntity>;
}
