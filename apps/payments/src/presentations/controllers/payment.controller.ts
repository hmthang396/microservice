import { Controller, Inject } from '@nestjs/common';
import { CreatePaymentUseCases } from '@payments/application/usecases/create-payment.usecase';
import { UseCaseProvider } from '@payments/domain/enums/usecase-provider.enum';
import { UseCaseProxy } from '@payments/infrastructure/usecase-proxy/usecase-proxy';

@Controller()
export class PaymentController {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<CreatePaymentUseCases>,
  ) {}

  async createPayment(payload) {
    const dto = { ...payload };
    console.log(`run`, payload);

    const payment = await this.createPaymentUsecase.getInstance().execute(dto);
    return payment;
  }
}
