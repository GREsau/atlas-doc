import { asBlockNodesWithMerging } from './blockNodeUtils'

export default function blockquote (...content) {
  // TODO can blockquote be empty? No!
  return {
    type: 'blockquote',
    content: asBlockNodesWithMerging(content)
  }
}
