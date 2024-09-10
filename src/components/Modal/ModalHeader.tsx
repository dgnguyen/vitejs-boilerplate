import React from 'react'

import CloseIcon from 'assets/images/Close.svg'

import styles from './ModalHeader.module.scss'

type ModalHeaderProps = {
  hasCloseButton?: boolean
  closeModal: () => void
  children?: React.ReactNode
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  hasCloseButton,
  closeModal,
  children
}) => {
  return (
    <div className={styles.modalHeader}>
      <span className={styles.modalTitle} id="modalTitle">
        {children}
      </span>
      {hasCloseButton && (
        <button
          type="button"
          aria-label="Close Modal"
          aria-labelledby="close-modal"
          className={styles.modalClose}
          onClick={closeModal}
          id="closeModalId"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

export default ModalHeader
