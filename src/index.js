import { topLevelNode, paragraph } from './topLevelNodes'
export { paragraph, bulletList } from './topLevelNodes'
export { code, color, emoji, emphasis, hardBreak, link, strike, strong, subscript, superscript, text, underline } from './inlineNodes'
export { default as DocFormatError } from './DocFormatError'

export function doc (...content) {
  return {
    version: 1,
    type: 'doc',
    content: content.length ? content.map(topLevelNode) : [paragraph()]
  }
}
