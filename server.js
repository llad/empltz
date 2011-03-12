var app = require('express').createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'hb');

var users = [
    { name: 'tj', email: 'tj@sencha.com' },
    { name: 'ciaran', email: 'ciaranj@gmail.com' },
    { name: 'aaron', email: 'aaron.heckmann+github@gmail.com' }
];

var options = {
    // cache: true,
    // compile: true,
    locals : {
        users: [
            { name: 'tj', email: 'tj@sencha.com' }
          , { name: 'ciaran', email: 'ciaranj@gmail.com' }
          , { name: 'aaron', email: 'aaron.heckmann+github@gmail.com' }
          ]
        
        // ...
        // title: function (context, fn) {
        //     context.title = fn(this);
        //     return "";
        //}
    }
};

app.get('/', function(req, res){
  res.render('users', options);
});

app.listen(process.env.PORT || 8001);

console.log('Express app started on port 8001');