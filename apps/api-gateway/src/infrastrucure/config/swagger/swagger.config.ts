import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};

export const TOKEN_NAME = 'access-token';

const title = 'Api-Gateway Service';
const description = `Api-Gateway Support Rest API`;

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (app: INestApplication, apiPrefix: string) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`${apiPrefix}/:version/swagger`, app, document);
};
