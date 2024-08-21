import { CURRENCY } from 'constants/currency'
import { ICURRENCY } from 'types/currency'

export const thousandSeparator = (
  number: number | undefined,
  separator = ','
) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const addCurrencyToPrice = (price: number, currency?: ICURRENCY) => {
  return `${thousandSeparator(price)} ${currency || CURRENCY.KRW}`
}
