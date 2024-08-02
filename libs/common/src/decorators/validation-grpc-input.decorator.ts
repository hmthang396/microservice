import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { GrpcInvalidArgumentException } from '../exceptions/gRPC/invalid-argument.exception';

export function ValidateGrpcInput(dtoClass: any) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const [data] = args;
      const object = plainToInstance(dtoClass, data);
      const errors = await validate(object);

      if (errors.length > 0) {
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
		
        throw new GrpcInvalidArgumentException(errors.map((error) => formatError(error)));
      }

      return originalMethod.apply(this, args);
    };
  };
}



