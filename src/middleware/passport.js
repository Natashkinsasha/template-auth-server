import passport from 'passport';
import config from 'config';
import crypto from 'crypto';

import AuthenticationError from '../error/AuthenticationError';

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = config.get('jwt.secret');


function passportAuthenticate({userService}) {

    passport.use({session: false}, new LocalStrategy((username, password, done) => {
            return userService
                .findByUsername(username)
                .then((user) => {
                    if (!user && !checkPassword(password, user.passwordHash, user.salt)) {
                        return done(new AuthenticationError());
                    }
                    return done(null, {username: user.username, roles: user.roles});
                })
                .catch(done)
        })
    );

    passport.use(new FacebookStrategy({
            clientID: config.get('FACEBOOK_APP_ID'),
            clientSecret: config.get('FACEBOOK_APP_SECRET'),
            callbackURL: `/${config.get("version")}/api/auth/facebook/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            return userService
                .findOrCreateFacebookAccount({facebookId: profile.id})
                .then((user) => (done(null, {username: user.username, roles: user.roles})))
                .catch(done);
        }
    ));


    return passport;
}

function checkPassword(password, passwordHash, salt) {
    if (!password) return false;
    if (!passwordHash) return false;
    return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1') === passwordHash;
}


export default passportAuthenticate;


