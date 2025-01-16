import { defineBackground } from 'wxt/sandbox'
import { storage } from 'wxt/storage'
import browser from 'webextension-polyfill'
import { AuthService } from '../services/auth'

const DEV_URL = 'http://127.0.0.1:3000'
const PROD_URL = 'https://你的生产域名'

const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL

interface Message {
  type: 'LOGIN' | 'AUTH_STATE_CHANGED'
  isLoggedIn?: boolean
}

export default defineBackground(() => {
  console.log('=== Background Script Initialized ===')
  console.log('Storage API available:', storage)

  browser.runtime.onMessage.addListener(
    (message: Message, sender, sendResponse) => {
      console.log('=== Message Received ===')
      console.log('Message:', message)
      if (message.type === 'LOGIN') {
        console.log('Handling login request')
        handleLogin()
      }
      return undefined
    }
  )

  async function handleLogin() {
    console.log('=== Starting Login Process ===')
    try {
      const authURL = `${BASE_URL}/signin?source=extension`
      console.log('Auth URL:', authURL)

      const loginTab = await browser.tabs.create({
        url: authURL,
        active: true,
      })
      console.log('Login tab created:', loginTab)

      const handleTabUpdate = async (tabId: number, changeInfo: any) => {
        console.log('=== Tab Update ===')
        console.log('Tab ID:', tabId)
        console.log('Change Info:', changeInfo)

        if (
          tabId === loginTab.id &&
          changeInfo.url?.includes('auth/callback')
        ) {
          console.log('=== Processing Callback ===')
          const url = new URL(changeInfo.url)
          const token = url.searchParams.get('token')
          const userStr = url.searchParams.get('user')
          console.log('Token present:', !!token)
          console.log('User string present:', !!userStr)

          if (token && userStr) {
            try {
              const user = JSON.parse(userStr)
              console.log('=== Saving Auth State ===')
              console.log('User data:', user)

              // 保存前检查状态
              const beforeState = await AuthService.getAuthState()
              console.log('State before save:', beforeState)

              await AuthService.setAuthState({
                token,
                user,
              })

              // 保存后检查状态
              const afterState = await AuthService.getAuthState()
              console.log('State after save:', afterState)

              await browser.tabs.remove(tabId)
              console.log('Login tab closed')

              browser.tabs.onUpdated.removeListener(handleTabUpdate)
              console.log('Tab update listener removed')

              console.log('=== Notifying Popup ===')
              await browser.runtime.sendMessage({
                type: 'AUTH_STATE_CHANGED',
                isLoggedIn: true,
              })
              console.log('Notification sent')
            } catch (error) {
              console.error('=== Callback Error ===')
              console.error('Error type:', error.constructor.name)
              console.error('Error message:', error.message)
              console.error('Error stack:', error.stack)
            }
          }
        }
      }

      browser.tabs.onUpdated.addListener(handleTabUpdate)
      console.log('Tab update listener added')
    } catch (error) {
      console.error('=== Login Process Error ===')
      console.error('Error type:', error.constructor.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  }
})
