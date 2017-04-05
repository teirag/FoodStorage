//just copied from recipe.js, still need to edit
const express = require('express');
const login = require('../controllers/login');
const router = express.Router();

passport.use('login', new LocalStrategy(function(username, password, done) {
    //done is a function that returns an error, then  the userobject
    if ((username && password) && !users[username]){
      users[username] = {
        'username':username,
        'password':password,
        keys: {}
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

router.post('/', passport.authenticate('login'), function (req, res) {
    const user = req.user;
    login.addPerson(user.username, user.password)
        .then(dbResult => {
            //whatever
            res.status(200).send("You created an account");
        })
    // res.send([{name: number},{name: "Mitch"},{name: "Bear"},{name: JSON.stringify(req.params)}]);
});

router.post('/login', function(req, res) {
    const userStuff = login.addPerson(req.body);
    console.log(userStuff);
    res.json(userStuff);
});

router.post('/', function(req, res){
    const person = people.addPerson(req.body);
    res.json(person);
});

router.get('/', function(req, res){
    people.getPeople()
        .then(result => {
            // format result for return http data
            res.json(result);
        })
   res.json(people.getPeople()).then;
});

router.put('/:personId', function(req, res){
    res.json(people.setPerson(req.params.personId, req.body));
});

module.exports = router;
