fs = require 'fs'

module.exports = class Tavi
	constructor: ->
		@VERSION = require('../package.json').version
		@PATTERNS_FILE_PATH = do getPatternsFile
	writeLine: (string) -> process.stdout.write "#{string}\n"
	writeErrLine: (string) -> process.stderr.write "#{string}\n"
	###
	# Create project with given structure
	#
	# @param array paths - Compiled paths
	###
	create: (paths) ->
		for path in paths
			if path[0] == on
				fs.writeFileSync path[1], ''
			else if path[0] == no
				fs.mkdirSync path[1]
		@writeLine 'Tavi said: Your project has been successfully created!'
	
	###
	# Save pattern (compiled)
	#
	# @param string name - Pattern name
	# @param array paths - Compiled paths
	###
	save: (name, paths) ->
		if !name and Array.isArray name
			throw new Error "Pattern name cannot be empty!"
		# patternsFilePath = do getPatternsFile
		patterns = require @PATTERNS_FILE_PATH
		if name of patterns
			throw new Error "Patten #{name} is already exists"

		patterns[name] = paths
		fs.writeFileSync @PATTERNS_FILE_PATH, JSON.stringify patterns

getTaviDir = ->
	taviDir = process.env[(if process.platform == 'win32' then 'USERPROFILE' else 'HOME')] + '/.tavi'
	try
		fs.lstatSync taviPatternsDir
	catch e
		fs.mkdirSync taviPatternsDir
	finally
		return taviDir

getPatternsFile = ->
	patternsFilePath = (do getTaviDir) + '/patterns.json'
	try
		fs.lstatSync patternsFilePath
	catch e
		fs.writeFileSync patternsFilePath, '{}'
	finally
		return patternsFilePath