import { UseCaseError } from '../app-error';

export class UnauthorizedError extends Error implements UseCaseError {
  constructor() {
    const message = 'No authorizated';
    super(message);
    this.message = message;
  }
}
