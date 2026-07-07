import { Tab, Tabs } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import './AccountLayout.scss'
import { ACCOUNT_TABS } from './constants'

const AccountLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const activeIndex: number = ACCOUNT_TABS.findIndex(({ path }) =>
    location.pathname.startsWith(path),
  )

  return (
    <div className="account-layout">
      <Tabs
        value={activeIndex === -1 ? 0 : activeIndex}
        onChange={(_, index: number) => navigate(ACCOUNT_TABS[index].path)}
      >
        {ACCOUNT_TABS.map(({ path, label }) => (
          <Tab key={path} label={label} />
        ))}
      </Tabs>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default AccountLayout
