
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
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', pltz.list);
// app.get('/:id/:op?', pltz.load);
// app.get('/:id', pltz.view);
// app.get('/:id/view', pltz.view);
app.get('/:id/edit', pltz.edit);
// app.put('/:id/edit', pltz.update);


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
