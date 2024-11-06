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

export function getInitState(editStateObj: any): any {
  return Object.entries(editStateObj).reduce((acc, cur: any) => {
    if (cur[0] === 'agent') {
      return {
        ...acc,
        agentSelect: cur[1]?.id || '',
      }
    }
    if (cur[0] === 'event') {
      return {
        ...acc,
        eventSelect: cur[1]?.id || '',
      }
    }
    if (cur[0] === 'market') {
      return {
        ...acc,
        marketSelect: cur[1]?.id || '',
      }
    }
    if (cur[0] === 'gameType') {
      return {
        ...acc,
        gameSelect: cur[1]?.id || '',
      }
    } else
      return {
        ...acc,
        [cur[0]]: cur[1].toString(),
      }
  }, {})
}