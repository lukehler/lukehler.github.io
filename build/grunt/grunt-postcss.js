module.exports = function(grunt) {

	var paths = grunt.config.get('paths');

	grunt.config.set(
		'postcss',
		{
			options: {
			  map: false, // inline sourcemaps
			  processors: [
				require('postcss-flexboxfixer'),
				require('postcss-gradientfixer'),
				require('postcss-cssnext')({
					browsers: 'last 2 versions',
					features: {
						customProperties: {
							preserve: true
						},
					}
				})
			  ]
			},
			dist: {
			  src: paths.dest + '/style.css'
			}
		  }
	);
	grunt.loadNpmTasks('grunt-postcss');
};
