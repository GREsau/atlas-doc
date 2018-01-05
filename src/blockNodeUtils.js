import DocFormatError from './DocFormatError'
import { isInlineNode } from './inlineNodeUtils'
import paragraph from './paragraph'
import mediaGroup from './mediaGroup'

const blockNodeTypes = ['applicationCard', 'blockquote', 'bulletList', 'codeBlock', 'decisionList', 'heading', 'mediaGroup', 'orderedList', 'panel', 'paragraph', 'rule', 'taskList']
export function isBlockNode (node) {
  return node && blockNodeTypes.indexOf(node.type) > -1
}

export function asBlockNode (item) {
  return asBlockNodesWithMerging([item])[0]
}

export function asBlockNodesWithMerging (items) {
  items = [...items]
  const result = []
  while (items.length) {
    const inlines = shiftWhere(items, i => (typeof i === 'string' || isInlineNode(i)))
    if (inlines.length) {
      result.push(paragraph(...inlines))
      continue
    }
    const media = shiftWhere(items, i => (i && i.type === 'media'))
    if (media.length) {
      result.push(mediaGroup(...media))
      continue
    }
    const blocks = shiftWhere(items, isBlockNode)
    if (blocks.length) {
      result.push(...blocks)
      continue
    }
    throw new DocFormatError(`Expected string or node, but found: ${JSON.stringify(items[0])}`)
  }
  return result
}

function shiftWhere (items, condition) {
  const result = []
  while (condition(items[0])) {
    result.push(items.shift())
  }
  return result
}
