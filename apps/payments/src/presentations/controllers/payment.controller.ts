import {
  PaymentCreateRequest,
  PaymentCreateResponse,
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/libs/proto';
import { Controller, Inject } from '@nestjs/common';
import { UseCaseProvider } from '@payments/domain/enums/usecase-provider.enum';
import { UseCaseProxy } from '@payments/infrastructure/usecase-proxy/usecase-proxy';
import { Observable } from 'rxjs';
import { PaymentMapper } from '../mapper/payment.mapper';
import { ICreatePaymentUseCases } from '@payments/domain/usecases/create-payment.usecase.interface';
import { PaymentCreateRequestDto } from '@app/libs';
import { ValidateGrpcInput } from '@app/libs/decorators/validation-grpc-input.decorator';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentController implements PaymentsServiceController {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<ICreatePaymentUseCases<PaymentCreateRequestDto>>,
  ) {}

  @ValidateGrpcInput(PaymentCreateRequestDto)
  createPayment(
    request: PaymentCreateRequest,
  ): PaymentCreateResponse | Promise<PaymentCreateResponse> | Observable<PaymentCreateResponse> {
    const entity = this.createPaymentUsecase.getInstance().execute(request);
    return PaymentMapper.toResponse(entity);
  }
}
