import { defineContentScript } from 'wxt/sandbox'

export default defineContentScript({
  matches: [
    '*://*.twitter.com/*',
    '*://*.x.com/*',
    '*://127.0.0.1:*/*',
    '*://localhost/*',
    'https://你的生产域名/*',
  ],
  main() {
    console.log('=== AI助手扩展已加载 ===')

    // 添加一个简单的点击事件测试
    document.addEventListener('click', () => {
      console.log('检测到点击事件')
    })

    // 监听所有键盘事件
    document.addEventListener('keydown', event => {
      // 更详细的按键信息，添加可选链和空值检查
      console.log('检测到键盘事件:', {
        key: event?.key || 'unknown',
        code: event?.code || 'unknown',
        altKey: !!event?.altKey,
        metaKey: !!event?.metaKey,
        ctrlKey: !!event?.ctrlKey,
        keyCode: event?.keyCode || 0,
        which: event?.which || 0,
        type: event?.type || 'unknown',
      })

      // 简化组合键检测，只使用 altKey，添加空值检查
      const isAltPressed = !!event?.altKey
      const isIKey = event?.key?.toLowerCase() === 'i' || event?.code === 'KeyI'

      if (isAltPressed && isIKey) {
        console.log('检测到 Alt + I 组合键')
        handleAltI(event)
      }
    })
  },
})

function handleAltI(event: KeyboardEvent) {
  // 查找编辑器元素
  const editorElement = document.querySelector(
    '[data-testid="tweetTextarea_0"]'
  ) as HTMLElement
  console.log('编辑器元素:', editorElement)

  if (editorElement && editorElement.contentEditable === 'true') {
    event.preventDefault()

    const testContent = '这是一条测试回复，由快捷键 Alt+I 触发。'

    try {
      // 尝试多种方式插入文本
      try {
        // 方法1: 使用 insertText 命令
        document.execCommand('insertText', false, testContent)
        console.log('方法1成功')
      } catch (e) {
        console.log('方法1失败:', e)

        // 方法2: 直接设置文本
        editorElement.textContent = testContent
        console.log('方法2成功')
      }

      // 触发必要的事件
      ;['input', 'change', 'keydown', 'keyup'].forEach(eventType => {
        editorElement.dispatchEvent(new Event(eventType, { bubbles: true }))
      })

      // 额外触发一个输入事件
      const inputEvent = new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertText',
        data: testContent,
      })
      editorElement.dispatchEvent(inputEvent)

      console.log('成功插入文本')
    } catch (error) {
      console.error('插入文本时出错:', error)
    }
  } else {
    console.log('未找到可编辑的编辑器元素')
  }
}
