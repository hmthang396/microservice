import { EnvironmentConfigModule } from "@api-gateway/infrastrucure/config/environment-config/environment-config.module";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}



