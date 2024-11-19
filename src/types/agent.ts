import { ICURRENCY } from './currency'

export type IAgentData = {
  id: number
  externalId: string
  name: string
  code: string
  registerDate: string
  isActive: boolean
  isBlock: boolean
  walletTypeId: number
  tag: string
  betLimitByCurrency: IBetLimitByCurrency
}

type IBetLimitByCurrency = {
  [key: string]: {
    minBet: number
    maxBet: number
  }
}

type OptionSelect = {
  name: string
  id: number
}

export type IAgentBetLimit = {
  id: number
  type: string
  agent: OptionSelect
  gameType: OptionSelect
  market: OptionSelect
  event: OptionSelect
  minBet: number
  maxBet: number
  appliedDate: string
  appliedBy: string
  groupPermissionId: number
  currency: string
}
