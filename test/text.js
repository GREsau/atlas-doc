import test from 'tape-catch'
import { code, color, emphasis, link, strike, strong, subscript, superscript, text, underline, DocFormatError, paragraph, hardBreak } from '../src/index'

test('Text # plain text', t => {
  const node = text('plain text')

  const expected = {
    'type': 'text',
    'text': 'plain text'
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # code', t => {
  const node = code('code')

  const expected = {
    'type': 'text',
    'text': 'code',
    'marks': [
      {
        'type': 'code'
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # color', t => {
  const node = color('color', '#C0ffee')

  const expected = {
    'type': 'text',
    'text': 'color',
    'marks': [
      {
        'type': 'textColor',
        'attrs': {
          'color': '#c0ffee'
        }
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # emphasis', t => {
  const node = emphasis('emphasis')

  const expected = {
    'type': 'text',
    'text': 'emphasis',
    'marks': [
      {
        'type': 'em'
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # link', t => {
  const node = link('link', 'http://example.com')

  const expected = {
    'type': 'text',
    'text': 'link',
    'marks': [
      {
        'type': 'link',
        'attrs': {
          'href': 'http://example.com'
        }
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # strike', t => {
  const node = strike('strike')

  const expected = {
    'type': 'text',
    'text': 'strike',
    'marks': [
      {
        'type': 'strike'
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # strong', t => {
  const node = strong('strong')

  const expected = {
    'type': 'text',
    'text': 'strong',
    'marks': [
      {
        'type': 'strong'
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # subscript', t => {
  const node = subscript('subscript')

  const expected = {
    'type': 'text',
    'text': 'subscript',
    'marks': [
      {
        'type': 'subsup',
        'attrs': {
          'type': 'sub'
        }
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # superscript', t => {
  const node = superscript('superscript')

  const expected = {
    'type': 'text',
    'text': 'superscript',
    'marks': [
      {
        'type': 'subsup',
        'attrs': {
          'type': 'sup'
        }
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # underline', t => {
  const node = underline('underline')

  const expected = {
    'type': 'text',
    'text': 'underline',
    'marks': [
      {
        'type': 'underline'
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # combined marks', t => {
  const node = underline(superscript(strong(strike(emphasis(color(link('content', 'http://example.com'), '#123456'))))))

  const expected = {
    'type': 'text',
    'text': 'content',
    'marks': [
      {
        'type': 'link',
        'attrs': {
          'href': 'http://example.com'
        }
      },
      {
        'type': 'textColor',
        'attrs': {
          'color': '#123456'
        }
      },
      {
        'type': 'em'
      },
      {
        'type': 'strike'
      },
      {
        'type': 'strong'
      },
      {
        'type': 'subsup',
        'attrs': {
          'type': 'sup'
        }
      },
      {
        'type': 'underline'
      }
    ]
  }

  t.deepEqual(node, expected)
  t.end()
})

test('Text # color must be 6-char hex code', t => {
  t.throws(() => color('red'), DocFormatError)
  t.throws(() => color('123456'), DocFormatError)
  t.throws(() => color('#123'), DocFormatError)
  t.end()
})

test('Text # must be given string or text node', t => {
  t.throws(() => code(), DocFormatError)
  t.throws(() => emphasis(1), DocFormatError)
  t.throws(() => strike([]), DocFormatError)
  t.throws(() => strong({}), DocFormatError)
  t.throws(() => subscript(null), DocFormatError)
  t.throws(() => superscript(paragraph('text')), DocFormatError)
  t.throws(() => underline(hardBreak()), DocFormatError)
  t.end()
})
