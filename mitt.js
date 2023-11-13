function mitt() {
  const all = new Map()

  /**
   * @param {string|symbol} type 
   * @param {function} handler 
   */
  const on = (type, handler) => {
    const handlers = all.get(type)

    if (handlers) {
      handlers.push(handler)
    } else {
      all.set(type, [ handler ])
    }
  }

  /**
   * @param {string|symbol} type 
   */
  const emit = (type) => {
    const handlers = all.get(type)

    if (handlers) {
      handlers
        .slice()
        .forEach(handler => handler())
    }
  }

  /**
   * @param {string|symbol} type 
   * @param {function} handler 
   */
  const off = (type, handler) => {
    const handlers = all.get(type)

    if (handlers) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    }
  }

  const clear = () => {
    all.clear()
  }

  return {
    all,
    on,
    emit,
    off,
    clear
  }
}