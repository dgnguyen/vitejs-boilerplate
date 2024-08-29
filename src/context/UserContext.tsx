import React, { useContext, useEffect, useState } from 'react'


export const UserContext = React.createContext({
  currentUser: null,
  login: (user: any) => { },
})

const getInitialState = () => {
  const currentUser = localStorage.getItem("user")
  return currentUser ? JSON.parse(currentUser) : null
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(getInitialState)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  const login = (user: any) => {
    setCurrentUser(user)
  }


  return (
    <UserContext.Provider value={{ currentUser, login }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const login = useContext(UserContext)
  return login
}
