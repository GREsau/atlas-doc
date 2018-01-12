import test from 'tape-catch'
import { heading, h1, h2, h3, h4, h5, h6, paragraph, strong, emoji, link, DocFormatError } from '../src/index'

test('Heading # Different item types', t => {
  const actual = heading(1, 'plain', link('text', 'http://example.com'))

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

  t.deepEqual(actual, expected)
  t.end()
})

test('Heading # Level can be integer from 1 to 6', t => {
  for (let level = 1; level <= 6; level++) {
    t.doesNotThrow(() => heading(level, 'text'))
  }
  t.end()
})

test('Heading # Has h1-h6 aliases', t => {
  function expectHeading (actual, level) {
    const expected = {
      'type': 'heading',
      'attrs': {
        'level': level
      },
      'content': [
        {
          'type': 'text',
          'text': 'text'
        }
      ]
    }

    t.deepEqual(actual, expected)
  }

  expectHeading(h1('text'), 1)
  expectHeading(h2('text'), 2)
  expectHeading(h3('text'), 3)
  expectHeading(h4('text'), 4)
  expectHeading(h5('text'), 5)
  expectHeading(h6('text'), 6)
  t.end()
})

test('Heading # Can be empty', t => {
  const actual = h1()

  const expected = {
    'type': 'heading',
    'attrs': {
      'level': 1
    },
    'content': []
  }

  t.deepEqual(actual, expected)
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
