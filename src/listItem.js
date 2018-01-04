import { asBlockNode } from './blockNodeUtils'

export default function listItem (...content) {
  // TODO can listItem be empty?
  return {
    type: 'listItem',
    content: content.map(asBlockNode)
  }
}

export function asListItem (item) {
  if (item && item.type === 'listItem') {
    return item
  }
  return listItem(item)
}
