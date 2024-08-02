import { PSPTransactionType } from '@app/libs/enums';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';
import { CreatePspTransaction } from '../dtos/create-psp-transaction.input';
import { PaymentCreateRequestDto } from '@app/libs';

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

  public static toEntity(dto: PaymentCreateRequestDto, paymentId: number, token: string) {
    const entity = new PspTransactionEntity();
    entity.paymentId = paymentId;
    entity.amount = dto.amount;
    entity.currency = dto.currency;
    entity.idempotencyKey = dto.idempotencyKey;
    entity.type = PSPTransactionType.Payment;
    entity.token = token;
    return entity;
  }
}
