var EXP_STR, FILES_EXCEPTIONS, buildPaths, path, resolve,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

path = require('path');

FILES_EXCEPTIONS = ['.gitignore', '.npmignore', '.htaccess', '.bowerrc'];

EXP_STR = /[a-zA-Zа-яА-Я0-9-\.]+(?=[\+\/\^])?|[\/\^\+]{1}/g;


/*
 * Paths builder
 *
 * Build paths array by given matches
 *
 * @param array matches
 *
 * @return array Paths
 * returning array like this:
 * [
 * 	[false, './foo'],
 * 	[false, './foo/coffee'],
 * 	[true, './foo/.bowerrc'],
 * 	[true, './foo/.npmignore'],
 * 	[true, './foo/.gitignore'],
 * 	[true, './foo/coffee/main.coffee'],
 * 	[true, './foo/coffee/extra.coffee'],
 * 	[false, './foo/public'],
 * 	[false, './foo/public/assets'],
 * 	[false, './foo/public/assets/css'],
 * 	[false, './foo/public/assets/js'],
 * 	[false, './foo/public/img'],
 * 	[false, './foo/public/img/browsers'],
 * 	[false, './foo/public/img/errors'],
 * 	[false, './foo/public/img/icns'],
 * 	[false, './foo/public/img/layout'],
 * 	[false, './foo/stylus'],
 * 	[true, './foo/stylus/common.styl'],
 * 	[true, './foo/stylus/luna.styl'],
 * 	[false, './foo/views'],
 * 	[true, './foo/views/about.jade'],
 * 	[true, './foo/views/home.jade'],
 * 	[true, './foo/views/layout.jade'],
 * 	[true, './foo/views/error-page.jade'],
 * 	[true, './foo/views/pro.jade'],
 * ]
 */

buildPaths = function(matches) {
  var DS, currentPathEnd, element, i, index, isFile, len, p, pathsArray;
  DS = '/';
  p = "." + DS;
  pathsArray = [];
  currentPathEnd = '';
  for (index = i = 0, len = matches.length; i < len; index = ++i) {
    element = matches[index];
    if (/[a-zA-Zа-яА-Я0-9-\.]+/.test(element)) {
      currentPathEnd = element;
      p += element;
      isFile = (indexOf.call(FILES_EXCEPTIONS, element) >= 0) || (matches[index + 1] !== '/' && '' !== path.extname(element)) ? true : false;
      pathsArray.push([isFile, p]);
    } else if (element === '/') {
      p += element;
    } else if (element === '^') {
      p = p.replace(/\/[a-zA-Zа-яА-Я0-9-\.]+$/, '/');
      p = p.replace(/[a-zA-Zа-яА-Я0-9-\.]+\/$/, '');
    } else if (element === '+') {
      p = p.replace(matches[index - 1], '');
      continue;
    }
  }
  return pathsArray;
};

exports.resolve = resolve = function(pattern) {
  return buildPaths(pattern.match(EXP_STR));
};
