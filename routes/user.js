
/*
 * GET home page.
 */

exports.signin = function(req, res){
    console.log(req.body);
    var MongoClient = require('mongodb');
    var crypto = require('crypto');
    // Valid submit
    if(req.body.pseudo && req.body.password) {
        mongo = MongoClient.connect("mongodb://127.0.0.1:27017/bloggify", function(err, db) {
            if(err) throw err;

            var usersCollection = db.collection('users');

            usersCollection.find( { pseudo: req.body.pseudo }, function(error, results) {
                results.count(function(err, count) {
                    if(err) throw err;
                    // Existing account
                    if(count == 1) {
                        results.nextObject(function(err, user)
                        {
                            // Correct password
                            if(user.password == crypto.createHash('sha256').update(req.body.password).digest('base64')) {
                                req.flash('success', "You are now connected !");
                                req.session.user = user;
                                res.redirect('/');
                            }
                            // Incorrect password
                            else {
                                req.flash('warning', "Invalid account !");
                                res.redirect('/');
                            }
                            db.close();
                        });
                    }
                    // 404 Account not found
                    else if(count == 0) {
                        req.flash('warning', "Invalid account !");
                        res.redirect('/');
                        db.close();
                    }
                    // Weird integrity problem
                    else {
                        req.flash('danger', "Weird integrity problem !");
                        db.close();
                    }
                });

            });
        });
    }
    // Invalid submit
    else {
        res.redirect('/');
    }
};

exports.signout = function(req, res){
    if(req.session.user)
        delete req.session.user;
    res.redirect('/');
};

exports.signup = function(req, res){
    res.render('signup');
};

exports.signup_post = function(req, res){

};
