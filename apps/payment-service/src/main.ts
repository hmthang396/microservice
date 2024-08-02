import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcServerExceptionFilter } from '@app/libs/filters/exceptions/grpc-server-exception.filter';
import { ReflectionService } from '@grpc/reflection';
import { PAYMENTS_PACKAGE_NAME } from '@app/libs/proto/payment-service.pb';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../common/src/proto/payment-service.proto'),
      package: PAYMENTS_PACKAGE_NAME,
      url: `0.0.0.0:${process.env.SERVICE_PORT}`,
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });
  app.useGlobalFilters(new GrpcServerExceptionFilter(PaymentsModule.logger));
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
