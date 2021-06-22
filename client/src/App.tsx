import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Switch } from 'react-router'
import { useAuth } from './context/authContext'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import NonRespondentsPage from './views/NonRespondentsPage'
import RespondentsPage from './views/RespondentsPage'
import ResultPage from './views/ResultsPage'
import SchoolsPage from './views/SchoolsPage'

const queryClient = new QueryClient()
const App = () => {
  const { authenticated } = useAuth()
  if (!authenticated) {
    return <LoginPage />
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/schools/:questId">
          <SchoolsPage />
        </Route>
        <Route path="/result/:questId/:schoolId">
          <ResultPage />
        </Route>
        <Route path="/respondents/:questId/:schoolId">
          <RespondentsPage />
        </Route>
        <Route path="/non-respondents/:questId/:schoolId">
          <NonRespondentsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </QueryClientProvider>
  )
}

export default App
