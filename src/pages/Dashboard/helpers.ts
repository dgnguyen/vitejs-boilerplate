import { ICURRENCY } from 'types/currency'
import { IAgent } from 'types/listAgents'

export function getStyledButton(route: string) {
  return window.location.pathname === route ? 'contained' : 'outlined'
}

export function getCurrencyByAgent(
  agentSelected: string | null,
  listAgents: IAgent[],
  noAllValue?: boolean
) {
  let listCurrencies = [] as string[]
  if (agentSelected === 'all') {
    listCurrencies = listAgents.reduce((acc: ICURRENCY[], cur: IAgent) => {
      if (!acc.some((item: ICURRENCY) => cur.currency.includes(item)))
        return [...acc, ...cur?.currency]
      return acc
    }, [])
  } else
    listCurrencies =
      (listAgents.find(
        (agent) => agent.id.toString() === agentSelected?.toString()
      )?.currency as string[]) || []

  return noAllValue ? listCurrencies : ['all', ...listCurrencies]
}
