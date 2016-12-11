module.exports = {
  root: true,
  // Esprima
  // Babel-ESLint - A wrapper around the Babel parser that makes it compatible with ESLint.
  parser: 'babel-eslint',
  parserOptions: {
    // ecma的版本，默认5
    ecmaVersion: 6,
    // 'script'和'module'，默认script
    sourceType: 'module',
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // ecma特性
    ecmaFeatures: {
      // 默认false
      // globalReturn: allow return statements in the global scope
      // impliedStrict: enable global strict mode (if ecmaVersion is 5 or greater)
      // jsx: enable JSX
      // experimentalObjectRestSpread: 是否支持 试验中的 rest、spread运算符(...)
      "experimentalObjectRestSpread": true
    }
  },
  globals: {
  },
  env: {
  	"browser": true,
 	"commonjs": true,
	"es6": true,
	"node": true
    // browser - browser global variables.
    // node - Node.js global variables and Node.js scoping.
    // commonjs - CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
    // shared-node-browser - Globals common to both Node and Browser.
    // es6 - enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
    // worker - web workers global variables.
    // amd - defines require() and define() as global variables as per the amd spec.
    // mocha - adds all of the Mocha testing global variables.
    // jasmine - adds all of the Jasmine testing global variables for version 1.3 and 2.0.
    // jest - Jest global variables.
    // phantomjs - PhantomJS global variables.
    // protractor - Protractor global variables.
    // qunit - QUnit global variables.
    // jquery - jQuery global variables.
    // prototypejs - Prototype.js global variables.
    // shelljs - ShellJS global variables.
    // meteor - Meteor global variables.
    // mongo - MongoDB global variables.
    // applescript - AppleScript global variables.
    // nashorn - Java 8 Nashorn global variables.
    // serviceworker - Service Worker global variables.
    // atomtest - Atom test helper globals.
    // embertest - Ember test helper globals.
    // webextensions - WebExtensions globals.
    // greasemonkey - GreaseMonkey globals.
  },
  plugins: [
  ],
  settings: {
  },
  // add your custom rules here
  'rules': {
    'semi': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
