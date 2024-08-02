import { Payment } from '@app/libs/entities/payment.entity';

export interface IUpdatePaymentUseCases {
  execute(dto: any): Promise<Payment>;
}
