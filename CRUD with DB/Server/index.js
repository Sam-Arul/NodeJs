const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoClient = require("mongodb");
const saltRounds = 10;

const url = "mongodb://localhost:27017";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Connect db
//open db
//perform
//close db
app.post('/user', (req, res) => {

    console.log(req.body);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    mongoClient.connect(url, (err, client) => {
        if (err) throw err;
        const db = client.db('demodb');
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
           
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
               

                userData.password = hash
                db.collection('user').insertOne(userData, (err, data) => {
                    if (err) throw err;
                    client.close();
                    res.json({
                        message: "received"
                    })
                })
            });


        })


    })


})
app.get('/user', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err;
        const db = client.db('demodb');

        db.collection('user').find().toArray((err, data) => {
            if (err) throw err;
            client.close();
            res.json({
                object: data
            })
        })
    })

})

app.put('/user/:name', (req, res) => {
    
    

    mongoClient.connect(url, (err, client) => {
        if (err) throw err;
        const db = client.db('demodb');
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err;
           
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                

                
                db.collection('user').updateOne({ name: req.params.name }, { $set: { name: req.body.name, email: req.body.email,password:hash } }, (err, data) => {
                    if (err) throw err;
                    client.close();
                    res.json({
                        message: "updated"
                    })
                })
            })

        })
    })
        })

        app.delete('/user/:name', (req, res) => {
            mongoClient.connect(url,(err,client)=>{
                if(err) throw err;
                const db= client.db('demodb');
                db.collection('user').deleteOne({name:req.params.name},(err,data)=>{
                    if(err) throw err;
                    client.close();
                    res.json({
                        message : "Deleted"
                    })
                })
            })
            
           
        })

        app.listen(3000, () => {
            console.log("server is ruuning in 3000");
        })
