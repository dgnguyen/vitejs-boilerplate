import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'

import { Check } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'

import { IAgentData } from 'types/agent'

type Props = {
  row: IAgentData
  cancelEdit: boolean
  loading: boolean
  onChange: (row: IAgentData, value: string) => void
}
const TagField = ({ row, cancelEdit, loading, onChange }: Props) => {
  const [state, setState] = useState('')

  const editedState = useRef(row?.tag)
  useEffect(() => {
    setState(row?.tag)
    editedState.current = row?.tag
  }, [row?.tag, cancelEdit])

  useEffect(() => {
    if (!cancelEdit) {
      editedState.current = row?.tag
    }
  }, [cancelEdit])

  return (
    <Box
      display='flex'
      gap={1}
    >
      <TextField
        value={state}
        onChange={(e) => setState(e.target.value)}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter' && !loading) {
            onChange(row, event.currentTarget.value)
            editedState.current = state
          }
        }}
        fullWidth
      />
      {
        <Button
          disabled={editedState.current === state}
          size='small'
          variant='contained'
          onClick={() => {
            onChange(row, state)
            editedState.current = state
          }}
        >
          <Check />
        </Button>
      }
    </Box>
  )
}

export default TagField
