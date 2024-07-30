import {
  MessageHandlerErrorBehavior,
  RabbitMQConfig,
  RabbitMQModule,
} from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getRabbitMqModuleOptions = (config: EnvironmentConfigService): RabbitMQConfig => ({
  uri: `amqp://${config.getRabbitMQUsername()}:${config.getRabbitMQPassword()}@${config.getRabbitMQHost()}/`,
  connectionInitOptions: {
    timeout: 10000,
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
      useFactory: getRabbitMqModuleOptions,
    }),
  ],
})
export class RabbitMQConfigModule {}

