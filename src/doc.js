import { asTopLevelNode } from './topLevelNodeUtils'
import paragraph from './paragraph'

export default function doc (...content) {
  return {
    version: 1,
    type: 'doc',
    content: content.length ? content.map(asTopLevelNode) : [paragraph()]
  }
}
