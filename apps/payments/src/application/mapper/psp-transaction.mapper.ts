import { PSPTransactionType } from '@app/libs/enums';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';
import { CreatePspTransaction } from '../../presentations/dtos/create-psp-transaction.input';
import { CreatePaymentInput } from '../../presentations/dtos/payment-create-request.input';
import { PaymentCreateRequestDto } from '../../presentations/dtos/payment-create-request.dto';

export class PspTransactionMapper {
  public static toCreate(dto: CreatePspTransaction) {
    const entity = new PspTransactionEntity();
    entity.paymentId = dto.payment_id;
    entity.amount = dto.amount;
    entity.currency = dto.currency;
    entity.idempotencyKey = dto.idempotency_key;
    entity.type = dto.type;
    entity.token = dto.token;
    return entity;
  }

  public static toEntity(dto: CreatePaymentInput | PaymentCreateRequestDto, paymentId: number, token: string) {
    const entity = new PspTransactionEntity();
    entity.paymentId = paymentId;
    entity.amount = dto.amount;
    entity.currency = dto.currency;
    entity.idempotencyKey = dto.idempotency_key;
    entity.type = PSPTransactionType.Payment;
    entity.token = token;
    return entity;
  }
}
