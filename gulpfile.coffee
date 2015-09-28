gulp = require 'gulp'
coffee = require 'gulp-coffee'
newer = require 'gulp-newer'

coffeeSrc = './src'
coffeeDest = './lib'

gulp.task 'coffee', ->
	gulp.src "#{coffeeSrc}/*.coffee"
		.pipe newer "#{coffeeSrc}/*.coffee"
		.pipe coffee bare: true
		.pipe gulp.dest coffeeDest

gulp.task 'watch', ->
	gulp.watch "#{coffeeSrc}/*.coffee", ['coffee']

gulp.task 'default', ['watch']