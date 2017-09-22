module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            varint: {
                src: 'varint.js',
                dest: 'src/js/varint.js'
            }
        },

        clean: {
            dist: ['dist/**/*'],
            src: ['src/index.html', 'src/css/libs.css']
        },

        concat: {
            css: {
                src: [
                    'src/libs/font-awesome/css/font-awesome.css',
                    'src/css/icons.css'
                ],
                dest: 'src/css/libs.css'
            }
        },

        copy: {
            css: {
                files: [
                    {
                        expand: false,
                        src: ['src/css/app.css'],
                        dest: 'dist/css/app.css'
                    },
                    {
                        expand: false,
                        src: ['src/css/libs.css'],
                        dest: 'dist/css/libs.css'
                    }
                ]
            },

            fontAwesome: {
                files: [{
                    expand: true,
                    cwd: 'src/libs/font-awesome/fonts',
                    src: ['*'],
                    flatten: true,
                    dest: 'src/fonts/'
                }]
            },

            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts',
                    src: ['*'],
                    flatten: true,
                    dest: 'dist/fonts/'
                }]
            },

            json: {
                files: [{
                    expand: true,
                    cwd: 'src/json',
                    src: ['cards.json', 'gators.json', 'packs.json'],
                    flatten: true,
                    dest: 'dist/json/'
                }]        
            },

            images: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['*'],
                    flatten: true,
                    dest: 'dist/images/'
                }]
            },

            templates: {
                files: [{
                    expand: true,
                    cwd: 'src/js/views',
                    src: ['*.html' ],
                    flatten: false,
                    dest: 'dist/js/views'
                }]
            }
        },

        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    dest: 'dist/css',
                    src: ['app.css', 'libs.css'],
                    ext: '.min.css'
                }]
            }
        },

        html2js: {
            templates: {
                src: ["src/js/views/**/*.html"],
                dest: "src/js/templates.js"
            }
        },

        htmlangular: {
            options: {
                customattrs: [
                    'hover-class',
                    'set-focus'
                ],
                customtags: [
                    'sort-header'
                ],
                reportpath: null,
                reportCheckstylePath: null,
                tmplext: 'html'
            },
            files: {
                src: ['src/js/views/**/*.html']
            }
        },

        jshint: {
            all: {
                    options: {
                        ignores: ["src/js/varint.js"]
                    },
                    files: {
                        src: [
                            "Gruntfile.js",
                            "server.js",
                            "src/js/**/*.js",
                            "src/js/app.js"
                        ]
                    }
                }
        },

        jsonlint: {
            all: [
                "json/cards.json",
                "json/gators.json",
                "json/packs.json",
                "package.json",
                "bower.json",
                ".bowerrc"
            ]
        },

        less: {
            app: {
                files: {
                    "src/css/app.css": "src/less/app.less"
                }
            }
        },

        preprocess: {
            dist: {
                options: {
                    context: {
                        NODE_ENV: 'prod'
                    }
                },
                src: 'src/templates/index.html',
                dest: 'dist/index.html'
            },
            src: {
                options: {
                    context: {
                        NODE_ENV: 'dev'
                    }
                },
                src: 'src/templates/index.html',
                dest: 'src/index.html'
            }
        },

        uglify: {
            concat: {
                options: {
                    compress: false,
                    preserveComments: true
                },
                files: {
                    'dist/js/app.js': [
                        'src/varint.js',
                        'src/libs/jquery/dist/jquery.js',
                        'src/libs/angular/angular.js',
                        'src/libs/angular-route/angular-route.js',
                        'src/libs/angular-sanitize/angular-sanitize.js',
                        'src/libs/bootstrap/dist/js/bootstrap.js',
                        'src/libs/angular-bootstrap/ui-bootstrap-tpls.js',
                        'src/libs/angular-download/angular-download.js',
                        'src/libs/angular-modal-service/dst/angular-modal-service.min.js',
                        'src/libs/angular-base64/angular-base64.js',
                        'src/js/templates.js',
                        'src/js/app.js',
                        'src/js/**/*.js'
                     ]
                }
            },

            minify: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js']
                }
            }
        },

        watch: {
            js: {
                files: [
                    'src/js/*.js',
                    'src/js/**/*.js',
                    'src/js/views/**/*.html',
                    'Gruntfile.js',
                    'server.js',
                    '*.json',
                    '.bowerrc'
                ],
                tasks: ['lint']
            },

            less: {
                files: 'src/less/app.less',
                tasks: ['less']
            },

            preprocess: {
                files: 'src/templates/*.html',
                tasks: ['preprocess']
            }
        }
    });

    grunt.config.set('dir', 'dist');

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-html-angular-validate');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-preprocess');

    grunt.registerTask('lint', ['htmlangular', 'jsonlint', 'jshint' ]);
    grunt.registerTask('minify', ['uglify:concat', 'uglify:minify', 'concat:css', 'copy:css', 'cssmin']);
    grunt.registerTask('build', ['browserify', 'clean:dist', 'lint', 'html2js', 'minify', 'preprocess:src', 'preprocess:dist', 'copy:fontAwesome', 'copy:fonts', 'copy:images', 'copy:json', 'copy:templates']);

};
