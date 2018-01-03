import test from 'tape'
import { bulletList, paragraph, strong, DocFormatError } from '../src/index'

test('Bullet List # Different item types', t => {
  const list = bulletList('plain', strong('formatted'), paragraph('paragraph'), ['array 1', 'array 2'])

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
                'text': 'array 1'
              }
            ]
          },
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'array 2'
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
  const list = bulletList('1A', ['1B', bulletList(['2A', bulletList('3A', '3B')])])

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

test('Bullet List # Must be given string, node, or array', t => {
  t.throws(() => bulletList(1), DocFormatError)
  t.throws(() => bulletList([1]), DocFormatError)
  t.throws(() => bulletList({}), DocFormatError)
  t.throws(() => bulletList(null), DocFormatError)
  t.end()
})
