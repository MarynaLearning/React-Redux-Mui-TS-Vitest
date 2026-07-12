import type { ReactNode } from 'react'

export interface IPageHeaderProps {
  title: string
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}
