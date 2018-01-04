
export default function DocFormatError (message, ...rest) {
  Error.call(this, message, ...rest)

  this.message = message

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, DocFormatError)
  }
}

DocFormatError.prototype = Object.create(Error.prototype)
DocFormatError.prototype.constructor = DocFormatError
DocFormatError.prototype.name = 'DocFormatError'
