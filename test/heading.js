import test from 'tape-catch'
import { heading, paragraph, strong, emoji, link, DocFormatError } from '../src/index'

test('Heading # Different item types', t => {
  const p = heading(1, 'plain', link('text', 'http://example.com'))

  const expected = {
    'type': 'heading',
    'attrs': {
      'level': 1
    },
    'content': [
      {
        'type': 'text',
        'text': 'plain'
      },
      {
        'type': 'text',
        'text': 'text',
        'marks': [
          {
            'type': 'link',
            'attrs': {
              'href': 'http://example.com'
            }
          }
        ]
      }
    ]
  }

  t.deepEqual(p, expected)
  t.end()
})

test('Heading # Level can be integer from 1 to 6', t => {
  for (let level = 1; level <= 6; level++) {
    t.doesNotThrow(() => heading(level, 'text'))
  }
  t.end()
})

test('Heading # Level must be integer from 1 to 6', t => {
  t.throws(() => heading(0, 'text'), DocFormatError)
  t.throws(() => heading(7, 'text'), DocFormatError)
  t.throws(() => heading('1', 'text'), DocFormatError)
  t.throws(() => heading(1.5, 'text'), DocFormatError)
  t.throws(() => heading(null, 'text'), DocFormatError)
  t.throws(() => heading([], 'text'), DocFormatError)
  t.throws(() => heading({}, 'text'), DocFormatError)
  t.throws(() => heading('text'), DocFormatError)
  t.end()
})

test('Heading # Text must not be marked other than link', t => {
  t.throws(() => heading(1, 'plain', strong('formatted')), DocFormatError)
  t.throws(() => heading(1, strong('formatted')), DocFormatError)
  t.end()
})

test('Heading # Must be given string or text node', t => {
  t.throws(() => heading(1, paragraph()), DocFormatError)
  t.throws(() => heading(1, emoji()), DocFormatError)
  t.throws(() => heading(1, 1), DocFormatError)
  t.throws(() => heading(1, []), DocFormatError)
  t.throws(() => heading(1, {}), DocFormatError)
  t.throws(() => heading(1, null), DocFormatError)
  t.end()
})
