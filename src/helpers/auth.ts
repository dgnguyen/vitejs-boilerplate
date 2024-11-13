type IUser = {
  userId: number
  partnerId: number
  name: string
  surname: string
  login: string
  groupPermissionId: number
  token: string
  loginExpirationDate: string
}

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

export const getToken = () => {
  return sessionStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!getUser() // && getExpiresAt();
}

export const isOperator = () => getUser().role === 2

export const isSubOperator = () => getUser().role === 4

export const isAdmin = () => getUser().role === 3

export const isSuperAdmin = () => {
  return getUser().role === 1
}

export function haveRightToAccess(role: number) {
  return !!(getUser().role <= role)
}

export const isSuperAdminOrAdmin = () => getUser().role <= 2

export const removeToken = () => {
  sessionStorage.removeItem('token')
}

export const removeUser = () => {
  sessionStorage.removeItem('user')
}

export const setUser = (user: IUser) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem('user') || '{"token":"","role":0}')
}

export const setExpiresAt = (date: string) => {
  return sessionStorage.setItem('expires_at', date)
}

export const getExpiresAt = () => {
  const date = sessionStorage.getItem('expires_at')
  let expiresAt

  if (date) expiresAt = Date.parse(date)

  if (expiresAt) return new Date().getTime() < expiresAt
}
