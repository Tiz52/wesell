import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenSuscribe } from '../commands/open-suscriptions.command';
import { OpenSuscribeResponse } from '../dtos/response/open-suscriptions-response.dto';
import { OpenSuscriptionValidator } from '../validators/open-reservation.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { OpenSuscribeRequest } from '../dtos/request/open-suscriptions-request.dto';
import { SuscriptionType } from 'src/subscription/domain/enums/suscription-type.enum';

@Injectable()
export class SubscriptionApplicationService {
  constructor(
    private commandBus: CommandBus,
    private openAccountValidator: OpenSuscriptionValidator,
  ) {}

  async open(
    openAccountRequestDto: OpenSuscribeRequest,
  ): Promise<Result<AppNotification, OpenSuscribeResponse>> {
    const notification: AppNotification =
      await this.openAccountValidator.validate(openAccountRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const openAccount: OpenSuscribe = new OpenSuscribe(
      openAccountRequestDto.clientId,
      openAccountRequestDto.number,
    );
    const accountId: number = await this.commandBus.execute(openAccount);
    const openSuscriptionResponse: OpenSuscribeResponse =
      new OpenSuscribeResponse(
        accountId,
        openAccount.number,
        openAccount.number != '1'
          ? SuscriptionType.NORMAL
          : SuscriptionType.PREMIUM,
        null,
        1,
        null,
        null,
        openAccount.clientId,
      );
    return Result.ok(openSuscriptionResponse);
  }
}
