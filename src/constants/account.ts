export enum ROLES {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMIN = 'ADMIN',
  MASTER_AGENT = 'MASTER_AGENT',
  AGENT = 'AGENT',
}

export const PERMISSION_LEVEL = [
  { value: 1, label: ROLES.SUPER_ADMIN },
  { value: 2, label: ROLES.ADMIN },
  { value: 3, label: ROLES.MASTER_AGENT },
  { value: 4, label: ROLES.AGENT },
]
