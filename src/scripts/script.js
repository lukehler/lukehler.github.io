// We don't really need jQuery here, so let's do it all in vanilla javascript. Just for kicks.
// Note that we already have `html` as an object on the window, used in the head to add/remove the .js/.no-js classes.

// quick AJAX function
function fetchAJAX(path, callback) {
	// generate a new XMLHttpRequest for the path provided
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		// Once the request is done (readyState === 4)...
		if (httpRequest.readyState === 4) {
			// If we have a valid response (status === 200)...
			if (httpRequest.status === 200) {
				// And if we have a valid callback....
				if (callback) {
					// THEN return the results as plain old text.
					callback(httpRequest.responseText);
				}
			}
		}
	};
	// With our request object set up, go fetch it.
	httpRequest.open('GET', path);
	httpRequest.send(); 
}

// Quick callback to filter out the non-project entries.
// Note that this could be more effectively circumvented by preprocessing the project entries differently
// In this case, I wanted to leave the grunt config simple and show a neat trick in the process.
function isObject( item ) {
	return typeof item === 'object';
}

// If this is the portfolio page, fetch projects.json and create a better index.
if( document.querySelector('body').classList.contains('portfolio') ) {
	// heads up.
	console.log('Portfolio page, fetching index');
	fetchAJAX('/projects.json', function(data){
		// Get our list of valid project pages
		var projects = JSON.parse(data).filter(isObject);

		// Since we're doing XHR requests in vanilla js, might as well do the templating, too.
		// Go fetch the template for an individual project, as a string.
		var template = document.querySelector('#project-template').textContent;
		// set up a destination for our projects
		var templatedProjects = [];
		// For each project, use the project values in the template to replace mustache-style strings, if present
		projects.forEach( function( project ) {
			// Rather than the path to the json file, we need the corresponding html document.
			var path = project.path.replace(/^tmp/, '').replace(/\.json$/, '.html');
			// Let's plan on having no background at all.
			// The project items have styles set up for fallbacks, making color and image completely optional.
			var color = '';
			var image = '';
			// If we have a project color, let's use that.
			if( project.color ) {
				color = 'background-color: #' + project.color + ';';
			}
			// If we do have a background image, let's use that, overriding the background color, if present.
			if( project.image ) {
				image = 'background-image: url(/assets/' + project.image + ');';
			}
			// Create our markup
			var templatedProject = template
				.replace( '{{ title }}', project.title )
				.replace( '{{ category }}', project.category )
				.replace( '{{ color }}', color )
				.replace( '{{ image }}', image )
				.replace( '{{ path }}', path );

			// Once we've applied the template, add it to the array.
			templatedProjects.push( templatedProject );
		});
		// Now that we have our projects templated, replace the existing list in #main-content with our new, templated list.
		document.querySelector('#main-content').innerHTML = templatedProjects.join("\n");

	});
}

