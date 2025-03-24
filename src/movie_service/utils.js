function trimText(text, maxLength) {
  if (text.length < maxLength) {
    return text
  }
  const trimmedText = text.slice(0, maxLength - 1)
  const lastSpaceIndex = trimmedText.lastIndexOf(' ')
  return trimmedText.slice(0, lastSpaceIndex) + ' ...'
}

export { trimText }
