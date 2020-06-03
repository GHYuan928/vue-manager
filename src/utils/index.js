
/**
 * 防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 */
export function debounce(func, delay, immediate) {
  let timeout
  return function() {
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const nowCall = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if (nowCall) {
        func.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}

/**
 * 节流 指连续触发事件但是在 n 秒中只执行一次函数
 * type : 1 时间戳版本就立即执行， 2 定时器版本，timeout 后执行
 */
export function throttle(func, delay, type) {
  if (type === 1) {
    var previous = 0
  } else if (type === 2) {
    var timeout
  }
  return function() {
    const args = arguments
    if (type === 1) {
      const now = Date.now()
      if (now - previous > delay) {
        func.apply(this, args)
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(this, args)
        }, delay)
      }
    }
  }
}

export function deepClone(source) {
  if (typeof source !== 'object' || source == null) {
    return source
  }
  const res = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    res[keys] = deepClone(source[keys])
  })
  // for (const keys in source) {
  //   res[keys] = deepClone(source[keys])
  // }
  return res
}
