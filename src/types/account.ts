export type IAccount = {
  partnerId: number
  agentName: string[]
  name: string
  surname: string
  email: string
  permissionLevel: number
  userId: number
  isActive: boolean
  isBlock: boolean
  agentList: number[]
  loginDate: string
  createDate: string
  updateDate: string
  createdBy: string
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

export type ValuesForm = {
  email: string
  name: string
  surname: string
  isActive?: boolean
  partnerId: string
  permissionLevel?: number
  oldPassword?: string
  password?: string
  confirmPassword?: string
  agentList: string[] | number[]
  agentName: string[]
}
