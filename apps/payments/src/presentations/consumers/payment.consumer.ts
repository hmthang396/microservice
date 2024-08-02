import { Controller, Inject, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { UseCaseProvider } from '../../domain/enums/usecase-provider.enum';
import { UseCaseProxy } from '../../infrastructure/usecase-proxy/usecase-proxy';
import { CreatePaymentUseCases } from '../../application/usecases/create-payment.usecase';
import {
  MessageHandlerErrorBehavior,
  Nack,
  RabbitRPC,
  defaultAssertQueueErrorHandler,
} from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { PushMessageUsecase } from '../../application/usecases/push-message.usecase';
import { IConsumer } from '../../domain/consumer/consumer.interface';
import { ReplyErrorCallback } from '../../infrastructure/helpers';
import { PaymentCreateRequestDto } from '@app/libs';

@Controller()
export class PaymentConsumer implements IConsumer<PaymentCreateRequestDto, ConsumeMessage> {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<CreatePaymentUseCases>,
    @Inject(UseCaseProvider.PushMessage)
    private readonly pushMessageUsecase: UseCaseProxy<PushMessageUsecase>,
  ) {}

  @RabbitRPC({
    exchange: 'exchange-payment',
    routingKey: 'create.payment',
    queue: 'create.payment',
    errorBehavior: MessageHandlerErrorBehavior.NACK,
    errorHandler: ReplyErrorCallback,
    assertQueueErrorHandler: defaultAssertQueueErrorHandler,
    queueOptions: {
      deadLetterExchange: 'exchange-payment',
      deadLetterRoutingKey: 'create.payment.dead-letter',
      durable: true,
      autoDelete: false,
    },
  })
  @UsePipes(PaymentCreateRequestDto)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async handlerMessage(payload: PaymentCreateRequestDto, msg: ConsumeMessage) {
    Logger.debug(`Consumer: create.payment`);
    try {
      const payment = await this.createPaymentUsecase.getInstance().execute(payload);
      // !Todo: send message
      await this.pushMessageUsecase.getInstance().execute('exchange-payment', 'payment.created.success', payment);
    } catch (error) {
      throw new Nack(true);
    }
  }

  @RabbitRPC({
    exchange: 'exchange-payment',
    routingKey: 'create.payment.dead-letter',
    queue: 'create.payment.dead-letter',
    errorBehavior: MessageHandlerErrorBehavior.ACK,
    queueOptions: {
      durable: true,
      autoDelete: false,
    },
  })
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async handlerFailedMessage(payload: PaymentCreateRequestDto, msg: ConsumeMessage) {
    Logger.error(`Consumer: create.payment.dead-letter`);
    return;
  }
}
