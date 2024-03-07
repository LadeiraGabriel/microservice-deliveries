import { Either, failure, success } from 'src/shared/core/errors/either';
import { UnauthorizedError } from 'src/shared/core/errors/generics/unauthorized.error';
import { AuthProvider } from '../providers/auth.provider';

interface IVerifyAuthorizationUseCaseRequest {
  token: string;
  authorizedRole: string;
}

interface AuthorizationUser {
  userId: string;
  role: string;
}
type Response = Either<UnauthorizedError, AuthorizationUser>;

export class VerifyAuthorizationUseCase {
  constructor(private authProvider: AuthProvider) {}
  execute({
    token,
    authorizedRole,
  }: IVerifyAuthorizationUseCaseRequest): Response {
    const auth = this.authProvider.verifyCredentials(token);
    if (!auth) return failure(new UnauthorizedError());
    if (auth.role === 'ALL') {
      return success({
        userId: auth.userId,
        role: auth.role,
      });
    }
    if (auth.role !== authorizedRole) return failure(new UnauthorizedError());
    return success({
      userId: auth.userId,
      role: auth.role,
    });
  }
}
