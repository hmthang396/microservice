import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaypalConfig } from 'apps/payments/src/domain/config/paypal.interface';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { firstValueFrom } from 'rxjs';
import { OAuthPaypal } from 'apps/payments/src/presentations/dtos/paypal-oauth.ouput';
import { CreateOrderRequest, CreateOrderResponse } from './paypal.type';
import { CreateOrderInput } from 'apps/payments/src/presentations/dtos/create-order.input';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaypalService {
  private token: string;

  constructor(
    @Inject(EnvironmentConfigService)
    private readonly paypalConfig: PaypalConfig,
    private readonly httpService: HttpService,
  ) {
    this.token = Buffer.from(
      `${this.paypalConfig.getPaypalClientId()}:${this.paypalConfig.getPaypalClientSecret()}`,
    ).toString('base64');
  }

  private async generateToken() {
    if (
      !this.paypalConfig.getPaypalClientId() ||
      !this.paypalConfig.getPaypalClientSecret() ||
      !this.paypalConfig.getPaypalURL()
    ) {
      throw new Error('MISSING_API_CREDENTIALS');
    }

    const auth = Buffer.from(
      `${this.paypalConfig.getPaypalClientId()}:${this.paypalConfig.getPaypalClientSecret()}`,
    ).toString('base64');

    const { data } = await firstValueFrom(
      this.httpService.post<OAuthPaypal>(
        `${this.paypalConfig.getPaypalURL()}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      ),
    );

    console.log('==========');
    console.log(data);
    console.log('==========');

    return data;
  }

  public async createOrder(
    payload: CreateOrderRequest,
    idempotency_key: string,
  ): Promise<CreateOrderResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<CreateOrderResponse>(
          `${this.paypalConfig.getPaypalURL()}/v2/checkout/orders`,
          payload,
          {
            headers: {
              setContentType: 'application/json',
              Authorization: `Basic ${this.token}`,
              'PayPal-Request-Id': `${idempotency_key}`,
            },
          },
        ),
      );

      return data;
    } catch (error) {
      throw new BadRequestException('Failed to create Checkout Order in Paypal');
    }
  }

  public async createOrderWithPaymentSourceCard(dto: CreateOrderInput) {}
}
