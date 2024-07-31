import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import { Validation } from '../../helpers';

export type PAYPAL_CONFIG = {
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  PAYPAL_URL: string;
  PAYPAL_MODE: string;
  PAYPAL_CANCEL_URL: string;
  PAYPAL_RETURN_URL: string;
  PAYPAL_BRAND_NAME: string;
};

export const EnvironmentVariables = z.object({
  PAYPAL_CLIENT_ID: z.string(),
  PAYPAL_CLIENT_SECRET: z.string(),
  PAYPAL_URL: z.string(),
  PAYPAL_MODE: z.string(),
  PAYPAL_CANCEL_URL: z.string(),
  PAYPAL_RETURN_URL: z.string(),
  PAYPAL_BRAND_NAME: z.string(),
});
export type EnvironmentVariables = z.infer<typeof EnvironmentVariables>;

export default registerAs<PAYPAL_CONFIG>('database', () => {
  const config: PAYPAL_CONFIG = {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || '',
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || '',
    PAYPAL_URL: process.env.PAYPAL_URL || '',
    PAYPAL_MODE: process.env.PAYPAL_MODE || '',
    PAYPAL_CANCEL_URL: process.env.PAYPAL_CANCEL_URL || '',
    PAYPAL_RETURN_URL: process.env.PAYPAL_RETURN_URL || '',
    PAYPAL_BRAND_NAME: process.env.PAYPAL_BRAND_NAME || '',
  };

  Validation.EnvValidation(config, EnvironmentVariables.safeParse);
  return config;
});
