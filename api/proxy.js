//. proxy.js
var express = require( 'express' ),
    request = require( 'request' ),
    api = express();

var settings = require( '../settings' );

//. env values
var fx_url = 'FX_URL' in process.env ? process.env.FX_URL : settings.fx_url; 

var settings_cors = 'CORS' in process.env ? process.env.CORS : '';
api.all( '/*', function( req, res, next ){
  if( settings_cors ){
    res.setHeader( 'Access-Control-Allow-Origin', settings_cors );
    res.setHeader( 'Vary', 'Origin' );
  }
  next();
});

api.use( express.Router() );

api.readFx = async function(){
  return new Promise( ( resolve, reject ) => {
    var option = {
      url: fx_url,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    request( option, ( err, res, body ) => {
      if( err ){
        console.log( { err } );
        resolve( { status: false, error: err } );
      }else{
        resolve( body );
      }
    });
  });

}

api.get( '/fx', async function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  api.readFx().then( function( result ){
    res.write( result );
    res.end();
  });
});

//. api をエクスポート
module.exports = api;
