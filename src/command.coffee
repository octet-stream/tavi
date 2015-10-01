tavi = new (require './tavi')
optparser = require './optparser'
parser = require './parser'

fs = require 'fs'

SWITCHERS = [
	['-h', '--help', 'Display this help message'],
	['-v', '--version', 'Display current Tavi version'],
	['-c', '--create', 'Create project with given pattern'],
	['-s', '--save', 'Save new pattern']
	# ['-t', '--tree', 'Show tree for given pattern'],
	# ['-d', '--dependencies', 'You can provide dependencies for your project (only for npm)']
]

BANNER = '''
	Usage: tavi -c pattern

	If given only pattern, tavi will create your project
'''

exports.run = ->
	options = do parseArgs
	return do usage if options == null
	return do version if 'version' of options
	if 'create' of options
		# tavi.create parser.resolve options.create.toString()
		savedPatterns = require tavi.PATTERNS_FILE_PATH
		tavi.create if options.create of savedPatterns then savedPatterns[options.create] else parser.resolve options.create.toString()
		return
	return tavi.save options.save[0], parser.resolve options.save[1].toString() if 'save' of options
	return tavi.writeLine (new optparser.OptionParser(SWITCHERS, BANNER)).help() if 'help' of options

parseArgs = ->
	argv = process.argv[2..]
	optionParser = new optparser.OptionParser SWITCHERS, BANNER
	options = optionParser.parse argv
	if Object.keys(options).length == 0
		return null
	return options

usage = -> tavi.writeLine "Tavi said: Sorry, but I can't create your project: no params given. :(\n" + (new optparser.OptionParser(SWITCHERS, BANNER)).help()

version = -> tavi.writeLine "Tavi said: My current version is v#{tavi.VERSION}"