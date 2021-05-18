const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;
const url = path.join(__dirname,"client/index.html");
const url2 = path.join(__dirname, "client/register.html");
const url3 = path.join(__dirname,'client/welcome.html');

const user = [
    {
    username: "Montero",
    password: "123"
    },
    {
    username:"Ramon",
    password:"123"
    },
    {
    username:"pepe",
    password:"123"
    }
];

//Middleware para archivos - recursos estaticos de imagen, script,css
app.use(express.static(path.join(__dirname,"client")));

// body-parser middleware - actuan sobre lo que interesa e ignoren el resto

// Pone contenido del form en un req.body
app.use(express.urlencoded({ extended: true }));
app.get('/', function(req,res){
    res.sendFile(url);
})

// Post que recibo datos del form y responde
app.post("/Login", function(req,res){
    if(req.body.username === '' || req.body.password === ''){
        res.send("<h1> Please verified your Data Login</h1>")
    }else{
        for (let i = 0; i < user.length; i++){

        if(user[i].username === req.body.username && user[i].password === req.body.password){
            res.sendFile(url3);
            console.log(req.body);
            }
        }
    }
});


// Register
app.get("/register", function (req, res) {
    res.sendFile(url2);
});

app.post("/register", function(req,res){
    let username = req.body.newUser;
    let pass = req.body.newPass;
    let rePass = req.body.newRePass;

    if(pass && rePass && username && pass === rePass){
        user.push({ username: username,password: pass });
        res.sendFile(url);
    }else if (username === username){
        res.sendFile(url2);
    }else{
        res.sendFile(url2);
    }
});

//Port
app.listen(PORT, function(){
    console.log(`Server listen on ${PORT}`)
})
