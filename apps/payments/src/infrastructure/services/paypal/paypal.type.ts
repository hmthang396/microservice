export type PaymentInitiator = 'CUSTOMER' | 'MERCHANT';

export type PaymentType = 'ONE_TIME' | 'RECURRING' | 'UNSCHEDULED';

export type Intent = 'CAPTURE' | 'AUTHORIZE';

export type UserAction = 'CONTINUE' | 'PAY_NOW';

export type ShippingPreference = 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';

export type LandingPage = 'BILLING' | 'LOGIN' | 'NO_PREFERENCE' | 'GUEST_CHECKOUT';

export type PaymentMethodPreference = 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED';

export type Shippingype =
  | 'SHIPPING'
  | 'PICKUP_IN_PERSON'
  | 'PICKUP_IN_STORE'
  | 'PICKUP_FROM_PERSON';

export type Usage = 'FIRST' | 'SUBSEQUENT' | 'DERIVED';

export type TaxIdType = 'BR_CPF' | 'BR_CNPJ';

export type PaymentDataType = '3DSECURE' | 'EMV';

export type CardType = 'CREDIT' | 'DEBIT' | 'PREPAID' | 'STORE' | 'UNKNOWN';
export type CardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'DISCOVER'
  | 'AMEX'
  | 'SOLO'
  | 'JCB'
  | 'STAR'
  | 'DELTA'
  | 'SWITCH'
  | 'MAESTRO'
  | 'CB_NATIONALE'
  | 'CONFIGOGA'
  | 'CONFIDIS'
  | 'ELECTRON'
  | 'CETELEM'
  | 'CHINA_UNION_PAY'
  | 'DINERS'
  | 'ELO'
  | 'HIPER'
  | 'HIPERCARD'
  | 'RUPAY'
  | 'GE'
  | 'SYNCHRONY'
  | 'UNKNOWN';

export type ProcessingInstruction = 'ORDER_COMPLETE_ON_PAYMENT_APPROVAL' | 'NO_INSTRUCTION';

export interface Links {
  /**
   * string
   *
   * The complete target URL. To make the related call, combine the method with this URI Template-formatted link. For pre-processing, include the $, (, and ) characters.
   * The href is the key HATEOAS component that links a completed call with a subsequent call.
   */
  href: string;
  /**
   * string
   *
   * The link relation type, which serves as an ID for a link that unambiguously describes the semantics of the link.
   */
  rel: string;
  /**
   * string
   *
   * The HTTP method required to make the related call.
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'PATCH';
}

export interface UnitAmount {
  /**
   * string
   *
   * The three-character ISO-4217 currency code that identifies the currency.
   *
   * required
   */
  currency_code: string;
  /**
   * string
   *
   * The value, which might be: An integer for currencies like JPY that are not typically fractional.A decimal fraction for currencies like TND that are subdivided into thousandths.
   *
   * required
   */
  value: string;
}

export interface Item {
  name: string;
  quantity: number;
  unit_amount: UnitAmount;
  url?: string;
  image_url?: string;
  tax?: UnitAmount;
}

export interface Attributes {
  /**
   * The details about a customer in PayPal's system of record.
   */
  customer?: {
    id?: string;
    email_address?: string;
    phone?: Phone;
  };
  /**
   * object
   *
   * Instruction to vault the card based on the specified strategy.
   */
  vault?: {
    /**
     * string
     *
     * Defines how and when the payment source gets vaulted.
     */
    store_in_vault?: string;
  };
  /**
   * object
   *
   * Instruction to optionally verify the card based on the specified strategy.
   */
  verification?: {
    /**
     * string
     *
     * Default: "SCA_WHEN_REQUIRED"
     *
     * The method used for card verification.
     */
    method?: 'SCA_ALWAYS' | 'SCA_WHEN_REQUIRED' | '3D_SECURE' | 'AVS_CVV';
  };
}

export interface Amount {
  currency_code: string;
  value: string;
}

export interface Payee {
  email_address: string;
  merchant_id?: string;
}

