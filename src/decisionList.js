import { asDecisionItem } from './decisionItem'
import id from './id'

export default function decisionList (...items) {
  // TODO can decisionList be empty?
  return {
    type: 'decisionList',
    content: items.map(asDecisionItem),
    attrs: {
      localId: id()
    }
  }
}
