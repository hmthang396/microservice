import { Module, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { ControllersModule } from './presentations/controllers/controller.module';
import { ConsumersModule } from './presentations/consumers/consumer.module';
import { LoggerModule } from '@app/libs/logger/logger.module';
import { LoggerService } from '@app/libs/logger/logger.service';
import { ConsulService } from '@app/libs/consul/consul.service';
import * as uuid from 'uuid';
import { ConsulModule } from '@app/libs/consul/consul.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    UsecaseProxyModule.register(),
    ControllersModule,
    ConsumersModule,
    LoggerModule,
    ConsulModule.forRootAsync({
      inject: [],
      useFactory: () => {
        return {
          host: `127.0.0.1`,
          port: '8500',
          secure: false,
          defaults: {},
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class PaymentsModule implements OnModuleInit, OnModuleDestroy {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;
  static logger: LoggerService;
  private CONSUL_ID: string;
  constructor(
    private readonly configService: ConfigService,
    logger: LoggerService,
    private readonly consulService: ConsulService,
  ) {
    PaymentsModule.logger = logger;
    PaymentsModule.port = +this.configService.get('SERVICE_PORT');
    PaymentsModule.apiVersion = this.configService.get('API_VERSION_DEFAULT');
    PaymentsModule.apiPrefix = this.configService.get('API_PREFIX');
    this.CONSUL_ID = uuid.v4();
  }

  async onModuleDestroy() {
    const result = await this.consulService.deregister({
      id: this.CONSUL_ID,
    });
  }

  async onModuleInit() {
    const result = await this.consulService.register({
      name: `payments-service`,
      address: `127.0.0.1`,
      port: 3002,
      id: this.CONSUL_ID,
    });
  }
}
