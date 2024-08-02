import { CreatePaymentUseCases } from '@api-gateway/application/usecases/create-payment.usecase';
import { UseCaseProvider } from '@api-gateway/domain/enums/providers';
import { UseCaseProxy } from '@api-gateway/infrastrucure/usecase-proxy/usecase-proxy';
import { PAYMENTS_PACKAGE_NAME } from '@app/libs/proto';
import { ClientGrpc } from '@nestjs/microservices';

export const CreatePaymentProvier = {
  inject: [PAYMENTS_PACKAGE_NAME],
  provide: UseCaseProvider.CreatePayment,
  useFactory: (client: ClientGrpc) => {
    return new UseCaseProxy(new CreatePaymentUseCases(client));
  },
};