export interface Phone {
  /**
   * string
   *
   * The phone type.
   */
  phone_type?: 'FAX' | 'HOME' | 'MOBILE' | 'OTHER' | 'PAGER' | undefined;
  /**
   * object
   *
   * The phone number, in its canonical international E.164 numbering plan format. Supports only the national_number property.
   *
   * required
   */
  phone_number: {
    /**
     * string
     *
     * The national number, in its canonical international E.164 numbering plan format. The combined length of the country calling code (CC) and the national number must not be greater than 15 digits.
     * The national number consists of a national destination code (NDC) and subscriber number (SN).
     *
     * required
     */
    national_number: string;
  };
}

export interface Name {
  /**
   * string
   *
   * When the party is a person, the party's given, or first, name.
   */
  given_name?: string | undefined;
  /**
   * string
   *
   * When the party is a person, the party's surname or family name. Also known as the last name. Required when the party is a person.
   * Use also to store multiple surnames including the matronymic, or mother's, surname.
   */
  surname?: string | undefined;
}

export interface TaxInfo {
  /**
   * string
   *
   * The customer's tax ID value
   *
   * required
   */
  tax_id: string;
  /**
   * string
   *
   * The customer's tax ID type.
   *
   * required
   */
  tax_id_type: TaxIdType;
}

export interface Payer {
  /**
   * The email address of the payer.
   */
  email_address?: string | undefined;
  /**
   * object
   *
   * The name of the payer. Supports only the given_name and surname properties.
   */
  name?: Name | undefined;

  /**
   * object
   *
   * The phone number of the customer. Available only when you enable the Contact Telephone Number option in the Profile & Settings for the merchant's PayPal account.
   * The phone.phone_number supports only national_number.
   */
  phone?: Phone | undefined;
  /**
   * string
   *
   * The birth date of the payer in YYYY-MM-DD format.
   */
  birth_date?: string | undefined;
  /**
   * object
   *
   * The tax information of the payer.
   */
  tax_info?: TaxInfo;
  /**
   * object
   *
   * The address of the payer. Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties. Also referred to as the billing address of the customer.
   */
  address?: Address | undefined;
}

export interface Address {
  /**
   * string
   *
   * The first line of the address, such as number and street, for example, 173 Drury Lane. Needed for data entry, and Compliance and Risk checks. This field needs to pass the full address.
   */
  address_line_1?: string | undefined;
  /**
   * string
   *
   * The second line of the address, for example, a suite or apartment number.
   */
  address_line_2?: string | undefined;
  /**
   * string
   *
   * A city, town, or village. Smaller than admin_area_level_1.
   */
  admin_area_2?: string | undefined;
  /**
   * string
   *
   * The highest-level sub-division in a country, which is usually a province, state, or ISO-3166-2 subdivision. This data is formatted for postal delivery.`
   */
  admin_area_1?: string | undefined;
  /**
   * string
   *
   * The postal code, which is the ZIP code or equivalent. Typically required for countries with a postal code or an equivalent. See postal code.
   */
  postal_code?: string | undefined;
  /**
   * string
   *
   * The 2-character ISO 3166-1 code that identifies the country or region.
   *
   * required
   */
  country_code: string;
}

export interface Shipping {
  type?: Shippingype | undefined;
  address: Address;
  option: Array<{
    id: string;
    label: string;
    selected: string;
    type?: 'SHIPPING' | 'PICKUP' | 'PICKUP_IN_STORE' | 'PICKUP_FROM_PERSON';
    amount?: Amount;
  }>;
  name?: {
    full_name?: string;
  };
}

export interface Breakdown {
  /**
   * object
   *
   * The subtotal for all items. Required if the request includes purchase_units[].items[].unit_amount. Must equal the sum of (items[].unit_amount * items[].quantity) for all items.
   * item_total.value can not be a negative number.
   */
  item_total?: Amount;
  /**
   * object
   *
   * The shipping fee for all items within a given purchase_unit. shipping.value can not be a negative number.
   */
  shipping?: Amount;
  /**
   * object
   *
   * The handling fee for all items within a given purchase_unit. handling.value can not be a negative number.
   */
  handling?: Amount;
  /**
   * object
   *
   * The total tax for all items. Required if the request includes purchase_units.items.tax. Must equal the sum of (items[].tax * items[].quantity) for all items. tax_total.value can not be a negative number.
   */
  tax_total?: Amount;
  /**
   * object
   *
   * The insurance fee for all items within a given purchase_unit. insurance.value can not be a negative number.
   */
  insurance?: Amount;
  /**
   * object
   *
   * The shipping discount for all items within a given purchase_unit. shipping_discount.value can not be a negative number.
   */
  shipping_discount?: Amount;
  /**
   * object
   *
   * The discount for all items within a given purchase_unit. discount.value can not be a negative number.
   */
  discount?: Amount;
}

