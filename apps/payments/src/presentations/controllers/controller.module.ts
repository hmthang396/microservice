import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { UsecaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [UsecaseProxyModule],
  controllers: [PaymentController],
  providers: [],
  exports: [],
})
export class ControllersModule {}
