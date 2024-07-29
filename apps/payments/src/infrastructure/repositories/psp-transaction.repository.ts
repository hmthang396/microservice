import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PspTransactionEntity } from '../../domain/entities/psp-transaction.entity';
import { EntityManager, Repository } from 'typeorm';
import { IPspTransactionRepository } from '../../domain/repositories/psp-transaction.repository.interface';

@Injectable()
export class PspTransactionRepository
  implements IPspTransactionRepository<PspTransactionEntity, EntityManager>
{
  constructor(
    @InjectRepository(PspTransactionEntity)
    private readonly pspTransactionEntityRepository: Repository<PspTransactionEntity>,
  ) {}
  getEntityManager(): EntityManager {
    return this.pspTransactionEntityRepository.manager;
  }
  async create(entity: PspTransactionEntity): Promise<PspTransactionEntity> {
    return await this.pspTransactionEntityRepository.save(entity);
  }
}
