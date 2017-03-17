var MongoClient = require('mongodb').MongoClient;

module.exports = function(dbName) {
    var url = 'mongodb://localhost:27017/' + dbName;
    return MongoClient.connect(url);
};

// fileA.js (different file referencing this one)
//const db = require('./database');
//const connPromise = db('myDb');
//
//connPromise.then(db => db.insert());
//connPromise.then(db => db.find());