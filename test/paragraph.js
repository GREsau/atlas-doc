import test from 'tape'
import { paragraph, strong, DocFormatError } from '../src/index'

test('Paragraph # Different item types', t => {
  const p = paragraph('plain', strong('formatted'))

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

  t.deepEqual(p, expected)
  t.end()
})

test('Paragraph # Can be empty', t => {
  const p = paragraph()

  const expected = {
    'type': 'paragraph',
    'content': []
  }

  t.deepEqual(p, expected)
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
