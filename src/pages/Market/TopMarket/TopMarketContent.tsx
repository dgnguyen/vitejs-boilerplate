import { useCallback, useEffect, useState } from 'react'

import { Box, Button, CircularProgress, Typography } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import BottomArrowIcon from 'assets/images/icons/BottomArrow.svg'
import UpArrowIcon from 'assets/images/icons/UpArrow.svg'
import axios, { AxiosResponse } from 'axios'
import DataPicker from 'components/DataPicker'
import EmptyData from 'components/EmptyData'
import { marketNames } from 'constants/market'
import {
  addHours,
  format,
  isSameDay,
  isToday,
  subHours,
  subMonths,
  subWeeks,
} from 'date-fns'
import { isSuperAdmin } from 'helpers/auth'
import { thousandSeparator } from 'helpers/currency'
import { useSelector } from 'react-redux'
import { resetMarketFilter } from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import { ITopMarketObj } from 'types/market'

import './style.scss'

enum searchTypesEnum {
  custom,
  hourly,
  today,
  week,
  month,
}

enum orderTypesEnum {
  transactionCount = 1,
  ggr,
  totalBet,
}

const findDateType = (sD: string | Date, eD: string | Date) => {
  let searchType = searchTypesEnum.custom
  const todayDate = new Date()
  const startDate = new Date(sD)
  const endDate = new Date(eD)

  if (isToday(startDate) && isToday(endDate)) {
    searchType = searchTypesEnum.today
  } else if (
    isSameDay(todayDate, endDate) &&
    isSameDay(subWeeks(todayDate, 1), startDate)
  ) {
    searchType = searchTypesEnum.week
  } else if (
    isSameDay(todayDate, endDate) &&
    isSameDay(subMonths(todayDate, 1), startDate)
  ) {
    searchType = searchTypesEnum.month
  }

  return searchType
}

