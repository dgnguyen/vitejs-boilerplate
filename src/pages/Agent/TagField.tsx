import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { IAgentData } from 'types/agent'

type Props = {
  row: IAgentData
  cancelEdit: boolean
  loading: boolean
  onChange: (row: IAgentData, value: string) => void
}
const TagField = ({ row, cancelEdit, loading, onChange }: Props) => {
  const [state, setState] = useState('')
  useEffect(() => {
    setState(row.tag)
  }, [row.tag, cancelEdit])

  return (
    <TextField
      value={state}
      onChange={(e) => setState(e.target.value)}
      onKeyDown={(e: any) => {
        if (e.key === 'Enter' && !loading) {
          onChange(row, e.target.value)
        }
      }}
      fullWidth
    />
  )
}

export default TagField
