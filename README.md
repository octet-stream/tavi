# Tavi

Tavi is small utility for create projects :)

## Installation
You can install Tavi using npm:

```bash
	sudo npm install -g tavi
```

## Usage
You can provide Tavi only pattern:

```bash
	tavi pattern
```

Pattern may contain **only** dashes, dots, alphabet symbols and numbers.

Use these special symbols in your pattern for:

* / - add subdirectory to current directory
* \+ - add something to current level
* ^ - up to one level


## Examples
For this pattern

```bash
	tavi -c foo/.bowerrc+.npmignore+.gitignore+coffee/main.coffee+extra.coffee^public/assets/css+js^img/browsers+errors+icns+layout^^stylus/common.styl+luna.styl^views/about.jade+error-page.jade+home.jade+layout.jade+pro.jade
```

Tavi will create project with this structure:

	./foo
	./foo/coffee
	./foo/.bowerrc
	./foo/.npmignore
	./foo/.gitignore
	./foo/coffee/main.coffee
	./foo/coffee/extra.coffee
	./foo/public
	./foo/public/assets
	./foo/public/assets/css
	./foo/public/assets/js
	./foo/public/img
	./foo/public/img/browsers
	./foo/public/img/errors
	./foo/public/img/icns
	./foo/public/img/layout
	./foo/stylus
	./foo/stylus/common.styl
	./foo/stylus/luna.styl
	./foo/views
	./foo/views/about.jade
	./foo/views/home.jade
	./foo/views/layout.jade
	./foo/views/error-page.jade
	./foo/views/pro.jade

## Other information about repository
The source repository:

To suggest a feature or report a bug: