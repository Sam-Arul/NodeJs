const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userData = [];
app.post('/user',(req,res)=>{
    console.log(req.body);
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if (err) throw err;
        console.log(salt);
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
            if(err) throw err;
            console.log(hash);
            userData.push(req.body);
            userData[0].password = hash
            res.json({
                message : "received"
            })
        })
    })
  

})
app.get('/user',(req,res)=>{
    res.json({
        object : userData
    })
})

app.put('/user/:id',(req,res)=>{
    console.log(req.params.id);
    userData[parseInt(req.params.id)-1].name = req.body.name;
    userData[parseInt(req.params.id)-1].email = req.body.email;
    userData[parseInt(req.params.id)-1].password = req.body.password;
    res.json({
        message : "updated"
    })
})

app.delete('/user/:id',(req,res)=>{
    let deleteid = parseInt(req.params.id);
    userData.splice(deleteid-1,1);
    res.send("success");
})

app.listen(3000,()=>{
    console.log("server is ruuning in 3000");
})
