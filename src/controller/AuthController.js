function AuthController({jwtRedis}) {

    this.registration = (req, res, next) => {
        return Promise
            .all([
                jwtRedis
                    .sign(),
                jwtRedis
                    .sign()
            ])
            .spread((accessToken, refreshToken) => {
                return res.status(200).json({accessToken, refreshToken});
            })
            .catch(next);
    };

    this.login = (req, res, next) => {
        return Promise
            .all([
                jwtRedis
                    .sign(),
                jwtRedis
                    .sign()
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