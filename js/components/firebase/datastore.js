const firebaseApp = require('./index.js');

exports.getAllData = function(callback){

  var ref = firebaseApp.database().ref();
  ref.on('value', (snap) => {
    callback(snap.val());
  });
}

exports.sayHello = function(callback){
  callback('hello')
}

exports.getProducts = function(callback){

  var ref = firebaseApp.database().ref('products');
  ref.on('value', (snap) => {
    callback(snap.val());
  });
}


exports.getCategories = function(callback){

  var ref = firebaseApp.database('categories').ref();
  ref.on('value', (snap) => {
    callback(snap.val());
  });
}

exports.getUsers = function(callback){

  var ref = firebaseApp.database('users').ref();
  ref.on('value', (snap) => {
    callback(snap.val());
  });
}
