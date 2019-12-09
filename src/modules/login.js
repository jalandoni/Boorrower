const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../api/AdminAccount')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

module.exports.adduser = (req, res) => {
    var user = new User(req.body)
    user.password = bcrypt.hashSync(user.password, saltRounds);
    user.save(function(err, resp) {
        if (err) {
            return res.send("error on saving!!")
        } else {
            return res.send({
                sms: "Successfully Saved",
                user: resp
            })
        }
    })
}

module.exports.getuser = (req, res) => {
    let username = req.body.username
    User.findOne({ username: username }, function(err, data) {
        if (err) {
            return res.send(err)
        }
        if (data == null) {
            return res.send({ sms: "Username Not Found", user: data })
        } else {
            return res.send({ sms: "Success", user: data })
        }
    })
}

module.exports.deleteuser = (req, res) => {
        User.remove({}, function(err, data) {
            if (err) {
                return res.send(err)
            } else {
                return res.send(data)
            }
        })
    }
module.exports.login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({ username: username }, function(err, data) {
        if (err) {
            return res.send(err)
        }
        if (data != null) {
            var match = bcrypt.compareSync(password, data.password)
            if (match) {
                var acc_token = jwt.sign({ data }, "token1234", { expiresIn: "12h" })
                return res.send({
                    status: true,
                    auth: true,
                    user: data,
                    token: acc_token,
                    sms: "success"
                })
            } else {
                return res.send({
                    status: false,
                    auth: false,
                    sms: "Incorrect Password!!",
                    token: null,
                    user: null
                })
            }
        }

        return res.send({
            status: false,
            auth: false,
            sms: "Username Not Found!!"
        })
    })
}
module.exports = router;