import * as React from 'react'

interface IAuthContext {
  login: () => void
  logout: () => void
  authenticated: boolean
}

const AuthContext = React.createContext<IAuthContext>({
  login: () => null,
  logout: () => null,
  authenticated: false,
})

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = React.useState<boolean>(() =>
    window.localStorage.getItem('auth') ? true : false,
  )

  const login = () => {
    window.localStorage.setItem('auth', 'authenticated')
    setAuth(true)
  }

  const logout = () => {
    setAuth(false)
    window.localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ login, logout, authenticated: auth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
