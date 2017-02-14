var express = require('express'),
	app = express(),
	router = express.Router();

// Just some dummy content as a simple object
var contents = {
	posts: {
		0: {
			id: 0,
			title: "This is the post title",
			content: "This is the post content.",
			author: 0,
		},
	},
	users: {
		0: {
			uid: 0,
			name: "username",
		},
	},
}

// return ?
router.all('/', function( req, res ) {
	// Nothing shows up at the base entry point of the API, you have to ask for a resource.
	res.send('Nothing here');
});

// return all posts
router.get( '/posts', function( req, res ) {
	console.log( 'request for all posts' );
	var postArray = [];
	for ( var post in contents.posts) {
		postArray.push( contents.posts[post] );
	}
	res.json( postArray );
});

// return 1 post
router.get( '/posts/:postID', function( req, res ) {
	console.log( 'request for post ' + req.params.postID );
	res.json( contents.posts[req.params.postID] );
});

// update an existing post
router.put( '/posts/:postID', function( req, res ) {
	console.log( 'updating existing post ' + req.params.postID );
	// TBD: How are you storing changes?
});

// create a new post
router.post( '/posts', function( req, res ) {
	console.log( 'creating new post' );
	// TBD: How are you saving changes?
});

// create a new post
router.delete( '/posts/:postID', function( req, res ) {
	console.log( 'deleting existing post ' + req.params.postID );
	// TBD: How are you saving changes?
});

// return all users
router.get( '/users', function( req, res ) {
	console.log('request for all users');
	res.json( contents.users );
});
// return a single user
router.get( '/users/:userID', function( req, res ) {
	console.log( 'requires for user ' + req.params.userID );
	res.json( contents.users[ req.params.userID ] )
});

module.exports = router;