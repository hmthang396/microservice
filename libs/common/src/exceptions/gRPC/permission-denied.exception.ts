import { errorObject } from '@app/libs/utils';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class GrpcPermissionDeniedException extends RpcException {
  constructor(error: string | object) {
    super(errorObject(error, status.PERMISSION_DENIED));
  }
}
