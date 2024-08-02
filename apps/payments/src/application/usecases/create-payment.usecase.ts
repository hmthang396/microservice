import { EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { PaymentProvider } from '@app/libs/enums';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IsolationLevel, PaymentCreateRequestDto, Transactional } from '@app/libs';
import { dataSources, storage } from '@payments/infrastructure/storage/local-storage.module';
import { PaypalService } from '@payments/infrastructure/services/paypal/paypal.service';
import { PaypalMapper } from '@payments/presentations/mapper/paypal.mapper';
import { PspTransactionMapper } from '@payments/presentations/mapper/psp-transaction.mapper';
import { ICreatePaymentUseCases } from '@payments/domain/usecases/create-payment.usecase.interface';
import { CreatePaymentInput } from '@payments/presentations/dtos/payment-create-request.input';
import { PaymentEntity } from '@payments/domain/entities/payment.entity';
import { PaymentMapper } from '@payments/presentations/mapper/payment.mapper';
import { IUnitOfWork } from '@payments/domain/repositories';

export class CreatePaymentUseCases implements ICreatePaymentUseCases<CreatePaymentInput | PaymentCreateRequestDto> {
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
  async execute(dto: CreatePaymentInput | PaymentCreateRequestDto): Promise<PaymentEntity> {
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
          dto.idempotency_key,
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
        throw new BadRequestException('INVALID_PARAMETER', 'Unsupported payment method');
    }

    if (!paymentEntity) {
      throw new NotFoundException('Failed to create payment-order');
    }

    return paymentEntity;
  }
}
