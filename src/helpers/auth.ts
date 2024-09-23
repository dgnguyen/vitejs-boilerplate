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
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!getUser() // && getExpiresAt();
}

export const isMasterAgent = () => getUser().role === 2

export const isAgent = () => getUser().role === 4

export const isAdmin = () => getUser().role === 3

export const isSuperAdmin = () => {
  return getUser().role === 1
}

export function haveRightToAccess(role: number) {
  return !!(getUser().role <= role)
}

export const isSuperAdminOrAdmin = () => getUser().role <= 2

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const removeUser = () => {
  localStorage.removeItem('user')
}

export const setUser = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{"token":"","role":0}')
}

export const setExpiresAt = (date: string) => {
  return localStorage.setItem('expires_at', date)
}

export const getExpiresAt = () => {
  const date = localStorage.getItem('expires_at')
  let expiresAt

  if (date) expiresAt = Date.parse(date)

  if (expiresAt) return new Date().getTime() < expiresAt
}
