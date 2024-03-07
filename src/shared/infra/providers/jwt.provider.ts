import { Injectable } from '@nestjs/common';
import {
  AuthProvider,
  AuthorizationProps,
} from 'src/modules/auth/application/providers/auth.provider';
import { JwtPayload, decode } from 'jsonwebtoken';
interface IPayload extends AuthorizationProps, JwtPayload {}
@Injectable()
export class JwtProvider implements AuthProvider {
  verifyCredentials(token: string): AuthorizationProps {
    const decoded = decode(token);
    if (!decoded) return undefined;
    const { userId, role } = decoded as IPayload;
    return { userId, role };
  }
}
