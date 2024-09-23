import { CURRENCY } from 'constants/currency'
import { ICURRENCY } from 'types/currency'

export const thousandSeparator = (
  number?: number | string | null,
  separator = ','
) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const addCurrencyToPrice = (
  price?: number | null,
  currency?: ICURRENCY
) => {
  return price !== null
    ? `${thousandSeparator(price)} ${currency || CURRENCY.KRW}`
    : 0
}
