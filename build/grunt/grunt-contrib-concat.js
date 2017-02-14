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
			}
		}
	);
	grunt.loadNpmTasks('grunt-contrib-concat');
};
