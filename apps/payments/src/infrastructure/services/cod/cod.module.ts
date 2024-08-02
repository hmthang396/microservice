import { EnvironmentConfigModule } from '@api-gateway/infrastrucure/config/environment-config/environment-config.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CODService } from './cod.service';

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [CODService],
  exports: [CODService],
})
export class CODModule {}



