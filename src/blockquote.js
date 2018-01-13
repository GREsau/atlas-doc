import paragraph from './paragraph'
import { asBlockNodesWithMerging } from './blockNodeUtils'

export default function blockquote (...content) {
  return {
    type: 'blockquote',
    content: content.length ? asBlockNodesWithMerging(content) : [paragraph()]
  }
}
