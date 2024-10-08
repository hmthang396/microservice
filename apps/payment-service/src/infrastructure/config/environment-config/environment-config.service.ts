import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeConfig } from 'apps/payment-service/src/domain/config/stripe.interface';
import { DatabaseConfig } from 'apps/payment-service/src/domain/config/database.interface';
import { PaypalConfig } from 'apps/payment-service/src/domain/config/paypal.interface';
import { RabbitMqConfig } from 'apps/payment-service/src/domain/config/rabbitmq.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, RabbitMqConfig, PaypalConfig, StripeConfig {
  constructor(private configService: ConfigService) {}
  getStripePublishableKey(): string {
    return this.configService.get<string>('STRIPE_PUBLISHABLE_KEY');
  }
  getStripeSecretKey(): string {
    return this.configService.get<string>('STRIPE_SECRET_KEY');
  }
  getStripeCancelURL(): string {
    return this.configService.get<string>('STRIPE_CANCEL_URL');
  }
  getStripeReturnURL(): string {
    return this.configService.get<string>('STRIPE_RETURN_URL');
  }
  getStripeURL(): string {
    return this.configService.get<string>('STRIPE_URL');
  }
  getPaypalClientId(): string {
    return this.configService.get<string>('PAYPAL_CLIENT_ID');
  }
  getPaypalClientSecret(): string {
    return this.configService.get<string>('PAYPAL_CLIENT_SECRET');
  }
  getPaypalURL(): string {
    return this.configService.get<string>('PAYPAL_URL');
  }
  getPaypalMODE(): string {
    return this.configService.get<string>('PAYPAL_MODE');
  }
  getPaypalCancelURL(): string {
    return this.configService.get<string>('PAYPAL_CANCEL_URL');
  }
  getPaypalReturnURL(): string {
    return this.configService.get<string>('PAYPAL_RETURN_URL');
  }
  getPaypalBrandName(): string {
    return this.configService.get<string>('PAYPAL_BRAND_NAME');
  }
  getTypeORMLogging(): boolean {
    return this.configService.get<string>('TYPEORM_LOGGING') === 'true';
  }
  getTypeORMMigrationsRun(): boolean {
    return this.configService.get<string>('TYPEORM_MIGRATIONSRUN') === 'true';
  }

  getRabbitMQHost(): string {
    return this.configService.get<string>('RABBITMQ_URL');
  }

  getRabbitMQUsername(): string {
    return this.configService.get<string>('RABBITMQ_USER');
  }
  getRabbitMQPassword(): string {
    return this.configService.get<string>('RABBITMQ_PASSWORD');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }
  getDatabasePort(): number {
    return parseInt(this.configService.get<string>('DB_PORT'));
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USERNAME');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DB_DATABASE');
  }
  getDatabaseSchema(): string {
    return this.configService.get<string>('DB_SCHEMA');
  }
  getDatabaseSync(): boolean {
    return this.configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true';
  }
}
