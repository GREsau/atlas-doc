import test from 'tape-catch'
import { table, tableRow, tableCell, tableHeader, tr, td, th, paragraph, strong, DocFormatError } from '../src/index'

test('Table # Different item types', t => {
  const actual = table(
    tableRow(tableHeader('plain'), tableHeader(paragraph('paragraph')), tableHeader('foo', 'bar')),
    tableRow(tableCell('plain'), tableCell(paragraph('paragraph')), tableCell('foo', 'bar')),
    tableRow('plain', strong('formatted'), paragraph('paragraph'))
  )

  const expected = {
    'type': 'table',
    'content': [
      {
        'type': 'tableRow',
        'content': [
          {
            'type': 'tableHeader',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableHeader',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableHeader',
            'content': [
              {
                'type': 'paragraph',
                'content': [
                  {
                    'type': 'text',
                    'text': 'foo'
                  },
                  {
                    'type': 'text',
                    'text': 'bar'
                  }
                ]
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          }
        ]
      },
      {
        'type': 'tableRow',
        'content': [
          {
            'type': 'tableCell',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableCell',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableCell',
            'content': [
              {
                'type': 'paragraph',
                'content': [
                  {
                    'type': 'text',
                    'text': 'foo'
                  },
                  {
                    'type': 'text',
                    'text': 'bar'
                  }
                ]
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          }
        ]
      },
      {
        'type': 'tableRow',
        'content': [
          {
            'type': 'tableCell',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableCell',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableCell',
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
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          }
        ]
      }
    ]
  }

  t.deepEqual(actual, expected)
  t.end()
})

test('Table # Can be nested', t => {
  const list = table(tableRow(table(tableRow(tableCell(table(tableRow('content')))))))

  const expected = {
    'type': 'table',
    'content': [
      {
        'type': 'tableRow',
        'content': [
          {
            'type': 'tableCell',
            'content': [
              {
                'type': 'table',
                'content': [
                  {
                    'type': 'tableRow',
                    'content': [
                      {
                        'type': 'tableCell',
                        'content': [
                          {
                            'type': 'table',
                            'content': [
                              {
                                'type': 'tableRow',
                                'content': [
                                  {
                                    'type': 'tableCell',
                                    'content': [
                                      {
                                        'type': 'paragraph',
                                        'content': [
                                          {
                                            'type': 'text',
                                            'text': 'content'
                                          }
                                        ]
                                      }
                                    ],
                                    'attrs': {
                                      'colspan': 1,
                                      'rowspan': 1
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        'attrs': {
                          'colspan': 1,
                          'rowspan': 1
                        }
                      }
                    ]
                  }
                ]
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Table # Must be non-empty', t => {
  t.throws(() => table(), DocFormatError)
  t.end()
})

test('Table # Row must be non-empty', t => {
  t.throws(() => table(tableRow()), DocFormatError)
  t.end()
})

test('Table # Cell and header can be empty', t => {
  const list = table(tableRow(tableHeader(), tableCell()))

  const expected = {
    'type': 'table',
    'content': [
      {
        'type': 'tableRow',
        'content': [
          {
            'type': 'tableHeader',
            'content': [
              {
                'type': 'paragraph',
                'content': []
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableCell',
            'content': [
              {
                'type': 'paragraph',
                'content': []
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Table # Has tr/th/td aliases', t => {
  const list = table(tr(th('header'), td('body')))

  const expected = {
    'type': 'table',
    'content': [
      {
        'type': 'tableRow',
        'content': [
          {
            'type': 'tableHeader',
            'content': [
              {
                'type': 'paragraph',
                'content': [
                  {
                    'type': 'text',
                    'text': 'header'
                  }
                ]
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          },
          {
            'type': 'tableCell',
            'content': [
              {
                'type': 'paragraph',
                'content': [
                  {
                    'type': 'text',
                    'text': 'body'
                  }
                ]
              }
            ],
            'attrs': {
              'colspan': 1,
              'rowspan': 1
            }
          }
        ]
      }
    ]
  }

  t.deepEqual(list, expected)
  t.end()
})

test('Table # Must be given tableRow', t => {
  t.throws(() => table(1), DocFormatError)
  t.throws(() => table([1]), DocFormatError)
  t.throws(() => table({}), DocFormatError)
  t.throws(() => table(null), DocFormatError)
  t.end()
})

test('Table # Row must be given string or node', t => {
  t.throws(() => tableRow(1), DocFormatError)
  t.throws(() => tableRow([1]), DocFormatError)
  t.throws(() => tableRow({}), DocFormatError)
  t.throws(() => tableRow(null), DocFormatError)
  t.end()
})

test('Table # Cell must be given string or node', t => {
  t.throws(() => tableCell(1), DocFormatError)
  t.throws(() => tableCell([1]), DocFormatError)
  t.throws(() => tableCell({}), DocFormatError)
  t.throws(() => tableCell(null), DocFormatError)
  t.end()
})

test('Table # Header must be given string or node', t => {
  t.throws(() => tableHeader(1), DocFormatError)
  t.throws(() => tableHeader([1]), DocFormatError)
  t.throws(() => tableHeader({}), DocFormatError)
  t.throws(() => tableHeader(null), DocFormatError)
  t.end()
})
