import { Typography } from '@mui/material'

import './Preferences.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const Preferences = () => {
  useDocumentTitle('Preferences')

  return (
    <div className="preferences">
      <Typography variant="h4" component="h1">
        Preferences
      </Typography>
    </div>
  )
}

export default Preferences
