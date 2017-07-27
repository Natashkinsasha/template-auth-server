import Promise from 'bluebird';
import config from 'config';

function AuthController({jwtRedis, userService}) {

    const secret = config.get('jwt.secret');

    this.registration = (req, res, next) => {
        return userService
            .create({username: req.body.username, password: req.body.password})
            .then((user) => {
                return Promise
                    .all([
                        user,
                        jwtRedis
                            .sign({}, secret),
                        jwtRedis
                            .sign({}, secret)
                    ])
            })
            .spread((user, accessToken, refreshToken) => {
                return res.status(200).json({user, accessToken, refreshToken});
            })
            .catch(next);
    };

    this.login = (req, res, next) => {
        return Promise
            .all([
                jwtRedis
                    .sign({}, secret),
                jwtRedis
                    .sign({}, secret),
            ])
            .spread((accessToken, refreshToken) => {
                return res.status(200).json({accessToken, refreshToken});
            })
            .catch(next);
    };

    this.logout = (req, res, next) => {
        return jwtRedis
            .destroyById(req.user.id)
            .then(() => {
                return res.status(200).end();
            })
            .catch(next);
    };
}

export default AuthController;