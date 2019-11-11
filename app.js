var express = require("express");
var session = require('express-session');

var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user')

var app = express();

app.use(session({secret: 'my-secret'}));
var sessions;


app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());

app.post('/signin', function (req, res) {
    sessions=req.session;
    var user_name=req.body.email;
    var password=req.body.password;
    user.validateSignIn(user_name,password,function(result){
      if(result){
        sessions.username = user_name;
        res.send('success');
      }
    });
  })

app.post('/signup', function (req, res) {
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;

  if(name && email && password){
  	user.signup(name, email, password)
  }
  else{
  	res.send('Failure');
  }
})

app.listen(3000,function(){
    console.log("Started listening on port", 3000);
})