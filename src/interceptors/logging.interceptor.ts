import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export default class RequestLoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const method = `${request.method} ${request.url} [${response.statusCode}]`;
    const query = `query: ${JSON.stringify(request.query)}`;
    const params = `params: ${JSON.stringify(request.params)}`;
    const body = `body: ${JSON.stringify(request.body)}`;
    const time = `[${Date.now() - start} ms]`;

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log([method, query, params, body, time].join(';  ')),
        ),
      );
  }
}
