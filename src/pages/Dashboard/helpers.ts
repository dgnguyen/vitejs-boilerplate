export function getStyledButton(route: string) {
  return window.location.pathname === route ? 'contained' : 'outlined'
}
