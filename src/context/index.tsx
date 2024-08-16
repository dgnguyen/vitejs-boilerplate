import React from 'react'

type ContextsProps = any

const Contexts: ContextsProps = props => {
  const { children } = props
  return (
    <div>
      {children}
    </div>
  )
}

export default Contexts
