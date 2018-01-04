import DocFormatError from './DocFormatError'
import { isInlineNode } from './inlineNodeUtils'
import paragraph from './paragraph'

const topLevelNodeTypes = ['applicationCard', 'blockquote', 'bulletList', 'codeBlock', 'decisionList', 'heading', 'mediaGroup', 'orderedList', 'panel', 'paragraph', 'rule', 'taskList']
export function isTopLevelNode (node) {
  return node && topLevelNodeTypes.indexOf(node.type) > -1
}

export function asTopLevelNode (item) {
  if (typeof item === 'string' || isInlineNode(item)) {
    return paragraph(item)
  }
  if (isTopLevelNode(item)) {
    return item
  }
  throw new DocFormatError(`Expected string or node, but found: ${JSON.stringify(item)}`)
}
