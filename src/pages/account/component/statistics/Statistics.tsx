import { Typography } from '@mui/material'

import './Statistics.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const Statistics = () => {
  useDocumentTitle('Statistics')

  return (
    <div className="statistics">
      <Typography variant="h4">Statistics</Typography>
    </div>
  )
}

export default Statistics
