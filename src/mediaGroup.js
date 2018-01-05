import DocFormatError from './DocFormatError'

export default function mediaGroup (...media) {
  if (media.length === 0) {
    throw new DocFormatError('mediaGroup can not be empty')
  }
  const nonMedia = media.filter(m => !(m.type && m.type === 'media'))
  if (nonMedia.length) {
    throw new DocFormatError(`mediaGroup can only contain media nodes, but found: ${JSON.stringify(nonMedia[0])}`)
  }
  return {
    type: 'mediaGroup',
    content: media
  }
}
