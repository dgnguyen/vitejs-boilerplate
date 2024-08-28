export function getDashboardCardTitle(title: string) {
  const arrayTitle = {
    totalCount: 'Total Count',
    totalBetAmount: 'TT Bet',
    totalWinAmount: 'TT Win',
    ggr: 'GGR',
    ggrInPercent: 'GGR in %',
  } as {
    [key: string]: string
  }
  return arrayTitle?.[title] || ''
}

export const TRStatusSelectOptions = [
  { value: 'null', label: 'All' },
  { value: 2, label: 'Win' },
  { value: 1, label: 'Lost' },
  { value: 4, label: 'Refund' },
  { value: 0, label: 'Pending' },
]
