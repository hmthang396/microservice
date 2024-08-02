import { PaymentProvider } from '@app/libs/enums';
import { AmountRequest, BillingAddressRequest, CardRequest, ExperienceContextRequest, ItemRequest, PaymentCreateRequest } from '@app/libs/proto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class AmountDto implements AmountRequest {
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  @IsString({ message: 'Currency code is required' })
  @MaxLength(3, { message: "currency_code isn't empty" })
  currencyCode: string;

  @ApiProperty({ example: 100, description: 'Value' })
  @IsNumber({}, { message: 'Value is required' })
  @Min(0, { message: "value isn't empty" })
  value: number;
}
export class ItemDto implements ItemRequest {
  @ApiProperty({ example: 'Item name', description: 'Item name' })
  @IsString({ message: 'Name is required' })
  @MinLength(1, { message: 'name must be at least 1 character long' })
  @MaxLength(127, { message: 'name must be at most 127 characters long' })
  name: string;

  @ApiProperty({ example: 2, description: 'Quantity' })
  @IsNumber()
  @Max(10, { message: 'quantity must be at most 10' })
  quantity: number;

  @ApiProperty({ type: AmountDto, description: 'Unit amount' })
  @ValidateNested()
  @Type(() => AmountDto)
  unitAmount: AmountDto;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Image URL', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'image_url must be at least 1 character long' })
  @MaxLength(2048, { message: 'image_url must be at most 2048 characters long' })
  imageUrl: string;

  @ApiProperty({ example: 'https://example.com', description: 'URL', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'url must be at least 1 character long' })
  @MaxLength(2048, { message: 'url must be at most 2048 characters long' })
  url: string;
}

export class BillingAddressDto implements BillingAddressRequest {
  @ApiProperty({ example: '123 Main St', description: 'Address line 1', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(300, { message: "The first line of the address can't be more than 300 characters" })
  addressLine1: string;

  @ApiProperty({ example: 'Apt 4B', description: 'Address line 2', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(300, { message: "The second line of the address can't be more than 300 characters" })
  addressLine2: string;

  @ApiProperty({ example: 'New York', description: 'City', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(120, { message: "A city, town, or village can't be more than 120 characters" })
  adminArea2: string;

  @ApiProperty({ example: 'NY', description: 'State', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(300, { message: "The highest-level sub-division in a country can't be more than 300 characters" })
  adminArea1: string;

  @ApiProperty({ example: '10001', description: 'Postal code', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(60, { message: "The postal code can't be more than 60 characters" })
  postalCode: string;

  @ApiProperty({ example: 'US', description: 'Country code' })
  @IsString({ message: 'Country code is required' })
  @Length(2, 2, { message: 'The country code only has 2 characters' })
  countryCode: string;
}

export class CardDto implements CardRequest {
  @ApiProperty({ example: 'John Doe', description: 'Cardholder name' })
  @IsString()
  @MinLength(1, { message: "Name can't be less than 0" })
  @MaxLength(300, { message: "Name can't be more than 300 characters" })
  name: string;

  @ApiProperty({ example: '4111111111111111', description: 'Card number' })
  @IsString()
  @MinLength(13, { message: "Card Number can't be less than 13" })
  @MaxLength(19, { message: "Card Number can't be more than 19 characters" })
  number: string;

  @ApiProperty({ example: '123', description: 'Security code' })
  @IsString()
  @MinLength(3, { message: "Code can't be less than 3" })
  @MaxLength(4, { message: "Code can't be more than 4 characters" })
  securityCode: string;

  @ApiProperty({ example: '2024-12', description: 'Expiry date' })
  @IsString()
  @Length(7, 7, { message: 'Expiry only has 7 characters' })
  @Matches(/^[0-9]{4}-(0[1-9]|1[0-2])$/, {
    message: 'The card expiration year and month, in Internet date format.',
  })
  expiry: string;

  @ApiProperty({ type: BillingAddressDto, description: 'Billing address', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => BillingAddressDto)
  billingAddress: BillingAddressDto;
}

export class ExperienceContext implements ExperienceContextRequest {
  @ApiProperty({ example: 'https://example.com/return', description: 'Return URL' })
  @IsUrl()
  returnUrl: string;

  @ApiProperty({ example: 'https://example.com/cancel', description: 'Cancel URL' })
  @IsUrl()
  cancelUrl: string;

  @ApiProperty({ example: 'MyShop', description: 'Brand name' })
  @IsString()
  @MinLength(1, { message: "Brand name can't be less than 1 character" })
  @MaxLength(127, { message: "Brand name can't be more than 127 characters" })
  brandName: string;
}

export class PaymentCreateRequestDto implements PaymentCreateRequest {
  @ApiProperty({ example: 12345, description: 'Order ID' })
  @IsNumber()
  @Min(0, { message: "OrderId can't be less than 0" })
  @Max(2000000000, { message: "OrderId can't be more than 2000000000" })
  orderId: number;

  @ApiProperty({ example: 12345, description: 'User ID' })
  @IsNumber()
  @Min(0, { message: "UserId can't be less than 0" })
  @Max(2000000000, { message: "UserId can't be more than 2000000000" })
  userId: number;

  @ApiProperty({ enum: PaymentProvider, description: 'Payment method' })
  @IsEnum(PaymentProvider, { message: 'Payment method must be one of the following values: Paypal, Stripe, COD, Visa' })
  method: string;

  @ApiProperty({ example: 200, description: 'Amount' })
  @IsNumber()
  @Min(0, { message: "Amount can't be less than 0" })
  @Max(2000000000, { message: "Amount can't be more than 2000000000" })
  amount: number;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  @IsString()
  @MinLength(1, { message: "Currency can't be less than 1 character" })
  @MaxLength(3, { message: "Currency can't be more than 3 characters" })
  currency: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Idempotency key' })
  @IsString()
  @IsUUID()
  @MinLength(1, { message: "Idempotency key can't be empty" })
  idempotencyKey: string;

  @ApiProperty({ type: [ItemDto], description: 'Items', required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @ApiProperty({ type: ExperienceContext, description: 'Experience context' })
  @ValidateNested()
  @Type(() => ExperienceContext)
  experienceContext: ExperienceContext;

  @ApiProperty({ type: CardDto, description: 'Payment source', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CardDto)
  paymentSource: CardDto;
}
