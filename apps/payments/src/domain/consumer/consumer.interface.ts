export interface IConsumer<T, U> {
  createPayment(payload: T, msg: U): void;
}
