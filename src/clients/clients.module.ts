import { Module } from '@nestjs/common';
import { ClientsController } from './interface/rest/clients.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';
import { GetCustomersPersonHandler } from './application/handlers/queries/get-customers-person.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { PersonTypeORM } from './infrastructure/entities/person.typeorm';
import { ClientTypeORM } from './infrastructure/entities/client.typeorm';

export const CommandHandlers = [RegisterPersonHandler];
export const EventHandlers = [PersonRegisteredHandler];
export const QueryHandlers = [GetCustomersPersonHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ClientTypeORM, PersonTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [ClientsController],
  providers: [
    PersonApplicationService,
    RegisterPersonValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ClientsModule {}
