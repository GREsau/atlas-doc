import test from 'tape'
import { mention } from '../src/index'

test('Mention', t => {
  const node = mention('user-id')

  const expected = {
    'type': 'mention',
    'attrs': {
      'id': 'user-id'
    }
  }

  t.deepEqual(node, expected)
  t.end()
})
