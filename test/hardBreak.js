import test from 'tape'
import { hardBreak } from '../src/index'

test('Hard Break', t => {
  const node = hardBreak()

  const expected = {
    'type': 'hardBreak'
  }

  t.deepEqual(node, expected)
  t.end()
})
