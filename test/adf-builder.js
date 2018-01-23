import test from 'tape-catch'
import { doc, paragraph, strong, emoji } from '../src/index'

// adf-builder requires node 6.0.0 or greater
const nodeMajorVersion = parseInt(process.version.match(/\d+/)[0])
if (nodeMajorVersion >= 6) {
  const adf = require('adf-builder')

  test('adf-builder compatability # including adf-builder block node', t => {
    const actual = doc(new adf.Paragraph().strong('strong').text('text').toJSON(), emoji('grin'))

    const expected = doc(paragraph(strong('strong'), 'text'), emoji('grin'))

    t.deepEqual(actual, expected)
    t.end()
  })

  test('adf-builder compatability # including adf-builder inline nodes', t => {
    const actual = doc(paragraph(adf.strong('strong').toJSON(), 'text'), adf.emoji(':grin:').toJSON())

    const expected = doc(paragraph(strong('strong'), 'text'), emoji('grin'))

    t.deepEqual(actual, expected)
    t.end()
  })
}
