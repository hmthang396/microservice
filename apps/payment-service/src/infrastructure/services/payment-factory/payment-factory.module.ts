import { Module } from '@nestjs/common';
import { CODModule } from '../cod/cod.module';
import { PaypalModule } from '../paypal/paypal.module';
import { StripeModule } from '../stripe/stripe.module';
import { PaymentFactoryService } from './payment-factory.service';

@Module({
  imports: [CODModule, PaypalModule, StripeModule],
  providers: [PaymentFactoryService],
  exports: [PaymentFactoryService],
})
export class PaymentFactoryModule {}
