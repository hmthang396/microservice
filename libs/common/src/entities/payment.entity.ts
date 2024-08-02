import { PaymentProvider, PaymentStatus } from '../enums';

export class Payment {
  id: number;
  uuid: string;
  orderId: number;
  payerId: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number;
  currency: string;
  initiatedAt: Date;
  completedAt: Date;
  walletUpdated: boolean;
  ledgerUpdated: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
