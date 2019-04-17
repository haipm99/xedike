const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
//api : /api/user/register
//desc: register a new user
//access: PUBLIC
router.post('/register', (req, res) => {
    const { email, password, fullname, phone, dateOfBirth } = req.body;
    console.log(req.body)
    console.log(email);
    User.findOne({ $or: [{ email }, { phone }] })
        .then(user => {
            //user exist
            if (user) {
                return res.status(400).json({ errors: "email or phone exist" });
            }
            // user not exist

            const newUser = new User(
                { email, password, fullname, phone, dateOfBirth });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return console.log("Error: ", err);
                }
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            return console.log("Error: ", err);
                        }
                        else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    if (user) {
                                        res.status(200).json(user);
                                    }
                                })
                                .catch(err => res.status(400).json(err));
                        }
                    })
                }
            });
        }).catch(err => { console.log(err) })
})
//api : /api/users/login
//desc: check login through email and password
//access: PUBLIC
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        console.log(isMatch)
                        if (isMatch) {
                            const payload = {
                                id: user._id,
                                email: user.email,
                                fullname: user.fullname,
                            }
                            jwt.sign(
                                payload,
                                "secretKey",
                                (err, token) => {
                                    res.status(200).json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    })
                                }
                            )
                        }
                        else {
                            res.status(404).json({ msg: "Wrong pass" });
                        }
                    })
            }
            else {
                res.status(404).json({ msg: "Wrong user" });
            }
        })
})
//api: api/users
//desc: get list user
//access: PUBLIC
router.get('/', (req, res) => {
    const arr = [];
    User.find().select('email fullname dateOfBirth')
        .then(users => {
            res.status(200).json({ result: users })
        }).catch(err => {
            console.log(err)
        });
});
//api: api/users/:userId
//desc: get information of 1 user by id
//access: PUBLIC
router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id).select('email fullname dateOfBirth').then(user => {
        if (!user) {
            res.status(404).json({ msg: 'User not found !' });
        }
        else {
            res.status(200).json({ result: user });
        }
    }).catch(err => { console.log(err) });
});
module.exports = router;
