import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [EnvironmentConfigModule, UsecaseProxyModule.register()],
  controllers: [],
  providers: [],
})
export class PaymentsModule {}
