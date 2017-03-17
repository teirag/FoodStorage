const dbPromise = require('../database')('foodStorage');

exports.addTask = function(title, description, dueDate){
    const o = {
        title: title,
        description: description,
        dueDate: dueDate
    };
    
    return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection('tasks');
          return col.insertOne(task);
        });
};