import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { StripeConfig } from 'apps/payment-service/src/domain/config/stripe.interface';
import { PaymentMethod } from 'apps/payment-service/src/domain/services/payment-method.interface';
import { EnvironmentConfigService } from 'apps/payment-service/src/infrastructure/config/environment-config/environment-config.service';

@Injectable()
export class StripeService implements PaymentMethod<any, any> {
  constructor(
    @Inject(EnvironmentConfigService)
    private readonly stripeConfig: StripeConfig,
    private readonly httpService: HttpService,
  ) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  processPayment(dto: any) {
    throw new Error('Method not implemented.');
  }
}
