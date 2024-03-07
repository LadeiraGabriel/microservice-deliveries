import { Module } from '@nestjs/common';
import { ProvidersModule } from 'src/shared/infra/providers/providers.module';
import { VerifyAuthorizationUseCase } from './application/useCase/verify-authorization.use-case';
import { AuthProvider } from './application/providers/auth.provider';

@Module({
  imports: [ProvidersModule],
  providers: [
    {
      provide: VerifyAuthorizationUseCase,
      useFactory: (authProvider: AuthProvider) => {
        return new VerifyAuthorizationUseCase(authProvider);
      },
      inject: [AuthProvider],
    },
  ],
  exports: [VerifyAuthorizationUseCase],
})
export class AuthModule {}
