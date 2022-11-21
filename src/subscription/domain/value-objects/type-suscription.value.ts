import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class TypeSuscription {
  private readonly value: string;
  private static MAX_LENGTH = 15;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(
    value: string,
  ): Result<AppNotification, TypeSuscription> {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('Type suscription is required', null);
    }
    if (value.length > this.MAX_LENGTH) {
      notification.addError(
        'The maximum length of an suscription number is ' +
          this.MAX_LENGTH +
          ' characters including spaces',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new TypeSuscription(value));
  }

  public getValue(): string {
    return this.value;
  }
}
