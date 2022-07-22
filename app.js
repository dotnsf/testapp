//. app.js
var express = require( 'express' ),
    app = express();

var proxy = require( './api/proxy' );
app.use( '/api', proxy );

app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

module.exports = app;
