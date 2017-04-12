// this is our example of basically the people.js controller we have, but using an actual database
const dbPromise = require('../database');

exports.getAllUsers = function() {
    return dbPromise
      .then(db => {
        // Get the collection
        var col = db.collection('users'); //send 
        return col.find().toArray();//returns a promise
      });
}
