//just copied from recipe.js, still need to edit
const express = require('express');
const recipe = require('../controller/recipe');
const router = express.Router();

router.post('/recipe', function(req, res){
	
    const person = people.addRecipe(req.body);
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