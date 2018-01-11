import test from 'tape-catch'
import { doc, paragraph, strong, emoji } from '../src/index'
import { Paragraph as AParagraph, strong as astrong, emoji as aemoji } from 'adf-builder'

test('adf-builder compatability # including adf-builder block node', t => {
  const actual = doc(new AParagraph().strong('strong').text('text').toJSON(), emoji('grin'))

  const expected = doc(paragraph(strong('strong'), 'text'), emoji('grin'))

  t.deepEqual(actual, expected)
  t.end()
})

test('adf-builder compatability # including adf-builder inline nodes', t => {
  const actual = doc(paragraph(astrong('strong').toJSON(), 'text'), aemoji(':grin:').toJSON())

  const expected = doc(paragraph(strong('strong'), 'text'), emoji('grin'))

  t.deepEqual(actual, expected)
  t.end()
})
