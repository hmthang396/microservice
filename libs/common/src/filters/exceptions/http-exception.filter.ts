import { LoggerService } from '@app/libs/logger/logger.service';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

interface IError {
  message: string;
  code_error: string;
}
@Catch()
export class GRPCExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
	console.log(exception);
	
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();
	const status = exception?.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, code_error: null };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);
	throw exception;
	
    // response.status(status).json(responseData);
  }

  private logMessage(request: any, message: IError, status: number, exception: any) {
    this.logger.error(
      `End Request for ${request.path}`,
      `method=${request.method} status=${status} code_error=${
        message.code_error ? message.code_error : null
      } message=${message.message ? message.message : null}`,
      status >= 500 ? exception.stack : '',
    );
  }
}
