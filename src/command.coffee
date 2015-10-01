tavi = require './tavi'
optparser = require './optparser'
parser = require './parser'

fs = require 'fs'

SWITCHERS = [
	['-h', '--help', 'Display this help message'],
	['-v', '--version', 'Display current Tavi version'],
	['-c', '--create', 'Create project with given pattern'],
	# ['-t', '--tree', 'Show tree for given pattern'],
	# ['-s', '--save', 'Add new pattern and save one to Tavi storage']
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
	return create parser.resolve options.create.toString() if 'create' of options
	return tavi.writeLine (new optparser.OptionParser(SWITCHERS, BANNER)).help() if 'help' of options

parseArgs = ->
	argv = process.argv[2..]
	optionParser = new optparser.OptionParser SWITCHERS, BANNER
	options = optionParser.parse argv
	if Object.keys(options).length == 0
		return null
	return options

create = (paths) ->
	for path in paths
		if path[0] == on
			fs.writeFileSync path[1], ''
		else if path[0] == no
			fs.mkdirSync path[1]
	tavi.writeLine 'Tavi said: Your project has been successfully created!'
usage = -> tavi.writeLine "Tavi said: Sorry, but I can't create your project: no params given. :(\n" + (new optparser.OptionParser(SWITCHERS, BANNER)).help()

version = -> tavi.writeLine "Tavi said: My current version is v#{tavi.VERSION}"