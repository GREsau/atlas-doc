import { asTopLevelNode } from './topLevelNodeUtils'

export default function listItem (...content) {
  // TODO can listItem be empty?
  return {
    type: 'listItem',
    content: content.map(asTopLevelNode)
  }
}

export function asListItem (item) {
  if (item && item.type === 'listItem') {
    return item
  }
  return listItem(item)
}
