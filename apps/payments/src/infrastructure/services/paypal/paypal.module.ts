import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { PaypalService } from './paypal.service';

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
