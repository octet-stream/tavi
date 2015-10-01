var BANNER, SWITCHERS, fs, optparser, parseArgs, parser, tavi, usage, version;

tavi = new (require('./tavi'));

optparser = require('./optparser');

parser = require('./parser');

fs = require('fs');

SWITCHERS = [['-h', '--help', 'Display this help message'], ['-v', '--version', 'Display current Tavi version'], ['-c', '--create', 'Create project with given pattern'], ['-s', '--save', 'Save new pattern']];

BANNER = 'Usage: tavi -c pattern\n\nIf given only pattern, tavi will create your project';

exports.run = function() {
  var options, savedPatterns;
  options = parseArgs();
  if (options === null) {
    return usage();
  }
  if ('version' in options) {
    return version();
  }
  if ('create' in options) {
    savedPatterns = require(tavi.PATTERNS_FILE_PATH);
    tavi.create(options.create in savedPatterns ? savedPatterns[options.create] : parser.resolve(options.create.toString()));
    return;
  }
  if ('save' in options) {
    return tavi.save(options.save[0], parser.resolve(options.save[1].toString()));
  }
  if ('help' in options) {
    return tavi.writeLine((new optparser.OptionParser(SWITCHERS, BANNER)).help());
  }
};

parseArgs = function() {
  var argv, optionParser, options;
  argv = process.argv.slice(2);
  optionParser = new optparser.OptionParser(SWITCHERS, BANNER);
  options = optionParser.parse(argv);
  if (Object.keys(options).length === 0) {
    return null;
  }
  return options;
};

usage = function() {
  return tavi.writeLine("Tavi said: Sorry, but I can't create your project: no params given. :(\n" + (new optparser.OptionParser(SWITCHERS, BANNER)).help());
};

version = function() {
  return tavi.writeLine("Tavi said: My current version is v" + tavi.VERSION);
};
