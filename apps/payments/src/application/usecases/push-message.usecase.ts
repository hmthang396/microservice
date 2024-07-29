import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IPushMessageUsecase } from '../../domain/usecases/push-message.usecase.interface';
import { PaymentEntity } from '../../domain/entities/payment.entity';

export class PushMessageUsecase implements IPushMessageUsecase<PaymentEntity> {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async execute(exchange: string, routingKey: string, message: PaymentEntity): Promise<boolean> {
    return await this.amqpConnection.publish(exchange, routingKey, message);
  }
}
