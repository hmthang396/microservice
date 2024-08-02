import { Injectable } from '@nestjs/common';
import { PaymentMethod } from 'apps/payment-service/src/domain/services/payment-method.interface';

@Injectable()
export class CODService implements PaymentMethod<any, any> {
  constructor() {}

  processPayment(dto: any) {
    console.log(dto);

    throw new Error('Method not implemented.');
  }
}
