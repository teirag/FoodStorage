const dbPromise = require('../database');

exports.add_new_recipe = function(username, new_recipe)
{
	console.log("controller gariet hi boo");
	console.log(new_recipe);
	return dbPromise
		.then(db => {
			// Get the collection
			var col = db.collection('users');
			return col.update(
				{"user.username": username},{$push: {recipes: {new_recipe}}}
			);
	});
}; 

//db.users.update({"user.username":"Mitchell"},{$push: {storageUnits: {"name": "new", "items":[]}}})