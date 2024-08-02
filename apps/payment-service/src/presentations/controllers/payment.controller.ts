import {
  GetHealthRequest,
  HealthCheckResponse,
  PaymentCreateRequest,
  PaymentCreateResponse,
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/libs/proto';
import { Controller, Inject } from '@nestjs/common';
import { UseCaseProvider } from 'apps/payment-service/src/domain/enums/usecase-provider.enum';
import { UseCaseProxy } from 'apps/payment-service/src/infrastructure/usecase-proxy/usecase-proxy';
import { Observable } from 'rxjs';
import { PaymentMapper } from '../mapper/payment.mapper';
import { ICreatePaymentUseCases } from 'apps/payment-service/src/domain/usecases/create-payment.usecase.interface';
import { PaymentCreateRequestDto } from '@app/libs';
import { ValidateGrpcInput } from '@app/libs/decorators/validation-grpc-input.decorator';
@Controller()
@PaymentsServiceControllerMethods()
export class PaymentController implements PaymentsServiceController {
  constructor(
    @Inject(UseCaseProvider.CreatePayment)
    private readonly createPaymentUsecase: UseCaseProxy<ICreatePaymentUseCases<PaymentCreateRequestDto>>,
  ) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  getHealth(
    request: GetHealthRequest,
  ): HealthCheckResponse | Promise<HealthCheckResponse> | Observable<HealthCheckResponse> {
    return { status: 'OK' };
  }

  @ValidateGrpcInput(PaymentCreateRequestDto)
  createPayment(
    request: PaymentCreateRequest,
  ): PaymentCreateResponse | Promise<PaymentCreateResponse> | Observable<PaymentCreateResponse> {
    const entity = this.createPaymentUsecase.getInstance().execute(request);
    const result = PaymentMapper.toResponse(entity);
    return result;
  }
}
