import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ResponseDto } from 'apps/payments/src/presentations/dtos/response.dto';

export const ApiGlobalResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              payload: {
                $ref: getSchemaPath(model),
              },
              timestamp: {
                type: 'number',
              },
            },
          },
        ],
      },
    }),
    ApiUnauthorizedResponse({ description: 'Not authenticated', type: '', status: '4XX' }),
    ApiForbiddenResponse({ description: 'Access denied' }),
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiInternalServerErrorResponse({ description: 'Server error' }),
  );
};
