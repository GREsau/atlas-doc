import test from 'tape-catch'
import { paragraph, p, strong, DocFormatError } from '../src/index'

test('Paragraph # Different item types', t => {
  const actual = paragraph('plain', strong('formatted'))

  const expected = {
    'type': 'paragraph',
    'content': [
      {
        'type': 'text',
        'text': 'plain'
      },
      {
        'type': 'text',
        'text': 'formatted',
        'marks': [
          {
            'type': 'strong'
          }
        ]
      }
    ]
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Paragraph # Has p alias', t => {
  const actual = p('text')

  const expected = {
    'type': 'paragraph',
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

test('Paragraph # Can be empty', t => {
  const actual = paragraph()

  const expected = {
    'type': 'paragraph',
    'content': []
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Paragraph # Must be given string or inline node', t => {
  t.throws(() => paragraph(paragraph()), DocFormatError)
  t.throws(() => paragraph(1), DocFormatError)
  t.throws(() => paragraph([]), DocFormatError)
  t.throws(() => paragraph({}), DocFormatError)
  t.throws(() => paragraph(null), DocFormatError)
  t.end()
})
