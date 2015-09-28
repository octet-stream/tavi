helpers = require './helpers'

exports.OptionParser = class OptionParser
	constructor: (rules, @banner) ->
		@rules = buildRules rules
	parse: (args) ->
		options = {}
		current = 'create'
		for arg, i in args
			isOption = !!(arg.match(LONG_FLAG) or arg.match(SHORT_FLAG))
			matchedRule = no
			for rule in @rules
				if rule.shortFlag is arg or rule.longFlag is arg
					options[rule.name] = []
					current = rule.name
					matchedRule = yes
					break
			throw new Error "Aw, snap! Unrecognized option #{arg}" if isOption and not matchedRule
			if not isOption
				if current of options then options[current].push arg else options[current] = [arg]
		return options

	###
	# Generate pretty flags for help message
	###
	help: ->
		lines = []
		lines.unshift "#{@banner}\n" if @banner
		for rule in @rules
			spaces  = 15 - rule.longFlag.length
			spaces  = if spaces > 0 then helpers.repeat ' ', spaces else ''
			letPart = if rule.shortFlag then rule.shortFlag + ', ' else '    '
			lines.push '  ' + letPart + rule.longFlag + spaces + rule.description
		"\n#{ lines.join('\n') }\n"

###
# Build rule
#
# @param string shortFlag
# @param string longFlag
# @param string description
# @param object options
#
# @return object Builded rule
###
buildRule = (shortFlag, longFlag, description, options = {}) ->
	match = longFlag.match OPTIONAL
	longFlag = longFlag.match(LONG_FLAG)[1]

	return {
		name: longFlag.substr 2
		shortFlag: shortFlag
		longFlag: longFlag
		description: description
		hasArgument: !!(match and match[1])
		isList: !!(match and match[2])
	}

###
# Build given rules
#
# @param array rules
#
# @return array
###
buildRules = (rules) ->
	for rule in rules
		rule.unshift null if rule.length < 3
		buildRule rule...

# Helpers
LONG_FLAG = /^(--\w[\w\-]*)/
SHORT_FLAG = /^(-\w)$/
MULTI_FLAG = /^-(\w{2,})/
OPTIONAL = /\[(\w+(\*?))\]/