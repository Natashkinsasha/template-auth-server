

function UserService({User}) {

    this.findByUsername = (username) => {
        return User.findOne({username}).lean().exec();
    };

    this.create = ({username, password}) => {
        return new User({username, password}).save().then((user) => user.toObject());
    };

    this.findOrCreateFacebookAccount = (user) => {
        return User
            .findOne({facebookId: user.facebookId})
            .lean()
            .exec()
            .then((user) => {
                console.log(111111, user)
                if (user) {
                    return User.findOneAndUpdate(user).lean().exec();
                }
                return new User(user).save().then((user) => user.toObject());
            })
    };
}

export default UserService;
