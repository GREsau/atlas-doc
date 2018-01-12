import test from 'tape-catch'
import { rule, hr } from '../src/index'

test('Rule', t => {
  const node = rule()

  const expected = {
    'type': 'rule'
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Rule # Has hr alias', t => {
  const node = hr()

  const expected = {
    'type': 'rule'
  }

  t.deepEqual(node, expected)
  t.end()
})
