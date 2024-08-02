import { LoggerService } from '@app/libs/logger/logger.service';
import { GrpcExceptionPayload } from '@app/libs/utils';
import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError, Observable } from 'rxjs';

@Catch(RpcException)
export class GrpcServerExceptionFilter implements RpcExceptionFilter<RpcException> {
  constructor(private logger: LoggerService) {}

  catch(exception: RpcException): Observable<any> {
	const error = exception.getError() as GrpcExceptionPayload;
    this.logMessage(error.message, error.code, exception);
	console.log(exception.getError());
	
    return throwError(() => exception.getError());
  }

  private logMessage(message: string, status: number, exception: any) {
	this.logger.error(`code_error=${status} message=${message ? message : null}`, exception?.stack);
  }
}


























