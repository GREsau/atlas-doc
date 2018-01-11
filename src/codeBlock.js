import DocFormatError from './DocFormatError'
import text from './text'

export default function codeBlock (...content) {
  const textContent = content.map(c => typeof c === 'string' ? text(c) : c)

  for (const node of textContent) {
    if (!node || node.type !== 'text') {
      throw new DocFormatError(`codeBlock can only contain text, but found: ${JSON.stringify(node)}`)
    }
    if (node.marks && node.marks.length) {
      throw new DocFormatError(`codeBlock text must not have marks, but found: ${JSON.stringify(node.marks)}`)
    }
  }

  return {
    type: 'codeBlock',
    content: textContent
  }
}
