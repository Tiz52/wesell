import { Module } from '@nestjs/common';
import { ClientsService } from './application/services/clients.service';
import { ClientsController } from './api/clients.controller';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
