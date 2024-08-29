import { ISearchValuesTransactions } from './transaction'

export interface IFilter extends ISearchValuesTransactions {
  playerId: string | null
}
