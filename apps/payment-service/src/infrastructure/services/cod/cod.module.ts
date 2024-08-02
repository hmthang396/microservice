import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CODService } from './cod.service';
import { EnvironmentConfigModule } from 'apps/payment-service/src/infrastructure/config/environment-config/environment-config.module';

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [CODService],
  exports: [CODService],
})
export class CODModule {}
