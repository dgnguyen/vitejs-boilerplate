import { Box, Button, Divider } from '@mui/material'
import AgentTab from '../AgentTab'
import DateBlock from 'components/DateBlock'
import ExportExcel from 'components/ExportExcel'
import { Refresh } from '@mui/icons-material'
import FormBetLimit from './FormBetLimit'

const AgentBetLimit = () => {
  return (
    <Box>
      <AgentTab />
      <Box display="flex" alignItems="center" marginY={2}>
        <DateBlock />
        <Box
          marginLeft='auto'
          display='flex'
          gap={2}
        >
          <Button
            variant='contained'
            data-testid='refreshAgent'
            onClick={() => window.location.reload()}
          >
            <Refresh />
          </Button>
          {/* <ExportExcel
            id='export-excel-agent'
            disableSearch={isExporting}
          /> */}
        </Box>
      </Box>
      <Divider sx={{ borderColor: "white", borderWidth: 1 }} />
      <FormBetLimit />
      <Divider sx={{ borderColor: "white", borderWidth: 1 }} />
    </Box>
  )
}

export default AgentBetLimit
