//just copied from recipe.js, still need to edit
// this is our example of basically the people.js controller we have, but using an actual database
const dbPromise = require('../database');

exports.add_storage_item = function(username, password, item_info){
	return dbPromise
		.then(db => {
			console.log(item_info);
			var item = item_info.name;
			var expdate = item_info.expdate;
			var object = {"name":item,"expdate":expdate};
			var storage_unit = item_info.storage_unit;
		
			var col = db.collection('users');
			return col.update({"user.username":"Mitchell", "storageUnits.name":storage_unit}, {$push: {"storageUnits.$.items": object}});
	});
};

exports.add_storage_unit = function(username, password, unit_name)
{

	return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection('users');
          return col.update({"user.username":username}, {$push: {storageUnits: {"name":unit_name,"items":[]}}});
        });
}; 

exports.getStorage = function(username, password, unit_name)
{

	return dbPromise
        .then(db => {
          // Get the collection
          var col = db.collection('users');
          return col.update({"user.username":username}, {$push: {storageUnits: {"name":unit_name,"items":[]}}});
        });
}; 
