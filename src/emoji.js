
export default function emoji (shortName, altText = null) {
  if (!/^:.*:$/.test(shortName)) {
    shortName = `:${shortName}:`
  }
  return {
    type: 'emoji',
    attrs: altText ? { shortName, text: altText } : { shortName }
  }
}
