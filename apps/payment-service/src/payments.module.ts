import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { ControllersModule } from './presentations/controllers/controller.module';
import { LoggerModule } from '@app/libs/logger/logger.module';
import { LoggerService } from '@app/libs/logger/logger.service';

@Module({
  imports: [EnvironmentConfigModule, UsecaseProxyModule.register(), ControllersModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class PaymentsModule {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;
  static logger: LoggerService;
  constructor(
    private readonly configService: ConfigService,
    logger: LoggerService,
  ) {
    PaymentsModule.logger = logger;
    PaymentsModule.port = +this.configService.get('SERVICE_PORT');
    PaymentsModule.apiVersion = this.configService.get('API_VERSION_DEFAULT');
    PaymentsModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
