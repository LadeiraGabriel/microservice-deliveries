import { UseCaseError } from '../app-error';

export class ResourceConflictError extends Error implements UseCaseError {
  constructor(customMessage?: string) {
    const message = customMessage ?? 'Resource conflict';
    super(message);
    this.message = message;
  }
}
