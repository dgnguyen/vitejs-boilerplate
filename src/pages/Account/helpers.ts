import { ROLES } from 'constants/account'

export function getUserRole(role: number): ROLES {
  switch (role) {
    case 1:
      return ROLES.SUPER_ADMIN
    case 2:
      return ROLES.OPERATOR
    case 3:
      return ROLES.ADMIN
    case 4:
    default:
      return ROLES.SUB_OPERATOR
  }
}

export const initialStateCreateAccount = {
  name: '',
  surname: '',
  email: '',
  permissionLevel: undefined,
  password: '',
  confirmPassword: '',
  partnerId: '',
  agentList: [],
}
