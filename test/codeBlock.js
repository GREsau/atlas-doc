import test from 'tape-catch'
import { codeBlock, paragraph, strong, emoji, text, DocFormatError } from '../src/index'

test('Code Block # Different item types', t => {
  const p = codeBlock('plain', text('text'))

  const expected = {
    'type': 'codeBlock',
    'content': [
      {
        'type': 'text',
        'text': 'plain'
      },
      {
        'type': 'text',
        'text': 'text'
      }
    ]
  }

  t.deepEqual(p, expected)
  t.end()
})

test('Code Block # Can be empty', t => {
  const p = codeBlock()

  const expected = {
    'type': 'codeBlock',
    'content': []
  }

  t.deepEqual(p, expected)
  t.end()
})

test('Code Block # Text must not be marked', t => {
  t.throws(() => codeBlock('plain', strong('formatted')), DocFormatError)
  t.throws(() => codeBlock(strong('formatted')), DocFormatError)
  t.end()
})

test('Code Block # Must be given string or text node', t => {
  t.throws(() => codeBlock(paragraph()), DocFormatError)
  t.throws(() => codeBlock(emoji()), DocFormatError)
  t.throws(() => codeBlock(1), DocFormatError)
  t.throws(() => codeBlock([]), DocFormatError)
  t.throws(() => codeBlock({}), DocFormatError)
  t.throws(() => codeBlock(null), DocFormatError)
  t.end()
})
