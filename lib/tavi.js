var Tavi, fs, getPatternsFile, getTaviDir;

fs = require('fs');

module.exports = Tavi = (function() {
  function Tavi() {
    this.VERSION = require('../package.json').version;
    this.PATTERNS_FILE_PATH = getPatternsFile();
  }

  Tavi.prototype.writeLine = function(string) {
    return process.stdout.write(string + "\n");
  };

  Tavi.prototype.writeErrLine = function(string) {
    return process.stderr.write(string + "\n");
  };


  /*
  	 * Create project with given structure
  	 *
  	 * @param array paths - Compiled paths
   */

  Tavi.prototype.create = function(paths) {
    var i, len, path;
    for (i = 0, len = paths.length; i < len; i++) {
      path = paths[i];
      if (path[0] === true) {
        fs.writeFileSync(path[1], '');
      } else if (path[0] === false) {
        fs.mkdirSync(path[1]);
      }
    }
    return this.writeLine('Tavi said: Your project has been successfully created!');
  };


  /*
  	 * Save pattern (compiled)
  	 *
  	 * @param string name - Pattern name
  	 * @param array paths - Compiled paths
   */

  Tavi.prototype.save = function(name, paths) {
    var patterns;
    if (!name && Array.isArray(name)) {
      throw new Error("Pattern name cannot be empty!");
    }
    patterns = require(this.PATTERNS_FILE_PATH);
    if (name in patterns) {
      throw new Error("Patten " + name + " is already exists");
    }
    patterns[name] = paths;
    return fs.writeFileSync(this.PATTERNS_FILE_PATH, JSON.stringify(patterns));
  };

  return Tavi;

})();

getTaviDir = function() {
  var e, error, taviDir;
  taviDir = process.env[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')] + '/.tavi';
  try {
    return fs.lstatSync(taviPatternsDir);
  } catch (error) {
    e = error;
    return fs.mkdirSync(taviPatternsDir);
  } finally {
    return taviDir;
  }
};

getPatternsFile = function() {
  var e, error, patternsFilePath;
  patternsFilePath = (getTaviDir()) + '/patterns.json';
  try {
    return fs.lstatSync(patternsFilePath);
  } catch (error) {
    e = error;
    return fs.writeFileSync(patternsFilePath, '{}');
  } finally {
    return patternsFilePath;
  }
};
