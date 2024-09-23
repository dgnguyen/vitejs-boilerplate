import { UserContextProvider } from 'context/UserContext'

import { GamesContextProvider } from './GamesContext'

const Contexts = (props: any) => {
  const { children } = props

  return (
    <GamesContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </GamesContextProvider>
  )
}

export default Contexts
