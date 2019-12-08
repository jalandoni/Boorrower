const express = require("express");
const app = express();
const Admin = require("../AdminAccount");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const update = (req, res) => {
  console.log(req.body.data.newusername)
  const username = req.body.data.username;
  const newusername = req.body.data.newusername;
  const newpassword = bcrypt.hashSync(req.body.data.newpassword, 10)
  const test = async function () {
    const update = await Admin.updateAdmin(username, newusername, newpassword)
    console.log(await Admin.getLastAccount())
    res.send({data : await Admin.getLastAccount()})
  }
  test();
}

module.exports = {update}