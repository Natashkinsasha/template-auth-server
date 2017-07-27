import util from 'util';

function AuthenticationError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.prototype.name = this.constructor.name;
    this.prototype.message = message;
}

util.inherits(AuthenticationError, Error);
export default AuthenticationError;
