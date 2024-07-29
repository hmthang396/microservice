import { EntityManager } from 'typeorm';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { ICreatePaymentUseCases } from '../../domain/usecases/create-payment.usecase.interface';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { Card, CreatePaymentInput } from '../../presentations/dtos/payment-create-request.dto';
import { PaymentMapper } from '../mapper/payment.mapper';
import { PaymentProvider } from '@app/libs/enums';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PaypalService } from '../../infrastructure/services/paypal/paypal.service';
import { PspTransactionMapper } from '../mapper/psp-transaction.mapper';
import { PaypalMapper } from '../mapper/paypal.mapper';
import { IPspTransactionRepository } from '../../domain/repositories/psp-transaction.repository.interface';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';

export class CreatePaymentUseCases implements ICreatePaymentUseCases<CreatePaymentInput> {
  constructor(
    private readonly paymentRepository: IPaymentRepository<PaymentEntity, EntityManager>,
    private readonly pspTransactionsRepository: IPspTransactionRepository<
      PspTransactionEntity,
      EntityManager
    >,
    private readonly paypalService: PaypalService,
  ) {}

  async execute(dto: CreatePaymentInput): Promise<PaymentEntity> {
    let paymentEntity: PaymentEntity | null = null;
    return await this.paymentRepository
      .getEntityManager()
      .transaction(async () => {
        // Create Payment
        paymentEntity = await this.paymentRepository.create(PaymentMapper.toCreate(dto));

        // Initialize the pspTransactions array
        paymentEntity.pspTransactions = [];

        // Create psp-transaction based on the payment method
        switch (dto.method) {
          case PaymentProvider.Paypal:
          case PaymentProvider.Visa:
            if (dto.method === PaymentProvider.Visa) {
              if (!Card.safeParse(dto?.payment_source).success || !dto?.payment_source) {
                throw new BadRequestException(
                  'MISSING_PARAMETER',
                  'The card information is required for debit or credit card payments.',
                );
              }
            }

            const orderOfPayment = await this.paypalService.createOrder(
              PaypalMapper.toOrderRequest(dto),
              dto.idempotency_key,
            );

            // Create transaction for psp
            let paypal_transaction = PspTransactionMapper.toEntity(
              dto,
              paymentEntity.id,
              orderOfPayment.id,
            );

            paypal_transaction = await this.pspTransactionsRepository.create(paypal_transaction);

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
      });
  }
}
