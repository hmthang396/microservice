import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaypalConfig } from 'apps/payments/src/domain/config/paypal.interface';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { firstValueFrom } from 'rxjs';
import { CreateOrderRequest, CreateOrderResponse } from './paypal.type';
import { CreateOrderInput } from 'apps/payments/src/presentations/dtos/create-order.input';
import { HttpService } from '@nestjs/axios';
import { GrpcInternalException } from '@app/libs/exceptions/gRPC';

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

  public async createOrder(payload: CreateOrderRequest, idempotency_key: string): Promise<CreateOrderResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<CreateOrderResponse>(`${this.paypalConfig.getPaypalURL()}/v2/checkout/orders`, payload, {
          headers: {
            setContentType: 'application/json',
            Authorization: `Basic ${this.token}`,
            'PayPal-Request-Id': `${idempotency_key}`,
          },
        }),
      );

      return data;
    } catch (error) {
		throw new GrpcInternalException(error.response.data.message);
    }
  }

  public async createOrderWithPaymentSourceCard(dto: CreateOrderInput) {
    console.log(dto);
  }
}
