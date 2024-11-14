import { ICURRENCY } from './currency'

export type IAgent = {
  id: number
  externalId: string
  name: string
  code: string
  registerDate: string
  isActive: boolean
  isBlock: boolean
  walletTypeId: number
  currency: ICURRENCY[]
}
