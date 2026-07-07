/* eslint-disable react-refresh/only-export-components -- context, provider,
   and hook are colocated in one file by design; see PLAN.md §5 */
import { Alert, Snackbar } from '@mui/material'
import type { AlertColor } from '@mui/material'
import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface INotificationContextValue {
  notify: (message: string, severity?: AlertColor) => void
}

export const NotificationContext = createContext<
  INotificationContextValue | undefined
>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<AlertColor>('info')

  const notify = useCallback((msg: string, sev: AlertColor = 'info'): void => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }, [])

  const handleClose = (): void => setOpen(false)

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return ctx
}
