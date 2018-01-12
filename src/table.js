import { asBlockNodesWithMerging } from './blockNodeUtils'
import DocFormatError from './DocFormatError'
import paragraph from './paragraph'

// TODO can table/Row/Cell/Header be empty? No!
// TODO attrs are currently ignored by Stride, but colspan and rowspan are still required

export function table (...rows) {
  if (rows.length === 0) {
    throw new DocFormatError('table can not be empty')
  }
  for (const row of rows) {
    if (!row || row.type !== 'tableRow') {
      throw new DocFormatError(`table can only contain tableRow nodes, but found: ${JSON.stringify(row)}`)
    }
  }
  return {
    type: 'table',
    content: rows
  }
}

export function tableRow (...cells) {
  if (cells.length === 0) {
    throw new DocFormatError('tableRow can not be empty')
  }
  return {
    type: 'tableRow',
    content: cells.map(asTableCell)
  }
}

const cellAttrs = { colspan: 1, rowspan: 1 }

export function tableCell (...content) {
  return {
    type: 'tableCell',
    content: content.length ? asBlockNodesWithMerging(content) : [paragraph()],
    attrs: cellAttrs
  }
}

export function tableHeader (...content) {
  return {
    type: 'tableHeader',
    content: content.length ? asBlockNodesWithMerging(content) : [paragraph()],
    attrs: cellAttrs
  }
}

function asTableCell (item) {
  if (item && (item.type === 'tableCell' || item.type === 'tableHeader')) {
    return item
  }
  return tableCell(item)
}
