
const dbPromise = require('../database');


//ingredients needs to be an array of the ingredients with embedded documents that contain the ingredient name and amount
exports.addRecipe = function(title, instructions, ingredients)
{
    const title = {
        'title': title,
        'instructions': instructions,
        'ingredients': ingredients
    };
    
    return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection(username);
          return col.insertOne(o);//returns a promise
        });
}; 