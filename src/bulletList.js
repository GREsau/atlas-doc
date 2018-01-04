import DocFormatError from './DocFormatError'
import { asListItem } from './listItem'

export default function bulletList (...items) {
  if (items.length === 0) {
    throw new DocFormatError('bulletList can not be empty')
  }
  return {
    type: 'bulletList',
    content: items.map(asListItem)
  }
}
