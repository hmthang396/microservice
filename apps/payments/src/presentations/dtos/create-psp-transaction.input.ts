import { PSPTransactionType } from '@app/libs/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePspTransaction {
  @IsNotEmpty({ message: "PaymentId can't empty" })
  @IsNumber()
  @Min(0)
  @Max(2000000000)
  payment_id!: number;

  @IsNotEmpty({ message: "IdempotencyKey can't empty" })
  @IsUUID()
  idempotency_key!: string;

  @IsNotEmpty({ message: "Token can't empty" })
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  token!: string;

  @IsNotEmpty({ message: "type can't empty" })
  @IsEnum(PSPTransactionType)
  type!: PSPTransactionType;

  @IsNotEmpty({ message: "UserId can't empty" })
  @IsNumber()
  @Min(0)
  @Max(2000000000)
  amount!: number;

  @IsNotEmpty({ message: "UserId can't empty" })
  @IsString()
  @MaxLength(3)
  @MinLength(0)
  currency!: string;
}
