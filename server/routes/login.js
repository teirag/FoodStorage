//just copied from recipe.js, still need to edit
const express = require('express');
const login = require('../controllers/login');
const router = express.Router();

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
