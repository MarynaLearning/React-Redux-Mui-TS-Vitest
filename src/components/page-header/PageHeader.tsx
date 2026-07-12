import { Typography } from '@mui/material'

import './PageHeader.scss'
import type { IPageHeaderProps } from './types'

const PageHeader = ({ title, leftSlot, rightSlot }: IPageHeaderProps) => (
  <div className="page-header">
    <div className="left">{leftSlot}</div>
    <Typography variant="h4" className="title">
      {title}
    </Typography>
    <div className="right">{rightSlot}</div>
  </div>
)

export default PageHeader
