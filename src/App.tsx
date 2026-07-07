import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { NotificationProvider } from './context/NotificationContext'
import { ThemeModeProvider } from './context/ThemeModeContext'
import AppRoutes from './routes/AppRoutes'
import { store } from './store'

const App = () => (
  <Provider store={store}>
    <ThemeModeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </NotificationProvider>
    </ThemeModeProvider>
  </Provider>
)

export default App
