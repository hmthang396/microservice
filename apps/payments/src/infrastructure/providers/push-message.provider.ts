import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PushMessageUsecase } from '../../application/usecases/push-message.usecase';
import { UseCaseProvider } from '../../domain/enums/usecase-provider.enum';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';

export const PushMessageProvider = {
  inject: [AmqpConnection],
  provide: UseCaseProvider.PushMessage,
  useFactory: (amqpConnection: AmqpConnection) => new UseCaseProxy(new PushMessageUsecase(amqpConnection)),
};