export interface PurchaseUnit {
  reference_id?: string;
  description?: string;
  custom_id?: string;
  invoice_id?: string;
  soft_descriptor?: string;
  items?: Array<Item>;
  amount: Amount & { breakdown?: Breakdown };
  payee?: Payee;
  payment_instruction?: object | any;
  shipping?: Shipping;
  supplementary_data?: object;
}

export interface PaymentMethod {
  /**
   * string
   *
   * Default: "WEB"
   *
   * NACHA (the regulatory body governing the ACH network) requires that API callers (merchants, partners) obtain the consumer’s explicit authorization before initiating a transaction.
   * To stay compliant, you’ll need to make sure that you retain a compliant authorization for each transaction that you originate to the ACH Network using this API.
   * ACH transactions are categorized (using SEC codes) by how you capture authorization from the Receiver (the person whose bank account is being debited or credited).
   * PayPal supports the following SEC codes.
   */
  standard_entry_class_code?: 'TEL' | 'WEB' | 'CCD' | 'PPD';
  /**
   *
   * string
   *
   * Default: "UNRESTRICTED"
   *
   * The merchant-preferred payment methods.
   */
  payee_preferred?: PaymentMethodPreference;
}

export interface PreviousNetworkTransactionReference {
  /**
   * string
   *
   * Transaction reference id returned by the scheme.
   *
   * required
   */
  id: string;
  /**
   * string
   *
   * The date that the transaction was authorized by the scheme. This field may not be returned for all networks. MasterCard refers to this field as "BankNet reference date.
   */
  date?: string;
  /**
   * string
   *
   * Reference ID issued for the card transaction. This ID can be used to track the transaction across processors, card brands and issuing banks.
   */
  acquirer_reference_number?: string;
  /**
   * string
   *
   * Name of the card network through which the transaction was routed.
   */
  network?: CardBrand;
}

export interface StoredPaymentSource {
  /**
   * string
   *
   * The person or party who initiated or triggered the payment.
   *
   * required
   */
  payment_initiator: PaymentInitiator;

  /**
   * string
   *
   * Indicates the type of the stored payment_source payment.
   *
   * required
   */
  payment_type: PaymentType;
  /**
   * string
   *
   * Default: "DERIVED"
   *
   * Indicates if this is a first or subsequent payment using a stored payment source (also referred to as stored credential or card on file).
   */
  usage?: Usage;
  /**
   * object
   *
   * Reference values used by the card network to identify a transaction.
   */
  previous_network_transaction_reference?: PreviousNetworkTransactionReference;
}

export interface StoredCredential extends StoredPaymentSource {}

export interface ApplicationContext {
  /**
   * string
   *
   * DEPRECATED. The label that overrides the business name in the PayPal account on the PayPal site. The fields in application_context are now available in the experience_context object
   * under the payment_source which supports them (eg. payment_source.paypal.experience_context.brand_name). Please specify this field in the experience_context object instead of the application_context object.
   */
  brand_name?: string | undefined;
  /**
   * string
   *
   * DEPRECATED. The BCP 47-formatted locale of pages that the PayPal payment experience shows. PayPal supports a five-character code.
   */
  locale?: string;
  /**
   * string
   *
   * Default: "NO_PREFERENCE"
   *
   * DEPRECATED. DEPRECATED. The type of landing page to show on the PayPal site for customer checkout. The fields in application_context are now available in the experience_context object under
   * the payment_source which supports them (eg. payment_source.paypal.experience_context.landing_page). Please specify this field in the experience_context object instead of the application_context object.
   *
   */
  landing_page?: LandingPage;
  /**
   * string
   *
   * Default: "GET_FROM_FILE"
   *
   * DEPRECATED. DEPRECATED. The shipping preference:
   *
   * * Displays the shipping address to the customer.
   *
   * * Enables the customer to choose an address on the PayPal site.
   *
   * * Restricts the customer from changing the address during the payment-approval process.
   *
   */
  shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
  /**
   * string
   *
   * Default: "CONTINUE"
   *
   * DEPRECATED. Configures a Continue or Pay Now checkout flow. The fields in application_context are now available in the experience_context object under the payment_source which supports them
   * (eg. payment_source.paypal.experience_context.user_action). Please specify this field in the experience_context object instead of the application_context object.
   */
  user_action?: UserAction;
  /**
   * string
   *
   * DEPRECATED. The URL where the customer is redirected after the customer approves the payment.
   */
  return_url?: string;
  /**
   * string
   *
   * DEPRECATED. The URL where the customer is redirected after the customer cancels the payment.
   */
  cancel_url?: string;
  /**
   * object
   *
   * DEPRECATED. The customer and merchant payment preferences.
   */
  payment_method?: PaymentMethod;
  /**
   * object
   *
   * Provides additional details to process a payment using a payment_source that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
   */
  stored_payment_source?: StoredPaymentSource;
}

