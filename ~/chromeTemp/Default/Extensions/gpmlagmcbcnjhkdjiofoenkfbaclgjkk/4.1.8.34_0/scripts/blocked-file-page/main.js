/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function some(value) {
    return value !== undefined;
}
exports.some = some;
function none(value) {
    return value === undefined;
}
exports.none = none;
function serializeMaybe(value) {
    if (some(value)) {
        return value;
    }
    else {
        return null;
    }
}
exports.serializeMaybe = serializeMaybe;
function deserializeMaybe(value) {
    if (value === null) {
        return undefined;
    }
    else {
        return value;
    }
}
exports.deserializeMaybe = deserializeMaybe;
function isEqual(a, b) {
    return a === b;
}
exports.isEqual = isEqual;
var MaybeCompareOptions;
(function (MaybeCompareOptions) {
    MaybeCompareOptions[MaybeCompareOptions["none"] = 0] = "none";
    MaybeCompareOptions[MaybeCompareOptions["compareUndefined"] = 1] = "compareUndefined";
})(MaybeCompareOptions = exports.MaybeCompareOptions || (exports.MaybeCompareOptions = {}));
function maybeCompare(a, b, compare = isEqual, options = MaybeCompareOptions.none) {
    if (some(a) && some(b)) {
        return compare(a, b);
    }
    if (options & MaybeCompareOptions.compareUndefined) {
        return none(a) && none(b);
    }
    return false;
}
exports.maybeCompare = maybeCompare;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __webpack_require__(2);
const murmur_hash_1 = __webpack_require__(10);
const hash_map_1 = __webpack_require__(13);
const origin_1 = __webpack_require__(32);
var UrlCompareOptions;
(function (UrlCompareOptions) {
    UrlCompareOptions[UrlCompareOptions["Default"] = 0] = "Default";
    UrlCompareOptions[UrlCompareOptions["IgnoreSearchParams"] = 1] = "IgnoreSearchParams";
})(UrlCompareOptions = exports.UrlCompareOptions || (exports.UrlCompareOptions = {}));
var UrlComponent;
(function (UrlComponent) {
    UrlComponent[UrlComponent["Protocol"] = 1] = "Protocol";
    UrlComponent[UrlComponent["Username"] = 2] = "Username";
    UrlComponent[UrlComponent["Password"] = 4] = "Password";
    UrlComponent[UrlComponent["Host"] = 8] = "Host";
    UrlComponent[UrlComponent["Port"] = 16] = "Port";
    UrlComponent[UrlComponent["Pathname"] = 32] = "Pathname";
    UrlComponent[UrlComponent["Search"] = 64] = "Search";
    UrlComponent[UrlComponent["All"] = 127] = "All";
})(UrlComponent || (UrlComponent = {}));
function compareUrlComponents(a, b, components) {
    function compare(component) {
        return (components & component) !== 0;
    }
    if (compare(UrlComponent.Protocol) && a.protocol !== b.protocol) {
        return false;
    }
    if (compare(UrlComponent.Username) && a.username !== b.username) {
        return false;
    }
    if (compare(UrlComponent.Password) && a.password !== b.password) {
        return false;
    }
    if (compare(UrlComponent.Host) && a.host !== b.host) {
        return false;
    }
    if (compare(UrlComponent.Port) && a.port !== b.port) {
        return false;
    }
    if (compare(UrlComponent.Pathname) && a.pathname !== b.pathname) {
        return false;
    }
    if (compare(UrlComponent.Search) && a.search !== b.search) {
        return false;
    }
    return true;
}
function removeComponent(components, component) {
    return components & (~component);
}
function isSameUrl(a, b, options = UrlCompareOptions.Default) {
    switch (options) {
        case UrlCompareOptions.Default:
            return compareUrlComponents(a, b, UrlComponent.All);
        case UrlCompareOptions.IgnoreSearchParams:
            return compareUrlComponents(a, b, removeComponent(UrlComponent.All, UrlComponent.Search));
        default:
            throw new Error(`isSameUrl: invalid options: ${options}`);
    }
}
exports.isSameUrl = isSameUrl;
function isURL(value) {
    return value instanceof URL;
}
exports.isURL = isURL;
function parseUrl(spec) {
    try {
        return new URL(spec);
    }
    catch (e) {
        return undefined;
    }
}
exports.parseUrl = parseUrl;
function maybeParseUrl(spec) {
    const url = parseUrl(spec);
    if (url === undefined) {
        return spec;
    }
    else {
        return url;
    }
}
exports.maybeParseUrl = maybeParseUrl;
function parseURLIfNecessary(urlOrSpec) {
    if (isURL(urlOrSpec)) {
        return urlOrSpec;
    }
    else {
        return parseUrl(urlOrSpec);
    }
}
exports.parseURLIfNecessary = parseURLIfNecessary;
function isSameUrlOrSpec(a, b, options = UrlCompareOptions.Default) {
    if ((a instanceof URL) && (b instanceof URL)) {
        return isSameUrl(a, b);
    }
    else if ((typeof a === "string") && (typeof b === "string")) {
        return a === b;
    }
    else {
        return undefined;
    }
}
exports.isSameUrlOrSpec = isSameUrlOrSpec;
function isFileUrl(url) {
    return string_utils_1.compareStrings(url.protocol, origin_1.Scheme.FILE);
}
exports.isFileUrl = isFileUrl;
function isExtensionUrl(url) {
    const extensionSchemes = [
        origin_1.Scheme.CHROME_EXTENSION,
        origin_1.Scheme.FIREFOX_EXTENSION,
        origin_1.Scheme.EDGE_EXTENSION
    ];
    return extensionSchemes.some((extensionScheme) => string_utils_1.compareStrings(url.protocol, extensionScheme));
}
exports.isExtensionUrl = isExtensionUrl;
function isBrowserUrl(url) {
    return string_utils_1.compareStrings(url.protocol, origin_1.Scheme.CHROME);
}
exports.isBrowserUrl = isBrowserUrl;
function URLToString(url) {
    if (url === undefined) {
        return "";
    }
    if (url instanceof URL) {
        return url.toString();
    }
    else {
        return url;
    }
}
exports.URLToString = URLToString;
function safeEncodeURI(uri) {
    if (uri === undefined) {
        return "";
    }
    return encodeURI(uri);
}
exports.safeEncodeURI = safeEncodeURI;
function safeEncodeURIComponent(component) {
    if (component === undefined) {
        return "";
    }
    return encodeURIComponent(component);
}
exports.safeEncodeURIComponent = safeEncodeURIComponent;
function hashUrlComponents(url, components, seed) {
    function compare(component) {
        return (components & component) !== 0;
    }
    let hash = seed;
    if (compare(UrlComponent.Protocol)) {
        hash = murmur_hash_1.murmurHash(url.protocol, hash);
    }
    if (compare(UrlComponent.Username)) {
        hash = murmur_hash_1.murmurHash(url.username, hash);
    }
    if (compare(UrlComponent.Password)) {
        hash = murmur_hash_1.murmurHash(url.password, hash);
    }
    if (compare(UrlComponent.Host)) {
        hash = murmur_hash_1.murmurHash(url.host, hash);
    }
    if (compare(UrlComponent.Port)) {
        hash = murmur_hash_1.murmurHash(url.port, hash);
    }
    if (compare(UrlComponent.Pathname)) {
        hash = murmur_hash_1.murmurHash(url.pathname, hash);
    }
    if (compare(UrlComponent.Search)) {
        hash = murmur_hash_1.murmurHash(url.search, hash);
    }
    return hash;
}
function hashUrl(url, options = UrlCompareOptions.Default, seed = 0) {
    switch (options) {
        case UrlCompareOptions.Default:
            return hashUrlComponents(url, UrlComponent.All, seed);
        case UrlCompareOptions.IgnoreSearchParams:
            return hashUrlComponents(url, removeComponent(UrlComponent.All, UrlComponent.Search), seed);
        default:
            throw new Error(`hashUrl: invalid options: ${options}`);
    }
}
exports.hashUrl = hashUrl;
function makeUrlHashMap(options = UrlCompareOptions.Default) {
    return new hash_map_1.HashMap((url) => hashUrl(url, options), (a, b) => isSameUrl(a, b, options));
}
exports.makeUrlHashMap = makeUrlHashMap;
function makeUrlHashSet(options = UrlCompareOptions.Default) {
    return new hash_map_1.HashSet((url) => hashUrl(url, options), (a, b) => isSameUrl(a, b, options));
}
exports.makeUrlHashSet = makeUrlHashSet;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const murmur_hash_1 = __webpack_require__(10);
const hash_map_1 = __webpack_require__(13);
const url_utils_1 = __webpack_require__(1);
var StringCompareOptions;
(function (StringCompareOptions) {
    StringCompareOptions[StringCompareOptions["CaseSensitive"] = 0] = "CaseSensitive";
    StringCompareOptions[StringCompareOptions["LowerCase"] = 1] = "LowerCase";
    StringCompareOptions[StringCompareOptions["LocaleLowerCase"] = 2] = "LocaleLowerCase";
})(StringCompareOptions = exports.StringCompareOptions || (exports.StringCompareOptions = {}));
function compareStrings(a, b, options = StringCompareOptions.CaseSensitive) {
    switch (options) {
        case StringCompareOptions.CaseSensitive:
            return a === b;
        case StringCompareOptions.LowerCase:
            return a.toLowerCase() === b.toLowerCase();
        case StringCompareOptions.LocaleLowerCase:
            return a.toLocaleLowerCase() === b.toLocaleLowerCase();
        default:
            throw new Error('stringCompare');
    }
}
exports.compareStrings = compareStrings;
function hashString(value) {
    let hash = 0;
    hash = murmur_hash_1.murmurHash(value, hash);
    return hash;
}
exports.hashString = hashString;
function makeStringHashSet() {
    return new hash_map_1.HashSet(hashString, compareStrings);
}
exports.makeStringHashSet = makeStringHashSet;
function makeStringHashMap() {
    return new hash_map_1.HashMap(hashString, compareStrings);
}
exports.makeStringHashMap = makeStringHashMap;
function line(value) {
    return `${value}\n`;
}
function surround(value, typeName, openTag, closeTag, indentLevel) {
    const indent = makeIndent(indentLevel - 1);
    if (value) {
        return `${line(`${typeName}${openTag}`)}${value}${indent(closeTag)}`;
    }
    else {
        return `${typeName}${openTag}${closeTag}`;
    }
}
function makeKeyValuePrinter(toString, indent) {
    return (key, value) => {
        return line(indent(`${toString(key)}: ${toString(value)},`));
    };
}
function mapToString(map, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printKeyValue = makeKeyValuePrinter(toString, indent);
    let result = "";
    map.forEach((value, key) => {
        result += printKeyValue(key, value);
    });
    return surround(result, "Map", "{", "}", indentLevel);
}
function makeValuePrinter(toString, indent) {
    return (value) => {
        return line(indent(`${toString(value)},`));
    };
}
function setToString(set, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printValue = makeValuePrinter(toString, indent);
    let result = "";
    set.forEach((key) => {
        result += printValue(key);
    });
    return surround(result, "Set", "{", "}", indentLevel);
}
function arrayToString(array, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printValue = makeValuePrinter(toString, indent);
    let result = "";
    array.forEach((value) => {
        result += printValue(value);
    });
    return surround(result, "Array", "[", "]", indentLevel);
}
function objectToString(value, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printKeyValue = makeKeyValuePrinter(toString, indent);
    let result = "";
    for (const propertyName of Object.getOwnPropertyNames(value)) {
        const property = value[propertyName];
        if (!isFunction(property)) {
            result += printKeyValue(propertyName, property);
        }
    }
    return surround(result, typeName(value), "{", "}", indentLevel);
}
const defaultToStringFunction = (() => {
    const emptyObject = {};
    return emptyObject.toString;
})();
function defaultToString(value) {
    return defaultToStringFunction.call(value);
}
function hasCustomToString(value) {
    return value.toString !== defaultToStringFunction;
}
function isFunction(value) {
    return value instanceof Function;
}
function makeIndentation(indentLevel) {
    if (indentLevel <= 0) {
        return "";
    }
    const tab = "\t";
    let indentation = "";
    for (let level = 0; level < indentLevel; level += 1) {
        indentation += tab;
    }
    return indentation;
}
function makeIndent(indentLevel) {
    const indentation = makeIndentation(indentLevel);
    return (value) => {
        return `${indentation}${value}`;
    };
}
function typeOf(value) {
    return value.constructor;
}
function typeName(value) {
    return typeOf(value).name;
}
function toStringRecursive(value, seenObjects, indentLevel) {
    function didSee(value) {
        return seenObjects.has(value);
    }
    function seeObject(value) {
        seenObjects.add(value);
        return seenObjects;
    }
    const nextIndentLevel = indentLevel + 1;
    if (value === undefined) {
        return "undefined";
    }
    else if (value === null) {
        return "null";
    }
    else if (typeof value === "boolean") {
        return value.toString();
    }
    else if (typeof value === "number") {
        return value.toString();
    }
    else if (typeof value === "string") {
        return value;
    }
    else if (value instanceof Array) {
        return arrayToString(value, seeObject(value), nextIndentLevel);
    }
    else if (value instanceof Map) {
        return mapToString(value, seeObject(value), nextIndentLevel);
    }
    else if (value instanceof Set) {
        return setToString(value, seeObject(value), nextIndentLevel);
    }
    else if (value instanceof URL) {
        return url_utils_1.URLToString(value);
    }
    else if (isFunction(value)) {
        return typeName(value);
    }
    else if (didSee(value)) {
        return typeName(value);
    }
    else if (hasCustomToString(value)) {
        return value.toString();
    }
    else {
        return objectToString(value, seeObject(value), nextIndentLevel);
    }
}
function toString(value, initialIndentLevel = 0) {
    const seenObjects = new Set();
    const indentLevel = initialIndentLevel;
    return toStringRecursive(value, seenObjects, indentLevel);
}
exports.toString = toString;
function safeToString(value) {
    if (value === undefined) {
        return "undefined";
    }
    else if (value === null) {
        return "null";
    }
    else {
        return value.toString();
    }
}
exports.safeToString = safeToString;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isEmptyString(value) {
    return value.length === 0;
}
exports.isEmptyString = isEmptyString;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(11);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(8);
util.inherits = __webpack_require__(5);
/*</replacement>*/

var Readable = __webpack_require__(18);
var Writable = __webpack_require__(17);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const number_utils_1 = __webpack_require__(9);
const array_utils_1 = __webpack_require__(57);
var MessageType;
(function (MessageType) {
    MessageType[MessageType["handshakeV1"] = 0] = "handshakeV1";
    MessageType[MessageType["launchBrowserRequestV1"] = 1] = "launchBrowserRequestV1";
    MessageType[MessageType["launchBrowserResponseV1"] = 2] = "launchBrowserResponseV1";
    MessageType[MessageType["pageEventV1"] = 3] = "pageEventV1";
    MessageType[MessageType["configRequestV1"] = 4] = "configRequestV1";
    MessageType[MessageType["configChangedV1"] = 5] = "configChangedV1";
    MessageType[MessageType["trustUrlV1"] = 6] = "trustUrlV1";
    MessageType[MessageType["downloadCompleteV1"] = 7] = "downloadCompleteV1";
    MessageType[MessageType["logMessageV1"] = 8] = "logMessageV1";
    MessageType[MessageType["addUserTrustedOriginV1"] = 9] = "addUserTrustedOriginV1";
    MessageType[MessageType["addUserUntrustedOriginV1"] = 10] = "addUserUntrustedOriginV1";
    MessageType[MessageType["helperErrorV1"] = 11] = "helperErrorV1";
    MessageType[MessageType["dormantStateChangedV1"] = 12] = "dormantStateChangedV1";
    MessageType[MessageType["extensionReadyV1"] = 13] = "extensionReadyV1";
    MessageType[MessageType["externalAppLinkRequestV1"] = 14] = "externalAppLinkRequestV1";
    MessageType[MessageType["externalAppLinkResponseV1"] = 15] = "externalAppLinkResponseV1";
    MessageType[MessageType["isFileURLTrustedRequestV1"] = 16] = "isFileURLTrustedRequestV1";
    MessageType[MessageType["isFileURLTrustedResponseV1"] = 17] = "isFileURLTrustedResponseV1";
    MessageType[MessageType["blockedFileRequestV1"] = 18] = "blockedFileRequestV1";
    MessageType[MessageType["blockedFileResponseV1"] = 19] = "blockedFileResponseV1";
    MessageType[MessageType["popupDataRequestV1"] = 20] = "popupDataRequestV1";
    MessageType[MessageType["popupDataResponseV1"] = 21] = "popupDataResponseV1";
    MessageType[MessageType["clearRememberedDecisionsV1"] = 22] = "clearRememberedDecisionsV1";
    MessageType[MessageType["blockedPageStringsRequestV1"] = 23] = "blockedPageStringsRequestV1";
    MessageType[MessageType["blockedPageStringsResponseV1"] = 24] = "blockedPageStringsResponseV1";
    MessageType[MessageType["heartbeatV1"] = 25] = "heartbeatV1";
    MessageType[MessageType["enabledFeaturesRequestV2"] = 26] = "enabledFeaturesRequestV2";
    MessageType[MessageType["enabledFeaturesResponseV2"] = 27] = "enabledFeaturesResponseV2";
    MessageType[MessageType["clearRememberedOriginV3"] = 28] = "clearRememberedOriginV3";
    MessageType[MessageType["optionsDataRequestV3"] = 29] = "optionsDataRequestV3";
    MessageType[MessageType["optionsDataResponseV3"] = 30] = "optionsDataResponseV3";
    MessageType[MessageType["configChangedV3"] = 31] = "configChangedV3";
    MessageType[MessageType["reputationChangedV3"] = 32] = "reputationChangedV3";
    MessageType[MessageType["configChangedV4"] = 33] = "configChangedV4";
    MessageType[MessageType["blockedPageDataRequestV4"] = 34] = "blockedPageDataRequestV4";
    MessageType[MessageType["blockedPageDataResponseV4"] = 35] = "blockedPageDataResponseV4";
    MessageType[MessageType["configChangedV5"] = 36] = "configChangedV5";
    MessageType[MessageType["popupDataResponseV5"] = 37] = "popupDataResponseV5";
    MessageType[MessageType["blockedPageDataResponseV6"] = 38] = "blockedPageDataResponseV6";
    MessageType[MessageType["trustUrlV6"] = 39] = "trustUrlV6";
    MessageType[MessageType["configChangedV7"] = 40] = "configChangedV7";
    MessageType[MessageType["trustUrlV8"] = 41] = "trustUrlV8";
    MessageType[MessageType["dontAskAgainV8"] = 42] = "dontAskAgainV8";
    MessageType[MessageType["configChangedV8"] = 43] = "configChangedV8";
    MessageType[MessageType["popupDataResponseV9"] = 44] = "popupDataResponseV9";
    MessageType[MessageType["dontAskAgainV9"] = 45] = "dontAskAgainV9";
    MessageType[MessageType["configChangedV9"] = 46] = "configChangedV9";
    MessageType[MessageType["stopHelperV10"] = 47] = "stopHelperV10";
    MessageType[MessageType["edgeAckV10"] = 48] = "edgeAckV10";
    MessageType[MessageType["endOfStreamV10"] = 49] = "endOfStreamV10";
    MessageType[MessageType["heartbeatV10"] = 50] = "heartbeatV10";
    MessageType[MessageType["popupDataResponseV11"] = 51] = "popupDataResponseV11";
    MessageType[MessageType["configChangedV11"] = 52] = "configChangedV11";
    MessageType[MessageType["configChangedV12"] = 53] = "configChangedV12";
    MessageType[MessageType["minMessageType"] = 0] = "minMessageType";
    MessageType[MessageType["maxMessageType"] = 53] = "maxMessageType";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function isMessageType(type) {
    return number_utils_1.isInRange(type, MessageType.minMessageType, MessageType.maxMessageType);
}
exports.isMessageType = isMessageType;
function isFrequentlySentMessageType(type) {
    const frequentlySentMessageTypes = [
        MessageType.logMessageV1,
        MessageType.pageEventV1,
        MessageType.heartbeatV1,
        MessageType.edgeAckV10
    ];
    return array_utils_1.has(frequentlySentMessageTypes, type);
}
exports.isFrequentlySentMessageType = isFrequentlySentMessageType;
function isEdgeAckWorkaround(type) {
    return type === MessageType.edgeAckV10;
}
exports.isEdgeAckWorkaround = isEdgeAckWorkaround;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20).Buffer))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isInRange(value, min, max) {
    return (value >= min) && (value <= max);
}
exports.isInRange = isInRange;
function isNumber(value) {
    return typeof value === "number";
}
exports.isNumber = isNumber;
function parseNumber(value) {
    try {
        const base = 10;
        return parseInt(value, base);
    }
    catch (e) {
        return undefined;
    }
}
exports.parseNumber = parseNumber;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function murmurHashString(key, seed) {
    let len = key.length * 2;
    const m = 0xc6a4a793;
    const r = 16;
    let h = seed ^ (len * m);
    for (let i = 0; (i < key.length) && (len >= 4); i += 2) {
        const data = (key.charCodeAt(i) + (key.charCodeAt(i + 1) << 16));
        const k = data;
        h += k;
        h *= m;
        h ^= (h >> 16);
        len -= 4;
    }
    if (len === 2) {
        let data = key.charCodeAt(key.length - 1);
        h += data;
        h *= m;
        h ^= (h >> r);
    }
    h *= m;
    h ^= (h >> 10);
    h *= m;
    h ^= (h >> 17);
    return h;
}
function murmurHashNumber(key, seed) {
    let len = 4;
    const m = 0xc6a4a793;
    const r = 16;
    let h = seed ^ (len * m);
    const data = key & 0xffffffff;
    const k = data;
    h += k;
    h *= m;
    h ^= (h >> 16);
    h *= m;
    h ^= (h >> 10);
    h *= m;
    h ^= (h >> 17);
    return h;
}
function murmurHash(key, seed) {
    if (typeof key === 'string') {
        return murmurHashString(key, seed);
    }
    else if (typeof key === 'boolean') {
        return murmurHashNumber(key ? 1 : 0, seed);
    }
    else {
        return murmurHashNumber(key, seed);
    }
}
exports.murmurHash = murmurHash;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(20)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isPowerOf2(value) {
    const mask = value - 1;
    return (value & mask) === 0;
}
function mod(n, d) {
    return n & (d - 1);
}
var TryPutStatus;
(function (TryPutStatus) {
    TryPutStatus[TryPutStatus["ValueInserted"] = 0] = "ValueInserted";
    TryPutStatus[TryPutStatus["ValueUpdated"] = 1] = "ValueUpdated";
    TryPutStatus[TryPutStatus["Failure"] = 2] = "Failure";
})(TryPutStatus || (TryPutStatus = {}));
function convertToArray(elements, selector) {
    const filteredElements = elements.filter((element) => {
        return element !== undefined && element !== null;
    });
    const mappedElements = filteredElements.map(selector);
    return mappedElements;
}
class HashMap {
    constructor(hash, compare, initialCapacity = 0, fillFactor = 0.75) {
        this.hash = hash;
        this.compare = compare;
        this.fillFactor = fillFactor;
        this.size = 0;
        this.elements = [];
        if (initialCapacity !== 0) {
            this.resize(initialCapacity);
        }
    }
    shouldResize(size) {
        if (this.elements.length === 0) {
            return true;
        }
        return (size / this.elements.length) >= this.fillFactor;
    }
    findNextCapacity() {
        if (this.elements.length === 0) {
            return 2;
        }
        return this.elements.length * 2;
    }
    findIndex(hash, elements = this.elements) {
        const index = mod(hash, elements.length);
        if (index < 0) {
            throw new Error(`HashMap.findIndex: index < 0: ${index} < 0`);
        }
        if (index >= elements.length) {
            throw new Error(`HashMap.findIndex: index >= elements.length: ${index} >= ${elements.length}`);
        }
        return index;
    }
    compareKeys(ha, ka, hb, kb) {
        return (ha === hb) && this.compare(ka, kb);
    }
    tryPut(hash, key, value, start, end, elements = this.elements) {
        for (let i = start; i < end; i += 1) {
            const element = elements[i];
            if (element !== undefined && element !== null) {
                const [currentHash, currentKey, currentValue] = element;
                if (this.compareKeys(hash, key, currentHash, currentKey)) {
                    elements[i] = [hash, key, value];
                    return TryPutStatus.ValueUpdated;
                }
            }
            else {
                elements[i] = [hash, key, value];
                return TryPutStatus.ValueInserted;
            }
        }
        return TryPutStatus.Failure;
    }
    resize(capacity) {
        if (capacity <= this.elements.length) {
            throw new Error(`HashMap.resize: capacity <= this.elements.length: ${capacity} <= ${this.elements.length}`);
        }
        if (capacity <= this.size) {
            throw new Error(`HashMap.resize: capacity <= this.size: ${capacity} <= ${this.size}`);
        }
        if (!isPowerOf2(capacity)) {
            throw new Error(`HashMap.resize: !isPowerOf2(${capacity})`);
        }
        const elements = new Array(capacity);
        for (let element of this.elements) {
            if (element !== undefined && element !== null) {
                const [hash, key, value] = element;
                const index = this.findIndex(hash, elements);
                if (this.tryPut(hash, key, value, index, elements.length, elements) !== TryPutStatus.Failure) {
                    continue;
                }
                if (this.tryPut(hash, key, value, 0, index, elements) !== TryPutStatus.Failure) {
                    continue;
                }
                throw new Error(`HashMap.resize: !tryPut`);
            }
        }
        this.elements = elements;
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    isHole(element) {
        return element === undefined;
    }
    tryGet(hash, key, start, end) {
        const foundHole = true;
        for (let i = start; i < end; i += 1) {
            const element = this.elements[i];
            if (element !== undefined && element !== null) {
                const [currentHash, currentKey, currentValue] = element;
                if (this.compareKeys(hash, key, currentHash, currentKey)) {
                    return [!foundHole, currentValue];
                }
            }
            else if (this.isHole(element)) {
                return [foundHole, undefined];
            }
        }
        return [!foundHole, undefined];
    }
    get(key) {
        if (this.size === 0) {
            return undefined;
        }
        const hash = this.hash(key);
        const index = this.findIndex(hash);
        let [foundHole, value] = this.tryGet(hash, key, index, this.elements.length);
        if (value) {
            return value;
        }
        if (foundHole) {
            return undefined;
        }
        [foundHole, value] = this.tryGet(hash, key, 0, index);
        return value;
    }
    put(key, value) {
        if (this.shouldResize(this.size + 1)) {
            this.resize(this.findNextCapacity());
        }
        const hash = this.hash(key);
        const index = this.findIndex(hash);
        switch (this.tryPut(hash, key, value, index, this.elements.length)) {
            case TryPutStatus.ValueInserted:
                this.size += 1;
                return;
            case TryPutStatus.ValueUpdated:
                return;
        }
        switch (this.tryPut(hash, key, value, 0, index)) {
            case TryPutStatus.ValueInserted:
                this.size += 1;
                return;
            case TryPutStatus.ValueUpdated:
                return;
        }
        throw new Error('HashMap.put: !tryPut');
    }
    putMany(keyValues) {
        for (const [key, value] of keyValues) {
            this.put(key, value);
        }
    }
    tryRemove(hash, key, start, end) {
        const foundHole = true;
        const removed = true;
        for (let i = start; i < end; i += 1) {
            const element = this.elements[i];
            if (element !== undefined && element !== null) {
                const [currentHash, currentKey, currentValue] = element;
                if (this.compareKeys(hash, key, currentHash, currentKey)) {
                    this.elements[i] = null;
                    return [!foundHole, removed];
                }
            }
            else if (this.isHole(element)) {
                return [foundHole, !removed];
            }
        }
        return [!foundHole, !removed];
    }
    remove(key) {
        if (this.isEmpty()) {
            return false;
        }
        const hash = this.hash(key);
        const index = this.findIndex(hash);
        let [foundHole, removed] = this.tryRemove(hash, key, index, this.elements.length);
        if (removed) {
            this.size -= 1;
            return true;
        }
        if (foundHole) {
            return false;
        }
        [foundHole, removed] = this.tryRemove(hash, key, 0, index);
        if (removed) {
            this.size -= 1;
        }
        return removed;
    }
    isEmpty() {
        return this.size === 0;
    }
    toArray() {
        const selectKeyValue = ([hash, key, value]) => {
            return [key, value];
        };
        return convertToArray(this.elements, selectKeyValue);
    }
    *[Symbol.iterator]() {
        for (const element of this.elements) {
            if (element !== undefined && element !== null) {
                const [hash, key, value] = element;
                yield [key, value];
            }
        }
    }
}
exports.HashMap = HashMap;
class HashSet {
    constructor(hash, compare, initialCapacity = 0, fillFactor = 0.75) {
        this.map = new HashMap(hash, compare, initialCapacity, fillFactor);
    }
    get size() {
        return this.map.size;
    }
    addMany(keys) {
        let nKeysAdded = 0;
        for (const key of keys) {
            if (this.add(key)) {
                nKeysAdded += 1;
            }
        }
        return nKeysAdded;
    }
    add(key) {
        const sizeBefore = this.map.size;
        this.map.put(key, key);
        const sizeAfter = this.map.size;
        return (sizeAfter - sizeBefore) === 1;
    }
    has(key) {
        return this.map.has(key);
    }
    remove(key) {
        return this.map.remove(key);
    }
    isEmpty() {
        return this.map.isEmpty();
    }
    toArray() {
        const selectKey = ([hash, key, value]) => {
            return key;
        };
        return convertToArray(this.map.elements, selectKey);
    }
    *[Symbol.iterator]() {
        for (const element of this.map.elements) {
            if (element !== undefined && element !== null) {
                const [hash, key, value] = element;
                yield key;
            }
        }
    }
}
exports.HashSet = HashSet;
function defaultHash(instance) {
    return instance.hash();
}
function defaultCompare(a, b) {
    return a.compare(b);
}
function makeDefaultHashMap() {
    return new HashMap(defaultHash, defaultCompare);
}
exports.makeDefaultHashMap = makeDefaultHashMap;
function makeDefaultHashSet() {
    return new HashSet(defaultHash, defaultCompare);
}
exports.makeDefaultHashSet = makeDefaultHashSet;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __webpack_require__(33);
const string_utils_1 = __webpack_require__(2);
class ConsoleLogSink {
    constructor() { }
    log(message) {
        console.log(message);
    }
    logError(message) {
        console.error(message);
    }
}
exports.ConsoleLogSink = ConsoleLogSink;
class Logger {
    constructor() {
        this.sinks = [];
        this.addSink(new ConsoleLogSink());
    }
    addSink(sink) {
        this.sinks.push(sink);
    }
    formatMessage(message) {
        return `${date_utils_1.currentDateTimeString()}: ${message}`;
    }
    log(message) {
        const formattedMessage = this.formatMessage(message);
        for (const sink of this.sinks) {
            sink.log(formattedMessage);
        }
    }
    logError(error) {
        const message = errorToString(error);
        const formattedMessage = this.formatMessage(message);
        for (const sink of this.sinks) {
            sink.logError(formattedMessage);
        }
    }
}
exports.logger = new Logger();
function errorToString(error) {
    return string_utils_1.toString({ name: error.name, message: error.message });
}
exports.errorToString = errorToString;
function log(message) {
    exports.logger.log(message);
}
exports.log = log;
function logError(error) {
    exports.logger.logError(error);
}
exports.logError = logError;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(17);
exports.Duplex = __webpack_require__(3);
exports.Transform = __webpack_require__(23);
exports.PassThrough = __webpack_require__(49);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(11);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(8);
util.inherits = __webpack_require__(5);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(48)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(12).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(21);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(3);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(3);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(46).setImmediate, __webpack_require__(4)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(11);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(40);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(15).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(19);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(12).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(8);
util.inherits = __webpack_require__(5);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(44);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(45);
var destroyImpl = __webpack_require__(21);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(3);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(22).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(3);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(22).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(7)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15).EventEmitter;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(41)
var ieee754 = __webpack_require__(42)
var isArray = __webpack_require__(43)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(11);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(12).Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(3);

/*<replacement>*/
var util = __webpack_require__(8);
util.inherits = __webpack_require__(5);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(6);
const number_utils_1 = __webpack_require__(9);
function decodeMessage(encodedMessage) {
    let message = encodedMessage;
    if (message.type === undefined) {
        message = JSON.parse(encodedMessage.toString());
        if (message.type === undefined) {
            return undefined;
        }
    }
    if (!number_utils_1.isNumber(message.type)) {
        return undefined;
    }
    if (!message_types_1.isMessageType(message.type)) {
        return undefined;
    }
    return message;
}
exports.decodeMessage = decodeMessage;
class MessageDecodedEvent {
    constructor(message) {
        this.message = message;
    }
}
exports.MessageDecodedEvent = MessageDecodedEvent;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const once_1 = __webpack_require__(58);
class EventDispatcher {
    constructor() {
        this.eventHandlers = new Array();
        this.oneShotEventHandlers = new Array();
    }
    registerEventHandler(eventHandler) {
        this.eventHandlers.push(eventHandler);
    }
    registerOneShotEventHandler(eventHandler) {
        this.oneShotEventHandlers.push(eventHandler);
    }
    dispatchEvent(event) {
        for (const handleEvent of this.eventHandlers) {
            handleEvent(event);
        }
        for (const handleEvent of this.oneShotEventHandlers) {
            handleEvent(event);
        }
        this.oneShotEventHandlers = [];
    }
}
exports.EventDispatcher = EventDispatcher;
class ConditionDispatcher {
    constructor() {
        this.setCondition = once_1.doOnce(() => { this.setConditionImpl(); });
        this.condition = false;
        this.conditionHandlers = new Array();
    }
    registerConditionListener(conditionHandler) {
        if (this.condition) {
            conditionHandler();
        }
        else {
            this.conditionHandlers.push(conditionHandler);
        }
    }
    setConditionImpl() {
        this.condition = true;
        for (const handleCondition of this.conditionHandlers) {
            handleCondition();
        }
        this.conditionHandlers = [];
    }
}
exports.ConditionDispatcher = ConditionDispatcher;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function encodeMessage(type, payload) {
    return { type: type, payload: payload };
}
exports.encodeMessage = encodeMessage;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(6);
const string_utils_1 = __webpack_require__(2);
const type_utils_1 = __webpack_require__(61);
function isSerializedIsEnabledDataV1(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isBoolean(value.chrome) &&
        type_utils_1.isBoolean(value.firefox) &&
        type_utils_1.isBoolean(value.edge);
}
exports.isSerializedIsEnabledDataV1 = isSerializedIsEnabledDataV1;
function isSerializedIsEnabledDataV12(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isBoolean(value.chrome) &&
        type_utils_1.isBoolean(value.firefox) &&
        type_utils_1.isBoolean(value.edge) &&
        type_utils_1.isBoolean(value.edgeChromium);
}
exports.isSerializedIsEnabledDataV12 = isSerializedIsEnabledDataV12;
function isSerializedPhishingNavSeqData(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isNumber(value.version) &&
        type_utils_1.isNumber(value.builtinRulesPrecedence) &&
        type_utils_1.isArray(value.seqs);
}
exports.isSerializedPhishingNavSeqData = isSerializedPhishingNavSeqData;
function isSerializedNewTabPageUrlsV7(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isArray(value.chrome) &&
        type_utils_1.isArray(value.firefox) &&
        type_utils_1.isArray(value.edge);
}
exports.isSerializedNewTabPageUrlsV7 = isSerializedNewTabPageUrlsV7;
function isSerializedNewTabPageUrlsV12(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isArray(value.chrome) &&
        type_utils_1.isArray(value.firefox) &&
        type_utils_1.isArray(value.edge) &&
        type_utils_1.isArray(value.edgeChromium);
}
exports.isSerializedNewTabPageUrlsV12 = isSerializedNewTabPageUrlsV12;
function isTabMessage(message) {
    return message.tabId !== undefined;
}
exports.isTabMessage = isTabMessage;
function IsIdMessage(message) {
    return message.id !== undefined;
}
exports.IsIdMessage = IsIdMessage;
class LaunchBrowserRequestV1 {
    constructor(urlSpec, id) {
        this.urlSpec = urlSpec;
        this.id = id;
    }
}
exports.LaunchBrowserRequestV1 = LaunchBrowserRequestV1;
class LaunchBrowserResponseV1 {
    constructor(urlSpec, id, didLaunch) {
        this.urlSpec = urlSpec;
        this.id = id;
        this.didLaunch = didLaunch;
    }
}
exports.LaunchBrowserResponseV1 = LaunchBrowserResponseV1;
class HandshakeV1 {
    constructor(versions) {
        this.versions = versions;
    }
}
exports.HandshakeV1 = HandshakeV1;
class ConfigRequestV1 {
    constructor(phishingSourceSitesVersion, phishingNavigationSequencesVersion, browserInfo) {
        this.phishingSourceSitesVersion = phishingSourceSitesVersion;
        this.phishingNavigationSequencesVersion = phishingNavigationSequencesVersion;
        this.browserInfo = browserInfo;
    }
}
exports.ConfigRequestV1 = ConfigRequestV1;
class ExtensibleConfigChangedV1 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser) {
        this.isEnabled = isEnabled;
        this.blockedPageStrings = blockedPageStrings;
        this.phishingSourceSites = phishingSourceSites;
        this.phishingNavigationSequences = phishingNavigationSequences;
        this.trustedSites = trustedSites;
        this.untrustedSites = untrustedSites;
        this.userTrustedOrigins = userTrustedOrigins;
        this.userUntrustedOrigins = userUntrustedOrigins;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
    }
}
exports.ExtensibleConfigChangedV1 = ExtensibleConfigChangedV1;
class ReputationChangedV3 {
    constructor(index, total, reputableSites) {
        this.index = index;
        this.total = total;
        this.reputableSites = reputableSites;
    }
}
exports.ReputationChangedV3 = ReputationChangedV3;
class TrustUrlV1 {
    constructor(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision) {
        this.navigateToUrlSpec = navigateToUrlSpec;
        this.blockedUrlSpec = blockedUrlSpec;
        this.trustUrl = trustUrl;
        this.rememberDecision = rememberDecision;
    }
}
exports.TrustUrlV1 = TrustUrlV1;
class DownloadCompleteV1 {
    constructor(urlSpec, fileSpec) {
        this.urlSpec = urlSpec;
        this.fileSpec = fileSpec;
    }
}
exports.DownloadCompleteV1 = DownloadCompleteV1;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 0] = "Info";
    LogLevel[LogLevel["Error"] = 1] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class LogMessageV1 {
    constructor(level, message) {
        this.level = level;
        this.message = message;
    }
}
exports.LogMessageV1 = LogMessageV1;
class HelperErrorV1 {
    constructor(errorType, errorMessage) {
        this.errorType = errorType;
        this.errorMessage = errorMessage;
    }
}
exports.HelperErrorV1 = HelperErrorV1;
class DormantStateChangedV1 {
    constructor(isDormant) {
        this.isDormant = isDormant;
    }
}
exports.DormantStateChangedV1 = DormantStateChangedV1;
class ExtensionReadyV1 {
    constructor(tabId) {
        this.tabId = tabId;
    }
}
exports.ExtensionReadyV1 = ExtensionReadyV1;
class ExternalAppLinkRequestV1 {
    constructor(linkSpec, externalAppName) {
        this.linkSpec = linkSpec;
        this.externalAppName = externalAppName;
    }
}
exports.ExternalAppLinkRequestV1 = ExternalAppLinkRequestV1;
class ExternalAppLinkResponseV1 {
    constructor(navigateToSpec) {
        this.navigateToSpec = navigateToSpec;
    }
}
exports.ExternalAppLinkResponseV1 = ExternalAppLinkResponseV1;
class AddUserTrustedOriginV1 {
    constructor(origin) {
        this.origin = origin;
    }
}
exports.AddUserTrustedOriginV1 = AddUserTrustedOriginV1;
class AddUserUntrustedOriginV1 {
    constructor(origin) {
        this.origin = origin;
    }
}
exports.AddUserUntrustedOriginV1 = AddUserUntrustedOriginV1;
class IsFileURLTrustedRequestV1 {
    constructor(id, fileUrlSpec) {
        this.id = id;
        this.fileUrlSpec = fileUrlSpec;
    }
}
exports.IsFileURLTrustedRequestV1 = IsFileURLTrustedRequestV1;
class IsFileURLTrustedResponseV1 {
    constructor(id, fileUrlSpec, isTrusted) {
        this.id = id;
        this.fileUrlSpec = fileUrlSpec;
        this.isTrusted = isTrusted;
    }
}
exports.IsFileURLTrustedResponseV1 = IsFileURLTrustedResponseV1;
class BlockedFileRequestV1 {
    constructor(fileUrlSpec) {
        this.fileUrlSpec = fileUrlSpec;
    }
}
exports.BlockedFileRequestV1 = BlockedFileRequestV1;
class BlockedFileResponseV1 {
    constructor(fileUrlSpec, isTrusted) {
        this.fileUrlSpec = fileUrlSpec;
        this.isTrusted = isTrusted;
    }
}
exports.BlockedFileResponseV1 = BlockedFileResponseV1;
class PopupDataRequestV1 {
    constructor() { }
}
exports.PopupDataRequestV1 = PopupDataRequestV1;
class PopupDataResponseV1 {
    constructor(popupMessage, openPhishingLinksInSecureBrowser) {
        this.popupMessage = popupMessage;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
    }
}
exports.PopupDataResponseV1 = PopupDataResponseV1;
class ClearRememberedDecisionsV1 {
    constructor() { }
}
exports.ClearRememberedDecisionsV1 = ClearRememberedDecisionsV1;
class BlockedPageStringsRequestV1 {
    constructor(contentType) {
        this.contentType = contentType;
    }
}
exports.BlockedPageStringsRequestV1 = BlockedPageStringsRequestV1;
class BlockedPageStringsResponseV1 {
    constructor(title, question) {
        this.title = title;
        this.question = question;
    }
}
exports.BlockedPageStringsResponseV1 = BlockedPageStringsResponseV1;
class HeartbeatV1 {
    constructor() { }
}
exports.HeartbeatV1 = HeartbeatV1;
class EnabledFeaturesRequestV2 {
    constructor(id, respondImmediately) {
        this.id = id;
        this.respondImmediately = respondImmediately;
    }
}
exports.EnabledFeaturesRequestV2 = EnabledFeaturesRequestV2;
class EnabledFeaturesResponseV2 {
    constructor(id, linkProtection, fileURLProtection, pdfProtection, downloadProtection) {
        this.id = id;
        this.linkProtection = linkProtection;
        this.fileURLProtection = fileURLProtection;
        this.pdfProtection = pdfProtection;
        this.downloadProtection = downloadProtection;
    }
}
exports.EnabledFeaturesResponseV2 = EnabledFeaturesResponseV2;
var RememberedOriginTypes;
(function (RememberedOriginTypes) {
    RememberedOriginTypes[RememberedOriginTypes["Trusted"] = 0] = "Trusted";
    RememberedOriginTypes[RememberedOriginTypes["Untrusted"] = 1] = "Untrusted";
})(RememberedOriginTypes = exports.RememberedOriginTypes || (exports.RememberedOriginTypes = {}));
class ClearRememberedOriginV3 {
    constructor(origin, type) {
        this.origin = origin;
        this.type = type;
    }
}
exports.ClearRememberedOriginV3 = ClearRememberedOriginV3;
class OptionsDataRequestV3 {
    constructor() { }
}
exports.OptionsDataRequestV3 = OptionsDataRequestV3;
class OptionsDataResponseV3 {
    constructor(supportStatus, openPhishingLinksInSecureBrowser, userTrustedOrigins, userUntrustedOrigins) {
        this.supportStatus = supportStatus;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
        this.userTrustedOrigins = userTrustedOrigins;
        this.userUntrustedOrigins = userUntrustedOrigins;
    }
}
exports.OptionsDataResponseV3 = OptionsDataResponseV3;
class ExtensibleConfigChangedV3 extends ExtensibleConfigChangedV1 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser);
        this.prioritiseTrustedSites = prioritiseTrustedSites;
    }
}
exports.ExtensibleConfigChangedV3 = ExtensibleConfigChangedV3;
class ExtensibleConfigChangedV4 extends ExtensibleConfigChangedV3 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites);
        this.promptForUncategorized = promptForUncategorized;
    }
}
exports.ExtensibleConfigChangedV4 = ExtensibleConfigChangedV4;
class BlockedPageDataRequestV4 {
    constructor(contentType) {
        this.contentType = contentType;
    }
}
exports.BlockedPageDataRequestV4 = BlockedPageDataRequestV4;
class BlockedPageDataResponseV4 {
    constructor(title, question, rememberDecisionsDefault) {
        this.title = title;
        this.question = question;
        this.rememberDecisionsDefault = rememberDecisionsDefault;
    }
}
exports.BlockedPageDataResponseV4 = BlockedPageDataResponseV4;
class ExtensibleConfigChangedV5 extends ExtensibleConfigChangedV4 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized);
        this.isEnterpriseProduct = isEnterpriseProduct;
    }
}
exports.ExtensibleConfigChangedV5 = ExtensibleConfigChangedV5;
class PopupDataResponseV5 extends PopupDataResponseV1 {
    constructor(popupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct) {
        super(popupMessage, openPhishingLinksInSecureBrowser);
        this.isEnterpriseProduct = isEnterpriseProduct;
    }
}
exports.PopupDataResponseV5 = PopupDataResponseV5;
class BlockedPageDataResponseV6 extends BlockedPageDataResponseV4 {
    constructor(title, question, openedSecureExplanation, rememberDecisionsDefault) {
        super(title, question, rememberDecisionsDefault);
        this.openedSecureExplanation = openedSecureExplanation;
    }
}
exports.BlockedPageDataResponseV6 = BlockedPageDataResponseV6;
class TrustUrlV6 extends TrustUrlV1 {
    constructor(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision, contentType) {
        super(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision);
        this.contentType = contentType;
    }
}
exports.TrustUrlV6 = TrustUrlV6;
class ExtensibleConfigChangedV7 extends ExtensibleConfigChangedV5 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, newTabPageUrls) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct);
        this.newTabPageUrls = newTabPageUrls;
    }
}
exports.ExtensibleConfigChangedV7 = ExtensibleConfigChangedV7;
class TrustUrlV8 extends TrustUrlV6 {
    constructor(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision, dontAskAgain, contentType) {
        super(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision, contentType);
        this.dontAskAgain = dontAskAgain;
    }
}
exports.TrustUrlV8 = TrustUrlV8;
class DontAskAgainV8 {
    constructor() { }
}
exports.DontAskAgainV8 = DontAskAgainV8;
class ExtensibleConfigChangedV8 extends ExtensibleConfigChangedV7 {
    constructor(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL) {
        super(isEnabled, {}, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, newTabPageUrls);
        this.isConsumerProduct = isConsumerProduct;
        this.blockedPageLearnMoreURL = blockedPageLearnMoreURL;
    }
}
exports.ExtensibleConfigChangedV8 = ExtensibleConfigChangedV8;
class PopupDataResponseV9 extends PopupDataResponseV5 {
    constructor(popupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct, dontAskAgain) {
        super(popupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct);
        this.dontAskAgain = dontAskAgain;
    }
}
exports.PopupDataResponseV9 = PopupDataResponseV9;
class DontAskAgainV9 extends DontAskAgainV8 {
    constructor(dontAskAgain) {
        super();
        this.dontAskAgain = dontAskAgain;
    }
}
exports.DontAskAgainV9 = DontAskAgainV9;
class ExtensibleConfigChangedV9 extends ExtensibleConfigChangedV8 {
    constructor(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL, dontAskAgain) {
        super(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL);
        this.dontAskAgain = dontAskAgain;
    }
}
exports.ExtensibleConfigChangedV9 = ExtensibleConfigChangedV9;
class StopHelperV10 {
    constructor() { }
}
exports.StopHelperV10 = StopHelperV10;
class EdgeAckV10 {
    constructor() { }
}
exports.EdgeAckV10 = EdgeAckV10;
class EndOfStreamV10 {
    constructor() { }
}
exports.EndOfStreamV10 = EndOfStreamV10;
class HeartbeatV10 extends HeartbeatV1 {
    constructor(id) {
        super();
        this.id = id;
    }
}
exports.HeartbeatV10 = HeartbeatV10;
class PopupDataResponseV11 {
    constructor(popupMessage, showClearRememberedDecisionsInfo, isEnterpriseProduct, helpLinkURL) {
        this.popupMessage = popupMessage;
        this.showClearRememberedDecisionsInfo = showClearRememberedDecisionsInfo;
        this.isEnterpriseProduct = isEnterpriseProduct;
        this.helpLinkURL = helpLinkURL;
    }
}
exports.PopupDataResponseV11 = PopupDataResponseV11;
var ProductStatuses;
(function (ProductStatuses) {
    ProductStatuses[ProductStatuses["Enabled"] = 0] = "Enabled";
    ProductStatuses[ProductStatuses["Disabled"] = 1] = "Disabled";
    ProductStatuses[ProductStatuses["InitRequired"] = 2] = "InitRequired";
    ProductStatuses[ProductStatuses["Unlicensed"] = 3] = "Unlicensed";
    ProductStatuses[ProductStatuses["Unknown"] = 4] = "Unknown";
})(ProductStatuses = exports.ProductStatuses || (exports.ProductStatuses = {}));
class ExtensibleConfigChangedV11 extends ExtensibleConfigChangedV9 {
    constructor(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL, dontAskAgain, secureBrowserRedirectTrustedSites, productStatus) {
        super(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL, dontAskAgain);
        this.secureBrowserRedirectTrustedSites = secureBrowserRedirectTrustedSites;
        this.productStatus = productStatus;
    }
}
exports.ExtensibleConfigChangedV11 = ExtensibleConfigChangedV11;
class ExtensibleConfigChangedV12 extends ExtensibleConfigChangedV11 {
}
exports.ExtensibleConfigChangedV12 = ExtensibleConfigChangedV12;
class Message {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
exports.Message = Message;
function messageToString(message) {
    if (message.type === message_types_1.MessageType.reputationChangedV3) {
        const payload = message.payload;
        let str = `Object{\n\t` +
            `type: ${message_types_1.MessageType.reputationChangedV3},\n\t` +
            `payload: Object{\n\t\t\t` +
            `index: ${payload.index},\n\t\t\t` +
            `total: ${payload.total},\n\t\t\t` +
            `reputableSite: [ `;
        for (const entry of payload.reputableSites) {
            str += `[${entry[0]},${entry[1]}], `;
        }
        str += "],\n\t},\n}";
        return str;
    }
    else {
        return string_utils_1.toString(message);
    }
}
exports.messageToString = messageToString;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const number_utils_1 = __webpack_require__(9);
var ChragError;
(function (ChragError) {
    ChragError[ChragError["notEnabled"] = 0] = "notEnabled";
    ChragError[ChragError["helperPortError"] = 1] = "helperPortError";
    ChragError[ChragError["launchBrowserFailed"] = 2] = "launchBrowserFailed";
    ChragError[ChragError["trustDownloadFailed"] = 3] = "trustDownloadFailed";
    ChragError[ChragError["handshakeError"] = 4] = "handshakeError";
    ChragError[ChragError["unknownError"] = 5] = "unknownError";
    ChragError[ChragError["recoveredFromError"] = 6] = "recoveredFromError";
    ChragError[ChragError["is32bitFirefox"] = 7] = "is32bitFirefox";
    ChragError[ChragError["helperUnresponsive"] = 8] = "helperUnresponsive";
})(ChragError = exports.ChragError || (exports.ChragError = {}));
var ChragErrorLimits;
(function (ChragErrorLimits) {
    ChragErrorLimits[ChragErrorLimits["min"] = 0] = "min";
    ChragErrorLimits[ChragErrorLimits["max"] = 8] = "max";
})(ChragErrorLimits || (ChragErrorLimits = {}));
function isChragError(type) {
    return number_utils_1.isInRange(type, ChragErrorLimits.min, ChragErrorLimits.max);
}
exports.isChragError = isChragError;
function isError(value) {
    return value instanceof Error;
}
exports.isError = isError;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const blocked_file_page_options_1 = __webpack_require__(30);
const url_parse_utils_1 = __webpack_require__(31);
const url_utils_1 = __webpack_require__(1);
const blocked_file_controller_1 = __webpack_require__(54);
class Options {
    constructor(fileURL) {
        this.fileURL = fileURL;
    }
}
function parseOptions(window) {
    const documentURL = url_parse_utils_1.findDocumentUrl(window);
    if (maybe_1.none(documentURL)) {
        return undefined;
    }
    const fileURL = url_parse_utils_1.findURLDocumentQueryParam(documentURL, blocked_file_page_options_1.OptionNames.fileUrlSpec);
    if (maybe_1.none(fileURL)) {
        return undefined;
    }
    return new Options(fileURL);
}
function initChromeRuntime() {
    const runtime = chrome.runtime;
}
function main(window) {
    initChromeRuntime();
    const options = parseOptions(window);
    if (maybe_1.none(options)) {
        return;
    }
    const document = window.document;
    document.title = url_utils_1.URLToString(options.fileURL);
    const controller = new blocked_file_controller_1.BlockedFileController(document, options.fileURL);
}
window.onload = (event) => {
    main(window);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OptionNames;
(function (OptionNames) {
    OptionNames["fileUrlSpec"] = "fileUrlSpec";
})(OptionNames = exports.OptionNames || (exports.OptionNames = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const url_utils_1 = __webpack_require__(1);
const number_utils_1 = __webpack_require__(9);
function findDocumentUrl(window) {
    return url_utils_1.parseUrl(window.location.toString());
}
exports.findDocumentUrl = findDocumentUrl;
function getQueryParamFromSearch(search, queryParam) {
    const paramsString = search.substring(1);
    const params = paramsString.split("&");
    for (const pairString of params) {
        const pair = pairString.split("=");
        if (decodeURIComponent(pair[0]) === queryParam) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}
function findDocumentQueryParam(documentUrl, queryParam) {
    if (maybe_1.none(documentUrl)) {
        return "";
    }
    let value = null;
    if (documentUrl.searchParams === undefined) {
        try {
            const searchParams = new URLSearchParams(documentUrl.search);
            value = searchParams.get(queryParam);
        }
        catch (e) {
            value = getQueryParamFromSearch(documentUrl.search, queryParam);
        }
    }
    else {
        value = documentUrl.searchParams.get(queryParam);
    }
    if (value === null) {
        return undefined;
    }
    return value;
}
exports.findDocumentQueryParam = findDocumentQueryParam;
function findURLDocumentQueryParam(documentUrl, queryParam) {
    const queryParamValue = findDocumentQueryParam(documentUrl, queryParam);
    if (maybe_1.none(queryParamValue)) {
        return undefined;
    }
    return url_utils_1.parseUrl(queryParamValue);
}
exports.findURLDocumentQueryParam = findURLDocumentQueryParam;
function findNumberDocumentQueryParam(documentUrl, queryParamName) {
    const queryParamValue = findDocumentQueryParam(documentUrl, queryParamName);
    if (maybe_1.none(queryParamValue)) {
        return undefined;
    }
    return number_utils_1.parseNumber(queryParamValue);
}
exports.findNumberDocumentQueryParam = findNumberDocumentQueryParam;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const murmur_hash_1 = __webpack_require__(10);
const url_utils_1 = __webpack_require__(1);
const hash_map_1 = __webpack_require__(13);
const log_1 = __webpack_require__(14);
const qlobber_1 = __webpack_require__(34);
const exclusionPrefix = "^";
const wildcardSpecRegex = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
var WildcardSpecGroup;
(function (WildcardSpecGroup) {
    WildcardSpecGroup[WildcardSpecGroup["Scheme"] = 1] = "Scheme";
    WildcardSpecGroup[WildcardSpecGroup["HostAndPort"] = 4] = "HostAndPort";
})(WildcardSpecGroup || (WildcardSpecGroup = {}));
class OriginParseOptions {
    constructor(options) {
        this.allowNonWebSafeSchemes = false;
        this.allowFileScheme = false;
        this.allowChromeScheme = false;
        this.allowEdgeScheme = false;
        this.allowAboutScheme = false;
        this.allowChromeExtensionScheme = false;
        this.allowFirefoxExtensionScheme = false;
        this.allowEdgeExtensionScheme = false;
        this.allowWildcards = false;
        this.allowMissingWildcardScheme = false;
        this.allowTrailingWildcards = false;
        Object.assign(this, options);
    }
}
exports.OriginParseOptions = OriginParseOptions;
class OriginHashOptions {
    constructor(options) {
        this.seed = 0;
        this.ignoreHttpHttpsDifference = false;
        this.ignorePort = false;
        Object.assign(this, options);
    }
}
exports.OriginHashOptions = OriginHashOptions;
var Scheme;
(function (Scheme) {
    Scheme["HTTP"] = "http:";
    Scheme["HTTPS"] = "https:";
    Scheme["FTP"] = "ftp:";
    Scheme["FTPS"] = "ftps:";
    Scheme["WS"] = "ws:";
    Scheme["WSS"] = "wss:";
    Scheme["FILE"] = "file:";
    Scheme["CHROME"] = "chrome:";
    Scheme["EDGE"] = "edge:";
    Scheme["ABOUT"] = "about:";
    Scheme["JAVASCRIPT"] = "javascript:";
    Scheme["CHROME_EXTENSION"] = "chrome-extension:";
    Scheme["FIREFOX_EXTENSION"] = "moz-extension:";
    Scheme["EDGE_EXTENSION"] = "ms-browser-extension:";
    Scheme["WILDCARD_ONE"] = "+:";
    Scheme["WILDCARD_SOME"] = "*:";
})(Scheme = exports.Scheme || (exports.Scheme = {}));
const matcherOptions = {
    separator: ".",
    wildcard_one: Scheme.WILDCARD_ONE[0],
    wildcard_some: Scheme.WILDCARD_SOME[0],
    cache_adds: false
};
const trailingWildcards = [
    matcherOptions.separator + matcherOptions.wildcard_one,
    matcherOptions.separator + matcherOptions.wildcard_some
];
function isWebSafeScheme(scheme) {
    switch (scheme) {
        case Scheme.HTTP:
            return true;
        case Scheme.HTTPS:
            return true;
        default:
            return false;
    }
}
const standardPorts = new Map([
    [Scheme.HTTP, 80], [Scheme.HTTPS, 443]
]);
class Origin {
    constructor(scheme, host, port) {
        this.scheme = scheme;
        this.host = host;
        this.port = port;
    }
    toString() {
        if (this.port === undefined) {
            return `${this.scheme}//${this.host}`;
        }
        else {
            return `${this.scheme}//${this.host}:${this.port}`;
        }
    }
    toDisplayString() {
        return this.host;
    }
}
exports.Origin = Origin;
function isSameOrigin(a, b, options = new OriginHashOptions()) {
    if (maybe_1.none(a) || maybe_1.none(b)) {
        return false;
    }
    let schemeA = a.scheme;
    let schemeB = b.scheme;
    if (options.ignoreHttpHttpsDifference) {
        if (schemeA === Scheme.HTTP) {
            schemeA = Scheme.HTTPS;
        }
        if (schemeB === Scheme.HTTP) {
            schemeB = Scheme.HTTPS;
        }
    }
    if (schemeA !== schemeB) {
        return false;
    }
    if (a.host !== b.host) {
        return false;
    }
    if (options.ignorePort) {
        return true;
    }
    if (a.port === undefined && b.port !== undefined) {
        return false;
    }
    if (a.port !== undefined && b.port === undefined) {
        return false;
    }
    if (a.port === undefined && b.port === undefined) {
        return true;
    }
    return a.port === b.port;
}
exports.isSameOrigin = isSameOrigin;
function hashOrigin(origin, options = new OriginHashOptions()) {
    let hash = options.seed;
    let scheme = origin.scheme;
    if (options.ignoreHttpHttpsDifference && (scheme === Scheme.HTTP)) {
        scheme = Scheme.HTTPS;
    }
    hash = murmur_hash_1.murmurHash(scheme, hash);
    hash = murmur_hash_1.murmurHash(origin.host, hash);
    if (!options.ignorePort && (origin.port !== undefined)) {
        hash = murmur_hash_1.murmurHash(origin.port, hash);
    }
    return hash;
}
exports.hashOrigin = hashOrigin;
function parseScheme(protocol, options) {
    let scheme = undefined;
    switch (protocol.toLowerCase()) {
        case Scheme.HTTP:
            scheme = Scheme.HTTP;
            break;
        case Scheme.HTTPS:
            scheme = Scheme.HTTPS;
            break;
        case Scheme.FILE:
            if (options.allowFileScheme) {
                scheme = Scheme.FILE;
            }
            break;
        case Scheme.CHROME:
            if (options.allowChromeScheme) {
                scheme = Scheme.CHROME;
            }
            break;
        case Scheme.EDGE:
            if (options.allowEdgeScheme) {
                scheme = Scheme.EDGE;
            }
            break;
        case Scheme.ABOUT:
            if (options.allowAboutScheme) {
                scheme = Scheme.ABOUT;
            }
            break;
        case Scheme.CHROME_EXTENSION:
            if (options.allowChromeExtensionScheme) {
                scheme = Scheme.CHROME_EXTENSION;
            }
            break;
        case Scheme.FIREFOX_EXTENSION:
            if (options.allowFirefoxExtensionScheme) {
                scheme = Scheme.FIREFOX_EXTENSION;
            }
            break;
        case Scheme.EDGE_EXTENSION:
            if (options.allowEdgeExtensionScheme) {
                scheme = Scheme.EDGE_EXTENSION;
            }
            break;
        case Scheme.WILDCARD_ONE:
            if (options.allowWildcards) {
                scheme = Scheme.WILDCARD_ONE;
                break;
            }
            return undefined;
        case Scheme.WILDCARD_SOME:
            if (options.allowWildcards) {
                scheme = Scheme.WILDCARD_SOME;
                break;
            }
            return undefined;
        default:
            return undefined;
    }
    if (isWebSafeScheme(scheme)) {
        return scheme;
    }
    if (((scheme === Scheme.WILDCARD_ONE) ||
        (scheme === Scheme.WILDCARD_SOME)) &&
        options.allowWildcards) {
        return scheme;
    }
    else if ((scheme === Scheme.FILE) &&
        options.allowFileScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.CHROME_EXTENSION) &&
        options.allowChromeExtensionScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.FIREFOX_EXTENSION) &&
        options.allowFirefoxExtensionScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.EDGE_EXTENSION) &&
        options.allowEdgeExtensionScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.CHROME) &&
        options.allowChromeScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.EDGE) &&
        options.allowEdgeScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.ABOUT) &&
        options.allowAboutScheme) {
        return scheme;
    }
    else if (options.allowNonWebSafeSchemes) {
        return scheme;
    }
    else {
        return undefined;
    }
}
function isEmpty(value) {
    return value.length === 0;
}
function isInRange(value, min, max) {
    return (value >= min) && (value <= max);
}
function parsePort(portString, scheme) {
    const minPort = 0;
    const maxPort = (2 << 16) - 1;
    if (isEmpty(portString)) {
        return standardPorts.get(scheme);
    }
    const radix = 10;
    const port = parseInt(portString, radix);
    if (!isInRange(port, minPort, maxPort)) {
        throw new Error(`Invalid port ${port}`);
    }
    return port;
}
function parseOrigin(urlOrSpec, options = new OriginParseOptions()) {
    if (urlOrSpec instanceof URL) {
        return parseOriginFromURL(urlOrSpec, options);
    }
    else {
        return parseOriginFromSpec(urlOrSpec, options);
    }
}
exports.parseOrigin = parseOrigin;
function parseOriginFromURL(url, options) {
    const scheme = parseScheme(url.protocol, options);
    if (scheme === undefined) {
        return undefined;
    }
    try {
        const port = parsePort(url.port, scheme);
        return new Origin(scheme, url.hostname, port);
    }
    catch (e) {
        return undefined;
    }
}
function parseOriginFromSpec(spec, options) {
    if (options.allowWildcards) {
        if (!spec.includes("://") && options.allowMissingWildcardScheme) {
            spec = Scheme.WILDCARD_ONE + "//" + spec;
        }
        const match = wildcardSpecRegex.exec(spec);
        if (match === null) {
            return undefined;
        }
        const maybeScheme = match[WildcardSpecGroup.Scheme];
        if (maybeScheme === undefined) {
            return undefined;
        }
        const scheme = parseScheme(maybeScheme, options);
        if (scheme === undefined) {
            return undefined;
        }
        const maybeHostAndPort = match[WildcardSpecGroup.HostAndPort];
        if (maybeHostAndPort === undefined) {
            return undefined;
        }
        const hostAndPort = maybeHostAndPort.split(':');
        const host = hostAndPort[0];
        if (isEmpty(host)) {
            return undefined;
        }
        const port = parsePort(hostAndPort.length > 1 ? hostAndPort[1] : '', scheme);
        if (!options.allowTrailingWildcards) {
            if (trailingWildcards.some(trailingWildcard => host.length >= trailingWildcard.length && host.endsWith(trailingWildcard))) {
                log_1.logError(new Error(`Rule URL hostname ends in trailing wildcard: ${spec}`));
                return undefined;
            }
        }
        return new Origin(scheme, host, port);
    }
    const url = url_utils_1.parseUrl(spec);
    if (url === undefined) {
        return undefined;
    }
    return parseOriginFromURL(url, options);
}
function makeOriginSet(options = new OriginHashOptions()) {
    return new hash_map_1.HashSet((origin) => hashOrigin(origin, options), (a, b) => isSameOrigin(a, b, options));
}
exports.makeOriginSet = makeOriginSet;
function parseOriginSet(specList, setOptions = new OriginHashOptions(), options = new OriginParseOptions()) {
    const specSet = makeOriginSet(setOptions);
    for (const spec of specList) {
        const origin = parseOrigin(spec, options);
        if (origin !== undefined) {
            specSet.add(origin);
        }
    }
    return specSet;
}
exports.parseOriginSet = parseOriginSet;
function topicForOrigin(origin) {
    let scheme = origin.scheme;
    if (scheme === Scheme.WILDCARD_SOME) {
        scheme = Scheme.WILDCARD_ONE;
    }
    return scheme.slice(0, -1) + matcherOptions.separator + origin.host;
}
class OriginMatcher {
    constructor() {
        this.matcher = new qlobber_1.QlobberTrue(matcherOptions);
        this.exclude_matcher = new qlobber_1.QlobberTrue(matcherOptions);
    }
    add(origin) {
        const topic = topicForOrigin(origin);
        this.matcher.add(topic);
        return this;
    }
    exclude(origin) {
        const topic = topicForOrigin(origin);
        this.exclude_matcher.add(topic);
        return this;
    }
    has(origin) {
        const topic = topicForOrigin(origin);
        return this.matcher.test(topic) && !this.exclude_matcher.test(topic);
    }
}
exports.OriginMatcher = OriginMatcher;
function parseOriginMatcher(specList, options = new OriginParseOptions()) {
    if (specList.length > 0) {
        log_1.log(`making matcher from ${specList.length} entries`);
    }
    const matcher = new OriginMatcher();
    for (const spec of specList) {
        if (spec.startsWith(exclusionPrefix)) {
            const origin = parseOrigin(spec.substr(exclusionPrefix.length), options);
            if (origin !== undefined) {
                matcher.exclude(origin);
            }
        }
        else {
            const origin = parseOrigin(spec, options);
            if (origin !== undefined) {
                matcher.add(origin);
            }
        }
    }
    if (specList.length > 0) {
        log_1.log('finished making matcher');
    }
    return matcher;
}
exports.parseOriginMatcher = parseOriginMatcher;
class OriginExpiryMatcher {
    constructor() {
        this.matcher = new qlobber_1.Qlobber(matcherOptions);
    }
    add(origin, expiry) {
        const topic = topicForOrigin(origin);
        this.matcher.add(topic, expiry);
        return this;
    }
    has(origin) {
        const topic = topicForOrigin(origin);
        const expiries = this.matcher.match(topic);
        const now = Date.now() / 1000;
        for (const expiry of expiries) {
            if (expiry > now) {
                return true;
            }
        }
        return false;
    }
}
exports.OriginExpiryMatcher = OriginExpiryMatcher;
function parseOriginExpiryMatcher(specList, options = new OriginParseOptions()) {
    if (specList.length > 0) {
        log_1.log(`making expiry matcher from ${specList.length} entries`);
    }
    const matcher = new OriginExpiryMatcher();
    const now = Date.now() / 1000;
    for (const [spec, expiry] of specList) {
        if (expiry > now) {
            const origin = parseOrigin(spec, options);
            if (origin !== undefined) {
                matcher.add(origin, expiry);
            }
        }
    }
    if (specList.length > 0) {
        log_1.log('finished making expiry matcher');
    }
    return matcher;
}
exports.parseOriginExpiryMatcher = parseOriginExpiryMatcher;
class OriginGrouper {
    constructor() {
        this.grouper = new qlobber_1.Qlobber(matcherOptions);
    }
    addFromSpecList(specList, group, options = new OriginParseOptions()) {
        for (const spec of specList) {
            this.addFromSpec(spec, group, options);
        }
        return this;
    }
    addFromSpec(spec, group, options = new OriginParseOptions()) {
        const origin = parseOrigin(spec, options);
        if (maybe_1.some(origin)) {
            this.add(origin, group);
        }
        return this;
    }
    add(origin, group) {
        const topic = topicForOrigin(origin);
        this.grouper.add(topic, group);
        return this;
    }
    match(origin) {
        const topic = topicForOrigin(origin);
        return this.grouper.match(topic);
    }
}
exports.OriginGrouper = OriginGrouper;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function currentDateTimeString() {
    return new Date().toISOString();
}
exports.currentDateTimeString = currentDateTimeString;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint node: true*/

module.exports = __webpack_require__(35);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
# qlobber&nbsp;&nbsp;&nbsp;[![Build Status](https://travis-ci.org/davedoesdev/qlobber.png)](https://travis-ci.org/davedoesdev/qlobber) [![Coverage Status](https://coveralls.io/repos/davedoesdev/qlobber/badge.png?branch=master)](https://coveralls.io/r/davedoesdev/qlobber?branch=master) [![NPM version](https://badge.fury.io/js/qlobber.png)](http://badge.fury.io/js/qlobber)

Node.js globbing for amqp-like topics.

Example:

```javascript
var Qlobber = require('qlobber').Qlobber;
var matcher = new Qlobber();
matcher.add('foo.*', 'it matched!');
assert.deepEqual(matcher.match('foo.bar'), ['it matched!']);
assert(matcher.test('foo.bar', 'it matched!'));
```

The API is described [here](#tableofcontents).

qlobber is implemented using a trie, as described in the RabbitMQ blog posts [here](http://www.rabbitmq.com/blog/2010/09/14/very-fast-and-scalable-topic-routing-part-1/) and [here](http://www.rabbitmq.com/blog/2011/03/28/very-fast-and-scalable-topic-routing-part-2/).

## Installation

```shell
npm install qlobber
```

## Another Example

A more advanced example using topics from the [RabbitMQ topic tutorial](http://www.rabbitmq.com/tutorials/tutorial-five-python.html):

```javascript
var matcher = new Qlobber();
matcher.add('*.orange.*', 'Q1');
matcher.add('*.*.rabbit', 'Q2');
matcher.add('lazy.#', 'Q2');
assert.deepEqual(['quick.orange.rabbit',
                  'lazy.orange.elephant',
                  'quick.orange.fox',
                  'lazy.brown.fox',
                  'lazy.pink.rabbit',
                  'quick.brown.fox',
                  'orange',
                  'quick.orange.male.rabbit',
                  'lazy.orange.male.rabbit'].map(function (topic)
                  {
                      return matcher.match(topic).sort();
                  }),
                 [['Q1', 'Q2'],
                  ['Q1', 'Q2'],
                  ['Q1'],
                  ['Q2'],
                  ['Q2', 'Q2'],
                  [],
                  [],
                  [],
                  ['Q2']]);
```

## Licence

[MIT](LICENCE)

## Tests

qlobber passes the [RabbitMQ topic tests](https://github.com/rabbitmq/rabbitmq-server/blob/master/src/rabbit_tests.erl) (I converted them from Erlang to Javascript).

To run the tests:

```shell
grunt test
```

## Lint

```shell
grunt lint
```

## Code Coverage

```shell
grunt coverage
```

[Instanbul](http://gotwarlost.github.io/istanbul/) results are available [here](http://rawgit.davedoesdev.com/davedoesdev/qlobber/master/coverage/lcov-report/index.html).

Coveralls page is [here](https://coveralls.io/r/davedoesdev/qlobber).

## Benchmarks

```shell
grunt bench
```

qlobber is also benchmarked in [ascoltatori](https://github.com/mcollina/ascoltatori).

# API
*/

/*jslint node: true, nomen: true */


var util = __webpack_require__(36);

/**
Creates a new qlobber.

@constructor
@param {Object} [options] Configures the qlobber. Use the following properties:
- `{String} separator` The character to use for separating words in topics. Defaults to '.'. MQTT uses '/' as the separator, for example.

- `{String} wildcard_one` The character to use for matching exactly one word in a topic. Defaults to '*'. MQTT uses '+', for example.

- `{String} wildcard_some` The character to use for matching zero or more words in a topic. Defaults to '#'. MQTT uses '#' too.

- `{Boolean} cache_adds` Whether to cache topics when adding topic matchers. This will make adding multiple matchers for the same topic faster at the cost of extra memory usage. Defaults to `false`.
*/
function Qlobber (options)
{
    options = options || {};

    this._separator = options.separator || '.';
    this._wildcard_one = options.wildcard_one || '*';
    this._wildcard_some = options.wildcard_some || '#';
    this._trie = new Map();
    if (options.cache_adds)
    {
        this._shortcuts = new Map();
    }
}

Qlobber.prototype._initial_value = function (val)
{
    return [val];
};

Qlobber.prototype._add_value = function (vals, val)
{
    vals[vals.length] = val;
};

Qlobber.prototype._add_values = function (dest, origin)
{
    var i, destLength = dest.length, originLength = origin.length;

    for (i = 0; i < originLength; i += 1)
    {
        dest[destLength + i] = origin[i];
    }
};

Qlobber.prototype._remove_value = function (vals, val)
{
    if (val === undefined)
    {
        return true;
    }

    var index = vals.lastIndexOf(val);

    if (index >= 0)
    {
        vals.splice(index, 1);
    }

    return vals.length === 0;
};

Qlobber.prototype._add = function (val, i, words, sub_trie)
{
    var st, word;

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);
        
        if (st)
        {
            this._add_value(st, val);
        }
        else
        {
            st = this._initial_value(val);
            sub_trie.set(this._separator, st);
        }
        
        return st;
    }

    word = words[i];
    st = sub_trie.get(word);
    
    if (!st)
    {
        st = new Map();
        sub_trie.set(word, st);
    }
    
    return this._add(val, i + 1, words, st);
};

Qlobber.prototype._remove = function (val, i, words, sub_trie)
{
    var st, word, r;

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);

        if (st && this._remove_value(st, val))
        {
            sub_trie.delete(this._separator);
            return true;
        }

        return false;
    }
    
    word = words[i];
    st = sub_trie.get(word);

    if (!st)
    {
        return false;
    }

    r = this._remove(val, i + 1, words, st);

    if (st.size === 0)
    {
        sub_trie.delete(word);
    }

    return r;
};

Qlobber.prototype._match_some = function (v, i, words, st, ctx)
{
    var j, w;

    for (w of st.keys())
    {
        if (w !== this._separator)
        {
            for (j = i; j < words.length; j += 1)
            {
                v = this._match(v, j, words, st, ctx);
            }
            break;
        }
    }

    return v;
};

Qlobber.prototype._match = function (v, i, words, sub_trie, ctx)
{
    var word, st;

    st = sub_trie.get(this._wildcard_some);

    if (st)
    {
        // in the common case there will be no more levels...
        v = this._match_some(v, i, words, st, ctx);
        // and we'll end up matching the rest of the words:
        v = this._match(v, words.length, words, st, ctx);
    }

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);

        if (st)
        {
            if (v.dest)
            {
                this._add_values(v.dest, v.source, ctx);
                this._add_values(v.dest, st, ctx);
                v = v.dest;
            }
            else if (v.source)
            {
                v.dest = v.source;
                v.source = st;
            }
            else
            {
                this._add_values(v, st, ctx);
            }
        }
    }
    else
    {
        word = words[i];

        if ((word !== this._wildcard_one) && (word !== this._wildcard_some))
        {
            st = sub_trie.get(word);

            if (st)
            {
                v = this._match(v, i + 1, words, st, ctx);
            }
        }

        if (word)
        {
            st = sub_trie.get(this._wildcard_one);

            if (st)
            {
                v = this._match(v, i + 1, words, st, ctx);
            }
        }
    }

    return v;
};

Qlobber.prototype._match2 = function (v, topic, ctx)
{
    var vals = this._match(
    {
        source: v
    }, 0, topic.split(this._separator), this._trie, ctx);

    return vals.source || vals;
};

Qlobber.prototype._test_some = function (v, i, words, st)
{
    var j, w;

    for (w of st.keys())
    {
        if (w !== this._separator)
        {
            for (j = i; j < words.length; j += 1)
            {
                if (this._test(v, j, words, st))
                {
                    return true;
                }
            }
            break;
        }
    }

    return false;
};

Qlobber.prototype._test = function (v, i, words, sub_trie)
{
    var word, st;

    st = sub_trie.get(this._wildcard_some);

    if (st)
    {
            // in the common case there will be no more levels...
        if (this._test_some(v, i, words, st) ||
            // and we'll end up matching the rest of the words:
            this._test(v, words.length, words, st))
        {
            return true;
        }
    }

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);

        if (st && this.test_values(st, v))
        {
            return true;
        }
    }
    else
    {
        word = words[i];

        if ((word !== this._wildcard_one) && (word !== this._wildcard_some))
        {
            st = sub_trie.get(word);

            if (st && this._test(v, i + 1, words, st))
            {
                return true;
            }
        }

        if (word)
        {
            st = sub_trie.get(this._wildcard_one);

            if (st && this._test(v, i + 1, words, st))
            {
                return true;
            }
        }
    }

    return false;
};

/**
Add a topic matcher to the qlobber.

Note you can match more than one value against a topic by calling `add` multiple times with the same topic and different values.

@param {String} topic The topic to match against.
@param {Any} val The value to return if the topic is matched.
@return {Qlobber} The qlobber (for chaining).
*/
Qlobber.prototype.add = function (topic, val)
{
    var shortcut = this._shortcuts && this._shortcuts.get(topic);
    if (shortcut)
    {
        this._add_value(shortcut, val);
    }
    else
    {
        shortcut = this._add(val, 0, topic.split(this._separator), this._trie);
        if (this._shortcuts)
        {
            this._shortcuts.set(topic, shortcut);
        }
    }
    return this;
};

/**
Remove a topic matcher from the qlobber.

@param {String} topic The topic that's being matched against.
@param {Any} [val] The value that's being matched. If you don't specify `val` then all matchers for `topic` are removed.
@return {Qlobber} The qlobber (for chaining).
*/
Qlobber.prototype.remove = function (topic, val)
{
    if (this._remove(val, 0, topic.split(this._separator), this._trie) && this._shortcuts)
    {
        this._shortcuts.delete(topic);
    }
    return this;
};

/**
Match a topic.

@param {String} topic The topic to match against.
@return {Array} List of values that matched the topic. This may contain duplicates. Use a [`QlobberDedup`](#qlobberdedupoptions) if you don't want duplicates.
*/
Qlobber.prototype.match = function (topic, ctx)
{
    return this._match2([], topic, ctx);
};

/**
Test whether a topic match contains a value. Faster than calling [`match`](#qlobberprototypematchtopic) and searching the result for the value. Values are tested using [`test_values`](#qlobberprototypetest_valuesvals-val).

@param {String} topic The topic to match against.
@param {Any} val The value being tested for.
@return {Boolean} Whether matching against `topic` contains `val`.
*/
Qlobber.prototype.test = function (topic, val)
{
    return this._test(val, 0, topic.split(this._separator), this._trie);
};

/**
Test whether values found in a match contain a value passed to [`test`](#qlobberprototypetesttopic-val). You can override this to provide a custom implementation. Defaults to using `indexOf`.

@param {Array} vals The values found while matching.
@param {Any} val The value being tested for.
@return {Boolean} Whether `vals` contains `val`.
*/
Qlobber.prototype.test_values = function (vals, val)
{
    return vals.indexOf(val) >= 0;
};

/**
Reset the qlobber.

Removes all topic matchers from the qlobber.

@return {Qlobber} The qlobber (for chaining).
*/
Qlobber.prototype.clear = function ()
{
    this._trie.clear();
    if (this._shortcuts)
    {
        this._shortcuts.clear();
    }
    return this;
};

// for debugging
Qlobber.prototype.get_trie = function ()
{
    return this._trie;
};

/**
Visit each node in the qlobber's trie in turn.

@return {Iterator} An iterator on the trie. The iterator returns objects which, if fed (in the same order) to the function returned by [`get_restorer`](#qlobberprototypeget_restoreroptions) on a different qlobber, will build that qlobber's trie to the same state. The objects can be serialized using `JSON.stringify`, _if_ the values you store in the qlobber are also serializable.
*/
Qlobber.prototype.visit = function* ()
{
    let iterators = [],
        iterator = this._trie.entries(),
        i = 0;

    while (true)
    {
        if (i === 0)
        {
            yield { type: 'start_entries' };
        }

        let next = iterator.next();

        if (next.done)
        {
            yield { type: 'end_entries' };

            let prev = iterators.pop();
            if (prev === undefined)
            {
                return;
            }

            [iterator, i] = prev;
            continue;
        }

        let [key, value] = next.value;
        yield { type: 'entry', i: i++, key: key };

        if (key === this._separator)
        {
            yield { type: 'start_values' };

            if (value[Symbol.iterator])
            {
                let j = 0;
                for (let v of value)
                {
                    yield { type: 'value', i: j++, value: v };
                }
            }
            else
            {
                yield { type: 'value', i: 0, value: value };
            }

            yield { type: 'end_values' };
            continue;
        }

        iterators.push([iterator, i]);
        iterator = value.entries();
        i = 0;
    }
};

/**
Get a function which can restore the qlobber's trie to a state you retrieved
by calling [`visit`](#qlobberprototypevisit) on this or another qlobber.

@param {Object} [options] Options for restoring the trie.
- `{Boolean} cache_adds` Whether to cache topics when rebuilding the trie. This only applies if you also passed `cache_adds` as true in the [constructor](#qlobberoptions).

@return {Function} Function to call in order to rebuild the qlobber's trie. You should call this repeatedly with the objects you received from a call to [`visit`](#qlobberprototypevisit). If you serialized the objects, remember to deserialize them first (e.g. with `JSON.parse`)!
*/
Qlobber.prototype.get_restorer = function (options)
{
    options = options || {};

    let sts = [],
        entry = this._trie,
        path = '';

    return (obj) =>
    {
        switch (obj.type)
        {
            case 'entry':
                entry = entry || new Map();
                sts.push([entry, obj.key, path]);
                entry = entry.get(obj.key);
                if (options.cache_adds)
                {
                    if (path)
                    {
                        path += this._separator;
                    }
                    path += obj.key;
                }
                break;

            case 'value':
                if (entry)
                {
                    this._add_value(entry, obj.value);
                }
                else
                {
                    entry = this._initial_value(obj.value);
                }
                break;

            case 'end_entries':
                if (entry && (entry.size === 0))
                {
                    entry = undefined;
                }
                /* falls through */

            case 'end_values':
                let prev = sts.pop();
                if (prev === undefined)
                {
                    entry = undefined;
                    path = '';
                }
                else
                {
                    let [prev_entry, key, prev_path] = prev;
                    if (entry)
                    {
                        if (options.cache_adds &&
                            this._shortcuts &&
                            (obj.type === 'end_values'))
                        {
                            this._shortcuts.set(prev_path, entry);
                        }
                        prev_entry.set(key, entry);
                    }
                    entry = prev_entry;
                    path = prev_path;
                }
                break;
        }
    };
};

/**
Creates a new de-duplicating qlobber.

Inherits from [`Qlobber`](#qlobberoptions).

@constructor
@param {Object} [options] Same options as Qlobber.
*/
function QlobberDedup (options)
{
    Qlobber.call(this, options);
}

util.inherits(QlobberDedup, Qlobber);

QlobberDedup.prototype._initial_value = function (val)
{
    return new Set().add(val);
};

QlobberDedup.prototype._add_value = function (vals, val)
{
    vals.add(val);
};

QlobberDedup.prototype._add_values = function (dest, origin)
{
    origin.forEach(function (val)
    {
        dest.add(val);
    });
};

QlobberDedup.prototype._remove_value = function (vals, val)
{
    if (val === undefined)
    {
        return true;
    }

    vals.delete(val);
    return vals.size === 0;
};

/**
Test whether values found in a match contain a value passed to [`test`](#qlobberprototypetesttopic_val). You can override this to provide a custom implementation. Defaults to using `has`.

@param {Set} vals The values found while matching ([ES6 Set](http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects)).
@param {Any} val The value being tested for.
@return {Boolean} Whether `vals` contains `val`.
*/
QlobberDedup.prototype.test_values = function (vals, val)
{
    return vals.has(val);
};

/**
Match a topic.

@param {String} topic The topic to match against.
@return {Set} [ES6 Set](http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects) of values that matched the topic.
*/
QlobberDedup.prototype.match = function (topic, ctx)
{
    return this._match2(new Set(), topic, ctx);
};

/**
Creates a new qlobber which only stores the value `true`.

Whatever value you [`add`](#qlobberprototypeaddtopic-val) to this qlobber
(even `undefined`), a single, de-duplicated `true` will be stored. Use this
qlobber if you only need to test whether topics match, not about the values
they match to.

Inherits from [`Qlobber`](#qlobberoptions).

@constructor
@param {Object} [options] Same options as Qlobber.
*/
function QlobberTrue (options)
{
    Qlobber.call(this, options);
}

util.inherits(QlobberTrue, Qlobber);

QlobberTrue.prototype._initial_value = function ()
{
    return true;
};

QlobberTrue.prototype._add_value = function ()
{
};

QlobberTrue.prototype._remove_value = function ()
{
    return true;
};

/**
This override of [`test_values`](#qlobberprototypetest_valuesvals-val) always
returns `true`. When you call [`test`](#qlobberprototypetesttopic-val) on a
`QlobberTrue` instance, the value you pass is ignored since it only cares
whether a topic is matched.

@return {Boolean} Always `true`.
*/
QlobberTrue.prototype.test_values = function ()
{
    return true;    
};

/**
Match a topic.

Since `QlobberTrue` only cares whether a topic is matched and not about values
it matches to, this override of [`match`](#qlobberprototypematchtopic) just
calls [`test`](#qlobberprototypetesttopic-val) (with value `undefined`).

@param {String} topic The topic to match against.
@return {Boolean} Whether the `QlobberTrue` instance matches the topic.
*/
QlobberTrue.prototype.match = function (topic, ctx)
{
    return this.test(topic, ctx);
};

let stream = __webpack_require__(39);

/**
Creates a new [`Readable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_readable) stream, in object mode, which calls [`visit`](#qlobberprototypevisit) on a qlobber to generate its data.

You could [`pipe`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_pipe_destination_options) this to a [`JSONStream.stringify`](https://github.com/dominictarr/JSONStream#jsonstreamstringifyopen-sep-close) stream, for instance, to serialize the qlobber to JSON. See [this test](test/json.js#L14) for an example.

Inherits from [`Readable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_readable).

@constructor

@param {Qlobber} qlobber The qlobber to call [`visit`](#qlobberprototypevisit) on.
*/
function VisitorStream (qlobber)
{
    stream.Readable.call(this, { objectMode: true });
    this._iterator = qlobber.visit();
}

util.inherits(VisitorStream, stream.Readable);

VisitorStream.prototype._read = function ()
{
    while (true)
    {
        let { done, value } = this._iterator.next();

        if (done)
        {
            this.push(null);
            break;
        }

        if (!this.push(value))
        {
            break;
        }
    }
};

/**
Creates a new [`Writable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_writable) stream, in object mode, which passes data written to it into the function returned by calling [`get_restorer`](#qlobberprototypeget_restoreroptions) on a qlobber.

You could [`pipe`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_pipe_destination_options) a [`JSONStream.parse`](https://github.com/dominictarr/JSONStream#jsonstreamparsepath) stream to this, for instance, to deserialize the qlobber from JSON. See [this test](test/json.js#L33) for an example.

Inherits from [`Writable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_writable).

@constructor

@param {Qlobber} qlobber The qlobber to call [`get_restorer`](#qlobberprototypeget_restoreroptions) on.
*/
function RestorerStream (qlobber)
{
    stream.Writable.call(this, { objectMode: true });
    this._restorer = qlobber.get_restorer();
}

util.inherits(RestorerStream, stream.Writable);

RestorerStream.prototype._write = function (value, _, cb)
{
    this._restorer(value);
    cb();
};

exports.Qlobber = Qlobber;
exports.QlobberDedup = QlobberDedup;
exports.QlobberTrue = QlobberTrue;
exports.VisitorStream = VisitorStream;
exports.RestorerStream = RestorerStream;



/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(37);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(38);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(7)))

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(15).EventEmitter;
var inherits = __webpack_require__(5);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(16);
Stream.Writable = __webpack_require__(50);
Stream.Duplex = __webpack_require__(51);
Stream.Transform = __webpack_require__(52);
Stream.PassThrough = __webpack_require__(53);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(12).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(47);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(7)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(23);

/*<replacement>*/
var util = __webpack_require__(8);
util.inherits = __webpack_require__(5);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).Transform


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).PassThrough


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const extension_port_controller_1 = __webpack_require__(55);
const host_constants_1 = __webpack_require__(69);
const messages_1 = __webpack_require__(27);
const message_types_1 = __webpack_require__(6);
const url_utils_1 = __webpack_require__(1);
const maybe_1 = __webpack_require__(0);
const dom_utils_1 = __webpack_require__(70);
class BlockedFileController {
    constructor(document, fileURL) {
        this.document = document;
        this.fileURL = fileURL;
        this.extensionPortController = new extension_port_controller_1.ExtensionPortController(host_constants_1.hostConstants.blockedFilePagePortName, () => this.onExtensionReady());
        this.extensionPortController.registerMessageHandler(message_types_1.MessageType.blockedFileResponseV1, (message) => this.handleResponse(message));
        this.extensionPortController.connect();
    }
    sendMessage(type, payload) {
        this.extensionPortController.sendMessage(type, payload);
    }
    navigateToFile(fileURL) {
        dom_utils_1.navigateDocument(this.document, fileURL);
    }
    handleResponse(message) {
        const response = message.payload;
        const isTrusted = response.isTrusted;
        const fileURL = url_utils_1.parseUrl(response.fileUrlSpec);
        if (maybe_1.none(fileURL)) {
            return;
        }
        if (isTrusted) {
            this.navigateToFile(fileURL);
        }
    }
    sendRequest() {
        this.sendMessage(message_types_1.MessageType.blockedFileRequestV1, new messages_1.BlockedFileRequestV1(url_utils_1.URLToString(this.fileURL)));
    }
    onExtensionReady() {
        this.sendRequest();
    }
}
exports.BlockedFileController = BlockedFileController;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_router_1 = __webpack_require__(56);
const message_port_channel_1 = __webpack_require__(59);
const promise_utils_1 = __webpack_require__(68);
const message_types_1 = __webpack_require__(6);
const log_1 = __webpack_require__(14);
const string_utils_1 = __webpack_require__(2);
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["disconnected"] = 0] = "disconnected";
    ConnectionState[ConnectionState["connecting"] = 1] = "connecting";
    ConnectionState[ConnectionState["connected"] = 2] = "connected";
    ConnectionState[ConnectionState["extensionReady"] = 3] = "extensionReady";
})(ConnectionState || (ConnectionState = {}));
class ExtensionPortController {
    constructor(portName, onExtensionReady) {
        this.portName = portName;
        this.onExtensionReady = onExtensionReady;
        this.messageRouter = new message_router_1.GenericMessageRouter();
        this.connectionState = ConnectionState.disconnected;
        this.registerMessageHandler(message_types_1.MessageType.extensionReadyV1, (message) => this.handleExtensionReady(message));
        this.extensionChannel = this.createExtensionChannel();
    }
    connect() {
        if (this.connectionState === ConnectionState.disconnected) {
            this.connectionState = ConnectionState.connecting;
            this.extensionChannel.connect();
        }
    }
    registerMessageHandler(type, handler) {
        this.messageRouter.registerMessageHandler(type, handler);
    }
    sendMessage(type, payload) {
        const messageSender = this.extensionChannel.messageSender;
        messageSender.sendMessage(type, payload);
    }
    connectToPort() {
        return promise_utils_1.makePromise(() => {
            return chrome.runtime.connect({
                name: this.portName
            });
        });
    }
    createExtensionChannel() {
        return new message_port_channel_1.GenericMessagePortChannel(this.connectToPort(), (port) => this.onExtensionConnected(port), (port) => this.onExtensionDisconnected(port), this.messageRouter, message_port_channel_1.Negotiation.None);
    }
    reconnectToExtension() {
        log_1.log(`ExtensionPortController.reconnectToExtension: ${string_utils_1.toString({
            portName: this.portName,
            connectionState: this.connectionState
        })}`);
        this.connectionState = ConnectionState.connecting;
        this.extensionChannel = this.createExtensionChannel();
        this.extensionChannel.connect();
    }
    handleExtensionReady(message) {
        log_1.log(`ExtensionPortController.handleExtensionReady: ${string_utils_1.toString({
            portName: this.portName,
            connectionState: this.connectionState
        })}`);
        this.connectionState = ConnectionState.extensionReady;
        this.onExtensionReady();
    }
    onExtensionConnected(port) {
        log_1.log(`ExtensionPortController.onExtensionConnected: ${string_utils_1.toString({
            portName: this.portName,
            connectionState: this.connectionState
        })}`);
        this.connectionState = ConnectionState.connected;
    }
    onExtensionDisconnected(port) {
        log_1.log(`ExtensionPortController.onExtensionDisconnected: ${string_utils_1.toString({
            portName: this.portName
        })}`);
        if (this.connectionState !== ConnectionState.extensionReady) {
            this.reconnectToExtension();
        }
    }
}
exports.ExtensionPortController = ExtensionPortController;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_decoder_1 = __webpack_require__(24);
const event_dispatcher_1 = __webpack_require__(25);
function handleInvalidMessage(port, invalidMessage) {
    console.log(`handleInvalidMessage: invalidMessage: ${invalidMessage}`);
}
function onUnhandledMessage(port, message) {
    console.log(`onUnhandledMessage: message: ${message}`);
}
class MessageRouter {
    constructor(handleInvalidMessage, onUnhandledMessage) {
        this.handleInvalidMessage = handleInvalidMessage;
        this.onUnhandledMessage = onUnhandledMessage;
        this.messageHandlers = new Map();
    }
    registerMessageHandler(type, handleMessage) {
        this.registerPortMessageHandler(type, (port, message) => {
            handleMessage(message);
        });
    }
    registerPortMessageHandler(type, handleMessage) {
        const messageHandlers = this.messageHandlers.get(type);
        if (messageHandlers === undefined) {
            this.messageHandlers.set(type, [handleMessage]);
        }
        else {
            messageHandlers.push(handleMessage);
        }
    }
}
class GenericMessageRouter extends MessageRouter {
    constructor() {
        super(handleInvalidMessage, onUnhandledMessage);
        this.onMessageDecoded = new event_dispatcher_1.EventDispatcher();
    }
    onMessageReceived(port, encodedMessage) {
        let message = message_decoder_1.decodeMessage(encodedMessage);
        if (message === undefined) {
            this.handleInvalidMessage(port, encodedMessage);
            return;
        }
        this.onMessageDecoded.dispatchEvent(new message_decoder_1.MessageDecodedEvent(message));
        const messageHandlers = this.messageHandlers.get(message.type);
        if (messageHandlers === undefined) {
            this.onUnhandledMessage(port, message);
            return;
        }
        for (const handleMessage of messageHandlers) {
            handleMessage(port, message);
        }
    }
}
exports.GenericMessageRouter = GenericMessageRouter;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
function isEmpty(array) {
    return array.length === 0;
}
exports.isEmpty = isEmpty;
function first(array) {
    return array[0];
}
exports.first = first;
function second(array) {
    return array[1];
}
exports.second = second;
function last(array) {
    return array[array.length - 1];
}
exports.last = last;
function rest(array) {
    return array.slice(1);
}
exports.rest = rest;
function contains(array, element) {
    return array.indexOf(element) !== -1;
}
exports.contains = contains;
function copyArray(array) {
    const identity = (value) => {
        return value;
    };
    return array.map(identity);
}
exports.copyArray = copyArray;
function isArray(value) {
    return value instanceof Array;
}
exports.isArray = isArray;
function newArray(length, value) {
    const array = new Array();
    for (let index = 0; index < length; index += 1) {
        array.push(value);
    }
    return array;
}
exports.newArray = newArray;
function findIndex(array, value) {
    const notFound = -1;
    const index = array.indexOf(value);
    if (index === notFound) {
        return undefined;
    }
    return index;
}
exports.findIndex = findIndex;
function findAllIndices(array, predicate) {
    const results = new Array();
    array.forEach((element, index) => {
        if (predicate(element)) {
            results.push(index);
        }
    });
    return results;
}
exports.findAllIndices = findAllIndices;
function compareArrays(a, b, compare = maybe_1.isEqual) {
    if (a.length !== b.length) {
        return false;
    }
    const length = a.length;
    for (let i = 0; i < length; i += 1) {
        if (!compare(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
exports.compareArrays = compareArrays;
function has(array, value) {
    return maybe_1.some(findIndex(array, value));
}
exports.has = has;
function findUnique(array, predicate) {
    const matchingElements = array.filter(predicate);
    if (matchingElements.length !== 1) {
        return undefined;
    }
    return first(matchingElements);
}
exports.findUnique = findUnique;
function maybeFirst(array) {
    if (maybe_1.none(array)) {
        return undefined;
    }
    return first(array);
}
exports.maybeFirst = maybeFirst;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function doOnce(action) {
    let done = false;
    return () => {
        if (!done) {
            done = true;
            action();
        }
    };
}
exports.doOnce = doOnce;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_sender_1 = __webpack_require__(60);
const messages_1 = __webpack_require__(27);
const message_types_1 = __webpack_require__(6);
const message_encoder_1 = __webpack_require__(26);
const message_decoder_1 = __webpack_require__(24);
const maybe_1 = __webpack_require__(0);
const event_dispatcher_1 = __webpack_require__(25);
const handshaker_1 = __webpack_require__(62);
const string_utils_1 = __webpack_require__(2);
const errors_1 = __webpack_require__(28);
const port_utils_1 = __webpack_require__(63);
const protocol_versions_1 = __webpack_require__(65);
const connection_1 = __webpack_require__(67);
const log_1 = __webpack_require__(14);
var Negotiation;
(function (Negotiation) {
    Negotiation[Negotiation["None"] = 0] = "None";
    Negotiation[Negotiation["NegotiateProtocolVersion"] = 1] = "NegotiateProtocolVersion";
})(Negotiation = exports.Negotiation || (exports.Negotiation = {}));
class MessagePortChannel {
    constructor(connectToPort, onConnect, onDisconnect, onPortError, onNegotiationError, messageRouter, negotiation) {
        this.connectToPort = connectToPort;
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
        this.onPortError = onPortError;
        this.onNegotiationError = onNegotiationError;
        this.messageRouter = messageRouter;
        this.negotiation = negotiation;
        this.onHandshaken = new event_dispatcher_1.EventDispatcher();
        this.onConnectionStateChanged = new event_dispatcher_1.EventDispatcher();
        this.messages = new Array();
        this._connState = connection_1.ConnectionState.Disconnected;
        this._negotiatedVersion = undefined;
        this.messageSender = new message_sender_1.MessageSender((message) => this.sendMessage(message));
    }
    disconnectPort(port) {
        port.disconnect();
        this.handleDisconnect(port);
    }
    connect() {
        console.log("MessagePortChannel.connect");
        if (this.connState !== connection_1.ConnectionState.Disconnected) {
            throw new Error(`MessagePortChannel.connect called with connState == ${this.connState}`);
        }
        this.connState = connection_1.ConnectionState.Connecting;
        this.connectToPort.then((port) => {
            if (this.connState === connection_1.ConnectionState.Disconnecting) {
                this.disconnectPort(port);
                return;
            }
            this.port = port;
            this.port.onMessage.addListener((encodeMessage, port) => this.onMessage(encodeMessage, port));
            this.port.onDisconnect.addListener((port) => this.handleDisconnect(port));
            if (this.negotiation === Negotiation.NegotiateProtocolVersion) {
                this.connState = connection_1.ConnectionState.Handshaking;
                const handshake = new messages_1.HandshakeV1(protocol_versions_1.supportedProtocolVersions);
                const message = message_encoder_1.encodeMessage(message_types_1.MessageType.handshakeV1, handshake);
                this.postMessage(message);
            }
            else {
                this.sendQueuedMessages();
                this.connState = connection_1.ConnectionState.Connected;
                this.onConnect(this.port);
            }
        });
    }
    disconnect() {
        console.log(`MessagePortChannel.connect: connState == ${this.connState}`);
        switch (this.connState) {
            case connection_1.ConnectionState.Disconnected:
                break;
            case connection_1.ConnectionState.Disconnecting:
                break;
            case connection_1.ConnectionState.Connecting:
                this.connState = connection_1.ConnectionState.Disconnecting;
                break;
            case connection_1.ConnectionState.Handshaking:
                if (maybe_1.some(this.port)) {
                    this.disconnectPort(this.port);
                }
                break;
            case connection_1.ConnectionState.Connected:
                if (maybe_1.some(this.port)) {
                    this.disconnectPort(this.port);
                }
                break;
        }
    }
    postMessage(message) {
        try {
            if (maybe_1.none(this.port)) {
                throw new Error("MessagePortChannel.postMessage: this.port === undefined");
            }
            if (!message_types_1.isFrequentlySentMessageType(message.type)) {
                this.log(`MessagePortChannel.postMessage: message: ${messages_1.messageToString(message)}`);
            }
            this.port.postMessage(message);
        }
        catch (e) {
            if (errors_1.isError(e)) {
                this.onPortError(e);
            }
            else {
                const error = new Error(`Unknown error caught in postMessage: ${string_utils_1.toString(e)}`);
                this.onPortError(error);
            }
        }
    }
    sendQueuedMessages() {
        for (const message of this.messages) {
            this.postMessage(message);
        }
        this.messages = [];
    }
    queueMessage(message) {
        this.messages.push(message);
    }
    sendMessage(message) {
        if (this.connState === connection_1.ConnectionState.Connected) {
            this.postMessage(message);
        }
        else {
            this.queueMessage(message);
        }
        return true;
    }
    onMessage(encodedMessage, port) {
        if (this.connState === connection_1.ConnectionState.Handshaking) {
            this.log(`MessagePortChannel.onMessage: message: ${string_utils_1.toString(encodedMessage)} port: ${port_utils_1.portToString(port)}`);
            let message = message_decoder_1.decodeMessage(encodedMessage);
            if (maybe_1.none(message)) {
                this.logError(new Error('MessagePortChannel.onMessage: invalid message'));
            }
            else if (message_types_1.isEdgeAckWorkaround(message.type)) {
            }
            else if (message.type !== message_types_1.MessageType.handshakeV1) {
                this.onNegotiationError(new Error(`Message before handshaken: ${message.type}`));
            }
            else if (maybe_1.none(this.port)) {
                this.onPortError(new Error("MessagePortChannel.onMessage: this.port === undefined"));
            }
            else {
                const handshake = message.payload;
                for (const supportedVersion of protocol_versions_1.supportedProtocolVersions) {
                    if (handshake.versions.indexOf(supportedVersion) >= 0) {
                        this._negotiatedVersion = supportedVersion;
                        this.log(`Negotiated protocol version: ${this._negotiatedVersion}`);
                        this.sendQueuedMessages();
                        this.connState = connection_1.ConnectionState.Connected;
                        this.onHandshaken.dispatchEvent(new handshaker_1.HandshakenEvent(this._negotiatedVersion));
                        this.onConnect(this.port);
                        return;
                    }
                }
                this.onNegotiationError(new Error(`No supported version received in handshake: ${handshake.versions}`));
            }
        }
        else if (this.connState == connection_1.ConnectionState.Connected) {
            this.messageRouter.onMessageReceived(port, encodedMessage);
        }
    }
    handleDisconnect(port) {
        if (this.connState === connection_1.ConnectionState.Disconnected) {
            return;
        }
        this.connState = connection_1.ConnectionState.Disconnected;
        this.port = undefined;
        console.log(`MessagePortChannel.handleDisconnect: port: ${port_utils_1.portToString(port)}`);
        this.onDisconnect(port);
    }
    shouldLogMessage() {
        if (this.negotiation === Negotiation.None) {
            return true;
        }
        return maybe_1.some(this.negotiatedVersion) && protocol_versions_1.shouldLogMessage(this.negotiatedVersion);
    }
    log(message) {
        if (this.shouldLogMessage()) {
            log_1.log(message);
        }
        else {
            console.log(message);
        }
    }
    logError(error) {
        if (this.shouldLogMessage()) {
            log_1.logError(error);
        }
        else {
            console.error(error);
        }
    }
    get connState() {
        return this._connState;
    }
    set connState(newState) {
        const oldState = this._connState;
        this._connState = newState;
        this.onConnectionStateChanged.dispatchEvent(new connection_1.ConnectionStateChangedEvent(oldState, newState));
    }
    get isHandshaken() {
        return this.connState === connection_1.ConnectionState.Connected;
    }
    get negotiatedVersion() {
        return this._negotiatedVersion;
    }
    get connectionState() {
        return this.connState;
    }
}
exports.MessagePortChannel = MessagePortChannel;
class GenericMessagePortChannel extends MessagePortChannel {
    constructor(connectToPort, onConnect, onDisconnect, messageRouter, negotiation) {
        super(connectToPort, onConnect, onDisconnect, (e) => { console.error(e); }, (e) => { console.error(e); }, messageRouter, negotiation);
    }
}
exports.GenericMessagePortChannel = GenericMessagePortChannel;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_encoder_1 = __webpack_require__(26);
class MessageSender {
    constructor(doSendMessage) {
        this.doSendMessage = doSendMessage;
    }
    sendMessage(type, payload) {
        const message = message_encoder_1.encodeMessage(type, payload);
        return this.doSendMessage(message);
    }
}
exports.MessageSender = MessageSender;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(value) {
    return value instanceof Object;
}
exports.isObject = isObject;
function isBoolean(value) {
    return typeof value === "boolean";
}
exports.isBoolean = isBoolean;
function isNumber(value) {
    return typeof value === "number";
}
exports.isNumber = isNumber;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HandshakenEvent {
    constructor(negotiatedVersion) {
        this.negotiatedVersion = negotiatedVersion;
    }
}
exports.HandshakenEvent = HandshakenEvent;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const tab_utils_1 = __webpack_require__(64);
const url_utils_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(2);
function readPortTabId(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return undefined;
    }
    const tab = sender.tab;
    if (maybe_1.none(tab)) {
        return undefined;
    }
    const tabId = tab.id;
    if (maybe_1.none(tabId)) {
        return undefined;
    }
    if (!tab_utils_1.isValidTabId(tabId)) {
        return undefined;
    }
    return tabId;
}
exports.readPortTabId = readPortTabId;
function readPortPageUrl(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return;
    }
    const urlSpec = sender.url;
    if (maybe_1.none(urlSpec)) {
        return;
    }
    const url = url_utils_1.parseUrl(urlSpec);
    return url;
}
exports.readPortPageUrl = readPortPageUrl;
function readPortTabUrl(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return undefined;
    }
    const tab = sender.tab;
    if (maybe_1.none(tab)) {
        return undefined;
    }
    const urlSpec = tab.url;
    if (maybe_1.none(urlSpec)) {
        return undefined;
    }
    const url = url_utils_1.parseUrl(urlSpec);
    return url;
}
exports.readPortTabUrl = readPortTabUrl;
function readPortFrameId(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return undefined;
    }
    return sender.frameId;
}
exports.readPortFrameId = readPortFrameId;
function portToString(port) {
    if (port === undefined) {
        return "undefined";
    }
    return string_utils_1.toString({
        name: port.name,
        tabId: readPortTabId(port),
        frameId: readPortFrameId(port),
        pageUrl: readPortPageUrl(port)
    });
}
exports.portToString = portToString;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const murmur_hash_1 = __webpack_require__(10);
function isValidWindowId(windowId) {
    return windowId !== chrome.windows.WINDOW_ID_NONE;
}
exports.isValidWindowId = isValidWindowId;
function isValidTabId(tabId) {
    return tabId !== chrome.tabs.TAB_ID_NONE;
}
exports.isValidTabId = isValidTabId;
function hashTabId(tabId, seed = 0) {
    return murmur_hash_1.murmurHash(tabId, seed);
}
exports.hashTabId = hashTabId;
function isSameTabId(a, b) {
    if (!isValidTabId(a) || !isValidTabId(b)) {
        return false;
    }
    return a === b;
}
exports.isSameTabId = isSameTabId;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __webpack_require__(2);
const range_1 = __webpack_require__(66);
const message_types_1 = __webpack_require__(6);
const maybe_1 = __webpack_require__(0);
const errors_1 = __webpack_require__(28);
var ProtocolVersion;
(function (ProtocolVersion) {
    ProtocolVersion["v1"] = "tag:bromium.com,2018-02:protocols:google-chrome-extension:initial";
    ProtocolVersion["v2"] = "tag:bromium.com,2018-06:protocols:google-chrome-extension:v2";
    ProtocolVersion["v3"] = "tag:bromium.com,2018-07:protocols:google-chrome-extension:v3";
    ProtocolVersion["v4"] = "tag:bromium.com,2018-08:protocols:google-chrome-extension:v4";
    ProtocolVersion["v5"] = "tag:bromium.com,2018-11:protocols:google-chrome-extension:v5";
    ProtocolVersion["v6"] = "tag:bromium.com,2018-12:protocols:google-chrome-extension:v6";
    ProtocolVersion["v7"] = "tag:bromium.com,2019-01:protocols:google-chrome-extension:v7";
    ProtocolVersion["v8"] = "tag:bromium.com,2019-06:protocols:google-chrome-extension:v8";
    ProtocolVersion["v9"] = "tag:bromium.com,2019-07:protocols:google-chrome-extension:v9";
    ProtocolVersion["v10"] = "tag:bromium.com,2019-09:protocols:google-chrome-extension:v10";
    ProtocolVersion["v11"] = "tag:bromium.com,2019-10:protocols:google-chrome-extension:v11";
    ProtocolVersion["v12"] = "tag:bromium.com,2019-11:protocols:google-chrome-extension:v12";
})(ProtocolVersion = exports.ProtocolVersion || (exports.ProtocolVersion = {}));
exports.supportedProtocolVersions = [
    ProtocolVersion.v12,
    ProtocolVersion.v11,
    ProtocolVersion.v10,
    ProtocolVersion.v9,
    ProtocolVersion.v8,
    ProtocolVersion.v7,
    ProtocolVersion.v6,
    ProtocolVersion.v5,
    ProtocolVersion.v4,
    ProtocolVersion.v3,
    ProtocolVersion.v2,
    ProtocolVersion.v1
];
const supportedMessageTypes = (() => {
    const supportedMessageRanges = string_utils_1.makeStringHashMap();
    supportedMessageRanges.putMany([
        [ProtocolVersion.v1, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.heartbeatV1)],
        [ProtocolVersion.v2, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.enabledFeaturesResponseV2)],
        [ProtocolVersion.v3, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.reputationChangedV3)],
        [ProtocolVersion.v4, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.blockedPageDataResponseV4)],
        [ProtocolVersion.v5, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.popupDataResponseV5)],
        [ProtocolVersion.v6, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.trustUrlV6)],
        [ProtocolVersion.v7, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV7)],
        [ProtocolVersion.v8, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV8)],
        [ProtocolVersion.v9, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV9)],
        [ProtocolVersion.v10, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.heartbeatV10)],
        [ProtocolVersion.v11, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV11)],
        [ProtocolVersion.v12, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV12)],
    ]);
    return supportedMessageRanges;
})();
function isMessageTypeSupported(messageType, protocolVersion) {
    const range = supportedMessageTypes.get(protocolVersion);
    if (maybe_1.none(range)) {
        return false;
    }
    return range.contains(messageType);
}
exports.isMessageTypeSupported = isMessageTypeSupported;
var VersionSupportStatus;
(function (VersionSupportStatus) {
    VersionSupportStatus[VersionSupportStatus["notHandshaken"] = 0] = "notHandshaken";
    VersionSupportStatus[VersionSupportStatus["supported"] = 1] = "supported";
    VersionSupportStatus[VersionSupportStatus["unsupported"] = 2] = "unsupported";
})(VersionSupportStatus = exports.VersionSupportStatus || (exports.VersionSupportStatus = {}));
const supportedErrors = (() => {
    const supportedErrors = string_utils_1.makeStringHashMap();
    supportedErrors.putMany([
        [ProtocolVersion.v1, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v2, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v3, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v4, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v5, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v6, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v7, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.is32bitFirefox)],
        [ProtocolVersion.v8, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.is32bitFirefox)],
        [ProtocolVersion.v9, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.is32bitFirefox)],
        [ProtocolVersion.v10, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.helperUnresponsive)],
        [ProtocolVersion.v11, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.helperUnresponsive)],
        [ProtocolVersion.v12, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.helperUnresponsive)],
    ]);
    return supportedErrors;
})();
function isErrorSupported(error, protocolVersion) {
    const range = supportedErrors.get(protocolVersion);
    if (maybe_1.none(range)) {
        return false;
    }
    return range.contains(error);
}
exports.isErrorSupported = isErrorSupported;
function shouldLogMessage(protocolVersion) {
    return !isMessageTypeSupported(message_types_1.MessageType.stopHelperV10, protocolVersion);
}
exports.shouldLogMessage = shouldLogMessage;
var HelpPageVersion;
(function (HelpPageVersion) {
    HelpPageVersion["v415"] = "v4.1.5";
    HelpPageVersion["v4181"] = "v4.1.8.1";
    HelpPageVersion["maxHelpPageVersion"] = "v4.1.8.1";
})(HelpPageVersion || (HelpPageVersion = {}));
;
const supportedHelpPageVersions = (() => {
    const supportedHelpPageVersions = string_utils_1.makeStringHashMap();
    supportedHelpPageVersions.putMany([
        [ProtocolVersion.v1, HelpPageVersion.v415],
        [ProtocolVersion.v2, HelpPageVersion.v415],
        [ProtocolVersion.v3, HelpPageVersion.v415],
        [ProtocolVersion.v4, HelpPageVersion.v415],
        [ProtocolVersion.v5, HelpPageVersion.v415],
        [ProtocolVersion.v6, HelpPageVersion.v415],
        [ProtocolVersion.v7, HelpPageVersion.v415],
        [ProtocolVersion.v8, HelpPageVersion.v415],
        [ProtocolVersion.v9, HelpPageVersion.v415],
        [ProtocolVersion.v10, HelpPageVersion.v415],
        [ProtocolVersion.v11, HelpPageVersion.v4181],
        [ProtocolVersion.v12, HelpPageVersion.v4181],
    ]);
    return supportedHelpPageVersions;
})();
function getHelpPageVersion(protocolVersion) {
    if (maybe_1.some(protocolVersion)) {
        const supportedVersion = supportedHelpPageVersions.get(protocolVersion);
        if (maybe_1.some(supportedVersion)) {
            return supportedVersion;
        }
    }
    return HelpPageVersion.maxHelpPageVersion;
}
exports.getHelpPageVersion = getHelpPageVersion;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const number_utils_1 = __webpack_require__(9);
class Range {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    contains(value) {
        return number_utils_1.isInRange(value, this.min, this.max);
    }
}
exports.Range = Range;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Connecting"] = 0] = "Connecting";
    ConnectionState[ConnectionState["Handshaking"] = 1] = "Handshaking";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
    ConnectionState[ConnectionState["Disconnecting"] = 3] = "Disconnecting";
    ConnectionState[ConnectionState["Disconnected"] = 4] = "Disconnected";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
class ConnectionStateChangedEvent {
    constructor(oldState, newState) {
        this.oldState = oldState;
        this.newState = newState;
    }
}
exports.ConnectionStateChangedEvent = ConnectionStateChangedEvent;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function makePromise(factory) {
    return new Promise((resolve, reject) => {
        resolve(factory());
    });
}
exports.makePromise = makePromise;
function makePromiseAsync(factory) {
    return new Promise((resolve, reject) => {
        factory(resolve);
    });
}
exports.makePromiseAsync = makePromiseAsync;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hostConstants = {
    hostHelperId: "com.bromium.hosthelper",
    blockedPage: "blocked-page.html",
    externalAppLinkPage: "external-app-link-page-v1.html",
    holdingPage: "holding-page.html",
    edgeExternalAppLinkQueryKey: "d1b30e68-83be-4b6e-9c2a-c1c4ca502e8b",
    edgeExternalAppLinkQueryValue: "0",
    blockedFilePage: "blocked-file-page.html",
    pageTrackerPortName: "com.bromium.page.tracker",
    externalAppLinkPagePortName: "com.bromium.external.app.link.page",
    blockedPagePortName: "com.bromium.blocked.page",
    blockedFilePagePortName: "com.bromium.blocked.file.page",
    popupPortName: "com.bromium.popup",
    optionsPortName: "com.bromium.options",
    maxAgePageEvent: 1000,
    postponementTimeout: 5000
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_utils_1 = __webpack_require__(1);
function navigateDocument(document, url) {
    document.location.href = url_utils_1.URLToString(url);
}
exports.navigateDocument = navigateDocument;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2U0OGU3OWUxNWUyMTg0MTA3OWEiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tYXliZS50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3VybC11dGlscy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3N0cmluZy11dGlscy50cyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9kdXBsZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9tZXNzYWdlLXR5cGVzLnRzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2NvcmUtdXRpbC1pcy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL251bWJlci11dGlscy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL211cm11ci1oYXNoLnRzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9wcm9jZXNzLW5leHRpY2stYXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc2FmZS1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9oYXNoLW1hcC50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2xvZy50cyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS1icm93c2VyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3JlYWRhYmxlLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbS1icm93c2VyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveS5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3N0cmluZ19kZWNvZGVyL2xpYi9zdHJpbmdfZGVjb2Rlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLWRlY29kZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1lbmNvZGVyLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9ob3N0L21lc3NhZ2VzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXJyb3JzLnRzIiwid2VicGFjazovLy8uL21haW4udHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvYmxvY2tlZC1maWxlLXBhZ2Utb3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3VybC1wYXJzZS11dGlscy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL29yaWdpbi50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2RhdGUtdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3Fsb2JiZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3Fsb2JiZXIvbGliL3Fsb2JiZXIuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvQnVmZmVyTGlzdC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC1kZXByZWNhdGUvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS93cml0YWJsZS1icm93c2VyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2R1cGxleC1icm93c2VyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaC5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja2VkLWZpbGUtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2V4dGVuc2lvbi1wb3J0LWNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLXJvdXRlci50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2FycmF5LXV0aWxzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vb25jZS50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL21lc3NhZ2UtcG9ydC1jaGFubmVsLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1zZW5kZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi90eXBlLXV0aWxzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vaGFuZHNoYWtlci50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3BvcnQtdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi90YWItdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvcHJvdG9jb2wtdmVyc2lvbnMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9yYW5nZS50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9wcm9taXNlLXV0aWxzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9ob3N0L2hvc3QtY29uc3RhbnRzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZG9tLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSCxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7O0FBRWpDOztBQUVBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9EQUFvRDtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7QUN2cEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSw2RUFBNkU7QUFDeEo7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtHQUFrRztBQUNsRyxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwrQ0FBK0M7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDNXZEQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDdkVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0NBQXNDLHNDQUFzQztBQUN6RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQy9RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFlBQVk7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEVB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Qzs7Ozs7Ozs7QUNMRDtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkE7QUFDQSxlQUFlLE1BQU0sTUFBTTs7QUFFM0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsT0FBTztBQUNmLElBQUksT0FBTzs7QUFFWCxJQUFJLE9BQU87O0FBRVgsSUFBSSxPQUFPOztBQUVYLElBQUksUUFBUTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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O0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMsS0FBSzs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3prQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7QUN4TEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFHLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRkQsNENBRUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZTQ4ZTc5ZTE1ZTIxODQxMDc5YSIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuZXhwb3J0IHR5cGUgTm9uZSA9IHVuZGVmaW5lZDtcclxuZXhwb3J0IHR5cGUgU29tZTxUPiA9IFQ7XHJcbmV4cG9ydCB0eXBlIE1heWJlPFQ+ID0gU29tZTxUPiB8IE5vbmU7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc29tZTxUPih2YWx1ZTogTWF5YmU8VD4pOiB2YWx1ZSBpcyBUIHtcclxuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9uZTxUPih2YWx1ZTogTWF5YmU8VD4pOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVNYXliZTxUPih2YWx1ZTogTWF5YmU8VD4pOiBUfG51bGwge1xyXG4gICAgaWYgKHNvbWUodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplTWF5YmU8VD4odmFsdWU6IFR8bnVsbCk6IE1heWJlPFQ+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWw8VD4oYTogVCwgYjogVCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGEgPT09IGI7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1heWJlQ29tcGFyZU9wdGlvbnMge1xyXG4gICAgbm9uZSA9IDB4MCxcclxuICAgIGNvbXBhcmVVbmRlZmluZWQgPSAweDEsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXliZUNvbXBhcmU8VD4oYTogTWF5YmU8VD4sIGI6IE1heWJlPFQ+LCBjb21wYXJlOiAoYTogVCwgYjogVCkgPT4gYm9vbGVhbiA9IGlzRXF1YWwsIG9wdGlvbnM6IE1heWJlQ29tcGFyZU9wdGlvbnMgPSBNYXliZUNvbXBhcmVPcHRpb25zLm5vbmUpIHtcclxuICAgIGlmIChzb21lKGEpICYmIHNvbWUoYikpIHtcclxuICAgICAgICByZXR1cm4gY29tcGFyZShhLCBiKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zICYgTWF5YmVDb21wYXJlT3B0aW9ucy5jb21wYXJlVW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vbmUoYSkgJiYgbm9uZShiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL21heWJlLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBOb25lLCBTb21lLCBNYXliZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IGNvbXBhcmVTdHJpbmdzLCBTdHJpbmdDb21wYXJlT3B0aW9ucyB9IGZyb20gXCIuL3N0cmluZy11dGlsc1wiO1xyXG5pbXBvcnQgeyBVcmwgYXMgVVJMIH0gZnJvbSBcIi4vdXJsXCI7XHJcbmltcG9ydCB7IEhhc2ggfSBmcm9tIFwiLi9oYXNoXCI7XHJcbmltcG9ydCB7IG11cm11ckhhc2ggfSBmcm9tIFwiLi9tdXJtdXItaGFzaFwiO1xyXG5pbXBvcnQgeyBIYXNoTWFwLCBIYXNoU2V0IH0gZnJvbSBcIi4vaGFzaC1tYXBcIjtcclxuaW1wb3J0IHsgU2NoZW1lIH0gZnJvbSBcIi4vb3JpZ2luXCI7XHJcblxyXG5leHBvcnQgeyBVUkwgfTtcclxuZXhwb3J0IHR5cGUgVVJMT3JTcGVjID0gVVJMIHwgc3RyaW5nO1xyXG5cclxuZXhwb3J0IGVudW0gVXJsQ29tcGFyZU9wdGlvbnMge1xyXG4gICAgRGVmYXVsdCxcclxuICAgIElnbm9yZVNlYXJjaFBhcmFtc1xyXG59XHJcblxyXG5lbnVtIFVybENvbXBvbmVudCB7XHJcbiAgICBQcm90b2NvbCA9IDEgPDwgMCxcclxuICAgIFVzZXJuYW1lID0gMSA8PCAxLFxyXG4gICAgUGFzc3dvcmQgPSAxIDw8IDIsXHJcbiAgICBIb3N0ID0gMSA8PCAzLFxyXG4gICAgUG9ydCA9IDEgPDwgNCxcclxuICAgIFBhdGhuYW1lID0gMSA8PCA1LFxyXG4gICAgU2VhcmNoID0gMSA8PCA2LFxyXG4gICAgQWxsID0gKDEgPDwgNykgLSAxXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmVVcmxDb21wb25lbnRzKGE6IFVSTCwgYjogVVJMLCBjb21wb25lbnRzOiBVcmxDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoY29tcG9uZW50OiBVcmxDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGNvbXBvbmVudHMgJiBjb21wb25lbnQpICE9PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Qcm90b2NvbCkgJiYgYS5wcm90b2NvbCAhPT0gYi5wcm90b2NvbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Vc2VybmFtZSkgJiYgYS51c2VybmFtZSAhPT0gYi51c2VybmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5QYXNzd29yZCkgJiYgYS5wYXNzd29yZCAhPT0gYi5wYXNzd29yZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Ib3N0KSAmJiBhLmhvc3QgIT09IGIuaG9zdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Qb3J0KSAmJiBhLnBvcnQgIT09IGIucG9ydCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5QYXRobmFtZSkgJiYgYS5wYXRobmFtZSAhPT0gYi5wYXRobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5TZWFyY2gpICYmIGEuc2VhcmNoICE9PSBiLnNlYXJjaCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVDb21wb25lbnQoY29tcG9uZW50czogVXJsQ29tcG9uZW50LCBjb21wb25lbnQ6IFVybENvbXBvbmVudCk6IFVybENvbXBvbmVudCB7XHJcbiAgICByZXR1cm4gY29tcG9uZW50cyAmICh+Y29tcG9uZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVVybChhOiBVUkwsIGI6IFVSTCwgb3B0aW9ucyA9IFVybENvbXBhcmVPcHRpb25zLkRlZmF1bHQpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAob3B0aW9ucykge1xyXG4gICAgICAgIGNhc2UgVXJsQ29tcGFyZU9wdGlvbnMuRGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVVcmxDb21wb25lbnRzKGEsIGIsIFVybENvbXBvbmVudC5BbGwpO1xyXG4gICAgICAgIGNhc2UgVXJsQ29tcGFyZU9wdGlvbnMuSWdub3JlU2VhcmNoUGFyYW1zOlxyXG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZVVybENvbXBvbmVudHMoYSwgYiwgcmVtb3ZlQ29tcG9uZW50KFVybENvbXBvbmVudC5BbGwsIFVybENvbXBvbmVudC5TZWFyY2gpKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlzU2FtZVVybDogaW52YWxpZCBvcHRpb25zOiAke29wdGlvbnN9YCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VSTCh2YWx1ZTogYW55KTogdmFsdWUgaXMgVVJMIHtcclxuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFVSTDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXJsKHNwZWM6IHN0cmluZyk6IE1heWJlPFVSTD4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbmV3IFVSTChzcGVjKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF5YmVQYXJzZVVybChzcGVjOiBzdHJpbmcpOiBVUkxPclNwZWMge1xyXG4gICAgY29uc3QgdXJsID0gcGFyc2VVcmwoc3BlYyk7XHJcbiAgICBpZiAodXJsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gc3BlYztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVVJMSWZOZWNlc3NhcnkodXJsT3JTcGVjOiBVUkxPclNwZWMpOiBNYXliZTxVUkw+IHtcclxuICAgIGlmIChpc1VSTCh1cmxPclNwZWMpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVybE9yU3BlYztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlVXJsKHVybE9yU3BlYyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVVcmxPclNwZWMoYTogVVJMT3JTcGVjLCBiOiBVUkxPclNwZWMsIG9wdGlvbnMgPSBVcmxDb21wYXJlT3B0aW9ucy5EZWZhdWx0KTogTWF5YmU8Ym9vbGVhbj4ge1xyXG4gICAgaWYgKChhIGluc3RhbmNlb2YgVVJMKSAmJiAoYiBpbnN0YW5jZW9mIFVSTCkpIHtcclxuICAgICAgICByZXR1cm4gaXNTYW1lVXJsKGEsIGIpO1xyXG4gICAgfSBlbHNlIGlmICgodHlwZW9mIGEgPT09IFwic3RyaW5nXCIpICYmICh0eXBlb2YgYiA9PT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICByZXR1cm4gYSA9PT0gYjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZVVybCh1cmw6IFVSTCkge1xyXG4gICAgcmV0dXJuIGNvbXBhcmVTdHJpbmdzKHVybC5wcm90b2NvbCwgU2NoZW1lLkZJTEUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFeHRlbnNpb25VcmwodXJsOiBVUkwpIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvblNjaGVtZXMgPSBbXHJcbiAgICAgICAgU2NoZW1lLkNIUk9NRV9FWFRFTlNJT04sXHJcbiAgICAgICAgU2NoZW1lLkZJUkVGT1hfRVhURU5TSU9OLFxyXG4gICAgICAgIFNjaGVtZS5FREdFX0VYVEVOU0lPTlxyXG4gICAgXTtcclxuICAgIHJldHVybiBleHRlbnNpb25TY2hlbWVzLnNvbWUoKGV4dGVuc2lvblNjaGVtZSkgPT4gY29tcGFyZVN0cmluZ3ModXJsLnByb3RvY29sLCBleHRlbnNpb25TY2hlbWUpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQnJvd3NlclVybCh1cmw6IFVSTCkge1xyXG4gICAgcmV0dXJuIGNvbXBhcmVTdHJpbmdzKHVybC5wcm90b2NvbCwgU2NoZW1lLkNIUk9NRSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVUkxUb1N0cmluZyh1cmw6IE1heWJlPFVSTE9yU3BlYz4pOiBzdHJpbmcge1xyXG4gICAgaWYgKHVybCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodXJsIGluc3RhbmNlb2YgVVJMKSB7XHJcbiAgICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2FmZUVuY29kZVVSSSh1cmk6IE1heWJlPHN0cmluZz4pOiBzdHJpbmcge1xyXG4gICAgaWYgKHVyaSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJKHVyaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzYWZlRW5jb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudDogTWF5YmU8c3RyaW5nPik6IHN0cmluZyB7XHJcbiAgICBpZiAoY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoY29tcG9uZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFzaFVybENvbXBvbmVudHModXJsOiBVUkwsIGNvbXBvbmVudHM6IFVybENvbXBvbmVudCwgc2VlZDogSGFzaCk6IEhhc2gge1xyXG4gICAgZnVuY3Rpb24gY29tcGFyZShjb21wb25lbnQ6IFVybENvbXBvbmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoY29tcG9uZW50cyAmIGNvbXBvbmVudCkgIT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhhc2ggPSBzZWVkO1xyXG4gICAgaWYgKGNvbXBhcmUoVXJsQ29tcG9uZW50LlByb3RvY29sKSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKHVybC5wcm90b2NvbCwgaGFzaCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuVXNlcm5hbWUpKSB7XHJcbiAgICAgICAgaGFzaCA9IG11cm11ckhhc2godXJsLnVzZXJuYW1lLCBoYXNoKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5QYXNzd29yZCkpIHtcclxuICAgICAgICBoYXNoID0gbXVybXVySGFzaCh1cmwucGFzc3dvcmQsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXBhcmUoVXJsQ29tcG9uZW50Lkhvc3QpKSB7XHJcbiAgICAgICAgaGFzaCA9IG11cm11ckhhc2godXJsLmhvc3QsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXBhcmUoVXJsQ29tcG9uZW50LlBvcnQpKSB7XHJcbiAgICAgICAgaGFzaCA9IG11cm11ckhhc2godXJsLnBvcnQsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXBhcmUoVXJsQ29tcG9uZW50LlBhdGhuYW1lKSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKHVybC5wYXRobmFtZSwgaGFzaCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuU2VhcmNoKSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKHVybC5zZWFyY2gsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc2g7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNoVXJsKHVybDogVVJMLCBvcHRpb25zOiBVcmxDb21wYXJlT3B0aW9ucyA9IFVybENvbXBhcmVPcHRpb25zLkRlZmF1bHQsIHNlZWQ6IEhhc2ggPSAwKTogSGFzaCB7XHJcbiAgICBzd2l0Y2ggKG9wdGlvbnMpIHtcclxuICAgICAgICBjYXNlIFVybENvbXBhcmVPcHRpb25zLkRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBoYXNoVXJsQ29tcG9uZW50cyh1cmwsIFVybENvbXBvbmVudC5BbGwsIHNlZWQpO1xyXG4gICAgICAgIGNhc2UgVXJsQ29tcGFyZU9wdGlvbnMuSWdub3JlU2VhcmNoUGFyYW1zOlxyXG4gICAgICAgICAgICByZXR1cm4gaGFzaFVybENvbXBvbmVudHModXJsLCByZW1vdmVDb21wb25lbnQoVXJsQ29tcG9uZW50LkFsbCwgVXJsQ29tcG9uZW50LlNlYXJjaCksIHNlZWQpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaGFzaFVybDogaW52YWxpZCBvcHRpb25zOiAke29wdGlvbnN9YCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlVXJsSGFzaE1hcDxUPihvcHRpb25zOiBVcmxDb21wYXJlT3B0aW9ucyA9IFVybENvbXBhcmVPcHRpb25zLkRlZmF1bHQpIDogSGFzaE1hcDxVUkwsIFQ+IHtcclxuICAgIHJldHVybiBuZXcgSGFzaE1hcDxVUkwsIFQ+KCh1cmwpID0+IGhhc2hVcmwodXJsLCBvcHRpb25zKSwgKGEsIGIpID0+IGlzU2FtZVVybChhLCBiLCBvcHRpb25zKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlVXJsSGFzaFNldChvcHRpb25zOiBVcmxDb21wYXJlT3B0aW9ucyA9IFVybENvbXBhcmVPcHRpb25zLkRlZmF1bHQpIDogSGFzaFNldDxVUkw+IHtcclxuICAgIHJldHVybiBuZXcgSGFzaFNldDxVUkw+KCh1cmwpID0+IGhhc2hVcmwodXJsLCBvcHRpb25zKSwgKGEsIGIpID0+IGlzU2FtZVVybChhLCBiLCBvcHRpb25zKSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3VybC11dGlscy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgbXVybXVySGFzaCB9IGZyb20gXCIuL211cm11ci1oYXNoXCI7XHJcbmltcG9ydCB7IEhhc2hTZXQsIEhhc2hNYXAgfSBmcm9tIFwiLi9oYXNoLW1hcFwiO1xyXG5pbXBvcnQgeyBVUkwsIFVSTFRvU3RyaW5nIH0gZnJvbSBcIi4vdXJsLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgZW51bSBTdHJpbmdDb21wYXJlT3B0aW9ucyB7XHJcbiAgICBDYXNlU2Vuc2l0aXZlLFxyXG4gICAgTG93ZXJDYXNlLFxyXG4gICAgTG9jYWxlTG93ZXJDYXNlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlU3RyaW5ncyhhOiBzdHJpbmcsIGI6IHN0cmluZywgb3B0aW9ucyA9IFN0cmluZ0NvbXBhcmVPcHRpb25zLkNhc2VTZW5zaXRpdmUpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAob3B0aW9ucykge1xyXG4gICAgICAgIGNhc2UgU3RyaW5nQ29tcGFyZU9wdGlvbnMuQ2FzZVNlbnNpdGl2ZTpcclxuICAgICAgICAgICAgcmV0dXJuIGEgPT09IGI7XHJcbiAgICAgICAgY2FzZSBTdHJpbmdDb21wYXJlT3B0aW9ucy5Mb3dlckNhc2U6XHJcbiAgICAgICAgICAgIHJldHVybiBhLnRvTG93ZXJDYXNlKCkgPT09IGIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBjYXNlIFN0cmluZ0NvbXBhcmVPcHRpb25zLkxvY2FsZUxvd2VyQ2FzZTpcclxuICAgICAgICAgICAgcmV0dXJuIGEudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gYi50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3RyaW5nQ29tcGFyZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzaFN0cmluZyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgaGFzaCA9IDA7XHJcbiAgICBoYXNoID0gbXVybXVySGFzaCh2YWx1ZSwgaGFzaCk7XHJcbiAgICByZXR1cm4gaGFzaDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTdHJpbmdIYXNoU2V0KCk6IEhhc2hTZXQ8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hTZXQ8c3RyaW5nPihoYXNoU3RyaW5nLCBjb21wYXJlU3RyaW5ncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlU3RyaW5nSGFzaE1hcDxUPigpOiBIYXNoTWFwPHN0cmluZywgVD4ge1xyXG4gICAgcmV0dXJuIG5ldyBIYXNoTWFwPHN0cmluZywgVD4oaGFzaFN0cmluZywgY29tcGFyZVN0cmluZ3MpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBgJHt2YWx1ZX1cXG5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdXJyb3VuZCh2YWx1ZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nLCBvcGVuVGFnOiBzdHJpbmcsIGNsb3NlVGFnOiBzdHJpbmcsIGluZGVudExldmVsOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGluZGVudDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyA9IG1ha2VJbmRlbnQoaW5kZW50TGV2ZWwgLSAxKTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBgJHtsaW5lKGAke3R5cGVOYW1lfSR7b3BlblRhZ31gKX0ke3ZhbHVlfSR7aW5kZW50KGNsb3NlVGFnKX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBEb24ndCBib3RoZXIgYWRkaW5nIGxpbmVicmVha3MgaWYgdGhlcmUncyBub3RoaW5nIHRvIHN1cnJvdW5kLlxyXG4gICAgICAgIHJldHVybiBgJHt0eXBlTmFtZX0ke29wZW5UYWd9JHtjbG9zZVRhZ31gXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VLZXlWYWx1ZVByaW50ZXIodG9TdHJpbmc6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmcsIGluZGVudDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyk6IChrZXk6IGFueSwgdmFsdWU6IGFueSkgPT4gc3RyaW5nIHtcclxuICAgIHJldHVybiAoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gbGluZShpbmRlbnQoYCR7dG9TdHJpbmcoa2V5KX06ICR7dG9TdHJpbmcodmFsdWUpfSxgKSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBUb1N0cmluZzxLLCBWPihtYXA6IE1hcDxLLCBWPiwgc2Vlbk9iamVjdHM6IFNldDxhbnk+LCBpbmRlbnRMZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGluZGVudDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyA9IG1ha2VJbmRlbnQoaW5kZW50TGV2ZWwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZ1JlY3Vyc2l2ZSh2YWx1ZSwgc2Vlbk9iamVjdHMsIGluZGVudExldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmludEtleVZhbHVlID0gbWFrZUtleVZhbHVlUHJpbnRlcih0b1N0cmluZywgaW5kZW50KTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgIG1hcC5mb3JFYWNoKCh2YWx1ZTogViwga2V5OiBLKSA9PiB7XHJcbiAgICAgICAgcmVzdWx0ICs9IHByaW50S2V5VmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gc3Vycm91bmQocmVzdWx0LCBcIk1hcFwiLCBcIntcIiwgXCJ9XCIsIGluZGVudExldmVsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVZhbHVlUHJpbnRlcih0b1N0cmluZzogKHZhbHVlOiBhbnkpID0+IHN0cmluZywgaW5kZW50OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nKTogKHZhbHVlOiBhbnkpID0+IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gbGluZShpbmRlbnQoYCR7dG9TdHJpbmcodmFsdWUpfSxgKSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRUb1N0cmluZzxLPihzZXQ6IFNldDxLPiwgc2Vlbk9iamVjdHM6IFNldDxhbnk+LCBpbmRlbnRMZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGluZGVudDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyA9IG1ha2VJbmRlbnQoaW5kZW50TGV2ZWwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZ1JlY3Vyc2l2ZSh2YWx1ZSwgc2Vlbk9iamVjdHMsIGluZGVudExldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmludFZhbHVlID0gbWFrZVZhbHVlUHJpbnRlcih0b1N0cmluZywgaW5kZW50KTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgIHNldC5mb3JFYWNoKChrZXk6IEspID0+IHtcclxuICAgICAgICByZXN1bHQgKz0gcHJpbnRWYWx1ZShrZXkpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3Vycm91bmQocmVzdWx0LCBcIlNldFwiLCBcIntcIiwgXCJ9XCIsIGluZGVudExldmVsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJyYXlUb1N0cmluZzxUPihhcnJheTogVFtdLCBzZWVuT2JqZWN0czogU2V0PGFueT4sIGluZGVudExldmVsOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaW5kZW50OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nID0gbWFrZUluZGVudChpbmRlbnRMZXZlbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nUmVjdXJzaXZlKHZhbHVlLCBzZWVuT2JqZWN0cywgaW5kZW50TGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByaW50VmFsdWUgPSBtYWtlVmFsdWVQcmludGVyKHRvU3RyaW5nLCBpbmRlbnQpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgYXJyYXkuZm9yRWFjaCgodmFsdWU6IFQpID0+IHtcclxuICAgICAgICByZXN1bHQgKz0gcHJpbnRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdXJyb3VuZChyZXN1bHQsIFwiQXJyYXlcIiwgXCJbXCIsIFwiXVwiLCBpbmRlbnRMZXZlbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlOiBhbnksIHNlZW5PYmplY3RzOiBTZXQ8YW55PiwgaW5kZW50TGV2ZWw6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBpbmRlbnQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcgPSBtYWtlSW5kZW50KGluZGVudExldmVsKTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdG9TdHJpbmdSZWN1cnNpdmUodmFsdWUsIHNlZW5PYmplY3RzLCBpbmRlbnRMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJpbnRLZXlWYWx1ZSA9IG1ha2VLZXlWYWx1ZVByaW50ZXIodG9TdHJpbmcsIGluZGVudCk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpIHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHZhbHVlW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gcHJpbnRLZXlWYWx1ZShwcm9wZXJ0eU5hbWUsIHByb3BlcnR5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3Vycm91bmQocmVzdWx0LCB0eXBlTmFtZSh2YWx1ZSksIFwie1wiLCBcIn1cIiwgaW5kZW50TGV2ZWwpO1xyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0VG9TdHJpbmdGdW5jdGlvbjogRnVuY3Rpb24gPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgZW1wdHlPYmplY3QgPSB7fTtcclxuICAgIHJldHVybiBlbXB0eU9iamVjdC50b1N0cmluZztcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBkZWZhdWx0VG9TdHJpbmdGdW5jdGlvbi5jYWxsKHZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFzQ3VzdG9tVG9TdHJpbmcodmFsdWU6IGFueSkge1xyXG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nICE9PSBkZWZhdWx0VG9TdHJpbmdGdW5jdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZTogYW55KSB7XHJcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUluZGVudGF0aW9uKGluZGVudExldmVsOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKGluZGVudExldmVsIDw9IDApIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhYiA9IFwiXFx0XCI7XHJcbiAgICBsZXQgaW5kZW50YXRpb24gPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgbGV2ZWwgPSAwOyBsZXZlbCA8IGluZGVudExldmVsOyBsZXZlbCArPSAxKSB7XHJcbiAgICAgICAgaW5kZW50YXRpb24gKz0gdGFiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGVudGF0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlSW5kZW50KGluZGVudExldmVsOiBudW1iZXIpOiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nIHtcclxuICAgIGNvbnN0IGluZGVudGF0aW9uID0gbWFrZUluZGVudGF0aW9uKGluZGVudExldmVsKTtcclxuICAgIHJldHVybiAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiBgJHtpbmRlbnRhdGlvbn0ke3ZhbHVlfWA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0eXBlT2YodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3I7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHR5cGVOYW1lKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHR5cGVPZih2YWx1ZSkubmFtZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9TdHJpbmdSZWN1cnNpdmUodmFsdWU6IGFueSwgc2Vlbk9iamVjdHM6IFNldDxhbnk+LCBpbmRlbnRMZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGZ1bmN0aW9uIGRpZFNlZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZW5PYmplY3RzLmhhcyh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VlT2JqZWN0KHZhbHVlOiBhbnkpOiBTZXQ8YW55PiB7XHJcbiAgICAgICAgc2Vlbk9iamVjdHMuYWRkKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gc2Vlbk9iamVjdHM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV4dEluZGVudExldmVsID0gaW5kZW50TGV2ZWwgKyAxO1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICByZXR1cm4gYXJyYXlUb1N0cmluZyh2YWx1ZSwgc2VlT2JqZWN0KHZhbHVlKSwgbmV4dEluZGVudExldmVsKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgICAgICByZXR1cm4gbWFwVG9TdHJpbmcodmFsdWUsIHNlZU9iamVjdCh2YWx1ZSksIG5leHRJbmRlbnRMZXZlbCk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHNldFRvU3RyaW5nKHZhbHVlLCBzZWVPYmplY3QodmFsdWUpLCBuZXh0SW5kZW50TGV2ZWwpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVSTCkge1xyXG4gICAgICAgIHJldHVybiBVUkxUb1N0cmluZyh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVOYW1lKHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAoZGlkU2VlKHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlTmFtZSh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGhhc0N1c3RvbVRvU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcodmFsdWUsIHNlZU9iamVjdCh2YWx1ZSksIG5leHRJbmRlbnRMZXZlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZTogYW55LCBpbml0aWFsSW5kZW50TGV2ZWwgPSAwKSB7XHJcbiAgICBjb25zdCBzZWVuT2JqZWN0cyA9IG5ldyBTZXQ8YW55PigpO1xyXG4gICAgY29uc3QgaW5kZW50TGV2ZWwgPSBpbml0aWFsSW5kZW50TGV2ZWw7XHJcbiAgICByZXR1cm4gdG9TdHJpbmdSZWN1cnNpdmUodmFsdWUsIHNlZW5PYmplY3RzLCBpbmRlbnRMZXZlbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzYWZlVG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBcIm51bGxcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogYW55KTogdmFsdWUgaXMgc3RyaW5nIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eVN0cmluZyh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vc3RyaW5nLXV0aWxzLnRzIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIGEgZHVwbGV4IHN0cmVhbSBpcyBqdXN0IGEgc3RyZWFtIHRoYXQgaXMgYm90aCByZWFkYWJsZSBhbmQgd3JpdGFibGUuXG4vLyBTaW5jZSBKUyBkb2Vzbid0IGhhdmUgbXVsdGlwbGUgcHJvdG90eXBhbCBpbmhlcml0YW5jZSwgdGhpcyBjbGFzc1xuLy8gcHJvdG90eXBhbGx5IGluaGVyaXRzIGZyb20gUmVhZGFibGUsIGFuZCB0aGVuIHBhcmFzaXRpY2FsbHkgZnJvbVxuLy8gV3JpdGFibGUuXG5cbid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIHByb2Nlc3NOZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MtbmV4dGljay1hcmdzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gIH1yZXR1cm4ga2V5cztcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxubW9kdWxlLmV4cG9ydHMgPSBEdXBsZXg7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIFJlYWRhYmxlID0gcmVxdWlyZSgnLi9fc3RyZWFtX3JlYWRhYmxlJyk7XG52YXIgV3JpdGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fd3JpdGFibGUnKTtcblxudXRpbC5pbmhlcml0cyhEdXBsZXgsIFJlYWRhYmxlKTtcblxudmFyIGtleXMgPSBvYmplY3RLZXlzKFdyaXRhYmxlLnByb3RvdHlwZSk7XG5mb3IgKHZhciB2ID0gMDsgdiA8IGtleXMubGVuZ3RoOyB2KyspIHtcbiAgdmFyIG1ldGhvZCA9IGtleXNbdl07XG4gIGlmICghRHVwbGV4LnByb3RvdHlwZVttZXRob2RdKSBEdXBsZXgucHJvdG90eXBlW21ldGhvZF0gPSBXcml0YWJsZS5wcm90b3R5cGVbbWV0aG9kXTtcbn1cblxuZnVuY3Rpb24gRHVwbGV4KG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIER1cGxleCkpIHJldHVybiBuZXcgRHVwbGV4KG9wdGlvbnMpO1xuXG4gIFJlYWRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIFdyaXRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZWFkYWJsZSA9PT0gZmFsc2UpIHRoaXMucmVhZGFibGUgPSBmYWxzZTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLndyaXRhYmxlID09PSBmYWxzZSkgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIHRoaXMuYWxsb3dIYWxmT3BlbiA9IHRydWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dIYWxmT3BlbiA9PT0gZmFsc2UpIHRoaXMuYWxsb3dIYWxmT3BlbiA9IGZhbHNlO1xuXG4gIHRoaXMub25jZSgnZW5kJywgb25lbmQpO1xufVxuXG4vLyB0aGUgbm8taGFsZi1vcGVuIGVuZm9yY2VyXG5mdW5jdGlvbiBvbmVuZCgpIHtcbiAgLy8gaWYgd2UgYWxsb3cgaGFsZi1vcGVuIHN0YXRlLCBvciBpZiB0aGUgd3JpdGFibGUgc2lkZSBlbmRlZCxcbiAgLy8gdGhlbiB3ZSdyZSBvay5cbiAgaWYgKHRoaXMuYWxsb3dIYWxmT3BlbiB8fCB0aGlzLl93cml0YWJsZVN0YXRlLmVuZGVkKSByZXR1cm47XG5cbiAgLy8gbm8gbW9yZSBkYXRhIGNhbiBiZSB3cml0dGVuLlxuICAvLyBCdXQgYWxsb3cgbW9yZSB3cml0ZXMgdG8gaGFwcGVuIGluIHRoaXMgdGljay5cbiAgcHJvY2Vzc05leHRUaWNrKG9uRW5kTlQsIHRoaXMpO1xufVxuXG5mdW5jdGlvbiBvbkVuZE5UKHNlbGYpIHtcbiAgc2VsZi5lbmQoKTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KER1cGxleC5wcm90b3R5cGUsICdkZXN0cm95ZWQnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fd3JpdGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHZhbHVlIGlmIHRoZSBzdHJlYW1cbiAgICAvLyBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICB9XG59KTtcblxuRHVwbGV4LnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gIHRoaXMucHVzaChudWxsKTtcbiAgdGhpcy5lbmQoKTtcblxuICBwcm9jZXNzTmV4dFRpY2soY2IsIGVycik7XG59O1xuXG5mdW5jdGlvbiBmb3JFYWNoKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX2R1cGxleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgaXNJblJhbmdlIH0gZnJvbSBcIi4vbnVtYmVyLXV0aWxzXCI7XHJcbmltcG9ydCB7IGhhcyB9IGZyb20gXCIuL2FycmF5LXV0aWxzXCI7XHJcblxyXG5leHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XHJcbiAgICBoYW5kc2hha2VWMSxcclxuICAgIGxhdW5jaEJyb3dzZXJSZXF1ZXN0VjEsXHJcbiAgICBsYXVuY2hCcm93c2VyUmVzcG9uc2VWMSxcclxuICAgIHBhZ2VFdmVudFYxLFxyXG4gICAgY29uZmlnUmVxdWVzdFYxLFxyXG4gICAgY29uZmlnQ2hhbmdlZFYxLFxyXG4gICAgdHJ1c3RVcmxWMSxcclxuICAgIGRvd25sb2FkQ29tcGxldGVWMSxcclxuICAgIGxvZ01lc3NhZ2VWMSxcclxuICAgIGFkZFVzZXJUcnVzdGVkT3JpZ2luVjEsXHJcbiAgICBhZGRVc2VyVW50cnVzdGVkT3JpZ2luVjEsXHJcbiAgICBoZWxwZXJFcnJvclYxLFxyXG4gICAgZG9ybWFudFN0YXRlQ2hhbmdlZFYxLFxyXG4gICAgZXh0ZW5zaW9uUmVhZHlWMSxcclxuICAgIGV4dGVybmFsQXBwTGlua1JlcXVlc3RWMSxcclxuICAgIGV4dGVybmFsQXBwTGlua1Jlc3BvbnNlVjEsXHJcbiAgICBpc0ZpbGVVUkxUcnVzdGVkUmVxdWVzdFYxLFxyXG4gICAgaXNGaWxlVVJMVHJ1c3RlZFJlc3BvbnNlVjEsXHJcbiAgICBibG9ja2VkRmlsZVJlcXVlc3RWMSxcclxuICAgIGJsb2NrZWRGaWxlUmVzcG9uc2VWMSxcclxuICAgIHBvcHVwRGF0YVJlcXVlc3RWMSxcclxuICAgIHBvcHVwRGF0YVJlc3BvbnNlVjEsXHJcbiAgICBjbGVhclJlbWVtYmVyZWREZWNpc2lvbnNWMSxcclxuICAgIGJsb2NrZWRQYWdlU3RyaW5nc1JlcXVlc3RWMSxcclxuICAgIGJsb2NrZWRQYWdlU3RyaW5nc1Jlc3BvbnNlVjEsXHJcbiAgICBoZWFydGJlYXRWMSxcclxuICAgIGVuYWJsZWRGZWF0dXJlc1JlcXVlc3RWMixcclxuICAgIGVuYWJsZWRGZWF0dXJlc1Jlc3BvbnNlVjIsXHJcbiAgICBjbGVhclJlbWVtYmVyZWRPcmlnaW5WMyxcclxuICAgIG9wdGlvbnNEYXRhUmVxdWVzdFYzLFxyXG4gICAgb3B0aW9uc0RhdGFSZXNwb25zZVYzLFxyXG4gICAgY29uZmlnQ2hhbmdlZFYzLFxyXG4gICAgcmVwdXRhdGlvbkNoYW5nZWRWMyxcclxuICAgIGNvbmZpZ0NoYW5nZWRWNCxcclxuICAgIGJsb2NrZWRQYWdlRGF0YVJlcXVlc3RWNCxcclxuICAgIGJsb2NrZWRQYWdlRGF0YVJlc3BvbnNlVjQsXHJcbiAgICBjb25maWdDaGFuZ2VkVjUsXHJcbiAgICBwb3B1cERhdGFSZXNwb25zZVY1LFxyXG4gICAgYmxvY2tlZFBhZ2VEYXRhUmVzcG9uc2VWNixcclxuICAgIHRydXN0VXJsVjYsXHJcbiAgICBjb25maWdDaGFuZ2VkVjcsXHJcbiAgICB0cnVzdFVybFY4LFxyXG4gICAgZG9udEFza0FnYWluVjgsXHJcbiAgICBjb25maWdDaGFuZ2VkVjgsXHJcbiAgICBwb3B1cERhdGFSZXNwb25zZVY5LFxyXG4gICAgZG9udEFza0FnYWluVjksXHJcbiAgICBjb25maWdDaGFuZ2VkVjksXHJcbiAgICBzdG9wSGVscGVyVjEwLFxyXG4gICAgZWRnZUFja1YxMCxcclxuICAgIGVuZE9mU3RyZWFtVjEwLFxyXG4gICAgaGVhcnRiZWF0VjEwLFxyXG4gICAgcG9wdXBEYXRhUmVzcG9uc2VWMTEsXHJcbiAgICBjb25maWdDaGFuZ2VkVjExLFxyXG4gICAgY29uZmlnQ2hhbmdlZFYxMixcclxuICAgIG1pbk1lc3NhZ2VUeXBlID0gaGFuZHNoYWtlVjEsXHJcbiAgICBtYXhNZXNzYWdlVHlwZSA9IGNvbmZpZ0NoYW5nZWRWMTJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWVzc2FnZVR5cGUodHlwZTogTWVzc2FnZVR5cGUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc0luUmFuZ2UodHlwZSwgTWVzc2FnZVR5cGUubWluTWVzc2FnZVR5cGUsIE1lc3NhZ2VUeXBlLm1heE1lc3NhZ2VUeXBlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRnJlcXVlbnRseVNlbnRNZXNzYWdlVHlwZSh0eXBlOiBNZXNzYWdlVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZnJlcXVlbnRseVNlbnRNZXNzYWdlVHlwZXMgPSBbXHJcbiAgICAgICAgTWVzc2FnZVR5cGUubG9nTWVzc2FnZVYxLFxyXG4gICAgICAgIE1lc3NhZ2VUeXBlLnBhZ2VFdmVudFYxLFxyXG4gICAgICAgIE1lc3NhZ2VUeXBlLmhlYXJ0YmVhdFYxLFxyXG4gICAgICAgIE1lc3NhZ2VUeXBlLmVkZ2VBY2tWMTBcclxuICAgIF07XHJcbiAgICByZXR1cm4gaGFzKGZyZXF1ZW50bHlTZW50TWVzc2FnZVR5cGVzLCB0eXBlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRWRnZUFja1dvcmthcm91bmQodHlwZTogTWVzc2FnZVR5cGUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlID09PSBNZXNzYWdlVHlwZS5lZGdlQWNrVjEwO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvbWVzc2FnZS10eXBlcy50cyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJnKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IEJ1ZmZlci5pc0J1ZmZlcjtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvY29yZS11dGlsLWlzL2xpYi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTm9uZSwgU29tZSwgTWF5YmUgfSBmcm9tIFwiLi9tYXliZVwiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJblJhbmdlKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSBtaW4pICYmICh2YWx1ZSA8PSBtYXgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IGFueSk6IHZhbHVlIGlzIG51bWJlciB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOdW1iZXIodmFsdWU6IHN0cmluZyk6IE1heWJlPG51bWJlcj4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBiYXNlID0gMTA7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCBiYXNlKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9udW1iZXItdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYWFwcGxlYnkvc21oYXNoZXIvYmxvYi9tYXN0ZXIvc3JjL011cm11ckhhc2gxLmNwcFxyXG4vLyBNdXJtdXJIYXNoIGlzIHJlbGVhc2VkIHVuZGVyIGFuIE1JVCBsaWNlbnNlLlxyXG4vLyBUT0RPIEFja25vbHdlZGdlIHRoZSBsaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgSGFzaCB9IGZyb20gXCIuL2hhc2hcIjtcclxuXHJcbmZ1bmN0aW9uIG11cm11ckhhc2hTdHJpbmcoa2V5OiBzdHJpbmcsIHNlZWQ6IEhhc2gpOiBIYXNoIHtcclxuICAgIGxldCBsZW4gPSBrZXkubGVuZ3RoICogMjtcclxuICAgIGNvbnN0IG0gPSAweGM2YTRhNzkzO1xyXG4gICAgY29uc3QgciA9IDE2O1xyXG4gICAgbGV0IGggPSBzZWVkIF4gKGxlbiAqIG0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyAoaSA8IGtleS5sZW5ndGgpICYmIChsZW4gPj0gNCk7IGkgKz0gMikge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSAoa2V5LmNoYXJDb2RlQXQoaSkgKyAoa2V5LmNoYXJDb2RlQXQoaSArIDEpIDw8IDE2KSk7XHJcbiAgICAgICAgY29uc3QgayA9IGRhdGE7XHJcbiAgICAgICAgaCArPSBrO1xyXG4gICAgICAgIGggKj0gbTtcclxuICAgICAgICBoIF49IChoID4+IDE2KTtcclxuICAgICAgICBsZW4gLT0gNDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGVuID09PSAyKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBrZXkuY2hhckNvZGVBdChrZXkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgaCArPSBkYXRhO1xyXG4gICAgICAgIGggKj0gbTtcclxuICAgICAgICBoIF49IChoID4+IHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGggKj0gbTtcclxuICAgIGggXj0gKGggPj4gMTApO1xyXG4gICAgaCAqPSBtO1xyXG4gICAgaCBePSAoaCA+PiAxNyk7XHJcblxyXG4gICAgcmV0dXJuIGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG11cm11ckhhc2hOdW1iZXIoa2V5OiBudW1iZXIsIHNlZWQ6IEhhc2gpOiBIYXNoIHtcclxuICAgIGxldCBsZW4gPSA0O1xyXG4gICAgY29uc3QgbSA9IDB4YzZhNGE3OTM7XHJcbiAgICBjb25zdCByID0gMTY7XHJcbiAgICBsZXQgaCA9IHNlZWQgXiAobGVuICogbSk7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGtleSAmIDB4ZmZmZmZmZmY7XHJcbiAgICBjb25zdCBrID0gZGF0YTtcclxuICAgIGggKz0gaztcclxuICAgIGggKj0gbTtcclxuICAgIGggXj0gKGggPj4gMTYpO1xyXG5cclxuICAgIGggKj0gbTtcclxuICAgIGggXj0gKGggPj4gMTApO1xyXG4gICAgaCAqPSBtO1xyXG4gICAgaCBePSAoaCA+PiAxNyk7XHJcblxyXG4gICAgcmV0dXJuIGg7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtdXJtdXJIYXNoKGtleTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwgc2VlZDogSGFzaCk6IEhhc2gge1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIG11cm11ckhhc2hTdHJpbmcoa2V5LCBzZWVkKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGtleSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgcmV0dXJuIG11cm11ckhhc2hOdW1iZXIoa2V5ID8gMSA6IDAsIHNlZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbXVybXVySGFzaE51bWJlcihrZXksIHNlZWQpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tdXJtdXItaGFzaC50cyIsIid1c2Ugc3RyaWN0JztcblxuaWYgKCFwcm9jZXNzLnZlcnNpb24gfHxcbiAgICBwcm9jZXNzLnZlcnNpb24uaW5kZXhPZigndjAuJykgPT09IDAgfHxcbiAgICBwcm9jZXNzLnZlcnNpb24uaW5kZXhPZigndjEuJykgPT09IDAgJiYgcHJvY2Vzcy52ZXJzaW9uLmluZGV4T2YoJ3YxLjguJykgIT09IDApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBuZXh0VGljaztcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcHJvY2Vzcy5uZXh0VGljaztcbn1cblxuZnVuY3Rpb24gbmV4dFRpY2soZm4sIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiY2FsbGJhY2tcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGFyZ3MsIGk7XG4gIHN3aXRjaCAobGVuKSB7XG4gIGNhc2UgMDpcbiAgY2FzZSAxOlxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZuKTtcbiAgY2FzZSAyOlxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGlja09uZSgpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSk7XG4gICAgfSk7XG4gIGNhc2UgMzpcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiBhZnRlclRpY2tUd28oKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIGFyZzEsIGFyZzIpO1xuICAgIH0pO1xuICBjYXNlIDQ6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gYWZ0ZXJUaWNrVGhyZWUoKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgIH0pO1xuICBkZWZhdWx0OlxuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhcmdzLmxlbmd0aCkge1xuICAgICAgYXJnc1tpKytdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiBhZnRlclRpY2soKSB7XG4gICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvcHJvY2Vzcy1uZXh0aWNrLWFyZ3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGkgKi9cbnZhciBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKVxudmFyIEJ1ZmZlciA9IGJ1ZmZlci5CdWZmZXJcblxuLy8gYWx0ZXJuYXRpdmUgdG8gdXNpbmcgT2JqZWN0LmtleXMgZm9yIG9sZCBicm93c2Vyc1xuZnVuY3Rpb24gY29weVByb3BzIChzcmMsIGRzdCkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgZHN0W2tleV0gPSBzcmNba2V5XVxuICB9XG59XG5pZiAoQnVmZmVyLmZyb20gJiYgQnVmZmVyLmFsbG9jICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZSAmJiBCdWZmZXIuYWxsb2NVbnNhZmVTbG93KSB7XG4gIG1vZHVsZS5leHBvcnRzID0gYnVmZmVyXG59IGVsc2Uge1xuICAvLyBDb3B5IHByb3BlcnRpZXMgZnJvbSByZXF1aXJlKCdidWZmZXInKVxuICBjb3B5UHJvcHMoYnVmZmVyLCBleHBvcnRzKVxuICBleHBvcnRzLkJ1ZmZlciA9IFNhZmVCdWZmZXJcbn1cblxuZnVuY3Rpb24gU2FmZUJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gQ29weSBzdGF0aWMgbWV0aG9kcyBmcm9tIEJ1ZmZlclxuY29weVByb3BzKEJ1ZmZlciwgU2FmZUJ1ZmZlcilcblxuU2FmZUJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICB2YXIgYnVmID0gQnVmZmVyKHNpemUpXG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgYnVmLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5maWxsKGZpbGwpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGJ1Zi5maWxsKDApXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoc2l6ZSlcbn1cblxuU2FmZUJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlci5TbG93QnVmZmVyKHNpemUpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zYWZlLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBIYXNoIH0gZnJvbSBcIi4vaGFzaFwiO1xyXG5pbXBvcnQgeyBNYXliZSB9IGZyb20gXCIuL21heWJlXCI7XHJcblxyXG5mdW5jdGlvbiBpc1Bvd2VyT2YyKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG1hc2sgPSB2YWx1ZSAtIDE7XHJcbiAgICByZXR1cm4gKHZhbHVlICYgbWFzaykgPT09IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZChuOiBudW1iZXIsIGQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gbiAmIChkIC0gMSk7XHJcbn1cclxuXHJcbnR5cGUgSG9sZSA9IHVuZGVmaW5lZDtcclxudHlwZSBEZWxldGVkID0gbnVsbDtcclxuXHJcbnR5cGUgSGFzaEVsZW1lbnQ8SywgVj4gPSBbSGFzaCwgSywgVl0gfCBEZWxldGVkIHwgSG9sZTtcclxuXHJcbmVudW0gVHJ5UHV0U3RhdHVzIHtcclxuICAgIFZhbHVlSW5zZXJ0ZWQsXHJcbiAgICBWYWx1ZVVwZGF0ZWQsXHJcbiAgICBGYWlsdXJlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRUb0FycmF5PEssIFYsIFU+KGVsZW1lbnRzOiBIYXNoRWxlbWVudDxLLCBWPltdLCBzZWxlY3RvcjogKGVsZW1lbnQ6IFtIYXNoLCBLLCBWXSkgPT4gVSk6IFVbXSB7XHJcbiAgICBjb25zdCBmaWx0ZXJlZEVsZW1lbnRzID0gZWxlbWVudHMuZmlsdGVyKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsO1xyXG4gICAgfSkgYXMgW0hhc2gsIEssIFZdW107XHJcbiAgICBjb25zdCBtYXBwZWRFbGVtZW50cyA9IGZpbHRlcmVkRWxlbWVudHMubWFwKHNlbGVjdG9yKTtcclxuICAgIHJldHVybiBtYXBwZWRFbGVtZW50cztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhc2hNYXA8SywgVj4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBoYXNoOiAoa2V5OiBLKSA9PiBIYXNoLFxyXG4gICAgICAgIHByaXZhdGUgY29tcGFyZTogKGE6IEssIGI6IEspID0+IGJvb2xlYW4sXHJcbiAgICAgICAgaW5pdGlhbENhcGFjaXR5ID0gMCxcclxuICAgICAgICBwcml2YXRlIGZpbGxGYWN0b3IgPSAwLjc1KSB7XHJcbiAgICAgICAgaWYgKGluaXRpYWxDYXBhY2l0eSAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZShpbml0aWFsQ2FwYWNpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3VsZFJlc2l6ZShzaXplOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoc2l6ZSAvIHRoaXMuZWxlbWVudHMubGVuZ3RoKSA+PSB0aGlzLmZpbGxGYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kTmV4dENhcGFjaXR5KCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5sZW5ndGggKiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZEluZGV4KGhhc2g6IEhhc2gsIGVsZW1lbnRzID0gdGhpcy5lbGVtZW50cyk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBtb2QoaGFzaCwgZWxlbWVudHMubGVuZ3RoKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFzaE1hcC5maW5kSW5kZXg6IGluZGV4IDwgMDogJHtpbmRleH0gPCAwYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA+PSBlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIYXNoTWFwLmZpbmRJbmRleDogaW5kZXggPj0gZWxlbWVudHMubGVuZ3RoOiAke2luZGV4fSA+PSAke2VsZW1lbnRzLmxlbmd0aH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tcGFyZUtleXMoaGE6IEhhc2gsIGthOiBLLCBoYjogSGFzaCwga2I6IEspIHtcclxuICAgICAgICByZXR1cm4gKGhhID09PSBoYikgJiYgdGhpcy5jb21wYXJlKGthLCBrYik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cnlQdXQoaGFzaDogSGFzaCwga2V5OiBLLCB2YWx1ZTogViwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGVsZW1lbnRzID0gdGhpcy5lbGVtZW50cyk6IFRyeVB1dFN0YXR1cyB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtjdXJyZW50SGFzaCwgY3VycmVudEtleSwgY3VycmVudFZhbHVlXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlS2V5cyhoYXNoLCBrZXksIGN1cnJlbnRIYXNoLCBjdXJyZW50S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzW2ldID0gW2hhc2gsIGtleSwgdmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUcnlQdXRTdGF0dXMuVmFsdWVVcGRhdGVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNbaV0gPSBbaGFzaCwga2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJ5UHV0U3RhdHVzLlZhbHVlSW5zZXJ0ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRyeVB1dFN0YXR1cy5GYWlsdXJlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzaXplKGNhcGFjaXR5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2FwYWNpdHkgPD0gdGhpcy5lbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIYXNoTWFwLnJlc2l6ZTogY2FwYWNpdHkgPD0gdGhpcy5lbGVtZW50cy5sZW5ndGg6ICR7Y2FwYWNpdHl9IDw9ICR7dGhpcy5lbGVtZW50cy5sZW5ndGh9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYXBhY2l0eSA8PSB0aGlzLnNpemUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIYXNoTWFwLnJlc2l6ZTogY2FwYWNpdHkgPD0gdGhpcy5zaXplOiAke2NhcGFjaXR5fSA8PSAke3RoaXMuc2l6ZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1Bvd2VyT2YyKGNhcGFjaXR5KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhc2hNYXAucmVzaXplOiAhaXNQb3dlck9mMigke2NhcGFjaXR5fSlgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBuZXcgQXJyYXk8SGFzaEVsZW1lbnQ8SywgVj4+KGNhcGFjaXR5KTtcclxuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbaGFzaCwga2V5LCB2YWx1ZV0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbmRJbmRleChoYXNoLCBlbGVtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cnlQdXQoaGFzaCwga2V5LCB2YWx1ZSwgaW5kZXgsIGVsZW1lbnRzLmxlbmd0aCwgZWxlbWVudHMpICE9PSBUcnlQdXRTdGF0dXMuRmFpbHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJ5UHV0KGhhc2gsIGtleSwgdmFsdWUsIDAsIGluZGV4LCBlbGVtZW50cykgIT09IFRyeVB1dFN0YXR1cy5GYWlsdXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhc2hNYXAucmVzaXplOiAhdHJ5UHV0YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhrZXk6IEspOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNIb2xlKGVsZW1lbnQ6IEhhc2hFbGVtZW50PEssIFY+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyeUdldChoYXNoOiBIYXNoLCBrZXk6IEssIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogW2Jvb2xlYW4sIE1heWJlPFY+XSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRIb2xlID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbY3VycmVudEhhc2gsIGN1cnJlbnRLZXksIGN1cnJlbnRWYWx1ZV0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tcGFyZUtleXMoaGFzaCwga2V5LCBjdXJyZW50SGFzaCwgY3VycmVudEtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyFmb3VuZEhvbGUsIGN1cnJlbnRWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0hvbGUoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbZm91bmRIb2xlLCB1bmRlZmluZWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbIWZvdW5kSG9sZSwgdW5kZWZpbmVkXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoa2V5OiBLKTogTWF5YmU8Vj4ge1xyXG4gICAgICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuaGFzaChrZXkpO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgoaGFzaCk7XHJcbiAgICAgICAgbGV0IFtmb3VuZEhvbGUsIHZhbHVlXSA9IHRoaXMudHJ5R2V0KGhhc2gsIGtleSwgaW5kZXgsIHRoaXMuZWxlbWVudHMubGVuZ3RoKTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm91bmRIb2xlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFtmb3VuZEhvbGUsIHZhbHVlXSA9IHRoaXMudHJ5R2V0KGhhc2gsIGtleSwgMCwgaW5kZXgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdXQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZFJlc2l6ZSh0aGlzLnNpemUgKyAxKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSh0aGlzLmZpbmROZXh0Q2FwYWNpdHkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmhhc2goa2V5KTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KGhhc2gpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50cnlQdXQoaGFzaCwga2V5LCB2YWx1ZSwgaW5kZXgsIHRoaXMuZWxlbWVudHMubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBjYXNlIFRyeVB1dFN0YXR1cy5WYWx1ZUluc2VydGVkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplICs9IDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UgVHJ5UHV0U3RhdHVzLlZhbHVlVXBkYXRlZDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnRyeVB1dChoYXNoLCBrZXksIHZhbHVlLCAwLCBpbmRleCkpIHtcclxuICAgICAgICAgICAgY2FzZSBUcnlQdXRTdGF0dXMuVmFsdWVJbnNlcnRlZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIFRyeVB1dFN0YXR1cy5WYWx1ZVVwZGF0ZWQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSGFzaE1hcC5wdXQ6ICF0cnlQdXQnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdXRNYW55KGtleVZhbHVlczogSXRlcmFibGU8W0ssIFZdPik6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGtleVZhbHVlcykge1xyXG4gICAgICAgICAgICB0aGlzLnB1dChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cnlSZW1vdmUoaGFzaDogSGFzaCwga2V5OiBLLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IFtib29sZWFuLCBib29sZWFuXSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRIb2xlID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCByZW1vdmVkID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbY3VycmVudEhhc2gsIGN1cnJlbnRLZXksIGN1cnJlbnRWYWx1ZV0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tcGFyZUtleXMoaGFzaCwga2V5LCBjdXJyZW50SGFzaCwgY3VycmVudEtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyFmb3VuZEhvbGUsIHJlbW92ZWRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNIb2xlKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2ZvdW5kSG9sZSwgIXJlbW92ZWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbIWZvdW5kSG9sZSwgIXJlbW92ZWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZShrZXk6IEspOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoKGtleSk7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbmRJbmRleChoYXNoKTtcclxuICAgICAgICBsZXQgW2ZvdW5kSG9sZSwgcmVtb3ZlZF0gPSB0aGlzLnRyeVJlbW92ZShoYXNoLCBrZXksIGluZGV4LCB0aGlzLmVsZW1lbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHJlbW92ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplIC09IDE7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm91bmRIb2xlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgW2ZvdW5kSG9sZSwgcmVtb3ZlZF0gPSB0aGlzLnRyeVJlbW92ZShoYXNoLCBrZXksIDAsIGluZGV4KTtcclxuICAgICAgICBpZiAocmVtb3ZlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpemUgLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eSgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0b0FycmF5KCk6IFtLLCBWXVtdIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RLZXlWYWx1ZTogKGVsZW1lbnQ6IFtIYXNoLCBLLCBWXSkgPT4gW0ssIFZdID0gKFtoYXNoLCBrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRUb0FycmF5KHRoaXMuZWxlbWVudHMsIHNlbGVjdEtleVZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtoYXNoLCBrZXksIHZhbHVlXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSA9IDA7XHJcbiAgICBlbGVtZW50czogSGFzaEVsZW1lbnQ8SywgVj5bXSA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFzaFNldDxLPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBoYXNoOiAoa2V5OiBLKSA9PiBIYXNoLFxyXG4gICAgICAgIGNvbXBhcmU6IChhOiBLLCBiOiBLKSA9PiBib29sZWFuLFxyXG4gICAgICAgIGluaXRpYWxDYXBhY2l0eSA9IDAsXHJcbiAgICAgICAgZmlsbEZhY3RvciA9IDAuNzUpIHtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBIYXNoTWFwPEssIEs+KGhhc2gsIGNvbXBhcmUsIGluaXRpYWxDYXBhY2l0eSwgZmlsbEZhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRNYW55KGtleXM6IEl0ZXJhYmxlPEs+KTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbktleXNBZGRlZCA9IDA7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hZGQoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbktleXNBZGRlZCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuS2V5c0FkZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChrZXk6IEspOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBzaXplQmVmb3JlID0gdGhpcy5tYXAuc2l6ZTtcclxuICAgICAgICB0aGlzLm1hcC5wdXQoa2V5LCBrZXkpO1xyXG4gICAgICAgIGNvbnN0IHNpemVBZnRlciA9IHRoaXMubWFwLnNpemU7XHJcbiAgICAgICAgcmV0dXJuIChzaXplQWZ0ZXIgLSBzaXplQmVmb3JlKSA9PT0gMTtcclxuICAgIH1cclxuXHJcbiAgICBoYXMoa2V5OiBLKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZShrZXk6IEspOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAucmVtb3ZlKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaXNFbXB0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvQXJyYXkoKTogS1tdIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RLZXk6IChlbGVtZW50OiBbSGFzaCwgSywgS10pID0+IEsgPSAoW2hhc2gsIGtleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY29udmVydFRvQXJyYXkodGhpcy5tYXAuZWxlbWVudHMsIHNlbGVjdEtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLm1hcC5lbGVtZW50cykge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtoYXNoLCBrZXksIHZhbHVlXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBrZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYXA6IEhhc2hNYXA8SywgSz47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGFzaGFibGU8Sz4ge1xyXG4gICAgaGFzaFdpdGhTZWVkKHNlZWQ6IEhhc2gpOiBIYXNoO1xyXG4gICAgaGFzaCgpOiBIYXNoO1xyXG4gICAgY29tcGFyZShvdGhlcjogSyk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRIYXNoPEs+KGluc3RhbmNlOiBIYXNoYWJsZTxLPikge1xyXG4gICAgcmV0dXJuIGluc3RhbmNlLmhhc2goKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmU8SyBleHRlbmRzIEhhc2hhYmxlPEs+PihhOiBLLCBiOiBLKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gYS5jb21wYXJlKGIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZURlZmF1bHRIYXNoTWFwPEsgZXh0ZW5kcyBIYXNoYWJsZTxLPiwgVj4oKSB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hNYXA8SywgVj4oZGVmYXVsdEhhc2gsIGRlZmF1bHRDb21wYXJlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VEZWZhdWx0SGFzaFNldDxLIGV4dGVuZHMgSGFzaGFibGU8Sz4+KCkge1xyXG4gICAgcmV0dXJuIG5ldyBIYXNoU2V0PEs+KGRlZmF1bHRIYXNoLCBkZWZhdWx0Q29tcGFyZSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2hhc2gtbWFwLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBjdXJyZW50RGF0ZVRpbWVTdHJpbmcgfSBmcm9tIFwiLi9kYXRlLXV0aWxzXCI7XHJcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSBcIi4vc3RyaW5nLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMb2dTaW5rIHtcclxuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgbG9nRXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ1NpbmsgaW1wbGVtZW50cyBJTG9nU2luayB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ0Vycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExvZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFkZFNpbmsobmV3IENvbnNvbGVMb2dTaW5rKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFNpbmsoc2luazogSUxvZ1NpbmspIHtcclxuICAgICAgICB0aGlzLnNpbmtzLnB1c2goc2luayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb3JtYXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke2N1cnJlbnREYXRlVGltZVN0cmluZygpfTogJHttZXNzYWdlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE1lc3NhZ2UgPSB0aGlzLmZvcm1hdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBzaW5rIG9mIHRoaXMuc2lua3MpIHtcclxuICAgICAgICAgICAgc2luay5sb2coZm9ybWF0dGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ0Vycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvclRvU3RyaW5nKGVycm9yKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRNZXNzYWdlID0gdGhpcy5mb3JtYXRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc2luayBvZiB0aGlzLnNpbmtzKSB7XHJcbiAgICAgICAgICAgIHNpbmsubG9nRXJyb3IoZm9ybWF0dGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2lua3M6IElMb2dTaW5rW10gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlcnJvclRvU3RyaW5nKGVycm9yOiBFcnJvcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdG9TdHJpbmcoeyBuYW1lOiBlcnJvci5uYW1lLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbG9nZ2VyLmxvZyhtZXNzYWdlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZ0Vycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgbG9nZ2VyLmxvZ0Vycm9yKGVycm9yKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbG9nLnRzIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9yZWFkYWJsZS5qcycpO1xuZXhwb3J0cy5TdHJlYW0gPSBleHBvcnRzO1xuZXhwb3J0cy5SZWFkYWJsZSA9IGV4cG9ydHM7XG5leHBvcnRzLldyaXRhYmxlID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV93cml0YWJsZS5qcycpO1xuZXhwb3J0cy5EdXBsZXggPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX2R1cGxleC5qcycpO1xuZXhwb3J0cy5UcmFuc2Zvcm0gPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3RyYW5zZm9ybS5qcycpO1xuZXhwb3J0cy5QYXNzVGhyb3VnaCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUtYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIEEgYml0IHNpbXBsZXIgdGhhbiByZWFkYWJsZSBzdHJlYW1zLlxuLy8gSW1wbGVtZW50IGFuIGFzeW5jIC5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYiksIGFuZCBpdCdsbCBoYW5kbGUgYWxsXG4vLyB0aGUgZHJhaW4gZXZlbnQgZW1pc3Npb24gYW5kIGJ1ZmZlcmluZy5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcHJvY2Vzc05leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdyaXRhYmxlO1xuXG4vKiA8cmVwbGFjZW1lbnQ+ICovXG5mdW5jdGlvbiBXcml0ZVJlcShjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRoaXMuY2h1bmsgPSBjaHVuaztcbiAgdGhpcy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICB0aGlzLmNhbGxiYWNrID0gY2I7XG4gIHRoaXMubmV4dCA9IG51bGw7XG59XG5cbi8vIEl0IHNlZW1zIGEgbGlua2VkIGxpc3QgYnV0IGl0IGlzIG5vdFxuLy8gdGhlcmUgd2lsbCBiZSBvbmx5IDIgb2YgdGhlc2UgZm9yIGVhY2ggc3RyZWFtXG5mdW5jdGlvbiBDb3JrZWRSZXF1ZXN0KHN0YXRlKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgdGhpcy5lbnRyeSA9IG51bGw7XG4gIHRoaXMuZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgIG9uQ29ya2VkRmluaXNoKF90aGlzLCBzdGF0ZSk7XG4gIH07XG59XG4vKiA8L3JlcGxhY2VtZW50PiAqL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGFzeW5jV3JpdGUgPSAhcHJvY2Vzcy5icm93c2VyICYmIFsndjAuMTAnLCAndjAuOS4nXS5pbmRleE9mKHByb2Nlc3MudmVyc2lvbi5zbGljZSgwLCA1KSkgPiAtMSA/IHNldEltbWVkaWF0ZSA6IHByb2Nlc3NOZXh0VGljaztcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIER1cGxleDtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5Xcml0YWJsZS5Xcml0YWJsZVN0YXRlID0gV3JpdGFibGVTdGF0ZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGludGVybmFsVXRpbCA9IHtcbiAgZGVwcmVjYXRlOiByZXF1aXJlKCd1dGlsLWRlcHJlY2F0ZScpXG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgU3RyZWFtID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgT3VyVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5IHx8IGZ1bmN0aW9uICgpIHt9O1xuZnVuY3Rpb24gX3VpbnQ4QXJyYXlUb0J1ZmZlcihjaHVuaykge1xuICByZXR1cm4gQnVmZmVyLmZyb20oY2h1bmspO1xufVxuZnVuY3Rpb24gX2lzVWludDhBcnJheShvYmopIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IG9iaiBpbnN0YW5jZW9mIE91clVpbnQ4QXJyYXk7XG59XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIGRlc3Ryb3lJbXBsID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3knKTtcblxudXRpbC5pbmhlcml0cyhXcml0YWJsZSwgU3RyZWFtKTtcblxuZnVuY3Rpb24gbm9wKCkge31cblxuZnVuY3Rpb24gV3JpdGFibGVTdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBvYmplY3Qgc3RyZWFtIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciBvciBub3QgdGhpcyBzdHJlYW1cbiAgLy8gY29udGFpbnMgYnVmZmVycyBvciBvYmplY3RzLlxuICB0aGlzLm9iamVjdE1vZGUgPSAhIW9wdGlvbnMub2JqZWN0TW9kZTtcblxuICBpZiAoc3RyZWFtIGluc3RhbmNlb2YgRHVwbGV4KSB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLndyaXRhYmxlT2JqZWN0TW9kZTtcblxuICAvLyB0aGUgcG9pbnQgYXQgd2hpY2ggd3JpdGUoKSBzdGFydHMgcmV0dXJuaW5nIGZhbHNlXG4gIC8vIE5vdGU6IDAgaXMgYSB2YWxpZCB2YWx1ZSwgbWVhbnMgdGhhdCB3ZSBhbHdheXMgcmV0dXJuIGZhbHNlIGlmXG4gIC8vIHRoZSBlbnRpcmUgYnVmZmVyIGlzIG5vdCBmbHVzaGVkIGltbWVkaWF0ZWx5IG9uIHdyaXRlKClcbiAgdmFyIGh3bSA9IG9wdGlvbnMuaGlnaFdhdGVyTWFyaztcbiAgdmFyIGRlZmF1bHRId20gPSB0aGlzLm9iamVjdE1vZGUgPyAxNiA6IDE2ICogMTAyNDtcbiAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gaHdtIHx8IGh3bSA9PT0gMCA/IGh3bSA6IGRlZmF1bHRId207XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBNYXRoLmZsb29yKHRoaXMuaGlnaFdhdGVyTWFyayk7XG5cbiAgLy8gaWYgX2ZpbmFsIGhhcyBiZWVuIGNhbGxlZFxuICB0aGlzLmZpbmFsQ2FsbGVkID0gZmFsc2U7XG5cbiAgLy8gZHJhaW4gZXZlbnQgZmxhZy5cbiAgdGhpcy5uZWVkRHJhaW4gPSBmYWxzZTtcbiAgLy8gYXQgdGhlIHN0YXJ0IG9mIGNhbGxpbmcgZW5kKClcbiAgdGhpcy5lbmRpbmcgPSBmYWxzZTtcbiAgLy8gd2hlbiBlbmQoKSBoYXMgYmVlbiBjYWxsZWQsIGFuZCByZXR1cm5lZFxuICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gIC8vIHdoZW4gJ2ZpbmlzaCcgaXMgZW1pdHRlZFxuICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gaGFzIGl0IGJlZW4gZGVzdHJveWVkXG4gIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgLy8gc2hvdWxkIHdlIGRlY29kZSBzdHJpbmdzIGludG8gYnVmZmVycyBiZWZvcmUgcGFzc2luZyB0byBfd3JpdGU/XG4gIC8vIHRoaXMgaXMgaGVyZSBzbyB0aGF0IHNvbWUgbm9kZS1jb3JlIHN0cmVhbXMgY2FuIG9wdGltaXplIHN0cmluZ1xuICAvLyBoYW5kbGluZyBhdCBhIGxvd2VyIGxldmVsLlxuICB2YXIgbm9EZWNvZGUgPSBvcHRpb25zLmRlY29kZVN0cmluZ3MgPT09IGZhbHNlO1xuICB0aGlzLmRlY29kZVN0cmluZ3MgPSAhbm9EZWNvZGU7XG5cbiAgLy8gQ3J5cHRvIGlzIGtpbmQgb2Ygb2xkIGFuZCBjcnVzdHkuICBIaXN0b3JpY2FsbHksIGl0cyBkZWZhdWx0IHN0cmluZ1xuICAvLyBlbmNvZGluZyBpcyAnYmluYXJ5JyBzbyB3ZSBoYXZlIHRvIG1ha2UgdGhpcyBjb25maWd1cmFibGUuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgdW5pdmVyc2UgdXNlcyAndXRmOCcsIHRob3VnaC5cbiAgdGhpcy5kZWZhdWx0RW5jb2RpbmcgPSBvcHRpb25zLmRlZmF1bHRFbmNvZGluZyB8fCAndXRmOCc7XG5cbiAgLy8gbm90IGFuIGFjdHVhbCBidWZmZXIgd2Uga2VlcCB0cmFjayBvZiwgYnV0IGEgbWVhc3VyZW1lbnRcbiAgLy8gb2YgaG93IG11Y2ggd2UncmUgd2FpdGluZyB0byBnZXQgcHVzaGVkIHRvIHNvbWUgdW5kZXJseWluZ1xuICAvLyBzb2NrZXQgb3IgZmlsZS5cbiAgdGhpcy5sZW5ndGggPSAwO1xuXG4gIC8vIGEgZmxhZyB0byBzZWUgd2hlbiB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGEgd3JpdGUuXG4gIHRoaXMud3JpdGluZyA9IGZhbHNlO1xuXG4gIC8vIHdoZW4gdHJ1ZSBhbGwgd3JpdGVzIHdpbGwgYmUgYnVmZmVyZWQgdW50aWwgLnVuY29yaygpIGNhbGxcbiAgdGhpcy5jb3JrZWQgPSAwO1xuXG4gIC8vIGEgZmxhZyB0byBiZSBhYmxlIHRvIHRlbGwgaWYgdGhlIG9ud3JpdGUgY2IgaXMgY2FsbGVkIGltbWVkaWF0ZWx5LFxuICAvLyBvciBvbiBhIGxhdGVyIHRpY2suICBXZSBzZXQgdGhpcyB0byB0cnVlIGF0IGZpcnN0LCBiZWNhdXNlIGFueVxuICAvLyBhY3Rpb25zIHRoYXQgc2hvdWxkbid0IGhhcHBlbiB1bnRpbCBcImxhdGVyXCIgc2hvdWxkIGdlbmVyYWxseSBhbHNvXG4gIC8vIG5vdCBoYXBwZW4gYmVmb3JlIHRoZSBmaXJzdCB3cml0ZSBjYWxsLlxuICB0aGlzLnN5bmMgPSB0cnVlO1xuXG4gIC8vIGEgZmxhZyB0byBrbm93IGlmIHdlJ3JlIHByb2Nlc3NpbmcgcHJldmlvdXNseSBidWZmZXJlZCBpdGVtcywgd2hpY2hcbiAgLy8gbWF5IGNhbGwgdGhlIF93cml0ZSgpIGNhbGxiYWNrIGluIHRoZSBzYW1lIHRpY2ssIHNvIHRoYXQgd2UgZG9uJ3RcbiAgLy8gZW5kIHVwIGluIGFuIG92ZXJsYXBwZWQgb253cml0ZSBzaXR1YXRpb24uXG4gIHRoaXMuYnVmZmVyUHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4gIC8vIHRoZSBjYWxsYmFjayB0aGF0J3MgcGFzc2VkIHRvIF93cml0ZShjaHVuayxjYilcbiAgdGhpcy5vbndyaXRlID0gZnVuY3Rpb24gKGVyKSB7XG4gICAgb253cml0ZShzdHJlYW0sIGVyKTtcbiAgfTtcblxuICAvLyB0aGUgY2FsbGJhY2sgdGhhdCB0aGUgdXNlciBzdXBwbGllcyB0byB3cml0ZShjaHVuayxlbmNvZGluZyxjYilcbiAgdGhpcy53cml0ZWNiID0gbnVsbDtcblxuICAvLyB0aGUgYW1vdW50IHRoYXQgaXMgYmVpbmcgd3JpdHRlbiB3aGVuIF93cml0ZSBpcyBjYWxsZWQuXG4gIHRoaXMud3JpdGVsZW4gPSAwO1xuXG4gIHRoaXMuYnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgdGhpcy5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcblxuICAvLyBudW1iZXIgb2YgcGVuZGluZyB1c2VyLXN1cHBsaWVkIHdyaXRlIGNhbGxiYWNrc1xuICAvLyB0aGlzIG11c3QgYmUgMCBiZWZvcmUgJ2ZpbmlzaCcgY2FuIGJlIGVtaXR0ZWRcbiAgdGhpcy5wZW5kaW5nY2IgPSAwO1xuXG4gIC8vIGVtaXQgcHJlZmluaXNoIGlmIHRoZSBvbmx5IHRoaW5nIHdlJ3JlIHdhaXRpbmcgZm9yIGlzIF93cml0ZSBjYnNcbiAgLy8gVGhpcyBpcyByZWxldmFudCBmb3Igc3luY2hyb25vdXMgVHJhbnNmb3JtIHN0cmVhbXNcbiAgdGhpcy5wcmVmaW5pc2hlZCA9IGZhbHNlO1xuXG4gIC8vIFRydWUgaWYgdGhlIGVycm9yIHdhcyBhbHJlYWR5IGVtaXR0ZWQgYW5kIHNob3VsZCBub3QgYmUgdGhyb3duIGFnYWluXG4gIHRoaXMuZXJyb3JFbWl0dGVkID0gZmFsc2U7XG5cbiAgLy8gY291bnQgYnVmZmVyZWQgcmVxdWVzdHNcbiAgdGhpcy5idWZmZXJlZFJlcXVlc3RDb3VudCA9IDA7XG5cbiAgLy8gYWxsb2NhdGUgdGhlIGZpcnN0IENvcmtlZFJlcXVlc3QsIHRoZXJlIGlzIGFsd2F5c1xuICAvLyBvbmUgYWxsb2NhdGVkIGFuZCBmcmVlIHRvIHVzZSwgYW5kIHdlIG1haW50YWluIGF0IG1vc3QgdHdvXG4gIHRoaXMuY29ya2VkUmVxdWVzdHNGcmVlID0gbmV3IENvcmtlZFJlcXVlc3QodGhpcyk7XG59XG5cbldyaXRhYmxlU3RhdGUucHJvdG90eXBlLmdldEJ1ZmZlciA9IGZ1bmN0aW9uIGdldEJ1ZmZlcigpIHtcbiAgdmFyIGN1cnJlbnQgPSB0aGlzLmJ1ZmZlcmVkUmVxdWVzdDtcbiAgdmFyIG91dCA9IFtdO1xuICB3aGlsZSAoY3VycmVudCkge1xuICAgIG91dC5wdXNoKGN1cnJlbnQpO1xuICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn07XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RhdGUucHJvdG90eXBlLCAnYnVmZmVyJywge1xuICAgICAgZ2V0OiBpbnRlcm5hbFV0aWwuZGVwcmVjYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVyKCk7XG4gICAgICB9LCAnX3dyaXRhYmxlU3RhdGUuYnVmZmVyIGlzIGRlcHJlY2F0ZWQuIFVzZSBfd3JpdGFibGVTdGF0ZS5nZXRCdWZmZXIgJyArICdpbnN0ZWFkLicsICdERVAwMDAzJylcbiAgICB9KTtcbiAgfSBjYXRjaCAoXykge31cbn0pKCk7XG5cbi8vIFRlc3QgX3dyaXRhYmxlU3RhdGUgZm9yIGluaGVyaXRhbmNlIHRvIGFjY291bnQgZm9yIER1cGxleCBzdHJlYW1zLFxuLy8gd2hvc2UgcHJvdG90eXBlIGNoYWluIG9ubHkgcG9pbnRzIHRvIFJlYWRhYmxlLlxudmFyIHJlYWxIYXNJbnN0YW5jZTtcbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5oYXNJbnN0YW5jZSAmJiB0eXBlb2YgRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgcmVhbEhhc0luc3RhbmNlID0gRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZSwgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIGlmIChyZWFsSGFzSW5zdGFuY2UuY2FsbCh0aGlzLCBvYmplY3QpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgcmV0dXJuIG9iamVjdCAmJiBvYmplY3QuX3dyaXRhYmxlU3RhdGUgaW5zdGFuY2VvZiBXcml0YWJsZVN0YXRlO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICByZWFsSGFzSW5zdGFuY2UgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIHRoaXM7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlKG9wdGlvbnMpIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICAvLyBXcml0YWJsZSBjdG9yIGlzIGFwcGxpZWQgdG8gRHVwbGV4ZXMsIHRvby5cbiAgLy8gYHJlYWxIYXNJbnN0YW5jZWAgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgdXNpbmcgcGxhaW4gYGluc3RhbmNlb2ZgXG4gIC8vIHdvdWxkIHJldHVybiBmYWxzZSwgYXMgbm8gYF93cml0YWJsZVN0YXRlYCBwcm9wZXJ0eSBpcyBhdHRhY2hlZC5cblxuICAvLyBUcnlpbmcgdG8gdXNlIHRoZSBjdXN0b20gYGluc3RhbmNlb2ZgIGZvciBXcml0YWJsZSBoZXJlIHdpbGwgYWxzbyBicmVhayB0aGVcbiAgLy8gTm9kZS5qcyBMYXp5VHJhbnNmb3JtIGltcGxlbWVudGF0aW9uLCB3aGljaCBoYXMgYSBub24tdHJpdmlhbCBnZXR0ZXIgZm9yXG4gIC8vIGBfd3JpdGFibGVTdGF0ZWAgdGhhdCB3b3VsZCBsZWFkIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgaWYgKCFyZWFsSGFzSW5zdGFuY2UuY2FsbChXcml0YWJsZSwgdGhpcykgJiYgISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkge1xuICAgIHJldHVybiBuZXcgV3JpdGFibGUob3B0aW9ucyk7XG4gIH1cblxuICB0aGlzLl93cml0YWJsZVN0YXRlID0gbmV3IFdyaXRhYmxlU3RhdGUob3B0aW9ucywgdGhpcyk7XG5cbiAgLy8gbGVnYWN5LlxuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy53cml0ZSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fd3JpdGUgPSBvcHRpb25zLndyaXRlO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLndyaXRldiA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fd3JpdGV2ID0gb3B0aW9ucy53cml0ZXY7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZGVzdHJveSA9IG9wdGlvbnMuZGVzdHJveTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maW5hbCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmluYWwgPSBvcHRpb25zLmZpbmFsO1xuICB9XG5cbiAgU3RyZWFtLmNhbGwodGhpcyk7XG59XG5cbi8vIE90aGVyd2lzZSBwZW9wbGUgY2FuIHBpcGUgV3JpdGFibGUgc3RyZWFtcywgd2hpY2ggaXMganVzdCB3cm9uZy5cbldyaXRhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdDYW5ub3QgcGlwZSwgbm90IHJlYWRhYmxlJykpO1xufTtcblxuZnVuY3Rpb24gd3JpdGVBZnRlckVuZChzdHJlYW0sIGNiKSB7XG4gIHZhciBlciA9IG5ldyBFcnJvcignd3JpdGUgYWZ0ZXIgZW5kJyk7XG4gIC8vIFRPRE86IGRlZmVyIGVycm9yIGV2ZW50cyBjb25zaXN0ZW50bHkgZXZlcnl3aGVyZSwgbm90IGp1c3QgdGhlIGNiXG4gIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgcHJvY2Vzc05leHRUaWNrKGNiLCBlcik7XG59XG5cbi8vIENoZWNrcyB0aGF0IGEgdXNlci1zdXBwbGllZCBjaHVuayBpcyB2YWxpZCwgZXNwZWNpYWxseSBmb3IgdGhlIHBhcnRpY3VsYXJcbi8vIG1vZGUgdGhlIHN0cmVhbSBpcyBpbi4gQ3VycmVudGx5IHRoaXMgbWVhbnMgdGhhdCBgbnVsbGAgaXMgbmV2ZXIgYWNjZXB0ZWRcbi8vIGFuZCB1bmRlZmluZWQvbm9uLXN0cmluZyB2YWx1ZXMgYXJlIG9ubHkgYWxsb3dlZCBpbiBvYmplY3QgbW9kZS5cbmZ1bmN0aW9uIHZhbGlkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGNiKSB7XG4gIHZhciB2YWxpZCA9IHRydWU7XG4gIHZhciBlciA9IGZhbHNlO1xuXG4gIGlmIChjaHVuayA9PT0gbnVsbCkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignTWF5IG5vdCB3cml0ZSBudWxsIHZhbHVlcyB0byBzdHJlYW0nKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2h1bmsgIT09ICdzdHJpbmcnICYmIGNodW5rICE9PSB1bmRlZmluZWQgJiYgIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBlciA9IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbm9uLXN0cmluZy9idWZmZXIgY2h1bmsnKTtcbiAgfVxuICBpZiAoZXIpIHtcbiAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gICAgcHJvY2Vzc05leHRUaWNrKGNiLCBlcik7XG4gICAgdmFsaWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsaWQ7XG59XG5cbldyaXRhYmxlLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3dyaXRhYmxlU3RhdGU7XG4gIHZhciByZXQgPSBmYWxzZTtcbiAgdmFyIGlzQnVmID0gX2lzVWludDhBcnJheShjaHVuaykgJiYgIXN0YXRlLm9iamVjdE1vZGU7XG5cbiAgaWYgKGlzQnVmICYmICFCdWZmZXIuaXNCdWZmZXIoY2h1bmspKSB7XG4gICAgY2h1bmsgPSBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIGlmIChpc0J1ZikgZW5jb2RpbmcgPSAnYnVmZmVyJztlbHNlIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuXG4gIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIGNiID0gbm9wO1xuXG4gIGlmIChzdGF0ZS5lbmRlZCkgd3JpdGVBZnRlckVuZCh0aGlzLCBjYik7ZWxzZSBpZiAoaXNCdWYgfHwgdmFsaWRDaHVuayh0aGlzLCBzdGF0ZSwgY2h1bmssIGNiKSkge1xuICAgIHN0YXRlLnBlbmRpbmdjYisrO1xuICAgIHJldCA9IHdyaXRlT3JCdWZmZXIodGhpcywgc3RhdGUsIGlzQnVmLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuY29yayA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBzdGF0ZS5jb3JrZWQrKztcbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS51bmNvcmsgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3dyaXRhYmxlU3RhdGU7XG5cbiAgaWYgKHN0YXRlLmNvcmtlZCkge1xuICAgIHN0YXRlLmNvcmtlZC0tO1xuXG4gICAgaWYgKCFzdGF0ZS53cml0aW5nICYmICFzdGF0ZS5jb3JrZWQgJiYgIXN0YXRlLmZpbmlzaGVkICYmICFzdGF0ZS5idWZmZXJQcm9jZXNzaW5nICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCkgY2xlYXJCdWZmZXIodGhpcywgc3RhdGUpO1xuICB9XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuc2V0RGVmYXVsdEVuY29kaW5nID0gZnVuY3Rpb24gc2V0RGVmYXVsdEVuY29kaW5nKGVuY29kaW5nKSB7XG4gIC8vIG5vZGU6OlBhcnNlRW5jb2RpbmcoKSByZXF1aXJlcyBsb3dlciBjYXNlLlxuICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJykgZW5jb2RpbmcgPSBlbmNvZGluZy50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIShbJ2hleCcsICd1dGY4JywgJ3V0Zi04JywgJ2FzY2lpJywgJ2JpbmFyeScsICdiYXNlNjQnLCAndWNzMicsICd1Y3MtMicsICd1dGYxNmxlJywgJ3V0Zi0xNmxlJywgJ3JhdyddLmluZGV4T2YoKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKCkpID4gLTEpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xuICB0aGlzLl93cml0YWJsZVN0YXRlLmRlZmF1bHRFbmNvZGluZyA9IGVuY29kaW5nO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGRlY29kZUNodW5rKHN0YXRlLCBjaHVuaywgZW5jb2RpbmcpIHtcbiAgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmIHN0YXRlLmRlY29kZVN0cmluZ3MgIT09IGZhbHNlICYmIHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcbiAgICBjaHVuayA9IEJ1ZmZlci5mcm9tKGNodW5rLCBlbmNvZGluZyk7XG4gIH1cbiAgcmV0dXJuIGNodW5rO1xufVxuXG4vLyBpZiB3ZSdyZSBhbHJlYWR5IHdyaXRpbmcgc29tZXRoaW5nLCB0aGVuIGp1c3QgcHV0IHRoaXNcbi8vIGluIHRoZSBxdWV1ZSwgYW5kIHdhaXQgb3VyIHR1cm4uICBPdGhlcndpc2UsIGNhbGwgX3dyaXRlXG4vLyBJZiB3ZSByZXR1cm4gZmFsc2UsIHRoZW4gd2UgbmVlZCBhIGRyYWluIGV2ZW50LCBzbyBzZXQgdGhhdCBmbGFnLlxuZnVuY3Rpb24gd3JpdGVPckJ1ZmZlcihzdHJlYW0sIHN0YXRlLCBpc0J1ZiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBpZiAoIWlzQnVmKSB7XG4gICAgdmFyIG5ld0NodW5rID0gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZyk7XG4gICAgaWYgKGNodW5rICE9PSBuZXdDaHVuaykge1xuICAgICAgaXNCdWYgPSB0cnVlO1xuICAgICAgZW5jb2RpbmcgPSAnYnVmZmVyJztcbiAgICAgIGNodW5rID0gbmV3Q2h1bms7XG4gICAgfVxuICB9XG4gIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcblxuICBzdGF0ZS5sZW5ndGggKz0gbGVuO1xuXG4gIHZhciByZXQgPSBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrO1xuICAvLyB3ZSBtdXN0IGVuc3VyZSB0aGF0IHByZXZpb3VzIG5lZWREcmFpbiB3aWxsIG5vdCBiZSByZXNldCB0byBmYWxzZS5cbiAgaWYgKCFyZXQpIHN0YXRlLm5lZWREcmFpbiA9IHRydWU7XG5cbiAgaWYgKHN0YXRlLndyaXRpbmcgfHwgc3RhdGUuY29ya2VkKSB7XG4gICAgdmFyIGxhc3QgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSB7XG4gICAgICBjaHVuazogY2h1bmssXG4gICAgICBlbmNvZGluZzogZW5jb2RpbmcsXG4gICAgICBpc0J1ZjogaXNCdWYsXG4gICAgICBjYWxsYmFjazogY2IsXG4gICAgICBuZXh0OiBudWxsXG4gICAgfTtcbiAgICBpZiAobGFzdCkge1xuICAgICAgbGFzdC5uZXh0ID0gc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdDtcbiAgICB9XG4gICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGZhbHNlLCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB3cml0ZXYsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBzdGF0ZS53cml0ZWxlbiA9IGxlbjtcbiAgc3RhdGUud3JpdGVjYiA9IGNiO1xuICBzdGF0ZS53cml0aW5nID0gdHJ1ZTtcbiAgc3RhdGUuc3luYyA9IHRydWU7XG4gIGlmICh3cml0ZXYpIHN0cmVhbS5fd3JpdGV2KGNodW5rLCBzdGF0ZS5vbndyaXRlKTtlbHNlIHN0cmVhbS5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBzdGF0ZS5vbndyaXRlKTtcbiAgc3RhdGUuc3luYyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKSB7XG4gIC0tc3RhdGUucGVuZGluZ2NiO1xuXG4gIGlmIChzeW5jKSB7XG4gICAgLy8gZGVmZXIgdGhlIGNhbGxiYWNrIGlmIHdlIGFyZSBiZWluZyBjYWxsZWQgc3luY2hyb25vdXNseVxuICAgIC8vIHRvIGF2b2lkIHBpbGluZyB1cCB0aGluZ3Mgb24gdGhlIHN0YWNrXG4gICAgcHJvY2Vzc05leHRUaWNrKGNiLCBlcik7XG4gICAgLy8gdGhpcyBjYW4gZW1pdCBmaW5pc2gsIGFuZCBpdCB3aWxsIGFsd2F5cyBoYXBwZW5cbiAgICAvLyBhZnRlciBlcnJvclxuICAgIHByb2Nlc3NOZXh0VGljayhmaW5pc2hNYXliZSwgc3RyZWFtLCBzdGF0ZSk7XG4gICAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICB9IGVsc2Uge1xuICAgIC8vIHRoZSBjYWxsZXIgZXhwZWN0IHRoaXMgdG8gaGFwcGVuIGJlZm9yZSBpZlxuICAgIC8vIGl0IGlzIGFzeW5jXG4gICAgY2IoZXIpO1xuICAgIHN0cmVhbS5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSB0cnVlO1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICAvLyB0aGlzIGNhbiBlbWl0IGZpbmlzaCwgYnV0IGZpbmlzaCBtdXN0XG4gICAgLy8gYWx3YXlzIGZvbGxvdyBlcnJvclxuICAgIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9ud3JpdGVTdGF0ZVVwZGF0ZShzdGF0ZSkge1xuICBzdGF0ZS53cml0aW5nID0gZmFsc2U7XG4gIHN0YXRlLndyaXRlY2IgPSBudWxsO1xuICBzdGF0ZS5sZW5ndGggLT0gc3RhdGUud3JpdGVsZW47XG4gIHN0YXRlLndyaXRlbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gb253cml0ZShzdHJlYW0sIGVyKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHN5bmMgPSBzdGF0ZS5zeW5jO1xuICB2YXIgY2IgPSBzdGF0ZS53cml0ZWNiO1xuXG4gIG9ud3JpdGVTdGF0ZVVwZGF0ZShzdGF0ZSk7XG5cbiAgaWYgKGVyKSBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKTtlbHNlIHtcbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBhY3R1YWxseSByZWFkeSB0byBmaW5pc2gsIGJ1dCBkb24ndCBlbWl0IHlldFxuICAgIHZhciBmaW5pc2hlZCA9IG5lZWRGaW5pc2goc3RhdGUpO1xuXG4gICAgaWYgKCFmaW5pc2hlZCAmJiAhc3RhdGUuY29ya2VkICYmICFzdGF0ZS5idWZmZXJQcm9jZXNzaW5nICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCkge1xuICAgICAgY2xlYXJCdWZmZXIoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIC8qPHJlcGxhY2VtZW50PiovXG4gICAgICBhc3luY1dyaXRlKGFmdGVyV3JpdGUsIHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgICAvKjwvcmVwbGFjZW1lbnQ+Ki9cbiAgICB9IGVsc2Uge1xuICAgICAgYWZ0ZXJXcml0ZShzdHJlYW0sIHN0YXRlLCBmaW5pc2hlZCwgY2IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYikge1xuICBpZiAoIWZpbmlzaGVkKSBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSk7XG4gIHN0YXRlLnBlbmRpbmdjYi0tO1xuICBjYigpO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbn1cblxuLy8gTXVzdCBmb3JjZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgb24gbmV4dFRpY2ssIHNvIHRoYXQgd2UgZG9uJ3Rcbi8vIGVtaXQgJ2RyYWluJyBiZWZvcmUgdGhlIHdyaXRlKCkgY29uc3VtZXIgZ2V0cyB0aGUgJ2ZhbHNlJyByZXR1cm5cbi8vIHZhbHVlLCBhbmQgaGFzIGEgY2hhbmNlIHRvIGF0dGFjaCBhICdkcmFpbicgbGlzdGVuZXIuXG5mdW5jdGlvbiBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLm5lZWREcmFpbikge1xuICAgIHN0YXRlLm5lZWREcmFpbiA9IGZhbHNlO1xuICAgIHN0cmVhbS5lbWl0KCdkcmFpbicpO1xuICB9XG59XG5cbi8vIGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGluIHRoZSBidWZmZXIgd2FpdGluZywgdGhlbiBwcm9jZXNzIGl0XG5mdW5jdGlvbiBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKSB7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSB0cnVlO1xuICB2YXIgZW50cnkgPSBzdGF0ZS5idWZmZXJlZFJlcXVlc3Q7XG5cbiAgaWYgKHN0cmVhbS5fd3JpdGV2ICYmIGVudHJ5ICYmIGVudHJ5Lm5leHQpIHtcbiAgICAvLyBGYXN0IGNhc2UsIHdyaXRlIGV2ZXJ5dGhpbmcgdXNpbmcgX3dyaXRldigpXG4gICAgdmFyIGwgPSBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudDtcbiAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5KGwpO1xuICAgIHZhciBob2xkZXIgPSBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWU7XG4gICAgaG9sZGVyLmVudHJ5ID0gZW50cnk7XG5cbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciBhbGxCdWZmZXJzID0gdHJ1ZTtcbiAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgIGJ1ZmZlcltjb3VudF0gPSBlbnRyeTtcbiAgICAgIGlmICghZW50cnkuaXNCdWYpIGFsbEJ1ZmZlcnMgPSBmYWxzZTtcbiAgICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgfVxuICAgIGJ1ZmZlci5hbGxCdWZmZXJzID0gYWxsQnVmZmVycztcblxuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgdHJ1ZSwgc3RhdGUubGVuZ3RoLCBidWZmZXIsICcnLCBob2xkZXIuZmluaXNoKTtcblxuICAgIC8vIGRvV3JpdGUgaXMgYWxtb3N0IGFsd2F5cyBhc3luYywgZGVmZXIgdGhlc2UgdG8gc2F2ZSBhIGJpdCBvZiB0aW1lXG4gICAgLy8gYXMgdGhlIGhvdCBwYXRoIGVuZHMgd2l0aCBkb1dyaXRlXG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7XG4gICAgaWYgKGhvbGRlci5uZXh0KSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBob2xkZXIubmV4dDtcbiAgICAgIGhvbGRlci5uZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlID0gbmV3IENvcmtlZFJlcXVlc3Qoc3RhdGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBTbG93IGNhc2UsIHdyaXRlIGNodW5rcyBvbmUtYnktb25lXG4gICAgd2hpbGUgKGVudHJ5KSB7XG4gICAgICB2YXIgY2h1bmsgPSBlbnRyeS5jaHVuaztcbiAgICAgIHZhciBlbmNvZGluZyA9IGVudHJ5LmVuY29kaW5nO1xuICAgICAgdmFyIGNiID0gZW50cnkuY2FsbGJhY2s7XG4gICAgICB2YXIgbGVuID0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG5cbiAgICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gICAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gICAgICAvLyBpZiB3ZSBkaWRuJ3QgY2FsbCB0aGUgb253cml0ZSBpbW1lZGlhdGVseSwgdGhlblxuICAgICAgLy8gaXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgaXQgZG9lcy5cbiAgICAgIC8vIGFsc28sIHRoYXQgbWVhbnMgdGhhdCB0aGUgY2h1bmsgYW5kIGNiIGFyZSBjdXJyZW50bHlcbiAgICAgIC8vIGJlaW5nIHByb2Nlc3NlZCwgc28gbW92ZSB0aGUgYnVmZmVyIGNvdW50ZXIgcGFzdCB0aGVtLlxuICAgICAgaWYgKHN0YXRlLndyaXRpbmcpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5ID09PSBudWxsKSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcbiAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gZW50cnk7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNiKG5ldyBFcnJvcignX3dyaXRlKCkgaXMgbm90IGltcGxlbWVudGVkJykpO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZXYgPSBudWxsO1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBpZiAodHlwZW9mIGNodW5rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBjaHVuaztcbiAgICBjaHVuayA9IG51bGw7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKGNodW5rICE9PSBudWxsICYmIGNodW5rICE9PSB1bmRlZmluZWQpIHRoaXMud3JpdGUoY2h1bmssIGVuY29kaW5nKTtcblxuICAvLyAuZW5kKCkgZnVsbHkgdW5jb3Jrc1xuICBpZiAoc3RhdGUuY29ya2VkKSB7XG4gICAgc3RhdGUuY29ya2VkID0gMTtcbiAgICB0aGlzLnVuY29yaygpO1xuICB9XG5cbiAgLy8gaWdub3JlIHVubmVjZXNzYXJ5IGVuZCgpIGNhbGxzLlxuICBpZiAoIXN0YXRlLmVuZGluZyAmJiAhc3RhdGUuZmluaXNoZWQpIGVuZFdyaXRhYmxlKHRoaXMsIHN0YXRlLCBjYik7XG59O1xuXG5mdW5jdGlvbiBuZWVkRmluaXNoKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5lbmRpbmcgJiYgc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCA9PT0gbnVsbCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLndyaXRpbmc7XG59XG5mdW5jdGlvbiBjYWxsRmluYWwoc3RyZWFtLCBzdGF0ZSkge1xuICBzdHJlYW0uX2ZpbmFsKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgIH1cbiAgICBzdGF0ZS5wcmVmaW5pc2hlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ3ByZWZpbmlzaCcpO1xuICAgIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucHJlZmluaXNoZWQgJiYgIXN0YXRlLmZpbmFsQ2FsbGVkKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJlYW0uX2ZpbmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICAgIHN0YXRlLmZpbmFsQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3NOZXh0VGljayhjYWxsRmluYWwsIHN0cmVhbSwgc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wcmVmaW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgncHJlZmluaXNoJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG5lZWQgPSBuZWVkRmluaXNoKHN0YXRlKTtcbiAgaWYgKG5lZWQpIHtcbiAgICBwcmVmaW5pc2goc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKHN0YXRlLnBlbmRpbmdjYiA9PT0gMCkge1xuICAgICAgc3RhdGUuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLmVtaXQoJ2ZpbmlzaCcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmVlZDtcbn1cblxuZnVuY3Rpb24gZW5kV3JpdGFibGUoc3RyZWFtLCBzdGF0ZSwgY2IpIHtcbiAgc3RhdGUuZW5kaW5nID0gdHJ1ZTtcbiAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIGlmIChjYikge1xuICAgIGlmIChzdGF0ZS5maW5pc2hlZCkgcHJvY2Vzc05leHRUaWNrKGNiKTtlbHNlIHN0cmVhbS5vbmNlKCdmaW5pc2gnLCBjYik7XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuICBzdHJlYW0ud3JpdGFibGUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gb25Db3JrZWRGaW5pc2goY29ya1JlcSwgc3RhdGUsIGVycikge1xuICB2YXIgZW50cnkgPSBjb3JrUmVxLmVudHJ5O1xuICBjb3JrUmVxLmVudHJ5ID0gbnVsbDtcbiAgd2hpbGUgKGVudHJ5KSB7XG4gICAgdmFyIGNiID0gZW50cnkuY2FsbGJhY2s7XG4gICAgc3RhdGUucGVuZGluZ2NiLS07XG4gICAgY2IoZXJyKTtcbiAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gIH1cbiAgaWYgKHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSkge1xuICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZS5uZXh0ID0gY29ya1JlcTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBjb3JrUmVxO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZS5wcm90b3R5cGUsICdkZXN0cm95ZWQnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAoIXRoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgfVxufSk7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5kZXN0cm95ID0gZGVzdHJveUltcGwuZGVzdHJveTtcbldyaXRhYmxlLnByb3RvdHlwZS5fdW5kZXN0cm95ID0gZGVzdHJveUltcGwudW5kZXN0cm95O1xuV3JpdGFibGUucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5lbmQoKTtcbiAgY2IoZXJyKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV93cml0YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIHByb2Nlc3NOZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MtbmV4dGljay1hcmdzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFkYWJsZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRHVwbGV4O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cblJlYWRhYmxlLlJlYWRhYmxlU3RhdGUgPSBSZWFkYWJsZVN0YXRlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG52YXIgRUVsaXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJzKHR5cGUpLmxlbmd0aDtcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBTdHJlYW0gPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLy8gVE9ETyhibWV1cmVyKTogQ2hhbmdlIHRoaXMgYmFjayB0byBjb25zdCBvbmNlIGhvbGUgY2hlY2tzIGFyZVxuLy8gcHJvcGVybHkgb3B0aW1pemVkIGF3YXkgZWFybHkgaW4gSWduaXRpb24rVHVyYm9GYW4uXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xudmFyIE91clVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSB8fCBmdW5jdGlvbiAoKSB7fTtcbmZ1bmN0aW9uIF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGNodW5rKTtcbn1cbmZ1bmN0aW9uIF9pc1VpbnQ4QXJyYXkob2JqKSB7XG4gIHJldHVybiBCdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBPdXJVaW50OEFycmF5O1xufVxuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBkZWJ1Z1V0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgZGVidWcgPSB2b2lkIDA7XG5pZiAoZGVidWdVdGlsICYmIGRlYnVnVXRpbC5kZWJ1Z2xvZykge1xuICBkZWJ1ZyA9IGRlYnVnVXRpbC5kZWJ1Z2xvZygnc3RyZWFtJyk7XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHt9O1xufVxuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXJMaXN0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL0J1ZmZlckxpc3QnKTtcbnZhciBkZXN0cm95SW1wbCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9kZXN0cm95Jyk7XG52YXIgU3RyaW5nRGVjb2RlcjtcblxudXRpbC5pbmhlcml0cyhSZWFkYWJsZSwgU3RyZWFtKTtcblxudmFyIGtQcm94eUV2ZW50cyA9IFsnZXJyb3InLCAnY2xvc2UnLCAnZGVzdHJveScsICdwYXVzZScsICdyZXN1bWUnXTtcblxuZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbikge1xuICAvLyBTYWRseSB0aGlzIGlzIG5vdCBjYWNoZWFibGUgYXMgc29tZSBsaWJyYXJpZXMgYnVuZGxlIHRoZWlyIG93blxuICAvLyBldmVudCBlbWl0dGVyIGltcGxlbWVudGF0aW9uIHdpdGggdGhlbS5cbiAgaWYgKHR5cGVvZiBlbWl0dGVyLnByZXBlbmRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLnByZXBlbmRMaXN0ZW5lcihldmVudCwgZm4pO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgaXMgYSBoYWNrIHRvIG1ha2Ugc3VyZSB0aGF0IG91ciBlcnJvciBoYW5kbGVyIGlzIGF0dGFjaGVkIGJlZm9yZSBhbnlcbiAgICAvLyB1c2VybGFuZCBvbmVzLiAgTkVWRVIgRE8gVEhJUy4gVGhpcyBpcyBoZXJlIG9ubHkgYmVjYXVzZSB0aGlzIGNvZGUgbmVlZHNcbiAgICAvLyB0byBjb250aW51ZSB0byB3b3JrIHdpdGggb2xkZXIgdmVyc2lvbnMgb2YgTm9kZS5qcyB0aGF0IGRvIG5vdCBpbmNsdWRlXG4gICAgLy8gdGhlIHByZXBlbmRMaXN0ZW5lcigpIG1ldGhvZC4gVGhlIGdvYWwgaXMgdG8gZXZlbnR1YWxseSByZW1vdmUgdGhpcyBoYWNrLlxuICAgIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbZXZlbnRdKSBlbWl0dGVyLm9uKGV2ZW50LCBmbik7ZWxzZSBpZiAoaXNBcnJheShlbWl0dGVyLl9ldmVudHNbZXZlbnRdKSkgZW1pdHRlci5fZXZlbnRzW2V2ZW50XS51bnNoaWZ0KGZuKTtlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldmVudF0gPSBbZm4sIGVtaXR0ZXIuX2V2ZW50c1tldmVudF1dO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtKSB7XG4gIER1cGxleCA9IER1cGxleCB8fCByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gb2JqZWN0IHN0cmVhbSBmbGFnLiBVc2VkIHRvIG1ha2UgcmVhZChuKSBpZ25vcmUgbiBhbmQgdG9cbiAgLy8gbWFrZSBhbGwgdGhlIGJ1ZmZlciBtZXJnaW5nIGFuZCBsZW5ndGggY2hlY2tzIGdvIGF3YXlcbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG5cbiAgaWYgKHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleCkgdGhpcy5vYmplY3RNb2RlID0gdGhpcy5vYmplY3RNb2RlIHx8ICEhb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGU7XG5cbiAgLy8gdGhlIHBvaW50IGF0IHdoaWNoIGl0IHN0b3BzIGNhbGxpbmcgX3JlYWQoKSB0byBmaWxsIHRoZSBidWZmZXJcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyBcImRvbid0IGNhbGwgX3JlYWQgcHJlZW1wdGl2ZWx5IGV2ZXJcIlxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB2YXIgZGVmYXVsdEh3bSA9IHRoaXMub2JqZWN0TW9kZSA/IDE2IDogMTYgKiAxMDI0O1xuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod20gfHwgaHdtID09PSAwID8gaHdtIDogZGVmYXVsdEh3bTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IE1hdGguZmxvb3IodGhpcy5oaWdoV2F0ZXJNYXJrKTtcblxuICAvLyBBIGxpbmtlZCBsaXN0IGlzIHVzZWQgdG8gc3RvcmUgZGF0YSBjaHVua3MgaW5zdGVhZCBvZiBhbiBhcnJheSBiZWNhdXNlIHRoZVxuICAvLyBsaW5rZWQgbGlzdCBjYW4gcmVtb3ZlIGVsZW1lbnRzIGZyb20gdGhlIGJlZ2lubmluZyBmYXN0ZXIgdGhhblxuICAvLyBhcnJheS5zaGlmdCgpXG4gIHRoaXMuYnVmZmVyID0gbmV3IEJ1ZmZlckxpc3QoKTtcbiAgdGhpcy5sZW5ndGggPSAwO1xuICB0aGlzLnBpcGVzID0gbnVsbDtcbiAgdGhpcy5waXBlc0NvdW50ID0gMDtcbiAgdGhpcy5mbG93aW5nID0gbnVsbDtcbiAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICB0aGlzLmVuZEVtaXR0ZWQgPSBmYWxzZTtcbiAgdGhpcy5yZWFkaW5nID0gZmFsc2U7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgZXZlbnQgJ3JlYWRhYmxlJy8nZGF0YScgaXMgZW1pdHRlZFxuICAvLyBpbW1lZGlhdGVseSwgb3Igb24gYSBsYXRlciB0aWNrLiAgV2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhdCBmaXJzdCwgYmVjYXVzZVxuICAvLyBhbnkgYWN0aW9ucyB0aGF0IHNob3VsZG4ndCBoYXBwZW4gdW50aWwgXCJsYXRlclwiIHNob3VsZCBnZW5lcmFsbHkgYWxzb1xuICAvLyBub3QgaGFwcGVuIGJlZm9yZSB0aGUgZmlyc3QgcmVhZCBjYWxsLlxuICB0aGlzLnN5bmMgPSB0cnVlO1xuXG4gIC8vIHdoZW5ldmVyIHdlIHJldHVybiBudWxsLCB0aGVuIHdlIHNldCBhIGZsYWcgdG8gc2F5XG4gIC8vIHRoYXQgd2UncmUgYXdhaXRpbmcgYSAncmVhZGFibGUnIGV2ZW50IGVtaXNzaW9uLlxuICB0aGlzLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuICB0aGlzLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICB0aGlzLnJlYWRhYmxlTGlzdGVuaW5nID0gZmFsc2U7XG4gIHRoaXMucmVzdW1lU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgLy8gaGFzIGl0IGJlZW4gZGVzdHJveWVkXG4gIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgLy8gQ3J5cHRvIGlzIGtpbmQgb2Ygb2xkIGFuZCBjcnVzdHkuICBIaXN0b3JpY2FsbHksIGl0cyBkZWZhdWx0IHN0cmluZ1xuICAvLyBlbmNvZGluZyBpcyAnYmluYXJ5JyBzbyB3ZSBoYXZlIHRvIG1ha2UgdGhpcyBjb25maWd1cmFibGUuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgdW5pdmVyc2UgdXNlcyAndXRmOCcsIHRob3VnaC5cbiAgdGhpcy5kZWZhdWx0RW5jb2RpbmcgPSBvcHRpb25zLmRlZmF1bHRFbmNvZGluZyB8fCAndXRmOCc7XG5cbiAgLy8gdGhlIG51bWJlciBvZiB3cml0ZXJzIHRoYXQgYXJlIGF3YWl0aW5nIGEgZHJhaW4gZXZlbnQgaW4gLnBpcGUoKXNcbiAgdGhpcy5hd2FpdERyYWluID0gMDtcblxuICAvLyBpZiB0cnVlLCBhIG1heWJlUmVhZE1vcmUgaGFzIGJlZW4gc2NoZWR1bGVkXG4gIHRoaXMucmVhZGluZ01vcmUgPSBmYWxzZTtcblxuICB0aGlzLmRlY29kZXIgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gbnVsbDtcbiAgaWYgKG9wdGlvbnMuZW5jb2RpbmcpIHtcbiAgICBpZiAoIVN0cmluZ0RlY29kZXIpIFN0cmluZ0RlY29kZXIgPSByZXF1aXJlKCdzdHJpbmdfZGVjb2Rlci8nKS5TdHJpbmdEZWNvZGVyO1xuICAgIHRoaXMuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKG9wdGlvbnMuZW5jb2RpbmcpO1xuICAgIHRoaXMuZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlKG9wdGlvbnMpIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVhZGFibGUpKSByZXR1cm4gbmV3IFJlYWRhYmxlKG9wdGlvbnMpO1xuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUgPSBuZXcgUmVhZGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3lcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucmVhZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fcmVhZCA9IG9wdGlvbnMucmVhZDtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB0aGlzLl9kZXN0cm95ID0gb3B0aW9ucy5kZXN0cm95O1xuICB9XG5cbiAgU3RyZWFtLmNhbGwodGhpcyk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZS5wcm90b3R5cGUsICdkZXN0cm95ZWQnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAoIXRoaXMuX3JlYWRhYmxlU3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgfVxufSk7XG5cblJlYWRhYmxlLnByb3RvdHlwZS5kZXN0cm95ID0gZGVzdHJveUltcGwuZGVzdHJveTtcblJlYWRhYmxlLnByb3RvdHlwZS5fdW5kZXN0cm95ID0gZGVzdHJveUltcGwudW5kZXN0cm95O1xuUmVhZGFibGUucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5wdXNoKG51bGwpO1xuICBjYihlcnIpO1xufTtcblxuLy8gTWFudWFsbHkgc2hvdmUgc29tZXRoaW5nIGludG8gdGhlIHJlYWQoKSBidWZmZXIuXG4vLyBUaGlzIHJldHVybnMgdHJ1ZSBpZiB0aGUgaGlnaFdhdGVyTWFyayBoYXMgbm90IGJlZW4gaGl0IHlldCxcbi8vIHNpbWlsYXIgdG8gaG93IFdyaXRhYmxlLndyaXRlKCkgcmV0dXJucyB0cnVlIGlmIHlvdSBzaG91bGRcbi8vIHdyaXRlKCkgc29tZSBtb3JlLlxuUmVhZGFibGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBza2lwQ2h1bmtDaGVjaztcblxuICBpZiAoIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBpZiAodHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmNvZGluZyB8fCBzdGF0ZS5kZWZhdWx0RW5jb2Rpbmc7XG4gICAgICBpZiAoZW5jb2RpbmcgIT09IHN0YXRlLmVuY29kaW5nKSB7XG4gICAgICAgIGNodW5rID0gQnVmZmVyLmZyb20oY2h1bmssIGVuY29kaW5nKTtcbiAgICAgICAgZW5jb2RpbmcgPSAnJztcbiAgICAgIH1cbiAgICAgIHNraXBDaHVua0NoZWNrID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2tpcENodW5rQ2hlY2sgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHJlYWRhYmxlQWRkQ2h1bmsodGhpcywgY2h1bmssIGVuY29kaW5nLCBmYWxzZSwgc2tpcENodW5rQ2hlY2spO1xufTtcblxuLy8gVW5zaGlmdCBzaG91bGQgKmFsd2F5cyogYmUgc29tZXRoaW5nIGRpcmVjdGx5IG91dCBvZiByZWFkKClcblJlYWRhYmxlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIGNodW5rLCBudWxsLCB0cnVlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiByZWFkYWJsZUFkZENodW5rKHN0cmVhbSwgY2h1bmssIGVuY29kaW5nLCBhZGRUb0Zyb250LCBza2lwQ2h1bmtDaGVjaykge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIGlmIChjaHVuayA9PT0gbnVsbCkge1xuICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICBvbkVvZkNodW5rKHN0cmVhbSwgc3RhdGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBlcjtcbiAgICBpZiAoIXNraXBDaHVua0NoZWNrKSBlciA9IGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspO1xuICAgIGlmIChlcikge1xuICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUub2JqZWN0TW9kZSB8fCBjaHVuayAmJiBjaHVuay5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodHlwZW9mIGNodW5rICE9PSAnc3RyaW5nJyAmJiAhc3RhdGUub2JqZWN0TW9kZSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY2h1bmspICE9PSBCdWZmZXIucHJvdG90eXBlKSB7XG4gICAgICAgIGNodW5rID0gX3VpbnQ4QXJyYXlUb0J1ZmZlcihjaHVuayk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGRUb0Zyb250KSB7XG4gICAgICAgIGlmIChzdGF0ZS5lbmRFbWl0dGVkKSBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3N0cmVhbS51bnNoaWZ0KCkgYWZ0ZXIgZW5kIGV2ZW50JykpO2Vsc2UgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5lbmRlZCkge1xuICAgICAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3N0cmVhbS5wdXNoKCkgYWZ0ZXIgRU9GJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhZW5jb2RpbmcpIHtcbiAgICAgICAgICBjaHVuayA9IHN0YXRlLmRlY29kZXIud3JpdGUoY2h1bmspO1xuICAgICAgICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlIHx8IGNodW5rLmxlbmd0aCAhPT0gMCkgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGZhbHNlKTtlbHNlIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWFkZFRvRnJvbnQpIHtcbiAgICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmVlZE1vcmVEYXRhKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGFkZFRvRnJvbnQpIHtcbiAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgc3RhdGUubGVuZ3RoID09PSAwICYmICFzdGF0ZS5zeW5jKSB7XG4gICAgc3RyZWFtLmVtaXQoJ2RhdGEnLCBjaHVuayk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdXBkYXRlIHRoZSBidWZmZXIgaW5mby5cbiAgICBzdGF0ZS5sZW5ndGggKz0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG4gICAgaWYgKGFkZFRvRnJvbnQpIHN0YXRlLmJ1ZmZlci51bnNoaWZ0KGNodW5rKTtlbHNlIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcblxuICAgIGlmIChzdGF0ZS5uZWVkUmVhZGFibGUpIGVtaXRSZWFkYWJsZShzdHJlYW0pO1xuICB9XG4gIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspIHtcbiAgdmFyIGVyO1xuICBpZiAoIV9pc1VpbnQ4QXJyYXkoY2h1bmspICYmIHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIHJldHVybiBlcjtcbn1cblxuLy8gaWYgaXQncyBwYXN0IHRoZSBoaWdoIHdhdGVyIG1hcmssIHdlIGNhbiBwdXNoIGluIHNvbWUgbW9yZS5cbi8vIEFsc28sIGlmIHdlIGhhdmUgbm8gZGF0YSB5ZXQsIHdlIGNhbiBzdGFuZCBzb21lXG4vLyBtb3JlIGJ5dGVzLiAgVGhpcyBpcyB0byB3b3JrIGFyb3VuZCBjYXNlcyB3aGVyZSBod209MCxcbi8vIHN1Y2ggYXMgdGhlIHJlcGwuICBBbHNvLCBpZiB0aGUgcHVzaCgpIHRyaWdnZXJlZCBhXG4vLyByZWFkYWJsZSBldmVudCwgYW5kIHRoZSB1c2VyIGNhbGxlZCByZWFkKGxhcmdlTnVtYmVyKSBzdWNoIHRoYXRcbi8vIG5lZWRSZWFkYWJsZSB3YXMgc2V0LCB0aGVuIHdlIG91Z2h0IHRvIHB1c2ggbW9yZSwgc28gdGhhdCBhbm90aGVyXG4vLyAncmVhZGFibGUnIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkLlxuZnVuY3Rpb24gbmVlZE1vcmVEYXRhKHN0YXRlKSB7XG4gIHJldHVybiAhc3RhdGUuZW5kZWQgJiYgKHN0YXRlLm5lZWRSZWFkYWJsZSB8fCBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5pc1BhdXNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyA9PT0gZmFsc2U7XG59O1xuXG4vLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cblJlYWRhYmxlLnByb3RvdHlwZS5zZXRFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmMpIHtcbiAgaWYgKCFTdHJpbmdEZWNvZGVyKSBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoZW5jKTtcbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmNvZGluZyA9IGVuYztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBEb24ndCByYWlzZSB0aGUgaHdtID4gOE1CXG52YXIgTUFYX0hXTSA9IDB4ODAwMDAwO1xuZnVuY3Rpb24gY29tcHV0ZU5ld0hpZ2hXYXRlck1hcmsobikge1xuICBpZiAobiA+PSBNQVhfSFdNKSB7XG4gICAgbiA9IE1BWF9IV007XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBuZXh0IGhpZ2hlc3QgcG93ZXIgb2YgMiB0byBwcmV2ZW50IGluY3JlYXNpbmcgaHdtIGV4Y2Vzc2l2ZWx5IGluXG4gICAgLy8gdGlueSBhbW91bnRzXG4gICAgbi0tO1xuICAgIG4gfD0gbiA+Pj4gMTtcbiAgICBuIHw9IG4gPj4+IDI7XG4gICAgbiB8PSBuID4+PiA0O1xuICAgIG4gfD0gbiA+Pj4gODtcbiAgICBuIHw9IG4gPj4+IDE2O1xuICAgIG4rKztcbiAgfVxuICByZXR1cm4gbjtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBob3dNdWNoVG9SZWFkKG4sIHN0YXRlKSB7XG4gIGlmIChuIDw9IDAgfHwgc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmVuZGVkKSByZXR1cm4gMDtcbiAgaWYgKHN0YXRlLm9iamVjdE1vZGUpIHJldHVybiAxO1xuICBpZiAobiAhPT0gbikge1xuICAgIC8vIE9ubHkgZmxvdyBvbmUgYnVmZmVyIGF0IGEgdGltZVxuICAgIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCkgcmV0dXJuIHN0YXRlLmJ1ZmZlci5oZWFkLmRhdGEubGVuZ3RoO2Vsc2UgcmV0dXJuIHN0YXRlLmxlbmd0aDtcbiAgfVxuICAvLyBJZiB3ZSdyZSBhc2tpbmcgZm9yIG1vcmUgdGhhbiB0aGUgY3VycmVudCBod20sIHRoZW4gcmFpc2UgdGhlIGh3bS5cbiAgaWYgKG4gPiBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSBzdGF0ZS5oaWdoV2F0ZXJNYXJrID0gY29tcHV0ZU5ld0hpZ2hXYXRlck1hcmsobik7XG4gIGlmIChuIDw9IHN0YXRlLmxlbmd0aCkgcmV0dXJuIG47XG4gIC8vIERvbid0IGhhdmUgZW5vdWdoXG4gIGlmICghc3RhdGUuZW5kZWQpIHtcbiAgICBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIHJldHVybiAwO1xuICB9XG4gIHJldHVybiBzdGF0ZS5sZW5ndGg7XG59XG5cbi8vIHlvdSBjYW4gb3ZlcnJpZGUgZWl0aGVyIHRoaXMgbWV0aG9kLCBvciB0aGUgYXN5bmMgX3JlYWQobikgYmVsb3cuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gIGRlYnVnKCdyZWFkJywgbik7XG4gIG4gPSBwYXJzZUludChuLCAxMCk7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBuT3JpZyA9IG47XG5cbiAgaWYgKG4gIT09IDApIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuXG4gIC8vIGlmIHdlJ3JlIGRvaW5nIHJlYWQoMCkgdG8gdHJpZ2dlciBhIHJlYWRhYmxlIGV2ZW50LCBidXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGEgYnVuY2ggb2YgZGF0YSBpbiB0aGUgYnVmZmVyLCB0aGVuIGp1c3QgdHJpZ2dlclxuICAvLyB0aGUgJ3JlYWRhYmxlJyBldmVudCBhbmQgbW92ZSBvbi5cbiAgaWYgKG4gPT09IDAgJiYgc3RhdGUubmVlZFJlYWRhYmxlICYmIChzdGF0ZS5sZW5ndGggPj0gc3RhdGUuaGlnaFdhdGVyTWFyayB8fCBzdGF0ZS5lbmRlZCkpIHtcbiAgICBkZWJ1ZygncmVhZDogZW1pdFJlYWRhYmxlJywgc3RhdGUubGVuZ3RoLCBzdGF0ZS5lbmRlZCk7XG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkgZW5kUmVhZGFibGUodGhpcyk7ZWxzZSBlbWl0UmVhZGFibGUodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBuID0gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSk7XG5cbiAgLy8gaWYgd2UndmUgZW5kZWQsIGFuZCB3ZSdyZSBub3cgY2xlYXIsIHRoZW4gZmluaXNoIGl0IHVwLlxuICBpZiAobiA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkge1xuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIGVuZFJlYWRhYmxlKHRoaXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gQWxsIHRoZSBhY3R1YWwgY2h1bmsgZ2VuZXJhdGlvbiBsb2dpYyBuZWVkcyB0byBiZVxuICAvLyAqYmVsb3cqIHRoZSBjYWxsIHRvIF9yZWFkLiAgVGhlIHJlYXNvbiBpcyB0aGF0IGluIGNlcnRhaW5cbiAgLy8gc3ludGhldGljIHN0cmVhbSBjYXNlcywgc3VjaCBhcyBwYXNzdGhyb3VnaCBzdHJlYW1zLCBfcmVhZFxuICAvLyBtYXkgYmUgYSBjb21wbGV0ZWx5IHN5bmNocm9ub3VzIG9wZXJhdGlvbiB3aGljaCBtYXkgY2hhbmdlXG4gIC8vIHRoZSBzdGF0ZSBvZiB0aGUgcmVhZCBidWZmZXIsIHByb3ZpZGluZyBlbm91Z2ggZGF0YSB3aGVuXG4gIC8vIGJlZm9yZSB0aGVyZSB3YXMgKm5vdCogZW5vdWdoLlxuICAvL1xuICAvLyBTbywgdGhlIHN0ZXBzIGFyZTpcbiAgLy8gMS4gRmlndXJlIG91dCB3aGF0IHRoZSBzdGF0ZSBvZiB0aGluZ3Mgd2lsbCBiZSBhZnRlciB3ZSBkb1xuICAvLyBhIHJlYWQgZnJvbSB0aGUgYnVmZmVyLlxuICAvL1xuICAvLyAyLiBJZiB0aGF0IHJlc3VsdGluZyBzdGF0ZSB3aWxsIHRyaWdnZXIgYSBfcmVhZCwgdGhlbiBjYWxsIF9yZWFkLlxuICAvLyBOb3RlIHRoYXQgdGhpcyBtYXkgYmUgYXN5bmNocm9ub3VzLCBvciBzeW5jaHJvbm91cy4gIFllcywgaXQgaXNcbiAgLy8gZGVlcGx5IHVnbHkgdG8gd3JpdGUgQVBJcyB0aGlzIHdheSwgYnV0IHRoYXQgc3RpbGwgZG9lc24ndCBtZWFuXG4gIC8vIHRoYXQgdGhlIFJlYWRhYmxlIGNsYXNzIHNob3VsZCBiZWhhdmUgaW1wcm9wZXJseSwgYXMgc3RyZWFtcyBhcmVcbiAgLy8gZGVzaWduZWQgdG8gYmUgc3luYy9hc3luYyBhZ25vc3RpYy5cbiAgLy8gVGFrZSBub3RlIGlmIHRoZSBfcmVhZCBjYWxsIGlzIHN5bmMgb3IgYXN5bmMgKGllLCBpZiB0aGUgcmVhZCBjYWxsXG4gIC8vIGhhcyByZXR1cm5lZCB5ZXQpLCBzbyB0aGF0IHdlIGtub3cgd2hldGhlciBvciBub3QgaXQncyBzYWZlIHRvIGVtaXRcbiAgLy8gJ3JlYWRhYmxlJyBldGMuXG4gIC8vXG4gIC8vIDMuIEFjdHVhbGx5IHB1bGwgdGhlIHJlcXVlc3RlZCBjaHVua3Mgb3V0IG9mIHRoZSBidWZmZXIgYW5kIHJldHVybi5cblxuICAvLyBpZiB3ZSBuZWVkIGEgcmVhZGFibGUgZXZlbnQsIHRoZW4gd2UgbmVlZCB0byBkbyBzb21lIHJlYWRpbmcuXG4gIHZhciBkb1JlYWQgPSBzdGF0ZS5uZWVkUmVhZGFibGU7XG4gIGRlYnVnKCduZWVkIHJlYWRhYmxlJywgZG9SZWFkKTtcblxuICAvLyBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBsZXNzIHRoYW4gdGhlIGhpZ2hXYXRlck1hcmssIHRoZW4gYWxzbyByZWFkIHNvbWVcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCB8fCBzdGF0ZS5sZW5ndGggLSBuIDwgc3RhdGUuaGlnaFdhdGVyTWFyaykge1xuICAgIGRvUmVhZCA9IHRydWU7XG4gICAgZGVidWcoJ2xlbmd0aCBsZXNzIHRoYW4gd2F0ZXJtYXJrJywgZG9SZWFkKTtcbiAgfVxuXG4gIC8vIGhvd2V2ZXIsIGlmIHdlJ3ZlIGVuZGVkLCB0aGVuIHRoZXJlJ3Mgbm8gcG9pbnQsIGFuZCBpZiB3ZSdyZSBhbHJlYWR5XG4gIC8vIHJlYWRpbmcsIHRoZW4gaXQncyB1bm5lY2Vzc2FyeS5cbiAgaWYgKHN0YXRlLmVuZGVkIHx8IHN0YXRlLnJlYWRpbmcpIHtcbiAgICBkb1JlYWQgPSBmYWxzZTtcbiAgICBkZWJ1ZygncmVhZGluZyBvciBlbmRlZCcsIGRvUmVhZCk7XG4gIH0gZWxzZSBpZiAoZG9SZWFkKSB7XG4gICAgZGVidWcoJ2RvIHJlYWQnKTtcbiAgICBzdGF0ZS5yZWFkaW5nID0gdHJ1ZTtcbiAgICBzdGF0ZS5zeW5jID0gdHJ1ZTtcbiAgICAvLyBpZiB0aGUgbGVuZ3RoIGlzIGN1cnJlbnRseSB6ZXJvLCB0aGVuIHdlICpuZWVkKiBhIHJlYWRhYmxlIGV2ZW50LlxuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgLy8gY2FsbCBpbnRlcm5hbCByZWFkIG1ldGhvZFxuICAgIHRoaXMuX3JlYWQoc3RhdGUuaGlnaFdhdGVyTWFyayk7XG4gICAgc3RhdGUuc3luYyA9IGZhbHNlO1xuICAgIC8vIElmIF9yZWFkIHB1c2hlZCBkYXRhIHN5bmNocm9ub3VzbHksIHRoZW4gYHJlYWRpbmdgIHdpbGwgYmUgZmFsc2UsXG4gICAgLy8gYW5kIHdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgaG93IG11Y2ggZGF0YSB3ZSBjYW4gcmV0dXJuIHRvIHRoZSB1c2VyLlxuICAgIGlmICghc3RhdGUucmVhZGluZykgbiA9IGhvd011Y2hUb1JlYWQobk9yaWcsIHN0YXRlKTtcbiAgfVxuXG4gIHZhciByZXQ7XG4gIGlmIChuID4gMCkgcmV0ID0gZnJvbUxpc3Qobiwgc3RhdGUpO2Vsc2UgcmV0ID0gbnVsbDtcblxuICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICBuID0gMDtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5sZW5ndGggLT0gbjtcbiAgfVxuXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICAvLyBJZiB3ZSBoYXZlIG5vdGhpbmcgaW4gdGhlIGJ1ZmZlciwgdGhlbiB3ZSB3YW50IHRvIGtub3dcbiAgICAvLyBhcyBzb29uIGFzIHdlICpkbyogZ2V0IHNvbWV0aGluZyBpbnRvIHRoZSBidWZmZXIuXG4gICAgaWYgKCFzdGF0ZS5lbmRlZCkgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAgIC8vIElmIHdlIHRyaWVkIHRvIHJlYWQoKSBwYXN0IHRoZSBFT0YsIHRoZW4gZW1pdCBlbmQgb24gdGhlIG5leHQgdGljay5cbiAgICBpZiAobk9yaWcgIT09IG4gJiYgc3RhdGUuZW5kZWQpIGVuZFJlYWRhYmxlKHRoaXMpO1xuICB9XG5cbiAgaWYgKHJldCAhPT0gbnVsbCkgdGhpcy5lbWl0KCdkYXRhJywgcmV0KTtcblxuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5lbmRlZCkgcmV0dXJuO1xuICBpZiAoc3RhdGUuZGVjb2Rlcikge1xuICAgIHZhciBjaHVuayA9IHN0YXRlLmRlY29kZXIuZW5kKCk7XG4gICAgaWYgKGNodW5rICYmIGNodW5rLmxlbmd0aCkge1xuICAgICAgc3RhdGUuYnVmZmVyLnB1c2goY2h1bmspO1xuICAgICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgIH1cbiAgfVxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG5cbiAgLy8gZW1pdCAncmVhZGFibGUnIG5vdyB0byBtYWtlIHN1cmUgaXQgZ2V0cyBwaWNrZWQgdXAuXG4gIGVtaXRSZWFkYWJsZShzdHJlYW0pO1xufVxuXG4vLyBEb24ndCBlbWl0IHJlYWRhYmxlIHJpZ2h0IGF3YXkgaW4gc3luYyBtb2RlLCBiZWNhdXNlIHRoaXMgY2FuIHRyaWdnZXJcbi8vIGFub3RoZXIgcmVhZCgpIGNhbGwgPT4gc3RhY2sgb3ZlcmZsb3cuICBUaGlzIHdheSwgaXQgbWlnaHQgdHJpZ2dlclxuLy8gYSBuZXh0VGljayByZWN1cnNpb24gd2FybmluZywgYnV0IHRoYXQncyBub3Qgc28gYmFkLlxuZnVuY3Rpb24gZW1pdFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIHN0YXRlLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuICBpZiAoIXN0YXRlLmVtaXR0ZWRSZWFkYWJsZSkge1xuICAgIGRlYnVnKCdlbWl0UmVhZGFibGUnLCBzdGF0ZS5mbG93aW5nKTtcbiAgICBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSB0cnVlO1xuICAgIGlmIChzdGF0ZS5zeW5jKSBwcm9jZXNzTmV4dFRpY2soZW1pdFJlYWRhYmxlXywgc3RyZWFtKTtlbHNlIGVtaXRSZWFkYWJsZV8oc3RyZWFtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbWl0UmVhZGFibGVfKHN0cmVhbSkge1xuICBkZWJ1ZygnZW1pdCByZWFkYWJsZScpO1xuICBzdHJlYW0uZW1pdCgncmVhZGFibGUnKTtcbiAgZmxvdyhzdHJlYW0pO1xufVxuXG4vLyBhdCB0aGlzIHBvaW50LCB0aGUgdXNlciBoYXMgcHJlc3VtYWJseSBzZWVuIHRoZSAncmVhZGFibGUnIGV2ZW50LFxuLy8gYW5kIGNhbGxlZCByZWFkKCkgdG8gY29uc3VtZSBzb21lIGRhdGEuICB0aGF0IG1heSBoYXZlIHRyaWdnZXJlZFxuLy8gaW4gdHVybiBhbm90aGVyIF9yZWFkKG4pIGNhbGwsIGluIHdoaWNoIGNhc2UgcmVhZGluZyA9IHRydWUgaWZcbi8vIGl0J3MgaW4gcHJvZ3Jlc3MuXG4vLyBIb3dldmVyLCBpZiB3ZSdyZSBub3QgZW5kZWQsIG9yIHJlYWRpbmcsIGFuZCB0aGUgbGVuZ3RoIDwgaHdtLFxuLy8gdGhlbiBnbyBhaGVhZCBhbmQgdHJ5IHRvIHJlYWQgc29tZSBtb3JlIHByZWVtcHRpdmVseS5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlYWRpbmdNb3JlKSB7XG4gICAgc3RhdGUucmVhZGluZ01vcmUgPSB0cnVlO1xuICAgIHByb2Nlc3NOZXh0VGljayhtYXliZVJlYWRNb3JlXywgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF5YmVSZWFkTW9yZV8oc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbGVuID0gc3RhdGUubGVuZ3RoO1xuICB3aGlsZSAoIXN0YXRlLnJlYWRpbmcgJiYgIXN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLmVuZGVkICYmIHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcmspIHtcbiAgICBkZWJ1ZygnbWF5YmVSZWFkTW9yZSByZWFkIDAnKTtcbiAgICBzdHJlYW0ucmVhZCgwKTtcbiAgICBpZiAobGVuID09PSBzdGF0ZS5sZW5ndGgpXG4gICAgICAvLyBkaWRuJ3QgZ2V0IGFueSBkYXRhLCBzdG9wIHNwaW5uaW5nLlxuICAgICAgYnJlYWs7ZWxzZSBsZW4gPSBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgc3RhdGUucmVhZGluZ01vcmUgPSBmYWxzZTtcbn1cblxuLy8gYWJzdHJhY3QgbWV0aG9kLiAgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gY2FsbCBjYihlciwgZGF0YSkgd2hlcmUgZGF0YSBpcyA8PSBuIGluIGxlbmd0aC5cbi8vIGZvciB2aXJ0dWFsIChub24tc3RyaW5nLCBub24tYnVmZmVyKSBzdHJlYW1zLCBcImxlbmd0aFwiIGlzIHNvbWV3aGF0XG4vLyBhcmJpdHJhcnksIGFuZCBwZXJoYXBzIG5vdCB2ZXJ5IG1lYW5pbmdmdWwuXG5SZWFkYWJsZS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdfcmVhZCgpIGlzIG5vdCBpbXBsZW1lbnRlZCcpKTtcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKGRlc3QsIHBpcGVPcHRzKSB7XG4gIHZhciBzcmMgPSB0aGlzO1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuXG4gIHN3aXRjaCAoc3RhdGUucGlwZXNDb3VudCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHN0YXRlLnBpcGVzID0gZGVzdDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHN0YXRlLnBpcGVzID0gW3N0YXRlLnBpcGVzLCBkZXN0XTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdGF0ZS5waXBlcy5wdXNoKGRlc3QpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgc3RhdGUucGlwZXNDb3VudCArPSAxO1xuICBkZWJ1ZygncGlwZSBjb3VudD0lZCBvcHRzPSVqJywgc3RhdGUucGlwZXNDb3VudCwgcGlwZU9wdHMpO1xuXG4gIHZhciBkb0VuZCA9ICghcGlwZU9wdHMgfHwgcGlwZU9wdHMuZW5kICE9PSBmYWxzZSkgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRvdXQgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRlcnI7XG5cbiAgdmFyIGVuZEZuID0gZG9FbmQgPyBvbmVuZCA6IHVucGlwZTtcbiAgaWYgKHN0YXRlLmVuZEVtaXR0ZWQpIHByb2Nlc3NOZXh0VGljayhlbmRGbik7ZWxzZSBzcmMub25jZSgnZW5kJywgZW5kRm4pO1xuXG4gIGRlc3Qub24oJ3VucGlwZScsIG9udW5waXBlKTtcbiAgZnVuY3Rpb24gb251bnBpcGUocmVhZGFibGUsIHVucGlwZUluZm8pIHtcbiAgICBkZWJ1Zygnb251bnBpcGUnKTtcbiAgICBpZiAocmVhZGFibGUgPT09IHNyYykge1xuICAgICAgaWYgKHVucGlwZUluZm8gJiYgdW5waXBlSW5mby5oYXNVbnBpcGVkID09PSBmYWxzZSkge1xuICAgICAgICB1bnBpcGVJbmZvLmhhc1VucGlwZWQgPSB0cnVlO1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgZGVidWcoJ29uZW5kJyk7XG4gICAgZGVzdC5lbmQoKTtcbiAgfVxuXG4gIC8vIHdoZW4gdGhlIGRlc3QgZHJhaW5zLCBpdCByZWR1Y2VzIHRoZSBhd2FpdERyYWluIGNvdW50ZXJcbiAgLy8gb24gdGhlIHNvdXJjZS4gIFRoaXMgd291bGQgYmUgbW9yZSBlbGVnYW50IHdpdGggYSAub25jZSgpXG4gIC8vIGhhbmRsZXIgaW4gZmxvdygpLCBidXQgYWRkaW5nIGFuZCByZW1vdmluZyByZXBlYXRlZGx5IGlzXG4gIC8vIHRvbyBzbG93LlxuICB2YXIgb25kcmFpbiA9IHBpcGVPbkRyYWluKHNyYyk7XG4gIGRlc3Qub24oJ2RyYWluJywgb25kcmFpbik7XG5cbiAgdmFyIGNsZWFuZWRVcCA9IGZhbHNlO1xuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIGRlYnVnKCdjbGVhbnVwJyk7XG4gICAgLy8gY2xlYW51cCBldmVudCBoYW5kbGVycyBvbmNlIHRoZSBwaXBlIGlzIGJyb2tlblxuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCB1bnBpcGUpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG5cbiAgICBjbGVhbmVkVXAgPSB0cnVlO1xuXG4gICAgLy8gaWYgdGhlIHJlYWRlciBpcyB3YWl0aW5nIGZvciBhIGRyYWluIGV2ZW50IGZyb20gdGhpc1xuICAgIC8vIHNwZWNpZmljIHdyaXRlciwgdGhlbiBpdCB3b3VsZCBjYXVzZSBpdCB0byBuZXZlciBzdGFydFxuICAgIC8vIGZsb3dpbmcgYWdhaW4uXG4gICAgLy8gU28sIGlmIHRoaXMgaXMgYXdhaXRpbmcgYSBkcmFpbiwgdGhlbiB3ZSBqdXN0IGNhbGwgaXQgbm93LlxuICAgIC8vIElmIHdlIGRvbid0IGtub3csIHRoZW4gYXNzdW1lIHRoYXQgd2UgYXJlIHdhaXRpbmcgZm9yIG9uZS5cbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbiAmJiAoIWRlc3QuX3dyaXRhYmxlU3RhdGUgfHwgZGVzdC5fd3JpdGFibGVTdGF0ZS5uZWVkRHJhaW4pKSBvbmRyYWluKCk7XG4gIH1cblxuICAvLyBJZiB0aGUgdXNlciBwdXNoZXMgbW9yZSBkYXRhIHdoaWxlIHdlJ3JlIHdyaXRpbmcgdG8gZGVzdCB0aGVuIHdlJ2xsIGVuZCB1cFxuICAvLyBpbiBvbmRhdGEgYWdhaW4uIEhvd2V2ZXIsIHdlIG9ubHkgd2FudCB0byBpbmNyZWFzZSBhd2FpdERyYWluIG9uY2UgYmVjYXVzZVxuICAvLyBkZXN0IHdpbGwgb25seSBlbWl0IG9uZSAnZHJhaW4nIGV2ZW50IGZvciB0aGUgbXVsdGlwbGUgd3JpdGVzLlxuICAvLyA9PiBJbnRyb2R1Y2UgYSBndWFyZCBvbiBpbmNyZWFzaW5nIGF3YWl0RHJhaW4uXG4gIHZhciBpbmNyZWFzZWRBd2FpdERyYWluID0gZmFsc2U7XG4gIHNyYy5vbignZGF0YScsIG9uZGF0YSk7XG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGRlYnVnKCdvbmRhdGEnKTtcbiAgICBpbmNyZWFzZWRBd2FpdERyYWluID0gZmFsc2U7XG4gICAgdmFyIHJldCA9IGRlc3Qud3JpdGUoY2h1bmspO1xuICAgIGlmIChmYWxzZSA9PT0gcmV0ICYmICFpbmNyZWFzZWRBd2FpdERyYWluKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciB1bnBpcGVkIGR1cmluZyBgZGVzdC53cml0ZSgpYCwgaXQgaXMgcG9zc2libGVcbiAgICAgIC8vIHRvIGdldCBzdHVjayBpbiBhIHBlcm1hbmVudGx5IHBhdXNlZCBzdGF0ZSBpZiB0aGF0IHdyaXRlXG4gICAgICAvLyBhbHNvIHJldHVybmVkIGZhbHNlLlxuICAgICAgLy8gPT4gQ2hlY2sgd2hldGhlciBgZGVzdGAgaXMgc3RpbGwgYSBwaXBpbmcgZGVzdGluYXRpb24uXG4gICAgICBpZiAoKHN0YXRlLnBpcGVzQ291bnQgPT09IDEgJiYgc3RhdGUucGlwZXMgPT09IGRlc3QgfHwgc3RhdGUucGlwZXNDb3VudCA+IDEgJiYgaW5kZXhPZihzdGF0ZS5waXBlcywgZGVzdCkgIT09IC0xKSAmJiAhY2xlYW5lZFVwKSB7XG4gICAgICAgIGRlYnVnKCdmYWxzZSB3cml0ZSByZXNwb25zZSwgcGF1c2UnLCBzcmMuX3JlYWRhYmxlU3RhdGUuYXdhaXREcmFpbik7XG4gICAgICAgIHNyYy5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKys7XG4gICAgICAgIGluY3JlYXNlZEF3YWl0RHJhaW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgc3JjLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIGRlc3QgaGFzIGFuIGVycm9yLCB0aGVuIHN0b3AgcGlwaW5nIGludG8gaXQuXG4gIC8vIGhvd2V2ZXIsIGRvbid0IHN1cHByZXNzIHRoZSB0aHJvd2luZyBiZWhhdmlvciBmb3IgdGhpcy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGRlYnVnKCdvbmVycm9yJywgZXIpO1xuICAgIHVucGlwZSgpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgaWYgKEVFbGlzdGVuZXJDb3VudChkZXN0LCAnZXJyb3InKSA9PT0gMCkgZGVzdC5lbWl0KCdlcnJvcicsIGVyKTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBvdXIgZXJyb3IgaGFuZGxlciBpcyBhdHRhY2hlZCBiZWZvcmUgdXNlcmxhbmQgb25lcy5cbiAgcHJlcGVuZExpc3RlbmVyKGRlc3QsICdlcnJvcicsIG9uZXJyb3IpO1xuXG4gIC8vIEJvdGggY2xvc2UgYW5kIGZpbmlzaCBzaG91bGQgdHJpZ2dlciB1bnBpcGUsIGJ1dCBvbmx5IG9uY2UuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIHVucGlwZSgpO1xuICB9XG4gIGRlc3Qub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgZnVuY3Rpb24gb25maW5pc2goKSB7XG4gICAgZGVidWcoJ29uZmluaXNoJyk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICB1bnBpcGUoKTtcbiAgfVxuICBkZXN0Lm9uY2UoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcblxuICBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgZGVidWcoJ3VucGlwZScpO1xuICAgIHNyYy51bnBpcGUoZGVzdCk7XG4gIH1cblxuICAvLyB0ZWxsIHRoZSBkZXN0IHRoYXQgaXQncyBiZWluZyBwaXBlZCB0b1xuICBkZXN0LmVtaXQoJ3BpcGUnLCBzcmMpO1xuXG4gIC8vIHN0YXJ0IHRoZSBmbG93IGlmIGl0IGhhc24ndCBiZWVuIHN0YXJ0ZWQgYWxyZWFkeS5cbiAgaWYgKCFzdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3BpcGUgcmVzdW1lJyk7XG4gICAgc3JjLnJlc3VtZSgpO1xuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5mdW5jdGlvbiBwaXBlT25EcmFpbihzcmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gICAgZGVidWcoJ3BpcGVPbkRyYWluJywgc3RhdGUuYXdhaXREcmFpbik7XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4pIHN0YXRlLmF3YWl0RHJhaW4tLTtcbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbiA9PT0gMCAmJiBFRWxpc3RlbmVyQ291bnQoc3JjLCAnZGF0YScpKSB7XG4gICAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTtcbiAgICAgIGZsb3coc3JjKTtcbiAgICB9XG4gIH07XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiAoZGVzdCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgdW5waXBlSW5mbyA9IHsgaGFzVW5waXBlZDogZmFsc2UgfTtcblxuICAvLyBpZiB3ZSdyZSBub3QgcGlwaW5nIGFueXdoZXJlLCB0aGVuIGRvIG5vdGhpbmcuXG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAwKSByZXR1cm4gdGhpcztcblxuICAvLyBqdXN0IG9uZSBkZXN0aW5hdGlvbi4gIG1vc3QgY29tbW9uIGNhc2UuXG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKSB7XG4gICAgLy8gcGFzc2VkIGluIG9uZSwgYnV0IGl0J3Mgbm90IHRoZSByaWdodCBvbmUuXG4gICAgaWYgKGRlc3QgJiYgZGVzdCAhPT0gc3RhdGUucGlwZXMpIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKCFkZXN0KSBkZXN0ID0gc3RhdGUucGlwZXM7XG5cbiAgICAvLyBnb3QgYSBtYXRjaC5cbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuICAgIGlmIChkZXN0KSBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc2xvdyBjYXNlLiBtdWx0aXBsZSBwaXBlIGRlc3RpbmF0aW9ucy5cblxuICBpZiAoIWRlc3QpIHtcbiAgICAvLyByZW1vdmUgYWxsLlxuICAgIHZhciBkZXN0cyA9IHN0YXRlLnBpcGVzO1xuICAgIHZhciBsZW4gPSBzdGF0ZS5waXBlc0NvdW50O1xuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkZXN0c1tpXS5lbWl0KCd1bnBpcGUnLCB0aGlzLCB1bnBpcGVJbmZvKTtcbiAgICB9cmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB0cnkgdG8gZmluZCB0aGUgcmlnaHQgb25lLlxuICB2YXIgaW5kZXggPSBpbmRleE9mKHN0YXRlLnBpcGVzLCBkZXN0KTtcbiAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuIHRoaXM7XG5cbiAgc3RhdGUucGlwZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgc3RhdGUucGlwZXNDb3VudCAtPSAxO1xuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSkgc3RhdGUucGlwZXMgPSBzdGF0ZS5waXBlc1swXTtcblxuICBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gc2V0IHVwIGRhdGEgZXZlbnRzIGlmIHRoZXkgYXJlIGFza2VkIGZvclxuLy8gRW5zdXJlIHJlYWRhYmxlIGxpc3RlbmVycyBldmVudHVhbGx5IGdldCBzb21ldGhpbmdcblJlYWRhYmxlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldiwgZm4pIHtcbiAgdmFyIHJlcyA9IFN0cmVhbS5wcm90b3R5cGUub24uY2FsbCh0aGlzLCBldiwgZm4pO1xuXG4gIGlmIChldiA9PT0gJ2RhdGEnKSB7XG4gICAgLy8gU3RhcnQgZmxvd2luZyBvbiBuZXh0IHRpY2sgaWYgc3RyZWFtIGlzbid0IGV4cGxpY2l0bHkgcGF1c2VkXG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyAhPT0gZmFsc2UpIHRoaXMucmVzdW1lKCk7XG4gIH0gZWxzZSBpZiAoZXYgPT09ICdyZWFkYWJsZScpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiAhc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcpIHtcbiAgICAgIHN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nID0gc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKCFzdGF0ZS5yZWFkaW5nKSB7XG4gICAgICAgIHByb2Nlc3NOZXh0VGljayhuUmVhZGluZ05leHRUaWNrLCB0aGlzKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGVuZ3RoKSB7XG4gICAgICAgIGVtaXRSZWFkYWJsZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblJlYWRhYmxlLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IFJlYWRhYmxlLnByb3RvdHlwZS5vbjtcblxuZnVuY3Rpb24gblJlYWRpbmdOZXh0VGljayhzZWxmKSB7XG4gIGRlYnVnKCdyZWFkYWJsZSBuZXh0dGljayByZWFkIDAnKTtcbiAgc2VsZi5yZWFkKDApO1xufVxuXG4vLyBwYXVzZSgpIGFuZCByZXN1bWUoKSBhcmUgcmVtbmFudHMgb2YgdGhlIGxlZ2FjeSByZWFkYWJsZSBzdHJlYW0gQVBJXG4vLyBJZiB0aGUgdXNlciB1c2VzIHRoZW0sIHRoZW4gc3dpdGNoIGludG8gb2xkIG1vZGUuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICBpZiAoIXN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncmVzdW1lJyk7XG4gICAgc3RhdGUuZmxvd2luZyA9IHRydWU7XG4gICAgcmVzdW1lKHRoaXMsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHJlc3VtZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVzdW1lU2NoZWR1bGVkKSB7XG4gICAgc3RhdGUucmVzdW1lU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzTmV4dFRpY2socmVzdW1lXywgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzdW1lXyhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVhZGluZykge1xuICAgIGRlYnVnKCdyZXN1bWUgcmVhZCAwJyk7XG4gICAgc3RyZWFtLnJlYWQoMCk7XG4gIH1cblxuICBzdGF0ZS5yZXN1bWVTY2hlZHVsZWQgPSBmYWxzZTtcbiAgc3RhdGUuYXdhaXREcmFpbiA9IDA7XG4gIHN0cmVhbS5lbWl0KCdyZXN1bWUnKTtcbiAgZmxvdyhzdHJlYW0pO1xuICBpZiAoc3RhdGUuZmxvd2luZyAmJiAhc3RhdGUucmVhZGluZykgc3RyZWFtLnJlYWQoMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NhbGwgcGF1c2UgZmxvd2luZz0laicsIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyk7XG4gIGlmIChmYWxzZSAhPT0gdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3BhdXNlJyk7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwYXVzZScpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZmxvdyhzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBkZWJ1ZygnZmxvdycsIHN0YXRlLmZsb3dpbmcpO1xuICB3aGlsZSAoc3RhdGUuZmxvd2luZyAmJiBzdHJlYW0ucmVhZCgpICE9PSBudWxsKSB7fVxufVxuXG4vLyB3cmFwIGFuIG9sZC1zdHlsZSBzdHJlYW0gYXMgdGhlIGFzeW5jIGRhdGEgc291cmNlLlxuLy8gVGhpcyBpcyAqbm90KiBwYXJ0IG9mIHRoZSByZWFkYWJsZSBzdHJlYW0gaW50ZXJmYWNlLlxuLy8gSXQgaXMgYW4gdWdseSB1bmZvcnR1bmF0ZSBtZXNzIG9mIGhpc3RvcnkuXG5SZWFkYWJsZS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZW5kJyk7XG4gICAgaWYgKHN0YXRlLmRlY29kZXIgJiYgIXN0YXRlLmVuZGVkKSB7XG4gICAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgICAgaWYgKGNodW5rICYmIGNodW5rLmxlbmd0aCkgc2VsZi5wdXNoKGNodW5rKTtcbiAgICB9XG5cbiAgICBzZWxmLnB1c2gobnVsbCk7XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgIGRlYnVnKCd3cmFwcGVkIGRhdGEnKTtcbiAgICBpZiAoc3RhdGUuZGVjb2RlcikgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLndyaXRlKGNodW5rKTtcblxuICAgIC8vIGRvbid0IHNraXAgb3ZlciBmYWxzeSB2YWx1ZXMgaW4gb2JqZWN0TW9kZVxuICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlICYmIChjaHVuayA9PT0gbnVsbCB8fCBjaHVuayA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO2Vsc2UgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmICghY2h1bmsgfHwgIWNodW5rLmxlbmd0aCkpIHJldHVybjtcblxuICAgIHZhciByZXQgPSBzZWxmLnB1c2goY2h1bmspO1xuICAgIGlmICghcmV0KSB7XG4gICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLnBhdXNlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBwcm94eSBhbGwgdGhlIG90aGVyIG1ldGhvZHMuXG4gIC8vIGltcG9ydGFudCB3aGVuIHdyYXBwaW5nIGZpbHRlcnMgYW5kIGR1cGxleGVzLlxuICBmb3IgKHZhciBpIGluIHN0cmVhbSkge1xuICAgIGlmICh0aGlzW2ldID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHN0cmVhbVtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1tpXSA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc3RyZWFtW21ldGhvZF0uYXBwbHkoc3RyZWFtLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfShpKTtcbiAgICB9XG4gIH1cblxuICAvLyBwcm94eSBjZXJ0YWluIGltcG9ydGFudCBldmVudHMuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwga1Byb3h5RXZlbnRzLmxlbmd0aDsgbisrKSB7XG4gICAgc3RyZWFtLm9uKGtQcm94eUV2ZW50c1tuXSwgc2VsZi5lbWl0LmJpbmQoc2VsZiwga1Byb3h5RXZlbnRzW25dKSk7XG4gIH1cblxuICAvLyB3aGVuIHdlIHRyeSB0byBjb25zdW1lIHNvbWUgbW9yZSBieXRlcywgc2ltcGx5IHVucGF1c2UgdGhlXG4gIC8vIHVuZGVybHlpbmcgc3RyZWFtLlxuICBzZWxmLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgICBkZWJ1Zygnd3JhcHBlZCBfcmVhZCcsIG4pO1xuICAgIGlmIChwYXVzZWQpIHtcbiAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgc3RyZWFtLnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VsZjtcbn07XG5cbi8vIGV4cG9zZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS5cblJlYWRhYmxlLl9mcm9tTGlzdCA9IGZyb21MaXN0O1xuXG4vLyBQbHVjayBvZmYgbiBieXRlcyBmcm9tIGFuIGFycmF5IG9mIGJ1ZmZlcnMuXG4vLyBMZW5ndGggaXMgdGhlIGNvbWJpbmVkIGxlbmd0aHMgb2YgYWxsIHRoZSBidWZmZXJzIGluIHRoZSBsaXN0LlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBmcm9tTGlzdChuLCBzdGF0ZSkge1xuICAvLyBub3RoaW5nIGJ1ZmZlcmVkXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHZhciByZXQ7XG4gIGlmIChzdGF0ZS5vYmplY3RNb2RlKSByZXQgPSBzdGF0ZS5idWZmZXIuc2hpZnQoKTtlbHNlIGlmICghbiB8fCBuID49IHN0YXRlLmxlbmd0aCkge1xuICAgIC8vIHJlYWQgaXQgYWxsLCB0cnVuY2F0ZSB0aGUgbGlzdFxuICAgIGlmIChzdGF0ZS5kZWNvZGVyKSByZXQgPSBzdGF0ZS5idWZmZXIuam9pbignJyk7ZWxzZSBpZiAoc3RhdGUuYnVmZmVyLmxlbmd0aCA9PT0gMSkgcmV0ID0gc3RhdGUuYnVmZmVyLmhlYWQuZGF0YTtlbHNlIHJldCA9IHN0YXRlLmJ1ZmZlci5jb25jYXQoc3RhdGUubGVuZ3RoKTtcbiAgICBzdGF0ZS5idWZmZXIuY2xlYXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZWFkIHBhcnQgb2YgbGlzdFxuICAgIHJldCA9IGZyb21MaXN0UGFydGlhbChuLCBzdGF0ZS5idWZmZXIsIHN0YXRlLmRlY29kZXIpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gRXh0cmFjdHMgb25seSBlbm91Z2ggYnVmZmVyZWQgZGF0YSB0byBzYXRpc2Z5IHRoZSBhbW91bnQgcmVxdWVzdGVkLlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBmcm9tTGlzdFBhcnRpYWwobiwgbGlzdCwgaGFzU3RyaW5ncykge1xuICB2YXIgcmV0O1xuICBpZiAobiA8IGxpc3QuaGVhZC5kYXRhLmxlbmd0aCkge1xuICAgIC8vIHNsaWNlIGlzIHRoZSBzYW1lIGZvciBidWZmZXJzIGFuZCBzdHJpbmdzXG4gICAgcmV0ID0gbGlzdC5oZWFkLmRhdGEuc2xpY2UoMCwgbik7XG4gICAgbGlzdC5oZWFkLmRhdGEgPSBsaXN0LmhlYWQuZGF0YS5zbGljZShuKTtcbiAgfSBlbHNlIGlmIChuID09PSBsaXN0LmhlYWQuZGF0YS5sZW5ndGgpIHtcbiAgICAvLyBmaXJzdCBjaHVuayBpcyBhIHBlcmZlY3QgbWF0Y2hcbiAgICByZXQgPSBsaXN0LnNoaWZ0KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmVzdWx0IHNwYW5zIG1vcmUgdGhhbiBvbmUgYnVmZmVyXG4gICAgcmV0ID0gaGFzU3RyaW5ncyA/IGNvcHlGcm9tQnVmZmVyU3RyaW5nKG4sIGxpc3QpIDogY29weUZyb21CdWZmZXIobiwgbGlzdCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gQ29waWVzIGEgc3BlY2lmaWVkIGFtb3VudCBvZiBjaGFyYWN0ZXJzIGZyb20gdGhlIGxpc3Qgb2YgYnVmZmVyZWQgZGF0YVxuLy8gY2h1bmtzLlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBjb3B5RnJvbUJ1ZmZlclN0cmluZyhuLCBsaXN0KSB7XG4gIHZhciBwID0gbGlzdC5oZWFkO1xuICB2YXIgYyA9IDE7XG4gIHZhciByZXQgPSBwLmRhdGE7XG4gIG4gLT0gcmV0Lmxlbmd0aDtcbiAgd2hpbGUgKHAgPSBwLm5leHQpIHtcbiAgICB2YXIgc3RyID0gcC5kYXRhO1xuICAgIHZhciBuYiA9IG4gPiBzdHIubGVuZ3RoID8gc3RyLmxlbmd0aCA6IG47XG4gICAgaWYgKG5iID09PSBzdHIubGVuZ3RoKSByZXQgKz0gc3RyO2Vsc2UgcmV0ICs9IHN0ci5zbGljZSgwLCBuKTtcbiAgICBuIC09IG5iO1xuICAgIGlmIChuID09PSAwKSB7XG4gICAgICBpZiAobmIgPT09IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgKytjO1xuICAgICAgICBpZiAocC5uZXh0KSBsaXN0LmhlYWQgPSBwLm5leHQ7ZWxzZSBsaXN0LmhlYWQgPSBsaXN0LnRhaWwgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdC5oZWFkID0gcDtcbiAgICAgICAgcC5kYXRhID0gc3RyLnNsaWNlKG5iKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICArK2M7XG4gIH1cbiAgbGlzdC5sZW5ndGggLT0gYztcbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gQ29waWVzIGEgc3BlY2lmaWVkIGFtb3VudCBvZiBieXRlcyBmcm9tIHRoZSBsaXN0IG9mIGJ1ZmZlcmVkIGRhdGEgY2h1bmtzLlxuLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5mdW5jdGlvbiBjb3B5RnJvbUJ1ZmZlcihuLCBsaXN0KSB7XG4gIHZhciByZXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobik7XG4gIHZhciBwID0gbGlzdC5oZWFkO1xuICB2YXIgYyA9IDE7XG4gIHAuZGF0YS5jb3B5KHJldCk7XG4gIG4gLT0gcC5kYXRhLmxlbmd0aDtcbiAgd2hpbGUgKHAgPSBwLm5leHQpIHtcbiAgICB2YXIgYnVmID0gcC5kYXRhO1xuICAgIHZhciBuYiA9IG4gPiBidWYubGVuZ3RoID8gYnVmLmxlbmd0aCA6IG47XG4gICAgYnVmLmNvcHkocmV0LCByZXQubGVuZ3RoIC0gbiwgMCwgbmIpO1xuICAgIG4gLT0gbmI7XG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIGlmIChuYiA9PT0gYnVmLmxlbmd0aCkge1xuICAgICAgICArK2M7XG4gICAgICAgIGlmIChwLm5leHQpIGxpc3QuaGVhZCA9IHAubmV4dDtlbHNlIGxpc3QuaGVhZCA9IGxpc3QudGFpbCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0LmhlYWQgPSBwO1xuICAgICAgICBwLmRhdGEgPSBidWYuc2xpY2UobmIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgICsrYztcbiAgfVxuICBsaXN0Lmxlbmd0aCAtPSBjO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBlbmRSZWFkYWJsZShzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuXG4gIC8vIElmIHdlIGdldCBoZXJlIGJlZm9yZSBjb25zdW1pbmcgYWxsIHRoZSBieXRlcywgdGhlbiB0aGF0IGlzIGFcbiAgLy8gYnVnIGluIG5vZGUuICBTaG91bGQgbmV2ZXIgaGFwcGVuLlxuICBpZiAoc3RhdGUubGVuZ3RoID4gMCkgdGhyb3cgbmV3IEVycm9yKCdcImVuZFJlYWRhYmxlKClcIiBjYWxsZWQgb24gbm9uLWVtcHR5IHN0cmVhbScpO1xuXG4gIGlmICghc3RhdGUuZW5kRW1pdHRlZCkge1xuICAgIHN0YXRlLmVuZGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzTmV4dFRpY2soZW5kUmVhZGFibGVOVCwgc3RhdGUsIHN0cmVhbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kUmVhZGFibGVOVChzdGF0ZSwgc3RyZWFtKSB7XG4gIC8vIENoZWNrIHRoYXQgd2UgZGlkbid0IGdldCBvbmUgbGFzdCB1bnNoaWZ0LlxuICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQgJiYgc3RhdGUubGVuZ3RoID09PSAwKSB7XG4gICAgc3RhdGUuZW5kRW1pdHRlZCA9IHRydWU7XG4gICAgc3RyZWFtLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgc3RyZWFtLmVtaXQoJ2VuZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2goeHMsIGYpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmKHhzW2ldLCBpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmRleE9mKHhzLCB4KSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHhzW2ldID09PSB4KSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9yZWFkYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbS1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIHByb2Nlc3NOZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MtbmV4dGljay1hcmdzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLy8gdW5kb2N1bWVudGVkIGNiKCkgQVBJLCBuZWVkZWQgZm9yIGNvcmUsIG5vdCBmb3IgcHVibGljIEFQSVxuZnVuY3Rpb24gZGVzdHJveShlcnIsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHJlYWRhYmxlRGVzdHJveWVkID0gdGhpcy5fcmVhZGFibGVTdGF0ZSAmJiB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgdmFyIHdyaXRhYmxlRGVzdHJveWVkID0gdGhpcy5fd3JpdGFibGVTdGF0ZSAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZDtcblxuICBpZiAocmVhZGFibGVEZXN0cm95ZWQgfHwgd3JpdGFibGVEZXN0cm95ZWQpIHtcbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfSBlbHNlIGlmIChlcnIgJiYgKCF0aGlzLl93cml0YWJsZVN0YXRlIHx8ICF0aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCkpIHtcbiAgICAgIHByb2Nlc3NOZXh0VGljayhlbWl0RXJyb3JOVCwgdGhpcywgZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gd2Ugc2V0IGRlc3Ryb3llZCB0byB0cnVlIGJlZm9yZSBmaXJpbmcgZXJyb3IgY2FsbGJhY2tzIGluIG9yZGVyXG4gIC8vIHRvIG1ha2UgaXQgcmUtZW50cmFuY2Ugc2FmZSBpbiBjYXNlIGRlc3Ryb3koKSBpcyBjYWxsZWQgd2l0aGluIGNhbGxiYWNrc1xuXG4gIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gaWYgdGhpcyBpcyBhIGR1cGxleCBzdHJlYW0gbWFyayB0aGUgd3JpdGFibGUgcGFydCBhcyBkZXN0cm95ZWQgYXMgd2VsbFxuICBpZiAodGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuX2Rlc3Ryb3koZXJyIHx8IG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoIWNiICYmIGVycikge1xuICAgICAgcHJvY2Vzc05leHRUaWNrKGVtaXRFcnJvck5ULCBfdGhpcywgZXJyKTtcbiAgICAgIGlmIChfdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgICBfdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2IpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdW5kZXN0cm95KCkge1xuICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVuZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRFcnJvck5UKHNlbGYsIGVycikge1xuICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gIHVuZGVzdHJveTogdW5kZXN0cm95XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG5cbnZhciBpc0VuY29kaW5nID0gQnVmZmVyLmlzRW5jb2RpbmcgfHwgZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIGVuY29kaW5nID0gJycgKyBlbmNvZGluZztcbiAgc3dpdGNoIChlbmNvZGluZyAmJiBlbmNvZGluZy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpjYXNlICd1dGY4JzpjYXNlICd1dGYtOCc6Y2FzZSAnYXNjaWknOmNhc2UgJ2JpbmFyeSc6Y2FzZSAnYmFzZTY0JzpjYXNlICd1Y3MyJzpjYXNlICd1Y3MtMic6Y2FzZSAndXRmMTZsZSc6Y2FzZSAndXRmLTE2bGUnOmNhc2UgJ3Jhdyc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfbm9ybWFsaXplRW5jb2RpbmcoZW5jKSB7XG4gIGlmICghZW5jKSByZXR1cm4gJ3V0ZjgnO1xuICB2YXIgcmV0cmllZDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuYykge1xuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiAndXRmOCc7XG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gJ3V0ZjE2bGUnO1xuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiAnbGF0aW4xJztcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gZW5jO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHJldHJpZWQpIHJldHVybjsgLy8gdW5kZWZpbmVkXG4gICAgICAgIGVuYyA9ICgnJyArIGVuYykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0cmllZCA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vLyBEbyBub3QgY2FjaGUgYEJ1ZmZlci5pc0VuY29kaW5nYCB3aGVuIGNoZWNraW5nIGVuY29kaW5nIG5hbWVzIGFzIHNvbWVcbi8vIG1vZHVsZXMgbW9ua2V5LXBhdGNoIGl0IHRvIHN1cHBvcnQgYWRkaXRpb25hbCBlbmNvZGluZ3NcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVuY29kaW5nKGVuYykge1xuICB2YXIgbmVuYyA9IF9ub3JtYWxpemVFbmNvZGluZyhlbmMpO1xuICBpZiAodHlwZW9mIG5lbmMgIT09ICdzdHJpbmcnICYmIChCdWZmZXIuaXNFbmNvZGluZyA9PT0gaXNFbmNvZGluZyB8fCAhaXNFbmNvZGluZyhlbmMpKSkgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jKTtcbiAgcmV0dXJuIG5lbmMgfHwgZW5jO1xufVxuXG4vLyBTdHJpbmdEZWNvZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgZWZmaWNpZW50bHkgc3BsaXR0aW5nIGEgc2VyaWVzIG9mXG4vLyBidWZmZXJzIGludG8gYSBzZXJpZXMgb2YgSlMgc3RyaW5ncyB3aXRob3V0IGJyZWFraW5nIGFwYXJ0IG11bHRpLWJ5dGVcbi8vIGNoYXJhY3RlcnMuXG5leHBvcnRzLlN0cmluZ0RlY29kZXIgPSBTdHJpbmdEZWNvZGVyO1xuZnVuY3Rpb24gU3RyaW5nRGVjb2RlcihlbmNvZGluZykge1xuICB0aGlzLmVuY29kaW5nID0gbm9ybWFsaXplRW5jb2RpbmcoZW5jb2RpbmcpO1xuICB2YXIgbmI7XG4gIHN3aXRjaCAodGhpcy5lbmNvZGluZykge1xuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgdGhpcy50ZXh0ID0gdXRmMTZUZXh0O1xuICAgICAgdGhpcy5lbmQgPSB1dGYxNkVuZDtcbiAgICAgIG5iID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgdGhpcy5maWxsTGFzdCA9IHV0ZjhGaWxsTGFzdDtcbiAgICAgIG5iID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICB0aGlzLnRleHQgPSBiYXNlNjRUZXh0O1xuICAgICAgdGhpcy5lbmQgPSBiYXNlNjRFbmQ7XG4gICAgICBuYiA9IDM7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy53cml0ZSA9IHNpbXBsZVdyaXRlO1xuICAgICAgdGhpcy5lbmQgPSBzaW1wbGVFbmQ7XG4gICAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDA7XG4gIHRoaXMubGFzdFRvdGFsID0gMDtcbiAgdGhpcy5sYXN0Q2hhciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuYik7XG59XG5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGJ1Zikge1xuICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuICB2YXIgcjtcbiAgdmFyIGk7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgciA9IHRoaXMuZmlsbExhc3QoYnVmKTtcbiAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJyc7XG4gICAgaSA9IHRoaXMubGFzdE5lZWQ7XG4gICAgdGhpcy5sYXN0TmVlZCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgaSA9IDA7XG4gIH1cbiAgaWYgKGkgPCBidWYubGVuZ3RoKSByZXR1cm4gciA/IHIgKyB0aGlzLnRleHQoYnVmLCBpKSA6IHRoaXMudGV4dChidWYsIGkpO1xuICByZXR1cm4gciB8fCAnJztcbn07XG5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmVuZCA9IHV0ZjhFbmQ7XG5cbi8vIFJldHVybnMgb25seSBjb21wbGV0ZSBjaGFyYWN0ZXJzIGluIGEgQnVmZmVyXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS50ZXh0ID0gdXRmOFRleHQ7XG5cbi8vIEF0dGVtcHRzIHRvIGNvbXBsZXRlIGEgcGFydGlhbCBub24tVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmZpbGxMYXN0ID0gZnVuY3Rpb24gKGJ1Zikge1xuICBpZiAodGhpcy5sYXN0TmVlZCA8PSBidWYubGVuZ3RoKSB7XG4gICAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkLCAwLCBidWYubGVuZ3RoKTtcbiAgdGhpcy5sYXN0TmVlZCAtPSBidWYubGVuZ3RoO1xufTtcblxuLy8gQ2hlY2tzIHRoZSB0eXBlIG9mIGEgVVRGLTggYnl0ZSwgd2hldGhlciBpdCdzIEFTQ0lJLCBhIGxlYWRpbmcgYnl0ZSwgb3IgYVxuLy8gY29udGludWF0aW9uIGJ5dGUuXG5mdW5jdGlvbiB1dGY4Q2hlY2tCeXRlKGJ5dGUpIHtcbiAgaWYgKGJ5dGUgPD0gMHg3RikgcmV0dXJuIDA7ZWxzZSBpZiAoYnl0ZSA+PiA1ID09PSAweDA2KSByZXR1cm4gMjtlbHNlIGlmIChieXRlID4+IDQgPT09IDB4MEUpIHJldHVybiAzO2Vsc2UgaWYgKGJ5dGUgPj4gMyA9PT0gMHgxRSkgcmV0dXJuIDQ7XG4gIHJldHVybiAtMTtcbn1cblxuLy8gQ2hlY2tzIGF0IG1vc3QgMyBieXRlcyBhdCB0aGUgZW5kIG9mIGEgQnVmZmVyIGluIG9yZGVyIHRvIGRldGVjdCBhblxuLy8gaW5jb21wbGV0ZSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3Rlci4gVGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyAoMiwgMywgb3IgNClcbi8vIG5lZWRlZCB0byBjb21wbGV0ZSB0aGUgVVRGLTggY2hhcmFjdGVyIChpZiBhcHBsaWNhYmxlKSBhcmUgcmV0dXJuZWQuXG5mdW5jdGlvbiB1dGY4Q2hlY2tJbmNvbXBsZXRlKHNlbGYsIGJ1ZiwgaSkge1xuICB2YXIgaiA9IGJ1Zi5sZW5ndGggLSAxO1xuICBpZiAoaiA8IGkpIHJldHVybiAwO1xuICB2YXIgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkgc2VsZi5sYXN0TmVlZCA9IG5iIC0gMTtcbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgaWYgKC0taiA8IGkpIHJldHVybiAwO1xuICBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAyO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSkgcmV0dXJuIDA7XG4gIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHtcbiAgICAgIGlmIChuYiA9PT0gMikgbmIgPSAwO2Vsc2Ugc2VsZi5sYXN0TmVlZCA9IG5iIC0gMztcbiAgICB9XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG4vLyBWYWxpZGF0ZXMgYXMgbWFueSBjb250aW51YXRpb24gYnl0ZXMgZm9yIGEgbXVsdGktYnl0ZSBVVEYtOCBjaGFyYWN0ZXIgYXNcbi8vIG5lZWRlZCBvciBhcmUgYXZhaWxhYmxlLiBJZiB3ZSBzZWUgYSBub24tY29udGludWF0aW9uIGJ5dGUgd2hlcmUgd2UgZXhwZWN0XG4vLyBvbmUsIHdlIFwicmVwbGFjZVwiIHRoZSB2YWxpZGF0ZWQgY29udGludWF0aW9uIGJ5dGVzIHdlJ3ZlIHNlZW4gc28gZmFyIHdpdGhcbi8vIFVURi04IHJlcGxhY2VtZW50IGNoYXJhY3RlcnMgKCdcXHVmZmZkJyksIHRvIG1hdGNoIHY4J3MgVVRGLTggZGVjb2Rpbmdcbi8vIGJlaGF2aW9yLiBUaGUgY29udGludWF0aW9uIGJ5dGUgY2hlY2sgaXMgaW5jbHVkZWQgdGhyZWUgdGltZXMgaW4gdGhlIGNhc2Vcbi8vIHdoZXJlIGFsbCBvZiB0aGUgY29udGludWF0aW9uIGJ5dGVzIGZvciBhIGNoYXJhY3RlciBleGlzdCBpbiB0aGUgc2FtZSBidWZmZXIuXG4vLyBJdCBpcyBhbHNvIGRvbmUgdGhpcyB3YXkgYXMgYSBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UgaW5zdGVhZCBvZiB1c2luZyBhXG4vLyBsb29wLlxuZnVuY3Rpb24gdXRmOENoZWNrRXh0cmFCeXRlcyhzZWxmLCBidWYsIHApIHtcbiAgaWYgKChidWZbMF0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgIHNlbGYubGFzdE5lZWQgPSAwO1xuICAgIHJldHVybiAnXFx1ZmZmZCcucmVwZWF0KHApO1xuICB9XG4gIGlmIChzZWxmLmxhc3ROZWVkID4gMSAmJiBidWYubGVuZ3RoID4gMSkge1xuICAgIGlmICgoYnVmWzFdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgIHNlbGYubGFzdE5lZWQgPSAxO1xuICAgICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCArIDEpO1xuICAgIH1cbiAgICBpZiAoc2VsZi5sYXN0TmVlZCA+IDIgJiYgYnVmLmxlbmd0aCA+IDIpIHtcbiAgICAgIGlmICgoYnVmWzJdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgICAgc2VsZi5sYXN0TmVlZCA9IDI7XG4gICAgICAgIHJldHVybiAnXFx1ZmZmZCcucmVwZWF0KHAgKyAyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gQXR0ZW1wdHMgdG8gY29tcGxldGUgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciB1c2luZyBieXRlcyBmcm9tIGEgQnVmZmVyLlxuZnVuY3Rpb24gdXRmOEZpbGxMYXN0KGJ1Zikge1xuICB2YXIgcCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgdmFyIHIgPSB1dGY4Q2hlY2tFeHRyYUJ5dGVzKHRoaXMsIGJ1ZiwgcCk7XG4gIGlmIChyICE9PSB1bmRlZmluZWQpIHJldHVybiByO1xuICBpZiAodGhpcy5sYXN0TmVlZCA8PSBidWYubGVuZ3RoKSB7XG4gICAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgdGhpcy5sYXN0TmVlZCk7XG4gICAgcmV0dXJuIHRoaXMubGFzdENoYXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgdGhpcy5sYXN0VG90YWwpO1xuICB9XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHAsIDAsIGJ1Zi5sZW5ndGgpO1xuICB0aGlzLmxhc3ROZWVkIC09IGJ1Zi5sZW5ndGg7XG59XG5cbi8vIFJldHVybnMgYWxsIGNvbXBsZXRlIFVURi04IGNoYXJhY3RlcnMgaW4gYSBCdWZmZXIuIElmIHRoZSBCdWZmZXIgZW5kZWQgb24gYVxuLy8gcGFydGlhbCBjaGFyYWN0ZXIsIHRoZSBjaGFyYWN0ZXIncyBieXRlcyBhcmUgYnVmZmVyZWQgdW50aWwgdGhlIHJlcXVpcmVkXG4vLyBudW1iZXIgb2YgYnl0ZXMgYXJlIGF2YWlsYWJsZS5cbmZ1bmN0aW9uIHV0ZjhUZXh0KGJ1ZiwgaSkge1xuICB2YXIgdG90YWwgPSB1dGY4Q2hlY2tJbmNvbXBsZXRlKHRoaXMsIGJ1ZiwgaSk7XG4gIGlmICghdGhpcy5sYXN0TmVlZCkgcmV0dXJuIGJ1Zi50b1N0cmluZygndXRmOCcsIGkpO1xuICB0aGlzLmxhc3RUb3RhbCA9IHRvdGFsO1xuICB2YXIgZW5kID0gYnVmLmxlbmd0aCAtICh0b3RhbCAtIHRoaXMubGFzdE5lZWQpO1xuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCAwLCBlbmQpO1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSwgZW5kKTtcbn1cblxuLy8gRm9yIFVURi04LCBhIHJlcGxhY2VtZW50IGNoYXJhY3RlciBmb3IgZWFjaCBidWZmZXJlZCBieXRlIG9mIGEgKHBhcnRpYWwpXG4vLyBjaGFyYWN0ZXIgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGhlIG91dHB1dC5cbmZ1bmN0aW9uIHV0ZjhFbmQoYnVmKSB7XG4gIHZhciByID0gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHJldHVybiByICsgJ1xcdWZmZmQnLnJlcGVhdCh0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQpO1xuICByZXR1cm4gcjtcbn1cblxuLy8gVVRGLTE2TEUgdHlwaWNhbGx5IG5lZWRzIHR3byBieXRlcyBwZXIgY2hhcmFjdGVyLCBidXQgZXZlbiBpZiB3ZSBoYXZlIGFuIGV2ZW5cbi8vIG51bWJlciBvZiBieXRlcyBhdmFpbGFibGUsIHdlIG5lZWQgdG8gY2hlY2sgaWYgd2UgZW5kIG9uIGEgbGVhZGluZy9oaWdoXG4vLyBzdXJyb2dhdGUuIEluIHRoYXQgY2FzZSwgd2UgbmVlZCB0byB3YWl0IGZvciB0aGUgbmV4dCB0d28gYnl0ZXMgaW4gb3JkZXIgdG9cbi8vIGRlY29kZSB0aGUgbGFzdCBjaGFyYWN0ZXIgcHJvcGVybHkuXG5mdW5jdGlvbiB1dGYxNlRleHQoYnVmLCBpKSB7XG4gIGlmICgoYnVmLmxlbmd0aCAtIGkpICUgMiA9PT0gMCkge1xuICAgIHZhciByID0gYnVmLnRvU3RyaW5nKCd1dGYxNmxlJywgaSk7XG4gICAgaWYgKHIpIHtcbiAgICAgIHZhciBjID0gci5jaGFyQ29kZUF0KHIubGVuZ3RoIC0gMSk7XG4gICAgICBpZiAoYyA+PSAweEQ4MDAgJiYgYyA8PSAweERCRkYpIHtcbiAgICAgICAgdGhpcy5sYXN0TmVlZCA9IDI7XG4gICAgICAgIHRoaXMubGFzdFRvdGFsID0gNDtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMl07XG4gICAgICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4gci5zbGljZSgwLCAtMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9XG4gIHRoaXMubGFzdE5lZWQgPSAxO1xuICB0aGlzLmxhc3RUb3RhbCA9IDI7XG4gIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGYxNmxlJywgaSwgYnVmLmxlbmd0aCAtIDEpO1xufVxuXG4vLyBGb3IgVVRGLTE2TEUgd2UgZG8gbm90IGV4cGxpY2l0bHkgYXBwZW5kIHNwZWNpYWwgcmVwbGFjZW1lbnQgY2hhcmFjdGVycyBpZiB3ZVxuLy8gZW5kIG9uIGEgcGFydGlhbCBjaGFyYWN0ZXIsIHdlIHNpbXBseSBsZXQgdjggaGFuZGxlIHRoYXQuXG5mdW5jdGlvbiB1dGYxNkVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkge1xuICAgIHZhciBlbmQgPSB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQ7XG4gICAgcmV0dXJuIHIgKyB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKCd1dGYxNmxlJywgMCwgZW5kKTtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gYmFzZTY0VGV4dChidWYsIGkpIHtcbiAgdmFyIG4gPSAoYnVmLmxlbmd0aCAtIGkpICUgMztcbiAgaWYgKG4gPT09IDApIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGkpO1xuICB0aGlzLmxhc3ROZWVkID0gMyAtIG47XG4gIHRoaXMubGFzdFRvdGFsID0gMztcbiAgaWYgKG4gPT09IDEpIHtcbiAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICB0aGlzLmxhc3RDaGFyWzFdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgfVxuICByZXR1cm4gYnVmLnRvU3RyaW5nKCdiYXNlNjQnLCBpLCBidWYubGVuZ3RoIC0gbik7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKCdiYXNlNjQnLCAwLCAzIC0gdGhpcy5sYXN0TmVlZCk7XG4gIHJldHVybiByO1xufVxuXG4vLyBQYXNzIGJ5dGVzIG9uIHRocm91Z2ggZm9yIHNpbmdsZS1ieXRlIGVuY29kaW5ncyAoZS5nLiBhc2NpaSwgbGF0aW4xLCBoZXgpXG5mdW5jdGlvbiBzaW1wbGVXcml0ZShidWYpIHtcbiAgcmV0dXJuIGJ1Zi50b1N0cmluZyh0aGlzLmVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlRW5kKGJ1Zikge1xuICByZXR1cm4gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvc3RyaW5nX2RlY29kZXIvbGliL3N0cmluZ19kZWNvZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gYSB0cmFuc2Zvcm0gc3RyZWFtIGlzIGEgcmVhZGFibGUvd3JpdGFibGUgc3RyZWFtIHdoZXJlIHlvdSBkb1xuLy8gc29tZXRoaW5nIHdpdGggdGhlIGRhdGEuICBTb21ldGltZXMgaXQncyBjYWxsZWQgYSBcImZpbHRlclwiLFxuLy8gYnV0IHRoYXQncyBub3QgYSBncmVhdCBuYW1lIGZvciBpdCwgc2luY2UgdGhhdCBpbXBsaWVzIGEgdGhpbmcgd2hlcmVcbi8vIHNvbWUgYml0cyBwYXNzIHRocm91Z2gsIGFuZCBvdGhlcnMgYXJlIHNpbXBseSBpZ25vcmVkLiAgKFRoYXQgd291bGRcbi8vIGJlIGEgdmFsaWQgZXhhbXBsZSBvZiBhIHRyYW5zZm9ybSwgb2YgY291cnNlLilcbi8vXG4vLyBXaGlsZSB0aGUgb3V0cHV0IGlzIGNhdXNhbGx5IHJlbGF0ZWQgdG8gdGhlIGlucHV0LCBpdCdzIG5vdCBhXG4vLyBuZWNlc3NhcmlseSBzeW1tZXRyaWMgb3Igc3luY2hyb25vdXMgdHJhbnNmb3JtYXRpb24uICBGb3IgZXhhbXBsZSxcbi8vIGEgemxpYiBzdHJlYW0gbWlnaHQgdGFrZSBtdWx0aXBsZSBwbGFpbi10ZXh0IHdyaXRlcygpLCBhbmQgdGhlblxuLy8gZW1pdCBhIHNpbmdsZSBjb21wcmVzc2VkIGNodW5rIHNvbWUgdGltZSBpbiB0aGUgZnV0dXJlLlxuLy9cbi8vIEhlcmUncyBob3cgdGhpcyB3b3Jrczpcbi8vXG4vLyBUaGUgVHJhbnNmb3JtIHN0cmVhbSBoYXMgYWxsIHRoZSBhc3BlY3RzIG9mIHRoZSByZWFkYWJsZSBhbmQgd3JpdGFibGVcbi8vIHN0cmVhbSBjbGFzc2VzLiAgV2hlbiB5b3Ugd3JpdGUoY2h1bmspLCB0aGF0IGNhbGxzIF93cml0ZShjaHVuayxjYilcbi8vIGludGVybmFsbHksIGFuZCByZXR1cm5zIGZhbHNlIGlmIHRoZXJlJ3MgYSBsb3Qgb2YgcGVuZGluZyB3cml0ZXNcbi8vIGJ1ZmZlcmVkIHVwLiAgV2hlbiB5b3UgY2FsbCByZWFkKCksIHRoYXQgY2FsbHMgX3JlYWQobikgdW50aWxcbi8vIHRoZXJlJ3MgZW5vdWdoIHBlbmRpbmcgcmVhZGFibGUgZGF0YSBidWZmZXJlZCB1cC5cbi8vXG4vLyBJbiBhIHRyYW5zZm9ybSBzdHJlYW0sIHRoZSB3cml0dGVuIGRhdGEgaXMgcGxhY2VkIGluIGEgYnVmZmVyLiAgV2hlblxuLy8gX3JlYWQobikgaXMgY2FsbGVkLCBpdCB0cmFuc2Zvcm1zIHRoZSBxdWV1ZWQgdXAgZGF0YSwgY2FsbGluZyB0aGVcbi8vIGJ1ZmZlcmVkIF93cml0ZSBjYidzIGFzIGl0IGNvbnN1bWVzIGNodW5rcy4gIElmIGNvbnN1bWluZyBhIHNpbmdsZVxuLy8gd3JpdHRlbiBjaHVuayB3b3VsZCByZXN1bHQgaW4gbXVsdGlwbGUgb3V0cHV0IGNodW5rcywgdGhlbiB0aGUgZmlyc3Rcbi8vIG91dHB1dHRlZCBiaXQgY2FsbHMgdGhlIHJlYWRjYiwgYW5kIHN1YnNlcXVlbnQgY2h1bmtzIGp1c3QgZ28gaW50b1xuLy8gdGhlIHJlYWQgYnVmZmVyLCBhbmQgd2lsbCBjYXVzZSBpdCB0byBlbWl0ICdyZWFkYWJsZScgaWYgbmVjZXNzYXJ5LlxuLy9cbi8vIFRoaXMgd2F5LCBiYWNrLXByZXNzdXJlIGlzIGFjdHVhbGx5IGRldGVybWluZWQgYnkgdGhlIHJlYWRpbmcgc2lkZSxcbi8vIHNpbmNlIF9yZWFkIGhhcyB0byBiZSBjYWxsZWQgdG8gc3RhcnQgcHJvY2Vzc2luZyBhIG5ldyBjaHVuay4gIEhvd2V2ZXIsXG4vLyBhIHBhdGhvbG9naWNhbCBpbmZsYXRlIHR5cGUgb2YgdHJhbnNmb3JtIGNhbiBjYXVzZSBleGNlc3NpdmUgYnVmZmVyaW5nXG4vLyBoZXJlLiAgRm9yIGV4YW1wbGUsIGltYWdpbmUgYSBzdHJlYW0gd2hlcmUgZXZlcnkgYnl0ZSBvZiBpbnB1dCBpc1xuLy8gaW50ZXJwcmV0ZWQgYXMgYW4gaW50ZWdlciBmcm9tIDAtMjU1LCBhbmQgdGhlbiByZXN1bHRzIGluIHRoYXQgbWFueVxuLy8gYnl0ZXMgb2Ygb3V0cHV0LiAgV3JpdGluZyB0aGUgNCBieXRlcyB7ZmYsZmYsZmYsZmZ9IHdvdWxkIHJlc3VsdCBpblxuLy8gMWtiIG9mIGRhdGEgYmVpbmcgb3V0cHV0LiAgSW4gdGhpcyBjYXNlLCB5b3UgY291bGQgd3JpdGUgYSB2ZXJ5IHNtYWxsXG4vLyBhbW91bnQgb2YgaW5wdXQsIGFuZCBlbmQgdXAgd2l0aCBhIHZlcnkgbGFyZ2UgYW1vdW50IG9mIG91dHB1dC4gIEluXG4vLyBzdWNoIGEgcGF0aG9sb2dpY2FsIGluZmxhdGluZyBtZWNoYW5pc20sIHRoZXJlJ2QgYmUgbm8gd2F5IHRvIHRlbGxcbi8vIHRoZSBzeXN0ZW0gdG8gc3RvcCBkb2luZyB0aGUgdHJhbnNmb3JtLiAgQSBzaW5nbGUgNE1CIHdyaXRlIGNvdWxkXG4vLyBjYXVzZSB0aGUgc3lzdGVtIHRvIHJ1biBvdXQgb2YgbWVtb3J5LlxuLy9cbi8vIEhvd2V2ZXIsIGV2ZW4gaW4gc3VjaCBhIHBhdGhvbG9naWNhbCBjYXNlLCBvbmx5IGEgc2luZ2xlIHdyaXR0ZW4gY2h1bmtcbi8vIHdvdWxkIGJlIGNvbnN1bWVkLCBhbmQgdGhlbiB0aGUgcmVzdCB3b3VsZCB3YWl0ICh1bi10cmFuc2Zvcm1lZCkgdW50aWxcbi8vIHRoZSByZXN1bHRzIG9mIHRoZSBwcmV2aW91cyB0cmFuc2Zvcm1lZCBjaHVuayB3ZXJlIGNvbnN1bWVkLlxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNmb3JtO1xuXG52YXIgRHVwbGV4ID0gcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoVHJhbnNmb3JtLCBEdXBsZXgpO1xuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdGF0ZShzdHJlYW0pIHtcbiAgdGhpcy5hZnRlclRyYW5zZm9ybSA9IGZ1bmN0aW9uIChlciwgZGF0YSkge1xuICAgIHJldHVybiBhZnRlclRyYW5zZm9ybShzdHJlYW0sIGVyLCBkYXRhKTtcbiAgfTtcblxuICB0aGlzLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcbiAgdGhpcy50cmFuc2Zvcm1pbmcgPSBmYWxzZTtcbiAgdGhpcy53cml0ZWNiID0gbnVsbDtcbiAgdGhpcy53cml0ZWNodW5rID0gbnVsbDtcbiAgdGhpcy53cml0ZWVuY29kaW5nID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gYWZ0ZXJUcmFuc2Zvcm0oc3RyZWFtLCBlciwgZGF0YSkge1xuICB2YXIgdHMgPSBzdHJlYW0uX3RyYW5zZm9ybVN0YXRlO1xuICB0cy50cmFuc2Zvcm1pbmcgPSBmYWxzZTtcblxuICB2YXIgY2IgPSB0cy53cml0ZWNiO1xuXG4gIGlmICghY2IpIHtcbiAgICByZXR1cm4gc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCd3cml0ZSBjYWxsYmFjayBjYWxsZWQgbXVsdGlwbGUgdGltZXMnKSk7XG4gIH1cblxuICB0cy53cml0ZWNodW5rID0gbnVsbDtcbiAgdHMud3JpdGVjYiA9IG51bGw7XG5cbiAgaWYgKGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdW5kZWZpbmVkKSBzdHJlYW0ucHVzaChkYXRhKTtcblxuICBjYihlcik7XG5cbiAgdmFyIHJzID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBycy5yZWFkaW5nID0gZmFsc2U7XG4gIGlmIChycy5uZWVkUmVhZGFibGUgfHwgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaykge1xuICAgIHN0cmVhbS5fcmVhZChycy5oaWdoV2F0ZXJNYXJrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm0ob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHJhbnNmb3JtKSkgcmV0dXJuIG5ldyBUcmFuc2Zvcm0ob3B0aW9ucyk7XG5cbiAgRHVwbGV4LmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgdGhpcy5fdHJhbnNmb3JtU3RhdGUgPSBuZXcgVHJhbnNmb3JtU3RhdGUodGhpcyk7XG5cbiAgdmFyIHN0cmVhbSA9IHRoaXM7XG5cbiAgLy8gc3RhcnQgb3V0IGFza2luZyBmb3IgYSByZWFkYWJsZSBldmVudCBvbmNlIGRhdGEgaXMgdHJhbnNmb3JtZWQuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAvLyB3ZSBoYXZlIGltcGxlbWVudGVkIHRoZSBfcmVhZCBtZXRob2QsIGFuZCBkb25lIHRoZSBvdGhlciB0aGluZ3NcbiAgLy8gdGhhdCBSZWFkYWJsZSB3YW50cyBiZWZvcmUgdGhlIGZpcnN0IF9yZWFkIGNhbGwsIHNvIHVuc2V0IHRoZVxuICAvLyBzeW5jIGd1YXJkIGZsYWcuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuc3luYyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fdHJhbnNmb3JtID0gb3B0aW9ucy50cmFuc2Zvcm07XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmx1c2ggPT09ICdmdW5jdGlvbicpIHRoaXMuX2ZsdXNoID0gb3B0aW9ucy5mbHVzaDtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHdyaXRhYmxlIHNpZGUgZmluaXNoZXMsIHRoZW4gZmx1c2ggb3V0IGFueXRoaW5nIHJlbWFpbmluZy5cbiAgdGhpcy5vbmNlKCdwcmVmaW5pc2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9mbHVzaCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmx1c2goZnVuY3Rpb24gKGVyLCBkYXRhKSB7XG4gICAgICBkb25lKHN0cmVhbSwgZXIsIGRhdGEpO1xuICAgIH0pO2Vsc2UgZG9uZShzdHJlYW0pO1xuICB9KTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5uZWVkVHJhbnNmb3JtID0gZmFsc2U7XG4gIHJldHVybiBEdXBsZXgucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZW5jb2RpbmcpO1xufTtcblxuLy8gVGhpcyBpcyB0aGUgcGFydCB3aGVyZSB5b3UgZG8gc3R1ZmYhXG4vLyBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uIGluIGltcGxlbWVudGF0aW9uIGNsYXNzZXMuXG4vLyAnY2h1bmsnIGlzIGFuIGlucHV0IGNodW5rLlxuLy9cbi8vIENhbGwgYHB1c2gobmV3Q2h1bmspYCB0byBwYXNzIGFsb25nIHRyYW5zZm9ybWVkIG91dHB1dFxuLy8gdG8gdGhlIHJlYWRhYmxlIHNpZGUuICBZb3UgbWF5IGNhbGwgJ3B1c2gnIHplcm8gb3IgbW9yZSB0aW1lcy5cbi8vXG4vLyBDYWxsIGBjYihlcnIpYCB3aGVuIHlvdSBhcmUgZG9uZSB3aXRoIHRoaXMgY2h1bmsuICBJZiB5b3UgcGFzc1xuLy8gYW4gZXJyb3IsIHRoZW4gdGhhdCdsbCBwdXQgdGhlIGh1cnQgb24gdGhlIHdob2xlIG9wZXJhdGlvbi4gIElmIHlvdVxuLy8gbmV2ZXIgY2FsbCBjYigpLCB0aGVuIHlvdSdsbCBuZXZlciBnZXQgYW5vdGhlciBjaHVuay5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRocm93IG5ldyBFcnJvcignX3RyYW5zZm9ybSgpIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xufTtcblxuVHJhbnNmb3JtLnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgdHMgPSB0aGlzLl90cmFuc2Zvcm1TdGF0ZTtcbiAgdHMud3JpdGVjYiA9IGNiO1xuICB0cy53cml0ZWNodW5rID0gY2h1bms7XG4gIHRzLndyaXRlZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgaWYgKCF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB2YXIgcnMgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICh0cy5uZWVkVHJhbnNmb3JtIHx8IHJzLm5lZWRSZWFkYWJsZSB8fCBycy5sZW5ndGggPCBycy5oaWdoV2F0ZXJNYXJrKSB0aGlzLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59O1xuXG4vLyBEb2Vzbid0IG1hdHRlciB3aGF0IHRoZSBhcmdzIGFyZSBoZXJlLlxuLy8gX3RyYW5zZm9ybSBkb2VzIGFsbCB0aGUgd29yay5cbi8vIFRoYXQgd2UgZ290IGhlcmUgbWVhbnMgdGhhdCB0aGUgcmVhZGFibGUgc2lkZSB3YW50cyBtb3JlIGRhdGEuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG5cbiAgaWYgKHRzLndyaXRlY2h1bmsgIT09IG51bGwgJiYgdHMud3JpdGVjYiAmJiAhdHMudHJhbnNmb3JtaW5nKSB7XG4gICAgdHMudHJhbnNmb3JtaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl90cmFuc2Zvcm0odHMud3JpdGVjaHVuaywgdHMud3JpdGVlbmNvZGluZywgdHMuYWZ0ZXJUcmFuc2Zvcm0pO1xuICB9IGVsc2Uge1xuICAgIC8vIG1hcmsgdGhhdCB3ZSBuZWVkIGEgdHJhbnNmb3JtLCBzbyB0aGF0IGFueSBkYXRhIHRoYXQgY29tZXMgaW5cbiAgICAvLyB3aWxsIGdldCBwcm9jZXNzZWQsIG5vdyB0aGF0IHdlJ3ZlIGFza2VkIGZvciBpdC5cbiAgICB0cy5uZWVkVHJhbnNmb3JtID0gdHJ1ZTtcbiAgfVxufTtcblxuVHJhbnNmb3JtLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgRHVwbGV4LnByb3RvdHlwZS5fZGVzdHJveS5jYWxsKHRoaXMsIGVyciwgZnVuY3Rpb24gKGVycjIpIHtcbiAgICBjYihlcnIyKTtcbiAgICBfdGhpcy5lbWl0KCdjbG9zZScpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGRvbmUoc3RyZWFtLCBlciwgZGF0YSkge1xuICBpZiAoZXIpIHJldHVybiBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG5cbiAgaWYgKGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdW5kZWZpbmVkKSBzdHJlYW0ucHVzaChkYXRhKTtcblxuICAvLyBpZiB0aGVyZSdzIG5vdGhpbmcgaW4gdGhlIHdyaXRlIGJ1ZmZlciwgdGhlbiB0aGF0IG1lYW5zXG4gIC8vIHRoYXQgbm90aGluZyBtb3JlIHdpbGwgZXZlciBiZSBwcm92aWRlZFxuICB2YXIgd3MgPSBzdHJlYW0uX3dyaXRhYmxlU3RhdGU7XG4gIHZhciB0cyA9IHN0cmVhbS5fdHJhbnNmb3JtU3RhdGU7XG5cbiAgaWYgKHdzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdDYWxsaW5nIHRyYW5zZm9ybSBkb25lIHdoZW4gd3MubGVuZ3RoICE9IDAnKTtcblxuICBpZiAodHMudHJhbnNmb3JtaW5nKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgdHJhbnNmb3JtIGRvbmUgd2hlbiBzdGlsbCB0cmFuc2Zvcm1pbmcnKTtcblxuICByZXR1cm4gc3RyZWFtLnB1c2gobnVsbCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV90cmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgaXNNZXNzYWdlVHlwZSB9IGZyb20gXCIuL21lc3NhZ2UtdHlwZXNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL21lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tIFwiLi9udW1iZXItdXRpbHNcIjtcclxuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcIi4vZXZlbnQtZGlzcGF0Y2hlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU1lc3NhZ2UoZW5jb2RlZE1lc3NhZ2U6IG9iamVjdCk6IE1heWJlPE1lc3NhZ2U+IHtcclxuICAgIGxldCBtZXNzYWdlID0gZW5jb2RlZE1lc3NhZ2UgYXMgTWVzc2FnZTtcclxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIFRyeSBwYXJzaW5nIHRoZSBlbmNvZGVkTWVzc2FnZSBhcyBhIHN0cmluZyBpbnN0ZWFkIG9mIGFuIG9iamVjdCBpZiBjYXN0aW5nXHJcbiAgICAgICAgLy8gdG8gdGhlIE1lc3NhZ2UgdHlwZSBmYWlscy4gVGhpcyBpcyByZXF1aXJlZCBmb3IgZGVjb2RpbmcgbWVzc2FnZXMgaW4gRWRnZS5cclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5wYXJzZShlbmNvZGVkTWVzc2FnZS50b1N0cmluZygpKTtcclxuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzTnVtYmVyKG1lc3NhZ2UudHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc01lc3NhZ2VUeXBlKG1lc3NhZ2UudHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGVjb2RlZEV2ZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IE1lc3NhZ2UpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VEZWNvZGVyIHtcclxuICAgIG9uTWVzc2FnZURlY29kZWQ6IEV2ZW50RGlzcGF0Y2hlcjxNZXNzYWdlRGVjb2RlZEV2ZW50PjtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1kZWNvZGVyLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBkb09uY2UgfSBmcm9tIFwiLi9vbmNlXCI7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgSGFuZGxlRXZlbnQ8RXZlbnQ+ID0gKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXI8RXZlbnQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZlbnRIYW5kbGVyOiBIYW5kbGVFdmVudDxFdmVudD4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMucHVzaChldmVudEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25lU2hvdEV2ZW50SGFuZGxlcihldmVudEhhbmRsZXI6IEhhbmRsZUV2ZW50PEV2ZW50Pik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25lU2hvdEV2ZW50SGFuZGxlcnMucHVzaChldmVudEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVFdmVudCBvZiB0aGlzLmV2ZW50SGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZUV2ZW50IG9mIHRoaXMub25lU2hvdEV2ZW50SGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uZVNob3RFdmVudEhhbmRsZXJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBldmVudEhhbmRsZXJzID0gbmV3IEFycmF5PEhhbmRsZUV2ZW50PEV2ZW50Pj4oKTtcclxuICAgIHByaXZhdGUgb25lU2hvdEV2ZW50SGFuZGxlcnMgPSBuZXcgQXJyYXk8SGFuZGxlRXZlbnQ8RXZlbnQ+PigpO1xyXG59XHJcblxyXG4vLyBDb25kaXRpb25EaXNwYXRjaGVyIGlzIGEgc3BlY2lhbGlzZWQgRXZlbnREaXNwYXRjaGVyIGRlc2lnbmVkIHRvIG5vdGlmeVxyXG4vLyBsaXN0ZW5lcnMgYSBzaW5nbGUgdGltZSB3aGVuIGEgY29uZGl0aW9uIGlzIHNldC4gVW5saWtlIEV2ZW50RGlzcGF0Y2hlcixcclxuLy8gYSBsaXN0ZW5lciB3aGljaCByZWdpc3RlcnMgbGF0ZSBkb2Vzbid0IG1pc3MgYW55dGhpbmcgYW5kIGlzIGltbWVkaWF0ZWx5XHJcbi8vIG5vdGlmaWVkIHRoYXQgdGhlIGNvbmRpdGlvbiBpcyBhbHJlYWR5IHNhdGlzaWZlZC5cclxuZXhwb3J0IHR5cGUgSGFuZGxlQ29uZGl0aW9uID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25EaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcmVnaXN0ZXJDb25kaXRpb25MaXN0ZW5lcihjb25kaXRpb25IYW5kbGVyOiBIYW5kbGVDb25kaXRpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgY29uZGl0aW9uSGFuZGxlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uSGFuZGxlcnMucHVzaChjb25kaXRpb25IYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29uZGl0aW9uID0gZG9PbmNlKCgpID0+IHt0aGlzLnNldENvbmRpdGlvbkltcGwoKX0pO1xyXG5cclxuICAgIHByaXZhdGUgc2V0Q29uZGl0aW9uSW1wbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVDb25kaXRpb24gb2YgdGhpcy5jb25kaXRpb25IYW5kbGVycykge1xyXG4gICAgICAgICAgICBoYW5kbGVDb25kaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25IYW5kbGVycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uZGl0aW9uID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGNvbmRpdGlvbkhhbmRsZXJzID0gbmV3IEFycmF5PEhhbmRsZUNvbmRpdGlvbj4oKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXZlbnQtZGlzcGF0Y2hlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UsIE1lc3NhZ2VQYXlsb2FkIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVNZXNzYWdlKHR5cGU6IE1lc3NhZ2VUeXBlLCBwYXlsb2FkOiBNZXNzYWdlUGF5bG9hZCk6IE1lc3NhZ2Uge1xyXG4gICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9O1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLWVuY29kZXIudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBJZCB9IGZyb20gXCIuL2lkLWdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBUYWJJZCB9IGZyb20gXCIuL2NvbW1vbi10eXBlc1wiO1xyXG5pbXBvcnQgeyBDaHJhZ0Vycm9yIH0gZnJvbSBcIi4vZXJyb3JzXCJcclxuaW1wb3J0IHsgU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXMgfSBmcm9tIFwiLi9zZXJpYWxpemVkLXBoaXNoaW5nLXNvdXJjZS1zaXRlc1wiO1xyXG5pbXBvcnQgeyBFbXB0eU9iamVjdCB9IGZyb20gXCIuL2VtcHR5LW9iamVjdFwiO1xyXG5pbXBvcnQgeyBJMThuTWVzc2FnZXMgfSBmcm9tIFwiLi9pMThuXCI7XHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgVmVyc2lvblN1cHBvcnRTdGF0dXMgfSBmcm9tIFwiLi9wcm90b2NvbC12ZXJzaW9uc1wiO1xyXG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gXCIuL3N0cmluZy11dGlsc1wiO1xyXG5pbXBvcnQgeyBpc09iamVjdCwgaXNCb29sZWFuLCBpc051bWJlciwgaXNBcnJheSB9IGZyb20gXCIuL3R5cGUtdXRpbHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWRCcm93c2VySW5mbyA9IHtcclxuICAgIGJyb3dzZXI6IHN0cmluZyxcclxuICAgIHVybEhvc3RuYW1lOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSA9IHtcclxuICAgIGNocm9tZTogYm9vbGVhbixcclxuICAgIGZpcmVmb3g6IGJvb2xlYW4sXHJcbiAgICBlZGdlOiBib29sZWFuXHJcbn1cclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZElzRW5hYmxlZERhdGFWMTIgPSB7XHJcbiAgICBjaHJvbWU6IGJvb2xlYW4sXHJcbiAgICBmaXJlZm94OiBib29sZWFuLFxyXG4gICAgZWRnZTogYm9vbGVhbixcclxuICAgIGVkZ2VDaHJvbWl1bTogYm9vbGVhblxyXG59XHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhID0gU2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSB8IFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSh2YWx1ZTogYW55KTogdmFsdWUgaXMgU2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSB7XHJcbiAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmNocm9tZSkgJiZcclxuICAgICAgICBpc0Jvb2xlYW4odmFsdWUuZmlyZWZveCkgJiZcclxuICAgICAgICBpc0Jvb2xlYW4odmFsdWUuZWRnZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxMiB7XHJcbiAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmNocm9tZSkgJiZcclxuICAgICAgICBpc0Jvb2xlYW4odmFsdWUuZmlyZWZveCkgJiZcclxuICAgICAgICBpc0Jvb2xlYW4odmFsdWUuZWRnZSkgJiZcclxuICAgICAgICBpc0Jvb2xlYW4odmFsdWUuZWRnZUNocm9taXVtKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5hdmlnYXRpb25Ub2tlbiA9IHN0cmluZ3xudW1iZXJ8W3N0cmluZ3xudW1iZXJdO1xyXG5leHBvcnQgdHlwZSBTZXJpYWxpemVkTmF2aWdhdGlvbiA9IFNlcmlhbGl6ZWROYXZpZ2F0aW9uVG9rZW5bXTtcclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5hdk1ldGFkYXRhID0ge1xyXG4gICAgcHJlY2VkZW5jZTogbnVtYmVyLFxyXG4gICAgYWxsb3c/OiBib29sZWFuLFxyXG4gICAgYmxvY2s/OiBib29sZWFuLFxyXG4gICAgbmF2aWdhdGVUbzogbnVtYmVyLFxyXG4gICAgcmVxdWlyZXNVc2VyQ2xpY2s/OiBudW1iZXJcclxufTtcclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5hdlNlcURhdGEgPSB7XHJcbiAgICBzZXE6IFNlcmlhbGl6ZWROYXZpZ2F0aW9uW10sXHJcbiAgICBtZXRhZGF0YTogU2VyaWFsaXplZE5hdk1ldGFkYXRhXHJcbn07XHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGEgPSB7XHJcbiAgICB2ZXJzaW9uOiBudW1iZXIsXHJcbiAgICBidWlsdGluUnVsZXNQcmVjZWRlbmNlOiBudW1iZXIsXHJcbiAgICBzZXFzOiBTZXJpYWxpemVkTmF2U2VxRGF0YVtdXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTZXJpYWxpemVkUGhpc2hpbmdOYXZTZXFEYXRhKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBTZXJpYWxpemVkUGhpc2hpbmdOYXZTZXFEYXRhIHtcclxuICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiZcclxuICAgICAgICBpc051bWJlcih2YWx1ZS52ZXJzaW9uKSAmJlxyXG4gICAgICAgIGlzTnVtYmVyKHZhbHVlLmJ1aWx0aW5SdWxlc1ByZWNlZGVuY2UpICYmXHJcbiAgICAgICAgaXNBcnJheSh2YWx1ZS5zZXFzKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjcgPSB7XHJcbiAgICBjaHJvbWU6IHN0cmluZ1tdLFxyXG4gICAgZmlyZWZveDogc3RyaW5nW10sXHJcbiAgICBlZGdlOiBzdHJpbmdbXVxyXG59O1xyXG5leHBvcnQgdHlwZSBTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWMTIgPSB7XHJcbiAgICBjaHJvbWU6IHN0cmluZ1tdLFxyXG4gICAgZmlyZWZveDogc3RyaW5nW10sXHJcbiAgICBlZGdlOiBzdHJpbmdbXSxcclxuICAgIGVkZ2VDaHJvbWl1bTogc3RyaW5nW11cclxufTtcclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzID0gU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjcgfCBTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWMTI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWNyh2YWx1ZTogYW55KTogdmFsdWUgaXMgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjcge1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJlxyXG4gICAgICAgIGlzQXJyYXkodmFsdWUuY2hyb21lKSAmJlxyXG4gICAgICAgIGlzQXJyYXkodmFsdWUuZmlyZWZveCkgJiZcclxuICAgICAgICBpc0FycmF5KHZhbHVlLmVkZ2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWMTIodmFsdWU6IGFueSk6IHZhbHVlIGlzIFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc1YxMiB7XHJcbiAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmXHJcbiAgICAgICAgaXNBcnJheSh2YWx1ZS5jaHJvbWUpICYmXHJcbiAgICAgICAgaXNBcnJheSh2YWx1ZS5maXJlZm94KSAmJlxyXG4gICAgICAgIGlzQXJyYXkodmFsdWUuZWRnZSkgJiZcclxuICAgICAgICBpc0FycmF5KHZhbHVlLmVkZ2VDaHJvbWl1bSk7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIE1lc3NhZ2VQYXlsb2FkID0gSGFuZHNoYWtlVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhdW5jaEJyb3dzZXJSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhdW5jaEJyb3dzZXJSZXNwb25zZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJ1c3RVcmxWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG93bmxvYWRDb21wbGV0ZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dNZXNzYWdlVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZFVzZXJUcnVzdGVkT3JpZ2luVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFkZFVzZXJVbnRydXN0ZWRPcmlnaW5WMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVscGVyRXJyb3JWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9ybWFudFN0YXRlQ2hhbmdlZFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHRlbnNpb25SZWFkeVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbEFwcExpbmtSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4dGVybmFsQXBwTGlua1Jlc3BvbnNlVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIElzRmlsZVVSTFRydXN0ZWRSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIElzRmlsZVVSTFRydXN0ZWRSZXNwb25zZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCbG9ja2VkRmlsZVJlcXVlc3RWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2tlZEZpbGVSZXNwb25zZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3B1cERhdGFSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvcHVwRGF0YVJlc3BvbnNlVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENsZWFyUmVtZW1iZXJlZERlY2lzaW9uc1YxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCbG9ja2VkUGFnZVN0cmluZ3NSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsb2NrZWRQYWdlU3RyaW5nc1Jlc3BvbnNlVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYXJ0YmVhdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmFibGVkRmVhdHVyZXNSZXF1ZXN0VjIgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuYWJsZWRGZWF0dXJlc1Jlc3BvbnNlVjIgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENsZWFyUmVtZW1iZXJlZE9yaWdpblYzIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25zRGF0YVJlcXVlc3RWMyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3B0aW9uc0RhdGFSZXNwb25zZVYzIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjMgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlcHV0YXRpb25DaGFuZ2VkVjMgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWNCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2tlZFBhZ2VEYXRhUmVxdWVzdFY0IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCbG9ja2VkUGFnZURhdGFSZXNwb25zZVY0IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjUgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvcHVwRGF0YVJlc3BvbnNlVjUgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsb2NrZWRQYWdlRGF0YVJlc3BvbnNlVjYgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRydXN0VXJsVjYgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWNyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJ1c3RVcmxWOCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9udEFza0FnYWluVjggfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWOCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9wdXBEYXRhUmVzcG9uc2VWOSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9udEFza0FnYWluVjkgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWOSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RvcEhlbHBlclYxMCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRnZUFja1YxMCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kT2ZTdHJlYW1WMTAgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYXJ0YmVhdFYxMCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnQ2hhbmdlZFYxMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnQ2hhbmdlZFYxMjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRhYk1lc3NhZ2Uge1xyXG4gICAgcmVhZG9ubHkgdGFiSWQ6IFRhYklkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNUYWJNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VQYXlsb2FkKTogbWVzc2FnZSBpcyBJVGFiTWVzc2FnZSB7XHJcbiAgICByZXR1cm4gKG1lc3NhZ2UgYXMgSVRhYk1lc3NhZ2UpLnRhYklkICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUlkTWVzc2FnZSB7XHJcbiAgICByZWFkb25seSBpZDogSWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc0lkTWVzc2FnZShtZXNzYWdlOiBvYmplY3QpOiBtZXNzYWdlIGlzIElJZE1lc3NhZ2Uge1xyXG4gICAgcmV0dXJuIChtZXNzYWdlIGFzIElJZE1lc3NhZ2UpLmlkICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYXVuY2hCcm93c2VyUmVxdWVzdFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHVybFNwZWM6IHN0cmluZywgcmVhZG9ubHkgaWQ6IElkKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExhdW5jaEJyb3dzZXJSZXNwb25zZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICByZWFkb25seSB1cmxTcGVjOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGlkOiBJZCxcclxuICAgICAgICAgICAgcmVhZG9ubHkgZGlkTGF1bmNoOiBib29sZWFuKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhbmRzaGFrZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZlcnNpb25zIDogc3RyaW5nW10pIHtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1JlcXVlc3RWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBwaGlzaGluZ1NvdXJjZVNpdGVzVmVyc2lvbjogbnVtYmVyLFxyXG4gICAgICAgIHJlYWRvbmx5IHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlc1ZlcnNpb246IG51bWJlcixcclxuICAgICAgICByZWFkb25seSBicm93c2VySW5mbzogU2VyaWFsaXplZEJyb3dzZXJJbmZvKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjE8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBpc0VuYWJsZWQ6IFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICByZWFkb25seSBibG9ja2VkUGFnZVN0cmluZ3M6IEVtcHR5T2JqZWN0LCAvLyBEZXByZWNhdGVkXHJcbiAgICAgICAgcmVhZG9ubHkgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgcmVhZG9ubHkgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzOiBTZXJpYWxpemVkUGhpc2hpbmdOYXZTZXFEYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgIHJlYWRvbmx5IHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgIHJlYWRvbmx5IHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgcmVhZG9ubHkgdXNlclRydXN0ZWRPcmlnaW5zIDogc3RyaW5nW10sXHJcbiAgICAgICAgcmVhZG9ubHkgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICByZWFkb25seSBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbikgeyB9XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFYxID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWMTxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxPjtcclxuXHJcbmV4cG9ydCB0eXBlIFNpdGVBbmRFeHBpcnkgPSBbc3RyaW5nLCBudW1iZXJdO1xyXG5leHBvcnQgY2xhc3MgUmVwdXRhdGlvbkNoYW5nZWRWMyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBpbmRleCA6IG51bWJlcixcclxuICAgICAgICByZWFkb25seSB0b3RhbCA6IG51bWJlcixcclxuICAgICAgICByZWFkb25seSByZXB1dGFibGVTaXRlczogU2l0ZUFuZEV4cGlyeVtdKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRydXN0VXJsVjEge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgbmF2aWdhdGVUb1VybFNwZWM6IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSBibG9ja2VkVXJsU3BlYzogc3RyaW5nLFxyXG4gICAgICAgIHJlYWRvbmx5IHRydXN0VXJsOiBib29sZWFuLFxyXG4gICAgICAgIHJlYWRvbmx5IHJlbWVtYmVyRGVjaXNpb246IGJvb2xlYW4pIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRG93bmxvYWRDb21wbGV0ZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHVybFNwZWM6IHN0cmluZywgcmVhZG9ubHkgZmlsZVNwZWM6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIExvZ0xldmVsIHtcclxuICAgIEluZm8sXHJcbiAgICBFcnJvclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nTWVzc2FnZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGxldmVsIDogTG9nTGV2ZWwsIHJlYWRvbmx5IG1lc3NhZ2UgOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVscGVyRXJyb3JWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBlcnJvclR5cGU6IENocmFnRXJyb3IsIHJlYWRvbmx5IGVycm9yTWVzc2FnZTogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERvcm1hbnRTdGF0ZUNoYW5nZWRWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpc0Rvcm1hbnQ6IGJvb2xlYW4pIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uUmVhZHlWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB0YWJJZDogVGFiSWQpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZXJuYWxBcHBMaW5rUmVxdWVzdFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGxpbmtTcGVjOiBzdHJpbmcsIHJlYWRvbmx5IGV4dGVybmFsQXBwTmFtZTogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVybmFsQXBwTGlua1Jlc3BvbnNlVjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbmF2aWdhdGVUb1NwZWM6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBZGRVc2VyVHJ1c3RlZE9yaWdpblYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9yaWdpbiA6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBZGRVc2VyVW50cnVzdGVkT3JpZ2luVjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb3JpZ2luIDogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElzRmlsZVVSTFRydXN0ZWRSZXF1ZXN0VjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IElkLCByZWFkb25seSBmaWxlVXJsU3BlYzogc3RyaW5nKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXNGaWxlVVJMVHJ1c3RlZFJlc3BvbnNlVjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IElkLCByZWFkb25seSBmaWxlVXJsU3BlYzogc3RyaW5nLCByZWFkb25seSBpc1RydXN0ZWQ6IGJvb2xlYW4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2VkRmlsZVJlcXVlc3RWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBmaWxlVXJsU3BlYzogc3RyaW5nKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlZEZpbGVSZXNwb25zZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGZpbGVVcmxTcGVjOiBzdHJpbmcsIHJlYWRvbmx5IGlzVHJ1c3RlZDogYm9vbGVhbikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwRGF0YVJlcXVlc3RWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cERhdGFSZXNwb25zZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IHBvcHVwTWVzc2FnZTogSTE4bk1lc3NhZ2VzLFxyXG4gICAgICAgIHJlYWRvbmx5IG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyOiBib29sZWFuKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xlYXJSZW1lbWJlcmVkRGVjaXNpb25zVjEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlZFBhZ2VTdHJpbmdzUmVxdWVzdFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNvbnRlbnRUeXBlOiBNYXliZTxzdHJpbmc+KSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlZFBhZ2VTdHJpbmdzUmVzcG9uc2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB0aXRsZTogc3RyaW5nLCByZWFkb25seSBxdWVzdGlvbjogc3RyaW5nKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVhcnRiZWF0VjEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW5hYmxlZEZlYXR1cmVzUmVxdWVzdFYyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IGlkOiBJZCxcclxuICAgICAgICByZWFkb25seSByZXNwb25kSW1tZWRpYXRlbHk6IGJvb2xlYW4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbmFibGVkRmVhdHVyZXNSZXNwb25zZVYyIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IGlkOiBJZCxcclxuICAgICAgICByZWFkb25seSBsaW5rUHJvdGVjdGlvbjogYm9vbGVhbixcclxuICAgICAgICByZWFkb25seSBmaWxlVVJMUHJvdGVjdGlvbjogYm9vbGVhbixcclxuICAgICAgICByZWFkb25seSBwZGZQcm90ZWN0aW9uOiBib29sZWFuLFxyXG4gICAgICAgIHJlYWRvbmx5IGRvd25sb2FkUHJvdGVjdGlvbjogYm9vbGVhbikge31cclxufVxyXG5cclxuZXhwb3J0IGVudW0gUmVtZW1iZXJlZE9yaWdpblR5cGVzIHtcclxuICAgIFRydXN0ZWQsXHJcbiAgICBVbnRydXN0ZWRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyUmVtZW1iZXJlZE9yaWdpblYzIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IG9yaWdpbjogc3RyaW5nLFxyXG4gICAgICAgIHJlYWRvbmx5IHR5cGU6IFJlbWVtYmVyZWRPcmlnaW5UeXBlcykge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNEYXRhUmVxdWVzdFYzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9wdGlvbnNEYXRhUmVzcG9uc2VWMyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBzdXBwb3J0U3RhdHVzOiBWZXJzaW9uU3VwcG9ydFN0YXR1cyxcclxuICAgICAgICByZWFkb25seSBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICByZWFkb25seSB1c2VyVHJ1c3RlZE9yaWdpbnM6IHN0cmluZ1tdLFxyXG4gICAgICAgIHJlYWRvbmx5IHVzZXJVbnRydXN0ZWRPcmlnaW5zOiBzdHJpbmdbXSkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjM8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjE8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5nczogRW1wdHlPYmplY3QsIC8vIERlcHJlY2F0ZWRcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgcHJpb3JpdGlzZVRydXN0ZWRTaXRlczogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5ncyxcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlcyxcclxuICAgICAgICAgICAgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzLFxyXG4gICAgICAgICAgICB0cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIHVzZXJVbnRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcilcclxuICAgIH1cclxufVxyXG5leHBvcnQgdHlwZSBDb25maWdDaGFuZ2VkVjMgPSBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYzPFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjE+O1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjQ8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjM8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5nczogRW1wdHlPYmplY3QsIC8vIERlcHJlY2F0ZWRcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlczogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZDogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5ncyxcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlcyxcclxuICAgICAgICAgICAgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzLFxyXG4gICAgICAgICAgICB0cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIHVzZXJVbnRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlcylcclxuICAgIH1cclxufVxyXG5leHBvcnQgdHlwZSBDb25maWdDaGFuZ2VkVjQgPSBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY0PFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjE+O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2NrZWRQYWdlRGF0YVJlcXVlc3RWNCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBjb250ZW50VHlwZTogTWF5YmU8c3RyaW5nPikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2NrZWRQYWdlRGF0YVJlc3BvbnNlVjQge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSBxdWVzdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHJlYWRvbmx5IHJlbWVtYmVyRGVjaXNpb25zRGVmYXVsdDogYm9vbGVhbikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjU8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjQ8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5nczogRW1wdHlPYmplY3QsIC8vIERlcHJlY2F0ZWRcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlczogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZDogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgaXNFbnRlcnByaXNlUHJvZHVjdDogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5ncyxcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlcyxcclxuICAgICAgICAgICAgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzLFxyXG4gICAgICAgICAgICB0cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIHVzZXJVbnRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZClcclxuICAgIH1cclxufVxyXG5leHBvcnQgdHlwZSBDb25maWdDaGFuZ2VkVjUgPSBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY1PFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjE+O1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwRGF0YVJlc3BvbnNlVjUgZXh0ZW5kcyBQb3B1cERhdGFSZXNwb25zZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwb3B1cE1lc3NhZ2U6IEkxOG5NZXNzYWdlcyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihwb3B1cE1lc3NhZ2UsIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyKVxyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2NrZWRQYWdlRGF0YVJlc3BvbnNlVjYgZXh0ZW5kcyBCbG9ja2VkUGFnZURhdGFSZXNwb25zZVY0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBxdWVzdGlvbjogc3RyaW5nLFxyXG4gICAgICAgICAgICByZWFkb25seSBvcGVuZWRTZWN1cmVFeHBsYW5hdGlvbjogc3RyaW5nLFxyXG4gICAgICAgICAgICByZW1lbWJlckRlY2lzaW9uc0RlZmF1bHQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcih0aXRsZSwgcXVlc3Rpb24sIHJlbWVtYmVyRGVjaXNpb25zRGVmYXVsdCk7XHJcbiAgICAgICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJ1c3RVcmxWNiBleHRlbmRzIFRydXN0VXJsVjEge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVG9VcmxTcGVjOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIGJsb2NrZWRVcmxTcGVjOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHRydXN0VXJsOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZW1lbWJlckRlY2lzaW9uOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBjb250ZW50VHlwZTogTWF5YmU8c3RyaW5nPikge1xyXG4gICAgICAgIHN1cGVyKG5hdmlnYXRlVG9VcmxTcGVjLCBibG9ja2VkVXJsU3BlYywgdHJ1c3RVcmwsIHJlbWVtYmVyRGVjaXNpb24pO1xyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjc8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjU8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlU3RyaW5nczogRW1wdHlPYmplY3QsIC8vIERlcHJlY2F0ZWRcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlczogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZDogYm9vbGVhbixcclxuICAgICAgICAgICAgaXNFbnRlcnByaXNlUHJvZHVjdDogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgbmV3VGFiUGFnZVVybHM6IFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHN8RW1wdHlPYmplY3QpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgaXNFbmFibGVkLFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3MsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQsXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3QpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFY3ID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWNzxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxLCBTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWNz47XHJcblxyXG5leHBvcnQgY2xhc3MgVHJ1c3RVcmxWOCBleHRlbmRzIFRydXN0VXJsVjYge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVG9VcmxTcGVjOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIGJsb2NrZWRVcmxTcGVjOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHRydXN0VXJsOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZW1lbWJlckRlY2lzaW9uOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBkb250QXNrQWdhaW46IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNYXliZTxzdHJpbmc+KSB7XHJcbiAgICAgICAgc3VwZXIobmF2aWdhdGVUb1VybFNwZWMsIGJsb2NrZWRVcmxTcGVjLCB0cnVzdFVybCwgcmVtZW1iZXJEZWNpc2lvbiwgY29udGVudFR5cGUpO1xyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERvbnRBc2tBZ2FpblY4IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjg8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjc8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGlzQ29uc3VtZXJQcm9kdWN0OiBib29sZWFuLFxyXG4gICAgICAgICAgICBuZXdUYWJQYWdlVXJsczogVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc3xFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgcmVhZG9ubHkgYmxvY2tlZFBhZ2VMZWFybk1vcmVVUkw6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIHt9LCAvLyBibG9ja2VkUGFnZVN0cmluZ3MgaXMgZGVwcmVjdGVkIGJ1dCBpdCdzIGF3a3dhcmQgdG8gcmVtb3ZlIGJlY2F1c2UgbWVzc2FnZXMgaW5oZXJpdCBmcm9tIHByZXZpb3VzIHZlcnNpb25zXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQsXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3QsXHJcbiAgICAgICAgICAgIG5ld1RhYlBhZ2VVcmxzKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpZ0NoYW5nZWRWOCA9IEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjg8U2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSwgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjc+O1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwRGF0YVJlc3BvbnNlVjkgZXh0ZW5kcyBQb3B1cERhdGFSZXNwb25zZVY1IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwb3B1cE1lc3NhZ2U6IEkxOG5NZXNzYWdlcyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGRvbnRBc2tBZ2FpbjogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKHBvcHVwTWVzc2FnZSwgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsIGlzRW50ZXJwcmlzZVByb2R1Y3QpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb250QXNrQWdhaW5WOSBleHRlbmRzIERvbnRBc2tBZ2FpblY4IHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGRvbnRBc2tBZ2FpbjogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY5PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YSwgVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscz4gZXh0ZW5kcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY4PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YSwgVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscz4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZDogVFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ1NvdXJjZVNpdGVzOiBTZXJpYWxpemVkUGhpc2hpbmdTb3VyY2VTaXRlc3xFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzOiBTZXJpYWxpemVkUGhpc2hpbmdOYXZTZXFEYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICB0cnVzdGVkU2l0ZXMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdW50cnVzdGVkU2l0ZXMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJVbnRydXN0ZWRPcmlnaW5zIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyOiBib29sZWFuLFxyXG4gICAgICAgICAgICBwcmlvcml0aXNlVHJ1c3RlZFNpdGVzOiBib29sZWFuLFxyXG4gICAgICAgICAgICBwcm9tcHRGb3JVbmNhdGVnb3JpemVkOiBib29sZWFuLFxyXG4gICAgICAgICAgICBpc0VudGVycHJpc2VQcm9kdWN0OiBib29sZWFuLFxyXG4gICAgICAgICAgICBpc0NvbnN1bWVyUHJvZHVjdDogYm9vbGVhbixcclxuICAgICAgICAgICAgbmV3VGFiUGFnZVVybHM6IFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlTGVhcm5Nb3JlVVJMOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGRvbnRBc2tBZ2FpbjogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQsXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3QsXHJcbiAgICAgICAgICAgIGlzQ29uc3VtZXJQcm9kdWN0LFxyXG4gICAgICAgICAgICBuZXdUYWJQYWdlVXJscyxcclxuICAgICAgICAgICAgYmxvY2tlZFBhZ2VMZWFybk1vcmVVUkwpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFY5ID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWOTxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxLCBTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWNz47XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcEhlbHBlclYxMCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFZGdlQWNrVjEwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVuZE9mU3RyZWFtVjEwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlYXJ0YmVhdFYxMCBleHRlbmRzIEhlYXJ0YmVhdFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkIDogSWQpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBEb24ndCBleHRlbnQgUG9wdXBEYXRhUmVzcG9uc2VWOSBzaW5jZSBQaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyIGFuZCBkb250QXNrQWdhaW4gaGF2ZSBiZWVuIGRlcHJlY2F0ZWRcclxuZXhwb3J0IGNsYXNzIFBvcHVwRGF0YVJlc3BvbnNlVjExIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICByZWFkb25seSBwb3B1cE1lc3NhZ2U6IEkxOG5NZXNzYWdlcyxcclxuICAgICAgICAgICAgcmVhZG9ubHkgc2hvd0NsZWFyUmVtZW1iZXJlZERlY2lzaW9uc0luZm86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGhlbHBMaW5rVVJMOiBzdHJpbmcpIHtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gUHJvZHVjdFN0YXR1c2VzIHtcclxuICAgIEVuYWJsZWQsXHJcbiAgICBEaXNhYmxlZCxcclxuICAgIEluaXRSZXF1aXJlZCxcclxuICAgIFVubGljZW5zZWQsXHJcbiAgICBVbmtub3duXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYxMTxUU2VyaWFsaXplZElzRW5hYmxlZERhdGEsIFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHM+IGV4dGVuZHMgRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWOTxUU2VyaWFsaXplZElzRW5hYmxlZERhdGEsIFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHM+IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlczogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZDogYm9vbGVhbixcclxuICAgICAgICAgICAgaXNFbnRlcnByaXNlUHJvZHVjdDogYm9vbGVhbixcclxuICAgICAgICAgICAgaXNDb25zdW1lclByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIG5ld1RhYlBhZ2VVcmxzOiBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZUxlYXJuTW9yZVVSTDogc3RyaW5nLFxyXG4gICAgICAgICAgICBkb250QXNrQWdhaW46IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IHNlY3VyZUJyb3dzZXJSZWRpcmVjdFRydXN0ZWRTaXRlczogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgcHJvZHVjdFN0YXR1czogUHJvZHVjdFN0YXR1c2VzKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZCxcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlcyxcclxuICAgICAgICAgICAgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzLFxyXG4gICAgICAgICAgICB0cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIHVzZXJVbnRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZCxcclxuICAgICAgICAgICAgaXNFbnRlcnByaXNlUHJvZHVjdCxcclxuICAgICAgICAgICAgaXNDb25zdW1lclByb2R1Y3QsXHJcbiAgICAgICAgICAgIG5ld1RhYlBhZ2VVcmxzLFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZUxlYXJuTW9yZVVSTCxcclxuICAgICAgICAgICAgZG9udEFza0FnYWluKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpZ0NoYW5nZWRWMTEgPSBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYxMTxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxMiwgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjEyPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYxMjxUU2VyaWFsaXplZElzRW5hYmxlZERhdGEsIFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHM+IGV4dGVuZHMgRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWMTE8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiB7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFYxMiA9IEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjEyPFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEyLCBTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWMTI+O1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgdHlwZTogTWVzc2FnZVR5cGUsXHJcbiAgICAgICAgcmVhZG9ubHkgcGF5bG9hZDogTWVzc2FnZVBheWxvYWQpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVzc2FnZVRvU3RyaW5nKG1lc3NhZ2U6IE1lc3NhZ2UpOiBzdHJpbmcge1xyXG4gICAgLy8gTG9nIHRoZSByZXB1dGFibGUgc2l0ZXMgbGlzdCBjb25jaXNlbHkgc2luY2UgaXQncyB2ZXJ5IGxvbmcuXHJcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSBNZXNzYWdlVHlwZS5yZXB1dGF0aW9uQ2hhbmdlZFYzKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IG1lc3NhZ2UucGF5bG9hZCBhcyBSZXB1dGF0aW9uQ2hhbmdlZFYzO1xyXG4gICAgICAgIGxldCBzdHIgPSBgT2JqZWN0e1xcblxcdGAgK1xyXG4gICAgICAgICAgICAgICAgICBgdHlwZTogJHtNZXNzYWdlVHlwZS5yZXB1dGF0aW9uQ2hhbmdlZFYzfSxcXG5cXHRgICtcclxuICAgICAgICAgICAgICAgICAgYHBheWxvYWQ6IE9iamVjdHtcXG5cXHRcXHRcXHRgICtcclxuICAgICAgICAgICAgICAgICAgYGluZGV4OiAke3BheWxvYWQuaW5kZXh9LFxcblxcdFxcdFxcdGAgK1xyXG4gICAgICAgICAgICAgICAgICBgdG90YWw6ICR7cGF5bG9hZC50b3RhbH0sXFxuXFx0XFx0XFx0YCArXHJcbiAgICAgICAgICAgICAgICAgIGByZXB1dGFibGVTaXRlOiBbIGA7XHJcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBwYXlsb2FkLnJlcHV0YWJsZVNpdGVzKSB7XHJcbiAgICAgICAgICAgIHN0ciArPSBgWyR7ZW50cnlbMF19LCR7ZW50cnlbMV19XSwgYFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gXCJdLFxcblxcdH0sXFxufVwiXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9ob3N0L21lc3NhZ2VzLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBpc0luUmFuZ2UgfSBmcm9tIFwiLi9udW1iZXItdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIENocmFnRXJyb3Ige1xyXG4gICAgbm90RW5hYmxlZCxcclxuICAgIGhlbHBlclBvcnRFcnJvcixcclxuICAgIGxhdW5jaEJyb3dzZXJGYWlsZWQsXHJcbiAgICB0cnVzdERvd25sb2FkRmFpbGVkLFxyXG4gICAgaGFuZHNoYWtlRXJyb3IsXHJcbiAgICB1bmtub3duRXJyb3IsXHJcbiAgICByZWNvdmVyZWRGcm9tRXJyb3IsXHJcbiAgICBpczMyYml0RmlyZWZveCxcclxuICAgIGhlbHBlclVucmVzcG9uc2l2ZVxyXG59XHJcblxyXG4vLyBIYXZlIHNlcGVyYXRlIGVudW0gZm9yIG1pbiBhbmQgbWF4IHNvIHRoYXQgZWFjaCBDaHJhZ0Vycm9yIHZhbHVlIGNvcnJlc3BvbmRzXHJcbi8vIHRvIGEgdW5pcXVlIG5hbWUuIE90aGVyd2lzZSBcIkNocmFnRXJyb3Iubm90RW5hYmxlZFwiIG1heSBiZSBsb2dnZWQgYXNcclxuLy8gXCJDaHJhZ0Vycm9yLm1pblwiLlxyXG5lbnVtIENocmFnRXJyb3JMaW1pdHMge1xyXG4gICAgbWluID0gQ2hyYWdFcnJvci5ub3RFbmFibGVkLFxyXG4gICAgbWF4ID0gQ2hyYWdFcnJvci5oZWxwZXJVbnJlc3BvbnNpdmVcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyYWdFcnJvcih0eXBlOiBDaHJhZ0Vycm9yKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNJblJhbmdlKHR5cGUsIENocmFnRXJyb3JMaW1pdHMubWluLCBDaHJhZ0Vycm9yTGltaXRzLm1heCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Vycm9yKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBFcnJvciB7XHJcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFcnJvcjtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXJyb3JzLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBNYXliZSwgbm9uZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IE9wdGlvbk5hbWVzIH0gZnJvbSBcIi4vYmxvY2tlZC1maWxlLXBhZ2Utb3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBmaW5kRG9jdW1lbnRVcmwsIGZpbmRVUkxEb2N1bWVudFF1ZXJ5UGFyYW0gfSBmcm9tIFwiLi91cmwtcGFyc2UtdXRpbHNcIjtcclxuaW1wb3J0IHsgVVJMLCBVUkxUb1N0cmluZyB9IGZyb20gXCIuL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBCbG9ja2VkRmlsZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9ibG9ja2VkLWZpbGUtY29udHJvbGxlclwiO1xyXG5cclxuY2xhc3MgT3B0aW9ucyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBmaWxlVVJMOiBVUkwpIHt9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9ucyh3aW5kb3c6IFdpbmRvdyk6IE1heWJlPE9wdGlvbnM+IHtcclxuICAgIGNvbnN0IGRvY3VtZW50VVJMID0gZmluZERvY3VtZW50VXJsKHdpbmRvdyk7XHJcbiAgICBpZiAobm9uZShkb2N1bWVudFVSTCkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZmlsZVVSTCA9IGZpbmRVUkxEb2N1bWVudFF1ZXJ5UGFyYW0oZG9jdW1lbnRVUkwsIE9wdGlvbk5hbWVzLmZpbGVVcmxTcGVjKTtcclxuICAgIGlmIChub25lKGZpbGVVUkwpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgT3B0aW9ucyhmaWxlVVJMKTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzU0OTc2XHJcbmZ1bmN0aW9uIGluaXRDaHJvbWVSdW50aW1lKCkge1xyXG4gICAgY29uc3QgcnVudGltZSA9IGNocm9tZS5ydW50aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWluKHdpbmRvdzogV2luZG93KSB7XHJcbiAgICBpbml0Q2hyb21lUnVudGltZSgpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyh3aW5kb3cpO1xyXG4gICAgaWYgKG5vbmUob3B0aW9ucykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gVVJMVG9TdHJpbmcob3B0aW9ucy5maWxlVVJMKTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQmxvY2tlZEZpbGVDb250cm9sbGVyKGRvY3VtZW50LCBvcHRpb25zLmZpbGVVUkwpO1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgbWFpbih3aW5kb3cpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbWFpbi50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuZXhwb3J0IGVudW0gT3B0aW9uTmFtZXMge1xyXG4gICAgZmlsZVVybFNwZWMgPSBcImZpbGVVcmxTcGVjXCJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9ibG9ja2VkLWZpbGUtcGFnZS1vcHRpb25zLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBNYXliZSwgc29tZSwgbm9uZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IE9yaWdpbiwgcGFyc2VPcmlnaW4gfSBmcm9tIFwiLi9vcmlnaW5cIjtcclxuaW1wb3J0IHsgVVJMLCBwYXJzZVVybCB9IGZyb20gXCIuL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBwYXJzZU51bWJlciB9IGZyb20gXCIuL251bWJlci11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREb2N1bWVudFVybCh3aW5kb3cgOiBXaW5kb3cpIDogTWF5YmU8VVJMPiB7XHJcbiAgICByZXR1cm4gcGFyc2VVcmwod2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xyXG59XHJcblxyXG4vLyBUaGlzIGlzbid0IGEgcGVyZmVjdCBzZWFyY2ggcGFyYW0gZ2V0dGVyIGJ1dCBpdCBzaG91bGQgYmUgZmluZSBmb3IgZGVjb2RpbmdcclxuLy8gb3VyIGJsb2NrZWQgcGFnZSBhbmQgZXh0ZXJuYWwgYXBwIGxpbmsgcGFnZSBVUkxzLlxyXG5mdW5jdGlvbiBnZXRRdWVyeVBhcmFtRnJvbVNlYXJjaChzZWFyY2g6IHN0cmluZywgcXVlcnlQYXJhbTogc3RyaW5nKSA6IHN0cmluZ3xudWxsIHtcclxuICAgIC8vIFJlbW92ZSB0aGUgbGVhZGluZyBcIj9cIi5cclxuICAgIGNvbnN0IHBhcmFtc1N0cmluZyA9IHNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblxyXG4gICAgLy8gU3BsaXQgdGhlIHBhcmFtcyBzdHJpbmcgdXAgaW50byBcImtleT12YWx1ZVwiIHN0cmluZ3MuXHJcbiAgICBjb25zdCBwYXJhbXMgPSBwYXJhbXNTdHJpbmcuc3BsaXQoXCImXCIpXHJcblxyXG4gICAgLy8gU3BsaXQgZWFjaCBcImtleT12YWx1ZVwiIHN0cmluZyBpbnRvIGEga2V5IHZhbHVlIHBhaXIuXHJcbiAgICBmb3IgKGNvbnN0IHBhaXJTdHJpbmcgb2YgcGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFpciA9IHBhaXJTdHJpbmcuc3BsaXQoXCI9XCIpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgZGVjb2RlZCBrZXkgbWF0Y2hlcyB0aGUgcXVlcnkgcGFyYW0gd2UncmUgbG9va2luZyBmb3IgdGhlblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgZGVjb2RlZCB2YWx1ZS5cclxuICAgICAgICBpZiAoZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pID09PSBxdWVyeVBhcmFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gbnVsbCBpZiBbcXVlcnlQYXJhbV0gaXNuJ3QgZm91bmQgYmVjYXVzZSB0aGF0J3Mgd2hhdFxyXG4gICAgLy8gVVJMU2VhcmNoUGFyYW1zLmdldCgpIGRvZXMuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREb2N1bWVudFF1ZXJ5UGFyYW0oZG9jdW1lbnRVcmwgOiBNYXliZTxVUkw+LCBxdWVyeVBhcmFtIDogc3RyaW5nKSA6IE1heWJlPHN0cmluZz4ge1xyXG4gICAgaWYgKG5vbmUoZG9jdW1lbnRVcmwpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRWRnZSBkb2Vzbid0IGltcGxlbWVudCBVUkwuc2VhcmNoUGFyYW1zIHNvIHdlIG11c3QgYmUgcHJlcGFyZWQgdG8gZGVjb2RlXHJcbiAgICAvLyBVUkwuc2VhcmNoIG91cnNlbHZlcy5cclxuICAgIGxldCB2YWx1ZSA9IG51bGw7XHJcbiAgICBpZiAoZG9jdW1lbnRVcmwuc2VhcmNoUGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyBBcyBvZiBSZWRzdG9uZSA0IEVkZ2Ugc3VwcG9ydHMgdGhlIFVSTFNlYXJjaFBhcmFtcyB0eXBlIHNvIHRyeSB0aGF0LlxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoZG9jdW1lbnRVcmwuc2VhcmNoKTtcclxuICAgICAgICAgICAgdmFsdWUgPSBzZWFyY2hQYXJhbXMuZ2V0KHF1ZXJ5UGFyYW0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBnZXRRdWVyeVBhcmFtRnJvbVNlYXJjaChkb2N1bWVudFVybC5zZWFyY2gsIHF1ZXJ5UGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPSBkb2N1bWVudFVybC5zZWFyY2hQYXJhbXMuZ2V0KHF1ZXJ5UGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kVVJMRG9jdW1lbnRRdWVyeVBhcmFtKGRvY3VtZW50VXJsIDogTWF5YmU8VVJMPiwgcXVlcnlQYXJhbTogc3RyaW5nKSA6IE1heWJlPFVSTD4ge1xyXG4gICAgY29uc3QgcXVlcnlQYXJhbVZhbHVlID0gZmluZERvY3VtZW50UXVlcnlQYXJhbShkb2N1bWVudFVybCwgcXVlcnlQYXJhbSk7XHJcbiAgICBpZiAobm9uZShxdWVyeVBhcmFtVmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZVVybChxdWVyeVBhcmFtVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZE51bWJlckRvY3VtZW50UXVlcnlQYXJhbShkb2N1bWVudFVybDogTWF5YmU8VVJMPiwgcXVlcnlQYXJhbU5hbWU6IHN0cmluZykgOiBNYXliZTxudW1iZXI+IHtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1WYWx1ZSA9IGZpbmREb2N1bWVudFF1ZXJ5UGFyYW0oZG9jdW1lbnRVcmwsIHF1ZXJ5UGFyYW1OYW1lKTtcclxuICAgIGlmIChub25lKHF1ZXJ5UGFyYW1WYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlTnVtYmVyKHF1ZXJ5UGFyYW1WYWx1ZSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi91cmwtcGFyc2UtdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IE1heWJlLCBzb21lLCBub25lIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgSGFzaCB9IGZyb20gXCIuL2hhc2hcIjtcclxuaW1wb3J0IHsgbXVybXVySGFzaCB9IGZyb20gXCIuL211cm11ci1oYXNoXCI7XHJcbmltcG9ydCB7IFVSTCwgVVJMT3JTcGVjLCBwYXJzZVVybCB9IGZyb20gXCIuL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBIYXNoU2V0IH0gZnJvbSBcIi4vaGFzaC1tYXBcIjtcclxuaW1wb3J0IHsgbG9nLCBsb2dFcnJvciB9IGZyb20gXCIuL2xvZ1wiO1xyXG5pbXBvcnQgeyBRbG9iYmVyVHJ1ZSwgUWxvYmJlciB9IGZyb20gXCJxbG9iYmVyXCI7XHJcbmltcG9ydCB7IFNpdGVBbmRFeHBpcnkgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xyXG5cclxuY29uc3QgZXhjbHVzaW9uUHJlZml4ID0gXCJeXCI7XHJcblxyXG4vLyBSZWd1bGFyIGV4cHJlc3Npb24gZnJvbSBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3BhZ2UtNTBcclxuY29uc3Qgd2lsZGNhcmRTcGVjUmVnZXggPSBuZXcgUmVnRXhwKFwiXigoW146Lz8jXSspOik/KC8vKFteLz8jXSopKT8oW14/I10qKShcXFxcPyhbXiNdKikpPygjKC4qKSk/XCIpO1xyXG5cclxuZW51bSBXaWxkY2FyZFNwZWNHcm91cCB7XHJcbiAgICBTY2hlbWUgPSAxLFxyXG4gICAgSG9zdEFuZFBvcnQgPSA0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPcmlnaW5QYXJzZU9wdGlvbnMge1xyXG4gICAgcmVhZG9ubHkgYWxsb3dOb25XZWJTYWZlU2NoZW1lcyA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlYWRvbmx5IGFsbG93RmlsZVNjaGVtZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dDaHJvbWVTY2hlbWUgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd0VkZ2VTY2hlbWUgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd0Fib3V0U2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dDaHJvbWVFeHRlbnNpb25TY2hlbWUgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd0ZpcmVmb3hFeHRlbnNpb25TY2hlbWUgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd0VkZ2VFeHRlbnNpb25TY2hlbWUgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd1dpbGRjYXJkcyA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlYWRvbmx5IGFsbG93TWlzc2luZ1dpbGRjYXJkU2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dUcmFpbGluZ1dpbGRjYXJkcyA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9ucz8gOiBQYXJ0aWFsPE9yaWdpblBhcnNlT3B0aW9ucz4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3JpZ2luSGFzaE9wdGlvbnMge1xyXG4gICAgcmVhZG9ubHkgc2VlZCA6IEhhc2ggPSAwO1xyXG4gICAgcmVhZG9ubHkgaWdub3JlSHR0cEh0dHBzRGlmZmVyZW5jZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgaWdub3JlUG9ydCA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9ucz8gOiBQYXJ0aWFsPE9yaWdpbkhhc2hPcHRpb25zPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNjaGVtZSB7XHJcbiAgICBIVFRQID0gXCJodHRwOlwiLFxyXG4gICAgSFRUUFMgPSBcImh0dHBzOlwiLFxyXG4gICAgRlRQID0gXCJmdHA6XCIsXHJcbiAgICBGVFBTID0gXCJmdHBzOlwiLFxyXG4gICAgV1MgPSBcIndzOlwiLFxyXG4gICAgV1NTID0gXCJ3c3M6XCIsXHJcbiAgICBGSUxFID0gXCJmaWxlOlwiLFxyXG4gICAgQ0hST01FID0gXCJjaHJvbWU6XCIsXHJcbiAgICBFREdFID0gXCJlZGdlOlwiLFxyXG4gICAgQUJPVVQgPSBcImFib3V0OlwiLFxyXG4gICAgSkFWQVNDUklQVCA9IFwiamF2YXNjcmlwdDpcIixcclxuICAgIENIUk9NRV9FWFRFTlNJT04gPSBcImNocm9tZS1leHRlbnNpb246XCIsXHJcbiAgICBGSVJFRk9YX0VYVEVOU0lPTiA9IFwibW96LWV4dGVuc2lvbjpcIixcclxuICAgIEVER0VfRVhURU5TSU9OID0gXCJtcy1icm93c2VyLWV4dGVuc2lvbjpcIixcclxuICAgIFdJTERDQVJEX09ORSA9IFwiKzpcIixcclxuICAgIFdJTERDQVJEX1NPTUUgPSBcIio6XCJcclxufVxyXG5cclxuY29uc3QgbWF0Y2hlck9wdGlvbnMgPSB7XHJcbiAgICBzZXBhcmF0b3I6IFwiLlwiLFxyXG4gICAgd2lsZGNhcmRfb25lOiBTY2hlbWUuV0lMRENBUkRfT05FWzBdLFxyXG4gICAgd2lsZGNhcmRfc29tZTogU2NoZW1lLldJTERDQVJEX1NPTUVbMF0sXHJcbiAgICBjYWNoZV9hZGRzOiBmYWxzZVxyXG59O1xyXG5cclxuY29uc3QgdHJhaWxpbmdXaWxkY2FyZHMgPSBbXHJcbiAgICBtYXRjaGVyT3B0aW9ucy5zZXBhcmF0b3IgKyBtYXRjaGVyT3B0aW9ucy53aWxkY2FyZF9vbmUsXHJcbiAgICBtYXRjaGVyT3B0aW9ucy5zZXBhcmF0b3IgKyBtYXRjaGVyT3B0aW9ucy53aWxkY2FyZF9zb21lXHJcbl07XHJcblxyXG5mdW5jdGlvbiBpc1dlYlNhZmVTY2hlbWUoc2NoZW1lOiBNYXliZTxTY2hlbWU+KTogYm9vbGVhbiB7XHJcbiAgICBzd2l0Y2ggKHNjaGVtZSkge1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkhUVFA6XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkhUVFBTOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFBvcnQgPSBudW1iZXI7XHJcbmNvbnN0IHN0YW5kYXJkUG9ydHMgPSBuZXcgTWFwPFNjaGVtZSwgUG9ydD4oW1xyXG4gICAgW1NjaGVtZS5IVFRQLCA4MF0sIFtTY2hlbWUuSFRUUFMsIDQ0M11dKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcmlnaW4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNjaGVtZTogU2NoZW1lLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBob3N0OiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHBvcnQ6IE1heWJlPFBvcnQ+KSB7IH1cclxuXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBpZiAodGhpcy5wb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuc2NoZW1lfS8vJHt0aGlzLmhvc3R9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5zY2hlbWV9Ly8ke3RoaXMuaG9zdH06JHt0aGlzLnBvcnR9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9EaXNwbGF5U3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhvc3Q7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVPcmlnaW4oYTogTWF5YmU8T3JpZ2luPiwgYjogTWF5YmU8T3JpZ2luPiwgb3B0aW9ucyA9IG5ldyBPcmlnaW5IYXNoT3B0aW9ucygpKSB7XHJcbiAgICBpZiAobm9uZShhKSB8fCBub25lKGIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzY2hlbWVBID0gYS5zY2hlbWU7XHJcbiAgICBsZXQgc2NoZW1lQiA9IGIuc2NoZW1lO1xyXG4gICAgaWYgKG9wdGlvbnMuaWdub3JlSHR0cEh0dHBzRGlmZmVyZW5jZSkge1xyXG4gICAgICAgIGlmIChzY2hlbWVBID09PSBTY2hlbWUuSFRUUCkge1xyXG4gICAgICAgICAgICBzY2hlbWVBID0gU2NoZW1lLkhUVFBTO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2NoZW1lQiA9PT0gU2NoZW1lLkhUVFApIHtcclxuICAgICAgICAgICAgc2NoZW1lQiA9IFNjaGVtZS5IVFRQUztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2NoZW1lQSAhPT0gc2NoZW1lQikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhLmhvc3QgIT09IGIuaG9zdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmlnbm9yZVBvcnQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChhLnBvcnQgPT09IHVuZGVmaW5lZCAmJiBiLnBvcnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhLnBvcnQgIT09IHVuZGVmaW5lZCAmJiBiLnBvcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhLnBvcnQgPT09IHVuZGVmaW5lZCAmJiBiLnBvcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGEucG9ydCA9PT0gYi5wb3J0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzaE9yaWdpbihvcmlnaW46IE9yaWdpbiwgb3B0aW9ucyA9IG5ldyBPcmlnaW5IYXNoT3B0aW9ucygpKTogSGFzaCB7XHJcbiAgICBsZXQgaGFzaCA9IG9wdGlvbnMuc2VlZDtcclxuICAgIGxldCBzY2hlbWUgPSBvcmlnaW4uc2NoZW1lO1xyXG4gICAgaWYgKG9wdGlvbnMuaWdub3JlSHR0cEh0dHBzRGlmZmVyZW5jZSAmJiAoc2NoZW1lID09PSBTY2hlbWUuSFRUUCkpIHtcclxuICAgICAgICBzY2hlbWUgPSBTY2hlbWUuSFRUUFM7XHJcbiAgICB9XHJcbiAgICBoYXNoID0gbXVybXVySGFzaChzY2hlbWUsIGhhc2gpO1xyXG4gICAgaGFzaCA9IG11cm11ckhhc2gob3JpZ2luLmhvc3QsIGhhc2gpO1xyXG4gICAgaWYgKCFvcHRpb25zLmlnbm9yZVBvcnQgJiYgKG9yaWdpbi5wb3J0ICE9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgaGFzaCA9IG11cm11ckhhc2gob3JpZ2luLnBvcnQsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc2g7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlU2NoZW1lKHByb3RvY29sOiBzdHJpbmcsIG9wdGlvbnM6IE9yaWdpblBhcnNlT3B0aW9ucyk6IE1heWJlPFNjaGVtZT4ge1xyXG4gICAgbGV0IHNjaGVtZTogTWF5YmU8U2NoZW1lPiA9IHVuZGVmaW5lZDtcclxuICAgIHN3aXRjaCAocHJvdG9jb2wudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkhUVFA6XHJcbiAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5IVFRQO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5IVFRQUzpcclxuICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLkhUVFBTO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5GSUxFOlxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hbGxvd0ZpbGVTY2hlbWUpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5GSUxFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkNIUk9NRTpcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dDaHJvbWVTY2hlbWUpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5DSFJPTUU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTY2hlbWUuRURHRTpcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dFZGdlU2NoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuRURHRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5BQk9VVDpcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dBYm91dFNjaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLkFCT1VUO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkNIUk9NRV9FWFRFTlNJT046XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93Q2hyb21lRXh0ZW5zaW9uU2NoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuQ0hST01FX0VYVEVOU0lPTjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5GSVJFRk9YX0VYVEVOU0lPTjpcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dGaXJlZm94RXh0ZW5zaW9uU2NoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuRklSRUZPWF9FWFRFTlNJT047XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTY2hlbWUuRURHRV9FWFRFTlNJT046XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93RWRnZUV4dGVuc2lvblNjaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLkVER0VfRVhURU5TSU9OO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLldJTERDQVJEX09ORTpcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dXaWxkY2FyZHMpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5XSUxEQ0FSRF9PTkU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLldJTERDQVJEX1NPTUU6XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93V2lsZGNhcmRzKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuV0lMRENBUkRfU09NRTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChpc1dlYlNhZmVTY2hlbWUoc2NoZW1lKSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWU7XHJcbiAgICB9XHJcbiAgICBpZiAoKChzY2hlbWUgPT09IFNjaGVtZS5XSUxEQ0FSRF9PTkUpIHx8XHJcbiAgICAgICAgIChzY2hlbWUgPT09IFNjaGVtZS5XSUxEQ0FSRF9TT01FKSkgJiZcclxuICAgICAgICBvcHRpb25zLmFsbG93V2lsZGNhcmRzKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtZTtcclxuICAgIH0gZWxzZSBpZiAoKHNjaGVtZSA9PT0gU2NoZW1lLkZJTEUpICYmXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmFsbG93RmlsZVNjaGVtZSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWU7XHJcbiAgICB9IGVsc2UgaWYgKChzY2hlbWUgPT09IFNjaGVtZS5DSFJPTUVfRVhURU5TSU9OKSAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0Nocm9tZUV4dGVuc2lvblNjaGVtZSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWU7XHJcbiAgICB9IGVsc2UgaWYgKChzY2hlbWUgPT09IFNjaGVtZS5GSVJFRk9YX0VYVEVOU0lPTikgJiZcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dGaXJlZm94RXh0ZW5zaW9uU2NoZW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtZTtcclxuICAgIH0gZWxzZSBpZiAoKHNjaGVtZSA9PT0gU2NoZW1lLkVER0VfRVhURU5TSU9OKSAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0VkZ2VFeHRlbnNpb25TY2hlbWUpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIGlmICgoc2NoZW1lID09PSBTY2hlbWUuQ0hST01FKSAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0Nocm9tZVNjaGVtZSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWU7XHJcbiAgICB9IGVsc2UgaWYgKChzY2hlbWUgPT09IFNjaGVtZS5FREdFKSAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0VkZ2VTY2hlbWUpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIGlmICgoc2NoZW1lID09PSBTY2hlbWUuQUJPVVQpICYmXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmFsbG93QWJvdXRTY2hlbWUpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmFsbG93Tm9uV2ViU2FmZVNjaGVtZXMpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZSh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAodmFsdWUgPj0gbWluKSAmJiAodmFsdWUgPD0gbWF4KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQb3J0KHBvcnRTdHJpbmc6IHN0cmluZywgc2NoZW1lOiBTY2hlbWUpOiBNYXliZTxQb3J0PiB7XHJcbiAgICBjb25zdCBtaW5Qb3J0ID0gMDtcclxuICAgIGNvbnN0IG1heFBvcnQgPSAoMiA8PCAxNikgLSAxO1xyXG5cclxuICAgIGlmIChpc0VtcHR5KHBvcnRTdHJpbmcpKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YW5kYXJkUG9ydHMuZ2V0KHNjaGVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmFkaXggPSAxMDtcclxuICAgIGNvbnN0IHBvcnQgPSBwYXJzZUludChwb3J0U3RyaW5nLCByYWRpeCk7XHJcblxyXG4gICAgaWYgKCFpc0luUmFuZ2UocG9ydCwgbWluUG9ydCwgbWF4UG9ydCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG9ydCAke3BvcnR9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9ydDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT3JpZ2luKHVybE9yU3BlYzogVVJMT3JTcGVjLCBvcHRpb25zID0gbmV3IE9yaWdpblBhcnNlT3B0aW9ucygpKTogTWF5YmU8T3JpZ2luPiB7XHJcbiAgICBpZiAodXJsT3JTcGVjIGluc3RhbmNlb2YgVVJMKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlT3JpZ2luRnJvbVVSTCh1cmxPclNwZWMsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VPcmlnaW5Gcm9tU3BlYyh1cmxPclNwZWMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZU9yaWdpbkZyb21VUkwodXJsOiBVUkwsIG9wdGlvbnM6IE9yaWdpblBhcnNlT3B0aW9ucyk6IE1heWJlPE9yaWdpbj4ge1xyXG4gICAgY29uc3Qgc2NoZW1lID0gcGFyc2VTY2hlbWUodXJsLnByb3RvY29sLCBvcHRpb25zKTtcclxuICAgIGlmIChzY2hlbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHBvcnQgPSBwYXJzZVBvcnQodXJsLnBvcnQsIHNjaGVtZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPcmlnaW4oc2NoZW1lLCB1cmwuaG9zdG5hbWUsIHBvcnQpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlT3JpZ2luRnJvbVNwZWMoc3BlYzogc3RyaW5nLCBvcHRpb25zOiBPcmlnaW5QYXJzZU9wdGlvbnMpOiBNYXliZTxPcmlnaW4+IHtcclxuICAgIGlmIChvcHRpb25zLmFsbG93V2lsZGNhcmRzKSB7XHJcbiAgICAgICAgaWYgKCFzcGVjLmluY2x1ZGVzKFwiOi8vXCIpICYmIG9wdGlvbnMuYWxsb3dNaXNzaW5nV2lsZGNhcmRTY2hlbWUpIHtcclxuICAgICAgICAgICAgc3BlYyA9IFNjaGVtZS5XSUxEQ0FSRF9PTkUgKyBcIi8vXCIgKyBzcGVjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB3aWxkY2FyZFNwZWNSZWdleC5leGVjKHNwZWMpO1xyXG4gICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVnRXhwRXhlY0FycmF5IGlzIGRlZmluZWQgaW5jb3JyZWN0bHkgc28gd2UgaGF2ZSB0byBjaGVjayBmb3IgdW5kZWZpbmVkIG91cnNlbHZlczpcclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzE3OTYzXHJcbiAgICAgICAgY29uc3QgbWF5YmVTY2hlbWUgPSBtYXRjaFtXaWxkY2FyZFNwZWNHcm91cC5TY2hlbWVdO1xyXG4gICAgICAgIGlmIChtYXliZVNjaGVtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNjaGVtZSA9IHBhcnNlU2NoZW1lKG1heWJlU2NoZW1lLCBvcHRpb25zKTtcclxuICAgICAgICBpZiAoc2NoZW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1heWJlSG9zdEFuZFBvcnQgPSBtYXRjaFtXaWxkY2FyZFNwZWNHcm91cC5Ib3N0QW5kUG9ydF07XHJcbiAgICAgICAgaWYgKG1heWJlSG9zdEFuZFBvcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBob3N0QW5kUG9ydCA9IG1heWJlSG9zdEFuZFBvcnQuc3BsaXQoJzonKTtcclxuICAgICAgICBjb25zdCBob3N0ID0gaG9zdEFuZFBvcnRbMF07XHJcbiAgICAgICAgaWYgKGlzRW1wdHkoaG9zdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9ydCA9IHBhcnNlUG9ydChob3N0QW5kUG9ydC5sZW5ndGggPiAxID8gaG9zdEFuZFBvcnRbMV0gOiAnJywgc2NoZW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93VHJhaWxpbmdXaWxkY2FyZHMpIHtcclxuICAgICAgICAgICAgLy8gVHJhaWxpbmcgd2lsZGNhcmRzIHJpc2sgbWF0Y2hpbmcgc29tZXRoaW5nIGxpa2UgZ29vZ2xlLmNvbS5ldmlsIGJ5IG1pc3Rha2VcclxuICAgICAgICAgICAgaWYgKHRyYWlsaW5nV2lsZGNhcmRzLnNvbWUodHJhaWxpbmdXaWxkY2FyZCA9PiBob3N0Lmxlbmd0aCA+PSB0cmFpbGluZ1dpbGRjYXJkLmxlbmd0aCAmJiBob3N0LmVuZHNXaXRoKHRyYWlsaW5nV2lsZGNhcmQpKSkge1xyXG4gICAgICAgICAgICAgICAgbG9nRXJyb3IobmV3IEVycm9yKGBSdWxlIFVSTCBob3N0bmFtZSBlbmRzIGluIHRyYWlsaW5nIHdpbGRjYXJkOiAke3NwZWN9YCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBPcmlnaW4oc2NoZW1lLCBob3N0LCBwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmwgPSBwYXJzZVVybChzcGVjKTtcclxuICAgIGlmICh1cmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VPcmlnaW5Gcm9tVVJMKHVybCwgb3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlT3JpZ2luU2V0KG9wdGlvbnMgPSBuZXcgT3JpZ2luSGFzaE9wdGlvbnMoKSk6IEhhc2hTZXQ8T3JpZ2luPiB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hTZXQ8T3JpZ2luPihcclxuICAgICAgICAob3JpZ2luIDogT3JpZ2luKSA9PiBoYXNoT3JpZ2luKG9yaWdpbiwgb3B0aW9ucyksXHJcbiAgICAgICAgKGEgOiBPcmlnaW4sIGIgOiBPcmlnaW4pID0+IGlzU2FtZU9yaWdpbihhLCBiLCBvcHRpb25zKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9yaWdpblNldChzcGVjTGlzdDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcHRpb25zID0gbmV3IE9yaWdpbkhhc2hPcHRpb25zKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IE9yaWdpblBhcnNlT3B0aW9ucygpKTogSGFzaFNldDxPcmlnaW4+IHtcclxuICAgIGNvbnN0IHNwZWNTZXQgPSBtYWtlT3JpZ2luU2V0KHNldE9wdGlvbnMpO1xyXG4gICAgZm9yIChjb25zdCBzcGVjIG9mIHNwZWNMaXN0KSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gcGFyc2VPcmlnaW4oc3BlYywgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKG9yaWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNwZWNTZXQuYWRkKG9yaWdpbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNwZWNTZXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvcGljRm9yT3JpZ2luKG9yaWdpbiA6IE9yaWdpbikgOiBzdHJpbmcge1xyXG4gICAgbGV0IHNjaGVtZSA9IG9yaWdpbi5zY2hlbWU7XHJcbiAgICBpZiAoc2NoZW1lID09PSBTY2hlbWUuV0lMRENBUkRfU09NRSkge1xyXG4gICAgICAgIHNjaGVtZSA9IFNjaGVtZS5XSUxEQ0FSRF9PTkU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2NoZW1lLnNsaWNlKDAsIC0xKSArIG1hdGNoZXJPcHRpb25zLnNlcGFyYXRvciArIG9yaWdpbi5ob3N0O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3JpZ2luTWF0Y2hlciB7XHJcbiAgICBhZGQob3JpZ2luIDogT3JpZ2luKSA6IE9yaWdpbk1hdGNoZXIge1xyXG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNGb3JPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICB0aGlzLm1hdGNoZXIuYWRkKHRvcGljKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBleGNsdWRlKG9yaWdpbiA6IE9yaWdpbikgOiBPcmlnaW5NYXRjaGVyIHtcclxuICAgICAgICBjb25zdCB0b3BpYyA9IHRvcGljRm9yT3JpZ2luKG9yaWdpbik7XHJcbiAgICAgICAgdGhpcy5leGNsdWRlX21hdGNoZXIuYWRkKHRvcGljKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoYXMob3JpZ2luIDogT3JpZ2luKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNGb3JPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVyLnRlc3QodG9waWMpICYmICF0aGlzLmV4Y2x1ZGVfbWF0Y2hlci50ZXN0KHRvcGljKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hdGNoZXIgOiBRbG9iYmVyVHJ1ZSA9IG5ldyBRbG9iYmVyVHJ1ZShtYXRjaGVyT3B0aW9ucyk7XHJcbiAgICBwcml2YXRlIGV4Y2x1ZGVfbWF0Y2hlciA6IFFsb2JiZXJUcnVlID0gbmV3IFFsb2JiZXJUcnVlKG1hdGNoZXJPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT3JpZ2luTWF0Y2hlcihzcGVjTGlzdCA6IHN0cmluZ1tdLCBvcHRpb25zID0gbmV3IE9yaWdpblBhcnNlT3B0aW9ucygpKSA6IE9yaWdpbk1hdGNoZXIge1xyXG4gICAgaWYgKHNwZWNMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsb2coYG1ha2luZyBtYXRjaGVyIGZyb20gJHtzcGVjTGlzdC5sZW5ndGh9IGVudHJpZXNgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1hdGNoZXIgPSBuZXcgT3JpZ2luTWF0Y2hlcigpO1xyXG4gICAgZm9yIChjb25zdCBzcGVjIG9mIHNwZWNMaXN0KSB7XHJcbiAgICAgICAgaWYgKHNwZWMuc3RhcnRzV2l0aChleGNsdXNpb25QcmVmaXgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHBhcnNlT3JpZ2luKHNwZWMuc3Vic3RyKGV4Y2x1c2lvblByZWZpeC5sZW5ndGgpLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVyLmV4Y2x1ZGUob3JpZ2luKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHBhcnNlT3JpZ2luKHNwZWMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAob3JpZ2luICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXIuYWRkKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc3BlY0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxvZygnZmluaXNoZWQgbWFraW5nIG1hdGNoZXInKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXRjaGVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3JpZ2luRXhwaXJ5TWF0Y2hlciB7XHJcbiAgICBhZGQob3JpZ2luIDogT3JpZ2luLCBleHBpcnkgOiBudW1iZXIpIDogT3JpZ2luRXhwaXJ5TWF0Y2hlciB7XHJcbiAgICAgICAgY29uc3QgdG9waWMgPSB0b3BpY0Zvck9yaWdpbihvcmlnaW4pO1xyXG4gICAgICAgIHRoaXMubWF0Y2hlci5hZGQodG9waWMsIGV4cGlyeSk7XHJcbiAgICAgICAgLy8gTm90ZTogbG9nZ2luZyBoZXJlIGZvciBlYWNoIGVudHJ5IHNsb3dzIGRvd24gYWRkaW5nIDUwMDAgb3JpZ2lucyBmcm9tIDEwMG1zIHRvIDdzIVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhvcmlnaW4gOiBPcmlnaW4pIDogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdG9waWMgPSB0b3BpY0Zvck9yaWdpbihvcmlnaW4pO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyaWVzID0gdGhpcy5tYXRjaGVyLm1hdGNoKHRvcGljKTtcclxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpIC8gMTAwMDsgLy8gZXhwaXJpZXMgYXJlIHNlY29uZHNcclxuICAgICAgICAvLyBMb29rIGZvciBhbnkgbWF0Y2hpbmcgcmVwdXRhdGlvbiBlbnRyaWVzIGZvciB0aGUgb3JpZ2luIHdoaWNoIGhhdmVuJ3QgZXhwaXJlZFxyXG4gICAgICAgIGZvciAoY29uc3QgZXhwaXJ5IG9mIGV4cGlyaWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChleHBpcnkgPiBub3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hdGNoZXIgOiBRbG9iYmVyPG51bWJlcj4gPSBuZXcgUWxvYmJlcjxudW1iZXI+KG1hdGNoZXJPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlT3JpZ2luRXhwaXJ5TWF0Y2hlcihzcGVjTGlzdCA6IFNpdGVBbmRFeHBpcnlbXSwgb3B0aW9ucyA9IG5ldyBPcmlnaW5QYXJzZU9wdGlvbnMoKSkgOiBPcmlnaW5FeHBpcnlNYXRjaGVyIHtcclxuICAgIGlmIChzcGVjTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbG9nKGBtYWtpbmcgZXhwaXJ5IG1hdGNoZXIgZnJvbSAke3NwZWNMaXN0Lmxlbmd0aH0gZW50cmllc2ApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWF0Y2hlciA9IG5ldyBPcmlnaW5FeHBpcnlNYXRjaGVyKCk7XHJcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpIC8gMTAwMDsgLy8gZXhwaXJpZXMgYXJlIHNlY29uZHNcclxuICAgIGZvciAoY29uc3QgW3NwZWMsIGV4cGlyeV0gb2Ygc3BlY0xpc3QpIHtcclxuICAgICAgICBpZiAoZXhwaXJ5ID4gbm93KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHBhcnNlT3JpZ2luKHNwZWMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAob3JpZ2luICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXIuYWRkKG9yaWdpbiwgZXhwaXJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzcGVjTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbG9nKCdmaW5pc2hlZCBtYWtpbmcgZXhwaXJ5IG1hdGNoZXInKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXRjaGVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3JpZ2luR3JvdXBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgYWRkRnJvbVNwZWNMaXN0KHNwZWNMaXN0IDogc3RyaW5nW10sIGdyb3VwIDogc3RyaW5nLCBvcHRpb25zID0gbmV3IE9yaWdpblBhcnNlT3B0aW9ucygpKSA6IE9yaWdpbkdyb3VwZXIge1xyXG4gICAgICAgIGZvciAoY29uc3Qgc3BlYyBvZiBzcGVjTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEZyb21TcGVjKHNwZWMsIGdyb3VwLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRnJvbVNwZWMoc3BlYyA6IHN0cmluZywgZ3JvdXAgOiBzdHJpbmcsIG9wdGlvbnMgPSBuZXcgT3JpZ2luUGFyc2VPcHRpb25zKCkpIDogT3JpZ2luR3JvdXBlciB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gcGFyc2VPcmlnaW4oc3BlYywgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKHNvbWUob3JpZ2luKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZChvcmlnaW4sIGdyb3VwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG9yaWdpbiA6IE9yaWdpbiwgZ3JvdXAgOiBzdHJpbmcpIDogT3JpZ2luR3JvdXBlciB7XHJcbiAgICAgICAgY29uc3QgdG9waWMgPSB0b3BpY0Zvck9yaWdpbihvcmlnaW4pO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBlci5hZGQodG9waWMsIGdyb3VwKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBtYXRjaChvcmlnaW4gOiBPcmlnaW4pIDogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNGb3JPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cGVyLm1hdGNoKHRvcGljKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdyb3VwZXIgPSBuZXcgUWxvYmJlcjxzdHJpbmc+KG1hdGNoZXJPcHRpb25zKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL29yaWdpbi50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnREYXRlVGltZVN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZGF0ZS11dGlscy50cyIsIi8qanNsaW50IG5vZGU6IHRydWUqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL3Fsb2JiZXInKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3Fsb2JiZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuIyBxbG9iYmVyJm5ic3A7Jm5ic3A7Jm5ic3A7WyFbQnVpbGQgU3RhdHVzXShodHRwczovL3RyYXZpcy1jaS5vcmcvZGF2ZWRvZXNkZXYvcWxvYmJlci5wbmcpXShodHRwczovL3RyYXZpcy1jaS5vcmcvZGF2ZWRvZXNkZXYvcWxvYmJlcikgWyFbQ292ZXJhZ2UgU3RhdHVzXShodHRwczovL2NvdmVyYWxscy5pby9yZXBvcy9kYXZlZG9lc2Rldi9xbG9iYmVyL2JhZGdlLnBuZz9icmFuY2g9bWFzdGVyKV0oaHR0cHM6Ly9jb3ZlcmFsbHMuaW8vci9kYXZlZG9lc2Rldi9xbG9iYmVyP2JyYW5jaD1tYXN0ZXIpIFshW05QTSB2ZXJzaW9uXShodHRwczovL2JhZGdlLmZ1cnkuaW8vanMvcWxvYmJlci5wbmcpXShodHRwOi8vYmFkZ2UuZnVyeS5pby9qcy9xbG9iYmVyKVxuXG5Ob2RlLmpzIGdsb2JiaW5nIGZvciBhbXFwLWxpa2UgdG9waWNzLlxuXG5FeGFtcGxlOlxuXG5gYGBqYXZhc2NyaXB0XG52YXIgUWxvYmJlciA9IHJlcXVpcmUoJ3Fsb2JiZXInKS5RbG9iYmVyO1xudmFyIG1hdGNoZXIgPSBuZXcgUWxvYmJlcigpO1xubWF0Y2hlci5hZGQoJ2Zvby4qJywgJ2l0IG1hdGNoZWQhJyk7XG5hc3NlcnQuZGVlcEVxdWFsKG1hdGNoZXIubWF0Y2goJ2Zvby5iYXInKSwgWydpdCBtYXRjaGVkISddKTtcbmFzc2VydChtYXRjaGVyLnRlc3QoJ2Zvby5iYXInLCAnaXQgbWF0Y2hlZCEnKSk7XG5gYGBcblxuVGhlIEFQSSBpcyBkZXNjcmliZWQgW2hlcmVdKCN0YWJsZW9mY29udGVudHMpLlxuXG5xbG9iYmVyIGlzIGltcGxlbWVudGVkIHVzaW5nIGEgdHJpZSwgYXMgZGVzY3JpYmVkIGluIHRoZSBSYWJiaXRNUSBibG9nIHBvc3RzIFtoZXJlXShodHRwOi8vd3d3LnJhYmJpdG1xLmNvbS9ibG9nLzIwMTAvMDkvMTQvdmVyeS1mYXN0LWFuZC1zY2FsYWJsZS10b3BpYy1yb3V0aW5nLXBhcnQtMS8pIGFuZCBbaGVyZV0oaHR0cDovL3d3dy5yYWJiaXRtcS5jb20vYmxvZy8yMDExLzAzLzI4L3ZlcnktZmFzdC1hbmQtc2NhbGFibGUtdG9waWMtcm91dGluZy1wYXJ0LTIvKS5cblxuIyMgSW5zdGFsbGF0aW9uXG5cbmBgYHNoZWxsXG5ucG0gaW5zdGFsbCBxbG9iYmVyXG5gYGBcblxuIyMgQW5vdGhlciBFeGFtcGxlXG5cbkEgbW9yZSBhZHZhbmNlZCBleGFtcGxlIHVzaW5nIHRvcGljcyBmcm9tIHRoZSBbUmFiYml0TVEgdG9waWMgdHV0b3JpYWxdKGh0dHA6Ly93d3cucmFiYml0bXEuY29tL3R1dG9yaWFscy90dXRvcmlhbC1maXZlLXB5dGhvbi5odG1sKTpcblxuYGBgamF2YXNjcmlwdFxudmFyIG1hdGNoZXIgPSBuZXcgUWxvYmJlcigpO1xubWF0Y2hlci5hZGQoJyoub3JhbmdlLionLCAnUTEnKTtcbm1hdGNoZXIuYWRkKCcqLioucmFiYml0JywgJ1EyJyk7XG5tYXRjaGVyLmFkZCgnbGF6eS4jJywgJ1EyJyk7XG5hc3NlcnQuZGVlcEVxdWFsKFsncXVpY2sub3JhbmdlLnJhYmJpdCcsXG4gICAgICAgICAgICAgICAgICAnbGF6eS5vcmFuZ2UuZWxlcGhhbnQnLFxuICAgICAgICAgICAgICAgICAgJ3F1aWNrLm9yYW5nZS5mb3gnLFxuICAgICAgICAgICAgICAgICAgJ2xhenkuYnJvd24uZm94JyxcbiAgICAgICAgICAgICAgICAgICdsYXp5LnBpbmsucmFiYml0JyxcbiAgICAgICAgICAgICAgICAgICdxdWljay5icm93bi5mb3gnLFxuICAgICAgICAgICAgICAgICAgJ29yYW5nZScsXG4gICAgICAgICAgICAgICAgICAncXVpY2sub3JhbmdlLm1hbGUucmFiYml0JyxcbiAgICAgICAgICAgICAgICAgICdsYXp5Lm9yYW5nZS5tYWxlLnJhYmJpdCddLm1hcChmdW5jdGlvbiAodG9waWMpXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXIubWF0Y2godG9waWMpLnNvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICBbWydRMScsICdRMiddLFxuICAgICAgICAgICAgICAgICAgWydRMScsICdRMiddLFxuICAgICAgICAgICAgICAgICAgWydRMSddLFxuICAgICAgICAgICAgICAgICAgWydRMiddLFxuICAgICAgICAgICAgICAgICAgWydRMicsICdRMiddLFxuICAgICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgICAgWydRMiddXSk7XG5gYGBcblxuIyMgTGljZW5jZVxuXG5bTUlUXShMSUNFTkNFKVxuXG4jIyBUZXN0c1xuXG5xbG9iYmVyIHBhc3NlcyB0aGUgW1JhYmJpdE1RIHRvcGljIHRlc3RzXShodHRwczovL2dpdGh1Yi5jb20vcmFiYml0bXEvcmFiYml0bXEtc2VydmVyL2Jsb2IvbWFzdGVyL3NyYy9yYWJiaXRfdGVzdHMuZXJsKSAoSSBjb252ZXJ0ZWQgdGhlbSBmcm9tIEVybGFuZyB0byBKYXZhc2NyaXB0KS5cblxuVG8gcnVuIHRoZSB0ZXN0czpcblxuYGBgc2hlbGxcbmdydW50IHRlc3RcbmBgYFxuXG4jIyBMaW50XG5cbmBgYHNoZWxsXG5ncnVudCBsaW50XG5gYGBcblxuIyMgQ29kZSBDb3ZlcmFnZVxuXG5gYGBzaGVsbFxuZ3J1bnQgY292ZXJhZ2VcbmBgYFxuXG5bSW5zdGFuYnVsXShodHRwOi8vZ290d2FybG9zdC5naXRodWIuaW8vaXN0YW5idWwvKSByZXN1bHRzIGFyZSBhdmFpbGFibGUgW2hlcmVdKGh0dHA6Ly9yYXdnaXQuZGF2ZWRvZXNkZXYuY29tL2RhdmVkb2VzZGV2L3Fsb2JiZXIvbWFzdGVyL2NvdmVyYWdlL2xjb3YtcmVwb3J0L2luZGV4Lmh0bWwpLlxuXG5Db3ZlcmFsbHMgcGFnZSBpcyBbaGVyZV0oaHR0cHM6Ly9jb3ZlcmFsbHMuaW8vci9kYXZlZG9lc2Rldi9xbG9iYmVyKS5cblxuIyMgQmVuY2htYXJrc1xuXG5gYGBzaGVsbFxuZ3J1bnQgYmVuY2hcbmBgYFxuXG5xbG9iYmVyIGlzIGFsc28gYmVuY2htYXJrZWQgaW4gW2FzY29sdGF0b3JpXShodHRwczovL2dpdGh1Yi5jb20vbWNvbGxpbmEvYXNjb2x0YXRvcmkpLlxuXG4jIEFQSVxuKi9cblxuLypqc2xpbnQgbm9kZTogdHJ1ZSwgbm9tZW46IHRydWUgKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLyoqXG5DcmVhdGVzIGEgbmV3IHFsb2JiZXIuXG5cbkBjb25zdHJ1Y3RvclxuQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBDb25maWd1cmVzIHRoZSBxbG9iYmVyLiBVc2UgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuLSBge1N0cmluZ30gc2VwYXJhdG9yYCBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3Igc2VwYXJhdGluZyB3b3JkcyBpbiB0b3BpY3MuIERlZmF1bHRzIHRvICcuJy4gTVFUVCB1c2VzICcvJyBhcyB0aGUgc2VwYXJhdG9yLCBmb3IgZXhhbXBsZS5cblxuLSBge1N0cmluZ30gd2lsZGNhcmRfb25lYCBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3IgbWF0Y2hpbmcgZXhhY3RseSBvbmUgd29yZCBpbiBhIHRvcGljLiBEZWZhdWx0cyB0byAnKicuIE1RVFQgdXNlcyAnKycsIGZvciBleGFtcGxlLlxuXG4tIGB7U3RyaW5nfSB3aWxkY2FyZF9zb21lYCBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3IgbWF0Y2hpbmcgemVybyBvciBtb3JlIHdvcmRzIGluIGEgdG9waWMuIERlZmF1bHRzIHRvICcjJy4gTVFUVCB1c2VzICcjJyB0b28uXG5cbi0gYHtCb29sZWFufSBjYWNoZV9hZGRzYCBXaGV0aGVyIHRvIGNhY2hlIHRvcGljcyB3aGVuIGFkZGluZyB0b3BpYyBtYXRjaGVycy4gVGhpcyB3aWxsIG1ha2UgYWRkaW5nIG11bHRpcGxlIG1hdGNoZXJzIGZvciB0aGUgc2FtZSB0b3BpYyBmYXN0ZXIgYXQgdGhlIGNvc3Qgb2YgZXh0cmEgbWVtb3J5IHVzYWdlLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuKi9cbmZ1bmN0aW9uIFFsb2JiZXIgKG9wdGlvbnMpXG57XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLl9zZXBhcmF0b3IgPSBvcHRpb25zLnNlcGFyYXRvciB8fCAnLic7XG4gICAgdGhpcy5fd2lsZGNhcmRfb25lID0gb3B0aW9ucy53aWxkY2FyZF9vbmUgfHwgJyonO1xuICAgIHRoaXMuX3dpbGRjYXJkX3NvbWUgPSBvcHRpb25zLndpbGRjYXJkX3NvbWUgfHwgJyMnO1xuICAgIHRoaXMuX3RyaWUgPSBuZXcgTWFwKCk7XG4gICAgaWYgKG9wdGlvbnMuY2FjaGVfYWRkcylcbiAgICB7XG4gICAgICAgIHRoaXMuX3Nob3J0Y3V0cyA9IG5ldyBNYXAoKTtcbiAgICB9XG59XG5cblFsb2JiZXIucHJvdG90eXBlLl9pbml0aWFsX3ZhbHVlID0gZnVuY3Rpb24gKHZhbClcbntcbiAgICByZXR1cm4gW3ZhbF07XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fYWRkX3ZhbHVlID0gZnVuY3Rpb24gKHZhbHMsIHZhbClcbntcbiAgICB2YWxzW3ZhbHMubGVuZ3RoXSA9IHZhbDtcbn07XG5cblFsb2JiZXIucHJvdG90eXBlLl9hZGRfdmFsdWVzID0gZnVuY3Rpb24gKGRlc3QsIG9yaWdpbilcbntcbiAgICB2YXIgaSwgZGVzdExlbmd0aCA9IGRlc3QubGVuZ3RoLCBvcmlnaW5MZW5ndGggPSBvcmlnaW4ubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG9yaWdpbkxlbmd0aDsgaSArPSAxKVxuICAgIHtcbiAgICAgICAgZGVzdFtkZXN0TGVuZ3RoICsgaV0gPSBvcmlnaW5baV07XG4gICAgfVxufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX3JlbW92ZV92YWx1ZSA9IGZ1bmN0aW9uICh2YWxzLCB2YWwpXG57XG4gICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gdmFscy5sYXN0SW5kZXhPZih2YWwpO1xuXG4gICAgaWYgKGluZGV4ID49IDApXG4gICAge1xuICAgICAgICB2YWxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHMubGVuZ3RoID09PSAwO1xufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX2FkZCA9IGZ1bmN0aW9uICh2YWwsIGksIHdvcmRzLCBzdWJfdHJpZSlcbntcbiAgICB2YXIgc3QsIHdvcmQ7XG5cbiAgICBpZiAoaSA9PT0gd29yZHMubGVuZ3RoKVxuICAgIHtcbiAgICAgICAgc3QgPSBzdWJfdHJpZS5nZXQodGhpcy5fc2VwYXJhdG9yKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYWRkX3ZhbHVlKHN0LCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgc3QgPSB0aGlzLl9pbml0aWFsX3ZhbHVlKHZhbCk7XG4gICAgICAgICAgICBzdWJfdHJpZS5zZXQodGhpcy5fc2VwYXJhdG9yLCBzdCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzdDtcbiAgICB9XG5cbiAgICB3b3JkID0gd29yZHNbaV07XG4gICAgc3QgPSBzdWJfdHJpZS5nZXQod29yZCk7XG4gICAgXG4gICAgaWYgKCFzdClcbiAgICB7XG4gICAgICAgIHN0ID0gbmV3IE1hcCgpO1xuICAgICAgICBzdWJfdHJpZS5zZXQod29yZCwgc3QpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGhpcy5fYWRkKHZhbCwgaSArIDEsIHdvcmRzLCBzdCk7XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fcmVtb3ZlID0gZnVuY3Rpb24gKHZhbCwgaSwgd29yZHMsIHN1Yl90cmllKVxue1xuICAgIHZhciBzdCwgd29yZCwgcjtcblxuICAgIGlmIChpID09PSB3b3Jkcy5sZW5ndGgpXG4gICAge1xuICAgICAgICBzdCA9IHN1Yl90cmllLmdldCh0aGlzLl9zZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzdCAmJiB0aGlzLl9yZW1vdmVfdmFsdWUoc3QsIHZhbCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1Yl90cmllLmRlbGV0ZSh0aGlzLl9zZXBhcmF0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHdvcmQgPSB3b3Jkc1tpXTtcbiAgICBzdCA9IHN1Yl90cmllLmdldCh3b3JkKTtcblxuICAgIGlmICghc3QpXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgciA9IHRoaXMuX3JlbW92ZSh2YWwsIGkgKyAxLCB3b3Jkcywgc3QpO1xuXG4gICAgaWYgKHN0LnNpemUgPT09IDApXG4gICAge1xuICAgICAgICBzdWJfdHJpZS5kZWxldGUod29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHI7XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fbWF0Y2hfc29tZSA9IGZ1bmN0aW9uICh2LCBpLCB3b3Jkcywgc3QsIGN0eClcbntcbiAgICB2YXIgaiwgdztcblxuICAgIGZvciAodyBvZiBzdC5rZXlzKCkpXG4gICAge1xuICAgICAgICBpZiAodyAhPT0gdGhpcy5fc2VwYXJhdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IgKGogPSBpOyBqIDwgd29yZHMubGVuZ3RoOyBqICs9IDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuX21hdGNoKHYsIGosIHdvcmRzLCBzdCwgY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHY7XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fbWF0Y2ggPSBmdW5jdGlvbiAodiwgaSwgd29yZHMsIHN1Yl90cmllLCBjdHgpXG57XG4gICAgdmFyIHdvcmQsIHN0O1xuXG4gICAgc3QgPSBzdWJfdHJpZS5nZXQodGhpcy5fd2lsZGNhcmRfc29tZSk7XG5cbiAgICBpZiAoc3QpXG4gICAge1xuICAgICAgICAvLyBpbiB0aGUgY29tbW9uIGNhc2UgdGhlcmUgd2lsbCBiZSBubyBtb3JlIGxldmVscy4uLlxuICAgICAgICB2ID0gdGhpcy5fbWF0Y2hfc29tZSh2LCBpLCB3b3Jkcywgc3QsIGN0eCk7XG4gICAgICAgIC8vIGFuZCB3ZSdsbCBlbmQgdXAgbWF0Y2hpbmcgdGhlIHJlc3Qgb2YgdGhlIHdvcmRzOlxuICAgICAgICB2ID0gdGhpcy5fbWF0Y2godiwgd29yZHMubGVuZ3RoLCB3b3Jkcywgc3QsIGN0eCk7XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IHdvcmRzLmxlbmd0aClcbiAgICB7XG4gICAgICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHRoaXMuX3NlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHN0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodi5kZXN0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZF92YWx1ZXModi5kZXN0LCB2LnNvdXJjZSwgY3R4KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRfdmFsdWVzKHYuZGVzdCwgc3QsIGN0eCk7XG4gICAgICAgICAgICAgICAgdiA9IHYuZGVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHYuc291cmNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHYuZGVzdCA9IHYuc291cmNlO1xuICAgICAgICAgICAgICAgIHYuc291cmNlID0gc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkX3ZhbHVlcyh2LCBzdCwgY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICB3b3JkID0gd29yZHNbaV07XG5cbiAgICAgICAgaWYgKCh3b3JkICE9PSB0aGlzLl93aWxkY2FyZF9vbmUpICYmICh3b3JkICE9PSB0aGlzLl93aWxkY2FyZF9zb21lKSlcbiAgICAgICAge1xuICAgICAgICAgICAgc3QgPSBzdWJfdHJpZS5nZXQod29yZCk7XG5cbiAgICAgICAgICAgIGlmIChzdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5fbWF0Y2godiwgaSArIDEsIHdvcmRzLCBzdCwgY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdCA9IHN1Yl90cmllLmdldCh0aGlzLl93aWxkY2FyZF9vbmUpO1xuXG4gICAgICAgICAgICBpZiAoc3QpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuX21hdGNoKHYsIGkgKyAxLCB3b3Jkcywgc3QsIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbn07XG5cblFsb2JiZXIucHJvdG90eXBlLl9tYXRjaDIgPSBmdW5jdGlvbiAodiwgdG9waWMsIGN0eClcbntcbiAgICB2YXIgdmFscyA9IHRoaXMuX21hdGNoKFxuICAgIHtcbiAgICAgICAgc291cmNlOiB2XG4gICAgfSwgMCwgdG9waWMuc3BsaXQodGhpcy5fc2VwYXJhdG9yKSwgdGhpcy5fdHJpZSwgY3R4KTtcblxuICAgIHJldHVybiB2YWxzLnNvdXJjZSB8fCB2YWxzO1xufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX3Rlc3Rfc29tZSA9IGZ1bmN0aW9uICh2LCBpLCB3b3Jkcywgc3QpXG57XG4gICAgdmFyIGosIHc7XG5cbiAgICBmb3IgKHcgb2Ygc3Qua2V5cygpKVxuICAgIHtcbiAgICAgICAgaWYgKHcgIT09IHRoaXMuX3NlcGFyYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yIChqID0gaTsgaiA8IHdvcmRzLmxlbmd0aDsgaiArPSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXN0KHYsIGosIHdvcmRzLCBzdCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblFsb2JiZXIucHJvdG90eXBlLl90ZXN0ID0gZnVuY3Rpb24gKHYsIGksIHdvcmRzLCBzdWJfdHJpZSlcbntcbiAgICB2YXIgd29yZCwgc3Q7XG5cbiAgICBzdCA9IHN1Yl90cmllLmdldCh0aGlzLl93aWxkY2FyZF9zb21lKTtcblxuICAgIGlmIChzdClcbiAgICB7XG4gICAgICAgICAgICAvLyBpbiB0aGUgY29tbW9uIGNhc2UgdGhlcmUgd2lsbCBiZSBubyBtb3JlIGxldmVscy4uLlxuICAgICAgICBpZiAodGhpcy5fdGVzdF9zb21lKHYsIGksIHdvcmRzLCBzdCkgfHxcbiAgICAgICAgICAgIC8vIGFuZCB3ZSdsbCBlbmQgdXAgbWF0Y2hpbmcgdGhlIHJlc3Qgb2YgdGhlIHdvcmRzOlxuICAgICAgICAgICAgdGhpcy5fdGVzdCh2LCB3b3Jkcy5sZW5ndGgsIHdvcmRzLCBzdCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IHdvcmRzLmxlbmd0aClcbiAgICB7XG4gICAgICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHRoaXMuX3NlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHN0ICYmIHRoaXMudGVzdF92YWx1ZXMoc3QsIHYpKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICB3b3JkID0gd29yZHNbaV07XG5cbiAgICAgICAgaWYgKCh3b3JkICE9PSB0aGlzLl93aWxkY2FyZF9vbmUpICYmICh3b3JkICE9PSB0aGlzLl93aWxkY2FyZF9zb21lKSlcbiAgICAgICAge1xuICAgICAgICAgICAgc3QgPSBzdWJfdHJpZS5nZXQod29yZCk7XG5cbiAgICAgICAgICAgIGlmIChzdCAmJiB0aGlzLl90ZXN0KHYsIGkgKyAxLCB3b3Jkcywgc3QpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHRoaXMuX3dpbGRjYXJkX29uZSk7XG5cbiAgICAgICAgICAgIGlmIChzdCAmJiB0aGlzLl90ZXN0KHYsIGkgKyAxLCB3b3Jkcywgc3QpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG5BZGQgYSB0b3BpYyBtYXRjaGVyIHRvIHRoZSBxbG9iYmVyLlxuXG5Ob3RlIHlvdSBjYW4gbWF0Y2ggbW9yZSB0aGFuIG9uZSB2YWx1ZSBhZ2FpbnN0IGEgdG9waWMgYnkgY2FsbGluZyBgYWRkYCBtdWx0aXBsZSB0aW1lcyB3aXRoIHRoZSBzYW1lIHRvcGljIGFuZCBkaWZmZXJlbnQgdmFsdWVzLlxuXG5AcGFyYW0ge1N0cmluZ30gdG9waWMgVGhlIHRvcGljIHRvIG1hdGNoIGFnYWluc3QuXG5AcGFyYW0ge0FueX0gdmFsIFRoZSB2YWx1ZSB0byByZXR1cm4gaWYgdGhlIHRvcGljIGlzIG1hdGNoZWQuXG5AcmV0dXJuIHtRbG9iYmVyfSBUaGUgcWxvYmJlciAoZm9yIGNoYWluaW5nKS5cbiovXG5RbG9iYmVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodG9waWMsIHZhbClcbntcbiAgICB2YXIgc2hvcnRjdXQgPSB0aGlzLl9zaG9ydGN1dHMgJiYgdGhpcy5fc2hvcnRjdXRzLmdldCh0b3BpYyk7XG4gICAgaWYgKHNob3J0Y3V0KVxuICAgIHtcbiAgICAgICAgdGhpcy5fYWRkX3ZhbHVlKHNob3J0Y3V0LCB2YWwpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBzaG9ydGN1dCA9IHRoaXMuX2FkZCh2YWwsIDAsIHRvcGljLnNwbGl0KHRoaXMuX3NlcGFyYXRvciksIHRoaXMuX3RyaWUpO1xuICAgICAgICBpZiAodGhpcy5fc2hvcnRjdXRzKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zaG9ydGN1dHMuc2V0KHRvcGljLCBzaG9ydGN1dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcblJlbW92ZSBhIHRvcGljIG1hdGNoZXIgZnJvbSB0aGUgcWxvYmJlci5cblxuQHBhcmFtIHtTdHJpbmd9IHRvcGljIFRoZSB0b3BpYyB0aGF0J3MgYmVpbmcgbWF0Y2hlZCBhZ2FpbnN0LlxuQHBhcmFtIHtBbnl9IFt2YWxdIFRoZSB2YWx1ZSB0aGF0J3MgYmVpbmcgbWF0Y2hlZC4gSWYgeW91IGRvbid0IHNwZWNpZnkgYHZhbGAgdGhlbiBhbGwgbWF0Y2hlcnMgZm9yIGB0b3BpY2AgYXJlIHJlbW92ZWQuXG5AcmV0dXJuIHtRbG9iYmVyfSBUaGUgcWxvYmJlciAoZm9yIGNoYWluaW5nKS5cbiovXG5RbG9iYmVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodG9waWMsIHZhbClcbntcbiAgICBpZiAodGhpcy5fcmVtb3ZlKHZhbCwgMCwgdG9waWMuc3BsaXQodGhpcy5fc2VwYXJhdG9yKSwgdGhpcy5fdHJpZSkgJiYgdGhpcy5fc2hvcnRjdXRzKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2hvcnRjdXRzLmRlbGV0ZSh0b3BpYyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG5NYXRjaCBhIHRvcGljLlxuXG5AcGFyYW0ge1N0cmluZ30gdG9waWMgVGhlIHRvcGljIHRvIG1hdGNoIGFnYWluc3QuXG5AcmV0dXJuIHtBcnJheX0gTGlzdCBvZiB2YWx1ZXMgdGhhdCBtYXRjaGVkIHRoZSB0b3BpYy4gVGhpcyBtYXkgY29udGFpbiBkdXBsaWNhdGVzLiBVc2UgYSBbYFFsb2JiZXJEZWR1cGBdKCNxbG9iYmVyZGVkdXBvcHRpb25zKSBpZiB5b3UgZG9uJ3Qgd2FudCBkdXBsaWNhdGVzLlxuKi9cblFsb2JiZXIucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKHRvcGljLCBjdHgpXG57XG4gICAgcmV0dXJuIHRoaXMuX21hdGNoMihbXSwgdG9waWMsIGN0eCk7XG59O1xuXG4vKipcblRlc3Qgd2hldGhlciBhIHRvcGljIG1hdGNoIGNvbnRhaW5zIGEgdmFsdWUuIEZhc3RlciB0aGFuIGNhbGxpbmcgW2BtYXRjaGBdKCNxbG9iYmVycHJvdG90eXBlbWF0Y2h0b3BpYykgYW5kIHNlYXJjaGluZyB0aGUgcmVzdWx0IGZvciB0aGUgdmFsdWUuIFZhbHVlcyBhcmUgdGVzdGVkIHVzaW5nIFtgdGVzdF92YWx1ZXNgXSgjcWxvYmJlcnByb3RvdHlwZXRlc3RfdmFsdWVzdmFscy12YWwpLlxuXG5AcGFyYW0ge1N0cmluZ30gdG9waWMgVGhlIHRvcGljIHRvIG1hdGNoIGFnYWluc3QuXG5AcGFyYW0ge0FueX0gdmFsIFRoZSB2YWx1ZSBiZWluZyB0ZXN0ZWQgZm9yLlxuQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBtYXRjaGluZyBhZ2FpbnN0IGB0b3BpY2AgY29udGFpbnMgYHZhbGAuXG4qL1xuUWxvYmJlci5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uICh0b3BpYywgdmFsKVxue1xuICAgIHJldHVybiB0aGlzLl90ZXN0KHZhbCwgMCwgdG9waWMuc3BsaXQodGhpcy5fc2VwYXJhdG9yKSwgdGhpcy5fdHJpZSk7XG59O1xuXG4vKipcblRlc3Qgd2hldGhlciB2YWx1ZXMgZm91bmQgaW4gYSBtYXRjaCBjb250YWluIGEgdmFsdWUgcGFzc2VkIHRvIFtgdGVzdGBdKCNxbG9iYmVycHJvdG90eXBldGVzdHRvcGljLXZhbCkuIFlvdSBjYW4gb3ZlcnJpZGUgdGhpcyB0byBwcm92aWRlIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uLiBEZWZhdWx0cyB0byB1c2luZyBgaW5kZXhPZmAuXG5cbkBwYXJhbSB7QXJyYXl9IHZhbHMgVGhlIHZhbHVlcyBmb3VuZCB3aGlsZSBtYXRjaGluZy5cbkBwYXJhbSB7QW55fSB2YWwgVGhlIHZhbHVlIGJlaW5nIHRlc3RlZCBmb3IuXG5AcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIGB2YWxzYCBjb250YWlucyBgdmFsYC5cbiovXG5RbG9iYmVyLnByb3RvdHlwZS50ZXN0X3ZhbHVlcyA9IGZ1bmN0aW9uICh2YWxzLCB2YWwpXG57XG4gICAgcmV0dXJuIHZhbHMuaW5kZXhPZih2YWwpID49IDA7XG59O1xuXG4vKipcblJlc2V0IHRoZSBxbG9iYmVyLlxuXG5SZW1vdmVzIGFsbCB0b3BpYyBtYXRjaGVycyBmcm9tIHRoZSBxbG9iYmVyLlxuXG5AcmV0dXJuIHtRbG9iYmVyfSBUaGUgcWxvYmJlciAoZm9yIGNoYWluaW5nKS5cbiovXG5RbG9iYmVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpXG57XG4gICAgdGhpcy5fdHJpZS5jbGVhcigpO1xuICAgIGlmICh0aGlzLl9zaG9ydGN1dHMpXG4gICAge1xuICAgICAgICB0aGlzLl9zaG9ydGN1dHMuY2xlYXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3IgZGVidWdnaW5nXG5RbG9iYmVyLnByb3RvdHlwZS5nZXRfdHJpZSA9IGZ1bmN0aW9uICgpXG57XG4gICAgcmV0dXJuIHRoaXMuX3RyaWU7XG59O1xuXG4vKipcblZpc2l0IGVhY2ggbm9kZSBpbiB0aGUgcWxvYmJlcidzIHRyaWUgaW4gdHVybi5cblxuQHJldHVybiB7SXRlcmF0b3J9IEFuIGl0ZXJhdG9yIG9uIHRoZSB0cmllLiBUaGUgaXRlcmF0b3IgcmV0dXJucyBvYmplY3RzIHdoaWNoLCBpZiBmZWQgKGluIHRoZSBzYW1lIG9yZGVyKSB0byB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgW2BnZXRfcmVzdG9yZXJgXSgjcWxvYmJlcnByb3RvdHlwZWdldF9yZXN0b3Jlcm9wdGlvbnMpIG9uIGEgZGlmZmVyZW50IHFsb2JiZXIsIHdpbGwgYnVpbGQgdGhhdCBxbG9iYmVyJ3MgdHJpZSB0byB0aGUgc2FtZSBzdGF0ZS4gVGhlIG9iamVjdHMgY2FuIGJlIHNlcmlhbGl6ZWQgdXNpbmcgYEpTT04uc3RyaW5naWZ5YCwgX2lmXyB0aGUgdmFsdWVzIHlvdSBzdG9yZSBpbiB0aGUgcWxvYmJlciBhcmUgYWxzbyBzZXJpYWxpemFibGUuXG4qL1xuUWxvYmJlci5wcm90b3R5cGUudmlzaXQgPSBmdW5jdGlvbiogKClcbntcbiAgICBsZXQgaXRlcmF0b3JzID0gW10sXG4gICAgICAgIGl0ZXJhdG9yID0gdGhpcy5fdHJpZS5lbnRyaWVzKCksXG4gICAgICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKHRydWUpXG4gICAge1xuICAgICAgICBpZiAoaSA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgeWllbGQgeyB0eXBlOiAnc3RhcnRfZW50cmllcycgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXh0ID0gaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChuZXh0LmRvbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHlpZWxkIHsgdHlwZTogJ2VuZF9lbnRyaWVzJyB9O1xuXG4gICAgICAgICAgICBsZXQgcHJldiA9IGl0ZXJhdG9ycy5wb3AoKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBbaXRlcmF0b3IsIGldID0gcHJldjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IG5leHQudmFsdWU7XG4gICAgICAgIHlpZWxkIHsgdHlwZTogJ2VudHJ5JywgaTogaSsrLCBrZXk6IGtleSB9O1xuXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMuX3NlcGFyYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgeWllbGQgeyB0eXBlOiAnc3RhcnRfdmFsdWVzJyB9O1xuXG4gICAgICAgICAgICBpZiAodmFsdWVbU3ltYm9sLml0ZXJhdG9yXSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiB2YWx1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHsgdHlwZTogJ3ZhbHVlJywgaTogaisrLCB2YWx1ZTogdiB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB7IHR5cGU6ICd2YWx1ZScsIGk6IDAsIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB5aWVsZCB7IHR5cGU6ICdlbmRfdmFsdWVzJyB9O1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVyYXRvcnMucHVzaChbaXRlcmF0b3IsIGldKTtcbiAgICAgICAgaXRlcmF0b3IgPSB2YWx1ZS5lbnRyaWVzKCk7XG4gICAgICAgIGkgPSAwO1xuICAgIH1cbn07XG5cbi8qKlxuR2V0IGEgZnVuY3Rpb24gd2hpY2ggY2FuIHJlc3RvcmUgdGhlIHFsb2JiZXIncyB0cmllIHRvIGEgc3RhdGUgeW91IHJldHJpZXZlZFxuYnkgY2FsbGluZyBbYHZpc2l0YF0oI3Fsb2JiZXJwcm90b3R5cGV2aXNpdCkgb24gdGhpcyBvciBhbm90aGVyIHFsb2JiZXIuXG5cbkBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gT3B0aW9ucyBmb3IgcmVzdG9yaW5nIHRoZSB0cmllLlxuLSBge0Jvb2xlYW59IGNhY2hlX2FkZHNgIFdoZXRoZXIgdG8gY2FjaGUgdG9waWNzIHdoZW4gcmVidWlsZGluZyB0aGUgdHJpZS4gVGhpcyBvbmx5IGFwcGxpZXMgaWYgeW91IGFsc28gcGFzc2VkIGBjYWNoZV9hZGRzYCBhcyB0cnVlIGluIHRoZSBbY29uc3RydWN0b3JdKCNxbG9iYmVyb3B0aW9ucykuXG5cbkByZXR1cm4ge0Z1bmN0aW9ufSBGdW5jdGlvbiB0byBjYWxsIGluIG9yZGVyIHRvIHJlYnVpbGQgdGhlIHFsb2JiZXIncyB0cmllLiBZb3Ugc2hvdWxkIGNhbGwgdGhpcyByZXBlYXRlZGx5IHdpdGggdGhlIG9iamVjdHMgeW91IHJlY2VpdmVkIGZyb20gYSBjYWxsIHRvIFtgdmlzaXRgXSgjcWxvYmJlcnByb3RvdHlwZXZpc2l0KS4gSWYgeW91IHNlcmlhbGl6ZWQgdGhlIG9iamVjdHMsIHJlbWVtYmVyIHRvIGRlc2VyaWFsaXplIHRoZW0gZmlyc3QgKGUuZy4gd2l0aCBgSlNPTi5wYXJzZWApIVxuKi9cblFsb2JiZXIucHJvdG90eXBlLmdldF9yZXN0b3JlciA9IGZ1bmN0aW9uIChvcHRpb25zKVxue1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgbGV0IHN0cyA9IFtdLFxuICAgICAgICBlbnRyeSA9IHRoaXMuX3RyaWUsXG4gICAgICAgIHBhdGggPSAnJztcblxuICAgIHJldHVybiAob2JqKSA9PlxuICAgIHtcbiAgICAgICAgc3dpdGNoIChvYmoudHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSAnZW50cnknOlxuICAgICAgICAgICAgICAgIGVudHJ5ID0gZW50cnkgfHwgbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIHN0cy5wdXNoKFtlbnRyeSwgb2JqLmtleSwgcGF0aF0pO1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gZW50cnkuZ2V0KG9iai5rZXkpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNhY2hlX2FkZHMpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCArPSB0aGlzLl9zZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGF0aCArPSBvYmoua2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxuICAgICAgICAgICAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZF92YWx1ZShlbnRyeSwgb2JqLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkgPSB0aGlzLl9pbml0aWFsX3ZhbHVlKG9iai52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdlbmRfZW50cmllcyc6XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5ICYmIChlbnRyeS5zaXplID09PSAwKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG5cbiAgICAgICAgICAgIGNhc2UgJ2VuZF92YWx1ZXMnOlxuICAgICAgICAgICAgICAgIGxldCBwcmV2ID0gc3RzLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQgW3ByZXZfZW50cnksIGtleSwgcHJldl9wYXRoXSA9IHByZXY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2FjaGVfYWRkcyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0Y3V0cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmoudHlwZSA9PT0gJ2VuZF92YWx1ZXMnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydGN1dHMuc2V0KHByZXZfcGF0aCwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldl9lbnRyeS5zZXQoa2V5LCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW50cnkgPSBwcmV2X2VudHJ5O1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gcHJldl9wYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbkNyZWF0ZXMgYSBuZXcgZGUtZHVwbGljYXRpbmcgcWxvYmJlci5cblxuSW5oZXJpdHMgZnJvbSBbYFFsb2JiZXJgXSgjcWxvYmJlcm9wdGlvbnMpLlxuXG5AY29uc3RydWN0b3JcbkBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gU2FtZSBvcHRpb25zIGFzIFFsb2JiZXIuXG4qL1xuZnVuY3Rpb24gUWxvYmJlckRlZHVwIChvcHRpb25zKVxue1xuICAgIFFsb2JiZXIuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxudXRpbC5pbmhlcml0cyhRbG9iYmVyRGVkdXAsIFFsb2JiZXIpO1xuXG5RbG9iYmVyRGVkdXAucHJvdG90eXBlLl9pbml0aWFsX3ZhbHVlID0gZnVuY3Rpb24gKHZhbClcbntcbiAgICByZXR1cm4gbmV3IFNldCgpLmFkZCh2YWwpO1xufTtcblxuUWxvYmJlckRlZHVwLnByb3RvdHlwZS5fYWRkX3ZhbHVlID0gZnVuY3Rpb24gKHZhbHMsIHZhbClcbntcbiAgICB2YWxzLmFkZCh2YWwpO1xufTtcblxuUWxvYmJlckRlZHVwLnByb3RvdHlwZS5fYWRkX3ZhbHVlcyA9IGZ1bmN0aW9uIChkZXN0LCBvcmlnaW4pXG57XG4gICAgb3JpZ2luLmZvckVhY2goZnVuY3Rpb24gKHZhbClcbiAgICB7XG4gICAgICAgIGRlc3QuYWRkKHZhbCk7XG4gICAgfSk7XG59O1xuXG5RbG9iYmVyRGVkdXAucHJvdG90eXBlLl9yZW1vdmVfdmFsdWUgPSBmdW5jdGlvbiAodmFscywgdmFsKVxue1xuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbHMuZGVsZXRlKHZhbCk7XG4gICAgcmV0dXJuIHZhbHMuc2l6ZSA9PT0gMDtcbn07XG5cbi8qKlxuVGVzdCB3aGV0aGVyIHZhbHVlcyBmb3VuZCBpbiBhIG1hdGNoIGNvbnRhaW4gYSB2YWx1ZSBwYXNzZWQgdG8gW2B0ZXN0YF0oI3Fsb2JiZXJwcm90b3R5cGV0ZXN0dG9waWNfdmFsKS4gWW91IGNhbiBvdmVycmlkZSB0aGlzIHRvIHByb3ZpZGUgYSBjdXN0b20gaW1wbGVtZW50YXRpb24uIERlZmF1bHRzIHRvIHVzaW5nIGBoYXNgLlxuXG5AcGFyYW0ge1NldH0gdmFscyBUaGUgdmFsdWVzIGZvdW5kIHdoaWxlIG1hdGNoaW5nIChbRVM2IFNldF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNldC1vYmplY3RzKSkuXG5AcGFyYW0ge0FueX0gdmFsIFRoZSB2YWx1ZSBiZWluZyB0ZXN0ZWQgZm9yLlxuQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBgdmFsc2AgY29udGFpbnMgYHZhbGAuXG4qL1xuUWxvYmJlckRlZHVwLnByb3RvdHlwZS50ZXN0X3ZhbHVlcyA9IGZ1bmN0aW9uICh2YWxzLCB2YWwpXG57XG4gICAgcmV0dXJuIHZhbHMuaGFzKHZhbCk7XG59O1xuXG4vKipcbk1hdGNoIGEgdG9waWMuXG5cbkBwYXJhbSB7U3RyaW5nfSB0b3BpYyBUaGUgdG9waWMgdG8gbWF0Y2ggYWdhaW5zdC5cbkByZXR1cm4ge1NldH0gW0VTNiBTZXRdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1zZXQtb2JqZWN0cykgb2YgdmFsdWVzIHRoYXQgbWF0Y2hlZCB0aGUgdG9waWMuXG4qL1xuUWxvYmJlckRlZHVwLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uICh0b3BpYywgY3R4KVxue1xuICAgIHJldHVybiB0aGlzLl9tYXRjaDIobmV3IFNldCgpLCB0b3BpYywgY3R4KTtcbn07XG5cbi8qKlxuQ3JlYXRlcyBhIG5ldyBxbG9iYmVyIHdoaWNoIG9ubHkgc3RvcmVzIHRoZSB2YWx1ZSBgdHJ1ZWAuXG5cbldoYXRldmVyIHZhbHVlIHlvdSBbYGFkZGBdKCNxbG9iYmVycHJvdG90eXBlYWRkdG9waWMtdmFsKSB0byB0aGlzIHFsb2JiZXJcbihldmVuIGB1bmRlZmluZWRgKSwgYSBzaW5nbGUsIGRlLWR1cGxpY2F0ZWQgYHRydWVgIHdpbGwgYmUgc3RvcmVkLiBVc2UgdGhpc1xucWxvYmJlciBpZiB5b3Ugb25seSBuZWVkIHRvIHRlc3Qgd2hldGhlciB0b3BpY3MgbWF0Y2gsIG5vdCBhYm91dCB0aGUgdmFsdWVzXG50aGV5IG1hdGNoIHRvLlxuXG5Jbmhlcml0cyBmcm9tIFtgUWxvYmJlcmBdKCNxbG9iYmVyb3B0aW9ucykuXG5cbkBjb25zdHJ1Y3RvclxuQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBTYW1lIG9wdGlvbnMgYXMgUWxvYmJlci5cbiovXG5mdW5jdGlvbiBRbG9iYmVyVHJ1ZSAob3B0aW9ucylcbntcbiAgICBRbG9iYmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbnV0aWwuaW5oZXJpdHMoUWxvYmJlclRydWUsIFFsb2JiZXIpO1xuXG5RbG9iYmVyVHJ1ZS5wcm90b3R5cGUuX2luaXRpYWxfdmFsdWUgPSBmdW5jdGlvbiAoKVxue1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuUWxvYmJlclRydWUucHJvdG90eXBlLl9hZGRfdmFsdWUgPSBmdW5jdGlvbiAoKVxue1xufTtcblxuUWxvYmJlclRydWUucHJvdG90eXBlLl9yZW1vdmVfdmFsdWUgPSBmdW5jdGlvbiAoKVxue1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG5UaGlzIG92ZXJyaWRlIG9mIFtgdGVzdF92YWx1ZXNgXSgjcWxvYmJlcnByb3RvdHlwZXRlc3RfdmFsdWVzdmFscy12YWwpIGFsd2F5c1xucmV0dXJucyBgdHJ1ZWAuIFdoZW4geW91IGNhbGwgW2B0ZXN0YF0oI3Fsb2JiZXJwcm90b3R5cGV0ZXN0dG9waWMtdmFsKSBvbiBhXG5gUWxvYmJlclRydWVgIGluc3RhbmNlLCB0aGUgdmFsdWUgeW91IHBhc3MgaXMgaWdub3JlZCBzaW5jZSBpdCBvbmx5IGNhcmVzXG53aGV0aGVyIGEgdG9waWMgaXMgbWF0Y2hlZC5cblxuQHJldHVybiB7Qm9vbGVhbn0gQWx3YXlzIGB0cnVlYC5cbiovXG5RbG9iYmVyVHJ1ZS5wcm90b3R5cGUudGVzdF92YWx1ZXMgPSBmdW5jdGlvbiAoKVxue1xuICAgIHJldHVybiB0cnVlOyAgICBcbn07XG5cbi8qKlxuTWF0Y2ggYSB0b3BpYy5cblxuU2luY2UgYFFsb2JiZXJUcnVlYCBvbmx5IGNhcmVzIHdoZXRoZXIgYSB0b3BpYyBpcyBtYXRjaGVkIGFuZCBub3QgYWJvdXQgdmFsdWVzXG5pdCBtYXRjaGVzIHRvLCB0aGlzIG92ZXJyaWRlIG9mIFtgbWF0Y2hgXSgjcWxvYmJlcnByb3RvdHlwZW1hdGNodG9waWMpIGp1c3RcbmNhbGxzIFtgdGVzdGBdKCNxbG9iYmVycHJvdG90eXBldGVzdHRvcGljLXZhbCkgKHdpdGggdmFsdWUgYHVuZGVmaW5lZGApLlxuXG5AcGFyYW0ge1N0cmluZ30gdG9waWMgVGhlIHRvcGljIHRvIG1hdGNoIGFnYWluc3QuXG5AcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIHRoZSBgUWxvYmJlclRydWVgIGluc3RhbmNlIG1hdGNoZXMgdGhlIHRvcGljLlxuKi9cblFsb2JiZXJUcnVlLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uICh0b3BpYywgY3R4KVxue1xuICAgIHJldHVybiB0aGlzLnRlc3QodG9waWMsIGN0eCk7XG59O1xuXG5sZXQgc3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbi8qKlxuQ3JlYXRlcyBhIG5ldyBbYFJlYWRhYmxlYF0oaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0LXY4LngvZG9jcy9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX2NsYXNzX3N0cmVhbV9yZWFkYWJsZSkgc3RyZWFtLCBpbiBvYmplY3QgbW9kZSwgd2hpY2ggY2FsbHMgW2B2aXNpdGBdKCNxbG9iYmVycHJvdG90eXBldmlzaXQpIG9uIGEgcWxvYmJlciB0byBnZW5lcmF0ZSBpdHMgZGF0YS5cblxuWW91IGNvdWxkIFtgcGlwZWBdKGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC12OC54L2RvY3MvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9yZWFkYWJsZV9waXBlX2Rlc3RpbmF0aW9uX29wdGlvbnMpIHRoaXMgdG8gYSBbYEpTT05TdHJlYW0uc3RyaW5naWZ5YF0oaHR0cHM6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL0pTT05TdHJlYW0janNvbnN0cmVhbXN0cmluZ2lmeW9wZW4tc2VwLWNsb3NlKSBzdHJlYW0sIGZvciBpbnN0YW5jZSwgdG8gc2VyaWFsaXplIHRoZSBxbG9iYmVyIHRvIEpTT04uIFNlZSBbdGhpcyB0ZXN0XSh0ZXN0L2pzb24uanMjTDE0KSBmb3IgYW4gZXhhbXBsZS5cblxuSW5oZXJpdHMgZnJvbSBbYFJlYWRhYmxlYF0oaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0LXY4LngvZG9jcy9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX2NsYXNzX3N0cmVhbV9yZWFkYWJsZSkuXG5cbkBjb25zdHJ1Y3RvclxuXG5AcGFyYW0ge1Fsb2JiZXJ9IHFsb2JiZXIgVGhlIHFsb2JiZXIgdG8gY2FsbCBbYHZpc2l0YF0oI3Fsb2JiZXJwcm90b3R5cGV2aXNpdCkgb24uXG4qL1xuZnVuY3Rpb24gVmlzaXRvclN0cmVhbSAocWxvYmJlcilcbntcbiAgICBzdHJlYW0uUmVhZGFibGUuY2FsbCh0aGlzLCB7IG9iamVjdE1vZGU6IHRydWUgfSk7XG4gICAgdGhpcy5faXRlcmF0b3IgPSBxbG9iYmVyLnZpc2l0KCk7XG59XG5cbnV0aWwuaW5oZXJpdHMoVmlzaXRvclN0cmVhbSwgc3RyZWFtLlJlYWRhYmxlKTtcblxuVmlzaXRvclN0cmVhbS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAoKVxue1xuICAgIHdoaWxlICh0cnVlKVxuICAgIHtcbiAgICAgICAgbGV0IHsgZG9uZSwgdmFsdWUgfSA9IHRoaXMuX2l0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wdXNoKG51bGwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucHVzaCh2YWx1ZSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG5DcmVhdGVzIGEgbmV3IFtgV3JpdGFibGVgXShodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QtdjgueC9kb2NzL2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fY2xhc3Nfc3RyZWFtX3dyaXRhYmxlKSBzdHJlYW0sIGluIG9iamVjdCBtb2RlLCB3aGljaCBwYXNzZXMgZGF0YSB3cml0dGVuIHRvIGl0IGludG8gdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5IGNhbGxpbmcgW2BnZXRfcmVzdG9yZXJgXSgjcWxvYmJlcnByb3RvdHlwZWdldF9yZXN0b3Jlcm9wdGlvbnMpIG9uIGEgcWxvYmJlci5cblxuWW91IGNvdWxkIFtgcGlwZWBdKGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC12OC54L2RvY3MvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9yZWFkYWJsZV9waXBlX2Rlc3RpbmF0aW9uX29wdGlvbnMpIGEgW2BKU09OU3RyZWFtLnBhcnNlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL0pTT05TdHJlYW0janNvbnN0cmVhbXBhcnNlcGF0aCkgc3RyZWFtIHRvIHRoaXMsIGZvciBpbnN0YW5jZSwgdG8gZGVzZXJpYWxpemUgdGhlIHFsb2JiZXIgZnJvbSBKU09OLiBTZWUgW3RoaXMgdGVzdF0odGVzdC9qc29uLmpzI0wzMykgZm9yIGFuIGV4YW1wbGUuXG5cbkluaGVyaXRzIGZyb20gW2BXcml0YWJsZWBdKGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC12OC54L2RvY3MvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9jbGFzc19zdHJlYW1fd3JpdGFibGUpLlxuXG5AY29uc3RydWN0b3JcblxuQHBhcmFtIHtRbG9iYmVyfSBxbG9iYmVyIFRoZSBxbG9iYmVyIHRvIGNhbGwgW2BnZXRfcmVzdG9yZXJgXSgjcWxvYmJlcnByb3RvdHlwZWdldF9yZXN0b3Jlcm9wdGlvbnMpIG9uLlxuKi9cbmZ1bmN0aW9uIFJlc3RvcmVyU3RyZWFtIChxbG9iYmVyKVxue1xuICAgIHN0cmVhbS5Xcml0YWJsZS5jYWxsKHRoaXMsIHsgb2JqZWN0TW9kZTogdHJ1ZSB9KTtcbiAgICB0aGlzLl9yZXN0b3JlciA9IHFsb2JiZXIuZ2V0X3Jlc3RvcmVyKCk7XG59XG5cbnV0aWwuaW5oZXJpdHMoUmVzdG9yZXJTdHJlYW0sIHN0cmVhbS5Xcml0YWJsZSk7XG5cblJlc3RvcmVyU3RyZWFtLnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbiAodmFsdWUsIF8sIGNiKVxue1xuICAgIHRoaXMuX3Jlc3RvcmVyKHZhbHVlKTtcbiAgICBjYigpO1xufTtcblxuZXhwb3J0cy5RbG9iYmVyID0gUWxvYmJlcjtcbmV4cG9ydHMuUWxvYmJlckRlZHVwID0gUWxvYmJlckRlZHVwO1xuZXhwb3J0cy5RbG9iYmVyVHJ1ZSA9IFFsb2JiZXJUcnVlO1xuZXhwb3J0cy5WaXNpdG9yU3RyZWFtID0gVmlzaXRvclN0cmVhbTtcbmV4cG9ydHMuUmVzdG9yZXJTdHJlYW0gPSBSZXN0b3JlclN0cmVhbTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvcWxvYmJlci9saWIvcWxvYmJlci5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy91dGlsL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxubW9kdWxlLmV4cG9ydHMgPSBTdHJlYW07XG5cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmluaGVyaXRzKFN0cmVhbSwgRUUpO1xuU3RyZWFtLlJlYWRhYmxlID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL3JlYWRhYmxlLmpzJyk7XG5TdHJlYW0uV3JpdGFibGUgPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vd3JpdGFibGUuanMnKTtcblN0cmVhbS5EdXBsZXggPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vZHVwbGV4LmpzJyk7XG5TdHJlYW0uVHJhbnNmb3JtID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL3RyYW5zZm9ybS5qcycpO1xuU3RyZWFtLlBhc3NUaHJvdWdoID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL3Bhc3N0aHJvdWdoLmpzJyk7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuNC54XG5TdHJlYW0uU3RyZWFtID0gU3RyZWFtO1xuXG5cblxuLy8gb2xkLXN0eWxlIHN0cmVhbXMuICBOb3RlIHRoYXQgdGhlIHBpcGUgbWV0aG9kICh0aGUgb25seSByZWxldmFudFxuLy8gcGFydCBvZiB0aGlzIGNsYXNzKSBpcyBvdmVycmlkZGVuIGluIHRoZSBSZWFkYWJsZSBjbGFzcy5cblxuZnVuY3Rpb24gU3RyZWFtKCkge1xuICBFRS5jYWxsKHRoaXMpO1xufVxuXG5TdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihkZXN0LCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGlmIChkZXN0LndyaXRhYmxlKSB7XG4gICAgICBpZiAoZmFsc2UgPT09IGRlc3Qud3JpdGUoY2h1bmspICYmIHNvdXJjZS5wYXVzZSkge1xuICAgICAgICBzb3VyY2UucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2RhdGEnLCBvbmRhdGEpO1xuXG4gIGZ1bmN0aW9uIG9uZHJhaW4oKSB7XG4gICAgaWYgKHNvdXJjZS5yZWFkYWJsZSAmJiBzb3VyY2UucmVzdW1lKSB7XG4gICAgICBzb3VyY2UucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdC5vbignZHJhaW4nLCBvbmRyYWluKTtcblxuICAvLyBJZiB0aGUgJ2VuZCcgb3B0aW9uIGlzIG5vdCBzdXBwbGllZCwgZGVzdC5lbmQoKSB3aWxsIGJlIGNhbGxlZCB3aGVuXG4gIC8vIHNvdXJjZSBnZXRzIHRoZSAnZW5kJyBvciAnY2xvc2UnIGV2ZW50cy4gIE9ubHkgZGVzdC5lbmQoKSBvbmNlLlxuICBpZiAoIWRlc3QuX2lzU3RkaW8gJiYgKCFvcHRpb25zIHx8IG9wdGlvbnMuZW5kICE9PSBmYWxzZSkpIHtcbiAgICBzb3VyY2Uub24oJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2Uub24oJ2Nsb3NlJywgb25jbG9zZSk7XG4gIH1cblxuICB2YXIgZGlkT25FbmQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgZGVzdC5lbmQoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIGRlc3QuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgZGVzdC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBkb24ndCBsZWF2ZSBkYW5nbGluZyBwaXBlcyB3aGVuIHRoZXJlIGFyZSBlcnJvcnMuXG4gIGZ1bmN0aW9uIG9uZXJyb3IoZXIpIHtcbiAgICBjbGVhbnVwKCk7XG4gICAgaWYgKEVFLmxpc3RlbmVyQ291bnQodGhpcywgJ2Vycm9yJykgPT09IDApIHtcbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgc3RyZWFtIGVycm9yIGluIHBpcGUuXG4gICAgfVxuICB9XG5cbiAgc291cmNlLm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuICBkZXN0Lm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuXG4gIC8vIHJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyB0aGF0IHdlcmUgYWRkZWQuXG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgb25kYXRhKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIGNsZWFudXApO1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBjbGVhbnVwKTtcblxuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgY2xlYW51cCk7XG4gIH1cblxuICBzb3VyY2Uub24oJ2VuZCcsIGNsZWFudXApO1xuICBzb3VyY2Uub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0LmVtaXQoJ3BpcGUnLCBzb3VyY2UpO1xuXG4gIC8vIEFsbG93IGZvciB1bml4LWxpa2UgdXNhZ2U6IEEucGlwZShCKS5waXBlKEMpXG4gIHJldHVybiBkZXN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyB1dGlsIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuZnVuY3Rpb24gY29weUJ1ZmZlcihzcmMsIHRhcmdldCwgb2Zmc2V0KSB7XG4gIHNyYy5jb3B5KHRhcmdldCwgb2Zmc2V0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJ1ZmZlckxpc3QoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1ZmZlckxpc3QpO1xuXG4gICAgdGhpcy5oZWFkID0gbnVsbDtcbiAgICB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHYpIHtcbiAgICB2YXIgZW50cnkgPSB7IGRhdGE6IHYsIG5leHQ6IG51bGwgfTtcbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB0aGlzLnRhaWwubmV4dCA9IGVudHJ5O2Vsc2UgdGhpcy5oZWFkID0gZW50cnk7XG4gICAgdGhpcy50YWlsID0gZW50cnk7XG4gICAgKyt0aGlzLmxlbmd0aDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gdW5zaGlmdCh2KSB7XG4gICAgdmFyIGVudHJ5ID0geyBkYXRhOiB2LCBuZXh0OiB0aGlzLmhlYWQgfTtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgIHRoaXMuaGVhZCA9IGVudHJ5O1xuICAgICsrdGhpcy5sZW5ndGg7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiBzaGlmdCgpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB2YXIgcmV0ID0gdGhpcy5oZWFkLmRhdGE7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO2Vsc2UgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHQ7XG4gICAgLS10aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uIGpvaW4ocykge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuICAgIHZhciBwID0gdGhpcy5oZWFkO1xuICAgIHZhciByZXQgPSAnJyArIHAuZGF0YTtcbiAgICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgICAgcmV0ICs9IHMgKyBwLmRhdGE7XG4gICAgfXJldHVybiByZXQ7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0KG4pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSByZXR1cm4gdGhpcy5oZWFkLmRhdGE7XG4gICAgdmFyIHJldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuID4+PiAwKTtcbiAgICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHApIHtcbiAgICAgIGNvcHlCdWZmZXIocC5kYXRhLCByZXQsIGkpO1xuICAgICAgaSArPSBwLmRhdGEubGVuZ3RoO1xuICAgICAgcCA9IHAubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICByZXR1cm4gQnVmZmVyTGlzdDtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL0J1ZmZlckxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZGVwcmVjYXRlO1xuXG4vKipcbiAqIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4gKiBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuICpcbiAqIElmIGBsb2NhbFN0b3JhZ2Uubm9EZXByZWNhdGlvbiA9IHRydWVgIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuICpcbiAqIElmIGBsb2NhbFN0b3JhZ2UudGhyb3dEZXByZWNhdGlvbiA9IHRydWVgIGlzIHNldCwgdGhlbiBkZXByZWNhdGVkIGZ1bmN0aW9uc1xuICogd2lsbCB0aHJvdyBhbiBFcnJvciB3aGVuIGludm9rZWQuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS50cmFjZURlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGRlcHJlY2F0ZWQgZnVuY3Rpb25zXG4gKiB3aWxsIGludm9rZSBgY29uc29sZS50cmFjZSgpYCBpbnN0ZWFkIG9mIGBjb25zb2xlLmVycm9yKClgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGRlcHJlY2F0ZVxuICogQHBhcmFtIHtTdHJpbmd9IG1zZyAtIHRoZSBzdHJpbmcgdG8gcHJpbnQgdG8gdGhlIGNvbnNvbGUgd2hlbiBgZm5gIGlzIGludm9rZWRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gYSBuZXcgXCJkZXByZWNhdGVkXCIgdmVyc2lvbiBvZiBgZm5gXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZSAoZm4sIG1zZykge1xuICBpZiAoY29uZmlnKCdub0RlcHJlY2F0aW9uJykpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChjb25maWcoJ3Rocm93RGVwcmVjYXRpb24nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAoY29uZmlnKCd0cmFjZURlcHJlY2F0aW9uJykpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBgbG9jYWxTdG9yYWdlYCBmb3IgYm9vbGVhbiB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBgbmFtZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29uZmlnIChuYW1lKSB7XG4gIC8vIGFjY2Vzc2luZyBnbG9iYWwubG9jYWxTdG9yYWdlIGNhbiB0cmlnZ2VyIGEgRE9NRXhjZXB0aW9uIGluIHNhbmRib3hlZCBpZnJhbWVzXG4gIHRyeSB7XG4gICAgaWYgKCFnbG9iYWwubG9jYWxTdG9yYWdlKSByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHZhbCA9IGdsb2JhbC5sb2NhbFN0b3JhZ2VbbmFtZV07XG4gIGlmIChudWxsID09IHZhbCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gU3RyaW5nKHZhbCkudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC1kZXByZWNhdGUvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIGEgcGFzc3Rocm91Z2ggc3RyZWFtLlxuLy8gYmFzaWNhbGx5IGp1c3QgdGhlIG1vc3QgbWluaW1hbCBzb3J0IG9mIFRyYW5zZm9ybSBzdHJlYW0uXG4vLyBFdmVyeSB3cml0dGVuIGNodW5rIGdldHMgb3V0cHV0IGFzLWlzLlxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFzc1Rocm91Z2g7XG5cbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL19zdHJlYW1fdHJhbnNmb3JtJyk7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudXRpbC5pbmhlcml0cyhQYXNzVGhyb3VnaCwgVHJhbnNmb3JtKTtcblxuZnVuY3Rpb24gUGFzc1Rocm91Z2gob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFzc1Rocm91Z2gpKSByZXR1cm4gbmV3IFBhc3NUaHJvdWdoKG9wdGlvbnMpO1xuXG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG5QYXNzVGhyb3VnaC5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNiKG51bGwsIGNodW5rKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9kdXBsZXguanMnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vZHVwbGV4LWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFkYWJsZScpLlRyYW5zZm9ybVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS90cmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFkYWJsZScpLlBhc3NUaHJvdWdoXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3Bhc3N0aHJvdWdoLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvblBvcnRDb250cm9sbGVyIH0gZnJvbSBcIi4vZXh0ZW5zaW9uLXBvcnQtY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBob3N0Q29uc3RhbnRzIH0gZnJvbSBcIi4vaG9zdC1jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSwgTWVzc2FnZVBheWxvYWQsIEJsb2NrZWRGaWxlUmVzcG9uc2VWMSwgQmxvY2tlZEZpbGVSZXF1ZXN0VjEgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL21lc3NhZ2UtdHlwZXNcIjtcclxuaW1wb3J0IHsgVVJMLCBwYXJzZVVybCwgVVJMVG9TdHJpbmcgfSBmcm9tIFwiLi91cmwtdXRpbHNcIjtcclxuaW1wb3J0IHsgbm9uZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlRG9jdW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2VkRmlsZUNvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHByaXZhdGUgZmlsZVVSTDogVVJMKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25Qb3J0Q29udHJvbGxlciA9IG5ldyBFeHRlbnNpb25Qb3J0Q29udHJvbGxlcihcclxuICAgICAgICAgICAgICAgIGhvc3RDb25zdGFudHMuYmxvY2tlZEZpbGVQYWdlUG9ydE5hbWUsXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm9uRXh0ZW5zaW9uUmVhZHkoKSk7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25Qb3J0Q29udHJvbGxlci5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKFxyXG4gICAgICAgICAgICBNZXNzYWdlVHlwZS5ibG9ja2VkRmlsZVJlc3BvbnNlVjEsXHJcbiAgICAgICAgICAgIChtZXNzYWdlKSA9PiB0aGlzLmhhbmRsZVJlc3BvbnNlKG1lc3NhZ2UpKTtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblBvcnRDb250cm9sbGVyLmNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKHR5cGU6IE1lc3NhZ2VUeXBlLCBwYXlsb2FkOiBNZXNzYWdlUGF5bG9hZCkge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uUG9ydENvbnRyb2xsZXIuc2VuZE1lc3NhZ2UodHlwZSwgcGF5bG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZVRvRmlsZShmaWxlVVJMOiBVUkwpIHtcclxuICAgICAgICBuYXZpZ2F0ZURvY3VtZW50KHRoaXMuZG9jdW1lbnQsIGZpbGVVUkwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UobWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbWVzc2FnZS5wYXlsb2FkIGFzIEJsb2NrZWRGaWxlUmVzcG9uc2VWMTtcclxuICAgICAgICBjb25zdCBpc1RydXN0ZWQgPSByZXNwb25zZS5pc1RydXN0ZWQ7XHJcbiAgICAgICAgY29uc3QgZmlsZVVSTCA9IHBhcnNlVXJsKHJlc3BvbnNlLmZpbGVVcmxTcGVjKTtcclxuICAgICAgICBpZiAobm9uZShmaWxlVVJMKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1RydXN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvRmlsZShmaWxlVVJMKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kUmVxdWVzdCgpIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgTWVzc2FnZVR5cGUuYmxvY2tlZEZpbGVSZXF1ZXN0VjEsIFxyXG4gICAgICAgICAgICAgICAgbmV3IEJsb2NrZWRGaWxlUmVxdWVzdFYxKFVSTFRvU3RyaW5nKHRoaXMuZmlsZVVSTCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXh0ZW5zaW9uUmVhZHkoKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uUG9ydENvbnRyb2xsZXI6IEV4dGVuc2lvblBvcnRDb250cm9sbGVyO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tlZC1maWxlLWNvbnRyb2xsZXIudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IEdlbmVyaWNNZXNzYWdlUm91dGVyLCBIYW5kbGVNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZS1yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbCwgTmVnb3RpYXRpb24gfSBmcm9tIFwiLi9tZXNzYWdlLXBvcnQtY2hhbm5lbFwiO1xyXG5pbXBvcnQgeyBtYWtlUHJvbWlzZSB9IGZyb20gXCIuL3Byb21pc2UtdXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IEV4dGVybmFsQXBwTGlua1JlcXVlc3RWMSwgRXh0ZXJuYWxBcHBMaW5rUmVzcG9uc2VWMSwgTWVzc2FnZSwgTWVzc2FnZVBheWxvYWQgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIi4vbWVzc2FnZS1zZW5kZXJcIjtcclxuaW1wb3J0IHsgVVJMVG9TdHJpbmcsIHBhcnNlVXJsIH0gZnJvbSBcIi4vdXJsLXV0aWxzXCI7XHJcbmltcG9ydCB7IG5vbmUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5pbXBvcnQgeyBsb2csIGxvZ0Vycm9yIH0gIGZyb20gXCIuL2xvZ1wiO1xyXG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gXCIuL3N0cmluZy11dGlsc1wiO1xyXG5pbXBvcnQgeyBob3N0Q29uc3RhbnRzIH0gZnJvbSBcIi4vaG9zdC1jb25zdGFudHNcIjtcclxuXHJcbmVudW0gQ29ubmVjdGlvblN0YXRlIHtcclxuICAgIGRpc2Nvbm5lY3RlZCxcclxuICAgIGNvbm5lY3RpbmcsXHJcbiAgICBjb25uZWN0ZWQsXHJcbiAgICBleHRlbnNpb25SZWFkeVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBPbkV4dGVuc2lvblJlYWR5ID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25Qb3J0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcnROYW1lOiBzdHJpbmcsIHByaXZhdGUgb25FeHRlbnNpb25SZWFkeTogT25FeHRlbnNpb25SZWFkeSkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihcclxuICAgICAgICAgICAgTWVzc2FnZVR5cGUuZXh0ZW5zaW9uUmVhZHlWMSxcclxuICAgICAgICAgICAgKG1lc3NhZ2UpID0+IHRoaXMuaGFuZGxlRXh0ZW5zaW9uUmVhZHkobWVzc2FnZSkpO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uQ2hhbm5lbCA9IHRoaXMuY3JlYXRlRXh0ZW5zaW9uQ2hhbm5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmNvbm5lY3Rpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uQ2hhbm5lbC5jb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIodHlwZTogTWVzc2FnZVR5cGUsIGhhbmRsZXI6IEhhbmRsZU1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VSb3V0ZXIucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcih0eXBlLCBoYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTWVzc2FnZSh0eXBlOiBNZXNzYWdlVHlwZSwgcGF5bG9hZDogTWVzc2FnZVBheWxvYWQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlU2VuZGVyID0gdGhpcy5leHRlbnNpb25DaGFubmVsLm1lc3NhZ2VTZW5kZXI7XHJcbiAgICAgICAgbWVzc2FnZVNlbmRlci5zZW5kTWVzc2FnZSh0eXBlLCBwYXlsb2FkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUb1BvcnQoKTogUHJvbWlzZTxjaHJvbWUucnVudGltZS5Qb3J0PiB7XHJcbiAgICAgICAgcmV0dXJuIG1ha2VQcm9taXNlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNocm9tZS5ydW50aW1lLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wb3J0TmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUV4dGVuc2lvbkNoYW5uZWwoKTogR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljTWVzc2FnZVBvcnRDaGFubmVsKFxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BvcnQoKSxcclxuICAgICAgICAgICAgKHBvcnQpID0+IHRoaXMub25FeHRlbnNpb25Db25uZWN0ZWQocG9ydCksXHJcbiAgICAgICAgICAgIChwb3J0KSA9PiB0aGlzLm9uRXh0ZW5zaW9uRGlzY29ubmVjdGVkKHBvcnQpLFxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VSb3V0ZXIsXHJcbiAgICAgICAgICAgIE5lZ290aWF0aW9uLk5vbmVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjb25uZWN0VG9FeHRlbnNpb24oKSB7XHJcbiAgICAgICAgbG9nKGBFeHRlbnNpb25Qb3J0Q29udHJvbGxlci5yZWNvbm5lY3RUb0V4dGVuc2lvbjogJHt0b1N0cmluZyh7XHJcbiAgICAgICAgICAgIHBvcnROYW1lOiB0aGlzLnBvcnROYW1lLFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IHRoaXMuY29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgfSl9YCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmNvbm5lY3Rpbmc7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25DaGFubmVsID0gdGhpcy5jcmVhdGVFeHRlbnNpb25DaGFubmVsKCk7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25DaGFubmVsLmNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUV4dGVuc2lvblJlYWR5KG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICBsb2coYEV4dGVuc2lvblBvcnRDb250cm9sbGVyLmhhbmRsZUV4dGVuc2lvblJlYWR5OiAke3RvU3RyaW5nKHtcclxuICAgICAgICAgICAgcG9ydE5hbWU6IHRoaXMucG9ydE5hbWUsXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogdGhpcy5jb25uZWN0aW9uU3RhdGVcclxuICAgICAgICB9KX1gKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuZXh0ZW5zaW9uUmVhZHk7XHJcbiAgICAgICAgdGhpcy5vbkV4dGVuc2lvblJlYWR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkV4dGVuc2lvbkNvbm5lY3RlZChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KSB7XHJcbiAgICAgICAgbG9nKGBFeHRlbnNpb25Qb3J0Q29udHJvbGxlci5vbkV4dGVuc2lvbkNvbm5lY3RlZDogJHt0b1N0cmluZyh7XHJcbiAgICAgICAgICAgIHBvcnROYW1lOiB0aGlzLnBvcnROYW1lLFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IHRoaXMuY29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgfSl9YCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXh0ZW5zaW9uRGlzY29ubmVjdGVkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpIHtcclxuICAgICAgICBsb2coYEV4dGVuc2lvblBvcnRDb250cm9sbGVyLm9uRXh0ZW5zaW9uRGlzY29ubmVjdGVkOiAke3RvU3RyaW5nKHtcclxuICAgICAgICAgICAgcG9ydE5hbWU6IHRoaXMucG9ydE5hbWVcclxuICAgICAgICB9KX1gKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBDb25uZWN0aW9uU3RhdGUuZXh0ZW5zaW9uUmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RUb0V4dGVuc2lvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VSb3V0ZXIgPSBuZXcgR2VuZXJpY01lc3NhZ2VSb3V0ZXIoKTtcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uQ2hhbm5lbDogR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbDtcclxuICAgIHByaXZhdGUgY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZDtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXh0ZW5zaW9uLXBvcnQtY29udHJvbGxlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjaHJvbWVcIi8+XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuaW1wb3J0IHsgZGVjb2RlTWVzc2FnZSwgSU1lc3NhZ2VEZWNvZGVyLCBNZXNzYWdlRGVjb2RlZEV2ZW50IH0gZnJvbSBcIi4vbWVzc2FnZS1kZWNvZGVyXCI7XHJcbmltcG9ydCB7IElNZXNzYWdlUmVjZWl2ZXIgfSBmcm9tIFwiLi9tZXNzYWdlLXJlY2VpdmVyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGlzcGF0Y2hlciB9IGZyb20gXCIuL2V2ZW50LWRpc3BhdGNoZXJcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhhbmRsZU1lc3NhZ2UgPSAobWVzc2FnZTogTWVzc2FnZSkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSGFuZGxlUG9ydE1lc3NhZ2UgPSAocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCwgbWVzc2FnZTogTWVzc2FnZSkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSGFuZGxlSW52YWxpZE1lc3NhZ2UgPSAocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCwgaW52YWxpZE1lc3NhZ2U6IG9iamVjdCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgT25VbmhhbmRsZWRNZXNzYWdlID0gKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQsIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHZvaWQ7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVJbnZhbGlkTWVzc2FnZShwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0LCBpbnZhbGlkTWVzc2FnZTogb2JqZWN0KSB7XHJcbiAgICBjb25zb2xlLmxvZyhgaGFuZGxlSW52YWxpZE1lc3NhZ2U6IGludmFsaWRNZXNzYWdlOiAke2ludmFsaWRNZXNzYWdlfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblVuaGFuZGxlZE1lc3NhZ2UocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCwgbWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5sb2coYG9uVW5oYW5kbGVkTWVzc2FnZTogbWVzc2FnZTogJHttZXNzYWdlfWApO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlUm91dGVyIGV4dGVuZHMgSU1lc3NhZ2VSZWNlaXZlciB7XHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVNZXNzYWdlKTogdm9pZDtcclxuICAgIHJlZ2lzdGVyUG9ydE1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVQb3J0TWVzc2FnZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIE1lc3NhZ2VSb3V0ZXIgaW1wbGVtZW50cyBJTWVzc2FnZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaGFuZGxlSW52YWxpZE1lc3NhZ2U6IEhhbmRsZUludmFsaWRNZXNzYWdlLCBwcm90ZWN0ZWQgb25VbmhhbmRsZWRNZXNzYWdlOiBPblVuaGFuZGxlZE1lc3NhZ2UpIHsgfVxyXG5cclxuICAgIGFic3RyYWN0IG9uTWVzc2FnZVJlY2VpdmVkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQsIGVuY29kZWRNZXNzYWdlOiBvYmplY3QpIDogdm9pZDtcclxuXHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVNZXNzYWdlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclBvcnRNZXNzYWdlSGFuZGxlcih0eXBlLCAocG9ydCwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyUG9ydE1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVQb3J0TWVzc2FnZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VIYW5kbGVycyA9IHRoaXMubWVzc2FnZUhhbmRsZXJzLmdldCh0eXBlKTtcclxuICAgICAgICBpZiAobWVzc2FnZUhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlSGFuZGxlcnMuc2V0KHR5cGUsIFtoYW5kbGVNZXNzYWdlXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWVzc2FnZUhhbmRsZXJzLnB1c2goaGFuZGxlTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBtZXNzYWdlSGFuZGxlcnMgPSBuZXcgTWFwPE1lc3NhZ2VUeXBlLCBIYW5kbGVQb3J0TWVzc2FnZVtdPigpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2VuZXJpY01lc3NhZ2VSb3V0ZXIgZXh0ZW5kcyBNZXNzYWdlUm91dGVyIGltcGxlbWVudHMgSU1lc3NhZ2VEZWNvZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKGhhbmRsZUludmFsaWRNZXNzYWdlLCBvblVuaGFuZGxlZE1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWVzc2FnZVJlY2VpdmVkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQsIGVuY29kZWRNZXNzYWdlOiBvYmplY3QpIDogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBkZWNvZGVNZXNzYWdlKGVuY29kZWRNZXNzYWdlKTtcclxuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW52YWxpZE1lc3NhZ2UocG9ydCwgZW5jb2RlZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25NZXNzYWdlRGVjb2RlZC5kaXNwYXRjaEV2ZW50KG5ldyBNZXNzYWdlRGVjb2RlZEV2ZW50KG1lc3NhZ2UpKTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSGFuZGxlcnMgPSB0aGlzLm1lc3NhZ2VIYW5kbGVycy5nZXQobWVzc2FnZS50eXBlKTtcclxuICAgICAgICBpZiAobWVzc2FnZUhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblVuaGFuZGxlZE1lc3NhZ2UocG9ydCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVNZXNzYWdlIG9mIG1lc3NhZ2VIYW5kbGVycykge1xyXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlKHBvcnQsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1lc3NhZ2VEZWNvZGVkID0gbmV3IEV2ZW50RGlzcGF0Y2hlcjxNZXNzYWdlRGVjb2RlZEV2ZW50PigpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLXJvdXRlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTWF5YmUsIHNvbWUsIGlzRXF1YWwsIG5vbmUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHk8VD4oYXJyYXk6IFRbXSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA9PT0gMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQ+KGFycmF5OiBUW10pOiBUIHtcclxuICAgIHJldHVybiBhcnJheVswXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZDxUPihhcnJheTogVFtdKTogVCB7XHJcbiAgICByZXR1cm4gYXJyYXlbMV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGFycmF5OiBUW10pOiBUIHtcclxuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc3Q8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc2xpY2UoMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluczxUPihhcnJheTogVFtdLCBlbGVtZW50OiBUKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihlbGVtZW50KSAhPT0gLTE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5QXJyYXk8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XHJcbiAgICBjb25zdCBpZGVudGl0eSA9ICh2YWx1ZTogVCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYXJyYXkubWFwKGlkZW50aXR5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsdWU6IGFueSk6IHZhbHVlIGlzIEFycmF5PGFueT4ge1xyXG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBcnJheTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWU6IFQpOiBBcnJheTxUPiB7XHJcbiAgICBjb25zdCBhcnJheSA9IG5ldyBBcnJheTxUPigpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xyXG4gICAgICAgIGFycmF5LnB1c2godmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4PFQ+KGFycmF5OiBUW10sIHZhbHVlOiBUKTogTWF5YmU8bnVtYmVyPiB7XHJcbiAgICBjb25zdCBub3RGb3VuZCA9IC0xO1xyXG4gICAgY29uc3QgaW5kZXggPSBhcnJheS5pbmRleE9mKHZhbHVlKTtcclxuICAgIGlmIChpbmRleCA9PT0gbm90Rm91bmQpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEFsbEluZGljZXM8VD4oYXJyYXk6IFRbXSwgcHJlZGljYXRlOiAoZWxlbWVudDogVCkgPT4gYm9vbGVhbik6IG51bWJlcltdIHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgYXJyYXkuZm9yRWFjaCgoZWxlbWVudDogVCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGlmIChwcmVkaWNhdGUoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHRzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZUFycmF5czxUPihhOiBUW10sIGI6IFRbXSwgY29tcGFyZTogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4gPSBpc0VxdWFsKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGVuZ3RoID0gYS5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKCFjb21wYXJlKGFbaV0sIGJbaV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhczxUPihhcnJheTogVFtdLCB2YWx1ZTogVCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHNvbWUoZmluZEluZGV4KGFycmF5LCB2YWx1ZSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZFVuaXF1ZTxUPihhcnJheTogVFtdLCBwcmVkaWNhdGU6IChlbGVtZW50OiBUKSA9PiBib29sZWFuKTogTWF5YmU8VD4ge1xyXG4gICAgY29uc3QgbWF0Y2hpbmdFbGVtZW50cyA9IGFycmF5LmZpbHRlcihwcmVkaWNhdGUpO1xyXG4gICAgaWYgKG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBmaXJzdChtYXRjaGluZ0VsZW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1heWJlRmlyc3Q8VD4oYXJyYXk6IE1heWJlPFRbXT4pOiBNYXliZTxUPiB7XHJcbiAgICBpZiAobm9uZShhcnJheSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpcnN0KGFycmF5KTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vYXJyYXktdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmV4cG9ydCB0eXBlIEFjdGlvbiA9ICgpID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9PbmNlKGFjdGlvbjogQWN0aW9uKTogQWN0aW9uIHtcclxuICAgIGxldCBkb25lID0gZmFsc2U7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGlmICghZG9uZSkge1xyXG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9vbmNlLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cImNocm9tZVwiLz5cclxuaW1wb3J0IHsgTWVzc2FnZVNlbmRlciB9IGZyb20gXCIuL21lc3NhZ2Utc2VuZGVyXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UsIEhhbmRzaGFrZVYxLCBtZXNzYWdlVG9TdHJpbmcgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSwgaXNGcmVxdWVudGx5U2VudE1lc3NhZ2VUeXBlLCBpc0VkZ2VBY2tXb3JrYXJvdW5kIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBlbmNvZGVNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZS1lbmNvZGVyXCI7XHJcbmltcG9ydCB7IGRlY29kZU1lc3NhZ2UgfSBmcm9tIFwiLi9tZXNzYWdlLWRlY29kZXJcIjtcclxuaW1wb3J0IHsgTWF5YmUsIG5vbmUsIHNvbWUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5pbXBvcnQgeyBJTWVzc2FnZVJlY2VpdmVyIH0gZnJvbSBcIi4vbWVzc2FnZS1yZWNlaXZlclwiO1xyXG5pbXBvcnQgeyBFdmVudERpc3BhdGNoZXIgfSBmcm9tIFwiLi9ldmVudC1kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IElIYW5kc2hha2VyLCBIYW5kc2hha2VuRXZlbnQgfSBmcm9tIFwiLi9oYW5kc2hha2VyXCI7XHJcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSBcIi4vc3RyaW5nLXV0aWxzXCI7XHJcbmltcG9ydCB7IGlzRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnNcIjtcclxuaW1wb3J0IHsgcG9ydFRvU3RyaW5nIH0gZnJvbSBcIi4vcG9ydC11dGlsc1wiO1xyXG5pbXBvcnQgeyBzdXBwb3J0ZWRQcm90b2NvbFZlcnNpb25zLCBQcm90b2NvbFZlcnNpb24sIHNob3VsZExvZ01lc3NhZ2UgfSBmcm9tIFwiLi9wcm90b2NvbC12ZXJzaW9uc1wiO1xyXG5pbXBvcnQgeyBJQ29ubmVjdGlvbiwgQ29ubmVjdGlvblN0YXRlLCBDb25uZWN0aW9uU3RhdGVDaGFuZ2VkRXZlbnQgfSBmcm9tIFwiLi9jb25uZWN0aW9uXCI7XHJcbmltcG9ydCB7IGxvZywgbG9nRXJyb3IgfSBmcm9tIFwiLi9sb2dcIjtcclxuXHJcbmV4cG9ydCB0eXBlIE9uQ29ubmVjdCA9IChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBPbkRpc2Nvbm5lY3QgPSAocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgT25Qb3J0RXJyb3IgPSAoZTogRXJyb3IpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIE9uTmVnb3RpYXRpb25FcnJvciA9IChlOiBFcnJvcikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBlbnVtIE5lZ290aWF0aW9uIHtcclxuICAgIE5vbmUsXHJcbiAgICBOZWdvdGlhdGVQcm90b2NvbFZlcnNpb25cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZVBvcnRDaGFubmVsIGV4dGVuZHMgSUhhbmRzaGFrZXIsIElDb25uZWN0aW9uIHtcclxuICAgIGNvbm5lY3QoKTogdm9pZDtcclxuICAgIGRpc2Nvbm5lY3QoKTogdm9pZDtcclxuICAgIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpOiBib29sZWFuO1xyXG4gICAgcmVhZG9ubHkgbWVzc2FnZVNlbmRlcjogTWVzc2FnZVNlbmRlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQb3J0Q2hhbm5lbCBpbXBsZW1lbnRzIElNZXNzYWdlUG9ydENoYW5uZWwge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdFRvUG9ydDogUHJvbWlzZTxjaHJvbWUucnVudGltZS5Qb3J0PixcclxuICAgICAgICAgICAgcHJpdmF0ZSBvbkNvbm5lY3Q6IE9uQ29ubmVjdCxcclxuICAgICAgICAgICAgcHJpdmF0ZSBvbkRpc2Nvbm5lY3Q6IE9uRGlzY29ubmVjdCxcclxuICAgICAgICAgICAgcHJpdmF0ZSBvblBvcnRFcnJvcjogT25Qb3J0RXJyb3IsXHJcbiAgICAgICAgICAgIHByaXZhdGUgb25OZWdvdGlhdGlvbkVycm9yOiBPbk5lZ290aWF0aW9uRXJyb3IsXHJcbiAgICAgICAgICAgIHByaXZhdGUgbWVzc2FnZVJvdXRlcjogSU1lc3NhZ2VSZWNlaXZlcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBuZWdvdGlhdGlvbiA6IE5lZ290aWF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VuZGVyID0gbmV3IE1lc3NhZ2VTZW5kZXIoKG1lc3NhZ2UpID0+IHRoaXMuc2VuZE1lc3NhZ2UobWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzY29ubmVjdFBvcnQocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCkge1xyXG4gICAgICAgIHBvcnQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRGlzY29ubmVjdChwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZVBvcnRDaGFubmVsLmNvbm5lY3RcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ublN0YXRlICE9PSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWVzc2FnZVBvcnRDaGFubmVsLmNvbm5lY3QgY2FsbGVkIHdpdGggY29ublN0YXRlID09ICR7dGhpcy5jb25uU3RhdGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ublN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VG9Qb3J0LnRoZW4oKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29ublN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0UG9ydChwb3J0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xyXG4gICAgICAgICAgICB0aGlzLnBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChlbmNvZGVNZXNzYWdlLCBwb3J0KSA9PiB0aGlzLm9uTWVzc2FnZShlbmNvZGVNZXNzYWdlLCBwb3J0KSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKHBvcnQpID0+IHRoaXMuaGFuZGxlRGlzY29ubmVjdChwb3J0KSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5lZ290aWF0aW9uID09PSBOZWdvdGlhdGlvbi5OZWdvdGlhdGVQcm90b2NvbFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ublN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkhhbmRzaGFraW5nO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZHNoYWtlID0gbmV3IEhhbmRzaGFrZVYxKHN1cHBvcnRlZFByb3RvY29sVmVyc2lvbnMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVuY29kZU1lc3NhZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIGhhbmRzaGFrZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUXVldWVkTWVzc2FnZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ublN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db25uZWN0KHRoaXMucG9ydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBNZXNzYWdlUG9ydENoYW5uZWwuY29ubmVjdDogY29ublN0YXRlID09ICR7dGhpcy5jb25uU3RhdGV9YCk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbm5TdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZzpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5IYW5kc2hha2luZzpcclxuICAgICAgICAgICAgICAgIGlmIChzb21lKHRoaXMucG9ydCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RQb3J0KHRoaXMucG9ydClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ6XHJcbiAgICAgICAgICAgICAgICBpZiAoc29tZSh0aGlzLnBvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0UG9ydCh0aGlzLnBvcnQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3N0TWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKG5vbmUodGhpcy5wb3J0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZVBvcnRDaGFubmVsLnBvc3RNZXNzYWdlOiB0aGlzLnBvcnQgPT09IHVuZGVmaW5lZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzRnJlcXVlbnRseVNlbnRNZXNzYWdlVHlwZShtZXNzYWdlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhgTWVzc2FnZVBvcnRDaGFubmVsLnBvc3RNZXNzYWdlOiBtZXNzYWdlOiAke21lc3NhZ2VUb1N0cmluZyhtZXNzYWdlKX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoaXNFcnJvcihlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblBvcnRFcnJvcihlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBVbmtub3duIGVycm9yIGNhdWdodCBpbiBwb3N0TWVzc2FnZTogJHt0b1N0cmluZyhlKX1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Qb3J0RXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZFF1ZXVlZE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiB0aGlzLm1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHF1ZXVlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5jb25uU3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2UoZW5jb2RlZE1lc3NhZ2U6IG9iamVjdCwgcG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkhhbmRzaGFraW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKGBNZXNzYWdlUG9ydENoYW5uZWwub25NZXNzYWdlOiBtZXNzYWdlOiAke3RvU3RyaW5nKGVuY29kZWRNZXNzYWdlKX0gcG9ydDogJHtwb3J0VG9TdHJpbmcocG9ydCl9YCk7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZGVjb2RlTWVzc2FnZShlbmNvZGVkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmIChub25lKG1lc3NhZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTaG91bGQgdGhpcyBjYWxsIG9uUG9ydEVycm9yPyBJdCBtaWdodCBub3QgYmUgc2VyaW91cyBlbm91Z2guXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKG5ldyBFcnJvcignTWVzc2FnZVBvcnRDaGFubmVsLm9uTWVzc2FnZTogaW52YWxpZCBtZXNzYWdlJykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRWRnZUFja1dvcmthcm91bmQobWVzc2FnZS50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRWRnZSBhY2sgbWVzc2FnZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlICE9PSBNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk5lZ290aWF0aW9uRXJyb3IobmV3IEVycm9yKGBNZXNzYWdlIGJlZm9yZSBoYW5kc2hha2VuOiAke21lc3NhZ2UudHlwZX1gKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9uZSh0aGlzLnBvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUG9ydEVycm9yKG5ldyBFcnJvcihcIk1lc3NhZ2VQb3J0Q2hhbm5lbC5vbk1lc3NhZ2U6IHRoaXMucG9ydCA9PT0gdW5kZWZpbmVkXCIpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRzaGFrZSA9IG1lc3NhZ2UucGF5bG9hZCBhcyBIYW5kc2hha2VWMTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3VwcG9ydGVkVmVyc2lvbiBvZiBzdXBwb3J0ZWRQcm90b2NvbFZlcnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRzaGFrZS52ZXJzaW9ucy5pbmRleE9mKHN1cHBvcnRlZFZlcnNpb24pID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVnb3RpYXRlZFZlcnNpb24gPSBzdXBwb3J0ZWRWZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhgTmVnb3RpYXRlZCBwcm90b2NvbCB2ZXJzaW9uOiAke3RoaXMuX25lZ290aWF0ZWRWZXJzaW9ufWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZWRNZXNzYWdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25IYW5kc2hha2VuLmRpc3BhdGNoRXZlbnQobmV3IEhhbmRzaGFrZW5FdmVudCh0aGlzLl9uZWdvdGlhdGVkVmVyc2lvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29ubmVjdCh0aGlzLnBvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25OZWdvdGlhdGlvbkVycm9yKG5ldyBFcnJvcihgTm8gc3VwcG9ydGVkIHZlcnNpb24gcmVjZWl2ZWQgaW4gaGFuZHNoYWtlOiAke2hhbmRzaGFrZS52ZXJzaW9uc31gKSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25uU3RhdGUgPT0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VSb3V0ZXIub25NZXNzYWdlUmVjZWl2ZWQocG9ydCwgZW5jb2RlZE1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZURpc2Nvbm5lY3QocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ublN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcclxuICAgICAgICB0aGlzLnBvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coYE1lc3NhZ2VQb3J0Q2hhbm5lbC5oYW5kbGVEaXNjb25uZWN0OiBwb3J0OiAke3BvcnRUb1N0cmluZyhwb3J0KX1gKTtcclxuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdChwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3VsZExvZ01lc3NhZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gV2Ugc2hvdWxkIGFsd2F5cyBsb2cgZnJvbSBpbnRyYS1leHRlbnNpb24gTWVzc2FnZVBvcnRDaGFubmVscyBzdWNoIGFzIHRob3NlIGZvciB0aGUgcG9wdXAgb3IgYmxvY2tpbmcgcGFnZVxyXG4gICAgICAgIGlmICh0aGlzLm5lZ290aWF0aW9uID09PSBOZWdvdGlhdGlvbi5Ob25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT25seSBsb2cgZm9yIHRoZSBIb3N0SGVscGVyIGNoYW5uZWwgaWYgd2UncmUgb24gYW4gb2xkIHByb3RvY29sIHZlcnNpb24gYmVmb3JlIHRoZSBoZWxwZXIgc3RhcnRlZCBsb2dnaW5nXHJcbiAgICAgICAgcmV0dXJuIHNvbWUodGhpcy5uZWdvdGlhdGVkVmVyc2lvbikgJiYgc2hvdWxkTG9nTWVzc2FnZSh0aGlzLm5lZ290aWF0ZWRWZXJzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbG9nKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZExvZ01lc3NhZ2UoKSkge1xyXG4gICAgICAgICAgICBsb2cobWVzc2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2dFcnJvcihlcnJvcjogRXJyb3IpIHtcclxuICAgICAgICBpZiAodGhpcy5zaG91bGRMb2dNZXNzYWdlKCkpIHtcclxuICAgICAgICAgICAgbG9nRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBjb25uU3RhdGUoKTogQ29ubmVjdGlvblN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29ublN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0IGNvbm5TdGF0ZShuZXdTdGF0ZSkge1xyXG4gICAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5fY29ublN0YXRlO1xyXG4gICAgICAgIHRoaXMuX2Nvbm5TdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICAgIHRoaXMub25Db25uZWN0aW9uU3RhdGVDaGFuZ2VkLmRpc3BhdGNoRXZlbnQobmV3IENvbm5lY3Rpb25TdGF0ZUNoYW5nZWRFdmVudChvbGRTdGF0ZSwgbmV3U3RhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNIYW5kc2hha2VuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmVnb3RpYXRlZFZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25lZ290aWF0ZWRWZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb25uZWN0aW9uU3RhdGUoKTogQ29ubmVjdGlvblN0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhZG9ubHkgbWVzc2FnZVNlbmRlcjogTWVzc2FnZVNlbmRlcjtcclxuICAgIHJlYWRvbmx5IG9uSGFuZHNoYWtlbiA9IG5ldyBFdmVudERpc3BhdGNoZXI8SGFuZHNoYWtlbkV2ZW50PigpO1xyXG4gICAgcmVhZG9ubHkgb25Db25uZWN0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RGlzcGF0Y2hlcjxDb25uZWN0aW9uU3RhdGVDaGFuZ2VkRXZlbnQ+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBwb3J0OiBNYXliZTxjaHJvbWUucnVudGltZS5Qb3J0PjtcclxuICAgIHByaXZhdGUgbWVzc2FnZXMgPSBuZXcgQXJyYXk8TWVzc2FnZT4oKTtcclxuICAgIHByaXZhdGUgX2Nvbm5TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XHJcbiAgICBwcml2YXRlIF9uZWdvdGlhdGVkVmVyc2lvbjogTWF5YmU8UHJvdG9jb2xWZXJzaW9uPiA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlbmVyaWNNZXNzYWdlUG9ydENoYW5uZWwgZXh0ZW5kcyBNZXNzYWdlUG9ydENoYW5uZWwge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29ubmVjdFRvUG9ydDogUHJvbWlzZTxjaHJvbWUucnVudGltZS5Qb3J0PixcclxuICAgICAgICBvbkNvbm5lY3Q6IE9uQ29ubmVjdCxcclxuICAgICAgICBvbkRpc2Nvbm5lY3Q6IE9uRGlzY29ubmVjdCxcclxuICAgICAgICBtZXNzYWdlUm91dGVyOiBJTWVzc2FnZVJlY2VpdmVyLFxyXG4gICAgICAgIG5lZ290aWF0aW9uIDogTmVnb3RpYXRpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29ubmVjdFRvUG9ydCxcclxuICAgICAgICAgICAgICAgIG9uQ29ubmVjdCxcclxuICAgICAgICAgICAgICAgIG9uRGlzY29ubmVjdCxcclxuICAgICAgICAgICAgICAgIChlOiBFcnJvcikgPT4geyBjb25zb2xlLmVycm9yKGUpIH0sXHJcbiAgICAgICAgICAgICAgICAoZTogRXJyb3IpID0+IHsgY29uc29sZS5lcnJvcihlKSB9LFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVJvdXRlcixcclxuICAgICAgICAgICAgICAgIG5lZ290aWF0aW9uKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1wb3J0LWNoYW5uZWwudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlUGF5bG9hZCwgTWVzc2FnZSB9IGZyb20gXCIuL21lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IGVuY29kZU1lc3NhZ2UgfSBmcm9tIFwiLi9tZXNzYWdlLWVuY29kZXJcIjtcclxuXHJcbnR5cGUgU2VuZE1lc3NhZ2UgPSAobWVzc2FnZTogTWVzc2FnZSkgPT4gYm9vbGVhbjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VuZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9TZW5kTWVzc2FnZTogU2VuZE1lc3NhZ2UpIHsgfVxyXG5cclxuICAgIHNlbmRNZXNzYWdlKHR5cGU6IE1lc3NhZ2VUeXBlLCBwYXlsb2FkOiBNZXNzYWdlUGF5bG9hZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlbmNvZGVNZXNzYWdlKHR5cGUsIHBheWxvYWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvU2VuZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL21lc3NhZ2Utc2VuZGVyLnRzIiwiZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi90eXBlLXV0aWxzLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBFdmVudERpc3BhdGNoZXIgfSBmcm9tIFwiLi9ldmVudC1kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgUHJvdG9jb2xWZXJzaW9uIH0gZnJvbSBcIi4vcHJvdG9jb2wtdmVyc2lvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIYW5kc2hha2VuRXZlbnQge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbmVnb3RpYXRlZFZlcnNpb24gOiBQcm90b2NvbFZlcnNpb24pIHsgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElIYW5kc2hha2VyIHtcclxuICAgIHJlYWRvbmx5IG9uSGFuZHNoYWtlbiA6IEV2ZW50RGlzcGF0Y2hlcjxIYW5kc2hha2VuRXZlbnQ+O1xyXG4gICAgaXNIYW5kc2hha2VuIDogYm9vbGVhbjtcclxuICAgIG5lZ290aWF0ZWRWZXJzaW9uIDogTWF5YmU8UHJvdG9jb2xWZXJzaW9uPjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2hhbmRzaGFrZXIudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY2hyb21lXCIvPlxyXG5pbXBvcnQgeyBNYXliZSwgbm9uZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IGlzVmFsaWRUYWJJZCB9IGZyb20gXCIuL3RhYi11dGlsc1wiO1xyXG5pbXBvcnQgeyBUYWJJZCwgRnJhbWVJZCB9IGZyb20gXCIuL2NvbW1vbi10eXBlc1wiO1xyXG5pbXBvcnQgeyBVUkwsIHBhcnNlVXJsIH0gZnJvbSBcIi4vdXJsLXV0aWxzXCI7XHJcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSBcIi4vc3RyaW5nLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBvcnRUYWJJZChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KTogTWF5YmU8VGFiSWQ+IHtcclxuICAgIGNvbnN0IHNlbmRlciA9IHBvcnQuc2VuZGVyO1xyXG4gICAgaWYgKG5vbmUoc2VuZGVyKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0YWIgPSBzZW5kZXIudGFiO1xyXG4gICAgaWYgKG5vbmUodGFiKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0YWJJZCA9IHRhYi5pZDtcclxuICAgIGlmIChub25lKHRhYklkKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzVmFsaWRUYWJJZCh0YWJJZCkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhYklkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBvcnRQYWdlVXJsKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpOiBNYXliZTxVUkw+IHtcclxuICAgIGNvbnN0IHNlbmRlciA9IHBvcnQuc2VuZGVyO1xyXG4gICAgaWYgKG5vbmUoc2VuZGVyKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHVybFNwZWMgPSBzZW5kZXIudXJsO1xyXG4gICAgaWYgKG5vbmUodXJsU3BlYykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmwgPSBwYXJzZVVybCh1cmxTcGVjKTtcclxuICAgIHJldHVybiB1cmw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkUG9ydFRhYlVybChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KTogTWF5YmU8VVJMPiB7XHJcbiAgICBjb25zdCBzZW5kZXIgPSBwb3J0LnNlbmRlcjtcclxuICAgIGlmIChub25lKHNlbmRlcikpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFiID0gc2VuZGVyLnRhYjtcclxuICAgIGlmIChub25lKHRhYikpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXJsU3BlYyA9IHRhYi51cmw7XHJcbiAgICBpZiAobm9uZSh1cmxTcGVjKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmwgPSBwYXJzZVVybCh1cmxTcGVjKTtcclxuICAgIHJldHVybiB1cmw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkUG9ydEZyYW1lSWQocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCk6IE1heWJlPEZyYW1lSWQ+IHtcclxuICAgIGNvbnN0IHNlbmRlciA9IHBvcnQuc2VuZGVyO1xyXG4gICAgaWYgKG5vbmUoc2VuZGVyKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VuZGVyLmZyYW1lSWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3J0VG9TdHJpbmcocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCk6IHN0cmluZyB7XHJcbiAgICAvLyBUaGUgcG9ydCBjYW4gYmUgdW5kZWZpbmVkIGluIE1lc3NhZ2VQb3J0Q2hhbm5lbC5oYW5kbGVEaXNjb25uZWN0IGluIEVkZ2UuXHJcbiAgICBpZiAocG9ydCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9TdHJpbmcoe1xyXG4gICAgICAgIG5hbWU6IHBvcnQubmFtZSxcclxuICAgICAgICB0YWJJZDogcmVhZFBvcnRUYWJJZChwb3J0KSxcclxuICAgICAgICBmcmFtZUlkOiByZWFkUG9ydEZyYW1lSWQocG9ydCksXHJcbiAgICAgICAgcGFnZVVybDogcmVhZFBvcnRQYWdlVXJsKHBvcnQpXHJcbiAgICB9KTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vcG9ydC11dGlscy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgVGFiSWQsIFdpbmRvd0lkIH0gZnJvbSBcIi4vY29tbW9uLXR5cGVzXCI7XHJcbmltcG9ydCB7IEhhc2ggfSBmcm9tIFwiLi9oYXNoXCI7XHJcbmltcG9ydCB7IG11cm11ckhhc2ggfSBmcm9tIFwiLi9tdXJtdXItaGFzaFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRXaW5kb3dJZCh3aW5kb3dJZDogV2luZG93SWQpIHtcclxuICAgIHJldHVybiB3aW5kb3dJZCAhPT0gY2hyb21lLndpbmRvd3MuV0lORE9XX0lEX05PTkU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVGFiSWQodGFiSWQ6IFRhYklkKSB7XHJcbiAgICByZXR1cm4gdGFiSWQgIT09IGNocm9tZS50YWJzLlRBQl9JRF9OT05FO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzaFRhYklkKHRhYklkOiBUYWJJZCwgc2VlZDogSGFzaCA9IDApOiBIYXNoIHtcclxuICAgIHJldHVybiBtdXJtdXJIYXNoKHRhYklkLCBzZWVkKTtcclxufSBcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVUYWJJZChhOiBUYWJJZCwgYjogVGFiSWQpOiBib29sZWFuIHtcclxuICAgIGlmICghaXNWYWxpZFRhYklkKGEpIHx8ICFpc1ZhbGlkVGFiSWQoYikpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYSA9PT0gYjtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vdGFiLXV0aWxzLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBtYWtlU3RyaW5nSGFzaE1hcCB9IGZyb20gXCIuL3N0cmluZy11dGlsc1wiO1xyXG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gXCIuL3JhbmdlXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBub25lLCBzb21lLCBNYXliZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IENocmFnRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFByb3RvY29sVmVyc2lvbiB7XHJcbiAgICB2MSA9IFwidGFnOmJyb21pdW0uY29tLDIwMTgtMDI6cHJvdG9jb2xzOmdvb2dsZS1jaHJvbWUtZXh0ZW5zaW9uOmluaXRpYWxcIixcclxuICAgIHYyID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOC0wNjpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djJcIixcclxuICAgIHYzID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOC0wNzpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djNcIixcclxuICAgIHY0ID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOC0wODpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djRcIixcclxuICAgIHY1ID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOC0xMTpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djVcIixcclxuICAgIHY2ID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOC0xMjpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djZcIixcclxuICAgIHY3ID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOS0wMTpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djdcIixcclxuICAgIHY4ID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOS0wNjpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djhcIixcclxuICAgIHY5ID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOS0wNzpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djlcIixcclxuICAgIHYxMCA9IFwidGFnOmJyb21pdW0uY29tLDIwMTktMDk6cHJvdG9jb2xzOmdvb2dsZS1jaHJvbWUtZXh0ZW5zaW9uOnYxMFwiLFxyXG4gICAgdjExID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOS0xMDpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djExXCIsXHJcbiAgICB2MTIgPSBcInRhZzpicm9taXVtLmNvbSwyMDE5LTExOnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2MTJcIixcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZFByb3RvY29sVmVyc2lvbnMgPSBbXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjEyLFxyXG4gICAgUHJvdG9jb2xWZXJzaW9uLnYxMSxcclxuICAgIFByb3RvY29sVmVyc2lvbi52MTAsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjksXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjgsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjcsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjYsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjUsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjQsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjMsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjIsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjFcclxuXTtcclxuXHJcbmNvbnN0IHN1cHBvcnRlZE1lc3NhZ2VUeXBlcyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBzdXBwb3J0ZWRNZXNzYWdlUmFuZ2VzID0gbWFrZVN0cmluZ0hhc2hNYXA8UmFuZ2U+KCk7XHJcbiAgICBzdXBwb3J0ZWRNZXNzYWdlUmFuZ2VzLnB1dE1hbnkoW1xyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUuaGVhcnRiZWF0VjEpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYyLCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLmVuYWJsZWRGZWF0dXJlc1Jlc3BvbnNlVjIpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYzLCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLnJlcHV0YXRpb25DaGFuZ2VkVjMpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY0LCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLmJsb2NrZWRQYWdlRGF0YVJlc3BvbnNlVjQpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY1LCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLnBvcHVwRGF0YVJlc3BvbnNlVjUpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY2LCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLnRydXN0VXJsVjYpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY3LCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLmNvbmZpZ0NoYW5nZWRWNyldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjgsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUuY29uZmlnQ2hhbmdlZFY4KV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52OSwgbmV3IFJhbmdlKE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxLCBNZXNzYWdlVHlwZS5jb25maWdDaGFuZ2VkVjkpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMCwgbmV3IFJhbmdlKE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxLCBNZXNzYWdlVHlwZS5oZWFydGJlYXRWMTApXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMSwgbmV3IFJhbmdlKE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxLCBNZXNzYWdlVHlwZS5jb25maWdDaGFuZ2VkVjExKV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52MTIsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUuY29uZmlnQ2hhbmdlZFYxMildLFxyXG4gICAgXSk7XHJcbiAgICByZXR1cm4gc3VwcG9ydGVkTWVzc2FnZVJhbmdlcztcclxufSkoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc01lc3NhZ2VUeXBlU3VwcG9ydGVkKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSwgcHJvdG9jb2xWZXJzaW9uOiBQcm90b2NvbFZlcnNpb24pIHtcclxuICAgIGNvbnN0IHJhbmdlID0gc3VwcG9ydGVkTWVzc2FnZVR5cGVzLmdldChwcm90b2NvbFZlcnNpb24pO1xyXG4gICAgaWYgKG5vbmUocmFuZ2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhbmdlLmNvbnRhaW5zKG1lc3NhZ2VUeXBlKTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmVyc2lvblN1cHBvcnRTdGF0dXMge1xyXG4gICAgbm90SGFuZHNoYWtlbixcclxuICAgIHN1cHBvcnRlZCxcclxuICAgIHVuc3VwcG9ydGVkXHJcbn1cclxuXHJcbmNvbnN0IHN1cHBvcnRlZEVycm9ycyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBzdXBwb3J0ZWRFcnJvcnMgPSBtYWtlU3RyaW5nSGFzaE1hcDxSYW5nZT4oKTtcclxuICAgIHN1cHBvcnRlZEVycm9ycy5wdXRNYW55KFtcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxLCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLnJlY292ZXJlZEZyb21FcnJvcildLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjIsIG5ldyBSYW5nZShDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsIENocmFnRXJyb3IucmVjb3ZlcmVkRnJvbUVycm9yKV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52MywgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5yZWNvdmVyZWRGcm9tRXJyb3IpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY0LCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLnJlY292ZXJlZEZyb21FcnJvcildLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjUsIG5ldyBSYW5nZShDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsIENocmFnRXJyb3IucmVjb3ZlcmVkRnJvbUVycm9yKV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52NiwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5yZWNvdmVyZWRGcm9tRXJyb3IpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY3LCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLmlzMzJiaXRGaXJlZm94KV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52OCwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5pczMyYml0RmlyZWZveCldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjksIG5ldyBSYW5nZShDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsIENocmFnRXJyb3IuaXMzMmJpdEZpcmVmb3gpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMCwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5oZWxwZXJVbnJlc3BvbnNpdmUpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMSwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5oZWxwZXJVbnJlc3BvbnNpdmUpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMiwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5oZWxwZXJVbnJlc3BvbnNpdmUpXSxcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHN1cHBvcnRlZEVycm9ycztcclxufSkoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Vycm9yU3VwcG9ydGVkKGVycm9yOiBDaHJhZ0Vycm9yLCBwcm90b2NvbFZlcnNpb246IFByb3RvY29sVmVyc2lvbikge1xyXG4gICAgY29uc3QgcmFuZ2UgPSBzdXBwb3J0ZWRFcnJvcnMuZ2V0KHByb3RvY29sVmVyc2lvbik7XHJcbiAgICBpZiAobm9uZShyYW5nZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFuZ2UuY29udGFpbnMoZXJyb3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkTG9nTWVzc2FnZShwcm90b2NvbFZlcnNpb246IFByb3RvY29sVmVyc2lvbikge1xyXG4gICAgcmV0dXJuICFpc01lc3NhZ2VUeXBlU3VwcG9ydGVkKE1lc3NhZ2VUeXBlLnN0b3BIZWxwZXJWMTAsIHByb3RvY29sVmVyc2lvbik7XHJcbn1cclxuXHJcbmVudW0gSGVscFBhZ2VWZXJzaW9uIHtcclxuICAgIHY0MTUgPSBcInY0LjEuNVwiLFxyXG4gICAgdjQxODEgPSBcInY0LjEuOC4xXCIsXHJcbiAgICBtYXhIZWxwUGFnZVZlcnNpb24gPSB2NDE4MVxyXG59O1xyXG5cclxuY29uc3Qgc3VwcG9ydGVkSGVscFBhZ2VWZXJzaW9ucyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBzdXBwb3J0ZWRIZWxwUGFnZVZlcnNpb25zID0gbWFrZVN0cmluZ0hhc2hNYXA8c3RyaW5nPigpO1xyXG4gICAgc3VwcG9ydGVkSGVscFBhZ2VWZXJzaW9ucy5wdXRNYW55KFtcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjIsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjMsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjQsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjUsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjYsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjcsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjgsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjksIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEwLCBIZWxwUGFnZVZlcnNpb24udjQxNV0sXHJcbiAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMSwgSGVscFBhZ2VWZXJzaW9uLnY0MTgxXSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEyLCBIZWxwUGFnZVZlcnNpb24udjQxODFdLFxyXG4gICAgXSk7XHJcbiAgICByZXR1cm4gc3VwcG9ydGVkSGVscFBhZ2VWZXJzaW9ucztcclxufSkoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWxwUGFnZVZlcnNpb24ocHJvdG9jb2xWZXJzaW9uOiBNYXliZTxQcm90b2NvbFZlcnNpb24+KSB7XHJcbiAgICBpZiAoc29tZShwcm90b2NvbFZlcnNpb24pKSB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkVmVyc2lvbiA9IHN1cHBvcnRlZEhlbHBQYWdlVmVyc2lvbnMuZ2V0KHByb3RvY29sVmVyc2lvbik7XHJcbiAgICAgICAgaWYgKHNvbWUoc3VwcG9ydGVkVmVyc2lvbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZFZlcnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gV2UgbmVlZCBhIHZlcnNpb24gc3RyaW5nIHRvIG1ha2UgYSB2YWxpZCBoZWxwIGxpbmsgVVJMIHNvIHdlIGNhbid0IGp1c3QgcmV0dXJuIHx1bmRlZmluZWR8IGhlcmVcclxuICAgIHJldHVybiBIZWxwUGFnZVZlcnNpb24ubWF4SGVscFBhZ2VWZXJzaW9uO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvcHJvdG9jb2wtdmVyc2lvbnMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IGlzSW5SYW5nZSB9IGZyb20gXCIuL251bWJlci11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJhbmdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1pbjogbnVtYmVyLCByZWFkb25seSBtYXg6IG51bWJlcikge31cclxuXHJcbiAgICBjb250YWlucyh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlzSW5SYW5nZSh2YWx1ZSwgdGhpcy5taW4sIHRoaXMubWF4KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3JhbmdlLnRzIiwiaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcIi4vZXZlbnQtZGlzcGF0Y2hlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gQ29ubmVjdGlvblN0YXRlIHtcclxuICAgIENvbm5lY3RpbmcsXHJcbiAgICBIYW5kc2hha2luZyxcclxuICAgIENvbm5lY3RlZCxcclxuICAgIERpc2Nvbm5lY3RpbmcsXHJcbiAgICBEaXNjb25uZWN0ZWRcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TdGF0ZUNoYW5nZWRFdmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvbGRTdGF0ZTogQ29ubmVjdGlvblN0YXRlLCByZWFkb25seSBuZXdTdGF0ZTogQ29ubmVjdGlvblN0YXRlKSB7fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb25uZWN0aW9uIHtcclxuICAgIHJlYWRvbmx5IG9uQ29ubmVjdGlvblN0YXRlQ2hhbmdlZDogRXZlbnREaXNwYXRjaGVyPENvbm5lY3Rpb25TdGF0ZUNoYW5nZWRFdmVudD47XHJcbiAgICByZWFkb25seSBjb25uZWN0aW9uU3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9jb25uZWN0aW9uLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5leHBvcnQgdHlwZSBGYWN0b3J5PFQ+ID0gKCkgPT4gVDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlUHJvbWlzZTxUPihmYWN0b3J5OiBGYWN0b3J5PFQ+KTogUHJvbWlzZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoZmFjdG9yeSgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSZXNvbHZlcjxUPiA9ICh2YWx1ZTogVCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgQXN5bmNGYWN0b3J5PFQ+ID0gKHJlc29sdmU6IFJlc29sdmVyPFQ+KSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQcm9taXNlQXN5bmM8VD4oZmFjdG9yeTogQXN5bmNGYWN0b3J5PFQ+KTogUHJvbWlzZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZhY3RvcnkocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vcHJvbWlzZS11dGlscy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSG9zdENvbnN0YW50cyB7XHJcbiAgICBob3N0SGVscGVySWQ6IHN0cmluZztcclxuICAgIGJsb2NrZWRQYWdlOiBzdHJpbmc7XHJcbiAgICBleHRlcm5hbEFwcExpbmtQYWdlOiBzdHJpbmc7XHJcbiAgICBob2xkaW5nUGFnZTogc3RyaW5nLFxyXG4gICAgYmxvY2tlZEZpbGVQYWdlOiBzdHJpbmc7XHJcbiAgICBwYWdlVHJhY2tlclBvcnROYW1lOiBzdHJpbmc7XHJcbiAgICBleHRlcm5hbEFwcExpbmtQYWdlUG9ydE5hbWU6IHN0cmluZztcclxuICAgIGVkZ2VFeHRlcm5hbEFwcExpbmtRdWVyeUtleTogc3RyaW5nO1xyXG4gICAgZWRnZUV4dGVybmFsQXBwTGlua1F1ZXJ5VmFsdWU6IHN0cmluZztcclxuICAgIGJsb2NrZWRQYWdlUG9ydE5hbWU6IHN0cmluZztcclxuICAgIGJsb2NrZWRGaWxlUGFnZVBvcnROYW1lOiBzdHJpbmc7XHJcbiAgICBwb3B1cFBvcnROYW1lOiBzdHJpbmc7XHJcbiAgICBvcHRpb25zUG9ydE5hbWU6IHN0cmluZztcclxuICAgIG1heEFnZVBhZ2VFdmVudDogbnVtYmVyO1xyXG4gICAgcG9zdHBvbmVtZW50VGltZW91dDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaG9zdENvbnN0YW50czogSUhvc3RDb25zdGFudHMgPSB7XHJcbiAgICBob3N0SGVscGVySWQ6IFwiY29tLmJyb21pdW0uaG9zdGhlbHBlclwiLFxyXG4gICAgYmxvY2tlZFBhZ2U6IFwiYmxvY2tlZC1wYWdlLmh0bWxcIixcclxuICAgIGV4dGVybmFsQXBwTGlua1BhZ2U6IFwiZXh0ZXJuYWwtYXBwLWxpbmstcGFnZS12MS5odG1sXCIsXHJcbiAgICBob2xkaW5nUGFnZTogXCJob2xkaW5nLXBhZ2UuaHRtbFwiLFxyXG4gICAgZWRnZUV4dGVybmFsQXBwTGlua1F1ZXJ5S2V5OiBcImQxYjMwZTY4LTgzYmUtNGI2ZS05YzJhLWMxYzRjYTUwMmU4YlwiLFxyXG4gICAgZWRnZUV4dGVybmFsQXBwTGlua1F1ZXJ5VmFsdWU6IFwiMFwiLFxyXG4gICAgYmxvY2tlZEZpbGVQYWdlOiBcImJsb2NrZWQtZmlsZS1wYWdlLmh0bWxcIixcclxuICAgIHBhZ2VUcmFja2VyUG9ydE5hbWU6IFwiY29tLmJyb21pdW0ucGFnZS50cmFja2VyXCIsXHJcbiAgICBleHRlcm5hbEFwcExpbmtQYWdlUG9ydE5hbWU6IFwiY29tLmJyb21pdW0uZXh0ZXJuYWwuYXBwLmxpbmsucGFnZVwiLFxyXG4gICAgYmxvY2tlZFBhZ2VQb3J0TmFtZTogXCJjb20uYnJvbWl1bS5ibG9ja2VkLnBhZ2VcIixcclxuICAgIGJsb2NrZWRGaWxlUGFnZVBvcnROYW1lOiBcImNvbS5icm9taXVtLmJsb2NrZWQuZmlsZS5wYWdlXCIsXHJcbiAgICBwb3B1cFBvcnROYW1lOiBcImNvbS5icm9taXVtLnBvcHVwXCIsXHJcbiAgICBvcHRpb25zUG9ydE5hbWU6IFwiY29tLmJyb21pdW0ub3B0aW9uc1wiLFxyXG4gICAgbWF4QWdlUGFnZUV2ZW50OiAxMDAwLFxyXG4gICAgcG9zdHBvbmVtZW50VGltZW91dDogNTAwMFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9ob3N0LWNvbnN0YW50cy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgVVJMLCBVUkxUb1N0cmluZyB9IGZyb20gXCIuL3VybC11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRlRG9jdW1lbnQoZG9jdW1lbnQ6IERvY3VtZW50LCB1cmw6IFVSTCkge1xyXG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IFVSTFRvU3RyaW5nKHVybCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9kb20tdXRpbHMudHMiXSwic291cmNlUm9vdCI6IiJ9