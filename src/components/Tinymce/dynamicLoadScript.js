
let callbacks = []

export default function loadScript(src, callback) {
  const isExistElm = document.getElementById(src)
  const cb = callback || function() {}
  if (!isExistElm) {
    const scriptElm = document.createElement('script')
    scriptElm.src = src
    scriptElm.id = src
    // onload or complite
    scriptElm.onload = function() {
      // this === scriptElm
      this.onerror = this.onload = null
      for (const cb of callbacks) {
        cb(null, scriptElm)
      }
      callbacks = null
    }

    callbacks.push(cb)
    document.body.appendChild(scriptElm)
  } else {
    if (window.tinymce) {
      cb(null, isExistElm)
    } else {
      callbacks.push(cb)
    }
  }
}
