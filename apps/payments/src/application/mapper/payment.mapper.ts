import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentCreateRequestDto } from '../../presentations/dtos/payment-create-request.dto';
import { CreatePaymentInput } from '../../presentations/dtos/payment-create-request.input';

export class PaymentMapper {
  public static toCreate(dto: CreatePaymentInput | PaymentCreateRequestDto) {
    const entity = new PaymentEntity();
    entity.amount = dto.amount;
    entity.currency = dto.currency;
    entity.provider = dto.method;
    entity.orderId = dto.order_id;
    entity.payerId = dto.user_id;
    return entity;
  }
}
