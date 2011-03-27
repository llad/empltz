
/**
 * Module dependencies.
 */

var express = require('express'),
    pltz = require('./pltz'),
    openid = require('openid'),
    url = require('url'),
    querystring = require('querystring');


var app = module.exports = express.createServer();

var extensions = [new openid.UserInterface(), 
                  new openid.SimpleRegistration(
                      {
                        "nickname" : false, 
                        "email" : true, 
                        "fullname" : false,
                        "dob" : false, 
                        "gender" : false, 
                        "postcode" : false,
                        "country" : false, 
                        "language" : false, 
                        "timezone" : false
                      }),
                  new openid.AttributeExchange(
                      {
                        "http://axschema.org/contact/email": "required",
                        "http://axschema.org/namePerson/friendly": "required",
                        "http://axschema.org/namePerson": "required"
                      })];

var relyingParty = new openid.RelyingParty(
    'http://templay.no.de/verify', // Verification URL (yours)
    null, // Realm (optional, specifies realm for OpenID authentication)
    false, // Use stateless verification
    false, // Strict mode
    extensions); // List of extensions to enable and include



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
var db = new Db('node-mongo-examples', new Server(host, port, {}));



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

app.get('/login', function(req, res) {
    res.render('login', { title: 'login'});
});


app.get('/authenticate', function(req, res) {
    
    var parsedUrl = url.parse(req.url);
    var query = querystring.parse(parsedUrl.query);
    var identifier = query.openid_identifier;
    relyingParty.authenticate(identifier, false, function(authUrl) {
        if (!authUrl)
        {
            res.writeHead(500);
            res.end(error);
        }
        else
        {
            res.redirect(authUrl);
            // res.writeHead(302, { Location: authUrl });
            // res.end();
        }
    });
});

app.get('/verify', function(req, res) {
    relyingParty.verifyAssertion(req, function(result)
    {
      // Result contains properties:
      // - authenticated (true/false)
      // - error (message, only if not authenticated)
      // - answers from any extensions (e.g. 
      //   "http://axschema.org/contact/email" if requested 
      //   and present at provider)
      res.writeHead(200);
      res.end((result.authenticated ? 'Success :)' : 'Failure :(') +
        '\n\n' + JSON.stringify(result));
    });
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
