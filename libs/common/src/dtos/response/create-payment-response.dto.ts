import { PaymentProvider, PaymentStatus } from '@app/libs/enums';
import { PaymentCreateResponse } from '@app/libs/proto';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentCreateResponseDto implements PaymentCreateResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier for the payment' })
  id: number;

  @ApiProperty({ example: 'e7c14b4e-4f85-4e1b-88a2-42b2f74e5b1f', description: 'UUID for the payment' })
  uuid: string;

  @ApiProperty({ example: 123, description: 'ID of the related order' })
  orderId: number;

  @ApiProperty({ example: 456, description: 'ID of the payer' })
  payerId: number;

  @ApiProperty({ enum: PaymentProvider, description: 'Payment provider used' })
  provider: string;

  @ApiProperty({ enum: PaymentStatus, description: 'Current status of the payment' })
  status: string;

  @ApiProperty({ example: 99.99, description: 'Amount involved in the payment' })
  amount: number;

  @ApiProperty({ example: 'USD', description: 'Currency of the payment' })
  currency: string;

  @ApiProperty({ example: '2023-08-14T09:30:00Z', description: 'Time when the payment was initiated' })
  initiatedAt: string;

  @ApiProperty({ example: '2023-08-14T09:45:00Z', nullable: true, description: 'Time when the payment was completed' })
  completedAt: string;

  @ApiProperty({ example: false, description: 'Whether the wallet has been updated' })
  walletUpdated: boolean;

  @ApiProperty({ example: false, description: 'Whether the ledger has been updated' })
  ledgerUpdated: boolean;

  //   @ApiProperty({ type: [PspTransactionEntity], description: 'List of PSP transactions related to this payment' })
  //   pspTransactions: PspTransactionEntity[];

  @ApiProperty({ example: '2023-08-14T09:00:00Z', description: 'Time when the payment record was created' })
  createdAt: string;

  @ApiProperty({ example: '2023-08-14T10:00:00Z', description: 'Time when the payment record was last updated' })
  updatedAt: string;

  @ApiProperty({
    example: '2023-08-15T09:00:00Z',
    nullable: true,
    description: 'Time when the payment record was deleted, if applicable',
  })
  deletedAt: string;
}
