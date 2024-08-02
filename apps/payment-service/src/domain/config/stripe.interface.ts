export interface StripeConfig {
  getStripePublishableKey(): string;
  getStripeSecretKey(): string;
  getStripeCancelURL(): string;
  getStripeReturnURL(): string;
  getStripeURL(): string;
}
