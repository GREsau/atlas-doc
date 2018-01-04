import { asInlineNode } from './inlineNodeUtils'

export default function paragraph (...content) {
  return {
    type: 'paragraph',
    content: content.map(asInlineNode)
  }
}
