import text from './text'
import DocFormatError from './DocFormatError'

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

export const h1 = (...content) => heading(1, ...content)
export const h2 = (...content) => heading(2, ...content)
export const h3 = (...content) => heading(3, ...content)
export const h4 = (...content) => heading(4, ...content)
export const h5 = (...content) => heading(5, ...content)
export const h6 = (...content) => heading(6, ...content)
