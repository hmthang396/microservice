import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;
  constructor(private readonly configService: ConfigService) {
    ApiGatewayModule.port = +this.configService.get('SERVICE_PORT');
    ApiGatewayModule.apiVersion = this.configService.get('API_VERSION_DEFAULT');
    ApiGatewayModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
