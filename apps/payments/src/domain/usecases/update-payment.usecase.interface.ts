import { PaymentEntity } from '../entities/payment.entity';

export interface IUpdatePaymentUseCases {
  execute(dto: any): Promise<PaymentEntity>;
}
