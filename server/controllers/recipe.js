const dbPromise = require('../database');

exports.addRecipe = function(username, title, ingredients, instructions)
{
    const title = {
        'title': title,
        'instructions': instructions,
        'ingredients': ingredients
    };
    
    return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection('users');
					return col.update(
						{"user.username": username},{$push: {recipes: {"name": title, "ingredients", ingredients, "instructions": instructions}}
						}
					);
        });
}; 

//db.users.update({"user.username":"Mitchell"},{$push: {storageUnits: {"name": "new", "items":[]}}})