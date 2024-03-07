import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'ADMIN',
  DELIVERYMAN = 'DELIVERYMAN',
  ALL = 'ALL',
}

export const Roles = (role: Role) => SetMetadata('role', role);
