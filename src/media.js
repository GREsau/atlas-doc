import DocFormatError from './DocFormatError'

export default function media (id, collection, type = 'file') {
  if (type !== 'file' && type !== 'link') {
    throw new DocFormatError(`Invalid media type '${type}' - must be 'file' or 'link'`)
  }
  return {
    type: 'media',
    attrs: { id, collection, type }
  }
}
