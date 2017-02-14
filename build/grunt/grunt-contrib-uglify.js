module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'uglify',
		{
			build: {
				src: paths.dest + '/script.js',
				dest: paths.dest + '/script.min.js'
			}
		}
	);
	grunt.loadNpmTasks('grunt-contrib-uglify');
};
