import { useEffect, useState } from 'react'

const initialState = {
  loadingPage: true,
  loading: false,
  error: false,
  message: '',
}

export function useSimpleForm() {
  const [formState, setFormState] = useState(initialState)

  useEffect(() => () => setFormState(initialState), [])

  const updateState = ({
    key,
    value,
  }: {
    key: string
    value: string | boolean
  }) =>
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  const setError = (value: boolean) => updateState({ key: 'error', value })

  const setLoading = (value: boolean) => updateState({ key: 'loading', value })

  const setLoadingPage = (value: boolean) =>
    updateState({ key: 'loadingPage', value })

  const setMessage = (value: string) => updateState({ key: 'message', value })

  return {
    ...formState,
    setError,
    setLoading,
    setLoadingPage,
    setMessage,
  }
}
