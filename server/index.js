var express = require('express'),
    enbMiddleware = require('enb/lib/server/server-middleware');


var app = express();

app.use(enbMiddleware.createMiddleware({
    cdir: process.cwd(),
    noLog: false
}));

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000);
