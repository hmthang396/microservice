import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';
import { PaymentConsumer } from './payment.consumer';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [PaymentConsumer],
  providers: [],
  exports: [],
})
export class ConsumersModule {}
