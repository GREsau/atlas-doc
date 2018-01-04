
export default function mention (userId) {
  return {
    type: 'mention',
    attrs: {
      id: userId
    }
  }
}
