export interface PaymentMethod<Input, Output> {
  processPayment(dto: Input): Promise<Output> | Output;
}
