export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const separateAndUppercase = (text: string): string => {
  if (text.startsWith('odd') && text.length > 3) {
    const odd = capitalizeFirstLetter(text.substr(0, 3))
    const endWord = capitalizeFirstLetter(text.substr(3, text.length))

    return `${odd} + ${endWord}`
  }

  if (text.startsWith('even') && text.length > 4) {
    const odd = capitalizeFirstLetter(text.substr(0, 4))
    const endWord = capitalizeFirstLetter(text.substr(4, text.length))

    return `${odd} + ${endWord}`
  }

  return text
}

export const numberWithCommasFormatter = (x: number) => {
  if (x === null || x === undefined) return ''
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
