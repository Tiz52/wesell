import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { ClientsModule } from './clients/clients.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [AccountsModule, ClientsModule, PaymentModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
