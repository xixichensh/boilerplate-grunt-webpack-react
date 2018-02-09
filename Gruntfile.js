const webpackConfig = require('./webpack.prod.config');

module.exports = function(grunt) {


    grunt.initConfig({
        

        webpack: {
                options: {
                    stats: true
                },
                prod: webpackConfig
        },


        clean: {

			build: ["dist/"]
        
        },

        copy: {
            
            content: {

                files: [{
                        expand: true,
                        src: './preloa*',
                        dest: './dist'
                    }
                ]
            }

        },

        uglify: {
            
            build: {

                files: [

                    {
                        expand: true,
                        cwd: './dist/',
                        src: ['*.js', '!*-debug.js','!*.min.js'],
                        dest: './dist/',
                        ext: '.js'
                    }
                ]

            }

        },

        cssmin: {
            target: {
              files: [{
                expand: true,
                cwd: './dist/',
                src: ['*.css', '!*.min.css'],
                dest: './dist/',
                ext: '.css'
              }]
            }
        },

        imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 4 // png图片优化水平，3是默认值，取值区间0-7
				},
				files: [{
					expand: true,
					cwd: "./dist/",
					src: ["*.{png,jpg,gif}"],
					dest: "./dist/"
				}]
			}
		}

    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    grunt.registerTask('default', [
        'clean',
        'webpack',
        'copy',
        'uglify',
        'cssmin',
        'imagemin'
    ]);

};