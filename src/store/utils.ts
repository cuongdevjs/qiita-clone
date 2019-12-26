const delay = async (): Promise<void> => {
  return new Promise(res => {
    window.setTimeout(() => {
      res()
    }, 1500)
  })
}

export {
  delay,
}