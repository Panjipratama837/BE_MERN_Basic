const db = require('../models');
const login = db.login;


exports.login = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    login.findOne({ username: req.body.username, password: req.body.password })
        .then(result => {
            if (!result)
                res.status(404).send({ message: 'Not found Credential with username ' + req.body.username });
            else res.send(result);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: 'Failed Login' });
        });
}

exports.register = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // find by username
    login.findOne({ username: req.body.username })
        .then(result => {
            if (result) {
                res.status(400).send({ message: 'Username already exist' });
            } else {
                const newLogin = new login({
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role
                });

                newLogin.save(newLogin)
                    .then(result => {
                        res.send({ message: 'Success add User !!' });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the User.'
                        });
                    });
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: 'Error retrieving User with username=' });
        });
}

exports.findAll = (req, res) => {
    login.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving posts.'
            });
        });
}
