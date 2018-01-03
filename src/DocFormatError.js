
export default function DocFormatError (...args) {
  Error.apply(this, args)
}

DocFormatError.prototype = Object.create(Error.prototype)
DocFormatError.prototype.constructor = DocFormatError
DocFormatError.prototype.name = 'DocFormatError'
