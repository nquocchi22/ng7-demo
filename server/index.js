const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const url = 'mongodb://localhost:27017/blog';

mongoose.connect(url, { useNewUrlParser: true }).then(
  () => { console.log("connect to mongodb successfully."); },
  err => { console.console.error("connect to mongodb failure.");  }
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
const userAddress = mongoose.Schema({
  street: String,
  suite:String,
  city:String,
  zipcode:String
});
const userCompany = mongoose.Schema({
  name:String,
  catchPhrase:String,
  bs:String
});
const userSchema = mongoose.Schema({
    id: Number,
    name:String,
    username:String,
    email: String,
    address: userAddress,
    phone:String,
    website:String,
    company: userCompany
});

app.get('/api/users', (req, res) => {
  let Users = mongoose.model('blogs', userSchema);
  Users.findOne({name:"users"}, {"_id": false, 'users': true}, (err, data) =>{
    if (err) return res.status(500).send(err);
    //manipulation on result data
    var user = JSON.parse( JSON.stringify( data ) );
    return res.status(200).send(user.users);
  });
});

app.get('/api/posts', (req, res) => {
  let Users = mongoose.model('blogs', userSchema);
  Users.findOne({name:"posts"}, {"_id": false, 'posts': true}, (err, data) =>{
    if (err) return res.status(500).send(err);
    //manipulation on result data
    var post = JSON.parse( JSON.stringify( data ) );
    return res.status(200).send(post.posts);
  });
});

app.get('/api/user/:id', (req, res) => {
  let _id = Number(req.params.id);
  let Users = mongoose.model('blogs', userSchema);
  Users.findOne({ "users.id": _id },
    { users:
      { $elemMatch:
         {
           id: _id
         }
      }
    }, (err, data) => {
    if (err) return res.status(500).send(err);
    //manipulation on result data
    var user = JSON.parse( JSON.stringify( data ) );
    if(user.users.length > 0) {
      return res.status(200).send(user.users[0]);
    }
    return res.status(200).send({});
  });

});


app.listen(3000, () => console.log('blog server running on port 3000!'))
