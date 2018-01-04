
export default function DocFormatError (message, ...rest) {
  Error.call(this, message, ...rest)

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, DocFormatError)
  }

  this.message = message
}

DocFormatError.prototype = Object.create(Error.prototype)
DocFormatError.prototype.constructor = DocFormatError
DocFormatError.prototype.name = 'DocFormatError'
