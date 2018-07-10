var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose  = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcrypt');
//var rip  = require('./route/ripRout');
var jwt = require('jsonwebtoken');
var User = require('./lib/models/user')
var userRoutes = require('./lib/routes/userRoutes')
app.use(bodyparser({limit: '50mb'}))
app.use(bodyparser.urlencoded({limit: '50mb'}));
app.use(bodyparser());
app.use(bodyparser.json());
mongoose.connect('mongodb://localhost/Like-Minded');
app.use('/user', userRoutes);
console.log('this is my')
app.use(cors());



// app.use('/exchanges/api/v1/address', function(req, res, next){
//     console.log('****/rip route required UserId in all apis uses MIDDLEWARE****');
//       var token =  req.headers["authorization"];
//     if (token) {
//       try {
//         token = token.split(' ')[1];
//
//         var decoded = jwt.verify(token,'secret',function (err,decoded){
//
//           if(err){
//
//             return res.json({status :400, message: 'Authorization token is not valid',error : err});
//           }else {
//             console.log(decoded,"decoded token")
//             req.user = decoded;
//             next();
//           }
//         });
//       } catch (e) {
//         return res.send({status:400, message: 'Authorization token is not valid'});
//       }
//     } else {
//       console.log("No token");
//       return res.send({status:400,message: 'Authorization token missing in request.'});
//    }
// })
//
// app.use('/exchanges/api/v1/address', addressRoutes);



app.listen(5000,function(req,res){
  console.log("port 5000 is Running......................... ");
})
module.exports = app;
