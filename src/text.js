import DocFormatError from './DocFormatError'

export default function text (content) {
  if (typeof content === 'string') {
    return { type: 'text', text: content }
  }
  if (content && content.type === 'text') {
    return content
  }
  throw new DocFormatError(`Expected string or text node, but found: ${JSON.stringify(content)}`)
}
