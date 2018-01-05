import { asBlockNode } from './blockNodeUtils'
import paragraph from './paragraph'

export default function listItem (...content) {
  return {
    type: 'listItem',
    content: content.length ? content.map(asBlockNode) : [paragraph()]
  }
}

export function asListItem (item) {
  if (item && item.type === 'listItem') {
    return item
  }
  return listItem(item)
}
