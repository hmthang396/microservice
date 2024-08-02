import { ICreatePaymentUseCases } from '@api-gateway/domain/usecases/create-payment.usecase.interface';
import { PaymentCreateRequestDto } from '@app/libs';
import { PAYMENTS_SERVICE_NAME, PaymentCreateResponse, PaymentsServiceClient } from '@app/libs/proto';
import { ClientGrpc } from '@nestjs/microservices';

export class CreatePaymentUseCases implements ICreatePaymentUseCases<PaymentCreateRequestDto> {
  private paymentService: PaymentsServiceClient;

  constructor(private client: ClientGrpc) {
    this.paymentService = this.client.getService<PaymentsServiceClient>(PAYMENTS_SERVICE_NAME);
  }

  async execute(dto: PaymentCreateRequestDto): Promise<PaymentCreateResponse> {
    return await this.paymentService.createPayment(dto).toPromise();
  }
}
