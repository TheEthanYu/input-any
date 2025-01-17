export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000'
}

// 默认配置
export const DEFAULT_SETTINGS = {
  replyInterval: 60, // 默认60秒
  dailyLimit: 50, // 默认50条
  workingHours: {
    start: '09:00',
    end: '18:00',
  },
}

// 配置限制
export const SETTINGS_CONSTRAINTS = {
  replyInterval: {
    min: 30,
    max: 180,
  },
  dailyLimit: {
    min: 1,
    max: 200,
  },
}
