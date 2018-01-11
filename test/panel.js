import test from 'tape-catch'
import { panel, paragraph, strong, media, DocFormatError } from '../src/index'

test('Panel # Different item types', t => {
  const node = panel('info', 'the', strong('first'), 'paragraph', paragraph('the second paragraph'), paragraph('the third paragraph'), media('media1', 'collection'), media('media2', 'collection'))

  const expected = {
    'type': 'panel',
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
    ],
    'attrs': {
      'panelType': 'info'
    }
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Panel # Can be empty', t => {
  const node = panel('warning')

  const expected = {
    'type': 'panel',
    'content': [
      {
        'type': 'paragraph',
        'content': []
      }
    ],
    'attrs': {
      'panelType': 'warning'
    }
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Panel # Can specify panel type with helper function', t => {
  const node1 = panel.tip('text')
  const node2 = panel('tip', 'text')

  t.deepEqual(node1, node2)
  t.end()
})

test('Panel # Requires valid type', t => {
  t.throws(() => panel('invalid'), DocFormatError)
  t.end()
})
