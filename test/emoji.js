import test from 'tape'
import { emoji } from '../src/index'

test('Emoji # With colons', t => {
  const node = emoji(':grin:')

  const expected = {
    'type': 'emoji',
    'attrs': {
      'shortName': ':grin:'
    }
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Emoji # Without colons', t => {
  const node = emoji('grin')

  const expected = {
    'type': 'emoji',
    'attrs': {
      'shortName': ':grin:'
    }
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Emoji # With alt-text', t => {
  const node = emoji(':grin:', ':D')

  const expected = {
    'type': 'emoji',
    'attrs': {
      'shortName': ':grin:',
      'text': ':D'
    }
  }

  t.deepEqual(node, expected)
  t.end()
})
