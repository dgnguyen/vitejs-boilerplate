import { addDays } from 'date-fns'
import moment from 'moment'

export const initialState = {
  startDate: new Date(),
  endDate: addDays(new Date(), 7),
}

export const initialStateCalendar = {
  startDate: moment().startOf('day').format(),
  endDate: moment().endOf('day').format(),
}
