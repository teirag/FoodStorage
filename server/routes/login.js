//just copied from recipe.js, still need to edit
const express           = require('express');
var login             = require('../controllers/login');
const router            = express.Router();
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;


passport.use('login', new LocalStrategy(function(username, password, done) {
    
    login.findPerson(username, password)
        .then(dbResult => {
            if(dbResult.length > 0){
                if(password === dbResult[0].user.password){
                    console.log(dbResult[0].user.password);
                    //done is a function that returns an error, then  the userobject
                    return done(null, dbResult[0].user);
                }

            }
            else{
                login.addPerson(username, password)
                    .then(addResult => {
                        if(addResult){
                            login.findPerson(username, password)
                                .then(findResult => {
                                    if(findResult.length > 0){
                                        if(password === findResult[0].user.password){
                                            console.log(findResult[0].user.password);
                                            //done is a function that returns an error, then  the userobject
                                            return done(null, findResult[0].user);
                                        }
                                    }
                                });
                        }
                    });
            }
    });
    //get user from database here, if doesn't exist, enter user and return their info, else, return their info
    
    
    
}));

// tell passport how to turn a user into serialized data that will be stored with the session
//user object is generated above
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(username, done) {
    done(null, username);
});

router.post('/', function (req, res) {
//    console.log("in");
//    const user = req.user;
//    login.addPerson(user.username, user.password)
//        .then(dbResult => {
//            //whatever
//            res.status(200).send("You created an account");
//        })
    // res.send([{name: number},{name: "Mitch"},{name: "Bear"},{name: JSON.stringify(req.params)}]);
});

router.post('/login', passport.authenticate('login'), function(req, res) {
    var username = req.body.username
    var password = req.body.password;
    res.status(200).send(username);
//    login.addPerson(username, password)
//        .then(dbResult => {
//            res.status(200).send("You created an account");
//        });
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
