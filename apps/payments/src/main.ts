import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PAYMENTS_PACKAGE_NAME } from '@app/libs/proto';
import { GrpcServerExceptionFilter } from '@app/libs/filters/exceptions/grpc-server-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { GrpcInvalidArgumentException } from '@app/libs/exceptions/gRPC';
import { ReflectionService } from '@grpc/reflection';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../common/src/proto/payments.proto'),
      package: PAYMENTS_PACKAGE_NAME,
      url: `0.0.0.0:${process.env.SERVICE_PORT}`,
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });
  app.useGlobalFilters(new GrpcServerExceptionFilter(PaymentsModule.logger));
  await app.listen();
}
bootstrap();
