import util from 'util';

function AuthorizationError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.prototype.name = this.constructor.name;
    this.prototype.message = message;
}

util.inherits(AuthorizationError, Error);
export default AuthorizationError;
