import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: [
      // 添加所需权限
      'activeTab',
      'storage',
      'identity',
      'tabs',
    ],
    host_permissions: [
      '*://*.twitter.com/*',
      '*://*.x.com/*',
      '*://127.0.0.1:*/*',
      '*://localhost/*',
      'https://你的生产域名/*',
    ],
    web_accessible_resources: [
      {
        resources: ['*'],
        matches: [
          '*://*.twitter.com/*',
          '*://*.x.com/*',
          '*://127.0.0.1:*/*',
          '*://localhost/*',
          'https://你的生产域名/*',
        ],
      },
    ],
  },
  extensionApi: 'webextension-polyfill',
  modules: ['@wxt-dev/module-react'],
})
