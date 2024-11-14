import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils'
import { ICURRENCY } from 'types/currency'
import { IAgent } from 'types/listAgents'

export function getStyledButton(route: string) {
  return window.location.pathname === route ? 'contained' : 'outlined'
}

export function getCurrencyByAgent(
  agentSelected: string,
  listAgents: IAgent[]
) {
  if (agentSelected === 'all') {
    return listAgents.reduce((acc: ICURRENCY[], cur: IAgent) => {
      if (!acc.some((item: ICURRENCY) => cur.currency.includes(item)))
        return [...acc, ...cur.currency]
      return acc
    }, [])
  }
  return listAgents.find(
    (agent) => agent.id.toString() === agentSelected.toString()
  )?.currency
}
