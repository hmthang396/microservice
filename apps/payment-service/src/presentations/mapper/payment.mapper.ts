import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentCreateRequestDto, PaymentCreateResponseDto, PaymentProvider } from '@app/libs';

export class PaymentMapper {
  public static toCreate(dto: PaymentCreateRequestDto) {
    const entity = new PaymentEntity();
    entity.amount = dto.amount;
    entity.currency = dto.currency;
    entity.provider = PaymentProvider[dto.method];
    entity.orderId = dto.orderId;
    entity.payerId = dto.userId;
    return entity;
  }

  public static async toResponse(entity: Promise<PaymentEntity>): Promise<PaymentCreateResponseDto> {
    const payment = await entity;
    const dto = new PaymentCreateResponseDto();
    dto.id = payment.id;
    dto.amount = payment.amount;
    dto.completedAt = payment?.completedAt ? payment.completedAt.toUTCString() : null;
    dto.createdAt = payment?.createdAt ? payment.createdAt.toUTCString() : null;
    dto.currency = payment.currency;
    dto.deletedAt = payment?.deletedAt ? payment.deletedAt.toUTCString() : null;
    dto.initiatedAt = payment?.initiatedAt ? payment.initiatedAt.toUTCString() : null;
    dto.ledgerUpdated = payment.ledgerUpdated;
    dto.orderId = payment.orderId;
    dto.payerId = payment.payerId;
    dto.provider = payment.provider;
    dto.status = payment.status;
    dto.updatedAt = payment?.updatedAt ? payment.updatedAt.toUTCString() : null;
    dto.uuid = payment.uuid;
    dto.walletUpdated = payment.walletUpdated;

    return dto;
  }
}
