import { MessageHandlerErrorBehavior, RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { RabbitMqConfig } from 'apps/payment-service/src/domain/config/rabbitmq.interface';

export const getRabbitMqModuleOptions = (config: RabbitMqConfig): RabbitMQConfig => ({
  uri: `amqp://${config.getRabbitMQUsername()}:${config.getRabbitMQPassword()}@${config.getRabbitMQHost()}/`,
  connectionInitOptions: {
    timeout: 10000,
  },
  enableControllerDiscovery: true,
  defaultRpcTimeout: 10000,
  defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.ACK,
  exchanges: [
    {
      name: 'exchange-payment',
      type: 'direct',
    },
  ],
  queues: [
    {
      name: 'create.payment',
      exchange: 'exchange-payment',
      routingKey: 'create.payment',
      options: {
        deadLetterExchange: 'exchange-payment',
        deadLetterRoutingKey: 'create.payment.dead-letter',
      },
    },
    {
      name: 'create.payment.dead-letter',
      exchange: 'exchange-payment',
      routingKey: 'create.payment.dead-letter',
    },
    {
      name: 'payment.created.success',
      exchange: 'exchange-payment',
      routingKey: 'payment.created.success',
    },
  ],
});

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getRabbitMqModuleOptions,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQConfigModule {}
