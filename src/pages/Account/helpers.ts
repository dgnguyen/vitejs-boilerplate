import { PERMISSION_LEVEL, ROLES } from 'constants/account'
import { USER_ROLE } from 'constants/auth'
import { isOperator, isSuperAdmin } from 'helpers/auth'

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

export const getPermissionLevelBasedOnUser = () => {
  if (isSuperAdmin()) {
    return PERMISSION_LEVEL
  }
  if (isOperator()) {
    return PERMISSION_LEVEL.filter(
      (item) => item.value === USER_ROLE.SUB_OPERATOR ||
                item.value === USER_ROLE.OPERATOR
    )
  }
  return []
}
