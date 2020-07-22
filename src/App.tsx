import React, { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { ConfirmProvider } from 'material-ui-confirm'
import { useMediaQuery } from '@material-ui/core'
import GlobalStyle from './styles/global'

import AppProvider from './hooks'

import Routes from './routes'

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <BrowserRouter>
          <AppProvider>
            <Routes />
          </AppProvider>

          <GlobalStyle />
        </BrowserRouter>
      </ConfirmProvider>
    </ThemeProvider>
  )
}

export default App
