import { EnvironmentConfigService } from '@api-gateway/infrastrucure/config/environment-config/environment-config.service';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { StripeConfig } from '@payments/domain/config/stripe.interface';
import { PaymentMethod } from '@payments/domain/services/payment-method.interface';

@Injectable()
export class StripeService implements PaymentMethod<any, any> {
  constructor(
    @Inject(EnvironmentConfigService)
    private readonly stripeConfig: StripeConfig,
    private readonly httpService: HttpService,
  ) {}

  processPayment(dto: any) {
    throw new Error('Method not implemented.');
  }
}

