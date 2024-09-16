import { ISearchValuesTransactions } from './transaction'

export type IFilter = {
  playerId: string | null
} & ISearchValuesTransactions
