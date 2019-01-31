module.exports = function (grunt) {
    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-string-replace');
    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        replace: {
            live: {
                src: ['src/manifest.txt'],
                dest: 'src/manifest.json',
                //overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: /VERSION/g,
                    to: '<%= pkg.version %>',
                }, {
                    from: 'run.js',
                    to: 'src/js/run.min.js',
                }, {
                    from: 'popup.js',
                    to: 'src/js/popup.min.js',
                }]
            },
            dev: {
                src: ['src/manifest.txt'],
                dest: 'src/manifest.json',
                //overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: /VERSION/g,
                    to: '<%= pkg.version %>',
                }]
            }
        },
        uglify: {
            build: {
                files: [{
                    src: 'src/js/run.js',
                    dest: 'src/js/run.min.js'
                }, {
                    src: 'src/js/popup.js',
                    dest: 'src/js/popup.min.js'
                }]
            }
        }, compress: {
            main: {
                options: {
                    archive: 'live.' + '<%= pkg.version %>' + '.zip',
                    mode: 'zip'
                },
                expand: true,
                cwd: 'dist/src/',
                dest: '/',
                src: ['manifest.json', 'css/*.css', 'images/*', 'js/run.min.js', 'js/popup.min.js', 'js/background.js', 'js/jquery.js', 'js/date.js', 'pages/*', 'ryviu.css']


            }
        },
        copy: {
            live: {
                files: [
                    // includes files within path
                    { expand: true, src: ['src/manifest.json', 'src/css/*.css', 'src/js/*.min.js', 'src/images/*', 'src/js/background.js', 'src/js/jquery.js', 'src/js/date.js', 'src/pages/*', 'src/ryviu.css'], dest: 'dist/' },
                ],
            },
        }
    });

    // Register the default tasks.
    grunt.registerTask('default', ['replace:live', 'uglify', 'copy:live', 'compress']);
    grunt.registerTask('dev', ['replace:dev']);
};