export interface RedirectUrls {
  /**
   * The URL where the customer will be redirected upon successfully completing the 3DS challenge.
   */
  return_url?: string;
  /**
   * The URL where the customer will be redirected upon cancelling the 3DS challenge.
   */
  cancel_url?: string;
}

export interface NetworkToken {
  /**
   * string
   *
   * Third party network token number.
   *
   * required
   */
  number: string;
  /**
   * string
   *
   * An Encrypted one-time use value that's sent along with Network Token. This field is not required to be present for recurring transactions.
   */
  cryptogram?: string;
  /**
   * string
   *
   * A TRID, or a Token Requestor ID, is an identifier used by merchants to request network tokens from card networks.
   * A TRID is a precursor to obtaining a network token for a credit card primary account number (PAN), and will aid in enabling secure card on file (COF) payments and reducing fraud.
   */
  token_requestor_id?: string;
  /**
   * string
   *
   * The card expiration year and month, in Internet date format.
   *
   * required
   */
  expiry: string;
  /**
   * string
   *
   * Electronic Commerce Indicator (ECI). The ECI value is part of the 2 data elements that indicate the transaction was processed electronically.
   *  This should be passed on the authorization transaction to the Gateway/Processor.
   */
  eci_flag?: string;
}

export interface CardPaymentSource {
  /**
   * The card holder's name as it appears on the card.
   */
  name?: string;
  /**
   * The primary account number (PAN) for the payment card.
   */
  number?: string;
  /**
   * The three- or four-digit security code of the card. Also known as the CVV, CVC, CVN, CVE, or CID. This parameter cannot be present in the request when payment_initiator=MERCHANT
   */
  security_code?: string;
  /**
   * The card expiration year and month
   */
  expiry?: string;
  /**
   * The billing address for this card
   */
  billing_address?: Address;
  /**
   * Additional attributes associated with the use of this card.
   */
  attributes?: Attributes;
  /**
   * object
   *
   * Provides additional details to process a payment using a card that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
   */
  stored_credential?: StoredCredential;
  /**
   * object
   *
   * A 3rd party network token refers to a network token that the merchant provisions from and vaults with an external TSP (Token Service Provider) other than PayPal.
   */
  network_token?: NetworkToken;

  /**
   * The PayPal-generated ID for the saved card payment source. Typically stored on the merchant's server.
   */
  vault_id?: string;
  /**
   * Customizes the payer experience during the 3DS Approval for payment.
   */
  experience_context?: RedirectUrls;
}

export interface ExperienceContextPaypal {
  /**
   * The label that overrides the business name in the PayPal account on the PayPal site. The pattern is defined by an external party and supports Unicode.
   */

  brand_name?: string;
  /**
   * The location from which the shipping address is derived.
   * Default: "GET_FROM_FILE"
   */
  shipping_preference?: ShippingPreference;
  /**
   * The type of landing page to show on the PayPal site for customer checkout.
   * Default: "NO_PREFERENCE"
   */

  landing_page?: LandingPage;

  /**
   * Default: "CONTINUE"
   * Configures a Continue or Pay Now checkout flow.
   */

