import test from 'tape-catch'
import { orderedList, listItem, ol, li, paragraph, strong, DocFormatError } from '../src/index'

test('Ordered List # Can specify starting number', t => {
  const list = orderedList(3, 'Number 3')

  const expected = {
    'type': 'orderedList',
    'attrs': {
      'order': 3
    },
    'content': [
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'Number 3'
              }
            ]
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Ordered List # Different item types', t => {
  const list = orderedList('plain', strong('formatted'), paragraph('paragraph'), listItem('double 1', strong('double 2'), paragraph('double 3')))

  const expected = {
    'type': 'orderedList',
    'content': [
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'plain'
              }
            ]
          }
        ]
      },
      {
        'type': 'listItem',
        'content': [
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
          }
        ]
      },
      {
        'type': 'listItem',
        'content': [
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
      },
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'double 1'
              }
            ]
          },
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'double 2',
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
                'text': 'double 3'
              }
            ]
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Ordered List # Can be nested', t => {
  const list = orderedList('1A', listItem('1B', orderedList(listItem('2A', orderedList('3A', '3B')))))

  const expected = {
    'type': 'orderedList',
    'content': [
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': '1A'
              }
            ]
          }
        ]
      },
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': '1B'
              }
            ]
          },
          {
            'type': 'orderedList',
            'content': [
              {
                'type': 'listItem',
                'content': [
                  {
                    'type': 'paragraph',
                    'content': [
                      {
                        'type': 'text',
                        'text': '2A'
                      }
                    ]
                  },
                  {
                    'type': 'orderedList',
                    'content': [
                      {
                        'type': 'listItem',
                        'content': [
                          {
                            'type': 'paragraph',
                            'content': [
                              {
                                'type': 'text',
                                'text': '3A'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        'type': 'listItem',
                        'content': [
                          {
                            'type': 'paragraph',
                            'content': [
                              {
                                'type': 'text',
                                'text': '3B'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Ordered List # Has ol alias', t => {
  const list = ol(li('text'))

  const expected = {
    'type': 'orderedList',
    'content': [
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'text'
              }
            ]
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Ordered List # Must be non-empty', t => {
  t.throws(() => orderedList(), DocFormatError)
  t.throws(() => orderedList(1), DocFormatError)
  t.end()
})

test('Ordered List # Must be given string, node, or array', t => {
  t.throws(() => orderedList([1]), DocFormatError)
  t.throws(() => orderedList({}), DocFormatError)
  t.throws(() => orderedList(null), DocFormatError)
  t.end()
})
