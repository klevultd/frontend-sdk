export const debounce = (callback, wait) => {
  let timeoutId: number | undefined
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

const output = document.getElementById("output") as HTMLPreElement
export const printToOutput = (data: any) => {
  output.innerHTML += JSON.stringify(data, undefined, 2) + "\n"
}

export const clearOutput = () => {
  output.innerHTML = ""
}
