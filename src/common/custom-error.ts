import { StatusCodes, getStatusCode } from 'http-status-codes';

class CustomError extends Error {

  statusCode: number;

  message: string;

  constructor(statusCode = StatusCodes.OK, message = '') {
    const customMessage = message ? `. ${message}` : '';

    super();
    this.statusCode = statusCode;
    this.message = `${getStatusCode(statusCode.toString())}${customMessage}`;
  }
}

export default CustomError;
