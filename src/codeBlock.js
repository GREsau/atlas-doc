import DocFormatError from './DocFormatError'
import text from './text'

export default function codeBlock (...content) {
  const textContent = content.map(c => typeof c === 'string' ? text(c) : c)
  const nonText = textContent.filter(c => !(c && c.type === 'text'))
  if (nonText.length) {
    throw new DocFormatError(`codeBlock can only contain text, but found: ${JSON.stringify(nonText[0])}`)
  }
  const markedText = textContent.filter(c => (c.marks && c.marks.length))
  if (markedText.length) {
    throw new DocFormatError(`codeBlock text must not have marks, but found: ${JSON.stringify(markedText[0])}`)
  }

  return {
    type: 'codeBlock',
    content: textContent
  }
}
