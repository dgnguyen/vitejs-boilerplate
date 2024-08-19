import React from 'react'

import Laptop from 'assets/images/Laptop-min.png'

import styles from './styles.module.scss'

const LeftSide = () => {
  return (
    <div className={styles.login_page_left}>
      <div className={styles.img_wrap}>
        <img
          src={Laptop}
          alt=''
        />
      </div>
    </div>
  )
}

export default LeftSide
