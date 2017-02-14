module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'clean',
		{
			// before starting, remove all existing files in tmp or prod or elsewhere
			prod: [
				paths.tmp,
				paths.dest
			],
			// once complete, remove temp files
			tmp: [
				paths.tmp
			]
		}
	);
	grunt.loadNpmTasks('grunt-contrib-clean');
};
