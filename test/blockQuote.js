import test from 'tape-catch'
import { blockquote, paragraph, strong, media } from '../src/index'

test('Block Quote # Different item types', t => {
  const node = blockquote('the', strong('first'), 'paragraph', paragraph('the second paragraph'), paragraph('the third paragraph'), media('media1', 'collection'), media('media2', 'collection'))

  const expected = {
    'type': 'blockquote',
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
