import { BadRequestException, Body, Controller, HttpCode, Inject, Injectable, Post } from '@nestjs/common';
import { CreatePaymentInput } from '../dtos/payment-create-request.input';
import { UseCaseProvider } from 'apps/payments/src/domain/enums/usecase-provider.enum';
import { UseCaseProxy } from 'apps/payments/src/infrastructure/usecase-proxy/usecase-proxy';
import { CreatePaymentUseCases } from 'apps/payments/src/application/usecases/create-payment.usecase';
import { PaymentCreateRequestDto } from '../dtos/payment-create-request.dto';
import { ApiGlobalResponse } from '../../infrastructure/common/decorators/api-global-response.decorators';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'payments',
})
export class PaymentController {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<CreatePaymentUseCases>,
  ) {}

  @ApiGlobalResponse(PaymentEntity)
  @ApiOperation({ description: 'Branch Create for Admin' })
  @Post('/')
  @HttpCode(201)
  async createPayment(@Body() payload: PaymentCreateRequestDto) {
    const payment = await this.createPaymentUsecase.getInstance().execute(payload);
    return payment;
  }
}
