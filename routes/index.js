
/*
 * GET home page.
 */

exports.index = function(req, res){
    var MongoClient = require('mongodb');
    mongo = MongoClient.connect("mongodb://127.0.0.1:27017/bloggify", function(err, db) {
        if(err) throw err;

        var articlesCollection = db.collection('articles');

        var cursor = articlesCollection.find();
        cursor.sort({date: -1});
        cursor.toArray(function(err, results) {
        db.close();
        res.render('index', { articles: results });
      });
    });
};

exports.add = function(req, res){
    var MongoClient = require('mongodb');
    if(req.body.content != undefined && req.body.content != "") {
        mongo = MongoClient.connect("mongodb://127.0.0.1:27017/bloggify", function(err, db) {
            if(err) throw err;

            var articlesCollection = db.collection('articles');

            articlesCollection.insert( { content: req.body.content, date: new Date()}, function(error, results) {
            db.close();
            res.redirect('/');
          });
        });
    }
    else {
        res.redirect('/');
    }
};