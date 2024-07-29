import { BadRequestException, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { CreatePaymentInput } from '../dtos/payment-create-request.dto';
import { UseCaseProvider } from 'apps/payments/src/domain/enums/usecase-provider.enum';
import { UseCaseProxy } from 'apps/payments/src/infrastructure/usecase-proxy/usecase-proxy';
import { CreatePaymentUseCases } from 'apps/payments/src/application/usecases/create-payment.usecase';

@Controller({
  version: '1',
  path: 'payments',
})
export class PaymentController {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<CreatePaymentUseCases>,
  ) {}

  @Post('/')
  async createPayment(payload: CreatePaymentInput) {
    const isValid = CreatePaymentInput.safeParse(payload);
    if (!isValid.success) {
      // !TODO: Handle input data error
      throw new BadRequestException('INVALID_PARAMETER', isValid.error.message);
    }
    const payment = await this.createPaymentUsecase.getInstance().execute(payload);
    // !Todo: send message
    return;
  }
}
