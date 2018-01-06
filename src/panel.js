import paragraph from './paragraph'
import { asBlockNodesWithMerging } from './blockNodeUtils'
import DocFormatError from './DocFormatError'

export default function panel (type, ...content) {
  if (type !== 'info' && type !== 'note' && type !== 'tip' && type !== 'warning') {
    throw new DocFormatError(`Invalid panel type '${type}' - must be 'info', 'note', 'tip' or 'warning'`)
  }
  return {
    type: 'panel',
    content: content.length ? asBlockNodesWithMerging(content) : [paragraph()],
    attrs: {
      panelType: type
    }
  }
}
