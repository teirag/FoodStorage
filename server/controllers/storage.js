//just copied from recipe.js, still need to edit
// this is our example of basically the people.js controller we have, but using an actual database
const dbPromise = require('../database');

exports.add_storage_unit = function(username, password, unit_name)
{
	console.log(username);
	console.log(password);
	console.log(unit_name);
	return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection('user');
          return col.findAndModify(
						{"user.username":username, "user.password":password },
						[["_id",'asc']],
						{$addToSet: {"storageUnits": {"name": unit_name, "items":[]}}},
						{new: true},
						function(err, doc){
							console.log(doc);
							console.log('find and modified ' +err);
						}
					);//returns a promise
        });
}; 
//db.users.update({"user.username":"Mitchell"},{$push: {storageUnits: {"name": "new", "items":[]}}})