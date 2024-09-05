export interface DataReturnProps<T> {
  data: T[]
  loading: boolean
  isLoadingPage: boolean
  errors: string | null | boolean
  page: number
  take: number
  totalCount: number
  hasMore: boolean
}
