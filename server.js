var http = require('http'),
    sys = require('sys'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
  
var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
        if(!exists) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not Found\n");
            res.close();
            return;
        }
    });
    
    fs.readFile(filename, "binary", function(err, file) {
        if(err) {
            res.writeHead(500, {"Content-Type": "text/plain"});  
            res.write(err + "\n");
            res.close();  
            return;  
        }  

        res.sendHeader(200);  
        res.write(file, "binary");  
        res.close();  
    });
        
});
  
server.listen(process.env.PORT || 8001);