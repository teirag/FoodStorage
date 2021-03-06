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

exports.addPerson = function(registerInfo) {
  var userdata = {
      'username': registerInfo.username,
			'email'   : registerInfo.email,
      'password': registerInfo.password
  };
    
    var storagedata = [
//        {
//            name: "Dietetics Backpack",
//            items: [
//                {
//                    name: 'chicken',
//										expdate: "04/17/2017"
//                },
//                {
//                    name: 'soup',
//										expdate: "04/12/2017"
//                }
//            ]
//        },
//					{
//						name: "Dietetics Lab Shelf",
//						items: [
//							{
//								name: "Fish",
//								expdate: "05/09/2017"
//							},
//							{
//								name: "I love you...but that's not expiring",
//								expdate: "04/27/2077"
//							}
//						]
//					}
    ];
    
    var recipedata = [
//        {
//            name: "recipe1",
//            ingredients: [
//							{ name: 'flour', amount: '1 cup'}, { name: 'sugar', amount: '2 cups'}
//						],
//            instructions: "bla bla bla"
//        },
//			{
//            name: "recipe2",
//            ingredients: [
//							{ name: 'flour', amount: '5 cups'}, { name: 'sugar', amount: '6 cups'}
//						],
//            instructions: "bla bla bla"
//        }
    ];
    

  return dbPromise
      .then(db => {
        // Get the collection
        var col = db.collection('users');
        return col.insert({ user: userdata, storageUnits: storagedata, recipes: recipedata });//returns a promise
      });
};

exports.find_person_by_id = function(id){
		return dbPromise
			.then(db =>{
			var ObjectId = require('mongodb').ObjectID;
			var ID = new ObjectId(id);
				var col = db.collection('users');
			return col.find({"_id": new ObjectId(id)}).toArray();
			});
};

exports.findPerson = function(username, password) {
    return dbPromise
      .then(db => {
        // Get the collection
        var col = db.collection('users'); //send 
        return col.find({"user.username":username, "user.password":password }).toArray();//returns a promise
      });
};
