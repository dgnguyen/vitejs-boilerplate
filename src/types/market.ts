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
}

export type IMarketStat = {
  events: IEvents[]
  marketName: string
  total: number
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
