import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SuscriptionTypeORM } from './infrastructure/entities/suscribe.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './api/subscriptions.controller';
import { SuscriptionOpenedHandler } from './application/handlers/events/suscriptions-opened.handler';
import { SubscriptionApplicationService } from './application/services/subscriptions-application.service';
import { OpenSuscriptionValidator } from './application/validators/open-reservation.validator';
import { GetSuscriptionsHandler } from './application/handlers/queries/get-suscriptions.handler';
import { GetSuscribeByIdHandler } from './application/handlers/queries/get-suscriptions-by-id.handler';
import { OpenSuscriptionHandler } from './application/handlers/commands/open-suscriptions.handler';

export const CommandHandlers = [OpenSuscriptionHandler];
export const EventHandlers = [SuscriptionOpenedHandler];
export const QueryHandlers = [GetSuscriptionsHandler, GetSuscribeByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([SuscriptionTypeORM])],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionApplicationService,
    OpenSuscriptionValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class SubscriptionModule {}
