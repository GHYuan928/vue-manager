import ClipboardJS from 'clipboard'
import Vue from 'vue'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error'
  })
}

export default function handleClipBoard(text, event) {
  console.log(event.target)
  const clipboard = new ClipboardJS(event.target, { text: () => text })
  clipboard.on('success', function() {
    console.log('success')
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', function() {
    console.log('error')
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
