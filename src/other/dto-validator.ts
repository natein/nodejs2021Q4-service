import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export default class ValidationException extends BadRequestException {
  constructor(public errors: ValidationError[]) {
    super();
  }
  public getMessage(): string {
    return this.errors.map((error) => error.toString()).join('/n');
  }
}
