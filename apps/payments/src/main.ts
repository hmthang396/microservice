import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { BadRequestException, Logger, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { APP_ROUTE_PREFIX, APP_VERSION, BODY_SIZE_LIMIT } from '@app/libs/constants';
import { SwaggerConfig } from './infrastructure/config/swagger/swagger.config';
import { HttpResponseInterceptor } from './infrastructure/common/interceptors/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  app
    .setGlobalPrefix(PaymentsModule.apiPrefix || APP_ROUTE_PREFIX)
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: PaymentsModule.apiVersion || APP_VERSION,
    })
    .enableCors({
      origin: ['*'],
      credentials: true,
    });

  app
    .use(helmet())
    .use(compression())
    .use(bodyParser.json({ limit: BODY_SIZE_LIMIT }))
    .use(bodyParser.urlencoded({ limit: BODY_SIZE_LIMIT, extended: true }))
    // .useGlobalFilters(new HttpExceptionFilter(AppModule.logger))
    // .useGlobalInterceptors(new LoggingInterceptor(AppModule.logger))
    .useGlobalInterceptors(new HttpResponseInterceptor())
    .useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const formatError = (error: ValidationError) => {
            if (error.children?.length) {
              return {
                field: error.property,
                errors: error.children.map(formatError),
              };
            }
            return {
              field: error.property,
              errors: Object.values(error.constraints ?? {}),
            };
          };
          return new BadRequestException(errors.map((error) => formatError(error)));
        },
        stopAtFirstError: false,
      }),
    );

  SwaggerConfig(app, PaymentsModule.apiPrefix || APP_ROUTE_PREFIX);
  await app.listen(PaymentsModule.port, '0.0.0.0');
  return PaymentsModule.port;
}
bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
