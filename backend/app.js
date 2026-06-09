
const express = require("express");
const moongose = require("mongoose");
const cors = require("cors");
const path = require("path");
require('dotenv').config();
const jwt =  require("jsonwebtoken")
const verify = require("./middleware/verifyToken");

const app =  express();
const userdb = require('./model/userdb');
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cors({
    origin: "https://mern-a-0owt.onrender.com",
    credentials: true 
}));

moongose.connect(process.env.MONGO_URL)

generateWebToken = (user)=>{
    const token = jwt.sign({id:user._id, email: user.email}, process.env.JWT_SECRET_TOKEN, {expiresIn:"15s"})
    return token;
}

generateRefreshToken = (user)=>{
    const token = jwt.sign({id:user._id, email: user.email}, process.env.JWT_REFRESH_TOKEN, {expiresIn:"1m"})
    return token;
}

app.get("/dashboard", (req,res)=>{
   return  res.send({status:200,"message":"dashboard success", success: true})
})

app.post("/add", async (req,res)=>{
    let {uname,pass , email, age, course} = req.body;
    let ckuser = await userdb.findOne({email:email});
    console.log(ckuser);
    
    if(!ckuser){
        
        let ans = new userdb({username:uname, password:pass,email:email,age:age,course:course})
        ans.save();
        res.send({message:"saved", success: true});
    }else{
        res.send({message:"user exist",success: false});
    }
})

app.get("/read", async (req,res)=>{
    let details =  await userdb.find();
    res.send({data: details})
})

app.get("/login", (req,res)=>{
    // res.sendFile(path.join(__dirname, "vite-project"))
})

app.post("/checkLogin", async (req,res)=>{
    
    const {loginname, loginpass} = req.body;
    console.log(userdb)
    let checkUser = await userdb.findOne({ email:loginname });
   
    if(!checkUser){
        return res.send({ success: false, message: "User not found" });
    }
    let checkPass = await userdb.findOne({ password:loginpass });
    if(!checkPass){
        return res.send({ success: false, message: "Password mismatch" });
    }else{
        let accessToken = generateWebToken(checkPass);
        let refreshToken = generateRefreshToken(checkPass);

        checkUser.refreshToken = refreshToken;
        checkUser.save();

        res.send({
        status: 201,
        success: true,
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: { id: checkUser._id, username: checkUser.username, email: checkUser.email }
        });  
    }
})

app.post("/deleteUser/:id", async (req,res)=>{
    let id =  req.params.id;
    await userdb.findByIdAndDelete(id).exec();
    res.send({"message":"User deleted", success: true})
})

app.get("/users/:id", async (req,res)=>{
    let id = req.params.id;
    const result = await userdb.findOne({_id: id});
    return res.send({data: result});
})

app.put("/updateUser/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const id  = req.params.id;
    
    const updatedUser = await userdb.findByIdAndUpdate(id, req.body);
    console.log(updatedUser)
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.post("/refresh", (req,res)=>{
    console.log("re generate accesstoke using refreshtoekn")
    let refreshToken =  req.body.refreshToken;

    let check_RToken = userdb.findOne({refreshToken});
    
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err,decoded)=>{
        if(err) res.send({status:"401",message: "refresh token expired"})
            console.log(decoded)
            if(decoded){
                let accessToken = generateWebToken(check_RToken);
                console.log(accessToken)
                res.send({status: 201, data: accessToken});
            }
    })
})

app.listen(3000);
