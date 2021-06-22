import * as React from 'react'
import LoginLayout from '../components/LoginLayout'
import { useAuth } from '../context/authContext'

const LoginPage = () => {
  const [accessToken, setAccessToken] = React.useState<string>('')
  const [error, setError] = React.useState<boolean>(false)
  const { login } = useAuth()
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (accessToken === 'ph03n1xoc') {
      login()
    }
    setError(true)
  }
  return (
    <LoginLayout>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label
            htmlFor="accessToken"
            className="block text-left text-sm font-medium text-gray-600"
          >
            Access Token
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="text"
              id="accessToken"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="sup3rs3creT7oken"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>
          {error ? (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              Incorrect token.
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-3"
        >
          Access QRY
        </button>
      </form>
    </LoginLayout>
  )
}
export default LoginPage
