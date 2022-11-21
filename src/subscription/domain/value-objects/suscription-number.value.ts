import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class SuscriptionNumber {
  private readonly value: string;
  private static MAX_LENGTH = 1;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(
    value: string,
  ): Result<AppNotification, SuscriptionNumber> {
    const notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('suscription number is required', null);
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
    return Result.ok(new SuscriptionNumber(value));
  }

  public getValue(): string {
    return this.value;
  }
}
