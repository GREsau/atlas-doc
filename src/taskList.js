import { asTaskItem } from './taskItem'
import id from './id'

export default function taskList (...items) {
  // TODO can taskList be empty?
  return {
    type: 'taskList',
    content: items.map(asTaskItem),
    attrs: {
      localId: id()
    }
  }
}
