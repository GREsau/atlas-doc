import { asBlockNodesWithMerging } from './blockNodeUtils'

export default function blockQuote (...content) {
  // TODO can blockQuote be empty?
  return {
    type: 'blockQuote',
    content: asBlockNodesWithMerging(content)
  }
}
