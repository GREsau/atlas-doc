import test from 'tape-catch'
import { decisionItem, strong, paragraph, DocFormatError } from '../src/index'

function ignoreIdAttr (item) {
  delete item.attrs.localId
}

test('Decision Item # Different item types', t => {
  const actual = decisionItem('plain', strong('formatted'))
  ignoreIdAttr(actual)

  const expected = {
    'type': 'decisionItem',
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
      'state': 'UNDECIDED'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Decision Item # Has unique ID', t => {
  const first = decisionItem('text')
  const second = decisionItem('text')

  t.ok(typeof first.attrs.localId === 'string')
  t.ok(typeof second.attrs.localId === 'string')
  t.notEqual(first.attrs.localId, second.attrs.localId)
  t.end()
})

test('Decision Item # Can explicitly set to UNDECIDED', t => {
  const actual = decisionItem(false, 'text')
  ignoreIdAttr(actual)

  const expected = {
    'type': 'decisionItem',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ],
    'attrs': {
      'state': 'UNDECIDED'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Decision Item # Can set to DECIDED', t => {
  const actual = decisionItem(true, 'text')
  ignoreIdAttr(actual)

  const expected = {
    'type': 'decisionItem',
    'content': [
      {
        'type': 'text',
        'text': 'text'
      }
    ],
    'attrs': {
      'state': 'DECIDED'
    }
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Decision Item # Must be given string or inline node', t => {
  t.throws(() => decisionItem(paragraph()), DocFormatError)
  t.throws(() => decisionItem(1), DocFormatError)
  t.throws(() => decisionItem([]), DocFormatError)
  t.throws(() => decisionItem({}), DocFormatError)
  t.throws(() => decisionItem(null), DocFormatError)
  t.end()
})
