/*
 *	Heavily based upon grunt-slice-front
 *	https://github.com/uhop/grunt-slice-front
 *	Mostly adjusted to use grunt file api instead of fs for recursing through directories
 */

"use strict";
module.exports = function(grunt) {

	// get our config object
	var paths = grunt.config.get('paths');
	var pkg = grunt.config.get('pkg');

	// CONFIGURATION
	grunt.config.set(
		'custommarkdown',
		{
			options: {
				markdownItOptions: {
					html: true,
					linkify: true
				},
				templateParams: {
					siteTitle: pkg.title,
					'paths': { url: paths.url }, // make paths.url available to the template
				},
				templateFile: paths.src + '/templates/template.tmpl',
			},
			contents: {
				files: [
					{
						expand: true,
						cwd: paths.src + '/content/',
						src: [
							'*.md',
							'**/*.md',
						],
						dest: paths.dest + '/',
						ext: '.html',
					},
				],
			},
			// run through the source files again and create _page_.json in the same location
			json: {
				options: {
					templateFile: paths.src + '/templates/json-template.tmpl',
				},
				files: [
					{
						expand: true,
						cwd: paths.src + '/content/',
						src: [
							'*.md',
							'**/*.md',
						],
						dest: paths.tmp + '/',
						ext: '.json',
					},
				],
			}
		}
	);

	// Set up requirements for custom task
	var template = require("lodash.template"),
		yaml = require("js-yaml");

	// make markdown modules available
	var MarkdownIt			= require("markdown-it"),
		MarkdownItContainer	= require("markdown-it-container"),
		// Optional "requirements" for markdown-it.
		// To make them available, just use `npm install --save-dev _plugin_`
		MarkdownItSub		= req("markdown-it-sub"),
		MarkdownItSup		= req("markdown-it-sup"),
		MarkdownItFootnote	= req("markdown-it-footnote"),
		MarkdownItDeflist	= req("markdown-it-deflist"),
		MarkdownItAbbr		= req("markdown-it-abbr"),
		MarkdownItEmoji		= req("markdown-it-emoji"),
		MarkdownItIns		= req("markdown-it-ins"),
		MarkdownItMark		= req("markdown-it-mark"),
		MarkdownItMath		= req("markdown-it-math"),
		MarkdownItVideo		= req("markdown-it-video"),
		MarkdownItCheckbox	= req("markdown-it-checkbox"),
		MarkdownItSmartarrows = req("markdown-it-smartarrows"),
		MarkdownItHighlightjs = req("markdown-it-highlightjs");
	// md-it-container helper function
	// allows use of the following to make div.container wrappers
		//	::: class: container
		//	paragraph
		//
		//	paragraph
		//	
		//	:::
	var classRenderer = {
		validate: function(params){
			return params.trim().match(/^class:\s+.*$/);
		},
		render: function (tokens, idx) {
			var m = tokens[idx].info.trim().match(/^class:\s+(.*)$/);
			return tokens[idx].nesting === 1 ? "<div class=\"" + m[1] + "\">" : "</div>";
		}
	};
	// conditional require() for the markdown-it plugins
	function req (name) {
		try {
			return require(name);
		} catch (e) {
			// suppress errors, as it's not actually an error, the plugin just isn't needed in this project.
		}
		return null;
	}

	// THE TASK
	// Again, heavily derived from grunt-slice-front, but streamlined a bit.
	grunt.registerMultiTask("custommarkdown",
		"Slices a Markdown file in segments separating a front matter in YAML, generates HTML, and applies a template to the result.",
		function(){
			var done = this.async(),
				options = this.options({
					splitter:     /^(?:\-(?:\s*\-){2,})|(?:_(?:\s*_){2,})|(?:\*(?:\s*\*){2,})\s*$/gm,
					templateFile: 'non-existent-template', // We provide a nonexistent template file here and just use a simple string as the fallback
					mdPlugins: [
						MarkdownItAbbr,
						MarkdownItCheckbox,
						MarkdownItDeflist,
						MarkdownItEmoji,
						MarkdownItFootnote,
						MarkdownItHighlightjs,
						MarkdownItIns,
						MarkdownItMark,
						MarkdownItMath,
						MarkdownItSmartarrows,
						MarkdownItSub,
						MarkdownItSup,
						MarkdownItVideo,
					]
				});

			var markdownItOptions = options.markdownItOptions || {
					typographer: true,
					html:        true
				},
				md = new MarkdownIt( markdownItOptions ).
					use( MarkdownItContainer, "class", classRenderer );

			// register available plugins
			options.mdPlugins.forEach( function (plugin) {
				if (plugin) {
					md = md.use(plugin);
				}
			});

			var templateOptions = options.templateOptions || {},
				templateParams  = options.templateParams  || {},
				templateContents;

			// Load up the template, if available, and create tmpl()
			if( grunt.file.exists( options.templateFile ) ) {
				templateContents = grunt.file.read( options.templateFile, { encoding: "utf8" } );
			} else {
				// If there is no valid templateFile, then just echo the output. This is why we use an invalid tempalteFile, we're covered.
				templateContents = '<% body.forEach( function( section ){ %><%= section %><% }); %>';
			}
			var tmpl = template( templateContents, null, templateOptions );


			this.files.forEach( function( file ){
				// read and transform sections
				var sections = [];
				file.src.forEach( function( name ){
					sections.push.apply(
						sections,
						String(
							// read the source file
							grunt.file.read(name, {options: "utf8"})).
							// split by the splitter
							split(options.splitter).
							// check to see if there's content in a given section
							filter(function ( segment ) {
								// not empty
								return !/^\s*$/.test( segment );
							}).
							// parse the section as either frontmatter or markdown
							map(function(segment, index, segments){
								// note that front matter is... well... in front.
								if ( index > 0 ) {
									// body
									return md.render( segment );
								} else {
									// front matter
									return yaml.safeLoad( segment );
								}
							})
						);
				});

				if(sections.length < 1){
					grunt.fatal("task: slice_front: " + this.target + " has no useful sections, exiting.");
					done();
					return;
				}
				// create a file

				var contents = tmpl({
					page: sections[0],
					body: sections.slice(1),
					params: templateParams
				});
				grunt.file.write( file.dest, contents, {encoding: "utf8"} );
				done();

			});
		}
	);

};
