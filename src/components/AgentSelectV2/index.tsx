import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { IAgent } from 'types/listAgents'

type SelectProps = {
  label: string
  value: any
  disabled: boolean
}[]

const AgentSelect = ({
  agents,
  loading,
  error,
  handleChange,
  agentSelected: initialAgentSelected,
  disableSelectAll,
  cb,
}: {
  agents: IAgent[],
  loading: boolean,
  error: boolean
  agentSelected: string | number
  disableSelectAll?: boolean
  handleChange: (event: SelectChangeEvent) => void
  cb?: (e?: string) => void
}) => {
  const agentSelected = initialAgentSelected || "all"
  const agentsOptions = (agents || []).reduce(
    (acc: SelectProps, curr: IAgent) => [
      ...acc,
      {
        label: curr.name,
        value: curr.id,
        disabled: curr.isBlock,
      },
    ],
    []
  )

  function handleSelectChange(e: SelectChangeEvent) {
    handleChange(e)
    cb?.(agentsOptions.find((item) => item.value === e.target.value)?.label)
  }

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
          onChange={handleSelectChange}
          disabled={loading || error}
        >
          {!disableSelectAll && (
            <MenuItem
              defaultChecked
              value='all'
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
