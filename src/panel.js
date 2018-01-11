import paragraph from './paragraph'
import { asBlockNodesWithMerging } from './blockNodeUtils'
import DocFormatError from './DocFormatError'

const types = ['info', 'note', 'tip', 'warning']

export default function panel (type, ...content) {
  if (types.indexOf(type) === -1) {
    throw new DocFormatError(`Invalid panel type '${type}' - must be one of ${types.join(',')}`)
  }
  return {
    type: 'panel',
    content: content.length ? asBlockNodesWithMerging(content) : [paragraph()],
    attrs: {
      panelType: type
    }
  }
}

for (const type of types) {
  panel[type] = (...content) => panel(type, ...content)
}
