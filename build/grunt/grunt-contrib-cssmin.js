module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'cssmin',
		{
			minify: {
				src: paths.dest + '/style.css',
				dest: paths.dest + '/style.min.css',
			}
		}
	);
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
