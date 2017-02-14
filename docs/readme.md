All files from the `/src/` directory are compiled into `/dest/`. You never update anything in `/dest/` directly, but build and serve up its contents from `/src/` using the scripts in `/build/`.

There are four main tasks that Grunt accomplishes:
- __Content__ files are read from `/src/content/` as html with lodash templating to include partials from `/src/templates/`. This lets you have one common template for the site header, for example, and reuse it across multiple content files.
- __Styles__ LESS files are processed from `/src/styles/` into `/tmp/`. The results are then appended onto any other `*.css` files in `/src/styles/` into `/dest/prod.css`. That file is then run through postCSS. Lastly, the results are minified into `/dest/prod.min.css`.
- __Scripts__ Any javascript files in /src/scripts/ are concatenated into a single file in `/dest/prod.js`. That file is then uglified into `/dest/prod.min.js`.
- __Assets__ Any supporting images, libraries, fonts, or other files are copied verbatim from `/src/assets/` into `/dest/assets/`.

Additionaly, build scripts in `/build/grunt/` are used by `Gruntfile.js` to configure all those tasks. Most notably, `/build/grunt/grunt-template.js` will likely need updates per project to identify the variable names for the various templates.

You can serve up the site compiled by grunt using Express. Running either `node main` or `npm start` will run an express server on port 3000 (by default, using an environmental value for potential Hotel use). The express server serves up files from `/dest/` using `express.static()` and also includes some middleware examples for development - setting CORS for ease of use and providing an example of a dummy API.