import { Injectable } from '@nestjs/common';
import { PaypalService } from '../paypal/paypal.service';
import { PaymentMethod } from 'apps/payment-service/src/domain/services/payment-method.interface';
import { StripeService } from '../stripe/stripe.service';
import { CODService } from '../cod/cod.service';
import { PaymentProvider } from '@app/libs';

@Injectable()
export class PaymentFactoryService {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly stripeService: StripeService,
    private readonly codService: CODService,
  ) {}

  public createPaymentMethod(type: PaymentProvider): PaymentMethod<any, any> {
    switch (type) {
      case PaymentProvider.Paypal:
        return this.paypalService;
      case PaymentProvider.Stripe:
        return this.stripeService;
      case PaymentProvider.COD:
        return this.codService;
      default:
        throw new Error('Invalid payment method type');
    }
  }
}
