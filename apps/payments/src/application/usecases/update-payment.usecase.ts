import { EntityManager } from 'typeorm';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { IUpdatePaymentUseCases } from '../../domain/usecases/update-payment.usecase.interface';

export class UpdatePaymentUseCases implements IUpdatePaymentUseCases {
  constructor(private paymentRepository: IPaymentRepository<PaymentEntity, EntityManager>) {}

  async execute(dto: any): Promise<PaymentEntity> {
    return await this.paymentRepository.update();
  }
}
