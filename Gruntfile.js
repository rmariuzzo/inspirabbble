module.exports = function(grunt) {
    'use strict';

    var glob = require('glob');

    require('load-grunt-tasks')(grunt);
    require('./vendor/fox/wls/_grunt/wls')(grunt);

    // phpcs/phplint options
    var phpConfig = {
        files: [
            'public/*.php',
            'public/config/**/*.php',
            'public/show/**/*.php'
        ],
        expandedFiles: function() {
            // Map over all files to get nested array of matched files
            return this.files.map(function (file) {
                // Match files based on glob pattern
                return glob.sync(file);
            // Flatten nested array into single-level one
            }).reduce(function (a, b) {
                return a.concat(b);
            });
        }
    };

    // Project configuration.
    grunt.initConfig({
        watch: {
            server: {
                options: {
                    livereload: true
                },
                files: ['Gruntfile.js', 'public/assets/scss/**/*', 'public/assets/js/**/*', 'public/assets/img/**/*', 'public/show/**/*'],
                tasks: ['jshint', 'sass:server']
            }
        },
        /* jshint camelcase: false */
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: 'American Idol'
            }
        },
        /* jshint camelcase: true */
        jshint: {
            files: ['Gruntfile.js', 'public/assets/js/**/*.js', '!public/assets/js/compiled.js', '!public/assets/js/modules/carousel-lib.js'],
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/assets/js/vendor/modernizr.js', 'public/assets/js/vendor/oo_engine.min.js', 'public/assets/js/vendor/oo_conf.js']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './public/assets/js/',
                    name: '../bower_components/almond/almond',
                    include: ['main'],
                    insertRequire: ['main'],
                    paths: require('./public/assets/js/config'),
                    out: './public/assets/dist/main.js',
                    findNestedDependencies: true,
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    wrap: {
                        start: '(function () {',
                        end: '}).call(this);'
                    }
                }
            }
        },
        sass: {
            server: {
                files: {
                    'public/assets/css/main.css': 'public/assets/scss/main.scss',
                    'public/assets/css/unsupported.css': 'public/assets/scss/pages/_unsupported.css'
                },
                options: {
                    outputStyle: 'nested'
                }
            },
            build: {
                files: {
                    'public/assets/dist/main.css': 'public/assets/scss/main.scss',
                    'public/assets/dist/unsupported.css': 'public/assets/scss/pages/_unsupported.css'
                },
                options: {
                    outputStyle: 'compressed'
                }
            }
        },
        imagemin: {
            all: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['public/assets/img/**/**/*.png', 'public/assets/img/**/**/*.jpg'],
                    dest: './',
                }]
            }
        },
        phpcs: {
            application: {
                dir: phpConfig.expandedFiles().join(' ')
            },
            options: {
                bin: 'phpcs',
                ignore: 'PhotoAction.php,PhotoCache.php',
                standard: './codesniffer.ruleset.xml'
            }
        },
        phplint: {
            options: {
                swapPath: '/tmp'
            },
            all: phpConfig.expandedFiles()
        },
        wls: {
            show: 'public'
        }
    });

    grunt.registerTask('server', ['jshint', 'sass:server', 'watch:server']);
    grunt.registerTask('backdev', ['phpcs', 'phplint']);
    grunt.registerTask('build', ['jshint', 'requirejs', 'sass:build', 'imagemin']);
    grunt.registerTask('default', ['server']);
};
