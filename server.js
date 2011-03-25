
/**
 * Module dependencies.
 */

var express = require('express'),
    pltz = require('./pltz');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.favicon() ); 
  // app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Data
// 
// var pltz = [
//     { name: 'Home in 5', template: 'homein5@onmachine.org?subject=Home%20in%205&amp;body=Lvoe' },
//     { name: 'Running Late', template: 'runninglate@onmachine.org?subject=Running%20late&amp;body=Lvoe' }
// ];


//GLOBAL.DEBUG = true;

sys = require("sys");
test = require("assert");

var Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server,
  BSON = require('mongodb').BSONPure;
  //BSON = require('mongodb').BSONNative;

var host = process.env.MONGO_NODE_DRIVER_HOST != null ? process.env.MONGO_NODE_DRIVER_HOST : 'localhost';
var port = process.env.MONGO_NODE_DRIVER_PORT != null ? process.env.MONGO_NODE_DRIVER_PORT : Connection.DEFAULT_PORT;

sys.puts("Connecting to " + host + ":" + port);
var db = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:false});



// Params

// app.param('id', function(req, res, next, id){
//     
//     
//     
//     
//     if (req.plt = pltz[id]) {
//         next();
//     } else {
//         next(new Error('failed to find ' + id));
//     }
// });


// Routes

app.get('/', function(req, res){
    var pltz = {};
    db.open(function(err, db) {
        db.collection('test', function(err, collection) {
            // Erase all records from the collection, if any
            collection.remove(function(err, collection) {
                // Insert records
                collection.insert({ name: 'Running Late', template: 'runninglate@onmachine.org?subject=Running%20late&amp;body=Lvoe' });
                collection.insert({ name: 'Home in 5', template: 'homein5@onmachine.org?subject=Home%20in%205&amp;body=Lvoe' });
                collection.count(function(err, count) {
                    sys.puts("There are " + count + " records in the test collection");
                    collection.find(function(err, cursor) {
                        cursor.toArray(function(err, pltz) {
                            res.render('index', { title: 'empltz', pltz: pltz });
                            db.close();
                            // collection.drop(function(err, collection) {
                            //     db.close();
                            // });    
                        });
                    });          
                });
            });      
        });
    });
});


// app.get('/:id/:op?', pltz.load);
// app.get('/:id', pltz.view);
// app.get('/:id/view', pltz.view);
app.get('/:id/edit', function(req, res, id){
    db.open(function(err, db) {
        db.collection('test', function(err, collection) {
            collection.find(function(err, cursor) {
                cursor.toArray(function(err, pltz) {
                    var plt = pltz[0];
                    console.log('plt: ', plt);
                    res.render('edit', {
                        title: 'Editing user ',
                        plt: plt
                    });
                    collection.drop(function(err, collection) {
                        db.close();
                    });    
                });
            });          
        });
    });      
});

app.put('/:id/edit', function(req, res){
    var plt = req.body.plt;
    console.log(req.plt);
    req.plt.name = plt.name;
    req.plt.template = plt.template;
    res.redirect('back');
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
