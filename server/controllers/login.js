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
  const data = {
      'username': username,
      'password': password
  };

  return dbPromise
      .then(db => {
        // Get the collection
        var col = db.collection('users');
        return col.insertOne(data);//returns a promise
      });
}
