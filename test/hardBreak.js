import test from 'tape-catch'
import { hardBreak, br } from '../src/index'

test('Hard Break', t => {
  const node = hardBreak()

  const expected = {
    'type': 'hardBreak'
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Hard Break # Has br alias', t => {
  const node = br()

  const expected = {
    'type': 'hardBreak'
  }

  t.deepEqual(node, expected)
  t.end()
})
