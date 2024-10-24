import { useEffect, useState } from 'react'

import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material'

import { USER_ROLE } from 'constants/auth'
import { FormikProps } from 'formik'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { IAgentData } from 'types/agent'

import { ValuesForm } from './FormSettings'

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  }
}


type Props = {
  props: FormikProps<ValuesForm>
}

const SelectAgentForAccount = ({ props }: Props) => {
  const theme = useTheme()
  const { agents } = useFetchAgents()
  const isSelectMultiple = props.values.permissionLevel === USER_ROLE.OPERATOR
  const { setFieldValue } = props
  const [personName, setPersonName] = useState<string[] | number[]>([])
  useEffect(() => {
    if (isSelectMultiple && props.values.agentList) setPersonName(props.values.agentList)
  }, [])


  const handleChangeMultiple = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event

    setPersonName(
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
        Select agent
      </InputLabel>
      {isSelectMultiple ?
        <Select
          multiple
          labelId='select-agent-account-select-label'
          id='select-agent-multiple'
          label='Select agent'
          name='agentList'
          value={personName}
          onChange={handleChangeMultiple}
          required
          input={<OutlinedInput label="Select agent" />}
          MenuProps={MenuProps}
          onClose={
            () => setFieldValue("agentList", personName)
          }
          disabled={!props.values.permissionLevel}

        >
          {agents.map((agent) => (
            <MenuItem
              key={agent.id}
              value={agent.id}
              disabled={agent.isBlock}
            // style={getStyles(agent.name, personName, theme)}
            >
              {agent.name}
            </MenuItem>
          ))}

        </Select>
        :
        <Select
          labelId='select-agent-account-select-label'
          id='select-agent-single'
          label='Select agent'
          name='agentList'
          value={props.values.agentList?.[0]}
          onChange={props.handleChange}
          required
          disabled={!props.values.permissionLevel}
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
