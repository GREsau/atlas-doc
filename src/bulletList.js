import DocFormatError from './DocFormatError'
import { asTopLevelNode } from './topLevelNodeUtils'

export default function bulletList (...content) {
  if (content.length === 0) {
    throw new DocFormatError('bulletList can not be empty')
  }
  return {
    type: 'bulletList',
    content: content.map(item => ({
      type: 'listItem',
      content: Array.isArray(item) ? item.map(asTopLevelNode) : [asTopLevelNode(item)]
    }))
  }
}
