var app = require('express').createServer();

app.get('/',function(req, res){
    res.send('hello world');
});

app.listen(8001);
console.log('Express app started on port 8001');