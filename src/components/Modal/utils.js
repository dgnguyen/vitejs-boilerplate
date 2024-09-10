const showModal = (id, data) => {
  document.dispatchEvent(
    new CustomEvent('showModal', {
      detail: { id, data }
    })
  )
}

const hideModal = id => {
  document.dispatchEvent(
    new CustomEvent('hideModal', {
      detail: { id }
    })
  )
}

export { hideModal, showModal }
