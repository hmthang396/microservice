import { PaymentCreateResponse } from '@app/libs/proto';

export interface ICreatePaymentUseCases<T> {
  execute(dto: T): Promise<PaymentCreateResponse>;
}
