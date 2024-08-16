import Body from './Body'
import Menu from './Menu'
import { Wrapper } from './style'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Menu />
      <Body>{children}</Body>
    </Wrapper>
  )
}

export default AppLayout
