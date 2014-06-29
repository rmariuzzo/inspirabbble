module.exports = function(grunt) {
    'use strict';

    var path = require('path');
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
                        tasks: ['newer:jshint:all']
                    }, {
                        files: ['assets/**/*.scss'],
                        tasks: ['sass:dev'],
                        callback: {
                            resourceURL: 'assets/css/main.css',
                            contentsPath: 'assets/css/main.css'
                        }
                    }, {
                        files: ['views/**/*.html', 'assets/**/*.hbs'],
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
                    base: '..',
                    directory: path.basename(__dirname),
                    open: 'http://localhost:7676/' + path.basename(__dirname),
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
            all: {
                src: ['Gruntfile.js', 'assets/js/**/*.js']
            },
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
            prod: {
                files: {
                    'assets/dist/main.css': 'assets/scss/main.scss'
                },
                options: {
                    outputStyle: 'compressed'
                }
            },
            validate: {
                files: {
                    'assets/css/main.css': 'assets/scss/main.scss'
                },
                options: {
                    check: true
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
            prod: {
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
                'pre-commit': 'validate'
            }
        },

        jsonlint: {
            all: {
                src: [
                    '.bowerrc',
                    '.jshintrc',
                    'bower.json',
                    'package.json'
                ]
            }
        }

    });

    // Grunt task registration //

    // Setup tasks.
    grunt.registerTask('setup', 'Setup the development environment.', ['githooks']);
    // Validation tasks.
    grunt.registerTask('validate', 'Validate source files.', ['jshint', 'jsonlint', 'requirejs', 'sass:validate']);
    // Build tasks.
    grunt.registerTask('build:dev', 'Build the development version.', ['copy:resources', 'targethtml:dev', 'sass:dev']);
    grunt.registerTask('build:prod', 'Build the production version.', ['jshint', 'requirejs', 'sass:prod', 'copy:resources', 'targethtml:prod', 'imagemin']);
    grunt.registerTask('build', ['build:prod']);
    // Serve tasks.
    grunt.registerTask('serve:dev', 'Serve the application in development mode.', ['build:dev', 'concurrent:serve']);
    grunt.registerTask('serve:prod', 'Serve the application in production mode.', ['build:prod', 'connect']);
    grunt.registerTask('serve', ['serve:dev']);
    // Default task.
    grunt.registerTask('default', ['serve']);
};
