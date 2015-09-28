exports.repeat = repeat = (str, n) ->
	# Use clever algorithm to have O(log(n)) string concatenation operations.
	res = ''
	while n > 0
		res += str if n & 1
		n >>>= 1
		str += str
	return res