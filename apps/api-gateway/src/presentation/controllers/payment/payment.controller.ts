import { UseCaseProvider } from '@api-gateway/domain/enums/providers';
import { ICreatePaymentUseCases } from '@api-gateway/domain/usecases/create-payment.usecase.interface';
import { UseCaseProxy } from '@api-gateway/infrastrucure/usecase-proxy/usecase-proxy';
import { ApiGlobalResponse, PaymentCreateRequestDto, PaymentCreateResponseDto } from '@app/libs';
import { Body, Controller, HttpCode, Inject, Post, ValidationPipe } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'payments',
})
export class PaymentController {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<ICreatePaymentUseCases<PaymentCreateRequestDto>>,
  ) {}

  @ApiGlobalResponse(PaymentCreateResponseDto)
  @Post('')
  @HttpCode(201)
  createPayment(
    @Body(ValidationPipe) request: PaymentCreateRequestDto,
  ): PaymentCreateResponseDto | Promise<PaymentCreateResponseDto> {
    const entity = this.createPaymentUsecase.getInstance().execute(request);
    return entity;
  }
}
