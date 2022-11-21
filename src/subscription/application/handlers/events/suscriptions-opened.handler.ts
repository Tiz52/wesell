import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SuscriptionOpened } from '../../../domain/events/suscription-opened.event';

@EventsHandler(SuscriptionOpened)
export class SuscriptionOpenedHandler
  implements IEventHandler<SuscriptionOpened>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async handle(event: SuscriptionOpened) {
    console.log('handle logic for AccountOpened');
    console.log(event);
  }
}
