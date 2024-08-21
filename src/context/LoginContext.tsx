import React, { useContext, useEffect, useState } from 'react'



export const LoginContext = React.createContext<{
  isLogin: boolean,
  setLogout: () => void
}>(
  {
    isLogin: true,
    setLogout: () => { }
  }
)

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const setLogout = () => {
    setIsLogin(false)
  }


  return (
    <LoginContext.Provider value={{ isLogin, setLogout }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => {
  const login = useContext(LoginContext)
  return login
}
