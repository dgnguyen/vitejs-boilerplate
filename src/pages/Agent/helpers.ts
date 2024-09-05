import { WALLET_TYPE } from 'constants/agent'

export function getWalletName(id: number) {
  if (id === WALLET_TYPE.SEAMLESS) return 'Seamless'
  if (id === WALLET_TYPE.TRANSFER) return 'Transfer'
  return ''
}

export const headersAgentList = [
  'Agent Id',
  'Agent Code',
  'Agent Name',
  'Register Date',
  'Tag',
  'Wallet Type',
  'Status',
]
