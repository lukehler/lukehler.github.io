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

// Quick shuffle function to randomize the projects on page load.
function shuffle( array ) {
	var counter = array.length;
	// Tick down through the array... 
	while ( counter > 0 ) {
		var index = Math.floor( Math.random() * counter );
		counter--;
		// ... And throw the randomly selected element into the current index.
		var tmp = array[counter];
		array[counter] = array[index];
		array[index] = tmp;
	}
	return array;
}

// Quick callback to filter out the non-project entries.
// Note that this could be more effectively circumvented by preprocessing the project entries differently
// In this case, I wanted to leave the grunt config simple and show a neat template/concat trick in the process.
function isObject( item ) {
	return typeof item === 'object';
}

// If this is the portfolio page, fetch projects.json and create a better index.
if( document.querySelector('body').classList.contains('portfolio') ) {
	// heads up.
	console.log('Portfolio page, fetching index');
	// Since we're doing XHR requests in vanilla js, might as well do the templating, too.
	// Go fetch the template for an individual project, as a string.
	var template = document.querySelector('#project-template').textContent;
	// set up a destination for our projects
	var templatedProjects = [];
	// Set up our offsite Links
	var offsiteLinks = '';
	// Leave the first .content-section to be replaced, but grab any others as plain old text.
	document.querySelectorAll('.content-section').forEach( function(item, index){
		if( index > 0 ) {
console.log( item );
			offsiteLinks += item.outerHTML;
		}
	});


	fetchAJAX('/projects.json', function(data){
		// Get our list of valid project pages
		var projects = JSON.parse(data).filter(isObject);

		// For each project, use the project values in the template to replace mustache-style strings, if present
		projects.forEach( function( project ) {
			// Let's plan on having no background at all.
			// The project items have styles set up for fallbacks, making color and image completely optional.
			var color = '';
			var image = '';
			// If we have a project color, let's use that.
			if( project.color ) {
				color = 'background-color: #' + project.color + ';';
			}
			// If we do have a background image, let's use that, sitting over the background color, if present.
			// For now, skipping all the images, as I happen to really like the straightforward colors-only approach.
			if( project.image ) {
//				image = '<img src="/assets/' + project.image + '" srcset="/assets/lg/' + project.image + ' 800w" alt="" />';
			}
			// Create our markup
			var templatedProject = template
				.replace( '{{ title }}', project.title )
				.replace( '{{ category }}', project.category )
				.replace( '{{ color }}', color )
				.replace( '{{ image }}', image )
				.replace( '{{ path }}', project.path );

			// Once we've applied the template, add it to the array.
			templatedProjects.push( templatedProject );
		});
		// Now that we have our projects templated, replace the existing list in #main-content with our new, templated list.
		templatedProjects = shuffle( templatedProjects );
		// Re-append our offsite links to the shuffled array
		templatedProjects.push(offsiteLinks);
		// And append it all to the DOM.
		document.querySelector('#main-content').innerHTML = templatedProjects.join("\n");

	});
}