const TopMarketContent = () => {
  const todayDate = new Date()
  const initialSelectedDataObj = {
    startDate: subHours(todayDate, 1),
    endDate: addHours(todayDate, 1),
  }
  const [selectedDate, setSelectedDate] = useState(initialSelectedDataObj)
  const [searchDateType, setSearchDateType] = useState(searchTypesEnum.hourly)
  const [resetToggle, setResetToggle] = useState(false)
  const [data, setData] = useState<ITopMarketObj[] | []>([])
  const [isLoading, setLoading] = useState(true)
  const [orderBy, setOrderBy] = useState(orderTypesEnum.totalBet)
  const marketSelector = useSelector((state: RootState) => state.market)
  const { agent, isTester } = marketSelector.searchValues
  const dispatch = useAppDispatch()

  useEffect(() => {
    if ((isSuperAdmin() && agent) || !isSuperAdmin()) handleDataFetch()
    return () => {
      dispatch(resetMarketFilter())
    }
  }, [selectedDate, agent, isTester])

  const handleDataFetch = async () => {
    const partnerId = agent === 'all' ? null : [agent]
    setLoading(true)
    setData([])
    try {
      const res: AxiosResponse = await axios.post(API_ENDPOINT.GET_TOP_MARKET, {
        searchFrom: searchDateType
          ? null
          : format(selectedDate.startDate, 'yyyy-MM-dd'),
        searchTo: searchDateType
          ? null
          : format(selectedDate.endDate, 'yyyy-MM-dd'),
        searchType: searchDateType,
        orderBy: orderBy,
        partnerId,
        isTester:
          isTester === 'true' ? true : isTester === 'false' ? false : null,
      })
      setData(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = useCallback(
    async (startDate?: string | Date, endDate?: string | Date) => {
      if (startDate && endDate) {
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)

        setSelectedDate({
          startDate: startDateObj,
          endDate: endDateObj,
        })
      }
    },
    []
  )

  const handleReset = () => {
    setSelectedDate(initialSelectedDataObj)
    setSearchDateType(searchTypesEnum.hourly)
    setResetToggle((prev) => !prev)
  }

  const handleOrderChange = (orderKey: orderTypesEnum) => {
    if (orderBy === orderKey || !data?.length) {
      return
    }
    const sortedData = [...data]

    sortedData.sort((a, b) =>
      // @ts-ignore
      a[orderTypesEnum[orderKey]] < b[orderTypesEnum[orderKey]]
        ? 1
        : // @ts-ignore
        a[orderTypesEnum[orderKey]] > b[orderTypesEnum[orderKey]]
          ? -1
          : 0
    )

    setData(sortedData)
    setOrderBy(orderKey)
  }

  return (
    <Box>
      <div className='dateSelectDiv'>
        <Button
          onClick={() => {
            handleDateChange(
              initialSelectedDataObj.startDate.toString(),
              initialSelectedDataObj.endDate.toString()
            )

            setSearchDateType(searchTypesEnum.hourly)
            setResetToggle((prev) => !prev)
          }}
          variant={
            searchDateType === searchTypesEnum.hourly ? 'contained' : 'outlined'
          }
        >
          1H
        </Button>
        <Button
          onClick={() => {
            handleDateChange(todayDate.toString(), todayDate.toString())
            setSearchDateType(searchTypesEnum.today)
            setResetToggle((prev) => !prev)
          }}
          variant={
            searchDateType === searchTypesEnum.today ? 'contained' : 'outlined'
          }
        >
          Today
        </Button>
        <Button
          onClick={() => {
            handleDateChange(
              subWeeks(todayDate, 1).toString(),
              todayDate.toString()
            )

            setSearchDateType(searchTypesEnum.week)
            setResetToggle((prev) => !prev)
          }}
          variant={
            searchDateType === searchTypesEnum.week ? 'contained' : 'outlined'
          }
        >
          1W
        </Button>
        <Button
          onClick={() => {
            handleDateChange(
              subMonths(todayDate, 1).toString(),
              todayDate.toString()
            )

            setSearchDateType(searchTypesEnum.month)
            setResetToggle((prev) => !prev)
          }}
          variant={
            searchDateType === searchTypesEnum.month ? 'contained' : 'outlined'
          }
        >
          1M
        </Button>

        <DataPicker
          changeHandler={(sD, eD) => {
            handleDateChange(sD, eD)
            setSearchDateType(findDateType(sD, eD))
          }}
          initialSetDate={selectedDate}
          reset={resetToggle}
          oneMonthSelection
          style={{
            right: '200px',
          }}
        />

        <Button
          className={'resetButton'}
          variant='contained'
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className='tableDiv'>
        <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 400px);' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <table className='table'>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Market name</th>
                  <th>Game</th>
                  <th>Coefficient</th>
                  <th className='canBeOrderedTH'>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='flex-end'
                      onClick={() =>
                        handleOrderChange(orderTypesEnum.transactionCount)
                      }
                    >
                      {orderBy === orderTypesEnum.transactionCount ? (
                        <UpArrowIcon />
                      ) : (
                        <BottomArrowIcon />
                      )}
                      <Typography>Transaction count</Typography>
                    </Box>
                  </th>
                  <th>Player Count</th>
                  <th className='canBeOrderedTH'>
                    <Box
                      display='flex'
                      gap={1}
                      alignItems='center'
                      onClick={() => handleOrderChange(orderTypesEnum.totalBet)}
                    >
                      {orderBy === orderTypesEnum.totalBet ? (
                        <UpArrowIcon />
                      ) : (
                        <BottomArrowIcon />
                      )}
                      <Typography>Total Bet</Typography>
                    </Box>
                  </th>
                  <th>Total Win</th>
                  <th className='canBeOrderedTH'>
                    <Box
                      display='flex'
                      gap={1}
                      alignItems='center'
                      onClick={() => handleOrderChange(orderTypesEnum.ggr)}
                    >
                      {orderBy === orderTypesEnum.ggr ? (
                        <UpArrowIcon />
                      ) : (
                        <BottomArrowIcon />
                      )}
                      <Typography> GGR</Typography>
                    </Box>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data?.map((item: ITopMarketObj, index) => {
                    const {
                      marketName,
                      eventName,
                      coefficient,
                      playerCount,
                      transactionCount,
                      totalBet,
                      totalWin,
                      ggr,
                      gameName = '',
                    } = item

                    return (
                      <tr>
                        <td>
                          <p>
                            <div>
                              <span>{index + 1}</span>
                            </div>{' '}
                            {marketNames[
                              eventName as keyof typeof marketNames
                            ] || eventName.replace(',', ' +')}
                          </p>
                        </td>
                        <td>{marketName}</td>
                        <td>{gameName}</td>
                        <td>{coefficient}</td>
                        <td>{transactionCount}</td>
                        <td>{playerCount}</td>
                        <td>{thousandSeparator(totalBet)}</td>
                        <td>{thousandSeparator(totalWin)}</td>
                        <td>{thousandSeparator(ggr)}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={9}>
                      <EmptyData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </Box>
      </div>
    </Box>
  )
}

export default TopMarketContent
