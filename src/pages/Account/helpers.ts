import { ROLES } from 'constants/account'

export function getUserRole(role: number): ROLES {
  switch (role) {
    case 1:
      return ROLES.SUPER_ADMIN
    case 2:
      return ROLES.ADMIN
    case 3:
      return ROLES.MASTER_AGENT
    case 4:
    default:
      return ROLES.AGENT
  }
}

export const initialStateCreateAccount = {
  name: '',
  surname: '',
  email: '',
  permissionLevel: 2,
  password: '',
  confirmPassword: '',
}
