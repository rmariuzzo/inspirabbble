module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);


    // Project configuration.
    grunt.initConfig({
        watch: {
            server: {
                options: {
                    livereload: true
                },
                files: ['Gruntfile.js', 'assets/scss/**/*', 'assets/js/**/*', 'assets/img/**/*'],
                tasks: ['jshint', 'sass:server']
            }
        },
        /* jshint camelcase: false */
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: 'Inspirabbble'
            }
        },
        /* jshint camelcase: true */
        jshint: {
            files: ['Gruntfile.js', 'assets/js/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
                // ignores: ['assets/js/vendor/modernizr.js', 'assets/js/vendor/oo_engine.min.js', 'assets/js/vendor/oo_conf.js']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './assets/js/',
                    name: '../bower_components/almond/almond',
                    include: ['main'],
                    insertRequire: ['main'],
                    paths: require('./assets/js/config'),
                    out: './assets/dist/main.js',
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
                    'assets/css/main.css': 'assets/scss/main.scss'
                },
                options: {
                    outputStyle: 'nested'
                }
            },
            build: {
                files: {
                    'assets/dist/main.css': 'assets/scss/main.scss'
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
                    src: ['assets/img/**/**/*.png', 'assets/img/**/**/*.jpg'],
                    dest: './',
                }]
            }
        }
    });

    grunt.registerTask('server', ['jshint', 'sass:server', 'watch:server']);
    grunt.registerTask('build', ['jshint', 'requirejs', 'sass:build', 'imagemin']);
    grunt.registerTask('default', ['server']);
};