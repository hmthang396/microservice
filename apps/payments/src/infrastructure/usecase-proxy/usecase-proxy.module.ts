import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PaymentProvier } from '../providers/payment.provider';
import { UseCaseProvider } from '../../domain/enums/usecase-provider.enum';
import { RabbitMQConfigModule } from '../config/rabbitmq/rabbitmq.module';
import { PaypalModule } from '../services/paypal/paypal.module';
import { PushMessageProvider } from '../providers/push-message.provider';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, RabbitMQConfigModule, PaypalModule],
})
export class UsecaseProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [PaymentProvier, PushMessageProvider],
      exports: [UseCaseProvider.CreatePayment, UseCaseProvider.PushMessage],
    };
  }
}
