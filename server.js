var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);
var admin = require("firebase-admin");


var firebaseCredential = require(__dirname + '/private/serviceCredential.json')

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
  databaseURL: "https://beastchat-7a801.firebaseio.com"
});

var accountRequests = require('./firebase/account-services');

var friendRequests = require('./firebase/friend-services');

accountRequests.userAccountRequests(io);
friendRequests.userFriendsRequests(io);


http.listen(3000,()=>{
  console.log('Server is listening on port 3000');
});
