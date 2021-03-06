import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        default: [],
    }
});


User
    .virtual('password')
    .set((password) => {
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    });

/*User
    .virtual('id')
    .get(() => {
        return this._id.toString();
    });*/



export default mongoose.model('user', User);


