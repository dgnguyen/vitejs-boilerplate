import { LoginContextProvider } from "context/LoginContext"

const Contexts = (props: any) => {
  const {
    children,
  } = props


  return (
    <LoginContextProvider>
      {children}
    </LoginContextProvider>
  )
}

export default Contexts