  user_action?: UserAction;
  /**
   * Default: "UNRESTRICTED"
   * The merchant-preferred payment methods
   */
  payment_method_preference?: PaymentMethodPreference;
  /**
   * The BCP 47-formatted locale of pages that the PayPal payment experience shows. PayPal supports a five-character code.
   */

  locale?: string;
  /**
   * The URL where the customer will be redirected upon successfully completing the 3DS challenge.
   */

  return_url?: string;
  /**
   * The URL where the customer will be redirected upon cancelling the 3DS challenge.
   */

  cancel_url?: string;

  consumer_user_agent?: string;

  consumer_ip?: string;
}

export interface PaypalPaymentSource {
  /**
   * Customizes the payer experience during the approval process for payment with PayPal.
   */
  experience_context?: Omit<ExperienceContextPaypal, 'consumer_user_agent' | 'consumer_ip'>;
  /**
   * The PayPal billing agreement ID. References an approved recurring payment for goods or services.
   */
  billing_agreement_id?: string;
  /**
   * The PayPal-generated ID for the payment_source stored within the Vault.
   */
  vault_id?: string;
  /**
   * The email address of the PayPal account holder.
   */
  email_address?: string;
  /**
   * object
   *
   * The name of the PayPal account holder. Supports only the given_name and surname properties.
   */
  name?: Name | undefined;
  /**
   * object
   *
   * The phone number of the customer. Available only when you enable the Contact Telephone Number option in the Profile & Settings for the merchant's PayPal account.
   * The phone.phone_number supports only national_number.
   */
  phone?: Phone;
  /**
   * string
   *
   * The birth date of the PayPal account holder in YYYY-MM-DD format.
   */
  birth_date?: string;
  /**
   * object
   *
   * The tax information of the PayPal account holder. Required only for Brazilian PayPal account holder's. Both tax_id and tax_id_type are required.
   */
  tax_info?: TaxInfo;
  /**
   * The address of the PayPal account holder.
   */
  address?: Address;

  attributes?: Omit<Attributes, 'verification'>;
}

export interface Bancontact {
  /**
   * string
   *
   * The name of the account holder associated with this payment method.
   */
  name: string;
  /**
   * string
   *
   * The two-character ISO 3166-1 country code.
   */
  country_code: string;
  experience_context: Pick<
    ExperienceContextPaypal,
    'brand_name' | 'shipping_preference' | 'locale' | 'return_url' | 'cancel_url'
  >;
}

export interface Blik extends Pick<Bancontact, 'name' | 'country_code'> {
  email?: string;
  experience_context?: Pick<
    ExperienceContextPaypal,
    | 'brand_name'
    | 'shipping_preference'
    | 'locale'
    | 'return_url'
    | 'cancel_url'
    | 'consumer_user_agent'
    | 'consumer_ip'
  >;
  /**
   * object
   *
   * The level_0 integration flow object.
   */
  level_0?: {
    /**
     * string
     *
     * The 6-digit code used to authenticate a consumer within BLIK
     *
     * required
     */
    auth_code: string;
  };
  /**
   * object
   *
   * The one-click integration flow object.
   */
  one_click?: {
    /**
     * string
     *
     * The 6-digit code used to authenticate a consumer within BLIK
     */
    auth_code?: string;
    /**
     * string
     *
     * The merchant generated, unique reference serving as a primary identifier for accounts connected between Blik and a merchant.
     *
     * required
     */
    consumer_reference: string;
    /**
     * string
     *
     * A bank defined identifier used as a display name to allow the payer to differentiate between multiple registered bank accounts.
     */
    alias_label: string;
    /**
     * string
     *
     * A Blik-defined identifier for a specific Blik-enabled bank account that is associated with a given merchant. Used only in conjunction with a Consumer Reference.
     */
    alias_key: string;
  };
}

export interface Esp extends Pick<Blik, 'name' | 'country_code'> {
  experience_context?: Pick<
    ExperienceContextPaypal,
    'brand_name' | 'shipping_preference' | 'locale' | 'cancel_url' | 'return_url'
  >;
}

export interface Giropay extends Esp {}

export interface Mybank extends Esp {}

export interface Ideal extends Pick<Bancontact, 'name' | 'country_code'> {
  /**
   * The bank identification code (BIC).
   */
  bic?: string;
  experience_context?: Pick<
    ExperienceContextPaypal,
    'brand_name' | 'shipping_preference' | 'locale' | 'cancel_url' | 'return_url'
  >;
}

