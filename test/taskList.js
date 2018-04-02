import test from 'tape-catch'
import { taskList, taskItem, strong, paragraph, doc, DocFormatError } from '../src/index'

function ignoreIdAttrs (list) {
  delete list.attrs.localId
  list.content.forEach(i => { delete i.attrs.localId })
}

test('Task List # Different item types', t => {
  const actual = taskList('plain', strong('formatted'), taskItem('taskItem'))
  ignoreIdAttrs(actual)

  const expected = {
    'type': 'taskList',
    'content': [
      {
        'type': 'taskItem',
        'content': [
          {
            'type': 'text',
            'text': 'plain'
          }
        ],
        'attrs': {
          'state': 'TODO'
        }
      },
      {
        'type': 'taskItem',
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
          'state': 'TODO'
        }
      },
      {
        'type': 'taskItem',
        'content': [
          {
            'type': 'text',
            'text': 'taskItem'
          }
        ],
        'attrs': {
          'state': 'TODO'
        }
      }
    ],
    'attrs': {
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Task List # Has unique ID', t => {
  const first = taskList('text')
  const second = taskList('text')

  t.ok(typeof first.attrs.localId === 'string')
  t.ok(typeof second.attrs.localId === 'string')
  t.notEqual(first.attrs.localId, second.attrs.localId)
  t.end()
})

test('Task List # Implicitly wraps taskItems used on a block-node context', t => {
  const actual = doc(taskItem('first'), taskItem('second'))
  ignoreIdAttrs(actual.content[0])

  const expected = {
    'version': 1,
    'type': 'doc',
    'content': [
      {
        'type': 'taskList',
        'content': [
          {
            'type': 'taskItem',
            'content': [
              {
                'type': 'text',
                'text': 'first'
              }
            ],
            'attrs': {
              'state': 'TODO'
            }
          },
          {
            'type': 'taskItem',
            'content': [
              {
                'type': 'text',
                'text': 'second'
              }
            ],
            'attrs': {
              'state': 'TODO'
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

test('Task List # Must be given strings, inline nodes or taskItems', t => {
  t.throws(() => taskList(paragraph('text')), DocFormatError)
  t.throws(() => taskList(1), DocFormatError)
  t.throws(() => taskList([]), DocFormatError)
  t.throws(() => taskList({}), DocFormatError)
  t.throws(() => taskList(null), DocFormatError)
  t.end()
})
