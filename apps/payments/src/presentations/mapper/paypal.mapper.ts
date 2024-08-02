import { CreateOrderRequest } from '../../infrastructure/services/paypal/paypal.type';
import { PaymentCreateRequestDto } from '../dtos/payment-create-request.dto';
import { CreatePaymentInput } from '../dtos/payment-create-request.input';

export class PaypalMapper {
  public static toOrderRequest(dto: CreatePaymentInput | PaymentCreateRequestDto): CreateOrderRequest {
    const bodyRequest: CreateOrderRequest = {
      intent: 'AUTHORIZE',
      purchase_units: [
        {
          amount: {
            currency_code: dto.currency,
            value: dto.amount.toString(),
          },
        },
      ],
      application_context: {
        landing_page: 'LOGIN',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        ...(dto?.experience_context && dto.experience_context),
      },
    };

    if (dto.items && dto.items.length > 0) {
      bodyRequest.purchase_units[0].amount.breakdown = {
        item_total: {
          currency_code: dto.currency,
          value: dto.amount.toString(),
        },
      };

      bodyRequest.purchase_units[0].items = dto.items.map((e) => ({
        name: e.name,
        quantity: e.quantity,
        unit_amount: {
          currency_code: e.unit_amount.currency_code,
          value: e.unit_amount.value.toString(),
        },
      }));
    }
    bodyRequest.payment_source = {
      card: {
        name: dto.payment_source.name,
        number: dto.payment_source.number,
        security_code: dto.payment_source.security_code,
        expiry: dto.payment_source.expiry,
        billing_address: {
          country_code: dto.payment_source.billing_address.country_code,
          address_line_1: dto.payment_source.billing_address.address_line_1,
          address_line_2: dto.payment_source.billing_address.address_line_2,
          admin_area_1: dto.payment_source.billing_address.admin_area_1,
          admin_area_2: dto.payment_source.billing_address.admin_area_2,
          postal_code: dto.payment_source.billing_address.postal_code,
        },
      },
    };
    return bodyRequest;
  }
}
