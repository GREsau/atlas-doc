import DocFormatError from './DocFormatError'

export default function text (content) {
  if (typeof content !== 'string') {
    throw new DocFormatError(`Expected string, but found: ${JSON.stringify(content)}`)
  }
  return { type: 'text', text: content }
}
