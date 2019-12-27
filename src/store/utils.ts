const delay = async (): Promise<void> => {
  return new Promise(res => {
    window.setTimeout(() => {
      res()
    }, 1000)
  })
}

export {
  delay,
}