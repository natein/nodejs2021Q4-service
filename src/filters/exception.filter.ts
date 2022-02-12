import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export default class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const start = Date.now();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'Internal server error';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const sendingData = {
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    const sendingMessage = typeof message === 'string' ? { message } : message;
    Object.assign(sendingData, sendingMessage);
    response.status(status).send({ ...sendingData });

    const method = `${request.method} ${request.url} [${response.statusCode}]`;
    const query = `query: ${JSON.stringify(request.query)}`;
    const params = `params: ${JSON.stringify(request.params)}`;
    const body = `body: ${JSON.stringify(request.body)}`;
    const error = `${exception.message}`;
    const time = `[${Date.now() - start} ms]`;

    return this.logger.warn(
      [method, query, params, body, error, time].join(';  '),
    );
  }
}
