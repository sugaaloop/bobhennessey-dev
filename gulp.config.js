/**
 * Gulp config
 */


'use strict';

var pkg = require('./package');

module.exports = function(argv) {
    var config = {
        distSrc: 'dist',
        scripts: [
            'libs/jdrupal/jdrupal.min.js',
            'libs/angular-drupal/angular-drupal.js',
            'libs/ui-router/release/angular-ui-router.js',
            'app/**/*.js'
        ],
        distScripts: 'dist/*.js',
        html: [
            './**/*.html'
        ],
        watchTargets: [
            './**/*.js',
            './**/*.html',
            './**/*.css'
        ],
        scriptsDestFile: 'scripts.min.js',
        // sassSrc: [
        //     'Content/SCSS/**/*.scss'
        // ],
        // appCss: [
        //     'Content/CSS/application.css'
        // ],
        // cssPlugins: [
        //     'Content/CSS/*.css',
        //     '!Content/CSS/application.css',
        //     '!Content/CSS/application.min.css'
        // ],
        index: 'views/index.html',
        isProd: argv.prod ? true : false,
        pkg: pkg
    };

    return config;
}
