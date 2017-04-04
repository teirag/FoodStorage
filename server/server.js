// include modules
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var express             = require('express');
var LocalStrategy       = require('passport-local').Strategy;
var passport            = require('passport');
var session             = require('express-session');
var path                = require('path');
// const peopleRoutes = require('./routes/people');

var app = express();
const users = {};
const storage = {};


passport.use('login', new LocalStrategy(function(username, password, done) {
    //done is a function that returns an error, then  the userobject
    if ((username && password) && !users[username]){
      users[username] = {
        'username': username,
        'password': password,
        pairs: {}
      };
      return done(null, { username: username, password: password, pairs: {} });
    }
    else {
      return done(null, users[username]);
    }
}));

// tell passport how to turn a user into serialized data that will be stored with the session
//user object is generated above
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(key, done) {
    done(null, users[key]);
});

// tell the express app what middleware to use
//from bytes to useable data.
app.use(bodyParser.urlencoded({ extended: true }));

//turns cookies into objects with key value pairs
app.use(cookieParser());

//keeps track of who is logged in.
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));

//runs req, res, and next through middleware (serialize, etc.)
app.use(passport.initialize());
app.use(passport.session());

//allow access to static files
app.use(express.static("www"));
//app.use(express.static("www/html/Family"));











app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/storage', function (req, res) {
  res.status(200).send(req.body);
});

app.post('/login', passport.authenticate('login'), function (req, res) {
    res.status(200).send(req.user);
    // res.send([{name: number},{name: "Mitch"},{name: "Bear"},{name: JSON.stringify(req.params)}]);
});

// app.use('/api/people', peopleRoutes)




app.get('/familys', function (req, res) {
    res.sendFile(path.join(__dirname, '../www/html/Family/', 'family.html'));
});






app.get('/recipes', function (req, res) {
  res.send('Hello World!')
});

app.get('/budget', function (req, res) {
  res.send('Hello World!')
});

app.post('/user', function(req, res) {
    res.send('Got a POST request on user page');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});













//app.use(bodyParser.json());

//app.use(express.static('./www'));


//app.use('/api', bodyParser.json());
//app.use('/api/people', peopleRoutes);
//
//app.post('/', function(req, res) {
//	res.json(req.body);
//});
//
//app.listen(3000, function () {
//  console.log('Example app listening on port 3000!')
//})
