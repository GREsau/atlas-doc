import test from 'tape-catch'
import { codeBlock, paragraph, strong, emoji, text, DocFormatError } from '../src/index'

test('Code Block # Different item types', t => {
  const actual = codeBlock(null, 'plain', text('text'))

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

  t.deepEqual(actual, expected)
  t.end()
})

test('Code Block # Plain text with helper function', t => {
  const actual = codeBlock.plain('text')

  const expected = {
    'type': 'codeBlock',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ]
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Code Block # Can specify language in first parameter', t => {
  const actual = codeBlock('javascript', 'text')

  const expected = {
    'type': 'codeBlock',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ],
    'attrs': {
      'language': 'javascript'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Code Block # Can specify language with helper function', t => {
  const actual = codeBlock.javascript('text')

  const expected = {
    'type': 'codeBlock',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ],
    'attrs': {
      'language': 'javascript'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Code Block # Some languages have aliases', t => {
  t.deepEqual(codeBlock('cpp'), codeBlock('c++'))
  t.deepEqual(codeBlock('csharp'), codeBlock('c#'))
  t.deepEqual(codeBlock('objectivec'), codeBlock('objective-c'))
  t.deepEqual(codeBlock('objectivej'), codeBlock('objective-j'))

  t.end()
})

test('Code Block # Can be empty', t => {
  const actual = codeBlock()

  const expected = {
    'type': 'codeBlock',
    'content': []
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Code Block # Must be given a valid language', t => {
  t.throws(() => codeBlock('esperanto', 'text'), DocFormatError)
  t.throws(() => codeBlock(text('text')), DocFormatError)
  t.end()
})

test('Code Block # Text must not be marked', t => {
  t.throws(() => codeBlock(null, 'plain', strong('formatted')), DocFormatError)
  t.throws(() => codeBlock(null, strong('formatted')), DocFormatError)
  t.end()
})

test('Code Block # Must be given string or text node', t => {
  t.throws(() => codeBlock(null, paragraph()), DocFormatError)
  t.throws(() => codeBlock(null, emoji()), DocFormatError)
  t.throws(() => codeBlock(null, 1), DocFormatError)
  t.throws(() => codeBlock(null, []), DocFormatError)
  t.throws(() => codeBlock(null, {}), DocFormatError)
  t.throws(() => codeBlock(null, null), DocFormatError)
  t.end()
})
