import React, { useContext, useEffect, useState } from 'react'

export type IUser = {
  firstName: string
  lastName: string
  token: string
  role: number
  partnerId: number
}

export const UserContext = React.createContext({
  currentUser: null,
  handleLogin: (user: IUser) => {},
})

const getInitialState = () => {
  const currentUser = localStorage.getItem('user')
  return currentUser ? JSON.parse(currentUser) : null
}

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentUser, setCurrentUser] = useState(getInitialState)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  const handleLogin = (user: IUser) => {
    setCurrentUser(user)
  }

  return (
    <UserContext.Provider value={{ currentUser, handleLogin }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const login = useContext(UserContext)
  return login
}
