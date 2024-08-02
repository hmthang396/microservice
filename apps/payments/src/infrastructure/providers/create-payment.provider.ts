import { CreatePaymentUseCases } from '../../application/usecases/create-payment.usecase';
import { UseCaseProvider } from '../../domain/enums/usecase-provider.enum';
import { UnitOfWork } from '../repositories/unit-of-work.service';
import { PaypalService } from '../services/paypal/paypal.service';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';

export const CreatePaymentProvier = {
  inject: [UnitOfWork, PaypalService],
  provide: UseCaseProvider.CreatePayment,
  useFactory: (uow: UnitOfWork, paypalService: PaypalService) =>
    new UseCaseProxy(new CreatePaymentUseCases(uow, paypalService)),
};
