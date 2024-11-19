import { useEffect, useState } from 'react'

import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, } from '@mui/material'

import { USER_ROLE } from 'constants/auth'
import { ROUTES } from 'constants/endpoint'
import { FormikProps } from 'formik'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { useLocation } from 'react-router-dom'
import { ValuesForm } from 'types/account'
import { IAgentData } from 'types/agent'


const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}


type Props = {
  props: FormikProps<ValuesForm>,
  disabled: boolean,
}

const SelectAgentForAccount = ({ props, disabled }: Props) => {
  const location = useLocation()
  const isAccountSettingsPage = ROUTES.ACCOUNT_SETTINGS === location.pathname

  const { agents } = useFetchAgents()
  const { values: {
    permissionLevel,
    agentList,
  },
    setFieldValue,
    handleChange } = props
  const isSelectMultiple = [USER_ROLE.OPERATOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN].includes(permissionLevel || 0)
  const [agentName, setAgentName] = useState<string[] | number[]>([])
  useEffect(() => {
    if (isSelectMultiple && agentList) setAgentName(agentList)
  }, [])


  const handleChangeMultiple = (event: SelectChangeEvent<typeof agentName>) => {
    const {
      target: { value },
    } = event

    setAgentName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <FormControl
      fullWidth
      required
    >
      <InputLabel id='select-agent-account-select-label'>
        Select Agent
      </InputLabel>
      {isSelectMultiple ?
        <Select
          multiple
          labelId='select-agent-account-select-label'
          id='select-agent-multiple'
          label='Select Agent'
          name='agentList'
          value={agentName}
          onChange={handleChangeMultiple}
          required
          input={<OutlinedInput label="Select Agent" />}
          MenuProps={MenuProps}
          onClose={
            () => setFieldValue("agentList", agentName)
          }
          disabled={!permissionLevel || isAccountSettingsPage}

        >
          {agents.map((agent) => (
            <MenuItem
              key={agent.id}
              value={agent.id}
              disabled={agent.isBlock}

            >
              {agent.name}
            </MenuItem>
          ))}

        </Select>
        :
        <Select
          labelId='select-agent-account-select-label'
          id='select-agent-single'
          label='Select Agent'
          name='agentList'
          value={agentList?.[0]}
          onChange={handleChange}
          required
          disabled={!permissionLevel || isAccountSettingsPage}
        >
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
      }
      <FormHelperText sx={{
        margin: 0
      }}>Please select permission level in order to select agent</FormHelperText>
    </FormControl>
  )
}

export default SelectAgentForAccount
