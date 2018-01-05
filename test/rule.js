import test from 'tape-catch'
import { rule } from '../src/index'

test('Rule', t => {
  const node = rule()

  const expected = {
    'type': 'rule'
  }

  t.deepEqual(node, expected)
  t.end()
})
