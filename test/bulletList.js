import test from 'tape-catch'
import { bulletList, listItem, ul, li, paragraph, strong, DocFormatError } from '../src/index'

test('Bullet List # Different item types', t => {
  const list = bulletList('plain', strong('formatted'), paragraph('paragraph'), listItem('double 1', strong('double 2'), paragraph('double 3')))

  const expected = {
    'type': 'bulletList',
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

test('Bullet List # Can be nested', t => {
  const list = bulletList('1A', listItem('1B', bulletList(listItem('2A', bulletList('3A', '3B')))))

  const expected = {
    'type': 'bulletList',
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
            'type': 'bulletList',
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
                    'type': 'bulletList',
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

test('Bullet List # Must be non-empty', t => {
  t.throws(() => bulletList(), DocFormatError)
  t.end()
})

test('Bullet List # Has ul alias', t => {
  const list = ul(li('text'))

  const expected = {
    'type': 'bulletList',
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

test('Bullet List # List item can be empty', t => {
  const node = bulletList(listItem())

  const expected = {
    'type': 'bulletList',
    'content': [
      {
        'type': 'listItem',
        'content': [
          {
            'type': 'paragraph',
            'content': []
          }
        ]
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Bullet List # Must be given string, node, or array', t => {
  t.throws(() => bulletList(1), DocFormatError)
  t.throws(() => bulletList([1]), DocFormatError)
  t.throws(() => bulletList({}), DocFormatError)
  t.throws(() => bulletList(null), DocFormatError)
  t.end()
})
