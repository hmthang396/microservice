import { errorObject } from '@app/libs/utils';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class GrpcCancelledException extends RpcException {
  constructor(error: string | object) {
    super(errorObject(error, status.CANCELLED));
  }
}
