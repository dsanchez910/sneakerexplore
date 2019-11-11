var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/sneakerexplore';
 
module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, function(err, db) {
            db.collection('user').insertOne( {
                "name": name,
                "email": email,
                "password": password
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the user details.");
            });
        });
    }
}