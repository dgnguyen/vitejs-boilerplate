import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { FormikProps } from 'formik'
import { getUser } from 'helpers/auth'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { IAgentData } from 'types/agent'

import { ValuesForm } from './FormSettings'

type Props = {
  props: FormikProps<ValuesForm>
}

const SelectAgentForAccount = ({ props }: Props) => {
  const { agents } = useFetchAgents()
  // prevent creating user with higher role than parent user
  const agentsModified = agents.filter((item) => item.id > getUser().role)

  return (
    <FormControl fullWidth>
      <InputLabel id='select-agent-account-select-label'>
        Select agent
      </InputLabel>
      <Select
        labelId='select-agent-account-select-label'
        id='select-agent'
        label='Select agent'
        name='partnerId'
        value={props.values.partnerId?.toString() || ''}
        onChange={props.handleChange}
      >
        {agentsModified.map((agent: IAgentData) => (
          <MenuItem
            key={agent.id}
            value={agent.id}
            disabled={agent.isBlock}
          >
            {agent.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectAgentForAccount
