import test from 'tape-catch'
import { doc, paragraph, strong, media } from '../src/index'

test('Document # Different item types', t => {
  const node = doc('the', strong('first'), 'paragraph', paragraph('the second paragraph'), paragraph('the third paragraph'), media('media1', 'collection'), media('media2', 'collection'))

  const expected = {
    'version': 1,
    'type': 'doc',
    'content': [
      {
        'type': 'paragraph',
        'content': [
          {
            'type': 'text',
            'text': 'the'
          },
          {
            'type': 'text',
            'text': 'first',
            'marks': [
              {
                'type': 'strong'
              }
            ]
          },
          {
            'type': 'text',
            'text': 'paragraph'
          }
        ]
      },
      {
        'type': 'paragraph',
        'content': [
          {
            'type': 'text',
            'text': 'the second paragraph'
          }
        ]
      },
      {
        'type': 'paragraph',
        'content': [
          {
            'type': 'text',
            'text': 'the third paragraph'
          }
        ]
      },
      {
        'type': 'mediaGroup',
        'content': [
          {
            'type': 'media',
            'attrs': {
              'type': 'file',
              'id': 'media1',
              'collection': 'collection'
            }
          },
          {
            'type': 'media',
            'attrs': {
              'type': 'file',
              'id': 'media2',
              'collection': 'collection'
            }
          }
        ]
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Document # Can be empty', t => {
  // TODO Stride documentation suggest that a doc with no content is valid, but
  // Stride itself doesn't accept this - verify the intended behaviour
  const node = doc()

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

  t.deepEqual(node, expected)
  t.end()
})
