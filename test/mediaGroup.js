import test from 'tape-catch'
import { doc, media, mediaGroup, strong, paragraph, DocFormatError } from '../src/index'

test('MediaGroup # Contains media nodes', t => {
  const node = mediaGroup(media('id', 'collection'), media('link', 'id2', 'collection2'))

  const expected = {
    'type': 'mediaGroup',
    'content': [
      {
        'type': 'media',
        'attrs': {
          'type': 'file',
          'id': 'id',
          'collection': 'collection'
        }
      },
      {
        'type': 'media',
        'attrs': {
          'type': 'link',
          'id': 'id2',
          'collection': 'collection2'
        }
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('MediaGroup # Can specify media type with helper function', t => {
  const node1 = mediaGroup(media.file('id', 'collection'), media.link('id2', 'collection2'))
  const node2 = mediaGroup(media('id', 'collection'), media('link', 'id2', 'collection2'))

  t.deepEqual(node1, node2)
  t.end()
})

test('MediaGroup # Implicitly wraps media used on a block-node context', t => {
  const node = doc(media('id', 'collection'))

  const expected = {
    'version': 1,
    'type': 'doc',
    'content': [
      {
        'type': 'mediaGroup',
        'content': [
          {
            'type': 'media',
            'attrs': {
              'type': 'file',
              'id': 'id',
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

test('MediaGroup # Must be non-empty', t => {
  t.throws(() => mediaGroup(), DocFormatError)
  t.end()
})

test('MediaGroup # Must be given media nodes', t => {
  t.throws(() => mediaGroup('text'), DocFormatError)
  t.throws(() => mediaGroup(strong('text')), DocFormatError)
  t.throws(() => mediaGroup(paragraph('text')), DocFormatError)
  t.throws(() => mediaGroup([]), DocFormatError)
  t.end()
})