export interface P24 extends Pick<Blik, 'name' | 'country_code' | 'email'> {
  experience_context?: Pick<
    ExperienceContextPaypal,
    'brand_name' | 'shipping_preference' | 'locale' | 'cancel_url' | 'return_url'
  >;
}

export interface Sofort extends Esp {}

export interface Trustly extends Esp {}

export interface ApplePay {
  /**
   * string
   *
   * ApplePay transaction identifier, this will be the unique identifier for this transaction provided by Apple. The pattern is defined by an external party and supports Unicode.
   */
  id?: string;
  /**
   * object
   *
   * Provides additional details to process a payment using a card that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
   */
  stored_credential?: StoredCredential;
  /**
   * string
   *
   * Name on the account holder associated with apple pay.
   */
  name?: string;
  /**
   * string
   *
   * The email address of the account holder associated with apple pay.
   */
  email_address?: string;
  /**
   * object
   *
   * The phone number, in its canonical international E.164 numbering plan format. Supports only the national_number property.
   */
  phone_number?: Pick<Phone, 'phone_number'>;
  /**
   * object
   *
   * The decrypted payload details for the apple pay token.
   */
  decrypted_token?: {
    /**
     * string
     *
     * Apple Pay Hex-encoded device manufacturer identifier. The pattern is defined by an external party and supports Unicode.
     */
    device_manufacturer_id?: string;
    /**
     * string
     *
     * Indicates the type of payment data passed, in case of Non China the payment data is 3DSECURE and for China it is EMV.
     */
    payment_data_type?: PaymentDataType;
    /**
     * object
     *
     * The transaction amount for the payment that the payer has approved on apple platform.
     */
    transaction_amount?: UnitAmount;
    /**
     * object
     *
     * Apple Pay tokenized credit card used to pay.
     *
     * required
     */
    tokenized_card?: {
      /**
       * string
       *
       * The card holder's name as it appears on the card.
       */
      name?: string;
      /**
       * string
       *
       * The primary account number (PAN) for the payment card.
       */
      number?: string;
      /**
       * string
       *
       * The card expiration year and month, in Internet date format.
       */
      expiry?: string;
      /**
       * string
       *
       * The payment card type.
       */
      type?: CardType;
      /**
       * string
       *
       * The card brand or network. Typically used in the response.
       */
      brand?: CardBrand;
      /**
       * object
       *
       * The billing address for this card.
       */
      billing_address?: Address;
    };
    /**
     * object
     *
     * Apple Pay payment data object which contains the cryptogram, eci_indicator and other data.
     */
    payment_data?: {
      /**
       * string
       *
       * Online payment cryptogram, as defined by 3D Secure. The pattern is defined by an external party and supports Unicode.
       */
      cryptogram?: string;
      /**
       * string
       *
       * ECI indicator, as defined by 3- Secure. The pattern is defined by an external party and supports Unicode.
       */
      eci_indicator?: string;
      /**
       * string
       *
       * Encoded Apple Pay EMV Payment Structure used for payments in China. The pattern is defined by an external party and supports Unicode.
       */
      emv_data?: string;
      /**
       * string
       *
       * Bank Key encrypted Apple Pay PIN. The pattern is defined by an external party and supports Unicode.
       */
      pint?: string;
    };
  };
  /**
   * string
   *
   * The PayPal-generated ID for the saved apple pay payment_source. This ID should be stored on the merchant's server so the saved payment source can be used for future transactions.
   */
  vault_id?: string;
}

export interface Venmo {
  /**
   * object
   *
   * Customizes the buyer experience during the approval process for payment with Venmo.
   */
  experience_context?: Pick<ExperienceContextPaypal, 'brand_name' | 'shipping_preference'>;
  /**
   * string
   *
   * The PayPal-generated ID for the saved Venmo wallet payment_source. This ID should be stored on the merchant's server so the saved payment source can be used for future transactions.
   */
  vault_id?: string;
  /**
   * string
   *
   * The email address of the payer.
   */
  email_address?: string;
  /**
   * object
   *
   * Additional attributes associated with the use of this wallet.
   */
  attributes?: {
    /**
     * object
     *
     * The details about a customer in PayPal's system of record.
     */
    customer?: {
      id?: string;
      email_address?: string;
    };
    /**
     * object
     *
     * Attributes used to provide the instructions during vaulting of the Venmo Wallet.
     */
    vault: {
      store_in_vault: string;
      description?: string;
      usage_pattern?: string;
      usage_type: string;
      customer_type?: string;
      permit_multiple_payment_tokens?: boolean;
    };
  };
}

