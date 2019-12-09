const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

AdminSchema.statics.addPerson = async function (admin){
    var Admin = new this(admin);
    var result =  await Admin.save(admin);
    return result;
 }
 
 AdminSchema.statics.getLastAccount = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

 AdminSchema.statics.getByUsernameAndGetPassword = async function(username) {
   return await this.findOne({"username" : username}, {_id:0, password:1});
}

AdminSchema.statics.getByUsername = async function(username) {
    return await this.findOne({"username" : username});
 }
 
 AdminSchema.statics.getAccount = async function(username) {
    return await this.findOne({"username" : username});
 }
 
 AdminSchema.statics.updateAdmin = async function(username, newusername, newpassword) {
   return await this.updateOne({"username" : username}, {$set : {"username" : newusername, "password" : newpassword}});
}

const AdminAccnt = mongoose.model("AdminAccnt", AdminSchema);

module.exports = AdminAccnt;