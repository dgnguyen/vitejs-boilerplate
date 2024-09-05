export const SearchTypeValue = {
  agentTransaction: 1,
  betAmount: 5,
  roundId: 2,
  moaTransaction: 1,
  agentPlayerId: 4,
}

export const searchTypeOptions = [
  { value: SearchTypeValue.agentTransaction, label: 'Agent transaction ID' },
  { value: SearchTypeValue.betAmount, label: 'Bet Amount' },
  { value: SearchTypeValue.roundId, label: 'Round ID' },
  {
    value: SearchTypeValue.moaTransaction,
    label: 'RunningBall Transaction ID',
  },
  { value: SearchTypeValue.agentPlayerId, label: 'Agent player ID' },
]

export const TRStatusSelectOptions = [
  { value: 'null', label: 'All' },
  { value: 2, label: 'Win' },
  { value: 1, label: 'Lost' },
  { value: 4, label: 'Refund' },
  { value: 0, label: 'Pending' },
]

export const initialDateState = { startDate: new Date(), endDate: new Date() }
