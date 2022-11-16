import { Module } from '@nestjs/common';
import { AccountsService } from './application/services/accounts.service';
import { AccountsController } from './api/accounts.controller';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
