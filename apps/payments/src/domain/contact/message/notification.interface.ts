import { NotificationType } from 'apps/payments/src/domain/enums/notification.enum';
import { IMessage } from './message.interface';

export interface INotification<T> extends IMessage {
  data: T;
  type: NotificationType;
}
