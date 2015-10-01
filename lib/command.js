var BANNER, SWITCHERS, create, fs, optparser, parseArgs, parser, tavi, usage, version;

tavi = require('./tavi');

optparser = require('./optparser');

parser = require('./parser');

fs = require('fs');

SWITCHERS = [['-h', '--help', 'Display this help message'], ['-v', '--version', 'Display current Tavi version'], ['-c', '--create', 'Create project with given pattern']];

BANNER = 'Usage: tavi -c pattern\n\nIf given only pattern, tavi will create your project';

exports.run = function() {
  var options;
  options = parseArgs();
  if (options === null) {
    return usage();
  }
  if ('version' in options) {
    return version();
  }
  if ('create' in options) {
    return create(parser.resolve(options.create.toString()));
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

create = function(paths) {
  var i, len, path;
  for (i = 0, len = paths.length; i < len; i++) {
    path = paths[i];
    if (path[0] === true) {
      fs.writeFileSync(path[1], '');
    } else if (path[0] === false) {
      fs.mkdirSync(path[1]);
    }
  }
  return tavi.writeLine('Tavi said: Your project has been successfully created!');
};

usage = function() {
  return tavi.writeLine("Tavi said: Sorry, but I can't create your project: no params given. :(\n" + (new optparser.OptionParser(SWITCHERS, BANNER)).help());
};

version = function() {
  return tavi.writeLine("Tavi said: My current version is v" + tavi.VERSION);
};
