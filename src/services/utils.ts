import type { AriaAttributes } from 'react';
import { z } from 'zod';

import type { User } from './user-api';

export const getAriaDescribedBy = (
  name: string,
  text: string | undefined,
  isInvalid: boolean,
): AriaAttributes['aria-describedby'] => {
  if (!name || !text) return undefined;

  return isInvalid ? `${name}-error` : `${name}-description`;
};

export const USER_ROLE_VALUES = ['', 'DEV', 'ADMIN'] as const;

export type UserRole = (typeof USER_ROLE_VALUES)[number];

export const mapUserRoleName = (role?: string) => {
  switch (role) {
    case USER_ROLE_VALUES[2]:
      return 'Admin';
    case USER_ROLE_VALUES[1]:
      return 'Developer';
    default:
      return 'Regular User';
  }
};

export const userSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.union([z.string().email(), z.literal('')]),
  role: z.enum(USER_ROLE_VALUES),
});

export type UserSchema = z.infer<typeof userSchema>;

export const mapUserSchemaToUser = (user: UserSchema): User => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email || undefined,
  role: user.role || undefined,
});

export const mapUserToUserSchema = (user: User): UserSchema => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email || '',
  role: user.role || '',
});
