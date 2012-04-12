var mongo = require('mongoskin')
  , should = require('should');


describe("MongoDB", function() {
  it("Should connect to server passed by Strider via environment variables", function(done) {
    var mongodb_uri = process.env.MONGODB_URI;

    console.log("MONGODB_URI %s", mongodb_uri);
    var db = mongo.db(mongodb_uri);

    var key = "foo";
    var value = "this is my foo value";
    db.collection('mongo-test').insert({key:key, value:value}, function(err) {
      db.collection('mongo-test').findOne({key:key}, function(err, doc) {
        doc.value.should.eql(value);
        done();
      });
    });
  });
});
