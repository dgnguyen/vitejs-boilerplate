import { WALLET_TYPE } from 'constants/agent'

export function getWalletName(id: number) {
  if (id === WALLET_TYPE.SEAMLESS) return 'Seamless'
  if (id === WALLET_TYPE.TRANSFER) return 'Transfer'
  return ''
}

export const headersAgentList = [
  'Agent ID',
  'Agent Code',
  'Agent Name',
  'Register Date',
  ['Category', '(Agent Tag)'],
  'Min/Max Bet By Currency',
  'Wallet Type',
  'Status',
]

export const optionsStatus = [
  { value: 'true', label: 'Block' },
  { value: 'false', label: 'Active' },
]

export const walletTypeOptions = [
  { value: 1, label: 'Seamless' },
  { value: 2, label: 'Transfer' },
]

export const searchTypeAgent = [
  { value: 1, label: 'Agent Name' },
  { value: 2, label: 'Agent Code' },
  { value: 3, label: 'Agent ID' },
]

export const headerAgentBetLimit = [
  'ID',
  'Type',
  'Agent Name',
  'Game Name',
  'Market Name',
  'Sub-Market Name',
  'Min',
  'Max',
  'Applied Date',
  'Applied By',
]

export const marketNames = {
  oddsmall: 'Odd + Small',
  oddmedium: 'Odd + Medium',
  oddlarge: 'Odd + Large',
  evensmall: 'Even + Small',
  evenmedium: 'Even + Medium',
  evenlarge: 'Even + Large',
  oddunder: 'Odd + Under',
  evenunder: 'Even + Under',
  oddover: 'Odd + Over',
  evenover: 'Even + Over',
}
