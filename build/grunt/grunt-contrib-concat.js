module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'concat',
		{
			options: {
				banner: '/* --- <%= pkg.name %> v<%= pkg.version %> --- */\n\n'
			},
			js: {
				src: [
					paths.src + '/scripts/**.js'
				],
				dest: paths.dest + '/script.js'
			},
			css: {
				// CSS files in /css/ directory are concatented onto /less.css at this point
				src: [
					paths.src + '/styles/*.css',
					paths.tmp + '/less.css'
				],
				dest: paths.dest + '/style.css'
			},
			// build a single json file from all *.json files created in the dest folder.
			json: {
				options: {
					banner: '[',
					// The separator will appear every single time, regardless of whether or not the page is parsed.
					// So we'll have a series of nulls to discard when processing the results.
					separator: ',',
					footer: ']',
					process: function( src, filepath ) {
						var obj = JSON.parse( src );
						try {
							if( typeof obj.page.category == 'undefined' ) {
								throw 'Does not have a category defined, ' + src +' is not a project.';
							}
							return JSON.stringify(
								{
									title: obj.page.title,
									category: obj.page.category,
									path: filepath.replace(/^tmp\/(.*)index\.json$/, '$1'),
									image: obj.page.image || null,
									color: obj.page.color || null,
									link: obj.page.link || null,
								}
							);
						} catch(e) {
							return '0';
							// deliberately ignoring pages which are not projects.
						}
					},
				},
				src: [
					paths.tmp + '/**/index.json',					
				],
				dest: paths.dest + '/projects.json'
			}
		}
	);
	grunt.loadNpmTasks('grunt-contrib-concat');
};
