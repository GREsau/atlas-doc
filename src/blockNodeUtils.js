import DocFormatError from './DocFormatError'
import { isInlineNode } from './inlineNodeUtils'
import paragraph from './paragraph'
import mediaGroup from './mediaGroup'

const blockNodeTypes = ['applicationCard', 'blockquote', 'bulletList', 'codeBlock', 'decisionList', 'heading', 'mediaGroup', 'orderedList', 'panel', 'paragraph', 'rule', 'taskList']
export function isBlockNode (node) {
  return node && blockNodeTypes.indexOf(node.type) > -1
}

export function asBlockNode (item) {
  if (typeof item === 'string' || isInlineNode(item)) {
    return paragraph(item)
  }
  if (item && item.type === 'media') {
    return mediaGroup(item)
  }
  if (isBlockNode(item)) {
    return item
  }
  throw new DocFormatError(`Expected string or node, but found: ${JSON.stringify(item)}`)
}
