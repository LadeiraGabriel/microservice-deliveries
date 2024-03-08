import { UseCaseError } from '../../../../../shared/core/errors/app-error';

export class UnableSendOrderError extends Error implements UseCaseError {
  constructor() {
    const message = 'Unable to send order';
    super(message);
    this.message = message;
  }
}
