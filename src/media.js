import DocFormatError from './DocFormatError'

const types = ['file', 'link']

export default function media (type = 'file', id, collection) {
  if (collection === undefined) {
    collection = id
    id = type
    type = 'file'
  }
  if (types.indexOf(type) === -1) {
    throw new DocFormatError(`Invalid media type '${type}' - must be one of ${types.join(',')}`)
  }
  return {
    type: 'media',
    attrs: { id, collection, type }
  }
}

for (const type of types) {
  media[type] = (id, collection) => media(type, id, collection)
}
