import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProvider } from '@api-gateway/domain/enums/providers';
import { CreatePaymentProvier } from '../providers/payment/create-payment.provider';
import { PaymentServiceClientConfigModule } from '../config/payment-service/payment-service.module';

@Module({
  imports: [EnvironmentConfigModule, PaymentServiceClientConfigModule],
})
export class UsecaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [CreatePaymentProvier],
      exports: [UseCaseProvider.CreatePayment],
    };
  }
}
