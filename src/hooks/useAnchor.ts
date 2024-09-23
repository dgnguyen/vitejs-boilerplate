import * as React from 'react'

const useAnchor = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [optionalState, setOptionalState] = React.useState<any | null>(null)

  const handleOpen = (
    param?:
      | React.MouseEvent<HTMLElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | HTMLElement
  ) => {
    const newAnchor: HTMLElement =
      (param as React.MouseEvent<HTMLElement>)?.currentTarget ??
      (param as HTMLElement)
    setAnchorEl(newAnchor)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return { anchorEl, handleOpen, handleClose, optionalState, setOptionalState }
}

export default useAnchor
