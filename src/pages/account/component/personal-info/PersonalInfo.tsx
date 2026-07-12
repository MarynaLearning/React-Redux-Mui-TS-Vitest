import { Typography } from '@mui/material'

import './PersonalInfo.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const PersonalInfo = () => {
  useDocumentTitle('Personal Info')

  return (
    <div className="personal-info">
      <Typography variant="h4" component="h1">
        Personal Info
      </Typography>
    </div>
  )
}

export default PersonalInfo
