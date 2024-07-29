import { PaymentEntity } from '../../domain/entities/payment.entity';
import { CreatePaymentInput } from '../../presentations/dtos/payment-create-request.dto';

export class PaymentMapper {
  public static toCreate(dto: CreatePaymentInput) {
    const entity = new PaymentEntity();
    entity.amount = dto.amount;
    entity.currency = dto.currency;
    entity.provider = dto.method;
    entity.orderId = dto.order_id;
    entity.payerId = dto.user_id;
    return entity;
  }
}
