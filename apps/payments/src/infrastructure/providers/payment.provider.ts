import { CreatePaymentUseCases } from '../../application/usecases/create-payment.usecase';
import { UseCaseProvider } from '../../domain/enums/usecase-provider.enum';
import { PaymentRepository } from '../repositories/payment.repository';
import { PspTransactionRepository } from '../repositories/psp-transaction.repository';
import { PaypalModule } from '../services/paypal/paypal.module';
import { PaypalService } from '../services/paypal/paypal.service';
import { UseCaseProxy } from '../usecase-proxy/usecase-proxy';

export const PaymentProvier = {
  inject: [PaymentRepository,PspTransactionRepository,PaypalModule],
  provide: UseCaseProvider.CreatePayment,
  useFactory: (
    paymentRepository: PaymentRepository,
    pspTransactionsRepository: PspTransactionRepository,
    paypalService: PaypalService,
  ) =>
    new UseCaseProxy(
      new CreatePaymentUseCases(paymentRepository, pspTransactionsRepository, paypalService),
    ),
};
