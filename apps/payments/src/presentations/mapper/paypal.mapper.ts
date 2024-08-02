import { PaymentCreateRequestDto } from '@app/libs';
import { CreateOrderRequest } from '../../infrastructure/services/paypal/paypal.type';

export class PaypalMapper {
  public static toOrderRequest(dto: PaymentCreateRequestDto): CreateOrderRequest {
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
        ...(dto?.experienceContext && {
          brand_name: dto.experienceContext.brandName,
          cancel_url: dto.experienceContext.cancelUrl,
          return_url: dto.experienceContext.returnUrl,
        }),
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
          currency_code: e.unitAmount.currencyCode,
          value: e.unitAmount.value.toString(),
        },
      }));
    }
    bodyRequest.payment_source = {
      card: {
        name: dto.paymentSource.name,
        number: dto.paymentSource.number,
        security_code: dto.paymentSource.securityCode,
        expiry: dto.paymentSource.expiry,
        billing_address: {
          country_code: dto.paymentSource.billingAddress.countryCode,
          address_line_1: dto.paymentSource.billingAddress.addressLine1,
          address_line_2: dto.paymentSource.billingAddress.addressLine2,
          admin_area_1: dto.paymentSource.billingAddress.adminArea1,
          admin_area_2: dto.paymentSource.billingAddress.adminArea2,
          postal_code: dto.paymentSource.billingAddress.postalCode,
        },
      },
    };
    return bodyRequest;
  }
}
