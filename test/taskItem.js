import test from 'tape-catch'
import { taskItem, strong, paragraph, DocFormatError } from '../src/index'

function ignoreIdAttr (item) {
  delete item.attrs.localId
}

test('Task Item # Different item types', t => {
  const actual = taskItem('plain', strong('formatted'))
  ignoreIdAttr(actual)

  const expected = {
    'type': 'taskItem',
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
    ],
    'attrs': {
      'state': 'TODO'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Task Item # Has unique ID', t => {
  const first = taskItem('text')
  const second = taskItem('text')

  t.ok(typeof first.attrs.localId === 'string')
  t.ok(typeof second.attrs.localId === 'string')
  t.notEqual(first.attrs.localId, second.attrs.localId)
  t.end()
})

test('Task Item # Can explicitly set to TODO', t => {
  const actual = taskItem(false, 'text')
  ignoreIdAttr(actual)

  const expected = {
    'type': 'taskItem',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ],
    'attrs': {
      'state': 'TODO'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Task Item # Can set to DONE', t => {
  const actual = taskItem(true, 'text')
  ignoreIdAttr(actual)

  const expected = {
    'type': 'taskItem',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ],
    'attrs': {
      'state': 'DONE'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Task Item # Must be given string or inline node', t => {
  t.throws(() => taskItem(paragraph()), DocFormatError)
  t.throws(() => taskItem(1), DocFormatError)
  t.throws(() => taskItem([]), DocFormatError)
  t.throws(() => taskItem({}), DocFormatError)
  t.throws(() => taskItem(null), DocFormatError)
  t.end()
})
