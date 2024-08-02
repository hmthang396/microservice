import { EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { PaymentProvider } from '@app/libs/enums';
import { IsolationLevel, PaymentCreateRequestDto, Transactional } from '@app/libs';
import { dataSources, storage } from 'apps/payment-service/src/infrastructure/storage/local-storage.module';
import { PaypalService } from 'apps/payment-service/src/infrastructure/services/paypal/paypal.service';
import { PaypalMapper } from 'apps/payment-service/src/presentations/mapper/paypal.mapper';
import { PspTransactionMapper } from 'apps/payment-service/src/presentations/mapper/psp-transaction.mapper';
import { ICreatePaymentUseCases } from 'apps/payment-service/src/domain/usecases/create-payment.usecase.interface';
import { PaymentEntity } from 'apps/payment-service/src/domain/entities/payment.entity';
import { PaymentMapper } from 'apps/payment-service/src/presentations/mapper/payment.mapper';
import { IUnitOfWork } from 'apps/payment-service/src/domain/repositories';
import { GrpcInternalException } from '@app/libs/exceptions/gRPC';

export class CreatePaymentUseCases implements ICreatePaymentUseCases<PaymentCreateRequestDto> {
  constructor(
    private readonly unitOfWork: IUnitOfWork<Repository<ObjectLiteral>, EntityTarget<ObjectLiteral>, EntityManager>,
    private readonly paypalService: PaypalService,
  ) {}

  @Transactional({
    replication: false,
    isolationLevel: IsolationLevel.READ_COMMITTED,
    dataSources: dataSources,
    storage: storage,
  })
  async execute(dto: PaymentCreateRequestDto): Promise<PaymentEntity> {
    // Create Payment
    const paymentEntity = await this.unitOfWork.getPaymentRepository().create(PaymentMapper.toCreate(dto));

    // Initialize the pspTransactions array
    paymentEntity.pspTransactions = [];

    // Create psp-transaction based on the payment method
    switch (dto.method) {
      case PaymentProvider.Paypal:
      // !Todo: implement payment with paypal account
      case PaymentProvider.Visa:
        const orderOfPayment = await this.paypalService.createOrder(
          PaypalMapper.toOrderRequest(dto),
          dto.idempotencyKey,
        );

        // Create transaction for psp
        let paypal_transaction = PspTransactionMapper.toEntity(dto, paymentEntity.id, orderOfPayment.id);

        paypal_transaction = await this.unitOfWork.getPspTransactionRepositor().create(paypal_transaction);

        paymentEntity.pspTransactions[0] = paypal_transaction;
        break;
      case PaymentProvider.COD:
        break;
      case PaymentProvider.Stripe:
        break;
      default:
        throw new GrpcInternalException({
          field: 'method',
          errors: ['Payment method must be one of the following values: Paypal, Stripe, COD, Visa'],
        });
    }

    if (!paymentEntity) {
      throw new GrpcInternalException('Failed to create payment-order');
    }

    return paymentEntity;
  }
}
