import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { SuscriptionTypeORM } from '../../infrastructure/entities/suscribe.typeorm';
import { OpenSuscribeRequest } from '../dtos/request/open-suscriptions-request.dto';

@Injectable()
export class OpenSuscriptionValidator {
  constructor(
    @InjectRepository(SuscriptionTypeORM)
    private accountRepository: Repository<SuscriptionTypeORM>,
  ) {}

  public async validate(
    openSuscriptionRequestDto: OpenSuscribeRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const number: string = openSuscriptionRequestDto.number.trim();
    const client_id: string = openSuscriptionRequestDto.clientId.toString();
    if (number.length <= 0) {
      notification.addError('Suscription number is required', null);
    }
    if (+number < 1 || +number > 2) {
      notification.addError('Suscription number is unknown', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const suscriptionTypeORM: SuscriptionTypeORM = await this.accountRepository
      .createQueryBuilder()
      .where('client_id = :client_id', { client_id })
      .getOne();
    if (suscriptionTypeORM != null) {
      notification.addError('Suscription number is taken', null);
    }
    return notification;
  }
}
