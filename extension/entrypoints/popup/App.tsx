import { useEffect, useState } from 'react'
import { AuthService } from '../../services/auth'
import {
  getApiUrl,
  DEFAULT_SETTINGS,
  SETTINGS_CONSTRAINTS,
} from '../../utils/config'
import browser from 'webextension-polyfill'

interface Assistant {
  id: string
  name: string
  description: string
  settings: {
    dailyLimit: {
      min: number
      max: number
    }
  }
}

interface TaskStatus {
  assistantId: string
  isRunning: boolean
  repliesCount: number
  customLimit: number
  lastReplyTime?: string
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 助手相关状态
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [taskStatuses, setTaskStatuses] = useState<{
    [key: string]: TaskStatus
  }>({})

  // 检查登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const session = await AuthService.checkWebsiteAuthStatus()
        if (session) {
          setIsLoggedIn(true)
          setUser(session.user)
          // 获取助手列表
          fetchAssistants()
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

  // 获取助手列表
  const fetchAssistants = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/assistants/x`)
      const data = await response.json()
      setAssistants(data)

      // 初始化任务状态
      const initialStatuses: { [key: string]: TaskStatus } = {}
      data.forEach((assistant: Assistant) => {
        initialStatuses[assistant.id] = {
          assistantId: assistant.id,
          isRunning: false,
          repliesCount: 0,
          customLimit: assistant.settings.dailyLimit.max,
        }
      })
      setTaskStatuses(initialStatuses)
    } catch (error) {
      console.error('Failed to fetch assistants:', error)
      setError('Failed to load assistants')
    }
  }

  // 切换任务状态
  const toggleTask = (assistantId: string) => {
    const status = taskStatuses[assistantId]
    const assistant = assistants.find(a => a.id === assistantId)
    if (!assistant) return

    const newStatus = !status.isRunning
    setTaskStatuses(prev => ({
      ...prev,
      [assistantId]: {
        ...prev[assistantId],
        isRunning: newStatus,
      },
    }))

    // 发送消息给 background script
    browser.runtime.sendMessage({
      type: newStatus ? 'START_TASK' : 'STOP_TASK',
      assistant,
      settings: {
        dailyLimit: status.customLimit,
      },
    })
  }

  const handleLogin = () => {
    browser.tabs.create({
      url: `${getApiUrl()}/signin`,
    })
  }

  const handleLogout = () => {
    browser.tabs.create({
      url: `${getApiUrl()}/signout`,
    })
  }

  const openDashboard = () => {
    browser.tabs.create({
      url: `${getApiUrl()}/dashboard`,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>
  }

  if (!isLoggedIn) {
    return (
      <div className="w-[320px] flex flex-col">
        <div className="flex-1 p-4">{/* 这里可以放其他内容 */}</div>
        <div className="flex items-center justify-between border-t px-4 py-2 bg-gray-50">
          <button
            className="text-blue-500 hover:text-blue-600 text-sm"
            onClick={handleLogin}
          >
            登录
          </button>
          <button
            className="text-gray-500 hover:text-gray-600"
            onClick={openDashboard}
          >
            <SettingsIcon />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[320px] flex flex-col min-h-[400px]">
      {/* 助手列表 */}
      <div className="flex-1 p-3 space-y-3">
        {assistants.map(assistant => {
          const status = taskStatuses[assistant.id]
          if (!status) return null

          return (
            <div key={assistant.id} className="space-y-1">
              <div>
                <h3 className="text-base font-normal">{assistant.name}</h3>
                <p className="text-sm text-gray-600">
                  今日已回复: {status.repliesCount}/{status.customLimit}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={200}
                  className="w-16 p-1 text-sm border rounded"
                  value={status.customLimit}
                  onChange={e => {
                    const value = parseInt(e.target.value)
                    if (value >= 1 && value <= 200) {
                      setTaskStatuses(prev => ({
                        ...prev,
                        [assistant.id]: {
                          ...prev[assistant.id],
                          customLimit: value,
                        },
                      }))
                    }
                  }}
                />
                <button
                  className={`px-4 py-1 text-sm rounded ${
                    status.isRunning
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  onClick={() => toggleTask(assistant.id)}
                >
                  {status.isRunning ? '停止' : '开始'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 底部导航栏 */}
      <div className="border-t">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                className="w-3.5 h-3.5 rounded-full"
              />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-[8px] text-gray-500">
                  {user?.email?.[0] || '?'}
                </span>
              </div>
            )}
            <span className="ml-2 text-[13px] text-gray-700">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center">
            <button
              className="p-2 text-gray-500 hover:text-gray-700"
              onClick={openDashboard}
            >
              <SettingsIcon />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
