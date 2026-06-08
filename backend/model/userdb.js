 const moongose =  require("mongoose");

 const schema = new moongose.Schema({
    username:{ type:String, required:true},
    email:{type:String},
    password:{type:String},
    age:{type:String},
    course:{type:String},
    refreshToken:{type: String}
 })

 const usermodel = moongose.model("react_users",schema);
 
 module.exports = usermodel;