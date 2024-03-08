import { VerifyAuthorizationUseCase } from '@modules/auth/application/useCase/verify-authorization.use-case';
import { UnauthorizedError } from '@shared/core/errors/generics/unauthorized.error';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private verifyAuthorizationUseCase: VerifyAuthorizationUseCase,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorizedRole = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!authorizedRole) {
      return true;
    }
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        status: 'error',
        error: 'code.token_missing',
        message: 'JWT token is missing',
      });
      return false;
    }
    const [, token] = authHeader.split(' ');
    const useCaseReponse = this.verifyAuthorizationUseCase.execute({
      token,
      authorizedRole,
    });

    if (useCaseReponse.isFailure()) {
      const error = useCaseReponse.value;
      const message = error.message;
      if (error.constructor === UnauthorizedError)
        res.status(403).json({
          status: 'error',
          error: 'code.forbidden',
          message: message,
        });
      return false;
    } else {
      const { userId, role } = useCaseReponse.value;
      req.user = {
        id: userId,
        role: role,
      };
    }

    return true;
  }
}
