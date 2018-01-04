import DocFormatError from './DocFormatError'
import { asListItem } from './listItem'

export default function bulletList (...content) {
  if (content.length === 0) {
    throw new DocFormatError('bulletList can not be empty')
  }
  return {
    type: 'bulletList',
    content: content.map(asListItem)
  }
}
