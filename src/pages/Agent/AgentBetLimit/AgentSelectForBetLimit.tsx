import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { FormikProps } from 'formik'
import { IAgentData } from 'types/agent'

import { AgentBetLimitValuesProps } from './FormBetLimit'

type Props = {
  props: FormikProps<AgentBetLimitValuesProps>
  agents: any[]
  loadingAgents: boolean
  error: boolean
}
const AgentSelectForBetLimit = ({ props, agents, loadingAgents, error }: Props) => {
  return (
    <FormControl sx={{ width: 150 }}>
      <InputLabel id='select-agent-label'>Select Agent</InputLabel>
      <Select
        id='select-agent'
        label='Select agent'
        labelId='select-agent-label'
        name='agentSelect'
        value={props.values.agentSelect || 'all'}
        onBlur={props.handleBlur}
        disabled={loadingAgents || error}
        onChange={(e) =>
          props.setFieldValue('agentSelect', e.target.value as string)
        }
      // error={formik.touched.userType && Boolean(formik.errors.userType)}
      >
        <MenuItem value='all'>All</MenuItem>
        {agents.map((agent: IAgentData) => (
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

export default AgentSelectForBetLimit
