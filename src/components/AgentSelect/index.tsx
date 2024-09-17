import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { useFetchAgents } from 'hooks/useFetchAgents'
import { IAgentData } from 'types/agent'

type SelectProps = {
  label: string
  value: any
  disabled: boolean
}[]

const AgentSelect = ({
  handleChange,
  agentSelected,
  disableSelectAll,
}: {
  agentSelected?: string | number | null
  disableSelectAll?: boolean
  handleChange: (event: SelectChangeEvent) => void
}) => {
  const { agents, loadingAgents } = useFetchAgents()
  const agentsOptions = (agents || []).reduce(
    (acc: SelectProps, curr: IAgentData) => [
      ...acc,
      {
        label: curr.name,
        value: curr.id,
        disabled: curr.isBlock,
      },
    ],
    []
  )

  return (
    <Box className='select-wrapper'>
      <FormControl
        sx={{ m: 1, minWidth: 150 }}
        size='small'
      >
        <InputLabel id='select-agents-select-label'>Select agent</InputLabel>
        <Select
          labelId='select-agents-select-label'
          id='select-agents-select'
          value={agentSelected?.toString()}
          {...(!disableSelectAll ? { defaultValue: 'all' } : {})}
          label='Select Agent'
          onChange={handleChange}
          disabled={loadingAgents}
        >
          {!disableSelectAll && (
            <MenuItem
              defaultChecked
              value="all"
            >
              All
            </MenuItem>
          )}
          {agentsOptions.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default AgentSelect
