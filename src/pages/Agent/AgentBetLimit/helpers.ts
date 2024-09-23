import { SEARCH_TYPE_AGENT_BET_LIMIT } from 'constants/agent'

export const searchTypeAgentBetLimitOptions = [
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.AGENT_NAME, label: 'By Agent' },
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.GAME_NAME, label: 'By Game' },
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.MARKET_NAME, label: 'By Market' },
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.EVENT_NAME, label: 'By Sub-Market' },
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.MIN_BET, label: 'By Min Bet' },
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.MAX_BET, label: 'By Max Bet' },
  { value: SEARCH_TYPE_AGENT_BET_LIMIT.APPLIED_BY, label: 'Applied By' },
]
