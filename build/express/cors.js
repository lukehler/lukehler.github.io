var express = require('express'),
	router = express.Router();

// SET CORS TO ALLOW CROSS-DOMAIN ORIGINS
router.use( function(req, res, next){
	res.header ('Access-Control-Allow-Origin', '*');
	res.header ('Access-Control-Allow-Credentials', true);
	// allow full access:
//	res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	// allow read-only access:
	res.header ('Access-Control-Allow-Methods', 'GET');
	res.header ('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

module.exports = router;