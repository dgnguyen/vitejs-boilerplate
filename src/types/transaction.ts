// import { TRListType } from '../components/Accordion'

export enum SearchTypeValue {
  BC_TRANSACTION = 1,
  BET_AMOUNT = 2,
  ROUND_ID = 3,
  MOA_TRANSACTION = 4,
  BC_PLAYERID = 5,
}

export type DateType = {
  startDate: Date
  endDate: Date
}

export type ISearchValuesTransactions = {
  id: string
  searchType: SearchTypeValue
  TransactionStatus: string | number
  isTester: string
  date: DateType
  page: number
  take: number
  selectedGameType: number[] | null
  totalCount: number
  hasMore: boolean
  selectedAllGames: boolean
  agentSelected: string
}

export type SettingsTransactions = {
  length: number
  hasMore: boolean
}

export type IDashboardTransaction = {
  ggr: number
  ggrInPercent: number
  totalBetAmount: number
  totalCount: number
  totalWinAmount: number
}

export type ITransactions = {
  loading: boolean
  loadingPage: boolean
  errors: boolean
  settings: SettingsTransactions
  // data: TRListType[]
  data: any //totype
  searchValues: ISearchValuesTransactions
  isExporting: boolean
  dashboard?: IDashboardTransaction
}

export type DateRange = {
  startDate: Date | string
  endDate: Date | string
}

export type StatusTransaction = 0 | 1 | 2 | 3 | 4

export type UpdateCMSDataWS = {
  betLogId: string
  status: StatusTransaction
  externalTransactionId: number
  winAmount: number
  gameResult: string
}[]

type RowRecord = {
  betLogId: string
  partnerId: string
  transactionDate: string
  playerId: string
  platformPlayerId: string
  coefficient: string
  betAmount: string
  currency: string
  winAmount: number | null
  status: StatusTransaction
}

type content = {
  tickets: {
    externalRoundId: string
    marketName: string
    eventName: string
    coefficent: string
    currency: string
    gameResult: string
    minRate: number | null | string
    maxRate: number | null | string
  }[]
}

type contentRecord = {
  externalRoundId: string
  marketName: string
  eventName: string
  coefficent: string
  currency: string
  gameResult: string
}

type AccordionProps = {
  data: RowRecord & content
}

export type TRListType = RowRecord & content
