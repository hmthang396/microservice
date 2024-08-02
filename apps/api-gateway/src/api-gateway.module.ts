import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from './infrastrucure/config/environment-config/environment-config.module';
import { ControllersModule } from './presentation/controllers/controller.module';
import { LoggerModule } from '@app/libs/logger/logger.module';
import { LoggerService } from '@app/libs/logger/logger.service';
@Module({
  imports: [EnvironmentConfigModule, ControllersModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;
  static logger: LoggerService;
  constructor(
    private readonly configService: ConfigService,
    logger: LoggerService,
  ) {
    ApiGatewayModule.logger = logger;
    ApiGatewayModule.port = +this.configService.get('API_PORT');
    ApiGatewayModule.apiVersion = this.configService.get('API_VERSION_DEFAULT');
    ApiGatewayModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
