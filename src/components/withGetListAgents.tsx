import React, { useEffect } from 'react'

import { getListAgents, resetListAgents } from 'redux/reducers/listAgents'
import { useAppDispatch } from 'redux/store'

const withGetListAgent = <P extends {}>(Wrapped: React.ComponentType<P>) => {
  const Hoc = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getListAgents())
      return () => {
        dispatch(resetListAgents())
      }
    }, [])

    return <Hoc />
  }
  return (props: any) => (
    <Wrapped {...props as P} />
  )
}

export default withGetListAgent
