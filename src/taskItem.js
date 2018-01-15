import { asInlineNode } from './inlineNodeUtils'
import id from './id'

export default function taskItem (isDone = false, ...content) {
  // TODO can taskItem be empty?
  if (typeof isDone !== 'boolean') {
    content.unshift(isDone)
    isDone = false
  }
  return {
    type: 'taskItem',
    content: content.map(asInlineNode),
    attrs: {
      localId: id(),
      state: isDone ? 'DONE' : 'TODO'
    }
  }
}

export function asTaskItem (item) {
  if (item && item.type === 'taskItem') {
    return item
  }
  return taskItem(item)
}
