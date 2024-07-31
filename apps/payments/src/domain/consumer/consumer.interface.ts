export interface IConsumer<T, U> {
  handlerMessage(payload: T, msg: U): void;
  handlerFailedMessage(payload: T, msg: U): void;
}
