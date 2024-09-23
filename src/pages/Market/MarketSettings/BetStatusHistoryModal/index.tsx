import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import axios, { AxiosResponse } from 'axios'
import Modal from 'components/Commons/MuiModal'
import EmptyData from 'components/EmptyData'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

import styles from './style.module.scss'

const BetStatusHistoryModal: React.FC<{ onModalClose: () => void }> = ({
  onModalClose,
}) => {
  const marketData = useSelector((state: RootState) => state.market)
  const { agent, gameType } = marketData.searchValues
  const [pageSetting, setPageSetting] = useState({
    page: 0, //The page is starting from 0 on the BE side.
    take: 20,
    isFinished: false,
  })

  const [historyData, setHistoryData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [initialLoader, setInitialLoader] = useState(true)

  useEffect(() => {
    ;(async () => {
      await getHistoryData()
      setInitialLoader(false)
    })()
  }, [])

  const getHistoryData = async () => {
    try {
      setLoading(true)
      const json = JSON.stringify({
        page: pageSetting.page,
        take: pageSetting.take,
        partnerId: agent,
        gameTypeId: gameType,
      })
      const res: AxiosResponse = await axios.post(
        API_ENDPOINT.GET_LOG_MARKET_SETTINGs,
        json
      )
      const dataLength = res?.data?.length
      if (dataLength) {
        // debugger
        setHistoryData([...historyData, ...(res?.data as [])])
        setPageSetting({
          ...pageSetting,
          page: pageSetting.page + 1,
          isFinished: dataLength < pageSetting.take,
        })
      } else if (res?.data?.status === 200) {
        // debugger/
        setPageSetting({ ...pageSetting, isFinished: true })
      }

      return res
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      id='betStatusHistoryModal'
      className={styles.betStatusHistoryModal}
      handleClose={onModalClose}
      open
      style={{
        width: 800,
      }}
    >
      <div>
        <p className={styles.title}>History of message</p>
        <div
          id='scrollableDiv'
          className={styles.contentDiv}
        >
          {initialLoader && <CircularProgress />}
          {!initialLoader && historyData?.length > 0 && (
            <InfiniteScroll
              dataLength={historyData.length}
              next={getHistoryData}
              hasMore={!pageSetting.isFinished}
              loader={isLoading && <h4>Loading...</h4>}
              scrollableTarget='scrollableDiv'
            >
              {historyData?.map(
                (
                  { englishContent, koreanContent, createDate, email },
                  index
                ) => (
                  <div
                    className={styles.itemDiv}
                    key={index}
                  >
                    <p className={styles.date}>{createDate}</p>
                    <p className={styles.email}>{email}</p>
                    <div className={styles.messageDiv}>
                      <p className={styles.message}>{englishContent}</p>
                      <p className={styles.message}>{koreanContent}</p>
                    </div>
                  </div>
                )
              )}
            </InfiniteScroll>
          )}
          {!initialLoader && !historyData?.length && <EmptyData />}
        </div>
      </div>
    </Modal>
  )
}

export default BetStatusHistoryModal
