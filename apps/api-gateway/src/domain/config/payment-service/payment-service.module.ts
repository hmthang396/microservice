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
            url: `${process.env.ORGANIZATIONS_SVC_URL}:${process.env.ORGANIZATIONS_SVC_PORT}`,
            package: PAYMENTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../common/src/proto/payments.proto'),
            loader: {
              enums: String,
              objects: true,
              arrays: true,
            },
          },
          transport: Transport.GRPC,
          name: '',
        },
      ],
    }),
  ],
  providers: [],
  exports: [],
})
export class PaymentServiceClientConfigModule {}

