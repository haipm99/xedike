const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const {User} = require('../../models/user');
//api : /api/user/register
//desc: register a new user
//access: PUBLIC
router.post('/register', (req, res) => {
    const { email, password, fullname, phone, dateOfBirth } = req.body;
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
            bcrypt.genSalt(10,(err,salt)=>{
                if(err){
                    return console.log("Error: ",err);
                }
                else{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err){
                            return console.log("Error: ",err);
                        }
                        else{
                            newUser.password = hash;
                            newUser.save()
                            .then(user => {
                                if(user){
                                    res.status(200).json(user);
                                }
                            })
                            .catch(err => res.status(400).json(err));
                        }
                    })
                }
            });
        }).catch(err => {console.log(err)})
})


module.exports = router;
