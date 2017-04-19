const dbPromise = require('../database');

exports.add_new_recipe = function(username, new_recipe)
{
	console.log("controller gariet hi boo");
	console.log("adding recipe = " + new_recipe);
	//console.log("body " + new_recipe.name + " " + new_recipe.ingredients[0].name + " " + new_recipe.ingredients[0].amount + " " + new_recipe.instructions);

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