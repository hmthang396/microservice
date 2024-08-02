import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { UsecaseProxyModule } from '../../infrastructure/usecase-proxy/usecase-proxy.module';
import { ConsulModule } from '@app/libs/consul/consul.module';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    
  ],
  controllers: [PaymentController],
  providers: [],
  exports: [],
})
export class ControllersModule {}
