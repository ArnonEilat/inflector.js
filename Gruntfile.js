module.exports = function(grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',
        // Task configuration
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/rule.js', 'src/inflector.js'],
                dest: 'dist/inflector.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/inflector.min.js'
            }
        },
        jshint: {
            options: {
                node: false,
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                unused: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: false
                },
                boss: true,
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            src_test: {
                src: '<%= concat.dist.dest %>'
            }
        },
        mocha: {
            test: {
                src: ['test/**/*.html'],
                options: {
                    run: true
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: 'src/**/*',
                tasks: ['jshint:src_test', 'mocha', 'concat', 'uglify']
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha');

    // Default task
    grunt.registerTask('default', ['jshint', 'mocha', 'concat', 'uglify']);
};