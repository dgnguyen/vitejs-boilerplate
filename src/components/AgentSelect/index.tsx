import { useFetchAgents } from 'hooks/useFetchAgents'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { IAgent } from 'types/dashboard'

type SelectProps = {
  label: string
  value: any
}[]

const AgentSelect = ({
  handleChange,
  disableSelectAll
}: {
  disableSelectAll?: boolean
  handleChange: (event: SelectChangeEvent) => void
}) => {
  const { agents } = useFetchAgents()
  const agentsOptions = agents.reduce(
    (acc: SelectProps, curr: IAgent) => [
      ...acc,
      {
        label: curr.name,
        value: curr.id,
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
          // value={agentSelected?.toString()}
          // defaultValue='all'
          {...(!disableSelectAll ? { defaultValue: 'all' } : {})}
          label='Select Agent'
          onChange={handleChange}
        >
          {!disableSelectAll &&
            <MenuItem
              defaultChecked
              value='all'
            >
              All
            </MenuItem>
          }
          {agentsOptions.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
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
