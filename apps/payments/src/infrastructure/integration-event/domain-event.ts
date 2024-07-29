import { NotificationType } from 'apps/payments/src/domain/enums/notification.enum';
import { INotification } from '../../domain/contact/message/notification.interface';

export class DomainEvent<T> {
  static CreatePaymentNotificationEvent = class<T> implements INotification<T> {
    data: T;
    id: number;
    timerStamp: Date;
    type: NotificationType;
    constructor(data: T, id: number, timerStamp: Date) {
      this.data = data;
      this.id = id;
      this.timerStamp = timerStamp;
    }
  };

  static PaymentCreatedNotificationEvent = class<T> implements INotification<T> {
    data: T;
    id: number;
    timerStamp: Date;
    type: NotificationType;

    constructor(data: T, id: number, timerStamp: Date) {
      this.data = data;
      this.id = id;
      this.timerStamp = timerStamp;
    }
  };
}
// const a = new DomainEvent.CreatePaymentNotificationEvent<number>(1,1,new Date())
