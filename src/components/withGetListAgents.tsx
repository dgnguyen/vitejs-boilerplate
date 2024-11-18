import React, { useEffect } from 'react'

import { getListAgents, resetListAgents } from 'redux/reducers/listAgents'
import { useAppDispatch } from 'redux/store'

const withGetListAgent = <P extends {}>(Wrapped: React.ComponentType<P>) => {
  const Hoc = (props: P) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getListAgents())
      return () => {
        dispatch(resetListAgents())
      }
    }, [])

    return <Wrapped {...props as P} />
  }
  return (props: P) => (
    <Hoc {...props as P} />
  )
}

export default withGetListAgent
