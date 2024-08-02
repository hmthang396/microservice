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
    return dto;
  }
}
