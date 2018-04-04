import { asInlineNode } from './inlineNodeUtils'
import id from './id'

export default function decisionItem (isDecided = false, ...content) {
  // TODO can decisionItem be empty?
  if (typeof isDecided !== 'boolean') {
    content.unshift(isDecided)
    isDecided = false
  }
  return {
    type: 'decisionItem',
    content: content.map(asInlineNode),
    attrs: {
      localId: id(),
      state: isDecided ? 'DECIDED' : 'UNDECIDED'
    }
  }
}

export function asDecisionItem (item) {
  if (item && item.type === 'decisionItem') {
    return item
  }
  return decisionItem(item)
}
