var express = require('express'),
    morganMW  = require('morgan'),
    staticMW = require('serve-static'),
    enbMW = require('enb/lib/server/server-middleware');


var app = express();

app.use(enbMW.createMiddleware({
    cdir: process.cwd(),
    noLog: false
}));

app.use(staticMW(process.cwd()))
app.use(morganMW('default'));

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000);
