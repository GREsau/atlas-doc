import test from 'tape-catch'
import { doc, paragraph, strong } from '../src/index'

test('Document # Different item types', t => {
  const list = doc('plain', strong('formatted'), paragraph('paragraph'))

  const expected = {
    'version': 1,
    'type': 'doc',
    'content': [
      {
        'type': 'paragraph',
        'content': [
          {
            'type': 'text',
            'text': 'plain'
          }
        ]
      },
      {
        'type': 'paragraph',
        'content': [
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
      },
      {
        'type': 'paragraph',
        'content': [
          {
            'type': 'text',
            'text': 'paragraph'
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Document # Can be empty', t => {
  const list = doc()

  const expected = {
    'version': 1,
    'type': 'doc',
    'content': [
      {
        'type': 'paragraph',
        'content': []
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})
