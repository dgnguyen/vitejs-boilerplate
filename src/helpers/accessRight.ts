import { getUser } from './auth'

export function haveAccessTo({
  url,
  func,
  limitFunction,
}: {
  url?: string
  func?: string
  limitFunction?: string
}) {
  const userRole = getUser()?.role
}
