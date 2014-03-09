//
// Francine app
// 
var express = require('express'),
    passport = require('passport'),
    fs = require('fs'),
    http = require('http'),
    assert = require('assert')

    var models = require('./models')
var app = express();

//
// Secrets
//
var secret_key = require('./private/secret_key');
console.log(secret_key);
assert.notEqual(secret_key['secret'], undefined);

app.configure(function() {
    app.set('port', process.env.PORT || 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: secret_key['secret']
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./routes')(app, models);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});