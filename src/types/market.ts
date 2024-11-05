export type IEvents = {
  id: number
  marketId: number
  marketName: string
  eventName: string
  eventId: number
  odds: number
  minRate: number | null
  maxRate: number | null
  dependancy: string
  gameType: number
  total: number
  minBet: number
  maxBet: number
}

export type IMarketStat = {
  events: IEvents[]
  marketName: string
  total: number
}

export type EventGGR = {
  eventName: string
  totalBet: number
  totalWin: number
  ggr: number
}

export type EventBetLimit = {
  eventName: string
  minBet: number
  maxBet: number
}

export type IMarketGGR = {
  marketName: string
  total: number
  events: EventGGR[]
}

export type IMarketBetLimit = {
  marketName: string
  total: number
  events: EventBetLimit[]
}

export type ITopMarketObj = {
  marketName: string
  eventName: string
  coefficient: number
  playerCount: number
  transactionCount: number
  totalBet: number
  totalWin: number
  ggr: number
  gameName: string
}
