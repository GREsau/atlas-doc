
import DocFormatError from './DocFormatError'

export function hardBreak () {
  return { type: 'hardBreak' }
}

export function emoji (shortName, altText = null) {
  if (!/^:.*:$/.test(shortName)) {
    shortName = `:${shortName}:`
  }
  return {
    type: 'emoji',
    attrs: altText ? { shortName, text: altText } : { shortName }
  }
}

export function mention (userId) {
  return {
    type: 'mention',
    attrs: {
      id: userId
    }
  }
}

export function text (content) {
  if (typeof content === 'string') {
    return { type: 'text', text: content }
  }
  if (content && content.type === 'text') {
    return content
  }
  throw new DocFormatError(`Expected string or text node, but found: ${JSON.stringify(content)}`)
}

export function code (content) {
  return markedText(content, 'code')
}

export function emphasis (content) {
  return markedText(content, 'em')
}

export function strike (content) {
  return markedText(content, 'strike')
}

export function strong (content) {
  return markedText(content, 'strong')
}

export function underline (content) {
  return markedText(content, 'underline')
}

export function superscript (content) {
  return markedText(content, 'subsup', { type: 'sup' })
}

export function subscript (content) {
  return markedText(content, 'subsup', { type: 'sub' })
}

export function color (content, color) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) {
    throw new DocFormatError(`Invalid text color '${color}' - must be 6-character hex code with leading #`)
  }
  return markedText(content, 'textColor', { color: color.toLowerCase() })
}

export function link (content, url) {
  return markedText(content, 'link', { href: url })
}

function markedText (content, type, attrs = null) {
  const textNode = text(content)
  const mark = attrs ? { type, attrs } : { type }
  const marks = textNode.marks ? textNode.marks.concat(mark) : [mark]
  return Object.assign({}, textNode, { marks })
}

const inlineNodeTypes = ['emoji', 'hardBreak', 'mention', 'text']
export function isInlineNode (node) {
  return node && inlineNodeTypes.indexOf(node.type) > -1
}

export function inlineNode (item) {
  if (typeof item === 'string') {
    return text(item)
  }
  if (isInlineNode(item)) {
    return item
  }
  throw new DocFormatError(`Expected string or inline node, but found: ${JSON.stringify(item)}`)
}
