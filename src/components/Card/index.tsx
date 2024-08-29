import React, { ReactNode } from 'react'

import cx from 'classnames'
import DollarSvgGreen from 'assets/images/dollar_green.svg'
import DollarSvgRed from 'assets/images/dollar_red.svg'
import DownArrowSvg from 'assets/images/down_arrow_red.svg'
import UpArrowSvg from 'assets/images/up_arrow_green.svg'

import './styles.scss'
import { Box } from '@mui/material'

type TProps = {
  title?: string
  price?: string | number
  currency?: string
  date?: string
  children?: React.ReactNode
  className?: string
  icon?: string
}

const Card: React.FC<TProps> = ({
  title,
  price,
  currency,
  date,
  children,
  className,
  icon,
}) => {
  if (children) {
    return <div className={cx("card", className)}>{children}</div>
  }

  const arrayIcon: {
    [key: string]: ReactNode
  } = {
    'dollarSvgGreen': <DollarSvgGreen />,
    'dollarSvgRed': <DollarSvgRed />,
    'downArrowSvg': <DownArrowSvg />,
    'upArrowSvg': <UpArrowSvg />
  }

  return (
    <Box className={cx("card", className)}>
      <Box sx={{ display: "flex" }}>
        {icon && arrayIcon[icon]}
        <Box className="title">
          {title}
        </Box>
      </Box>
      <Box sx={{ minHeight: '25px' }}>
        <Box className={"price"}>{price || 0}</Box>
        <Box className="currency">{currency}</Box>
      </Box>
      <Box className="date">{date}</Box>
    </Box>
  )
}

export default Card
