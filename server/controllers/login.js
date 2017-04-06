// this is our example of basically the people.js controller we have, but using an actual database
const dbPromise = require('../database');

exports.addItem = function(title, description)
{
    const o = {
        title: title,
        description: description
    };

    return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection('tasks');
          return col.insertOne(o);//returns a promise
        });
};

exports.addPerson = function(username, password) {
  var userdata = {
      'username': username,
      'password': password
  };
    
    var storagedata = [
//        {
//            name: mystorage1,
//            items: [
//                {
//                    name: 'chicken',
//                    type: 'can',
//                    expdate: 'today',
//                    size: '12oz',
//                    commonrecipes: 'those'
//                },
//                {
//                    name: 'stuff',
//                    type: 'other',
//                    expdate: 'yesterday',
//                    size: '50lbs',
//                    commonrecipes: 'bread'
//                }
//            ]
//        }
    ];
    
    var recipedata = [
//        {
//            name: recipe1,
//            ingredients: [{ name: flour, amount: '1 cup'}, { name: sugar, amount: '2 cup'}],
//            instructions: "bla bla bla"
//        }
    ];
    

  return dbPromise
      .then(db => {
        // Get the collection
        var col = db.collection('users');
        return col.insert({ user: userdata, storageUnits: storagedata, recipes: recipedata });//returns a promise
      });
}

exports.findPerson = function(username) {
    return dbPromise
      .then(db => {
        // Get the collection
        var col = db.collection('users'); //send 
        return col.find({"user.username":username}).limit(1).toArray();//returns a promise
      });
}
