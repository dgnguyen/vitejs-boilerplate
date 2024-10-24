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
  minBet: number
  maxBet: number
}

export type IAgentBetLimit = {
  type: string
  agentName: string
  gameName: string
  marketName: string
  eventName: string
  minBet: number
  maxBet: number
  appliedBy: string
  appliedDate: string
}
