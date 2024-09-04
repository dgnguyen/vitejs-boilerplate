import React from 'react'

import styles from './styles.module.scss'

const Loader = ({ isOutSideOfRelativeContainer = false }) => {
  return (
    <div
      className={styles.spinner}
      style={isOutSideOfRelativeContainer ? { left: 236 } : {}}
    ></div>
  )
}

export default Loader
