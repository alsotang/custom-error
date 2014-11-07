function ErrorMaker(name, ParentError) {
  var NewError = function NewError(message) {
    if (!(this instanceof NewError))
      return new NewError(message)

    // get stack
    try {
      throw new Error(message)
    }
    catch (err) {
      err.name = name
      this.stack = err.stack
    }

    // A bit of a hack to get the error message to show correctly
    if (this.stack && this.stack.substr(0, this.name.length) !== this.name) {
      var errorMessage = name
      if (message) {
        errorMessage += ': ' + message 
      }
      this.stack = errorMessage + this.stack.slice(this.stack.indexOf('\n'))
    }

    this.message = message || ''
    this.name = name
  }

  NewError.prototype = new (ParentError || Error)()
  NewError.prototype.constructor = NewError
  NewError.prototype.inspect = function() {
    return this.message
      ? '[' + name + ': ' + this.message + ']'
      : '[' + name + ']'
  }
  NewError.prototype.name = name

  return NewError
}

module.exports = ErrorMaker
