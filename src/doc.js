import { asBlockNodesWithMerging } from './blockNodeUtils'
import paragraph from './paragraph'

export default function doc (...content) {
  return {
    version: 1,
    type: 'doc',
    content: content.length ? asBlockNodesWithMerging(content) : [paragraph()]
  }
}
