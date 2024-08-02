import { PAYMENTS_PACKAGE_NAME } from '@app/libs/proto';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          options: {
            url: `0.0.0.0:${process.env.PAYMENT_SERVICE_PORT}`,
            package: PAYMENTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../../../../common/src/proto/payment-service.proto'),
            loader: {
              enums: String,
              objects: true,
              arrays: true,
            },
          },
          transport: Transport.GRPC,
          name: PAYMENTS_PACKAGE_NAME,
        },
      ],
    }),
  ],
  providers: [],
  exports: [ClientsModule],
})
export class PaymentServiceClientConfigModule {}
