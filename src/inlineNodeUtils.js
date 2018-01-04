import DocFormatError from './DocFormatError'
import text from './text'

const inlineNodeTypes = ['emoji', 'hardBreak', 'mention', 'text']
export function isInlineNode (node) {
  return node && inlineNodeTypes.indexOf(node.type) > -1
}

export function asInlineNode (item) {
  if (isInlineNode(item)) {
    return item
  }
  if (typeof item === 'string') {
    return text(item)
  }
  throw new DocFormatError(`Expected string or inline node, but found: ${JSON.stringify(item)}`)
}
