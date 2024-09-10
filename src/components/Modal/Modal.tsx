import React, { useCallback, useEffect, useRef, useState } from 'react'

import cx from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'

import Portal from '../Portal'

import ModalHeader from './ModalHeader'
import { hideModal } from './utils'

import styles from './Modal.module.scss'

type ModalProps = {
  id: string
  children: any
  shouldCloseOnOverlayClick?: boolean
  shouldCloseOnEsc?: boolean
  className?: string
  hasCloseButton?: boolean
  onClose?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  id,
  children,
  shouldCloseOnOverlayClick,
  shouldCloseOnEsc,
  className,
  hasCloseButton,
  onClose
}) => {
  const [modalData, setModalData] = useState<{ type?: string } | null>(null)
  const modal = useRef<HTMLDivElement>(null)
  const modalCover = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleShow(e: any) {
      const { id: dispatchedId, data } = e.detail
      if (id === dispatchedId) {
        setModalData(data || {})
      }
    }

    function handleHide(e: any) {
      const { id: dispatchedId } = e.detail
      if (id === dispatchedId) {
        setModalData(null)
        onClose && onClose()
      }
    }

    document.addEventListener('showModal', handleShow)

    document.addEventListener('hideModal', handleHide)

    return () => {
      document.removeEventListener('showModal', handleShow)

      document.removeEventListener('hideModal', handleHide)
    }
  }, [id, onClose])

  useEffect(() => {
    if (modalCover.current) {
      modalCover.current.focus()
    }
  }, [modalCover])

  const closeModal = useCallback(() => {
    hideModal(id)
    onClose && onClose()
  }, [id, onClose])

  const handleKeyDown = useCallback(
    (event: { keyCode: number }) => {
      if (!shouldCloseOnEsc) {
        return
      }
      if (event.keyCode === 27) {
        closeModal()
      }
    },
    [shouldCloseOnEsc, closeModal]
  )

  if (!modalData) return null
  return (
    <Portal>
      {modalData && (
        <div
          role="dialog"
          onKeyDown={handleKeyDown}
          ref={modalCover}
          aria-modal="true"
          className={cx(styles.modalCover)}
        >
          <OutsideClickHandler
            onOutsideClick={() => {
              shouldCloseOnOverlayClick && closeModal()
            }}
          >
            <div className={cx(styles.modalArea, className)} ref={modal}>
              {hasCloseButton && (
                <ModalHeader
                  hasCloseButton={hasCloseButton}
                  closeModal={closeModal}
                />
              )}

              {typeof children === 'function' ? children(modalData) : children}
            </div>
          </OutsideClickHandler>
        </div>
      )}
    </Portal>
  )
}

export default Modal
