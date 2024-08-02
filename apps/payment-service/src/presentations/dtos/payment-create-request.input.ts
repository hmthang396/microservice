import { PaymentProvider } from '@app/libs/enums';
import { z } from 'zod';

export const Amount = z.object({
  currency_code: z
    .string({ required_error: 'Currency code is required' })
    .max(3, { message: "currency_code isn't empty" })
    .nonempty({ message: "currency_code isn't empty" }),
  value: z.number({ required_error: 'Name is required' }).min(0, { message: "value isn't empty" }),
});

export type Amount = z.infer<typeof Amount>;

export const Item = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, { message: 'name must be at least 1 character long' })
    .max(127, { message: 'name must be at most 127 characters long' })
    .nonempty({ message: "name can't be empty" }),
  quantity: z.number().max(10, { message: 'quantity must be at most 10' }),
  unit_amount: Amount,
  image_url: z
    .string()
    .min(1, { message: 'image_url must be at least 1 character long' })
    .max(2048, { message: 'image_url must be at most 2048 characters long' })
    .optional(),
  url: z
    .string()
    .min(1, { message: 'url must be at least 1 character long' })
    .max(2048, { message: 'url must be at most 2048 characters long' })
    .optional(),
});

export type Item = z.infer<typeof Item>;

export const BillingAddress = z.object({
  address_line_1: z
    .string()
    .max(300, { message: "The first line of the address can't be more than 300 characters" })
    .optional(),
  address_line_2: z
    .string()
    .max(300, { message: "The second line of the address can't be more than 300 characters" })
    .optional(),
  admin_area_2: z
    .string()
    .max(120, { message: "A city, town, or village can't be more than 120 characters" })
    .optional(),
  admin_area_1: z
    .string()
    .max(300, {
      message: "The highest-level sub-division in a country can't be more than 300 characters",
    })
    .optional(),
  postal_code: z.string().max(60, { message: "The postal code can't be more than 60 characters" }).optional(),
  country_code: z
    .string({
      required_error: 'Country code is required',
    })
    .length(2, { message: 'The country code only have 2 characters' }),
});

export type BillingAddress = z.infer<typeof BillingAddress>;

export const Card = z.object({
  name: z
    .string()
    .min(1, { message: "Name can't be less than 0" })
    .max(300, { message: "Name can't be more than 300 characters" }),
  number: z
    .string()
    .min(13, { message: "Card Number can't be less than 13" })
    .max(19, { message: "Card Number can't be more than 19 characters" }),
  security_code: z
    .string()
    .min(3, { message: "Code can't be less than 3" })
    .max(4, { message: "Code can't be more than 4 characters" }),
  expiry: z
    .string()
    .length(7, { message: 'Expiry only have 7 characters' })
    .regex(/^[0-9]{4}-(0[1-9]|1[0-2])$/, {
      message: 'The card expiration year and month, in Internet date format.',
    }),
  billing_address: BillingAddress.optional(),
});

export type Card = z.infer<typeof Card>;

export const ExperienceContext = z.object({
  return_url: z.string().url(),
  cancel_url: z.string().url(),
  brand_name: z
    .string()
    .min(0, { message: "Brand name can't be less than 1 characters" })
    .max(3, { message: "Brand name can't be more than 127 characters" }),
});

export type ExperienceContext = z.infer<typeof ExperienceContext>;

export const CreatePaymentInput = z.object({
  order_id: z
    .number()
    .min(0, { message: "OrderId can't be less than 0" })
    .max(2000000000, { message: "OrderId can't be more than 2000000000" }),
  user_id: z
    .number()
    .min(0, { message: "UserId can't be less than 0" })
    .max(2000000000, { message: "UserId can't be more than 2000000000" }),
  method: z.nativeEnum(PaymentProvider, { message: "Method can't be empty" }),
  amount: z
    .number()
    .min(0, { message: "Amount can't be less than 0" })
    .max(2000000000, { message: "Amount can't be more than 2000000000" }),
  currency: z
    .string()
    .min(0, { message: "Currency can't be less than 0 characters" })
    .max(3, { message: "Currency can't be more than 3 characters" })
    .nonempty({ message: "Currency can't be empty" }),
  idempotency_key: z
    .string()
    .uuid({ message: 'Idempotency key must be a valid UUID' })
    .nonempty({ message: "Idempotency key can't be empty" }),
  items: z.array(Item).nonempty({ message: "Items can't be empty" }).optional(),
  experience_context: ExperienceContext,
  payment_source: Card.optional(),
});

export type CreatePaymentInput = z.infer<typeof CreatePaymentInput>;
