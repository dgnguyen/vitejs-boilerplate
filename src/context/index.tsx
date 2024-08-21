import { UserContextProvider } from "context/UserContext"

const Contexts = (props: any) => {
  const {
    children,
  } = props


  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}

export default Contexts
