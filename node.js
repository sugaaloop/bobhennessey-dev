// app.js

// google cloud app engine debugging
require('@google-cloud/debug-agent').start();

// modules =================================================
var express        = require('express');
var compression    = require('compression');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

const NodeCache = require( "node-cache" );
const cache = new NodeCache();

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(compression());
app.use(express.static(__dirname + '/dist/bobhennessey-net'));

// serve index for everything
app.get('/*', function (req, res) {
  res.sendFile('./dist/bobhennessey-net/index.html', { root: __dirname });
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(process.env.PORT || 8080);

// expose app
exports = module.exports = app;
