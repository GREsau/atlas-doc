import { isInlineNode, inlineNode } from './inlineNodes'
import DocFormatError from './DocFormatError'

export function paragraph (...content) {
  return {
    type: 'paragraph',
    content: content.map(inlineNode)
  }
}

export function bulletList (...content) {
  if (content.length === 0) {
    throw new DocFormatError('bulletList can not be empty')
  }
  return {
    type: 'bulletList',
    content: content.map(item => ({
      type: 'listItem',
      content: Array.isArray(item) ? item.map(topLevelNode) : [topLevelNode(item)]
    }))
  }
}

const topLevelNodeTypes = ['applicationCard', 'blockquote', 'bulletList', 'codeBlock', 'decisionList', 'heading', 'mediaGroup', 'orderedList', 'panel', 'paragraph', 'rule', 'taskList']
export function isTopLevelNode (node) {
  return node && topLevelNodeTypes.indexOf(node.type) > -1
}

export function topLevelNode (item) {
  if (typeof item === 'string' || isInlineNode(item)) {
    return paragraph(item)
  }
  if (isTopLevelNode(item)) {
    return item
  }
  throw new DocFormatError(`Expected string or node, but found: ${JSON.stringify(item)}`)
}
