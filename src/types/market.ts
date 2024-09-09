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
