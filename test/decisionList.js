import test from 'tape-catch'
import { decisionList, decisionItem, strong, paragraph, doc, DocFormatError } from '../src/index'

function ignoreIdAttrs (list) {
  delete list.attrs.localId
  list.content.forEach(i => { delete i.attrs.localId })
}

test('Decision List # Different item types', t => {
  const actual = decisionList('plain', strong('formatted'), decisionItem('decisionItem'))
  ignoreIdAttrs(actual)

  const expected = {
    'type': 'decisionList',
    'content': [
      {
        'type': 'decisionItem',
        'content': [
          {
            'type': 'text',
            'text': 'plain'
          }
        ],
        'attrs': {
          'state': 'UNDECIDED'
        }
      },
      {
        'type': 'decisionItem',
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
        ],
        'attrs': {
          'state': 'UNDECIDED'
        }
      },
      {
        'type': 'decisionItem',
        'content': [
          {
            'type': 'text',
            'text': 'decisionItem'
          }
        ],
        'attrs': {
          'state': 'UNDECIDED'
        }
      }
    ],
    'attrs': {
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Decision List # Has unique ID', t => {
  const first = decisionList('text')
  const second = decisionList('text')

  t.ok(typeof first.attrs.localId === 'string')
  t.ok(typeof second.attrs.localId === 'string')
  t.notEqual(first.attrs.localId, second.attrs.localId)
  t.end()
})

test('Decision List # Implicitly wraps decisionItems used on a block-node context', t => {
  const actual = doc(decisionItem('first'), decisionItem('second'))
  ignoreIdAttrs(actual.content[0])

  const expected = {
    'version': 1,
    'type': 'doc',
    'content': [
      {
        'type': 'decisionList',
        'content': [
          {
            'type': 'decisionItem',
            'content': [
              {
                'type': 'text',
                'text': 'first'
              }
            ],
            'attrs': {
              'state': 'UNDECIDED'
            }
          },
          {
            'type': 'decisionItem',
            'content': [
              {
                'type': 'text',
                'text': 'second'
              }
            ],
            'attrs': {
              'state': 'UNDECIDED'
            }
          }
        ],
        'attrs': {
        }
      }
    ]
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Decision List # Must be given strings, inline nodes or decisionItems', t => {
  t.throws(() => decisionList(paragraph('text')), DocFormatError)
  t.throws(() => decisionList(1), DocFormatError)
  t.throws(() => decisionList([]), DocFormatError)
  t.throws(() => decisionList({}), DocFormatError)
  t.throws(() => decisionList(null), DocFormatError)
  t.end()
})
