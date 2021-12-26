import { getStatusCode } from 'http-status-codes';

class CustomError extends Error {

  statusCode: number;

  message: string;

  constructor(statusCode = 200, message = '') {
    const customMessage = message ? `. ${message}` : '';

    super();
    this.statusCode = statusCode;
    this.message = `${getStatusCode(statusCode.toString())}${customMessage}`;
  }
}

export default CustomError;
