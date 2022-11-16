import { Module } from '@nestjs/common';
import { PaymentService } from './application/services/payment.service';
import { PaymentController } from './api/payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
