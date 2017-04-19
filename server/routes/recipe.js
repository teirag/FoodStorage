//just copied from recipe.js, still need to edit
const express = require('express');
const recipe = require('../controllers/recipe');
const router = express.Router();

router.post('/add_new_recipe', function(req, res){
	console.log("router hi boo");
	//console.log("array " + req.body.ingredients[0].name + " " + req.body.ingredients[0].amount);
	recipe.add_new_recipe(req.user[0].user.username, req.body)
		.then(data => {
						login.findPerson(req.user[0].user.username, req.user[0].user.password)
						.then(result => {
							if(result){
								res.status(200).send(result);
							}
						})
						.catch(err => {
						
					});

			//console.log(data);
			res.sendStatus(200);
		})
	.catch(err => {
		//console.log(err);
	})
});

//router.get('/', function(req, res){
//    people.getPeople()
//        .then(result => {
//            // format result for return http data
//            res.json(result);
//        })
//   res.json(people.getPeople()).then;
//});
//
//router.put('/:personId', function(req, res){
//    res.json(people.setPerson(req.params.personId, req.body));
//});

module.exports = router;