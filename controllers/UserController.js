
const User = require('../models/user');

exports.postUsers = function(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    user.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'User registered succesfully!' });
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};