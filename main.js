var express = require( 'express' ),
	app = express(),
//	api = require( './build/express/example-api' ), // example API, available for use
//	cors = require( './build/express/cors' ),
	port = process.env.PORT || 3000; // listen to $PORT for use with Hotel, or just use a default

// Setup cors to allow cross-origin request
//app.use( cors );

// Splitting all (optional) api functions into a second file
//app.use( '/api', api ); // Using the API example in /build/ dir

// And serve up anything in the public folder.
app.use( express.static( 'dest' ) );

// And, finally, fire it off.
app.listen( port );