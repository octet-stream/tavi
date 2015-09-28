var LONG_FLAG, MULTI_FLAG, OPTIONAL, OptionParser, SHORT_FLAG, buildRule, buildRules, helpers;

helpers = require('./helpers');

exports.OptionParser = OptionParser = (function() {
  function OptionParser(rules, banner) {
    this.banner = banner;
    this.rules = buildRules(rules);
  }

  OptionParser.prototype.parse = function(args) {
    var arg, current, i, isOption, j, k, len, len1, matchedRule, options, ref, rule;
    options = {};
    current = 'create';
    for (i = j = 0, len = args.length; j < len; i = ++j) {
      arg = args[i];
      isOption = !!(arg.match(LONG_FLAG) || arg.match(SHORT_FLAG));
      matchedRule = false;
      ref = this.rules;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        rule = ref[k];
        if (rule.shortFlag === arg || rule.longFlag === arg) {
          options[rule.name] = [];
          current = rule.name;
          matchedRule = true;
          break;
        }
      }
      if (isOption && !matchedRule) {
        throw new Error("Aw, snap! Unrecognized option " + arg);
      }
      if (!isOption) {
        if (current in options) {
          options[current].push(arg);
        } else {
          options[current] = [arg];
        }
      }
    }
    return options;
  };


  /*
  	 * Generate pretty flags for help message
   */

  OptionParser.prototype.help = function() {
    var j, len, letPart, lines, ref, rule, spaces;
    lines = [];
    if (this.banner) {
      lines.unshift(this.banner + "\n");
    }
    ref = this.rules;
    for (j = 0, len = ref.length; j < len; j++) {
      rule = ref[j];
      spaces = 15 - rule.longFlag.length;
      spaces = spaces > 0 ? helpers.repeat(' ', spaces) : '';
      letPart = rule.shortFlag ? rule.shortFlag + ', ' : '    ';
      lines.push('  ' + letPart + rule.longFlag + spaces + rule.description);
    }
    return "\n" + (lines.join('\n')) + "\n";
  };

  return OptionParser;

})();


/*
 * Build rule
 *
 * @param string shortFlag
 * @param string longFlag
 * @param string description
 * @param object options
 *
 * @return object Builded rule
 */

buildRule = function(shortFlag, longFlag, description, options) {
  var match;
  if (options == null) {
    options = {};
  }
  match = longFlag.match(OPTIONAL);
  longFlag = longFlag.match(LONG_FLAG)[1];
  return {
    name: longFlag.substr(2),
    shortFlag: shortFlag,
    longFlag: longFlag,
    description: description,
    hasArgument: !!(match && match[1]),
    isList: !!(match && match[2])
  };
};


/*
 * Build given rules
 *
 * @param array rules
 *
 * @return array
 */

buildRules = function(rules) {
  var j, len, results, rule;
  results = [];
  for (j = 0, len = rules.length; j < len; j++) {
    rule = rules[j];
    if (rule.length < 3) {
      rule.unshift(null);
    }
    results.push(buildRule.apply(null, rule));
  }
  return results;
};

LONG_FLAG = /^(--\w[\w\-]*)/;

SHORT_FLAG = /^(-\w)$/;

MULTI_FLAG = /^-(\w{2,})/;

OPTIONAL = /\[(\w+(\*?))\]/;
