import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { ControllersModule } from './presentations/controllers/controller.module';
import { ConsumersModule } from './presentations/consumers/consumer.module';

@Module({
  imports: [EnvironmentConfigModule, UsecaseProxyModule.register(), ControllersModule, ConsumersModule],
  controllers: [],
  providers: [],
})
export class PaymentsModule {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;
  constructor(private readonly configService: ConfigService) {
    PaymentsModule.port = +this.configService.get('SERVICE_PORT');
    PaymentsModule.apiVersion = this.configService.get('API_VERSION_DEFAULT');
    PaymentsModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
