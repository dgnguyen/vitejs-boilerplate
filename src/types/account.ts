export type IAccount = {
  name: string
  surname: string
  email: string
  permissionLevel: number
  userId: number
  isActive: boolean
  loginDate: Date
  createDate: Date
  updateDate: Date
  createdBy: string
  agentName: string
  isBlock: boolean
}

export type IAccounts = {
  loading: boolean
  loadingPage: boolean
  error: boolean
  data: IAccount[]
  page: number
  take: number
  hasMore: boolean
  totalCount: number
}