export interface PaymentSource {
  /**
   * The payment card to use to fund a payment. Can be a credit or debit card.
   */
  card?: CardPaymentSource;
  /**
   * object
   *
   * The tokenized payment source to fund a payment.
   */
  token?: {
    /**
     * string
     *
     * The PayPal-generated ID for the token.
     *
     * required
     */
    id: string;
    /**
     * string
     *
     * The tokenization method that generated the ID.
     *
     * required
     */
    type: string;
  };
  /**
   * Indicates that PayPal Wallet is the payment source. Main use of this selection is to provide additional instructions associated with this choice like vaulting.
   */
  paypal?: PaypalPaymentSource;
  /**
   * object
   *
   * Bancontact is the most popular online payment in Belgium
   */
  bancontact?: Bancontact;
  /**
   * object
   *
   * BLIK is a mobile payment system, created by Polish Payment Standard in order to allow millions of users to pay in shops, payout cash in ATMs and make online purchases and payments.
   */
  blik?: Blik;
  /**
   * object
   *
   * The eps transfer is an online payment method developed by many Austrian banks.
   */
  eps?: Esp;
  /**
   * object
   *
   * Giropay is an Internet payment System in Germany, based on online banking.
   */
  giropay?: Giropay;
  /**
   * object
   *
   * The Dutch payment method iDEAL is an online payment method that enables consumers to pay online through their own bank.
   */
  ideal?: Ideal;
  /**
   * object
   *
   * MyBank is an e-authorisation solution which enables safe digital payments and identity authentication through a consumer’s own online banking portal or mobile application.
   */
  mybank?: Mybank;
  /**
   * object
   *
   * P24 (Przelewy24) is a secure and fast online bank transfer service linked to all the major banks in Poland.
   */
  p24?: P24;
  /**
   * object
   *
   * SOFORT Banking is a real-time bank transfer payment method that buyers use to transfer funds directly to merchants from their bank accounts.
   */
  sofort?: Sofort;
  /**
   * object
   *
   * Trustly is a payment method that allows customers to shop and pay from their bank account.
   */
  trustly?: Trustly;
  /**
   * object
   *
   * ApplePay payment source, allows buyer to pay using ApplePay, both on Web as well as on Native.
   */
  apple_pay?: ApplePay;
  /**
   * object
   *
   * Information needed to indicate that Venmo is being used to fund the payment.
   */
  venmo?: Venmo;
}

export interface CreateOrderRequest {
  /**
   * Array of objects [ 1 .. 10 ] items
   *
   * An array of purchase units. Each purchase unit establishes a contract between a payer and the payee. Each purchase unit represents either a full or partial order that the payer intends to purchase from the payee.
   *
   * required
   */
  purchase_units: PurchaseUnit[];
  /**
   *
   * string
   *
   * The intent to either capture payment immediately or authorize a payment for an order after order creation.
   *
   * required
   */
  intent: Intent;
  /**
   * object
   *
   * DEPRECATED. The customer is also known as the payer. The Payer object was intended to only be used with the payment_source.paypal object.
   * In order to make this design more clear, the details in the payer object are now available under payment_source.paypal. Please use payment_source.paypal.
   */
  payer?: Payer | undefined;

  payment_source?: PaymentSource | undefined;
  /**
   * object
   *
   * Customize the payer experience during the approval process for the payment with PayPal.
   */
  application_context?: ApplicationContext | undefined;
}

export interface CreateOrderResponse {
  create_time: string;
  update_time: string;
  id: string;
  processing_instruction: ProcessingInstruction;
  purchase_units: Array<PurchaseUnit>;
  links: Array<Links>;
  payment_source?: PaymentSource;
  intent: Intent;
  payer: Payer;
  status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED';
}
