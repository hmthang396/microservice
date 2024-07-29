import { BadRequestException, Controller, Inject } from '@nestjs/common';
import { UseCaseProvider } from '../../domain/enums/usecase-provider.enum';
import { UseCaseProxy } from '../../infrastructure/usecase-proxy/usecase-proxy';
import { CreatePaymentUseCases } from '../../application/usecases/create-payment.usecase';
import { MessageHandlerErrorBehavior, Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreatePaymentInput } from '../dtos/payment-create-request.dto';
import { ConsumeMessage } from 'amqplib';
import { PushMessageUsecase } from '../../application/usecases/push-message.usecase';
import { IConsumer } from '../../domain/consumer/consumer.interface';

@Controller()
export class PaymentConsumer implements IConsumer<CreatePaymentInput, ConsumeMessage> {
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
    createQueueIfNotExists: false,
    errorBehavior: MessageHandlerErrorBehavior.ACK,
    queueOptions: {
      deadLetterExchange: 'exchange-payment',
      deadLetterRoutingKey: 'payment.deadLetter',
      durable: true,
    },
    usePersistentReplyTo: true,
  })
  async createPayment(
    payload: CreatePaymentInput,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    msg: ConsumeMessage,
  ) {
    try {
      const isValid = CreatePaymentInput.safeParse(payload);
      if (!isValid.success) {
        // !TODO: Handle input data error
        throw new BadRequestException('INVALID_PARAMETER', isValid.error.message);
      }
      const payment = await this.createPaymentUsecase.getInstance().execute(payload);
      // !Todo: send message
      await this.pushMessageUsecase
        .getInstance()
        .execute('exchange-payment', 'payment.created.success', payment);
    } catch (error) {
      throw new Nack(true);
    }
  }
}
