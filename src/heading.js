import text from './text'
import DocFormatError from './DocFormatError'

// TODO can heading be empty? Currently this causes a 500 when sent to Stride...

const levels = [1, 2, 3, 4, 5, 6]

export default function heading (level, ...content) {
  if (levels.indexOf(level) === -1) {
    throw new DocFormatError(`Expected integer from 1 to 6, but found: ${JSON.stringify(level)}`)
  }

  const textContent = content.map(c => typeof c === 'string' ? text(c) : c)

  for (const node of textContent) {
    if (!node || node.type !== 'text') {
      throw new DocFormatError(`heading can only contain text, but found: ${JSON.stringify(node)}`)
    }
    if (node.marks && node.marks.some(m => m.type !== 'link')) {
      throw new DocFormatError(`heading text must not have marks other than link, but found: ${JSON.stringify(node.marks)}`)
    }
  }

  return {
    type: 'heading',
    attrs: {
      level
    },
    content: textContent
  }
}
