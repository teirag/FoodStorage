//just copied from recipe.js, still need to edit
const express = require('express');
const storage = require('../controllers/storage');
const router = express.Router();

router.post('/add_storage_unit', function(req, res){
//	console.log(req.body);
	storage.add_storage_unit(req.user[0].user.username, req.user[0].user.password, req.body.storage_unit)
			.then(data => {
			console.log(data);
				res.sendStatus(200);
			})
			.catch(err => {
			console.log(err);
			});
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