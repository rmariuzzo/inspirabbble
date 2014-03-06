module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);


    // Project configuration.
    grunt.initConfig({
        watch: {
            dev: {
                files: ['Gruntfile.js', 'assets/scss/**/*', 'assets/js/**/*', 'assets/img/**/*', 'views/**/*'],
                tasks: ['jshint', 'sass:dev', 'targethtml:dev'],
                options: {
                    livereload: 39999
                }
            }
        },
        nodestatic: {
            dev: {
                options: {
                    port: 9999,
                    base: '.'
                }
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
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './assets/js/',
                    name: '../bower_components/almond/almond',
                    include: ['main'],
                    insertRequire: ['main'],
                    mainConfigFile: './assets/js/config.js',
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
            dev: {
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
        },
        targethtml: {
            dev: {
                files: {
                    'index.html': 'views/index.html'
                }
            },
            build: {
                files: {
                    'index.html': 'views/index.html'
                }
            }
        },
        copy: {
            resources: {
                files: [{
                    expand: true,
                    src: 'assets/bower_components/dripicons/fonts/**',
                    dest: 'assets/fonts/',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.registerTask('dev', ['jshint', 'sass:dev', 'copy:resources', 'targethtml:dev', 'nodestatic:dev', 'watch:dev']);
    grunt.registerTask('build', ['jshint', 'requirejs', 'sass:build', 'copy:resources', 'targethtml:build', 'imagemin']);
    grunt.registerTask('default', ['dev']);
};
