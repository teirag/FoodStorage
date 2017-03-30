const store = {
    0: {
        id: 0,
        name: 'Mitchell',
        age: 25
    }
};
let id = 1;

exports.addPerson = function(obj){
    const o = {id: id++};
    o.name = obj.name;
    o.age = obj.age;
    store[o.id] = 0;//asyncrhonous function to do database stuff and store in promise
    return o;
};

exports.getPeople = function(){
    return Object.keys(store)
        .map(function(key){
            return store[key];
        });
};

exports.setPerson = function(id, obj){
    if(id !== obj.id) delete store[id];
    store[obj.id] = obj;
    return obj;
};