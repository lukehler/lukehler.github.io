module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'less',
		{
			options: {
				paths: 'node_modules/lootstrap/src/styles/',
			},
			dist: {
				// only LESS files in the first level of /src/styles/ get processed.
				// Any files in subdirectories can be `@import`ed and used as libraries
				src: paths.src + '/styles/*.less',
				dest: paths.tmp + '/less.css'
			}
		}
	);
	grunt.loadNpmTasks('grunt-contrib-less');
};
