import { Injectable } from '@nestjs/common';
import { PaymentMethod } from '@payments/domain/services/payment-method.interface';

@Injectable()
export class CODService implements PaymentMethod<any, any> {
  constructor() {}

  processPayment(dto: any) {
    throw new Error('Method not implemented.');
  }
}

