import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OpenSuscribe } from '../../commands/open-suscriptions.command';
import { SuscriptionTypeORM } from '../../../infrastructure/entities/suscribe.typeorm';
import { SuscriptionNumber } from '../../../domain/value-objects/suscription-number.value';
import { SuscriptionFactory } from '../../../domain/factories/suscription.factory';
import { Suscription } from '../../../domain/entities/suscription.entity';
import { SuscriptionMapper } from '../../mappers/suscription.mapper';
import { ClientId } from '../../../../clients/domain/value-objects/client-id.value';
import { SuscriptionId } from '../../../domain/value-objects/Suscription-id.value';
import { TypeSuscription } from 'src/subscription/domain/value-objects/type-suscription.value';

@CommandHandler(OpenSuscribe)
export class OpenSuscriptionHandler implements ICommandHandler<OpenSuscribe> {
  constructor(
    @InjectRepository(SuscriptionTypeORM)
    private suscriptionRepository: Repository<SuscriptionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: OpenSuscribe) {
    let suscriptionId = 0;
    const suscriptionNumberResult: Result<AppNotification, SuscriptionNumber> =
      SuscriptionNumber.create(command.number);
    if (suscriptionNumberResult.isFailure()) {
      return suscriptionId;
    }
    const clientId: ClientId = ClientId.of(command.clientId);
    const type: Result<AppNotification, TypeSuscription> =
      command.number == '1'
        ? TypeSuscription.create('1')
        : TypeSuscription.create('2');
    if (type.isFailure()) {
      return suscriptionId;
    }
    let suscription: Suscription = SuscriptionFactory.createFrom(
      suscriptionNumberResult.value,
      clientId,
      type.value,
      null,
    );
    let suscriptionTypeORM: SuscriptionTypeORM =
      SuscriptionMapper.toTypeORM(suscription);
    suscriptionTypeORM = await this.suscriptionRepository.save(
      suscriptionTypeORM,
    );
    if (suscriptionTypeORM == null) {
      return suscriptionId;
    }
    suscriptionId = Number(suscriptionTypeORM.id);
    suscription.changeId(SuscriptionId.of(suscriptionId));
    suscription = this.publisher.mergeObjectContext(suscription);
    suscription.open();
    suscription.commit();
    return suscriptionId;
  }
}
