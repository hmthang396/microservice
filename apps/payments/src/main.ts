import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PAYMENTS_PACKAGE_NAME } from '@app/libs/proto';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../common/src/proto/payments.proto'),
      package: PAYMENTS_PACKAGE_NAME,
      url: `0.0.0.0:${process.env.SERVICE_PORT}`,
    },
  });
  await app.listen();
}
bootstrap();
