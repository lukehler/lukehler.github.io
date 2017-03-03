module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'copy',
		{
			assets: {
				expand: true,
				cwd: paths.src + '/assets/',
				src: '**',
				dest: paths.dest + '/assets/',
			},
			readme: {
				expand: true,
				src: [
					'README.md',
					'LICENSE',
				],
				dest: paths.dest,
			}
		}
	);
	grunt.loadNpmTasks('grunt-contrib-copy');
};
