import { z } from 'zod';
import { ExperienceContext, Item } from './payment-create-request.dto';

export const CreateOrderInput = z.object({
  order_id: z
    .number()
    .min(0, { message: "OrderId can't be less than 0" })
    .max(2000000000, { message: "OrderId can't be more than 2000000000" }),
  user_id: z
    .number()
    .min(0, { message: "UserId can't be less than 0" })
    .max(2000000000, { message: "UserId can't be more than 2000000000" }),
  amount: z
    .number()
    .min(0, { message: "Amount can't be less than 0" })
    .max(2000000000, { message: "Amount can't be more than 2000000000" }),
  currency_code: z
    .string()
    .min(0, { message: "Currency can't be less than 0 characters" })
    .max(3, { message: "Currency can't be more than 3 characters" })
    .nonempty({ message: "Currency can't be empty" }),
  idempotency_key: z
    .string()
    .uuid({ message: 'IdempotencyKey must be a valid UUID' })
    .nonempty({ message: "IdempotencyKey can't be empty" }),
  items: z.array(Item).nonempty({ message: "Items can't be empty" }).optional(),
  experience_context: ExperienceContext.optional(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderInput>;
