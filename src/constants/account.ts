export enum ROLES {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  SUB_OPERATOR = 'SUB_OPERATOR',
}

export const PERMISSION_LEVEL = [
  { value: 1, label: ROLES.SUPER_ADMIN },
  { value: 2, label: ROLES.OPERATOR },
  { value: 3, label: ROLES.ADMIN },
  { value: 4, label: ROLES.SUB_OPERATOR },
]
