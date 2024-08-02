import { errorObject } from '@app/libs/utils';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class GrpcInvalidArgumentException extends RpcException {
  constructor(error: string | object) {
    super(errorObject(error, status.INVALID_ARGUMENT));
  }
}
