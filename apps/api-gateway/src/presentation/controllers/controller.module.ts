import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { UsecaseProxyModule } from '@api-gateway/infrastrucure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [UsecaseProxyModule.register()],
  providers: [],
  controllers: [PaymentController],
  exports: [],
})
export class ControllersModule {}
