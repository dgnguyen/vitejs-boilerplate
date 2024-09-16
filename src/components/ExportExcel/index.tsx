import React from 'react'

import {
  CircularProgress,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import ExcelIcon from 'assets/images/icons/excel.svg'
import ExportIcon from 'assets/images/icons/export-icon-white.svg'
import { useSelector } from 'react-redux'
import {
  exportAgentsAction,
  exportAgentsBetLimitAction,
} from 'redux/reducers/agent'
import { exportDashboardDataAction } from 'redux/reducers/dashboard'
import { exportPlayers, getLoadingExportSelector } from 'redux/reducers/player'
import {
  exportSpecificPlayersTransactions,
  exportTransactions,
  getLoadingExportTransactionSelector,
} from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'

import { setupDownload } from './helpers'

import './index.scss'

export type OptionalData = {
  transactionId?: string
  startDate?: Date
  endDate?: Date
}

type Props = {
  id:
    | 'export-excel-transactions'
    | 'export-excel-players'
    | 'export-excel-specific-player-transactions'
    | 'export-excel-dashboard'
    | 'export-excel-agent'
    | 'export-excel-agent-bet-limit'
  disableSearch?: boolean
  optionalData?: OptionalData
}

const ExportExcel = (props: Props) => {
  const { disableSearch, id, optionalData } = props
  const dispatch = useAppDispatch()
  const isExportingPlayer = useSelector(getLoadingExportSelector)
  const isExportingTransaction = useSelector(
    getLoadingExportTransactionSelector
  )

  const isExporting = isExportingPlayer || isExportingTransaction

  const handleExport = () => {
    switch (id) {
      case 'export-excel-transactions':
        dispatch(exportTransactions(setupDownload))
        break
      case 'export-excel-players':
        dispatch(exportPlayers(setupDownload))
        break
      case 'export-excel-specific-player-transactions':
        dispatch(exportSpecificPlayersTransactions(setupDownload))
        break
      case 'export-excel-agent':
        dispatch(exportAgentsAction(setupDownload))
        break
      case 'export-excel-agent-bet-limit':
        dispatch(exportAgentsBetLimitAction(setupDownload))
        break
      case 'export-excel-dashboard':
        if (optionalData?.startDate && optionalData?.endDate)
          dispatch(
            exportDashboardDataAction(
              optionalData.startDate,
              optionalData.endDate
            )
          )
        break
      default:
        break
    }
  }

  const menuProps = {
    PaperProps: {
      sx: {
        marginTop: '5px',
        width: '110px',
        border: 'none',
        borderRadius: '10px',
        '& .MuiListItemIcon-root': {
          minWidth: '20px !important',
        },
        '& .MuiButtonBase-root:nth-child(1)': {
          display: 'none',
        },
      },
    },
  }

  return (
    <FormControl
      className='exportWrapper'
      size='small'
    >
      <Select
        className='export-excel'
        id='runningGame-select'
        value=''
        onChange={handleExport}
        displayEmpty
        MenuProps={menuProps}
        disabled={disableSearch}
      >
        <MenuItem value=''>
          <ListItemIcon>
            {isExporting ? (
              <CircularProgress
                size={14}
                sx={{ color: 'white' }}
              />
            ) : (
              <ExportIcon />
            )}
          </ListItemIcon>
          <ListItemText>
            <Typography
              color='white'
              fontSize={12}
            >
              Export
            </Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem value='excel'>
          <ListItemIcon>
            <ExcelIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography fontSize={12}>Export excel</Typography>
          </ListItemText>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ExportExcel
