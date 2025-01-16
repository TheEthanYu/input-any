import { useEffect, useState } from 'react'
import { AuthService } from '../../services/auth'
import browser from 'webextension-polyfill'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const session = await AuthService.checkWebsiteAuthStatus()
        if (session) {
          setIsLoggedIn(true)
          setUser(session.user)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setError('Failed to check auth status')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = () => {
    browser.runtime.sendMessage({ type: 'LOGIN' })
  }

  const handleLogout = async () => {
    console.log('Logout button clicked')
    await AuthService.clearAuth()
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="popup p-4 min-w-[300px] min-h-[200px] flex flex-col items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : !isLoggedIn ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          登录
        </button>
      ) : (
        <div className="text-center space-y-4">
          {user?.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="w-12 h-12 rounded-full mx-auto"
            />
          )}
          <p className="font-medium">
            {user?.user_metadata?.full_name || user?.email}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  )
}

export default App
