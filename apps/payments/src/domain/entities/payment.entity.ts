import { PaymentProvider, PaymentStatus } from '@app/libs/enums';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ObjectLiteral,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PspTransactionEntity } from './psp-transaction.entity';

@Entity({ schema: 'public', name: 'payments' })
@Unique('IDX_3b6f5ba978729c5038646dea70', ['orderId', 'payerId'], {
  deferrable: 'INITIALLY IMMEDIATE',
})
export class PaymentEntity implements ObjectLiteral {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'uuid', type: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({
    name: 'order_id',
    type: 'integer',
    nullable: false,
  })
  @Index('IDX_fe52f02449eaf27be2b2cb7acd')
  orderId: number;

  @Column({
    name: 'payer_id',
    type: 'integer',
    nullable: false,
  })
  @Index('IDX_edb1ecdd81ccd1462789350aaa')
  payerId: number;

  @Column({
    name: 'provider',
    type: 'enum',
    enum: PaymentProvider,
    nullable: false,
  })
  provider: PaymentProvider;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PaymentStatus,
    nullable: false,
    default: PaymentStatus.Initiated,
  })
  status: PaymentStatus;

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

  @Column({
    name: 'wallet_updated',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  walletUpdated: boolean;

  @Column({
    name: 'ledger_updated',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  ledgerUpdated: boolean;

  @OneToMany(() => PspTransactionEntity, (psp_transactions) => psp_transactions.payment)
  pspTransactions!: PspTransactionEntity[];

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
