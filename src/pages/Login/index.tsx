
import { ROUTES } from 'constants/endpoint'

import LeftSide from './LeftSide'
import RightSide from './RightSide'

import './index.scss'

const Login = () => {
  const isForgotPwdPage = window.location.pathname === ROUTES.FORGOT_PASSWORD
  return (
    <div className="container_fluid">
      <div className="login-wrapper">
        <LeftSide />
        <RightSide isForgotPwdPage={isForgotPwdPage} />
      </div>
    </div>
  )
}

export default Login
