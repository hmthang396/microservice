export interface PaypalConfig {
  getPaypalClientId(): string;
  getPaypalClientSecret(): string;
  getPaypalURL(): string;
  getPaypalMODE(): string;
  getPaypalCancelURL(): string;
  getPaypalReturnURL(): string;
  getPaypalBrandName(): string;
}
