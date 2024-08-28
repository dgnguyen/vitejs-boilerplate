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
