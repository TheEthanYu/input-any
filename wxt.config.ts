import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: [
      // 添加所需权限
      'activeTab',
    ],
    host_permissions: [
      '*://*.twitter.com/*',
      '*://*.x.com/*',
    ]
  },
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
});
