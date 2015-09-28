var writeErrLine, writeLine;

exports.VERSION = require('../package.json').version;

exports.writeLine = writeLine = function(string) {
  return process.stdout.write(string + "\n");
};

exports.writeErrLine = writeErrLine = function(string) {
  return process.stderr.write(string + "\n");
};
