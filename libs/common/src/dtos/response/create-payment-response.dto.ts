import { PaymentCreateResponse } from "@app/libs/proto";

export class PaymentCreateResponseDto implements PaymentCreateResponse {
	id: number;
	uuid: string;
	orderId: number;
	payerId: number;
	provider: string;
	status: string;
	amount: number;
	currency: string;
	initiatedAt: string;
	completedAt: string;
	walletUpdated: boolean;
	ledgerUpdated: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}