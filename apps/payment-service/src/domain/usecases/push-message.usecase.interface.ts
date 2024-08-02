export interface IPushMessageUsecase<T> {
  execute(exchange: string, routingKey: string, message: T): Promise<boolean>;
}
