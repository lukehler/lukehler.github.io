module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'less',
		{	
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
