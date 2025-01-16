import browser from 'webextension-polyfill'

export interface AuthState {
  token: string | null
  user: any | null
}

export class AuthService {
  private static AUTH_KEY = 'auth_state'
  private static DOMAIN =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'https://你的域名'

  static async getAuthState(): Promise<AuthState> {
    try {
      const result = await browser.storage.local.get(this.AUTH_KEY)
      const state = result[this.AUTH_KEY] as AuthState
      return state || { token: null, user: null }
    } catch (error) {
      console.error('Auth state retrieval error:', error)
      return { token: null, user: null }
    }
  }

  static async setAuthState(state: AuthState) {
    try {
      await browser.storage.local.set({ [this.AUTH_KEY]: state })
    } catch (error) {
      console.error('Auth state save error:', error)
      throw error
    }
  }

  static async clearAuth() {
    try {
      await browser.storage.local.remove(this.AUTH_KEY)
    } catch (error) {
      console.error('Auth state clear error:', error)
      throw error
    }
  }

  static async checkWebsiteAuthStatus(): Promise<AuthState | null> {
    try {
      // 获取网站的认证状态
      const response = await fetch(`${this.DOMAIN}/api/auth/status`, {
        credentials: 'include', // 重要：包含 cookies
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.session) {
          // 保存到扩展的存储中
          await this.setAuthState({
            token: data.session.access_token,
            user: data.session.user,
          })
          return data.session
        }
      }
      return null
    } catch (error) {
      console.error('Failed to check website auth status:', error)
      return null
    }
  }
}
