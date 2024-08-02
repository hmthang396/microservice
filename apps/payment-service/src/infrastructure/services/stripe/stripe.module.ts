import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { EnvironmentConfigModule } from 'apps/payment-service/src/infrastructure/config/environment-config/environment-config.module';

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
