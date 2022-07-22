//. api.spec.js

var request = require( 'supertest' ),
    chai = require( 'chai' ),
    app = require( './app' );

chai.should();

describe( 'GET function', function(){
  it( 'should work as expected', async function(){
    var result1 = await request( app ).post( '/api/fx' );
    result1.body.status.should.equal( true );
    result1.statusCode.should.equal( 200 );
  });
});
