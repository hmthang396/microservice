import {
  MessageHandlerErrorBehavior,
  RabbitMQConfig,
  RabbitMQModule,
} from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): RabbitMQConfig => ({
  uri: `amqp://${config.getRabbitMQUsername()}:${config.getRabbitMQPassword()}@${config.getRabbitMQHost()}/`,
  connectionInitOptions: {
    wait: false,
    timeout: 10000,
    reject: true,
  },
  enableControllerDiscovery: true,
  defaultRpcTimeout: 10000,
  defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.ACK,
  exchanges: [],
  queues: [],
});

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class RabbitMQConfigModule {}
