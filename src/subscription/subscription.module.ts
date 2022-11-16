import { Module } from '@nestjs/common';
import { SubscriptionService } from './application/services/subscription.service';
import { SubscriptionController } from './api/subscription.controller';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
