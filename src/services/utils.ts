import type { AriaAttributes } from 'react';

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
