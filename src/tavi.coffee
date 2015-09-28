exports.VERSION = require('../package.json').version

exports.writeLine = writeLine = (string) -> process.stdout.write "#{string}\n"
exports.writeErrLine = writeErrLine = (string) -> process.stderr.write "#{string}\n"