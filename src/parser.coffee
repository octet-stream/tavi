# / - на уровень вниз
# ^ - на уровень вверх
# + - на текущем уровне
# Pattern example:
# tavi foo/gulpfile.coffee+.bowerrc+.npmignore+.gitignore+coffee/main.coffee+extra.coffee^public/assets/css+js^img/browsers+errors+icns+layout^^stylus/common.styl+luna.styl^views/about.jade+error-page.jade+home.jade+layout.jade+pro.jade

path = require 'path'

FILES_EXCEPTIONS = [
	'.gitignore',
	'.npmignore',
	'.htaccess',
	'.bowerrc'
]

EXP_STR = /[a-zA-Zа-яА-Я0-9-\.]+(?=[\+\/\^])?|[\/\^\+]{1}/g

###
# Paths builder
#
# Build paths array by given matches
#
# @param array matches
#
# @return array Paths
# returning array like this:
# [
# 	[false, './foo'],
# 	[false, './foo/coffee'],
# 	[true, './foo/.bowerrc'],
# 	[true, './foo/.npmignore'],
# 	[true, './foo/.gitignore'],
# 	[true, './foo/coffee/main.coffee'],
# 	[true, './foo/coffee/extra.coffee'],
# 	[false, './foo/public'],
# 	[false, './foo/public/assets'],
# 	[false, './foo/public/assets/css'],
# 	[false, './foo/public/assets/js'],
# 	[false, './foo/public/img'],
# 	[false, './foo/public/img/browsers'],
# 	[false, './foo/public/img/errors'],
# 	[false, './foo/public/img/icns'],
# 	[false, './foo/public/img/layout'],
# 	[false, './foo/stylus'],
# 	[true, './foo/stylus/common.styl'],
# 	[true, './foo/stylus/luna.styl'],
# 	[false, './foo/views'],
# 	[true, './foo/views/about.jade'],
# 	[true, './foo/views/home.jade'],
# 	[true, './foo/views/layout.jade'],
# 	[true, './foo/views/error-page.jade'],
# 	[true, './foo/views/pro.jade'],
# ]
###
buildPaths = (matches) ->
	DS = '/'
	p = ".#{DS}"
	pathsArray = []
	currentPathEnd = ''
	for element,index in matches
		if /[a-zA-Zа-яА-Я0-9-\.]+/.test element
			currentPathEnd = element
			p += element
			isFile = if (element in FILES_EXCEPTIONS) or (matches[index + 1 ] != '/' and '' != path.extname element) then on else no
			pathsArray.push [isFile, p]
		else if element == '/'
			p += element
		else if element == '^'
			p = p.replace /\/[a-zA-Zа-яА-Я0-9-\.]+$/, '/'
			p = p.replace /[a-zA-Zа-яА-Я0-9-\.]+\/$/,''
		else if element == '+'
			p = p.replace matches[index - 1], ''
			continue
	return pathsArray

exports.resolve = resolve = (pattern) -> return buildPaths pattern.match EXP_STR