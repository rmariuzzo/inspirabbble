module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        flo: {
            serve: {
                options: {
                    dir: './',
                    glob: [
                        '!**/.subl*.tmp'
                    ],
                    resolvers: [{
                        files: ['assets/**/*.js'],
                        tasks: ['jshint']
                    }, {
                        files: ['assets/**/*.scss'],
                        tasks: ['sass:dev'],
                        callback: {
                            resourceURL: 'assets/css/main.css',
                            contentsPath: 'assets/css/main.css'
                        }
                    }, {
                        files: ['views/**/*.html', 'views/**/*.hbs'],
                        tasks: ['targethtml:dev'],
                        callback: {
                            reload: true
                        }
                    }]
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 7676,
                    base: './',
                    open: true,
                    keepalive: true
                }
            }
        },

        concurrent: {
            serve: {
                tasks: ['connect', 'flo'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

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
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['assets/img/**/**/*.{png,jpg,gif}'],
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
        },

        githooks: {
            all: {
                'pre-commit': 'jshint requirejs sass:build'
            }
        }

    });

    // Grunt task registration //

    // Setup tasks.
    grunt.registerTask('setup', 'Setup the development environment.', ['githooks']);
    // Build tasks.
    grunt.registerTask('build:dev', 'Build the development version.', ['copy:resources', 'targethtml:dev', 'sass:dev']);
    grunt.registerTask('build:prod', 'Build the production version.', ['jshint', 'requirejs', 'sass:build', 'copy:resources', 'targethtml:build', 'imagemin']);
    grunt.registerTask('build', ['build:prod']);
    // Serve tasks.
    grunt.registerTask('serve:dev', 'Serve the application in development mode.', ['build:dev', 'concurrent:serve']);
    grunt.registerTask('serve:prod', 'Serve the application in production mode.', ['build:prod', 'connect']);
    grunt.registerTask('serve', ['serve:dev']);
    // Default task.
    grunt.registerTask('default', ['serve']);
};