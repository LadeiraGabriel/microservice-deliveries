import { UseCaseError } from '../app-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(customMessage?: string) {
    const message = customMessage ?? 'Resource not found';
    super(message);
    this.message = message;
  }
}
