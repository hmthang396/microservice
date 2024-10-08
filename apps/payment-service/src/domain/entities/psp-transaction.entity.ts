import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { PSPTransactionStatus, PSPTransactionType } from '@app/libs/enums';

@Entity({ schema: 'public', name: 'psp_transactions' })
export class PspTransactionEntity implements ObjectLiteral {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'uuid', type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'payment_id', type: 'integer' })
  paymentId: number;

  @ManyToOne(() => PaymentEntity, (payment) => payment.pspTransactions)
  @JoinColumn({ name: 'payment_id' })
  payment: PaymentEntity;

  @Column({
    name: 'idempotency_key',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  idempotencyKey: string;

  @Column({
    name: 'token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  token: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: PSPTransactionType,
    nullable: false,
  })
  type: PSPTransactionType;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PSPTransactionStatus,
    nullable: false,
    default: PSPTransactionStatus.Initiated,
  })
  status: PSPTransactionStatus;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  amount: number;

  @Column({ length: 3 })
  currency: string;

  @CreateDateColumn({
    name: 'initiated_at',
    type: 'datetime',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
    nullable: false,
  })
  initiatedAt: Date;

  @Column({
    name: 'completed_at',
    type: 'datetime',
    nullable: true,
    default: null,
  })
  completedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    default: null,
    nullable: true,
  })
  deletedAt: Date;
}
