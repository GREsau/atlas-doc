import DocFormatError from './DocFormatError'
import { asListItem } from './listItem'

export default function orderedList (startFrom = 1, ...items) {
  if (typeof startFrom !== 'number') {
    items.unshift(startFrom)
    startFrom = 1
  }
  if (items.length === 0) {
    throw new DocFormatError('orderedList can not be empty')
  }
  const node = {
    type: 'orderedList',
    content: items.map(asListItem)
  }
  if (startFrom !== 1) {
    node.attrs = {
      order: startFrom
    }
  }
  return node
}
