import React from 'react'

import Logo from 'assets/images/logo.png'

import ForgotPwdForm from './ForgotPwdForm'
import LoginForm from './LoginForm'

import styles from './styles.module.scss'

type WithHOCProps = {
  isForgotPwdPage: boolean
}

function withHOC<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithHOCProps> {
  const WithHOC: React.FC<P & WithHOCProps> = ({
    ...props
  }: WithHOCProps & P) => (
    <div className={styles.login_page_right}>
      <div className={styles.logosDiv}>
        <div className={styles.logo}>
          <div className={styles.powered}>Powered by</div>
          <img
            src={Logo}
            alt='logo'
          />
        </div>
        <h1 className={styles.title}>Welcome to Powerball Global CMS</h1>
        <div className={styles.logoClient}></div>
      </div>
      <div className={styles.form_wrapper}>
        <WrappedComponent {...(props as P)} />
      </div>
    </div>
  )

  return WithHOC
}

const RightSide: React.FC<WithHOCProps> = ({
  isForgotPwdPage,
}: WithHOCProps) => {
  if (isForgotPwdPage) {
    return <ForgotPwdForm />
  }
  return <LoginForm />
}

const RightSideWithHOC = withHOC(RightSide)

export default RightSideWithHOC
