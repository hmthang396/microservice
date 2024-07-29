import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PaymentRepository implements IPaymentRepository<PaymentEntity, EntityManager> {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentEntityRepository: Repository<PaymentEntity>,
  ) {}

  public getEntityManager(): EntityManager {
    return this.getEntityManager();
  }

  public async create(payment: PaymentEntity) {
    try {
      return await this.paymentEntityRepository.save(payment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  update(): Promise<PaymentEntity> {
    throw new Error('Method not implemented.');
  }
  softDelete(): Promise<PaymentEntity> {
    throw new Error('Method not implemented.');
  }
}
