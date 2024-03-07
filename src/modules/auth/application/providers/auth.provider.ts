export type AuthorizationProps = {
  userId: string;
  role: string;
};

export abstract class AuthProvider {
  abstract verifyCredentials(token: string): AuthorizationProps | undefined;
}
