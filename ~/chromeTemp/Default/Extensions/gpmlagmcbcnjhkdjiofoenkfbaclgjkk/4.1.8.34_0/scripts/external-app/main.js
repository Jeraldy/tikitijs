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
const murmur_hash_1 = __webpack_require__(10);
const hash_map_1 = __webpack_require__(14);
const url_utils_1 = __webpack_require__(2);
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __webpack_require__(0);
const murmur_hash_1 = __webpack_require__(10);
const hash_map_1 = __webpack_require__(14);
const origin_1 = __webpack_require__(30);
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

var processNextTick = __webpack_require__(12);
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
const array_utils_1 = __webpack_require__(55);
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

Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __webpack_require__(31);
const string_utils_1 = __webpack_require__(0);
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
exports.PassThrough = __webpack_require__(47);


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

var processNextTick = __webpack_require__(12);
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
  deprecate: __webpack_require__(46)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(13).Buffer;
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(44).setImmediate, __webpack_require__(4)))

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

var processNextTick = __webpack_require__(12);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(38);
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
var Buffer = __webpack_require__(13).Buffer;
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
var debugUtil = __webpack_require__(42);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(43);
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



var base64 = __webpack_require__(39)
var ieee754 = __webpack_require__(40)
var isArray = __webpack_require__(41)

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

var processNextTick = __webpack_require__(12);
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


var Buffer = __webpack_require__(13).Buffer;

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
const string_utils_1 = __webpack_require__(0);
const type_utils_1 = __webpack_require__(56);
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const once_1 = __webpack_require__(60);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function encodeMessage(type, payload) {
    return { type: type, payload: payload };
}
exports.encodeMessage = encodeMessage;


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
const url_utils_1 = __webpack_require__(2);
const url_parse_utils_1 = __webpack_require__(52);
const external_app_link_page_options_1 = __webpack_require__(53);
const maybe_1 = __webpack_require__(1);
const external_app_link_controller_1 = __webpack_require__(54);
class Options {
    constructor(linkURL, externalAppName) {
        this.linkURL = linkURL;
        this.externalAppName = externalAppName;
    }
}
function parseOptions(window) {
    const documentURL = url_parse_utils_1.findDocumentUrl(window);
    if (maybe_1.none(documentURL)) {
        return undefined;
    }
    const linkURL = url_parse_utils_1.findURLDocumentQueryParam(documentURL, external_app_link_page_options_1.OptionNames.linkSpec);
    if (maybe_1.none(linkURL)) {
        return undefined;
    }
    const externalAppName = url_parse_utils_1.findDocumentQueryParam(documentURL, external_app_link_page_options_1.OptionNames.externalAppName);
    if (maybe_1.none(externalAppName)) {
        return undefined;
    }
    return new Options(linkURL, externalAppName);
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
    const linkSpec = url_utils_1.URLToString(options.linkURL);
    document.title = linkSpec;
    const controller = new external_app_link_controller_1.ExternalAppLinkController(document, options.linkURL, options.externalAppName);
}
window.onload = (event) => {
    main(window);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(1);
const murmur_hash_1 = __webpack_require__(10);
const url_utils_1 = __webpack_require__(2);
const hash_map_1 = __webpack_require__(14);
const log_1 = __webpack_require__(11);
const qlobber_1 = __webpack_require__(32);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function currentDateTimeString() {
    return new Date().toISOString();
}
exports.currentDateTimeString = currentDateTimeString;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint node: true*/

module.exports = __webpack_require__(33);


/***/ }),
/* 33 */
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


var util = __webpack_require__(34);

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

let stream = __webpack_require__(37);

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
/* 34 */
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

exports.isBuffer = __webpack_require__(35);

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
exports.inherits = __webpack_require__(36);

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
/* 35 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 36 */
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
/* 37 */
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
Stream.Writable = __webpack_require__(48);
Stream.Duplex = __webpack_require__(49);
Stream.Transform = __webpack_require__(50);
Stream.PassThrough = __webpack_require__(51);

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
/* 38 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(13).Buffer;
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
/* 44 */
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
__webpack_require__(45);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).Transform


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).PassThrough


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(1);
const url_utils_1 = __webpack_require__(2);
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OptionNames;
(function (OptionNames) {
    OptionNames["linkSpec"] = "linkSpec";
    OptionNames["externalAppName"] = "externalAppName";
})(OptionNames = exports.OptionNames || (exports.OptionNames = {}));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(6);
const messages_1 = __webpack_require__(24);
const url_utils_1 = __webpack_require__(2);
const maybe_1 = __webpack_require__(1);
const log_1 = __webpack_require__(11);
const string_utils_1 = __webpack_require__(0);
const host_constants_1 = __webpack_require__(57);
const extension_port_controller_1 = __webpack_require__(58);
const dom_utils_1 = __webpack_require__(70);
class ExternalAppLinkController {
    constructor(document, linkURL, externalAppName) {
        this.document = document;
        this.linkURL = linkURL;
        this.externalAppName = externalAppName;
        this.extensionPortController = new extension_port_controller_1.ExtensionPortController(host_constants_1.hostConstants.externalAppLinkPagePortName, () => this.onExtensionReady());
        this.extensionPortController.registerMessageHandler(message_types_1.MessageType.externalAppLinkResponseV1, (message) => this.handleResponse(message));
        this.extensionPortController.connect();
    }
    sendMessage(type, payload) {
        this.extensionPortController.sendMessage(type, payload);
    }
    navigate(url) {
        log_1.log(`ExternalAppLinkController.navigate: ${string_utils_1.toString({
            linkURL: this.linkURL,
            externalAppName: this.externalAppName,
            url: url
        })}`);
        dom_utils_1.navigateDocument(this.document, url);
    }
    sendRequest() {
        log_1.log(`ExternalAppLinkController.sendRequest: ${string_utils_1.toString({
            linkURL: this.linkURL,
            externalAppName: this.externalAppName,
        })}`);
        this.sendMessage(message_types_1.MessageType.externalAppLinkRequestV1, new messages_1.ExternalAppLinkRequestV1(url_utils_1.URLToString(this.linkURL), this.externalAppName));
    }
    onExtensionReady() {
        this.sendRequest();
    }
    handleResponse(message) {
        const response = message.payload;
        log_1.log(`ExternalAppLinkController.handleResponse: ${string_utils_1.toString({
            linkURL: this.linkURL,
            externalAppName: this.externalAppName,
            navigateToSpec: response.navigateToSpec
        })}`);
        const url = url_utils_1.parseUrl(response.navigateToSpec);
        if (maybe_1.none(url)) {
            return;
        }
        this.navigate(url);
    }
}
exports.ExternalAppLinkController = ExternalAppLinkController;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(1);
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
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_router_1 = __webpack_require__(59);
const message_port_channel_1 = __webpack_require__(61);
const promise_utils_1 = __webpack_require__(69);
const message_types_1 = __webpack_require__(6);
const log_1 = __webpack_require__(11);
const string_utils_1 = __webpack_require__(0);
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_decoder_1 = __webpack_require__(25);
const event_dispatcher_1 = __webpack_require__(26);
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_sender_1 = __webpack_require__(62);
const messages_1 = __webpack_require__(24);
const message_types_1 = __webpack_require__(6);
const message_encoder_1 = __webpack_require__(27);
const message_decoder_1 = __webpack_require__(25);
const maybe_1 = __webpack_require__(1);
const event_dispatcher_1 = __webpack_require__(26);
const handshaker_1 = __webpack_require__(63);
const string_utils_1 = __webpack_require__(0);
const errors_1 = __webpack_require__(28);
const port_utils_1 = __webpack_require__(64);
const protocol_versions_1 = __webpack_require__(66);
const connection_1 = __webpack_require__(68);
const log_1 = __webpack_require__(11);
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_encoder_1 = __webpack_require__(27);
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
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(1);
const tab_utils_1 = __webpack_require__(65);
const url_utils_1 = __webpack_require__(2);
const string_utils_1 = __webpack_require__(0);
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
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __webpack_require__(0);
const range_1 = __webpack_require__(67);
const message_types_1 = __webpack_require__(6);
const maybe_1 = __webpack_require__(1);
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_utils_1 = __webpack_require__(2);
function navigateDocument(document, url) {
    document.location.href = url_utils_1.URLToString(url);
}
exports.navigateDocument = navigateDocument;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGMxYWIwMmE1Zjc1NzViMzVkMTQiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9zdHJpbmctdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tYXliZS50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3VybC11dGlscy50cyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9kdXBsZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9tZXNzYWdlLXR5cGVzLnRzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2NvcmUtdXRpbC1pcy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL251bWJlci11dGlscy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL211cm11ci1oYXNoLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbG9nLnRzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9wcm9jZXNzLW5leHRpY2stYXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc2FmZS1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9oYXNoLW1hcC50cyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS1icm93c2VyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3JlYWRhYmxlLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbS1icm93c2VyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveS5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3N0cmluZ19kZWNvZGVyL2xpYi9zdHJpbmdfZGVjb2Rlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvbWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLWRlY29kZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1lbmNvZGVyLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXJyb3JzLnRzIiwid2VicGFjazovLy8uL21haW4udHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9vcmlnaW4udHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9kYXRlLXV0aWxzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9xbG9iYmVyL2luZGV4LmpzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9xbG9iYmVyL2xpYi9xbG9iYmVyLmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L2luZGV4LmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9jOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL0J1ZmZlckxpc3QuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwtZGVwcmVjYXRlL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vd3JpdGFibGUtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9kdXBsZXgtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL2M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcGFzc3Rocm91Z2guanMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi91cmwtcGFyc2UtdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvZXh0ZXJuYWwtYXBwLWxpbmstcGFnZS1vcHRpb25zLnRzIiwid2VicGFjazovLy8uL2V4dGVybmFsLWFwcC1saW5rLWNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9hcnJheS11dGlscy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3R5cGUtdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvaG9zdC1jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9leHRlbnNpb24tcG9ydC1jb250cm9sbGVyLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9vbmNlLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1wb3J0LWNoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLXNlbmRlci50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2hhbmRzaGFrZXIudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9wb3J0LXV0aWxzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vdGFiLXV0aWxzLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9ob3N0L3Byb3RvY29sLXZlcnNpb25zLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vcmFuZ2UudHMiLCJ3ZWJwYWNrOi8vL0M6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9jb25uZWN0aW9uLnRzIiwid2VicGFjazovLy9DOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vcHJvbWlzZS11dGlscy50cyIsIndlYnBhY2s6Ly8vQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2RvbS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFD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R0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELEVB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztB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QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDOztBQUVqQzs7QUFFQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvREFBb0Q7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7O0FDdnBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsNkVBQTZFO0FBQ3hKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrR0FBa0c7QUFDbEcsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1RixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsK0NBQStDOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEVBQTRFOztBQUU1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLG1EQUFtRCxpRUFBaUU7QUFDcEg7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUM5K0JBOzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNDQUFzQyxzQ0FBc0M7QUFDekc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEM7Ozs7Ozs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxZQUFZO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxFQUFFO0FBQ1AsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7OztBQ2xOQSwrQ0FBOEM7QUFTOUMsOENBQTBDO0FBQzFDLDZDQUFzRTtBQW9CdEUscUNBQTRDLEtBQVU7SUFDbEQsTUFBTSxDQUFDLHFCQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xCLHNCQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN2QixzQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDeEIsc0JBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUxELGtFQUtDO0FBRUQsc0NBQTZDLEtBQVU7SUFDbkQsTUFBTSxDQUFDLHFCQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xCLHNCQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN2QixzQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDeEIsc0JBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3JCLHNCQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFORCxvRUFNQztBQXFCRCx3Q0FBK0MsS0FBVTtJQUNyRCxNQUFNLENBQUMscUJBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbEIscUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLHFCQUFRLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQ3RDLG9CQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFMRCx3RUFLQztBQWVELHNDQUE2QyxLQUFVO0lBQ25ELE1BQU0sQ0FBQyxxQkFBUSxDQUFDLEtBQUssQ0FBQztRQUNsQixvQkFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDckIsb0JBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3RCLG9CQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFMRCxvRUFLQztBQUVELHVDQUE4QyxLQUFVO0lBQ3BELE1BQU0sQ0FBQyxxQkFBUSxDQUFDLEtBQUssQ0FBQztRQUNsQixvQkFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDckIsb0JBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3RCLG9CQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNuQixvQkFBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBTkQsc0VBTUM7QUEyREQsc0JBQTZCLE9BQXVCO0lBQ2hELE1BQU0sQ0FBRSxPQUF1QixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDeEQsQ0FBQztBQUZELG9DQUVDO0FBTUQscUJBQTRCLE9BQWU7SUFDdkMsTUFBTSxDQUFFLE9BQXNCLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQztBQUNwRCxDQUFDO0FBRkQsa0NBRUM7QUFFRDtJQUNJLFlBQXFCLE9BQWUsRUFBVyxFQUFNO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxPQUFFLEdBQUYsRUFBRSxDQUFJO0lBQUksQ0FBQztDQUM3RDtBQUZELHdEQUVDO0FBRUQ7SUFDSSxZQUNpQixPQUFlLEVBQ2YsRUFBTSxFQUNOLFNBQWtCO1FBRmxCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixPQUFFLEdBQUYsRUFBRSxDQUFJO1FBQ04sY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFJLENBQUM7Q0FDM0M7QUFMRCwwREFLQztBQUVEO0lBQ0ksWUFBcUIsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUN4QyxDQUFDO0NBQ0o7QUFIRCxrQ0FHQztBQUVEO0lBQ0ksWUFDYSwwQkFBa0MsRUFDbEMsa0NBQTBDLEVBQzFDLFdBQWtDO1FBRmxDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBUTtRQUNsQyx1Q0FBa0MsR0FBbEMsa0NBQWtDLENBQVE7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO0lBQUksQ0FBQztDQUN2RDtBQUxELDBDQUtDO0FBRUQ7SUFDSSxZQUNhLFNBQStDLEVBQy9DLGtCQUErQixFQUMvQixtQkFBOEQsRUFDOUQsMkJBQXFFLEVBQ3JFLFlBQXVCLEVBQ3ZCLGNBQXlCLEVBQ3pCLGtCQUE2QixFQUM3QixvQkFBK0IsRUFDL0IsZ0NBQXlDO1FBUnpDLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQy9DLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBYTtRQUMvQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJDO1FBQzlELGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBMEM7UUFDckUsaUJBQVksR0FBWixZQUFZLENBQVc7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQVc7UUFDekIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFXO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBVztRQUMvQixxQ0FBZ0MsR0FBaEMsZ0NBQWdDLENBQVM7SUFBSSxDQUFDO0NBQzlEO0FBWEQsOERBV0M7QUFJRDtJQUNJLFlBQ2EsS0FBYyxFQUNkLEtBQWMsRUFDZCxjQUErQjtRQUYvQixVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtJQUFJLENBQUM7Q0FDcEQ7QUFMRCxrREFLQztBQUVEO0lBQ0ksWUFDYSxpQkFBeUIsRUFDekIsY0FBc0IsRUFDdEIsUUFBaUIsRUFDakIsZ0JBQXlCO1FBSHpCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztJQUFJLENBQUM7Q0FDOUM7QUFORCxnQ0FNQztBQUVEO0lBQ0ksWUFBcUIsT0FBZSxFQUFXLFFBQWdCO1FBQTFDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztDQUN2RTtBQUZELGdEQUVDO0FBRUQsSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2hCLHVDQUFJO0lBQ0oseUNBQUs7QUFDVCxDQUFDLEVBSFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFHbkI7QUFFRDtJQUNJLFlBQXFCLEtBQWdCLEVBQVcsT0FBZ0I7UUFBM0MsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFBSSxDQUFDO0NBQ3hFO0FBRkQsb0NBRUM7QUFFRDtJQUNJLFlBQXFCLFNBQXFCLEVBQVcsWUFBb0I7UUFBcEQsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFXLGlCQUFZLEdBQVosWUFBWSxDQUFRO0lBQUksQ0FBQztDQUNqRjtBQUZELHNDQUVDO0FBRUQ7SUFDSSxZQUFxQixTQUFrQjtRQUFsQixjQUFTLEdBQVQsU0FBUyxDQUFTO0lBQUksQ0FBQztDQUMvQztBQUZELHNEQUVDO0FBRUQ7SUFDSSxZQUFxQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFJLENBQUM7Q0FDekM7QUFGRCw0Q0FFQztBQUVEO0lBQ0ksWUFBcUIsUUFBZ0IsRUFBVyxlQUF1QjtRQUFsRCxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVcsb0JBQWUsR0FBZixlQUFlLENBQVE7SUFBSSxDQUFDO0NBQy9FO0FBRkQsNERBRUM7QUFFRDtJQUNJLFlBQXFCLGNBQXNCO1FBQXRCLG1CQUFjLEdBQWQsY0FBYyxDQUFRO0lBQUksQ0FBQztDQUNuRDtBQUZELDhEQUVDO0FBRUQ7SUFDSSxZQUFxQixNQUFlO1FBQWYsV0FBTSxHQUFOLE1BQU0sQ0FBUztJQUFJLENBQUM7Q0FDNUM7QUFGRCx3REFFQztBQUVEO0lBQ0ksWUFBcUIsTUFBZTtRQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7SUFBSSxDQUFDO0NBQzVDO0FBRkQsNERBRUM7QUFFRDtJQUNJLFlBQXFCLEVBQU0sRUFBVyxXQUFtQjtRQUFwQyxPQUFFLEdBQUYsRUFBRSxDQUFJO1FBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0NBQ2hFO0FBRkQsOERBRUM7QUFFRDtJQUNJLFlBQXFCLEVBQU0sRUFBVyxXQUFtQixFQUFXLFNBQWtCO1FBQWpFLE9BQUUsR0FBRixFQUFFLENBQUk7UUFBVyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUFXLGNBQVMsR0FBVCxTQUFTLENBQVM7SUFBRyxDQUFDO0NBQzdGO0FBRkQsZ0VBRUM7QUFFRDtJQUNJLFlBQXFCLFdBQW1CO1FBQW5CLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUcsQ0FBQztDQUMvQztBQUZELG9EQUVDO0FBRUQ7SUFDSSxZQUFxQixXQUFtQixFQUFXLFNBQWtCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQVcsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7Q0FDNUU7QUFGRCxzREFFQztBQUVEO0lBQ0ksZ0JBQWUsQ0FBQztDQUNuQjtBQUZELGdEQUVDO0FBRUQ7SUFDSSxZQUNhLFlBQTBCLEVBQzFCLGdDQUF5QztRQUR6QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQ0FBZ0MsR0FBaEMsZ0NBQWdDLENBQVM7SUFBRyxDQUFDO0NBQzdEO0FBSkQsa0RBSUM7QUFFRDtJQUNJLGdCQUFlLENBQUM7Q0FDbkI7QUFGRCxnRUFFQztBQUVEO0lBQ0ksWUFBcUIsV0FBMEI7UUFBMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWU7SUFBRyxDQUFDO0NBQ3REO0FBRkQsa0VBRUM7QUFFRDtJQUNJLFlBQXFCLEtBQWEsRUFBVyxRQUFnQjtRQUF4QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVcsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUFHLENBQUM7Q0FDcEU7QUFGRCxvRUFFQztBQUVEO0lBQ0ksZ0JBQWUsQ0FBQztDQUNuQjtBQUZELGtDQUVDO0FBRUQ7SUFDSSxZQUNhLEVBQU0sRUFDTixrQkFBMkI7UUFEM0IsT0FBRSxHQUFGLEVBQUUsQ0FBSTtRQUNOLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUztJQUFHLENBQUM7Q0FDL0M7QUFKRCw0REFJQztBQUVEO0lBQ0ksWUFDYSxFQUFNLEVBQ04sY0FBdUIsRUFDdkIsaUJBQTBCLEVBQzFCLGFBQXNCLEVBQ3RCLGtCQUEyQjtRQUozQixPQUFFLEdBQUYsRUFBRSxDQUFJO1FBQ04sbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFTO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFTO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUztJQUFHLENBQUM7Q0FDL0M7QUFQRCw4REFPQztBQUVELElBQVkscUJBR1g7QUFIRCxXQUFZLHFCQUFxQjtJQUM3Qix1RUFBTztJQUNQLDJFQUFTO0FBQ2IsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR2hDO0FBRUQ7SUFDSSxZQUNhLE1BQWMsRUFDZCxJQUEyQjtRQUQzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBdUI7SUFBRyxDQUFDO0NBQy9DO0FBSkQsMERBSUM7QUFFRDtJQUNJLGdCQUFlLENBQUM7Q0FDbkI7QUFGRCxvREFFQztBQUVEO0lBQ0ksWUFDYSxhQUFtQyxFQUNuQyxnQ0FBeUMsRUFDekMsa0JBQTRCLEVBQzVCLG9CQUE4QjtRQUg5QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMscUNBQWdDLEdBQWhDLGdDQUFnQyxDQUFTO1FBQ3pDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBVTtRQUM1Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVU7SUFBRyxDQUFDO0NBQ2xEO0FBTkQsc0RBTUM7QUFFRCwrQkFBaUUsU0FBUSx5QkFBbUQ7SUFDeEgsWUFDUSxTQUErQyxFQUMvQyxrQkFBK0IsRUFDL0IsbUJBQThELEVBQzlELDJCQUFxRSxFQUNyRSxZQUF1QixFQUN2QixjQUF5QixFQUN6QixrQkFBNkIsRUFDN0Isb0JBQStCLEVBQy9CLGdDQUF5QyxFQUNoQyxzQkFBK0I7UUFDNUMsS0FBSyxDQUNELFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixZQUFZLEVBQ1osY0FBYyxFQUNkLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsZ0NBQWdDLENBQUM7UUFWeEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFTO0lBV2hELENBQUM7Q0FDSjtBQXZCRCw4REF1QkM7QUFHRCwrQkFBaUUsU0FBUSx5QkFBbUQ7SUFDeEgsWUFDUSxTQUErQyxFQUMvQyxrQkFBK0IsRUFDL0IsbUJBQThELEVBQzlELDJCQUFxRSxFQUNyRSxZQUF1QixFQUN2QixjQUF5QixFQUN6QixrQkFBNkIsRUFDN0Isb0JBQStCLEVBQy9CLGdDQUF5QyxFQUN6QyxzQkFBK0IsRUFDdEIsc0JBQStCO1FBQzVDLEtBQUssQ0FDRCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0IsWUFBWSxFQUNaLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGdDQUFnQyxFQUNoQyxzQkFBc0IsQ0FBQztRQVhkLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBUztJQVloRCxDQUFDO0NBQ0o7QUF6QkQsOERBeUJDO0FBR0Q7SUFDSSxZQUFxQixXQUEwQjtRQUExQixnQkFBVyxHQUFYLFdBQVcsQ0FBZTtJQUFHLENBQUM7Q0FDdEQ7QUFGRCw0REFFQztBQUVEO0lBQ0ksWUFDYSxLQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsd0JBQWlDO1FBRmpDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBUztJQUFHLENBQUM7Q0FDckQ7QUFMRCw4REFLQztBQUVELCtCQUFpRSxTQUFRLHlCQUFtRDtJQUN4SCxZQUNRLFNBQStDLEVBQy9DLGtCQUErQixFQUMvQixtQkFBOEQsRUFDOUQsMkJBQXFFLEVBQ3JFLFlBQXVCLEVBQ3ZCLGNBQXlCLEVBQ3pCLGtCQUE2QixFQUM3QixvQkFBK0IsRUFDL0IsZ0NBQXlDLEVBQ3pDLHNCQUErQixFQUMvQixzQkFBK0IsRUFDdEIsbUJBQTRCO1FBQ3pDLEtBQUssQ0FDRCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0IsWUFBWSxFQUNaLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGdDQUFnQyxFQUNoQyxzQkFBc0IsRUFDdEIsc0JBQXNCLENBQUM7UUFaZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVM7SUFhN0MsQ0FBQztDQUNKO0FBM0JELDhEQTJCQztBQUdELHlCQUFpQyxTQUFRLG1CQUFtQjtJQUN4RCxZQUNRLFlBQTBCLEVBQzFCLGdDQUF5QyxFQUNoQyxtQkFBNEI7UUFDekMsS0FBSyxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQztRQUR4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVM7SUFFekMsQ0FBQztDQUNSO0FBUEQsa0RBT0M7QUFFRCwrQkFBdUMsU0FBUSx5QkFBeUI7SUFDcEUsWUFDUSxLQUFhLEVBQ2IsUUFBZ0IsRUFDUCx1QkFBK0IsRUFDeEMsd0JBQWlDO1FBQ3JDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFGcEMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFRO0lBRzVDLENBQUM7Q0FDUjtBQVJELDhEQVFDO0FBRUQsZ0JBQXdCLFNBQVEsVUFBVTtJQUN0QyxZQUNRLGlCQUF5QixFQUN6QixjQUFzQixFQUN0QixRQUFpQixFQUNqQixnQkFBeUIsRUFDaEIsV0FBMEI7UUFDdkMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUR4RCxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtJQUV2QyxDQUFDO0NBQ1I7QUFURCxnQ0FTQztBQUVELCtCQUE0RixTQUFRLHlCQUFtRDtJQUNuSixZQUNRLFNBQStDLEVBQy9DLGtCQUErQixFQUMvQixtQkFBOEQsRUFDOUQsMkJBQXFFLEVBQ3JFLFlBQXVCLEVBQ3ZCLGNBQXlCLEVBQ3pCLGtCQUE2QixFQUM3QixvQkFBK0IsRUFDL0IsZ0NBQXlDLEVBQ3pDLHNCQUErQixFQUMvQixzQkFBK0IsRUFDL0IsbUJBQTRCLEVBQ25CLGNBQXFEO1FBQ2xFLEtBQUssQ0FDRCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0IsWUFBWSxFQUNaLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGdDQUFnQyxFQUNoQyxzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3RCLG1CQUFtQixDQUFDO1FBYlgsbUJBQWMsR0FBZCxjQUFjLENBQXVDO0lBY3RFLENBQUM7Q0FDSjtBQTdCRCw4REE2QkM7QUFHRCxnQkFBd0IsU0FBUSxVQUFVO0lBQ3RDLFlBQ1EsaUJBQXlCLEVBQ3pCLGNBQXNCLEVBQ3RCLFFBQWlCLEVBQ2pCLGdCQUF5QixFQUNoQixZQUFxQixFQUM5QixXQUEwQjtRQUM5QixLQUFLLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUZyRSxpQkFBWSxHQUFaLFlBQVksQ0FBUztJQUdsQyxDQUFDO0NBQ1I7QUFWRCxnQ0FVQztBQUVEO0lBQ0ksZ0JBQWUsQ0FBQztDQUNuQjtBQUZELHdDQUVDO0FBRUQsK0JBQTRGLFNBQVEseUJBQThFO0lBQzlLLFlBQ1EsU0FBK0MsRUFDL0MsbUJBQThELEVBQzlELDJCQUFxRSxFQUNyRSxZQUF1QixFQUN2QixjQUF5QixFQUN6QixrQkFBNkIsRUFDN0Isb0JBQStCLEVBQy9CLGdDQUF5QyxFQUN6QyxzQkFBK0IsRUFDL0Isc0JBQStCLEVBQy9CLG1CQUE0QixFQUNuQixpQkFBMEIsRUFDbkMsY0FBcUQsRUFDNUMsdUJBQStCO1FBQzVDLEtBQUssQ0FDRCxTQUFTLEVBQ1QsRUFBRSxFQUNGLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0IsWUFBWSxFQUNaLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGdDQUFnQyxFQUNoQyxzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixjQUFjLENBQUM7UUFoQk4sc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFTO1FBRTFCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBUTtJQWVoRCxDQUFDO0NBQ0o7QUEvQkQsOERBK0JDO0FBR0QseUJBQWlDLFNBQVEsbUJBQW1CO0lBQ3hELFlBQ1EsWUFBMEIsRUFDMUIsZ0NBQXlDLEVBQ3pDLG1CQUE0QixFQUNuQixZQUFxQjtRQUNsQyxLQUFLLENBQUMsWUFBWSxFQUFFLGdDQUFnQyxFQUFFLG1CQUFtQixDQUFDO1FBRDdELGlCQUFZLEdBQVosWUFBWSxDQUFTO0lBRXRDLENBQUM7Q0FDSjtBQVJELGtEQVFDO0FBRUQsb0JBQTRCLFNBQVEsY0FBYztJQUM5QyxZQUFxQixZQUFxQjtRQUN0QyxLQUFLLEVBQUUsQ0FBQztRQURTLGlCQUFZLEdBQVosWUFBWSxDQUFTO0lBRTFDLENBQUM7Q0FDSjtBQUpELHdDQUlDO0FBRUQsK0JBQTRGLFNBQVEseUJBQThFO0lBQzlLLFlBQ1EsU0FBK0MsRUFDL0MsbUJBQThELEVBQzlELDJCQUFxRSxFQUNyRSxZQUF1QixFQUN2QixjQUF5QixFQUN6QixrQkFBNkIsRUFDN0Isb0JBQStCLEVBQy9CLGdDQUF5QyxFQUN6QyxzQkFBK0IsRUFDL0Isc0JBQStCLEVBQy9CLG1CQUE0QixFQUM1QixpQkFBMEIsRUFDMUIsY0FBcUQsRUFDckQsdUJBQStCLEVBQ3RCLFlBQXFCO1FBQ2xDLEtBQUssQ0FDRCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixZQUFZLEVBQ1osY0FBYyxFQUNkLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsZ0NBQWdDLEVBQ2hDLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsdUJBQXVCLENBQUM7UUFmZixpQkFBWSxHQUFaLFlBQVksQ0FBUztJQWdCdEMsQ0FBQztDQUNKO0FBakNELDhEQWlDQztBQUdEO0lBQ0ksZ0JBQWUsQ0FBQztDQUNuQjtBQUZELHNDQUVDO0FBRUQ7SUFDSSxnQkFBZSxDQUFDO0NBQ25CO0FBRkQsZ0NBRUM7QUFFRDtJQUNJLGdCQUFlLENBQUM7Q0FDbkI7QUFGRCx3Q0FFQztBQUVELGtCQUEwQixTQUFRLFdBQVc7SUFDekMsWUFBcUIsRUFBTztRQUN4QixLQUFLLEVBQUUsQ0FBQztRQURTLE9BQUUsR0FBRixFQUFFLENBQUs7SUFFNUIsQ0FBQztDQUNKO0FBSkQsb0NBSUM7QUFHRDtJQUNJLFlBQ2lCLFlBQTBCLEVBQzFCLGdDQUF5QyxFQUN6QyxtQkFBNEIsRUFDNUIsV0FBbUI7UUFIbkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIscUNBQWdDLEdBQWhDLGdDQUFnQyxDQUFTO1FBQ3pDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUztRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtJQUNwQyxDQUFDO0NBQ0o7QUFQRCxvREFPQztBQUVELElBQVksZUFNWDtBQU5ELFdBQVksZUFBZTtJQUN2QiwyREFBTztJQUNQLDZEQUFRO0lBQ1IscUVBQVk7SUFDWixpRUFBVTtJQUNWLDJEQUFPO0FBQ1gsQ0FBQyxFQU5XLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0FBRUQsZ0NBQTZGLFNBQVEseUJBQThFO0lBQy9LLFlBQ1EsU0FBK0MsRUFDL0MsbUJBQThELEVBQzlELDJCQUFxRSxFQUNyRSxZQUF1QixFQUN2QixjQUF5QixFQUN6QixrQkFBNkIsRUFDN0Isb0JBQStCLEVBQy9CLGdDQUF5QyxFQUN6QyxzQkFBK0IsRUFDL0Isc0JBQStCLEVBQy9CLG1CQUE0QixFQUM1QixpQkFBMEIsRUFDMUIsY0FBcUQsRUFDckQsdUJBQStCLEVBQy9CLFlBQXFCLEVBQ1osaUNBQTBDLEVBQzFDLGFBQThCO1FBQzNDLEtBQUssQ0FDRCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixZQUFZLEVBQ1osY0FBYyxFQUNkLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsZ0NBQWdDLEVBQ2hDLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsdUJBQXVCLEVBQ3ZCLFlBQVksQ0FBQztRQWpCSixzQ0FBaUMsR0FBakMsaUNBQWlDLENBQVM7UUFDMUMsa0JBQWEsR0FBYixhQUFhLENBQWlCO0lBaUIvQyxDQUFDO0NBQ0o7QUFwQ0QsZ0VBb0NDO0FBR0QsZ0NBQTZGLFNBQVEsMEJBQStFO0NBQ25MO0FBREQsZ0VBQ0M7QUFHRDtJQUNJLFlBQ2EsSUFBaUIsRUFDakIsT0FBdUI7UUFEdkIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFJLENBQUM7Q0FDNUM7QUFKRCwwQkFJQztBQUVELHlCQUFnQyxPQUFnQjtJQUU1QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLDJCQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUE4QixDQUFDO1FBQ3ZELElBQUksR0FBRyxHQUFHLGFBQWE7WUFDYixTQUFTLDJCQUFXLENBQUMsbUJBQW1CLE9BQU87WUFDL0MsMEJBQTBCO1lBQzFCLFVBQVUsT0FBTyxDQUFDLEtBQUssV0FBVztZQUNsQyxVQUFVLE9BQU8sQ0FBQyxLQUFLLFdBQVc7WUFDbEMsbUJBQW1CLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDekMsR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztRQUN4QyxDQUFDO1FBQ0QsR0FBRyxJQUFJLGFBQWE7UUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyx1QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7QUFDTCxDQUFDO0FBbEJELDBDQWtCQzs7Ozs7Ozs7OztBQ2hzQkQsK0NBQWdEO0FBR2hELDhDQUEwQztBQUcxQyx1QkFBOEIsY0FBc0I7SUFDaEQsSUFBSSxPQUFPLEdBQUcsY0FBeUIsQ0FBQztJQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFHN0IsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFqQkQsc0NBaUJDO0FBRUQ7SUFDSSxZQUFxQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQztDQUM1QztBQUZELGtEQUVDOzs7Ozs7Ozs7O0FDM0JELHVDQUFnQztBQUtoQztJQUNJO1FBb0JRLGtCQUFhLEdBQUcsSUFBSSxLQUFLLEVBQXNCLENBQUM7UUFDaEQseUJBQW9CLEdBQUcsSUFBSSxLQUFLLEVBQXNCLENBQUM7SUFyQi9DLENBQUM7SUFFakIsb0JBQW9CLENBQUMsWUFBZ0M7UUFDakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELDJCQUEyQixDQUFDLFlBQWdDO1FBQ3hELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFZO1FBQ3RCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsTUFBTSxXQUFXLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUNsRCxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUlKO0FBdkJELDBDQXVCQztBQVFEO0lBQ0k7UUFVQSxpQkFBWSxHQUFHLGFBQU0sQ0FBQyxRQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFDLENBQUMsQ0FBQztRQVUvQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHNCQUFpQixHQUFHLElBQUksS0FBSyxFQUFtQixDQUFDO0lBckJ6QyxDQUFDO0lBRWpCLHlCQUF5QixDQUFDLGdCQUFpQztRQUN2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixnQkFBZ0IsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBQ0wsQ0FBQztJQUlPLGdCQUFnQjtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixHQUFHLENBQUMsQ0FBQyxNQUFNLGVBQWUsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ25ELGVBQWUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FJSjtBQXZCRCxrREF1QkM7Ozs7Ozs7Ozs7QUN4REQsdUJBQThCLElBQWlCLEVBQUUsT0FBdUI7SUFDcEUsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDNUMsQ0FBQztBQUZELHNDQUVDOzs7Ozs7Ozs7O0FDTEQsOENBQTJDO0FBRTNDLElBQVksVUFVWDtBQVZELFdBQVksVUFBVTtJQUNsQix1REFBVTtJQUNWLGlFQUFlO0lBQ2YseUVBQW1CO0lBQ25CLHlFQUFtQjtJQUNuQiwrREFBYztJQUNkLDJEQUFZO0lBQ1osdUVBQWtCO0lBQ2xCLCtEQUFjO0lBQ2QsdUVBQWtCO0FBQ3RCLENBQUMsRUFWVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQVVyQjtBQUtELElBQUssZ0JBR0o7QUFIRCxXQUFLLGdCQUFnQjtJQUNqQixxREFBMkI7SUFDM0IscURBQW1DO0FBQ3ZDLENBQUMsRUFISSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBR3BCO0FBRUQsc0JBQTZCLElBQWdCO0lBQ3pDLE1BQU0sQ0FBQyx3QkFBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUZELG9DQUVDO0FBRUQsaUJBQXdCLEtBQVU7SUFDOUIsTUFBTSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUM7QUFDbEMsQ0FBQztBQUZELDBCQUVDOzs7Ozs7Ozs7O0FDNUJELDJDQUF5RDtBQUN6RCxrREFBdUc7QUFDdkcsaUVBQStEO0FBQy9ELHVDQUFzQztBQUN0QywrREFBMkU7QUFFM0U7SUFDSSxZQUFxQixPQUFZLEVBQVcsZUFBdUI7UUFBOUMsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUFXLG9CQUFlLEdBQWYsZUFBZSxDQUFRO0lBQUksQ0FBQztDQUMzRTtBQUVELHNCQUFzQixNQUFjO0lBQ2hDLE1BQU0sV0FBVyxHQUFHLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsRUFBRSxDQUFDLENBQUMsWUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLE9BQU8sR0FBRywyQ0FBeUIsQ0FBQyxXQUFXLEVBQUUsNENBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3RSxFQUFFLENBQUMsQ0FBQyxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNELE1BQU0sZUFBZSxHQUFHLHdDQUFzQixDQUFDLFdBQVcsRUFBRSw0Q0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pGLEVBQUUsQ0FBQyxDQUFDLFlBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBR0Q7SUFDSSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25DLENBQUM7QUFFRCxjQUFjLE1BQWM7SUFDeEIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsRUFBRSxDQUFDLENBQUMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNqQyxNQUFNLFFBQVEsR0FBRyx1QkFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLHdEQUF5QixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6RyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQVk7SUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQzdDRix1Q0FBNEM7QUFFNUMsOENBQTJDO0FBQzNDLDJDQUF1RDtBQUN2RCwyQ0FBcUM7QUFDckMsc0NBQXNDO0FBQ3RDLDBDQUErQztBQUcvQyxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUM7QUFHNUIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO0FBRW5HLElBQUssaUJBR0o7QUFIRCxXQUFLLGlCQUFpQjtJQUNsQiw2REFBVTtJQUNWLHVFQUFlO0FBQ25CLENBQUMsRUFISSxpQkFBaUIsS0FBakIsaUJBQWlCLFFBR3JCO0FBRUQ7SUFhSSxZQUFtQixPQUFzQztRQVpoRCwyQkFBc0IsR0FBYSxLQUFLLENBQUM7UUFDekMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsc0JBQWlCLEdBQWEsS0FBSyxDQUFDO1FBQ3BDLG9CQUFlLEdBQWEsS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFhLEtBQUssQ0FBQztRQUNuQywrQkFBMEIsR0FBYSxLQUFLLENBQUM7UUFDN0MsZ0NBQTJCLEdBQWEsS0FBSyxDQUFDO1FBQzlDLDZCQUF3QixHQUFhLEtBQUssQ0FBQztRQUMzQyxtQkFBYyxHQUFhLEtBQUssQ0FBQztRQUNqQywrQkFBMEIsR0FBYSxLQUFLLENBQUM7UUFDN0MsMkJBQXNCLEdBQWEsS0FBSyxDQUFDO1FBRzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDSjtBQWhCRCxnREFnQkM7QUFFRDtJQUtJLFlBQW1CLE9BQXFDO1FBSi9DLFNBQUksR0FBVSxDQUFDLENBQUM7UUFDaEIsOEJBQXlCLEdBQVksS0FBSyxDQUFDO1FBQzNDLGVBQVUsR0FBYSxLQUFLLENBQUM7UUFHbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBUkQsOENBUUM7QUFFRCxJQUFZLE1BaUJYO0FBakJELFdBQVksTUFBTTtJQUNkLHdCQUFjO0lBQ2QsMEJBQWdCO0lBQ2hCLHNCQUFZO0lBQ1osd0JBQWM7SUFDZCxvQkFBVTtJQUNWLHNCQUFZO0lBQ1osd0JBQWM7SUFDZCw0QkFBa0I7SUFDbEIsd0JBQWM7SUFDZCwwQkFBZ0I7SUFDaEIsb0NBQTBCO0lBQzFCLGdEQUFzQztJQUN0Qyw4Q0FBb0M7SUFDcEMsa0RBQXdDO0lBQ3hDLDZCQUFtQjtJQUNuQiw4QkFBb0I7QUFDeEIsQ0FBQyxFQWpCVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFpQmpCO0FBRUQsTUFBTSxjQUFjLEdBQUc7SUFDbkIsU0FBUyxFQUFFLEdBQUc7SUFDZCxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDcEMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLFVBQVUsRUFBRSxLQUFLO0NBQ3BCLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHO0lBQ3RCLGNBQWMsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFlBQVk7SUFDdEQsY0FBYyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsYUFBYTtDQUMxRCxDQUFDO0FBRUYseUJBQXlCLE1BQXFCO0lBQzFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixLQUFLLE1BQU0sQ0FBQyxJQUFJO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixLQUFLLE1BQU0sQ0FBQyxLQUFLO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztBQUNMLENBQUM7QUFHRCxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBZTtJQUN4QyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztDQUFDLENBQUMsQ0FBQztBQUU3QztJQUNJLFlBQ29CLE1BQWMsRUFDZCxJQUFZLEVBQ1osSUFBaUI7UUFGakIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQUksQ0FBQztJQUUxQyxRQUFRO1FBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkQsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBakJELHdCQWlCQztBQUVELHNCQUE2QixDQUFnQixFQUFFLENBQWdCLEVBQUUsT0FBTyxHQUFHLElBQUksaUJBQWlCLEVBQUU7SUFDOUYsRUFBRSxDQUFDLENBQUMsWUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDN0IsQ0FBQztBQWxDRCxvQ0FrQ0M7QUFFRCxvQkFBMkIsTUFBYyxFQUFFLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFO0lBQ3hFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxHQUFHLHdCQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLElBQUksR0FBRyx3QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxHQUFHLHdCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBWkQsZ0NBWUM7QUFFRCxxQkFBcUIsUUFBZ0IsRUFBRSxPQUEyQjtJQUM5RCxJQUFJLE1BQU0sR0FBa0IsU0FBUyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxNQUFNLENBQUMsSUFBSTtZQUNaLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUssQ0FBQztRQUNWLEtBQUssTUFBTSxDQUFDLEtBQUs7WUFDYixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN0QixLQUFLLENBQUM7UUFDVixLQUFLLE1BQU0sQ0FBQyxJQUFJO1lBQ1osRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxLQUFLLENBQUM7UUFDVixLQUFLLE1BQU0sQ0FBQyxNQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDM0IsQ0FBQztZQUNELEtBQUssQ0FBQztRQUNWLEtBQUssTUFBTSxDQUFDLElBQUk7WUFDWixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDekIsQ0FBQztZQUNELEtBQUssQ0FBQztRQUNWLEtBQUssTUFBTSxDQUFDLEtBQUs7WUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMxQixDQUFDO1lBQ0QsS0FBSyxDQUFDO1FBQ1YsS0FBSyxNQUFNLENBQUMsZ0JBQWdCO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDckMsQ0FBQztZQUNELEtBQUssQ0FBQztRQUNWLEtBQUssTUFBTSxDQUFDLGlCQUFpQjtZQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ3RDLENBQUM7WUFDRCxLQUFLLENBQUM7UUFDVixLQUFLLE1BQU0sQ0FBQyxjQUFjO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ25DLENBQUM7WUFDRCxLQUFLLENBQUM7UUFDVixLQUFLLE1BQU0sQ0FBQyxZQUFZO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDN0IsS0FBSyxDQUFDO1lBQ1YsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsS0FBSyxNQUFNLENBQUMsYUFBYTtZQUNyQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0JBQzlCLEtBQUssQ0FBQztZQUNWLENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCO1lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDaEMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDbkMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQ3BDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDakMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6QixPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7QUFDTCxDQUFDO0FBRUQsaUJBQWlCLEtBQWE7SUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxtQkFBbUIsS0FBYSxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3RELE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsbUJBQW1CLFVBQWtCLEVBQUUsTUFBYztJQUNqRCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDbEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNqQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELHFCQUE0QixTQUFvQixFQUFFLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFO0lBQ2hGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0FBQ0wsQ0FBQztBQU5ELGtDQU1DO0FBRUQsNEJBQTRCLEdBQVEsRUFBRSxPQUEyQjtJQUM3RCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7QUFDTCxDQUFDO0FBRUQsNkJBQTZCLElBQVksRUFBRSxPQUEyQjtJQUNsRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzdDLENBQUM7UUFFRCxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBSUQsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hILGNBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sR0FBRyxHQUFHLG9CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsdUJBQThCLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixFQUFFO0lBQzNELE1BQU0sQ0FBQyxJQUFJLGtCQUFPLENBQ2QsQ0FBQyxNQUFlLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFDaEQsQ0FBQyxDQUFVLEVBQUUsQ0FBVSxLQUFLLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUpELHNDQUlDO0FBRUQsd0JBQStCLFFBQWtCLEVBQ2xCLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixFQUFFLEVBQ3BDLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFO0lBQzdELE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQVhELHdDQVdDO0FBRUQsd0JBQXdCLE1BQWU7SUFDbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUMzQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDakMsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztBQUN4RSxDQUFDO0FBRUQ7SUFBQTtRQWtCWSxZQUFPLEdBQWlCLElBQUkscUJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RCxvQkFBZSxHQUFpQixJQUFJLHFCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQW5CRyxHQUFHLENBQUMsTUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBZTtRQUNuQixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQWU7UUFDZixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekUsQ0FBQztDQUlKO0FBcEJELHNDQW9CQztBQUVELDRCQUFtQyxRQUFtQixFQUFFLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFO0lBQ3RGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixTQUFHLENBQUMsdUJBQXVCLFFBQVEsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixTQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBdEJELGdEQXNCQztBQUVEO0lBQUE7UUFxQlksWUFBTyxHQUFxQixJQUFJLGlCQUFPLENBQVMsY0FBYyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQXJCRyxHQUFHLENBQUMsTUFBZSxFQUFFLE1BQWU7UUFDaEMsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHLENBQUMsTUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRTlCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUdKO0FBdEJELGtEQXNCQztBQUVELGtDQUF5QyxRQUEwQixFQUFFLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFO0lBQ25HLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixTQUFHLENBQUMsOEJBQThCLFFBQVEsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7SUFDMUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUM5QixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsU0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWxCRCw0REFrQkM7QUFFRDtJQUNJO1FBNEJRLFlBQU8sR0FBRyxJQUFJLGlCQUFPLENBQVMsY0FBYyxDQUFDLENBQUM7SUE1QnZDLENBQUM7SUFFaEIsZUFBZSxDQUFDLFFBQW1CLEVBQUUsS0FBYyxFQUFFLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFO1FBQ25GLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBYSxFQUFFLEtBQWMsRUFBRSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsRUFBRTtRQUN6RSxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLFlBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQWUsRUFBRSxLQUFjO1FBQy9CLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQWU7UUFDakIsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBR0o7QUE5QkQsc0NBOEJDOzs7Ozs7Ozs7O0FDcGZEO0lBQ0ksTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUZELHNEQUVDOzs7Ozs7OztBQ0xEO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNGQTtBQUNBLGVBQWUsTUFBTSxNQUFNOztBQUUzQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxPQUFPO0FBQ2YsSUFBSSxPQUFPOztBQUVYLElBQUksT0FBTzs7QUFFWCxJQUFJLE9BQU87O0FBRVgsSUFBSSxRQUFRO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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QXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDemtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7O0FBSUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQzlIQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7OztBQ3hMRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtB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RyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNKO0FBTkQsc0JBTUM7Ozs7Ozs7Ozs7QUNURCxJQUFZLGVBTVg7QUFORCxXQUFZLGVBQWU7SUFDdkIsaUVBQVU7SUFDVixtRUFBVztJQUNYLCtEQUFTO0lBQ1QsdUVBQWE7SUFDYixxRUFBWTtBQUNoQixDQUFDLEVBTlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFNMUI7QUFFRDtJQUNJLFlBQXFCLFFBQXlCLEVBQVcsUUFBeUI7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFBVyxhQUFRLEdBQVIsUUFBUSxDQUFpQjtJQUFHLENBQUM7Q0FDekY7QUFGRCxrRUFFQzs7Ozs7Ozs7OztBQ1BELHFCQUErQixPQUFtQjtJQUM5QyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUNsQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFKRCxrQ0FJQztBQUtELDBCQUFvQyxPQUF3QjtJQUN4RCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBSkQsNENBSUM7Ozs7Ozs7Ozs7QUNmRCwyQ0FBK0M7QUFFL0MsMEJBQWlDLFFBQWtCLEVBQUUsR0FBUTtJQUN6RCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyx1QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCw0Q0FFQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRjMWFiMDJhNWY3NTc1YjM1ZDE0IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBtdXJtdXJIYXNoIH0gZnJvbSBcIi4vbXVybXVyLWhhc2hcIjtcclxuaW1wb3J0IHsgSGFzaFNldCwgSGFzaE1hcCB9IGZyb20gXCIuL2hhc2gtbWFwXCI7XHJcbmltcG9ydCB7IFVSTCwgVVJMVG9TdHJpbmcgfSBmcm9tIFwiLi91cmwtdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0cmluZ0NvbXBhcmVPcHRpb25zIHtcclxuICAgIENhc2VTZW5zaXRpdmUsXHJcbiAgICBMb3dlckNhc2UsXHJcbiAgICBMb2NhbGVMb3dlckNhc2VcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVTdHJpbmdzKGE6IHN0cmluZywgYjogc3RyaW5nLCBvcHRpb25zID0gU3RyaW5nQ29tcGFyZU9wdGlvbnMuQ2FzZVNlbnNpdGl2ZSk6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoIChvcHRpb25zKSB7XHJcbiAgICAgICAgY2FzZSBTdHJpbmdDb21wYXJlT3B0aW9ucy5DYXNlU2Vuc2l0aXZlOlxyXG4gICAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcclxuICAgICAgICBjYXNlIFN0cmluZ0NvbXBhcmVPcHRpb25zLkxvd2VyQ2FzZTpcclxuICAgICAgICAgICAgcmV0dXJuIGEudG9Mb3dlckNhc2UoKSA9PT0gYi50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGNhc2UgU3RyaW5nQ29tcGFyZU9wdGlvbnMuTG9jYWxlTG93ZXJDYXNlOlxyXG4gICAgICAgICAgICByZXR1cm4gYS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSBiLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmdDb21wYXJlJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNoU3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGxldCBoYXNoID0gMDtcclxuICAgIGhhc2ggPSBtdXJtdXJIYXNoKHZhbHVlLCBoYXNoKTtcclxuICAgIHJldHVybiBoYXNoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0cmluZ0hhc2hTZXQoKTogSGFzaFNldDxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgSGFzaFNldDxzdHJpbmc+KGhhc2hTdHJpbmcsIGNvbXBhcmVTdHJpbmdzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTdHJpbmdIYXNoTWFwPFQ+KCk6IEhhc2hNYXA8c3RyaW5nLCBUPiB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hNYXA8c3RyaW5nLCBUPihoYXNoU3RyaW5nLCBjb21wYXJlU3RyaW5ncyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmUodmFsdWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGAke3ZhbHVlfVxcbmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1cnJvdW5kKHZhbHVlOiBzdHJpbmcsIHR5cGVOYW1lOiBzdHJpbmcsIG9wZW5UYWc6IHN0cmluZywgY2xvc2VUYWc6IHN0cmluZywgaW5kZW50TGV2ZWw6IG51bWJlcikge1xyXG4gICAgY29uc3QgaW5kZW50OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nID0gbWFrZUluZGVudChpbmRlbnRMZXZlbCAtIDEpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2xpbmUoYCR7dHlwZU5hbWV9JHtvcGVuVGFnfWApfSR7dmFsdWV9JHtpbmRlbnQoY2xvc2VUYWcpfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIERvbid0IGJvdGhlciBhZGRpbmcgbGluZWJyZWFrcyBpZiB0aGVyZSdzIG5vdGhpbmcgdG8gc3Vycm91bmQuXHJcbiAgICAgICAgcmV0dXJuIGAke3R5cGVOYW1lfSR7b3BlblRhZ30ke2Nsb3NlVGFnfWBcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUtleVZhbHVlUHJpbnRlcih0b1N0cmluZzogKHZhbHVlOiBhbnkpID0+IHN0cmluZywgaW5kZW50OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nKTogKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChrZXk6IGFueSwgdmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBsaW5lKGluZGVudChgJHt0b1N0cmluZyhrZXkpfTogJHt0b1N0cmluZyh2YWx1ZSl9LGApKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcFRvU3RyaW5nPEssIFY+KG1hcDogTWFwPEssIFY+LCBzZWVuT2JqZWN0czogU2V0PGFueT4sIGluZGVudExldmVsOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaW5kZW50OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nID0gbWFrZUluZGVudChpbmRlbnRMZXZlbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nUmVjdXJzaXZlKHZhbHVlLCBzZWVuT2JqZWN0cywgaW5kZW50TGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByaW50S2V5VmFsdWUgPSBtYWtlS2V5VmFsdWVQcmludGVyKHRvU3RyaW5nLCBpbmRlbnQpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgbWFwLmZvckVhY2goKHZhbHVlOiBWLCBrZXk6IEspID0+IHtcclxuICAgICAgICByZXN1bHQgKz0gcHJpbnRLZXlWYWx1ZShrZXksIHZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzdXJyb3VuZChyZXN1bHQsIFwiTWFwXCIsIFwie1wiLCBcIn1cIiwgaW5kZW50TGV2ZWwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlVmFsdWVQcmludGVyKHRvU3RyaW5nOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nLCBpbmRlbnQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcpOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nIHtcclxuICAgIHJldHVybiAodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBsaW5lKGluZGVudChgJHt0b1N0cmluZyh2YWx1ZSl9LGApKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFRvU3RyaW5nPEs+KHNldDogU2V0PEs+LCBzZWVuT2JqZWN0czogU2V0PGFueT4sIGluZGVudExldmVsOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaW5kZW50OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nID0gbWFrZUluZGVudChpbmRlbnRMZXZlbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nUmVjdXJzaXZlKHZhbHVlLCBzZWVuT2JqZWN0cywgaW5kZW50TGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByaW50VmFsdWUgPSBtYWtlVmFsdWVQcmludGVyKHRvU3RyaW5nLCBpbmRlbnQpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgc2V0LmZvckVhY2goKGtleTogSykgPT4ge1xyXG4gICAgICAgIHJlc3VsdCArPSBwcmludFZhbHVlKGtleSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdXJyb3VuZChyZXN1bHQsIFwiU2V0XCIsIFwie1wiLCBcIn1cIiwgaW5kZW50TGV2ZWwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcnJheVRvU3RyaW5nPFQ+KGFycmF5OiBUW10sIHNlZW5PYmplY3RzOiBTZXQ8YW55PiwgaW5kZW50TGV2ZWw6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBpbmRlbnQ6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcgPSBtYWtlSW5kZW50KGluZGVudExldmVsKTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdG9TdHJpbmdSZWN1cnNpdmUodmFsdWUsIHNlZW5PYmplY3RzLCBpbmRlbnRMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJpbnRWYWx1ZSA9IG1ha2VWYWx1ZVByaW50ZXIodG9TdHJpbmcsIGluZGVudCk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICBhcnJheS5mb3JFYWNoKCh2YWx1ZTogVCkgPT4ge1xyXG4gICAgICAgIHJlc3VsdCArPSBwcmludFZhbHVlKHZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1cnJvdW5kKHJlc3VsdCwgXCJBcnJheVwiLCBcIltcIiwgXCJdXCIsIGluZGVudExldmVsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWU6IGFueSwgc2Vlbk9iamVjdHM6IFNldDxhbnk+LCBpbmRlbnRMZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGluZGVudDogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyA9IG1ha2VJbmRlbnQoaW5kZW50TGV2ZWwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZ1JlY3Vyc2l2ZSh2YWx1ZSwgc2Vlbk9iamVjdHMsIGluZGVudExldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmludEtleVZhbHVlID0gbWFrZUtleVZhbHVlUHJpbnRlcih0b1N0cmluZywgaW5kZW50KTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKSkge1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdmFsdWVbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICBpZiAoIWlzRnVuY3Rpb24ocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBwcmludEtleVZhbHVlKHByb3BlcnR5TmFtZSwgcHJvcGVydHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdXJyb3VuZChyZXN1bHQsIHR5cGVOYW1lKHZhbHVlKSwgXCJ7XCIsIFwifVwiLCBpbmRlbnRMZXZlbCk7XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRUb1N0cmluZ0Z1bmN0aW9uOiBGdW5jdGlvbiA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBlbXB0eU9iamVjdCA9IHt9O1xyXG4gICAgcmV0dXJuIGVtcHR5T2JqZWN0LnRvU3RyaW5nO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGRlZmF1bHRUb1N0cmluZ0Z1bmN0aW9uLmNhbGwodmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYXNDdXN0b21Ub1N0cmluZyh2YWx1ZTogYW55KSB7XHJcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcgIT09IGRlZmF1bHRUb1N0cmluZ0Z1bmN0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlOiBhbnkpIHtcclxuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlSW5kZW50YXRpb24oaW5kZW50TGV2ZWw6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBpZiAoaW5kZW50TGV2ZWwgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFiID0gXCJcXHRcIjtcclxuICAgIGxldCBpbmRlbnRhdGlvbiA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBsZXZlbCA9IDA7IGxldmVsIDwgaW5kZW50TGV2ZWw7IGxldmVsICs9IDEpIHtcclxuICAgICAgICBpbmRlbnRhdGlvbiArPSB0YWI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZW50YXRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VJbmRlbnQoaW5kZW50TGV2ZWw6IG51bWJlcik6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcge1xyXG4gICAgY29uc3QgaW5kZW50YXRpb24gPSBtYWtlSW5kZW50YXRpb24oaW5kZW50TGV2ZWwpO1xyXG4gICAgcmV0dXJuICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke2luZGVudGF0aW9ufSR7dmFsdWV9YDtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHR5cGVPZih2YWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvcjtcclxufVxyXG5cclxuZnVuY3Rpb24gdHlwZU5hbWUodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdHlwZU9mKHZhbHVlKS5uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b1N0cmluZ1JlY3Vyc2l2ZSh2YWx1ZTogYW55LCBzZWVuT2JqZWN0czogU2V0PGFueT4sIGluZGVudExldmVsOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgZnVuY3Rpb24gZGlkU2VlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gc2Vlbk9iamVjdHMuaGFzKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWVPYmplY3QodmFsdWU6IGFueSk6IFNldDxhbnk+IHtcclxuICAgICAgICBzZWVuT2JqZWN0cy5hZGQodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBzZWVuT2JqZWN0cztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXh0SW5kZW50TGV2ZWwgPSBpbmRlbnRMZXZlbCArIDE7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gXCJudWxsXCI7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHJldHVybiBhcnJheVRvU3RyaW5nKHZhbHVlLCBzZWVPYmplY3QodmFsdWUpLCBuZXh0SW5kZW50TGV2ZWwpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xyXG4gICAgICAgIHJldHVybiBtYXBUb1N0cmluZyh2YWx1ZSwgc2VlT2JqZWN0KHZhbHVlKSwgbmV4dEluZGVudExldmVsKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBTZXQpIHtcclxuICAgICAgICByZXR1cm4gc2V0VG9TdHJpbmcodmFsdWUsIHNlZU9iamVjdCh2YWx1ZSksIG5leHRJbmRlbnRMZXZlbCk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgVVJMKSB7XHJcbiAgICAgICAgcmV0dXJuIFVSTFRvU3RyaW5nKHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gdHlwZU5hbWUodmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmIChkaWRTZWUodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVOYW1lKHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAoaGFzQ3VzdG9tVG9TdHJpbmcodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBvYmplY3RUb1N0cmluZyh2YWx1ZSwgc2VlT2JqZWN0KHZhbHVlKSwgbmV4dEluZGVudExldmVsKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlOiBhbnksIGluaXRpYWxJbmRlbnRMZXZlbCA9IDApIHtcclxuICAgIGNvbnN0IHNlZW5PYmplY3RzID0gbmV3IFNldDxhbnk+KCk7XHJcbiAgICBjb25zdCBpbmRlbnRMZXZlbCA9IGluaXRpYWxJbmRlbnRMZXZlbDtcclxuICAgIHJldHVybiB0b1N0cmluZ1JlY3Vyc2l2ZSh2YWx1ZSwgc2Vlbk9iamVjdHMsIGluZGVudExldmVsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVUb1N0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5U3RyaW5nKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDA7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9zdHJpbmctdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmV4cG9ydCB0eXBlIE5vbmUgPSB1bmRlZmluZWQ7XHJcbmV4cG9ydCB0eXBlIFNvbWU8VD4gPSBUO1xyXG5leHBvcnQgdHlwZSBNYXliZTxUPiA9IFNvbWU8VD4gfCBOb25lO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNvbWU8VD4odmFsdWU6IE1heWJlPFQ+KTogdmFsdWUgaXMgVCB7XHJcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vbmU8VD4odmFsdWU6IE1heWJlPFQ+KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplTWF5YmU8VD4odmFsdWU6IE1heWJlPFQ+KTogVHxudWxsIHtcclxuICAgIGlmIChzb21lKHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZU1heWJlPFQ+KHZhbHVlOiBUfG51bGwpOiBNYXliZTxUPiB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsPFQ+KGE6IFQsIGI6IFQpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBhID09PSBiO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBNYXliZUNvbXBhcmVPcHRpb25zIHtcclxuICAgIG5vbmUgPSAweDAsXHJcbiAgICBjb21wYXJlVW5kZWZpbmVkID0gMHgxLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF5YmVDb21wYXJlPFQ+KGE6IE1heWJlPFQ+LCBiOiBNYXliZTxUPiwgY29tcGFyZTogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4gPSBpc0VxdWFsLCBvcHRpb25zOiBNYXliZUNvbXBhcmVPcHRpb25zID0gTWF5YmVDb21wYXJlT3B0aW9ucy5ub25lKSB7XHJcbiAgICBpZiAoc29tZShhKSAmJiBzb21lKGIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmUoYSwgYik7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucyAmIE1heWJlQ29tcGFyZU9wdGlvbnMuY29tcGFyZVVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBub25lKGEpICYmIG5vbmUoYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tYXliZS50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTm9uZSwgU29tZSwgTWF5YmUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5pbXBvcnQgeyBjb21wYXJlU3RyaW5ncywgU3RyaW5nQ29tcGFyZU9wdGlvbnMgfSBmcm9tIFwiLi9zdHJpbmctdXRpbHNcIjtcclxuaW1wb3J0IHsgVXJsIGFzIFVSTCB9IGZyb20gXCIuL3VybFwiO1xyXG5pbXBvcnQgeyBIYXNoIH0gZnJvbSBcIi4vaGFzaFwiO1xyXG5pbXBvcnQgeyBtdXJtdXJIYXNoIH0gZnJvbSBcIi4vbXVybXVyLWhhc2hcIjtcclxuaW1wb3J0IHsgSGFzaE1hcCwgSGFzaFNldCB9IGZyb20gXCIuL2hhc2gtbWFwXCI7XHJcbmltcG9ydCB7IFNjaGVtZSB9IGZyb20gXCIuL29yaWdpblwiO1xyXG5cclxuZXhwb3J0IHsgVVJMIH07XHJcbmV4cG9ydCB0eXBlIFVSTE9yU3BlYyA9IFVSTCB8IHN0cmluZztcclxuXHJcbmV4cG9ydCBlbnVtIFVybENvbXBhcmVPcHRpb25zIHtcclxuICAgIERlZmF1bHQsXHJcbiAgICBJZ25vcmVTZWFyY2hQYXJhbXNcclxufVxyXG5cclxuZW51bSBVcmxDb21wb25lbnQge1xyXG4gICAgUHJvdG9jb2wgPSAxIDw8IDAsXHJcbiAgICBVc2VybmFtZSA9IDEgPDwgMSxcclxuICAgIFBhc3N3b3JkID0gMSA8PCAyLFxyXG4gICAgSG9zdCA9IDEgPDwgMyxcclxuICAgIFBvcnQgPSAxIDw8IDQsXHJcbiAgICBQYXRobmFtZSA9IDEgPDwgNSxcclxuICAgIFNlYXJjaCA9IDEgPDwgNixcclxuICAgIEFsbCA9ICgxIDw8IDcpIC0gMVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlVXJsQ29tcG9uZW50cyhhOiBVUkwsIGI6IFVSTCwgY29tcG9uZW50czogVXJsQ29tcG9uZW50KTogYm9vbGVhbiB7XHJcbiAgICBmdW5jdGlvbiBjb21wYXJlKGNvbXBvbmVudDogVXJsQ29tcG9uZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChjb21wb25lbnRzICYgY29tcG9uZW50KSAhPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuUHJvdG9jb2wpICYmIGEucHJvdG9jb2wgIT09IGIucHJvdG9jb2wpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuVXNlcm5hbWUpICYmIGEudXNlcm5hbWUgIT09IGIudXNlcm5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuUGFzc3dvcmQpICYmIGEucGFzc3dvcmQgIT09IGIucGFzc3dvcmQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuSG9zdCkgJiYgYS5ob3N0ICE9PSBiLmhvc3QpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuUG9ydCkgJiYgYS5wb3J0ICE9PSBiLnBvcnQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuUGF0aG5hbWUpICYmIGEucGF0aG5hbWUgIT09IGIucGF0aG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuU2VhcmNoKSAmJiBhLnNlYXJjaCAhPT0gYi5zZWFyY2gpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudHM6IFVybENvbXBvbmVudCwgY29tcG9uZW50OiBVcmxDb21wb25lbnQpOiBVcmxDb21wb25lbnQge1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudHMgJiAofmNvbXBvbmVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVVcmwoYTogVVJMLCBiOiBVUkwsIG9wdGlvbnMgPSBVcmxDb21wYXJlT3B0aW9ucy5EZWZhdWx0KTogYm9vbGVhbiB7XHJcbiAgICBzd2l0Y2ggKG9wdGlvbnMpIHtcclxuICAgICAgICBjYXNlIFVybENvbXBhcmVPcHRpb25zLkRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlVXJsQ29tcG9uZW50cyhhLCBiLCBVcmxDb21wb25lbnQuQWxsKTtcclxuICAgICAgICBjYXNlIFVybENvbXBhcmVPcHRpb25zLklnbm9yZVNlYXJjaFBhcmFtczpcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVVcmxDb21wb25lbnRzKGEsIGIsIHJlbW92ZUNvbXBvbmVudChVcmxDb21wb25lbnQuQWxsLCBVcmxDb21wb25lbnQuU2VhcmNoKSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpc1NhbWVVcmw6IGludmFsaWQgb3B0aW9uczogJHtvcHRpb25zfWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNVUkwodmFsdWU6IGFueSk6IHZhbHVlIGlzIFVSTCB7XHJcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBVUkw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVybChzcGVjOiBzdHJpbmcpOiBNYXliZTxVUkw+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVUkwoc3BlYyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1heWJlUGFyc2VVcmwoc3BlYzogc3RyaW5nKTogVVJMT3JTcGVjIHtcclxuICAgIGNvbnN0IHVybCA9IHBhcnNlVXJsKHNwZWMpO1xyXG4gICAgaWYgKHVybCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVSTElmTmVjZXNzYXJ5KHVybE9yU3BlYzogVVJMT3JTcGVjKTogTWF5YmU8VVJMPiB7XHJcbiAgICBpZiAoaXNVUkwodXJsT3JTcGVjKSkge1xyXG4gICAgICAgIHJldHVybiB1cmxPclNwZWM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXJzZVVybCh1cmxPclNwZWMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lVXJsT3JTcGVjKGE6IFVSTE9yU3BlYywgYjogVVJMT3JTcGVjLCBvcHRpb25zID0gVXJsQ29tcGFyZU9wdGlvbnMuRGVmYXVsdCk6IE1heWJlPGJvb2xlYW4+IHtcclxuICAgIGlmICgoYSBpbnN0YW5jZW9mIFVSTCkgJiYgKGIgaW5zdGFuY2VvZiBVUkwpKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzU2FtZVVybChhLCBiKTtcclxuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBhID09PSBcInN0cmluZ1wiKSAmJiAodHlwZW9mIGIgPT09IFwic3RyaW5nXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpbGVVcmwodXJsOiBVUkwpIHtcclxuICAgIHJldHVybiBjb21wYXJlU3RyaW5ncyh1cmwucHJvdG9jb2wsIFNjaGVtZS5GSUxFKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRXh0ZW5zaW9uVXJsKHVybDogVVJMKSB7XHJcbiAgICBjb25zdCBleHRlbnNpb25TY2hlbWVzID0gW1xyXG4gICAgICAgIFNjaGVtZS5DSFJPTUVfRVhURU5TSU9OLFxyXG4gICAgICAgIFNjaGVtZS5GSVJFRk9YX0VYVEVOU0lPTixcclxuICAgICAgICBTY2hlbWUuRURHRV9FWFRFTlNJT05cclxuICAgIF07XHJcbiAgICByZXR1cm4gZXh0ZW5zaW9uU2NoZW1lcy5zb21lKChleHRlbnNpb25TY2hlbWUpID0+IGNvbXBhcmVTdHJpbmdzKHVybC5wcm90b2NvbCwgZXh0ZW5zaW9uU2NoZW1lKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Jyb3dzZXJVcmwodXJsOiBVUkwpIHtcclxuICAgIHJldHVybiBjb21wYXJlU3RyaW5ncyh1cmwucHJvdG9jb2wsIFNjaGVtZS5DSFJPTUUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVVJMVG9TdHJpbmcodXJsOiBNYXliZTxVUkxPclNwZWM+KTogc3RyaW5nIHtcclxuICAgIGlmICh1cmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHVybCBpbnN0YW5jZW9mIFVSTCkge1xyXG4gICAgICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhZmVFbmNvZGVVUkkodXJpOiBNYXliZTxzdHJpbmc+KTogc3RyaW5nIHtcclxuICAgIGlmICh1cmkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVuY29kZVVSSSh1cmkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2FmZUVuY29kZVVSSUNvbXBvbmVudChjb21wb25lbnQ6IE1heWJlPHN0cmluZz4pOiBzdHJpbmcge1xyXG4gICAgaWYgKGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc2hVcmxDb21wb25lbnRzKHVybDogVVJMLCBjb21wb25lbnRzOiBVcmxDb21wb25lbnQsIHNlZWQ6IEhhc2gpOiBIYXNoIHtcclxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoY29tcG9uZW50OiBVcmxDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGNvbXBvbmVudHMgJiBjb21wb25lbnQpICE9PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoYXNoID0gc2VlZDtcclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Qcm90b2NvbCkpIHtcclxuICAgICAgICBoYXNoID0gbXVybXVySGFzaCh1cmwucHJvdG9jb2wsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXBhcmUoVXJsQ29tcG9uZW50LlVzZXJuYW1lKSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKHVybC51c2VybmFtZSwgaGFzaCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29tcGFyZShVcmxDb21wb25lbnQuUGFzc3dvcmQpKSB7XHJcbiAgICAgICAgaGFzaCA9IG11cm11ckhhc2godXJsLnBhc3N3b3JkLCBoYXNoKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Ib3N0KSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKHVybC5ob3N0LCBoYXNoKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5Qb3J0KSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKHVybC5wb3J0LCBoYXNoKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wYXJlKFVybENvbXBvbmVudC5QYXRobmFtZSkpIHtcclxuICAgICAgICBoYXNoID0gbXVybXVySGFzaCh1cmwucGF0aG5hbWUsIGhhc2gpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXBhcmUoVXJsQ29tcG9uZW50LlNlYXJjaCkpIHtcclxuICAgICAgICBoYXNoID0gbXVybXVySGFzaCh1cmwuc2VhcmNoLCBoYXNoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzaFVybCh1cmw6IFVSTCwgb3B0aW9uczogVXJsQ29tcGFyZU9wdGlvbnMgPSBVcmxDb21wYXJlT3B0aW9ucy5EZWZhdWx0LCBzZWVkOiBIYXNoID0gMCk6IEhhc2gge1xyXG4gICAgc3dpdGNoIChvcHRpb25zKSB7XHJcbiAgICAgICAgY2FzZSBVcmxDb21wYXJlT3B0aW9ucy5EZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gaGFzaFVybENvbXBvbmVudHModXJsLCBVcmxDb21wb25lbnQuQWxsLCBzZWVkKTtcclxuICAgICAgICBjYXNlIFVybENvbXBhcmVPcHRpb25zLklnbm9yZVNlYXJjaFBhcmFtczpcclxuICAgICAgICAgICAgcmV0dXJuIGhhc2hVcmxDb21wb25lbnRzKHVybCwgcmVtb3ZlQ29tcG9uZW50KFVybENvbXBvbmVudC5BbGwsIFVybENvbXBvbmVudC5TZWFyY2gpLCBzZWVkKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGhhc2hVcmw6IGludmFsaWQgb3B0aW9uczogJHtvcHRpb25zfWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVVybEhhc2hNYXA8VD4ob3B0aW9uczogVXJsQ29tcGFyZU9wdGlvbnMgPSBVcmxDb21wYXJlT3B0aW9ucy5EZWZhdWx0KSA6IEhhc2hNYXA8VVJMLCBUPiB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hNYXA8VVJMLCBUPigodXJsKSA9PiBoYXNoVXJsKHVybCwgb3B0aW9ucyksIChhLCBiKSA9PiBpc1NhbWVVcmwoYSwgYiwgb3B0aW9ucykpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVVybEhhc2hTZXQob3B0aW9uczogVXJsQ29tcGFyZU9wdGlvbnMgPSBVcmxDb21wYXJlT3B0aW9ucy5EZWZhdWx0KSA6IEhhc2hTZXQ8VVJMPiB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hTZXQ8VVJMPigodXJsKSA9PiBoYXNoVXJsKHVybCwgb3B0aW9ucyksIChhLCBiKSA9PiBpc1NhbWVVcmwoYSwgYiwgb3B0aW9ucykpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi91cmwtdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gYSBkdXBsZXggc3RyZWFtIGlzIGp1c3QgYSBzdHJlYW0gdGhhdCBpcyBib3RoIHJlYWRhYmxlIGFuZCB3cml0YWJsZS5cbi8vIFNpbmNlIEpTIGRvZXNuJ3QgaGF2ZSBtdWx0aXBsZSBwcm90b3R5cGFsIGluaGVyaXRhbmNlLCB0aGlzIGNsYXNzXG4vLyBwcm90b3R5cGFsbHkgaW5oZXJpdHMgZnJvbSBSZWFkYWJsZSwgYW5kIHRoZW4gcGFyYXNpdGljYWxseSBmcm9tXG4vLyBXcml0YWJsZS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcHJvY2Vzc05leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgfXJldHVybiBrZXlzO1xufTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IER1cGxleDtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgUmVhZGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fcmVhZGFibGUnKTtcbnZhciBXcml0YWJsZSA9IHJlcXVpcmUoJy4vX3N0cmVhbV93cml0YWJsZScpO1xuXG51dGlsLmluaGVyaXRzKER1cGxleCwgUmVhZGFibGUpO1xuXG52YXIga2V5cyA9IG9iamVjdEtleXMoV3JpdGFibGUucHJvdG90eXBlKTtcbmZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICB2YXIgbWV0aG9kID0ga2V5c1t2XTtcbiAgaWYgKCFEdXBsZXgucHJvdG90eXBlW21ldGhvZF0pIER1cGxleC5wcm90b3R5cGVbbWV0aG9kXSA9IFdyaXRhYmxlLnByb3RvdHlwZVttZXRob2RdO1xufVxuXG5mdW5jdGlvbiBEdXBsZXgob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG5cbiAgUmVhZGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgV3JpdGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlYWRhYmxlID09PSBmYWxzZSkgdGhpcy5yZWFkYWJsZSA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMud3JpdGFibGUgPT09IGZhbHNlKSB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgdGhpcy5hbGxvd0hhbGZPcGVuID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd0hhbGZPcGVuID09PSBmYWxzZSkgdGhpcy5hbGxvd0hhbGZPcGVuID0gZmFsc2U7XG5cbiAgdGhpcy5vbmNlKCdlbmQnLCBvbmVuZCk7XG59XG5cbi8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcbmZ1bmN0aW9uIG9uZW5kKCkge1xuICAvLyBpZiB3ZSBhbGxvdyBoYWxmLW9wZW4gc3RhdGUsIG9yIGlmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLFxuICAvLyB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5hbGxvd0hhbGZPcGVuIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQpIHJldHVybjtcblxuICAvLyBubyBtb3JlIGRhdGEgY2FuIGJlIHdyaXR0ZW4uXG4gIC8vIEJ1dCBhbGxvdyBtb3JlIHdyaXRlcyB0byBoYXBwZW4gaW4gdGhpcyB0aWNrLlxuICBwcm9jZXNzTmV4dFRpY2sob25FbmROVCwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIG9uRW5kTlQoc2VsZikge1xuICBzZWxmLmVuZCgpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIHdlIGlnbm9yZSB0aGUgdmFsdWUgaWYgdGhlIHN0cmVhbVxuICAgIC8vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gIH1cbn0pO1xuXG5EdXBsZXgucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdGhpcy5wdXNoKG51bGwpO1xuICB0aGlzLmVuZCgpO1xuXG4gIHByb2Nlc3NOZXh0VGljayhjYiwgZXJyKTtcbn07XG5cbmZ1bmN0aW9uIGZvckVhY2goeHMsIGYpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmKHhzW2ldLCBpKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fZHVwbGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBpc0luUmFuZ2UgfSBmcm9tIFwiLi9udW1iZXItdXRpbHNcIjtcclxuaW1wb3J0IHsgaGFzIH0gZnJvbSBcIi4vYXJyYXktdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuICAgIGhhbmRzaGFrZVYxLFxyXG4gICAgbGF1bmNoQnJvd3NlclJlcXVlc3RWMSxcclxuICAgIGxhdW5jaEJyb3dzZXJSZXNwb25zZVYxLFxyXG4gICAgcGFnZUV2ZW50VjEsXHJcbiAgICBjb25maWdSZXF1ZXN0VjEsXHJcbiAgICBjb25maWdDaGFuZ2VkVjEsXHJcbiAgICB0cnVzdFVybFYxLFxyXG4gICAgZG93bmxvYWRDb21wbGV0ZVYxLFxyXG4gICAgbG9nTWVzc2FnZVYxLFxyXG4gICAgYWRkVXNlclRydXN0ZWRPcmlnaW5WMSxcclxuICAgIGFkZFVzZXJVbnRydXN0ZWRPcmlnaW5WMSxcclxuICAgIGhlbHBlckVycm9yVjEsXHJcbiAgICBkb3JtYW50U3RhdGVDaGFuZ2VkVjEsXHJcbiAgICBleHRlbnNpb25SZWFkeVYxLFxyXG4gICAgZXh0ZXJuYWxBcHBMaW5rUmVxdWVzdFYxLFxyXG4gICAgZXh0ZXJuYWxBcHBMaW5rUmVzcG9uc2VWMSxcclxuICAgIGlzRmlsZVVSTFRydXN0ZWRSZXF1ZXN0VjEsXHJcbiAgICBpc0ZpbGVVUkxUcnVzdGVkUmVzcG9uc2VWMSxcclxuICAgIGJsb2NrZWRGaWxlUmVxdWVzdFYxLFxyXG4gICAgYmxvY2tlZEZpbGVSZXNwb25zZVYxLFxyXG4gICAgcG9wdXBEYXRhUmVxdWVzdFYxLFxyXG4gICAgcG9wdXBEYXRhUmVzcG9uc2VWMSxcclxuICAgIGNsZWFyUmVtZW1iZXJlZERlY2lzaW9uc1YxLFxyXG4gICAgYmxvY2tlZFBhZ2VTdHJpbmdzUmVxdWVzdFYxLFxyXG4gICAgYmxvY2tlZFBhZ2VTdHJpbmdzUmVzcG9uc2VWMSxcclxuICAgIGhlYXJ0YmVhdFYxLFxyXG4gICAgZW5hYmxlZEZlYXR1cmVzUmVxdWVzdFYyLFxyXG4gICAgZW5hYmxlZEZlYXR1cmVzUmVzcG9uc2VWMixcclxuICAgIGNsZWFyUmVtZW1iZXJlZE9yaWdpblYzLFxyXG4gICAgb3B0aW9uc0RhdGFSZXF1ZXN0VjMsXHJcbiAgICBvcHRpb25zRGF0YVJlc3BvbnNlVjMsXHJcbiAgICBjb25maWdDaGFuZ2VkVjMsXHJcbiAgICByZXB1dGF0aW9uQ2hhbmdlZFYzLFxyXG4gICAgY29uZmlnQ2hhbmdlZFY0LFxyXG4gICAgYmxvY2tlZFBhZ2VEYXRhUmVxdWVzdFY0LFxyXG4gICAgYmxvY2tlZFBhZ2VEYXRhUmVzcG9uc2VWNCxcclxuICAgIGNvbmZpZ0NoYW5nZWRWNSxcclxuICAgIHBvcHVwRGF0YVJlc3BvbnNlVjUsXHJcbiAgICBibG9ja2VkUGFnZURhdGFSZXNwb25zZVY2LFxyXG4gICAgdHJ1c3RVcmxWNixcclxuICAgIGNvbmZpZ0NoYW5nZWRWNyxcclxuICAgIHRydXN0VXJsVjgsXHJcbiAgICBkb250QXNrQWdhaW5WOCxcclxuICAgIGNvbmZpZ0NoYW5nZWRWOCxcclxuICAgIHBvcHVwRGF0YVJlc3BvbnNlVjksXHJcbiAgICBkb250QXNrQWdhaW5WOSxcclxuICAgIGNvbmZpZ0NoYW5nZWRWOSxcclxuICAgIHN0b3BIZWxwZXJWMTAsXHJcbiAgICBlZGdlQWNrVjEwLFxyXG4gICAgZW5kT2ZTdHJlYW1WMTAsXHJcbiAgICBoZWFydGJlYXRWMTAsXHJcbiAgICBwb3B1cERhdGFSZXNwb25zZVYxMSxcclxuICAgIGNvbmZpZ0NoYW5nZWRWMTEsXHJcbiAgICBjb25maWdDaGFuZ2VkVjEyLFxyXG4gICAgbWluTWVzc2FnZVR5cGUgPSBoYW5kc2hha2VWMSxcclxuICAgIG1heE1lc3NhZ2VUeXBlID0gY29uZmlnQ2hhbmdlZFYxMlxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNNZXNzYWdlVHlwZSh0eXBlOiBNZXNzYWdlVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzSW5SYW5nZSh0eXBlLCBNZXNzYWdlVHlwZS5taW5NZXNzYWdlVHlwZSwgTWVzc2FnZVR5cGUubWF4TWVzc2FnZVR5cGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNGcmVxdWVudGx5U2VudE1lc3NhZ2VUeXBlKHR5cGU6IE1lc3NhZ2VUeXBlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBmcmVxdWVudGx5U2VudE1lc3NhZ2VUeXBlcyA9IFtcclxuICAgICAgICBNZXNzYWdlVHlwZS5sb2dNZXNzYWdlVjEsXHJcbiAgICAgICAgTWVzc2FnZVR5cGUucGFnZUV2ZW50VjEsXHJcbiAgICAgICAgTWVzc2FnZVR5cGUuaGVhcnRiZWF0VjEsXHJcbiAgICAgICAgTWVzc2FnZVR5cGUuZWRnZUFja1YxMFxyXG4gICAgXTtcclxuICAgIHJldHVybiBoYXMoZnJlcXVlbnRseVNlbnRNZXNzYWdlVHlwZXMsIHR5cGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFZGdlQWNrV29ya2Fyb3VuZCh0eXBlOiBNZXNzYWdlVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGUgPT09IE1lc3NhZ2VUeXBlLmVkZ2VBY2tWMTA7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9tZXNzYWdlLXR5cGVzLnRzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cblxuZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpO1xuICB9XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gQnVmZmVyLmlzQnVmZmVyO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9jb3JlLXV0aWwtaXMvbGliL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBOb25lLCBTb21lLCBNYXliZSB9IGZyb20gXCIuL21heWJlXCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0luUmFuZ2UodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbikgJiYgKHZhbHVlIDw9IG1heCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU51bWJlcih2YWx1ZTogc3RyaW5nKTogTWF5YmU8bnVtYmVyPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSAxMDtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIGJhc2UpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL251bWJlci11dGlscy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hYXBwbGVieS9zbWhhc2hlci9ibG9iL21hc3Rlci9zcmMvTXVybXVySGFzaDEuY3BwXHJcbi8vIE11cm11ckhhc2ggaXMgcmVsZWFzZWQgdW5kZXIgYW4gTUlUIGxpY2Vuc2UuXHJcbi8vIFRPRE8gQWNrbm9sd2VkZ2UgdGhlIGxpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBIYXNoIH0gZnJvbSBcIi4vaGFzaFwiO1xyXG5cclxuZnVuY3Rpb24gbXVybXVySGFzaFN0cmluZyhrZXk6IHN0cmluZywgc2VlZDogSGFzaCk6IEhhc2gge1xyXG4gICAgbGV0IGxlbiA9IGtleS5sZW5ndGggKiAyO1xyXG4gICAgY29uc3QgbSA9IDB4YzZhNGE3OTM7XHJcbiAgICBjb25zdCByID0gMTY7XHJcbiAgICBsZXQgaCA9IHNlZWQgXiAobGVuICogbSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IChpIDwga2V5Lmxlbmd0aCkgJiYgKGxlbiA+PSA0KTsgaSArPSAyKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IChrZXkuY2hhckNvZGVBdChpKSArIChrZXkuY2hhckNvZGVBdChpICsgMSkgPDwgMTYpKTtcclxuICAgICAgICBjb25zdCBrID0gZGF0YTtcclxuICAgICAgICBoICs9IGs7XHJcbiAgICAgICAgaCAqPSBtO1xyXG4gICAgICAgIGggXj0gKGggPj4gMTYpO1xyXG4gICAgICAgIGxlbiAtPSA0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZW4gPT09IDIpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGtleS5jaGFyQ29kZUF0KGtleS5sZW5ndGggLSAxKTtcclxuICAgICAgICBoICs9IGRhdGE7XHJcbiAgICAgICAgaCAqPSBtO1xyXG4gICAgICAgIGggXj0gKGggPj4gcik7XHJcbiAgICB9XHJcblxyXG4gICAgaCAqPSBtO1xyXG4gICAgaCBePSAoaCA+PiAxMCk7XHJcbiAgICBoICo9IG07XHJcbiAgICBoIF49IChoID4+IDE3KTtcclxuXHJcbiAgICByZXR1cm4gaDtcclxufVxyXG5cclxuZnVuY3Rpb24gbXVybXVySGFzaE51bWJlcihrZXk6IG51bWJlciwgc2VlZDogSGFzaCk6IEhhc2gge1xyXG4gICAgbGV0IGxlbiA9IDQ7XHJcbiAgICBjb25zdCBtID0gMHhjNmE0YTc5MztcclxuICAgIGNvbnN0IHIgPSAxNjtcclxuICAgIGxldCBoID0gc2VlZCBeIChsZW4gKiBtKTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0ga2V5ICYgMHhmZmZmZmZmZjtcclxuICAgIGNvbnN0IGsgPSBkYXRhO1xyXG4gICAgaCArPSBrO1xyXG4gICAgaCAqPSBtO1xyXG4gICAgaCBePSAoaCA+PiAxNik7XHJcblxyXG4gICAgaCAqPSBtO1xyXG4gICAgaCBePSAoaCA+PiAxMCk7XHJcbiAgICBoICo9IG07XHJcbiAgICBoIF49IChoID4+IDE3KTtcclxuXHJcbiAgICByZXR1cm4gaDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG11cm11ckhhc2goa2V5OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCBzZWVkOiBIYXNoKTogSGFzaCB7XHJcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm4gbXVybXVySGFzaFN0cmluZyhrZXksIHNlZWQpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICByZXR1cm4gbXVybXVySGFzaE51bWJlcihrZXkgPyAxIDogMCwgc2VlZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBtdXJtdXJIYXNoTnVtYmVyKGtleSwgc2VlZCk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL211cm11ci1oYXNoLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBjdXJyZW50RGF0ZVRpbWVTdHJpbmcgfSBmcm9tIFwiLi9kYXRlLXV0aWxzXCI7XHJcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSBcIi4vc3RyaW5nLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMb2dTaW5rIHtcclxuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgbG9nRXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uc29sZUxvZ1NpbmsgaW1wbGVtZW50cyBJTG9nU2luayB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ0Vycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExvZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFkZFNpbmsobmV3IENvbnNvbGVMb2dTaW5rKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFNpbmsoc2luazogSUxvZ1NpbmspIHtcclxuICAgICAgICB0aGlzLnNpbmtzLnB1c2goc2luayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb3JtYXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke2N1cnJlbnREYXRlVGltZVN0cmluZygpfTogJHttZXNzYWdlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE1lc3NhZ2UgPSB0aGlzLmZvcm1hdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBzaW5rIG9mIHRoaXMuc2lua3MpIHtcclxuICAgICAgICAgICAgc2luay5sb2coZm9ybWF0dGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ0Vycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvclRvU3RyaW5nKGVycm9yKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRNZXNzYWdlID0gdGhpcy5mb3JtYXRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc2luayBvZiB0aGlzLnNpbmtzKSB7XHJcbiAgICAgICAgICAgIHNpbmsubG9nRXJyb3IoZm9ybWF0dGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2lua3M6IElMb2dTaW5rW10gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlcnJvclRvU3RyaW5nKGVycm9yOiBFcnJvcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdG9TdHJpbmcoeyBuYW1lOiBlcnJvci5uYW1lLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbG9nZ2VyLmxvZyhtZXNzYWdlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZ0Vycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgbG9nZ2VyLmxvZ0Vycm9yKGVycm9yKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbG9nLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIXByb2Nlc3MudmVyc2lvbiB8fFxuICAgIHByb2Nlc3MudmVyc2lvbi5pbmRleE9mKCd2MC4nKSA9PT0gMCB8fFxuICAgIHByb2Nlc3MudmVyc2lvbi5pbmRleE9mKCd2MS4nKSA9PT0gMCAmJiBwcm9jZXNzLnZlcnNpb24uaW5kZXhPZigndjEuOC4nKSAhPT0gMCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IG5leHRUaWNrO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBwcm9jZXNzLm5leHRUaWNrO1xufVxuXG5mdW5jdGlvbiBuZXh0VGljayhmbiwgYXJnMSwgYXJnMiwgYXJnMykge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJjYWxsYmFja1wiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgYXJncywgaTtcbiAgc3dpdGNoIChsZW4pIHtcbiAgY2FzZSAwOlxuICBjYXNlIDE6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZm4pO1xuICBjYXNlIDI6XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gYWZ0ZXJUaWNrT25lKCkge1xuICAgICAgZm4uY2FsbChudWxsLCBhcmcxKTtcbiAgICB9KTtcbiAgY2FzZSAzOlxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGlja1R3bygpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSwgYXJnMik7XG4gICAgfSk7XG4gIGNhc2UgNDpcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiBhZnRlclRpY2tUaHJlZSgpIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgfSk7XG4gIGRlZmF1bHQ6XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICBhcmdzW2krK10gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uIGFmdGVyVGljaygpIHtcbiAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9wcm9jZXNzLW5leHRpY2stYXJncy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG4vLyBhbHRlcm5hdGl2ZSB0byB1c2luZyBPYmplY3Qua2V5cyBmb3Igb2xkIGJyb3dzZXJzXG5mdW5jdGlvbiBjb3B5UHJvcHMgKHNyYywgZHN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBkc3Rba2V5XSA9IHNyY1trZXldXG4gIH1cbn1cbmlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuYWxsb2MgJiYgQnVmZmVyLmFsbG9jVW5zYWZlICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbn0gZWxzZSB7XG4gIC8vIENvcHkgcHJvcGVydGllcyBmcm9tIHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGNvcHlQcm9wcyhidWZmZXIsIGV4cG9ydHMpXG4gIGV4cG9ydHMuQnVmZmVyID0gU2FmZUJ1ZmZlclxufVxuXG5mdW5jdGlvbiBTYWZlQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBDb3B5IHN0YXRpYyBtZXRob2RzIGZyb20gQnVmZmVyXG5jb3B5UHJvcHMoQnVmZmVyLCBTYWZlQnVmZmVyKVxuXG5TYWZlQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHZhciBidWYgPSBCdWZmZXIoc2l6ZSlcbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBidWYuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmZpbGwoZmlsbClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnVmLmZpbGwoMClcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihzaXplKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gYnVmZmVyLlNsb3dCdWZmZXIoc2l6ZSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3NhZmUtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IEhhc2ggfSBmcm9tIFwiLi9oYXNoXCI7XHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbWFzayA9IHZhbHVlIC0gMTtcclxuICAgIHJldHVybiAodmFsdWUgJiBtYXNrKSA9PT0gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kKG46IG51bWJlciwgZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBuICYgKGQgLSAxKTtcclxufVxyXG5cclxudHlwZSBIb2xlID0gdW5kZWZpbmVkO1xyXG50eXBlIERlbGV0ZWQgPSBudWxsO1xyXG5cclxudHlwZSBIYXNoRWxlbWVudDxLLCBWPiA9IFtIYXNoLCBLLCBWXSB8IERlbGV0ZWQgfCBIb2xlO1xyXG5cclxuZW51bSBUcnlQdXRTdGF0dXMge1xyXG4gICAgVmFsdWVJbnNlcnRlZCxcclxuICAgIFZhbHVlVXBkYXRlZCxcclxuICAgIEZhaWx1cmVcclxufVxyXG5cclxuZnVuY3Rpb24gY29udmVydFRvQXJyYXk8SywgViwgVT4oZWxlbWVudHM6IEhhc2hFbGVtZW50PEssIFY+W10sIHNlbGVjdG9yOiAoZWxlbWVudDogW0hhc2gsIEssIFZdKSA9PiBVKTogVVtdIHtcclxuICAgIGNvbnN0IGZpbHRlcmVkRWxlbWVudHMgPSBlbGVtZW50cy5maWx0ZXIoKGVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGw7XHJcbiAgICB9KSBhcyBbSGFzaCwgSywgVl1bXTtcclxuICAgIGNvbnN0IG1hcHBlZEVsZW1lbnRzID0gZmlsdGVyZWRFbGVtZW50cy5tYXAoc2VsZWN0b3IpO1xyXG4gICAgcmV0dXJuIG1hcHBlZEVsZW1lbnRzO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFzaE1hcDxLLCBWPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGhhc2g6IChrZXk6IEspID0+IEhhc2gsXHJcbiAgICAgICAgcHJpdmF0ZSBjb21wYXJlOiAoYTogSywgYjogSykgPT4gYm9vbGVhbixcclxuICAgICAgICBpbml0aWFsQ2FwYWNpdHkgPSAwLFxyXG4gICAgICAgIHByaXZhdGUgZmlsbEZhY3RvciA9IDAuNzUpIHtcclxuICAgICAgICBpZiAoaW5pdGlhbENhcGFjaXR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplKGluaXRpYWxDYXBhY2l0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvdWxkUmVzaXplKHNpemU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChzaXplIC8gdGhpcy5lbGVtZW50cy5sZW5ndGgpID49IHRoaXMuZmlsbEZhY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmROZXh0Q2FwYWNpdHkoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmxlbmd0aCAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kSW5kZXgoaGFzaDogSGFzaCwgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IG1vZChoYXNoLCBlbGVtZW50cy5sZW5ndGgpO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIYXNoTWFwLmZpbmRJbmRleDogaW5kZXggPCAwOiAke2luZGV4fSA8IDBgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4ID49IGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhc2hNYXAuZmluZEluZGV4OiBpbmRleCA+PSBlbGVtZW50cy5sZW5ndGg6ICR7aW5kZXh9ID49ICR7ZWxlbWVudHMubGVuZ3RofWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21wYXJlS2V5cyhoYTogSGFzaCwga2E6IEssIGhiOiBIYXNoLCBrYjogSykge1xyXG4gICAgICAgIHJldHVybiAoaGEgPT09IGhiKSAmJiB0aGlzLmNvbXBhcmUoa2EsIGtiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyeVB1dChoYXNoOiBIYXNoLCBrZXk6IEssIHZhbHVlOiBWLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzKTogVHJ5UHV0U3RhdHVzIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2N1cnJlbnRIYXNoLCBjdXJyZW50S2V5LCBjdXJyZW50VmFsdWVdID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbXBhcmVLZXlzKGhhc2gsIGtleSwgY3VycmVudEhhc2gsIGN1cnJlbnRLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHNbaV0gPSBbaGFzaCwga2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRyeVB1dFN0YXR1cy5WYWx1ZVVwZGF0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50c1tpXSA9IFtoYXNoLCBrZXksIHZhbHVlXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBUcnlQdXRTdGF0dXMuVmFsdWVJbnNlcnRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVHJ5UHV0U3RhdHVzLkZhaWx1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNpemUoY2FwYWNpdHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChjYXBhY2l0eSA8PSB0aGlzLmVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhc2hNYXAucmVzaXplOiBjYXBhY2l0eSA8PSB0aGlzLmVsZW1lbnRzLmxlbmd0aDogJHtjYXBhY2l0eX0gPD0gJHt0aGlzLmVsZW1lbnRzLmxlbmd0aH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcGFjaXR5IDw9IHRoaXMuc2l6ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhc2hNYXAucmVzaXplOiBjYXBhY2l0eSA8PSB0aGlzLnNpemU6ICR7Y2FwYWNpdHl9IDw9ICR7dGhpcy5zaXplfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzUG93ZXJPZjIoY2FwYWNpdHkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFzaE1hcC5yZXNpemU6ICFpc1Bvd2VyT2YyKCR7Y2FwYWNpdHl9KWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IG5ldyBBcnJheTxIYXNoRWxlbWVudDxLLCBWPj4oY2FwYWNpdHkpO1xyXG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtoYXNoLCBrZXksIHZhbHVlXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KGhhc2gsIGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyeVB1dChoYXNoLCBrZXksIHZhbHVlLCBpbmRleCwgZWxlbWVudHMubGVuZ3RoLCBlbGVtZW50cykgIT09IFRyeVB1dFN0YXR1cy5GYWlsdXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cnlQdXQoaGFzaCwga2V5LCB2YWx1ZSwgMCwgaW5kZXgsIGVsZW1lbnRzKSAhPT0gVHJ5UHV0U3RhdHVzLkZhaWx1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFzaE1hcC5yZXNpemU6ICF0cnlQdXRgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGtleTogSyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldChrZXkpICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0hvbGUoZWxlbWVudDogSGFzaEVsZW1lbnQ8SywgVj4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudCA9PT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJ5R2V0KGhhc2g6IEhhc2gsIGtleTogSywgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBbYm9vbGVhbiwgTWF5YmU8Vj5dIHtcclxuICAgICAgICBjb25zdCBmb3VuZEhvbGUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtjdXJyZW50SGFzaCwgY3VycmVudEtleSwgY3VycmVudFZhbHVlXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlS2V5cyhoYXNoLCBrZXksIGN1cnJlbnRIYXNoLCBjdXJyZW50S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbIWZvdW5kSG9sZSwgY3VycmVudFZhbHVlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSG9sZShlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtmb3VuZEhvbGUsIHVuZGVmaW5lZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFshZm91bmRIb2xlLCB1bmRlZmluZWRdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChrZXk6IEspOiBNYXliZTxWPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoKGtleSk7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbmRJbmRleChoYXNoKTtcclxuICAgICAgICBsZXQgW2ZvdW5kSG9sZSwgdmFsdWVdID0gdGhpcy50cnlHZXQoaGFzaCwga2V5LCBpbmRleCwgdGhpcy5lbGVtZW50cy5sZW5ndGgpO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3VuZEhvbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgW2ZvdW5kSG9sZSwgdmFsdWVdID0gdGhpcy50cnlHZXQoaGFzaCwga2V5LCAwLCBpbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1dChrZXk6IEssIHZhbHVlOiBWKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkUmVzaXplKHRoaXMuc2l6ZSArIDEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplKHRoaXMuZmluZE5leHRDYXBhY2l0eSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuaGFzaChrZXkpO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgoaGFzaCk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnRyeVB1dChoYXNoLCBrZXksIHZhbHVlLCBpbmRleCwgdGhpcy5lbGVtZW50cy5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVHJ5UHV0U3RhdHVzLlZhbHVlSW5zZXJ0ZWQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBUcnlQdXRTdGF0dXMuVmFsdWVVcGRhdGVkOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHJ5UHV0KGhhc2gsIGtleSwgdmFsdWUsIDAsIGluZGV4KSkge1xyXG4gICAgICAgICAgICBjYXNlIFRyeVB1dFN0YXR1cy5WYWx1ZUluc2VydGVkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplICs9IDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UgVHJ5UHV0U3RhdHVzLlZhbHVlVXBkYXRlZDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIYXNoTWFwLnB1dDogIXRyeVB1dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1dE1hbnkoa2V5VmFsdWVzOiBJdGVyYWJsZTxbSywgVl0+KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Yga2V5VmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHV0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyeVJlbW92ZShoYXNoOiBIYXNoLCBrZXk6IEssIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogW2Jvb2xlYW4sIGJvb2xlYW5dIHtcclxuICAgICAgICBjb25zdCBmb3VuZEhvbGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtjdXJyZW50SGFzaCwgY3VycmVudEtleSwgY3VycmVudFZhbHVlXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlS2V5cyhoYXNoLCBrZXksIGN1cnJlbnRIYXNoLCBjdXJyZW50S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbIWZvdW5kSG9sZSwgcmVtb3ZlZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0hvbGUoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbZm91bmRIb2xlLCAhcmVtb3ZlZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFshZm91bmRIb2xlLCAhcmVtb3ZlZF07XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlKGtleTogSyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmhhc2goa2V5KTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KGhhc2gpO1xyXG4gICAgICAgIGxldCBbZm91bmRIb2xlLCByZW1vdmVkXSA9IHRoaXMudHJ5UmVtb3ZlKGhhc2gsIGtleSwgaW5kZXgsIHRoaXMuZWxlbWVudHMubGVuZ3RoKTtcclxuICAgICAgICBpZiAocmVtb3ZlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpemUgLT0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3VuZEhvbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBbZm91bmRIb2xlLCByZW1vdmVkXSA9IHRoaXMudHJ5UmVtb3ZlKGhhc2gsIGtleSwgMCwgaW5kZXgpO1xyXG4gICAgICAgIGlmIChyZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCkgOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRvQXJyYXkoKTogW0ssIFZdW10ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdEtleVZhbHVlOiAoZWxlbWVudDogW0hhc2gsIEssIFZdKSA9PiBbSywgVl0gPSAoW2hhc2gsIGtleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY29udmVydFRvQXJyYXkodGhpcy5lbGVtZW50cywgc2VsZWN0S2V5VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2hhc2gsIGtleSwgdmFsdWVdID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHlpZWxkIFtrZXksIHZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaXplID0gMDtcclxuICAgIGVsZW1lbnRzOiBIYXNoRWxlbWVudDxLLCBWPltdID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNoU2V0PEs+IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGhhc2g6IChrZXk6IEspID0+IEhhc2gsXHJcbiAgICAgICAgY29tcGFyZTogKGE6IEssIGI6IEspID0+IGJvb2xlYW4sXHJcbiAgICAgICAgaW5pdGlhbENhcGFjaXR5ID0gMCxcclxuICAgICAgICBmaWxsRmFjdG9yID0gMC43NSkge1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IEhhc2hNYXA8SywgSz4oaGFzaCwgY29tcGFyZSwgaW5pdGlhbENhcGFjaXR5LCBmaWxsRmFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1hbnkoa2V5czogSXRlcmFibGU8Sz4pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuS2V5c0FkZGVkID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkZChrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBuS2V5c0FkZGVkICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5LZXlzQWRkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGtleTogSyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHNpemVCZWZvcmUgPSB0aGlzLm1hcC5zaXplO1xyXG4gICAgICAgIHRoaXMubWFwLnB1dChrZXksIGtleSk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZUFmdGVyID0gdGhpcy5tYXAuc2l6ZTtcclxuICAgICAgICByZXR1cm4gKHNpemVBZnRlciAtIHNpemVCZWZvcmUpID09PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGhhcyhrZXk6IEspOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlKGtleTogSyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5yZW1vdmUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5pc0VtcHR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9BcnJheSgpOiBLW10ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdEtleTogKGVsZW1lbnQ6IFtIYXNoLCBLLCBLXSkgPT4gSyA9IChbaGFzaCwga2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjb252ZXJ0VG9BcnJheSh0aGlzLm1hcC5lbGVtZW50cywgc2VsZWN0S2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMubWFwLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2hhc2gsIGtleSwgdmFsdWVdID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHlpZWxkIGtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hcDogSGFzaE1hcDxLLCBLPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIYXNoYWJsZTxLPiB7XHJcbiAgICBoYXNoV2l0aFNlZWQoc2VlZDogSGFzaCk6IEhhc2g7XHJcbiAgICBoYXNoKCk6IEhhc2g7XHJcbiAgICBjb21wYXJlKG90aGVyOiBLKTogYm9vbGVhbjtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmYXVsdEhhc2g8Sz4oaW5zdGFuY2U6IEhhc2hhYmxlPEs+KSB7XHJcbiAgICByZXR1cm4gaW5zdGFuY2UuaGFzaCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZTxLIGV4dGVuZHMgSGFzaGFibGU8Sz4+KGE6IEssIGI6IEspOiBib29sZWFuIHtcclxuICAgIHJldHVybiBhLmNvbXBhcmUoYik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlRGVmYXVsdEhhc2hNYXA8SyBleHRlbmRzIEhhc2hhYmxlPEs+LCBWPigpIHtcclxuICAgIHJldHVybiBuZXcgSGFzaE1hcDxLLCBWPihkZWZhdWx0SGFzaCwgZGVmYXVsdENvbXBhcmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZURlZmF1bHRIYXNoU2V0PEsgZXh0ZW5kcyBIYXNoYWJsZTxLPj4oKSB7XHJcbiAgICByZXR1cm4gbmV3IEhhc2hTZXQ8Sz4oZGVmYXVsdEhhc2gsIGRlZmF1bHRDb21wYXJlKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vaGFzaC1tYXAudHMiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3JlYWRhYmxlLmpzJyk7XG5leHBvcnRzLlN0cmVhbSA9IGV4cG9ydHM7XG5leHBvcnRzLlJlYWRhYmxlID0gZXhwb3J0cztcbmV4cG9ydHMuV3JpdGFibGUgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG5leHBvcnRzLkR1cGxleCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG5leHBvcnRzLlRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzJyk7XG5leHBvcnRzLlBhc3NUaHJvdWdoID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gQSBiaXQgc2ltcGxlciB0aGFuIHJlYWRhYmxlIHN0cmVhbXMuXG4vLyBJbXBsZW1lbnQgYW4gYXN5bmMgLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKSwgYW5kIGl0J2xsIGhhbmRsZSBhbGxcbi8vIHRoZSBkcmFpbiBldmVudCBlbWlzc2lvbiBhbmQgYnVmZmVyaW5nLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBwcm9jZXNzTmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzLW5leHRpY2stYXJncycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbm1vZHVsZS5leHBvcnRzID0gV3JpdGFibGU7XG5cbi8qIDxyZXBsYWNlbWVudD4gKi9cbmZ1bmN0aW9uIFdyaXRlUmVxKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdGhpcy5jaHVuayA9IGNodW5rO1xuICB0aGlzLmVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgdGhpcy5uZXh0ID0gbnVsbDtcbn1cblxuLy8gSXQgc2VlbXMgYSBsaW5rZWQgbGlzdCBidXQgaXQgaXMgbm90XG4vLyB0aGVyZSB3aWxsIGJlIG9ubHkgMiBvZiB0aGVzZSBmb3IgZWFjaCBzdHJlYW1cbmZ1bmN0aW9uIENvcmtlZFJlcXVlc3Qoc3RhdGUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLm5leHQgPSBudWxsO1xuICB0aGlzLmVudHJ5ID0gbnVsbDtcbiAgdGhpcy5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgb25Db3JrZWRGaW5pc2goX3RoaXMsIHN0YXRlKTtcbiAgfTtcbn1cbi8qIDwvcmVwbGFjZW1lbnQ+ICovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgYXN5bmNXcml0ZSA9ICFwcm9jZXNzLmJyb3dzZXIgJiYgWyd2MC4xMCcsICd2MC45LiddLmluZGV4T2YocHJvY2Vzcy52ZXJzaW9uLnNsaWNlKDAsIDUpKSA+IC0xID8gc2V0SW1tZWRpYXRlIDogcHJvY2Vzc05leHRUaWNrO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRHVwbGV4O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgaW50ZXJuYWxVdGlsID0ge1xuICBkZXByZWNhdGU6IHJlcXVpcmUoJ3V0aWwtZGVwcmVjYXRlJylcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBTdHJlYW0gPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbnZhciBPdXJVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkgfHwgZnVuY3Rpb24gKCkge307XG5mdW5jdGlvbiBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShjaHVuayk7XG59XG5mdW5jdGlvbiBfaXNVaW50OEFycmF5KG9iaikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgb2JqIGluc3RhbmNlb2YgT3VyVWludDhBcnJheTtcbn1cbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgZGVzdHJveUltcGwgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveScpO1xuXG51dGlsLmluaGVyaXRzKFdyaXRhYmxlLCBTdHJlYW0pO1xuXG5mdW5jdGlvbiBub3AoKSB7fVxuXG5mdW5jdGlvbiBXcml0YWJsZVN0YXRlKG9wdGlvbnMsIHN0cmVhbSkge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIG9iamVjdCBzdHJlYW0gZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGlzIHN0cmVhbVxuICAvLyBjb250YWlucyBidWZmZXJzIG9yIG9iamVjdHMuXG4gIHRoaXMub2JqZWN0TW9kZSA9ICEhb3B0aW9ucy5vYmplY3RNb2RlO1xuXG4gIGlmIChzdHJlYW0gaW5zdGFuY2VvZiBEdXBsZXgpIHRoaXMub2JqZWN0TW9kZSA9IHRoaXMub2JqZWN0TW9kZSB8fCAhIW9wdGlvbnMud3JpdGFibGVPYmplY3RNb2RlO1xuXG4gIC8vIHRoZSBwb2ludCBhdCB3aGljaCB3cml0ZSgpIHN0YXJ0cyByZXR1cm5pbmcgZmFsc2VcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyB0aGF0IHdlIGFsd2F5cyByZXR1cm4gZmFsc2UgaWZcbiAgLy8gdGhlIGVudGlyZSBidWZmZXIgaXMgbm90IGZsdXNoZWQgaW1tZWRpYXRlbHkgb24gd3JpdGUoKVxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB2YXIgZGVmYXVsdEh3bSA9IHRoaXMub2JqZWN0TW9kZSA/IDE2IDogMTYgKiAxMDI0O1xuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBod20gfHwgaHdtID09PSAwID8gaHdtIDogZGVmYXVsdEh3bTtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IE1hdGguZmxvb3IodGhpcy5oaWdoV2F0ZXJNYXJrKTtcblxuICAvLyBpZiBfZmluYWwgaGFzIGJlZW4gY2FsbGVkXG4gIHRoaXMuZmluYWxDYWxsZWQgPSBmYWxzZTtcblxuICAvLyBkcmFpbiBldmVudCBmbGFnLlxuICB0aGlzLm5lZWREcmFpbiA9IGZhbHNlO1xuICAvLyBhdCB0aGUgc3RhcnQgb2YgY2FsbGluZyBlbmQoKVxuICB0aGlzLmVuZGluZyA9IGZhbHNlO1xuICAvLyB3aGVuIGVuZCgpIGhhcyBiZWVuIGNhbGxlZCwgYW5kIHJldHVybmVkXG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgLy8gd2hlbiAnZmluaXNoJyBpcyBlbWl0dGVkXG4gIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblxuICAvLyBoYXMgaXQgYmVlbiBkZXN0cm95ZWRcbiAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcblxuICAvLyBzaG91bGQgd2UgZGVjb2RlIHN0cmluZ3MgaW50byBidWZmZXJzIGJlZm9yZSBwYXNzaW5nIHRvIF93cml0ZT9cbiAgLy8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgc29tZSBub2RlLWNvcmUgc3RyZWFtcyBjYW4gb3B0aW1pemUgc3RyaW5nXG4gIC8vIGhhbmRsaW5nIGF0IGEgbG93ZXIgbGV2ZWwuXG4gIHZhciBub0RlY29kZSA9IG9wdGlvbnMuZGVjb2RlU3RyaW5ncyA9PT0gZmFsc2U7XG4gIHRoaXMuZGVjb2RlU3RyaW5ncyA9ICFub0RlY29kZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyBub3QgYW4gYWN0dWFsIGJ1ZmZlciB3ZSBrZWVwIHRyYWNrIG9mLCBidXQgYSBtZWFzdXJlbWVudFxuICAvLyBvZiBob3cgbXVjaCB3ZSdyZSB3YWl0aW5nIHRvIGdldCBwdXNoZWQgdG8gc29tZSB1bmRlcmx5aW5nXG4gIC8vIHNvY2tldCBvciBmaWxlLlxuICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIHNlZSB3aGVuIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB3cml0ZS5cbiAgdGhpcy53cml0aW5nID0gZmFsc2U7XG5cbiAgLy8gd2hlbiB0cnVlIGFsbCB3cml0ZXMgd2lsbCBiZSBidWZmZXJlZCB1bnRpbCAudW5jb3JrKCkgY2FsbFxuICB0aGlzLmNvcmtlZCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gYSBmbGFnIHRvIGtub3cgaWYgd2UncmUgcHJvY2Vzc2luZyBwcmV2aW91c2x5IGJ1ZmZlcmVkIGl0ZW1zLCB3aGljaFxuICAvLyBtYXkgY2FsbCB0aGUgX3dyaXRlKCkgY2FsbGJhY2sgaW4gdGhlIHNhbWUgdGljaywgc28gdGhhdCB3ZSBkb24ndFxuICAvLyBlbmQgdXAgaW4gYW4gb3ZlcmxhcHBlZCBvbndyaXRlIHNpdHVhdGlvbi5cbiAgdGhpcy5idWZmZXJQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgLy8gdGhlIGNhbGxiYWNrIHRoYXQncyBwYXNzZWQgdG8gX3dyaXRlKGNodW5rLGNiKVxuICB0aGlzLm9ud3JpdGUgPSBmdW5jdGlvbiAoZXIpIHtcbiAgICBvbndyaXRlKHN0cmVhbSwgZXIpO1xuICB9O1xuXG4gIC8vIHRoZSBjYWxsYmFjayB0aGF0IHRoZSB1c2VyIHN1cHBsaWVzIHRvIHdyaXRlKGNodW5rLGVuY29kaW5nLGNiKVxuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuXG4gIC8vIHRoZSBhbW91bnQgdGhhdCBpcyBiZWluZyB3cml0dGVuIHdoZW4gX3dyaXRlIGlzIGNhbGxlZC5cbiAgdGhpcy53cml0ZWxlbiA9IDA7XG5cbiAgdGhpcy5idWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB0aGlzLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuXG4gIC8vIG51bWJlciBvZiBwZW5kaW5nIHVzZXItc3VwcGxpZWQgd3JpdGUgY2FsbGJhY2tzXG4gIC8vIHRoaXMgbXVzdCBiZSAwIGJlZm9yZSAnZmluaXNoJyBjYW4gYmUgZW1pdHRlZFxuICB0aGlzLnBlbmRpbmdjYiA9IDA7XG5cbiAgLy8gZW1pdCBwcmVmaW5pc2ggaWYgdGhlIG9ubHkgdGhpbmcgd2UncmUgd2FpdGluZyBmb3IgaXMgX3dyaXRlIGNic1xuICAvLyBUaGlzIGlzIHJlbGV2YW50IGZvciBzeW5jaHJvbm91cyBUcmFuc2Zvcm0gc3RyZWFtc1xuICB0aGlzLnByZWZpbmlzaGVkID0gZmFsc2U7XG5cbiAgLy8gVHJ1ZSBpZiB0aGUgZXJyb3Igd2FzIGFscmVhZHkgZW1pdHRlZCBhbmQgc2hvdWxkIG5vdCBiZSB0aHJvd24gYWdhaW5cbiAgdGhpcy5lcnJvckVtaXR0ZWQgPSBmYWxzZTtcblxuICAvLyBjb3VudCBidWZmZXJlZCByZXF1ZXN0c1xuICB0aGlzLmJ1ZmZlcmVkUmVxdWVzdENvdW50ID0gMDtcblxuICAvLyBhbGxvY2F0ZSB0aGUgZmlyc3QgQ29ya2VkUmVxdWVzdCwgdGhlcmUgaXMgYWx3YXlzXG4gIC8vIG9uZSBhbGxvY2F0ZWQgYW5kIGZyZWUgdG8gdXNlLCBhbmQgd2UgbWFpbnRhaW4gYXQgbW9zdCB0d29cbiAgdGhpcy5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdCh0aGlzKTtcbn1cblxuV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24gZ2V0QnVmZmVyKCkge1xuICB2YXIgY3VycmVudCA9IHRoaXMuYnVmZmVyZWRSZXF1ZXN0O1xuICB2YXIgb3V0ID0gW107XG4gIHdoaWxlIChjdXJyZW50KSB7XG4gICAgb3V0LnB1c2goY3VycmVudCk7XG4gICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUsICdidWZmZXInLCB7XG4gICAgICBnZXQ6IGludGVybmFsVXRpbC5kZXByZWNhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXIoKTtcbiAgICAgIH0sICdfd3JpdGFibGVTdGF0ZS5idWZmZXIgaXMgZGVwcmVjYXRlZC4gVXNlIF93cml0YWJsZVN0YXRlLmdldEJ1ZmZlciAnICsgJ2luc3RlYWQuJywgJ0RFUDAwMDMnKVxuICAgIH0pO1xuICB9IGNhdGNoIChfKSB7fVxufSkoKTtcblxuLy8gVGVzdCBfd3JpdGFibGVTdGF0ZSBmb3IgaW5oZXJpdGFuY2UgdG8gYWNjb3VudCBmb3IgRHVwbGV4IHN0cmVhbXMsXG4vLyB3aG9zZSBwcm90b3R5cGUgY2hhaW4gb25seSBwb2ludHMgdG8gUmVhZGFibGUuXG52YXIgcmVhbEhhc0luc3RhbmNlO1xuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmhhc0luc3RhbmNlICYmIHR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICByZWFsSGFzSW5zdGFuY2UgPSBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLCBTeW1ib2wuaGFzSW5zdGFuY2UsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgaWYgKHJlYWxIYXNJbnN0YW5jZS5jYWxsKHRoaXMsIG9iamVjdCkpIHJldHVybiB0cnVlO1xuXG4gICAgICByZXR1cm4gb2JqZWN0ICYmIG9iamVjdC5fd3JpdGFibGVTdGF0ZSBpbnN0YW5jZW9mIFdyaXRhYmxlU3RhdGU7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIHJlYWxIYXNJbnN0YW5jZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgdGhpcztcbiAgfTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGUob3B0aW9ucykge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIC8vIFdyaXRhYmxlIGN0b3IgaXMgYXBwbGllZCB0byBEdXBsZXhlcywgdG9vLlxuICAvLyBgcmVhbEhhc0luc3RhbmNlYCBpcyBuZWNlc3NhcnkgYmVjYXVzZSB1c2luZyBwbGFpbiBgaW5zdGFuY2VvZmBcbiAgLy8gd291bGQgcmV0dXJuIGZhbHNlLCBhcyBubyBgX3dyaXRhYmxlU3RhdGVgIHByb3BlcnR5IGlzIGF0dGFjaGVkLlxuXG4gIC8vIFRyeWluZyB0byB1c2UgdGhlIGN1c3RvbSBgaW5zdGFuY2VvZmAgZm9yIFdyaXRhYmxlIGhlcmUgd2lsbCBhbHNvIGJyZWFrIHRoZVxuICAvLyBOb2RlLmpzIExhenlUcmFuc2Zvcm0gaW1wbGVtZW50YXRpb24sIHdoaWNoIGhhcyBhIG5vbi10cml2aWFsIGdldHRlciBmb3JcbiAgLy8gYF93cml0YWJsZVN0YXRlYCB0aGF0IHdvdWxkIGxlYWQgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICBpZiAoIXJlYWxIYXNJbnN0YW5jZS5jYWxsKFdyaXRhYmxlLCB0aGlzKSAmJiAhKHRoaXMgaW5zdGFuY2VvZiBEdXBsZXgpKSB7XG4gICAgcmV0dXJuIG5ldyBXcml0YWJsZShvcHRpb25zKTtcbiAgfVxuXG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUgPSBuZXcgV3JpdGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3kuXG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLndyaXRlID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZSA9IG9wdGlvbnMud3JpdGU7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMud3JpdGV2ID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZXYgPSBvcHRpb25zLndyaXRldjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB0aGlzLl9kZXN0cm95ID0gb3B0aW9ucy5kZXN0cm95O1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbmFsID09PSAnZnVuY3Rpb24nKSB0aGlzLl9maW5hbCA9IG9wdGlvbnMuZmluYWw7XG4gIH1cblxuICBTdHJlYW0uY2FsbCh0aGlzKTtcbn1cblxuLy8gT3RoZXJ3aXNlIHBlb3BsZSBjYW4gcGlwZSBXcml0YWJsZSBzdHJlYW1zLCB3aGljaCBpcyBqdXN0IHdyb25nLlxuV3JpdGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0Nhbm5vdCBwaXBlLCBub3QgcmVhZGFibGUnKSk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUFmdGVyRW5kKHN0cmVhbSwgY2IpIHtcbiAgdmFyIGVyID0gbmV3IEVycm9yKCd3cml0ZSBhZnRlciBlbmQnKTtcbiAgLy8gVE9ETzogZGVmZXIgZXJyb3IgZXZlbnRzIGNvbnNpc3RlbnRseSBldmVyeXdoZXJlLCBub3QganVzdCB0aGUgY2JcbiAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbn1cblxuLy8gQ2hlY2tzIHRoYXQgYSB1c2VyLXN1cHBsaWVkIGNodW5rIGlzIHZhbGlkLCBlc3BlY2lhbGx5IGZvciB0aGUgcGFydGljdWxhclxuLy8gbW9kZSB0aGUgc3RyZWFtIGlzIGluLiBDdXJyZW50bHkgdGhpcyBtZWFucyB0aGF0IGBudWxsYCBpcyBuZXZlciBhY2NlcHRlZFxuLy8gYW5kIHVuZGVmaW5lZC9ub24tc3RyaW5nIHZhbHVlcyBhcmUgb25seSBhbGxvd2VkIGluIG9iamVjdCBtb2RlLlxuZnVuY3Rpb24gdmFsaWRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgY2IpIHtcbiAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgdmFyIGVyID0gZmFsc2U7XG5cbiAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdNYXkgbm90IHdyaXRlIG51bGwgdmFsdWVzIHRvIHN0cmVhbScpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IFR5cGVFcnJvcignSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVuaycpO1xuICB9XG4gIGlmIChlcikge1xuICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHJldCA9IGZhbHNlO1xuICB2YXIgaXNCdWYgPSBfaXNVaW50OEFycmF5KGNodW5rKSAmJiAhc3RhdGUub2JqZWN0TW9kZTtcblxuICBpZiAoaXNCdWYgJiYgIUJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpIHtcbiAgICBjaHVuayA9IF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKGlzQnVmKSBlbmNvZGluZyA9ICdidWZmZXInO2Vsc2UgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSBzdGF0ZS5kZWZhdWx0RW5jb2Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykgY2IgPSBub3A7XG5cbiAgaWYgKHN0YXRlLmVuZGVkKSB3cml0ZUFmdGVyRW5kKHRoaXMsIGNiKTtlbHNlIGlmIChpc0J1ZiB8fCB2YWxpZENodW5rKHRoaXMsIHN0YXRlLCBjaHVuaywgY2IpKSB7XG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgcmV0ID0gd3JpdGVPckJ1ZmZlcih0aGlzLCBzdGF0ZSwgaXNCdWYsIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5jb3JrID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIHN0YXRlLmNvcmtlZCsrO1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLnVuY29yayA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fd3JpdGFibGVTdGF0ZTtcblxuICBpZiAoc3RhdGUuY29ya2VkKSB7XG4gICAgc3RhdGUuY29ya2VkLS07XG5cbiAgICBpZiAoIXN0YXRlLndyaXRpbmcgJiYgIXN0YXRlLmNvcmtlZCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSBjbGVhckJ1ZmZlcih0aGlzLCBzdGF0ZSk7XG4gIH1cbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5zZXREZWZhdWx0RW5jb2RpbmcgPSBmdW5jdGlvbiBzZXREZWZhdWx0RW5jb2RpbmcoZW5jb2RpbmcpIHtcbiAgLy8gbm9kZTo6UGFyc2VFbmNvZGluZygpIHJlcXVpcmVzIGxvd2VyIGNhc2UuXG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSBlbmNvZGluZyA9IGVuY29kaW5nLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghKFsnaGV4JywgJ3V0ZjgnLCAndXRmLTgnLCAnYXNjaWknLCAnYmluYXJ5JywgJ2Jhc2U2NCcsICd1Y3MyJywgJ3Vjcy0yJywgJ3V0ZjE2bGUnLCAndXRmLTE2bGUnLCAncmF3J10uaW5kZXhPZigoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKSkgPiAtMSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVmYXVsdEVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZykge1xuICBpZiAoIXN0YXRlLm9iamVjdE1vZGUgJiYgc3RhdGUuZGVjb2RlU3RyaW5ncyAhPT0gZmFsc2UgJiYgdHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgIGNodW5rID0gQnVmZmVyLmZyb20oY2h1bmssIGVuY29kaW5nKTtcbiAgfVxuICByZXR1cm4gY2h1bms7XG59XG5cbi8vIGlmIHdlJ3JlIGFscmVhZHkgd3JpdGluZyBzb21ldGhpbmcsIHRoZW4ganVzdCBwdXQgdGhpc1xuLy8gaW4gdGhlIHF1ZXVlLCBhbmQgd2FpdCBvdXIgdHVybi4gIE90aGVyd2lzZSwgY2FsbCBfd3JpdGVcbi8vIElmIHdlIHJldHVybiBmYWxzZSwgdGhlbiB3ZSBuZWVkIGEgZHJhaW4gZXZlbnQsIHNvIHNldCB0aGF0IGZsYWcuXG5mdW5jdGlvbiB3cml0ZU9yQnVmZmVyKHN0cmVhbSwgc3RhdGUsIGlzQnVmLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGlmICghaXNCdWYpIHtcbiAgICB2YXIgbmV3Q2h1bmsgPSBkZWNvZGVDaHVuayhzdGF0ZSwgY2h1bmssIGVuY29kaW5nKTtcbiAgICBpZiAoY2h1bmsgIT09IG5ld0NodW5rKSB7XG4gICAgICBpc0J1ZiA9IHRydWU7XG4gICAgICBlbmNvZGluZyA9ICdidWZmZXInO1xuICAgICAgY2h1bmsgPSBuZXdDaHVuaztcbiAgICB9XG4gIH1cbiAgdmFyIGxlbiA9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuXG4gIHN0YXRlLmxlbmd0aCArPSBsZW47XG5cbiAgdmFyIHJldCA9IHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcms7XG4gIC8vIHdlIG11c3QgZW5zdXJlIHRoYXQgcHJldmlvdXMgbmVlZERyYWluIHdpbGwgbm90IGJlIHJlc2V0IHRvIGZhbHNlLlxuICBpZiAoIXJldCkgc3RhdGUubmVlZERyYWluID0gdHJ1ZTtcblxuICBpZiAoc3RhdGUud3JpdGluZyB8fCBzdGF0ZS5jb3JrZWQpIHtcbiAgICB2YXIgbGFzdCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IHtcbiAgICAgIGNodW5rOiBjaHVuayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZyxcbiAgICAgIGlzQnVmOiBpc0J1ZixcbiAgICAgIGNhbGxiYWNrOiBjYixcbiAgICAgIG5leHQ6IG51bGxcbiAgICB9O1xuICAgIGlmIChsYXN0KSB7XG4gICAgICBsYXN0Lm5leHQgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3QgPSBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0O1xuICAgIH1cbiAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudCArPSAxO1xuICB9IGVsc2Uge1xuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIHdyaXRldiwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHN0YXRlLndyaXRlbGVuID0gbGVuO1xuICBzdGF0ZS53cml0ZWNiID0gY2I7XG4gIHN0YXRlLndyaXRpbmcgPSB0cnVlO1xuICBzdGF0ZS5zeW5jID0gdHJ1ZTtcbiAgaWYgKHdyaXRldikgc3RyZWFtLl93cml0ZXYoY2h1bmssIHN0YXRlLm9ud3JpdGUpO2Vsc2Ugc3RyZWFtLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIHN0YXRlLm9ud3JpdGUpO1xuICBzdGF0ZS5zeW5jID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpIHtcbiAgLS1zdGF0ZS5wZW5kaW5nY2I7XG5cbiAgaWYgKHN5bmMpIHtcbiAgICAvLyBkZWZlciB0aGUgY2FsbGJhY2sgaWYgd2UgYXJlIGJlaW5nIGNhbGxlZCBzeW5jaHJvbm91c2x5XG4gICAgLy8gdG8gYXZvaWQgcGlsaW5nIHVwIHRoaW5ncyBvbiB0aGUgc3RhY2tcbiAgICBwcm9jZXNzTmV4dFRpY2soY2IsIGVyKTtcbiAgICAvLyB0aGlzIGNhbiBlbWl0IGZpbmlzaCwgYW5kIGl0IHdpbGwgYWx3YXlzIGhhcHBlblxuICAgIC8vIGFmdGVyIGVycm9yXG4gICAgcHJvY2Vzc05leHRUaWNrKGZpbmlzaE1heWJlLCBzdHJlYW0sIHN0YXRlKTtcbiAgICBzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhlIGNhbGxlciBleHBlY3QgdGhpcyB0byBoYXBwZW4gYmVmb3JlIGlmXG4gICAgLy8gaXQgaXMgYXN5bmNcbiAgICBjYihlcik7XG4gICAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICAgIC8vIHRoaXMgY2FuIGVtaXQgZmluaXNoLCBidXQgZmluaXNoIG11c3RcbiAgICAvLyBhbHdheXMgZm9sbG93IGVycm9yXG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKSB7XG4gIHN0YXRlLndyaXRpbmcgPSBmYWxzZTtcbiAgc3RhdGUud3JpdGVjYiA9IG51bGw7XG4gIHN0YXRlLmxlbmd0aCAtPSBzdGF0ZS53cml0ZWxlbjtcbiAgc3RhdGUud3JpdGVsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlKHN0cmVhbSwgZXIpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuICB2YXIgc3luYyA9IHN0YXRlLnN5bmM7XG4gIHZhciBjYiA9IHN0YXRlLndyaXRlY2I7XG5cbiAgb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKTtcblxuICBpZiAoZXIpIG9ud3JpdGVFcnJvcihzdHJlYW0sIHN0YXRlLCBzeW5jLCBlciwgY2IpO2Vsc2Uge1xuICAgIC8vIENoZWNrIGlmIHdlJ3JlIGFjdHVhbGx5IHJlYWR5IHRvIGZpbmlzaCwgYnV0IGRvbid0IGVtaXQgeWV0XG4gICAgdmFyIGZpbmlzaGVkID0gbmVlZEZpbmlzaChzdGF0ZSk7XG5cbiAgICBpZiAoIWZpbmlzaGVkICYmICFzdGF0ZS5jb3JrZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0KSB7XG4gICAgICBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoc3luYykge1xuICAgICAgLyo8cmVwbGFjZW1lbnQ+Ki9cbiAgICAgIGFzeW5jV3JpdGUoYWZ0ZXJXcml0ZSwgc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICAgIC8qPC9yZXBsYWNlbWVudD4qL1xuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKSB7XG4gIGlmICghZmluaXNoZWQpIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKTtcbiAgc3RhdGUucGVuZGluZ2NiLS07XG4gIGNiKCk7XG4gIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG4vLyBNdXN0IGZvcmNlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBvbiBuZXh0VGljaywgc28gdGhhdCB3ZSBkb24ndFxuLy8gZW1pdCAnZHJhaW4nIGJlZm9yZSB0aGUgd3JpdGUoKSBjb25zdW1lciBnZXRzIHRoZSAnZmFsc2UnIHJldHVyblxuLy8gdmFsdWUsIGFuZCBoYXMgYSBjaGFuY2UgdG8gYXR0YWNoIGEgJ2RyYWluJyBsaXN0ZW5lci5cbmZ1bmN0aW9uIG9ud3JpdGVEcmFpbihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUubmVlZERyYWluKSB7XG4gICAgc3RhdGUubmVlZERyYWluID0gZmFsc2U7XG4gICAgc3RyZWFtLmVtaXQoJ2RyYWluJyk7XG4gIH1cbn1cblxuLy8gaWYgdGhlcmUncyBzb21ldGhpbmcgaW4gdGhlIGJ1ZmZlciB3YWl0aW5nLCB0aGVuIHByb2Nlc3MgaXRcbmZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IHRydWU7XG4gIHZhciBlbnRyeSA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdDtcblxuICBpZiAoc3RyZWFtLl93cml0ZXYgJiYgZW50cnkgJiYgZW50cnkubmV4dCkge1xuICAgIC8vIEZhc3QgY2FzZSwgd3JpdGUgZXZlcnl0aGluZyB1c2luZyBfd3JpdGV2KClcbiAgICB2YXIgbCA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50O1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkobCk7XG4gICAgdmFyIGhvbGRlciA9IHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZTtcbiAgICBob2xkZXIuZW50cnkgPSBlbnRyeTtcblxuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIGFsbEJ1ZmZlcnMgPSB0cnVlO1xuICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgYnVmZmVyW2NvdW50XSA9IGVudHJ5O1xuICAgICAgaWYgKCFlbnRyeS5pc0J1ZikgYWxsQnVmZmVycyA9IGZhbHNlO1xuICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gICAgYnVmZmVyLmFsbEJ1ZmZlcnMgPSBhbGxCdWZmZXJzO1xuXG4gICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB0cnVlLCBzdGF0ZS5sZW5ndGgsIGJ1ZmZlciwgJycsIGhvbGRlci5maW5pc2gpO1xuXG4gICAgLy8gZG9Xcml0ZSBpcyBhbG1vc3QgYWx3YXlzIGFzeW5jLCBkZWZlciB0aGVzZSB0byBzYXZlIGEgYml0IG9mIHRpbWVcbiAgICAvLyBhcyB0aGUgaG90IHBhdGggZW5kcyB3aXRoIGRvV3JpdGVcbiAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICBzdGF0ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0ID0gbnVsbDtcbiAgICBpZiAoaG9sZGVyLm5leHQpIHtcbiAgICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGhvbGRlci5uZXh0O1xuICAgICAgaG9sZGVyLm5leHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdChzdGF0ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNsb3cgY2FzZSwgd3JpdGUgY2h1bmtzIG9uZS1ieS1vbmVcbiAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgIHZhciBjaHVuayA9IGVudHJ5LmNodW5rO1xuICAgICAgdmFyIGVuY29kaW5nID0gZW50cnkuZW5jb2Rpbmc7XG4gICAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICAgIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcblxuICAgICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCBmYWxzZSwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgICAgIC8vIGlmIHdlIGRpZG4ndCBjYWxsIHRoZSBvbndyaXRlIGltbWVkaWF0ZWx5LCB0aGVuXG4gICAgICAvLyBpdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBpdCBkb2VzLlxuICAgICAgLy8gYWxzbywgdGhhdCBtZWFucyB0aGF0IHRoZSBjaHVuayBhbmQgY2IgYXJlIGN1cnJlbnRseVxuICAgICAgLy8gYmVpbmcgcHJvY2Vzc2VkLCBzbyBtb3ZlIHRoZSBidWZmZXIgY291bnRlciBwYXN0IHRoZW0uXG4gICAgICBpZiAoc3RhdGUud3JpdGluZykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW50cnkgPT09IG51bGwpIHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB9XG5cbiAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgPSAwO1xuICBzdGF0ZS5idWZmZXJlZFJlcXVlc3QgPSBlbnRyeTtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IGZhbHNlO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgY2IobmV3IEVycm9yKCdfd3JpdGUoKSBpcyBub3QgaW1wbGVtZW50ZWQnKSk7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRldiA9IG51bGw7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmICh0eXBlb2YgY2h1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGNodW5rO1xuICAgIGNodW5rID0gbnVsbDtcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICBpZiAoY2h1bmsgIT09IG51bGwgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCkgdGhpcy53cml0ZShjaHVuaywgZW5jb2RpbmcpO1xuXG4gIC8vIC5lbmQoKSBmdWxseSB1bmNvcmtzXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQgPSAxO1xuICAgIHRoaXMudW5jb3JrKCk7XG4gIH1cblxuICAvLyBpZ25vcmUgdW5uZWNlc3NhcnkgZW5kKCkgY2FsbHMuXG4gIGlmICghc3RhdGUuZW5kaW5nICYmICFzdGF0ZS5maW5pc2hlZCkgZW5kV3JpdGFibGUodGhpcywgc3RhdGUsIGNiKTtcbn07XG5cbmZ1bmN0aW9uIG5lZWRGaW5pc2goc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLmVuZGluZyAmJiBzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID09PSBudWxsICYmICFzdGF0ZS5maW5pc2hlZCAmJiAhc3RhdGUud3JpdGluZztcbn1cbmZ1bmN0aW9uIGNhbGxGaW5hbChzdHJlYW0sIHN0YXRlKSB7XG4gIHN0cmVhbS5fZmluYWwoZnVuY3Rpb24gKGVycikge1xuICAgIHN0YXRlLnBlbmRpbmdjYi0tO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgfVxuICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgncHJlZmluaXNoJyk7XG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcHJlZmluaXNoKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5wcmVmaW5pc2hlZCAmJiAhc3RhdGUuZmluYWxDYWxsZWQpIHtcbiAgICBpZiAodHlwZW9mIHN0cmVhbS5fZmluYWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0YXRlLnBlbmRpbmdjYisrO1xuICAgICAgc3RhdGUuZmluYWxDYWxsZWQgPSB0cnVlO1xuICAgICAgcHJvY2Vzc05leHRUaWNrKGNhbGxGaW5hbCwgc3RyZWFtLCBzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHN0cmVhbS5lbWl0KCdwcmVmaW5pc2gnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbmVlZCA9IG5lZWRGaW5pc2goc3RhdGUpO1xuICBpZiAobmVlZCkge1xuICAgIHByZWZpbmlzaChzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3RhdGUucGVuZGluZ2NiID09PSAwKSB7XG4gICAgICBzdGF0ZS5maW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgnZmluaXNoJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWVkO1xufVxuXG5mdW5jdGlvbiBlbmRXcml0YWJsZShzdHJlYW0sIHN0YXRlLCBjYikge1xuICBzdGF0ZS5lbmRpbmcgPSB0cnVlO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbiAgaWYgKGNiKSB7XG4gICAgaWYgKHN0YXRlLmZpbmlzaGVkKSBwcm9jZXNzTmV4dFRpY2soY2IpO2Vsc2Ugc3RyZWFtLm9uY2UoJ2ZpbmlzaCcsIGNiKTtcbiAgfVxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG4gIHN0cmVhbS53cml0YWJsZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbkNvcmtlZEZpbmlzaChjb3JrUmVxLCBzdGF0ZSwgZXJyKSB7XG4gIHZhciBlbnRyeSA9IGNvcmtSZXEuZW50cnk7XG4gIGNvcmtSZXEuZW50cnkgPSBudWxsO1xuICB3aGlsZSAoZW50cnkpIHtcbiAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICBzdGF0ZS5wZW5kaW5nY2ItLTtcbiAgICBjYihlcnIpO1xuICAgIGVudHJ5ID0gZW50cnkubmV4dDtcbiAgfVxuICBpZiAoc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlKSB7XG4gICAgc3RhdGUuY29ya2VkUmVxdWVzdHNGcmVlLm5leHQgPSBjb3JrUmVxO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGNvcmtSZXE7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICghdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICB9XG59KTtcblxuV3JpdGFibGUucHJvdG90eXBlLmRlc3Ryb3kgPSBkZXN0cm95SW1wbC5kZXN0cm95O1xuV3JpdGFibGUucHJvdG90eXBlLl91bmRlc3Ryb3kgPSBkZXN0cm95SW1wbC51bmRlc3Ryb3k7XG5Xcml0YWJsZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICB0aGlzLmVuZCgpO1xuICBjYihlcnIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcHJvY2Vzc05leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRhYmxlO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBEdXBsZXg7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuUmVhZGFibGUuUmVhZGFibGVTdGF0ZSA9IFJlYWRhYmxlU3RhdGU7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbnZhciBFRWxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbiAoZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lcnModHlwZSkubGVuZ3RoO1xufTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIFN0cmVhbSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9zdHJlYW0nKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vLyBUT0RPKGJtZXVyZXIpOiBDaGFuZ2UgdGhpcyBiYWNrIHRvIGNvbnN0IG9uY2UgaG9sZSBjaGVja3MgYXJlXG4vLyBwcm9wZXJseSBvcHRpbWl6ZWQgYXdheSBlYXJseSBpbiBJZ25pdGlvbitUdXJib0Zhbi5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgT3VyVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5IHx8IGZ1bmN0aW9uICgpIHt9O1xuZnVuY3Rpb24gX3VpbnQ4QXJyYXlUb0J1ZmZlcihjaHVuaykge1xuICByZXR1cm4gQnVmZmVyLmZyb20oY2h1bmspO1xufVxuZnVuY3Rpb24gX2lzVWludDhBcnJheShvYmopIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IG9iaiBpbnN0YW5jZW9mIE91clVpbnQ4QXJyYXk7XG59XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIGRlYnVnVXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBkZWJ1ZyA9IHZvaWQgMDtcbmlmIChkZWJ1Z1V0aWwgJiYgZGVidWdVdGlsLmRlYnVnbG9nKSB7XG4gIGRlYnVnID0gZGVidWdVdGlsLmRlYnVnbG9nKCdzdHJlYW0nKTtcbn0gZWxzZSB7XG4gIGRlYnVnID0gZnVuY3Rpb24gKCkge307XG59XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIEJ1ZmZlckxpc3QgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvQnVmZmVyTGlzdCcpO1xudmFyIGRlc3Ryb3lJbXBsID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3knKTtcbnZhciBTdHJpbmdEZWNvZGVyO1xuXG51dGlsLmluaGVyaXRzKFJlYWRhYmxlLCBTdHJlYW0pO1xuXG52YXIga1Byb3h5RXZlbnRzID0gWydlcnJvcicsICdjbG9zZScsICdkZXN0cm95JywgJ3BhdXNlJywgJ3Jlc3VtZSddO1xuXG5mdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuKSB7XG4gIC8vIFNhZGx5IHRoaXMgaXMgbm90IGNhY2hlYWJsZSBhcyBzb21lIGxpYnJhcmllcyBidW5kbGUgdGhlaXIgb3duXG4gIC8vIGV2ZW50IGVtaXR0ZXIgaW1wbGVtZW50YXRpb24gd2l0aCB0aGVtLlxuICBpZiAodHlwZW9mIGVtaXR0ZXIucHJlcGVuZExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIucHJlcGVuZExpc3RlbmVyKGV2ZW50LCBmbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBpcyBhIGhhY2sgdG8gbWFrZSBzdXJlIHRoYXQgb3VyIGVycm9yIGhhbmRsZXIgaXMgYXR0YWNoZWQgYmVmb3JlIGFueVxuICAgIC8vIHVzZXJsYW5kIG9uZXMuICBORVZFUiBETyBUSElTLiBUaGlzIGlzIGhlcmUgb25seSBiZWNhdXNlIHRoaXMgY29kZSBuZWVkc1xuICAgIC8vIHRvIGNvbnRpbnVlIHRvIHdvcmsgd2l0aCBvbGRlciB2ZXJzaW9ucyBvZiBOb2RlLmpzIHRoYXQgZG8gbm90IGluY2x1ZGVcbiAgICAvLyB0aGUgcHJlcGVuZExpc3RlbmVyKCkgbWV0aG9kLiBUaGUgZ29hbCBpcyB0byBldmVudHVhbGx5IHJlbW92ZSB0aGlzIGhhY2suXG4gICAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1tldmVudF0pIGVtaXR0ZXIub24oZXZlbnQsIGZuKTtlbHNlIGlmIChpc0FycmF5KGVtaXR0ZXIuX2V2ZW50c1tldmVudF0pKSBlbWl0dGVyLl9ldmVudHNbZXZlbnRdLnVuc2hpZnQoZm4pO2Vsc2UgZW1pdHRlci5fZXZlbnRzW2V2ZW50XSA9IFtmbiwgZW1pdHRlci5fZXZlbnRzW2V2ZW50XV07XG4gIH1cbn1cblxuZnVuY3Rpb24gUmVhZGFibGVTdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyBvYmplY3Qgc3RyZWFtIGZsYWcuIFVzZWQgdG8gbWFrZSByZWFkKG4pIGlnbm9yZSBuIGFuZCB0b1xuICAvLyBtYWtlIGFsbCB0aGUgYnVmZmVyIG1lcmdpbmcgYW5kIGxlbmd0aCBjaGVja3MgZ28gYXdheVxuICB0aGlzLm9iamVjdE1vZGUgPSAhIW9wdGlvbnMub2JqZWN0TW9kZTtcblxuICBpZiAoc3RyZWFtIGluc3RhbmNlb2YgRHVwbGV4KSB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLnJlYWRhYmxlT2JqZWN0TW9kZTtcblxuICAvLyB0aGUgcG9pbnQgYXQgd2hpY2ggaXQgc3RvcHMgY2FsbGluZyBfcmVhZCgpIHRvIGZpbGwgdGhlIGJ1ZmZlclxuICAvLyBOb3RlOiAwIGlzIGEgdmFsaWQgdmFsdWUsIG1lYW5zIFwiZG9uJ3QgY2FsbCBfcmVhZCBwcmVlbXB0aXZlbHkgZXZlclwiXG4gIHZhciBod20gPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gIHZhciBkZWZhdWx0SHdtID0gdGhpcy5vYmplY3RNb2RlID8gMTYgOiAxNiAqIDEwMjQ7XG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IGh3bSB8fCBod20gPT09IDAgPyBod20gOiBkZWZhdWx0SHdtO1xuXG4gIC8vIGNhc3QgdG8gaW50cy5cbiAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gTWF0aC5mbG9vcih0aGlzLmhpZ2hXYXRlck1hcmspO1xuXG4gIC8vIEEgbGlua2VkIGxpc3QgaXMgdXNlZCB0byBzdG9yZSBkYXRhIGNodW5rcyBpbnN0ZWFkIG9mIGFuIGFycmF5IGJlY2F1c2UgdGhlXG4gIC8vIGxpbmtlZCBsaXN0IGNhbiByZW1vdmUgZWxlbWVudHMgZnJvbSB0aGUgYmVnaW5uaW5nIGZhc3RlciB0aGFuXG4gIC8vIGFycmF5LnNoaWZ0KClcbiAgdGhpcy5idWZmZXIgPSBuZXcgQnVmZmVyTGlzdCgpO1xuICB0aGlzLmxlbmd0aCA9IDA7XG4gIHRoaXMucGlwZXMgPSBudWxsO1xuICB0aGlzLnBpcGVzQ291bnQgPSAwO1xuICB0aGlzLmZsb3dpbmcgPSBudWxsO1xuICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gIHRoaXMuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB0aGlzLnJlYWRpbmcgPSBmYWxzZTtcblxuICAvLyBhIGZsYWcgdG8gYmUgYWJsZSB0byB0ZWxsIGlmIHRoZSBldmVudCAncmVhZGFibGUnLydkYXRhJyBpcyBlbWl0dGVkXG4gIC8vIGltbWVkaWF0ZWx5LCBvciBvbiBhIGxhdGVyIHRpY2suICBXZSBzZXQgdGhpcyB0byB0cnVlIGF0IGZpcnN0LCBiZWNhdXNlXG4gIC8vIGFueSBhY3Rpb25zIHRoYXQgc2hvdWxkbid0IGhhcHBlbiB1bnRpbCBcImxhdGVyXCIgc2hvdWxkIGdlbmVyYWxseSBhbHNvXG4gIC8vIG5vdCBoYXBwZW4gYmVmb3JlIHRoZSBmaXJzdCByZWFkIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gd2hlbmV2ZXIgd2UgcmV0dXJuIG51bGwsIHRoZW4gd2Ugc2V0IGEgZmxhZyB0byBzYXlcbiAgLy8gdGhhdCB3ZSdyZSBhd2FpdGluZyBhICdyZWFkYWJsZScgZXZlbnQgZW1pc3Npb24uXG4gIHRoaXMubmVlZFJlYWRhYmxlID0gZmFsc2U7XG4gIHRoaXMuZW1pdHRlZFJlYWRhYmxlID0gZmFsc2U7XG4gIHRoaXMucmVhZGFibGVMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgdGhpcy5yZXN1bWVTY2hlZHVsZWQgPSBmYWxzZTtcblxuICAvLyBoYXMgaXQgYmVlbiBkZXN0cm95ZWRcbiAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyB0aGUgbnVtYmVyIG9mIHdyaXRlcnMgdGhhdCBhcmUgYXdhaXRpbmcgYSBkcmFpbiBldmVudCBpbiAucGlwZSgpc1xuICB0aGlzLmF3YWl0RHJhaW4gPSAwO1xuXG4gIC8vIGlmIHRydWUsIGEgbWF5YmVSZWFkTW9yZSBoYXMgYmVlbiBzY2hlZHVsZWRcbiAgdGhpcy5yZWFkaW5nTW9yZSA9IGZhbHNlO1xuXG4gIHRoaXMuZGVjb2RlciA9IG51bGw7XG4gIHRoaXMuZW5jb2RpbmcgPSBudWxsO1xuICBpZiAob3B0aW9ucy5lbmNvZGluZykge1xuICAgIGlmICghU3RyaW5nRGVjb2RlcikgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyLycpLlN0cmluZ0RlY29kZXI7XG4gICAgdGhpcy5kZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIob3B0aW9ucy5lbmNvZGluZyk7XG4gICAgdGhpcy5lbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gIH1cbn1cblxuZnVuY3Rpb24gUmVhZGFibGUob3B0aW9ucykge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZWFkYWJsZSkpIHJldHVybiBuZXcgUmVhZGFibGUob3B0aW9ucyk7XG5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZSA9IG5ldyBSZWFkYWJsZVN0YXRlKG9wdGlvbnMsIHRoaXMpO1xuXG4gIC8vIGxlZ2FjeVxuICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZWFkID09PSAnZnVuY3Rpb24nKSB0aGlzLl9yZWFkID0gb3B0aW9ucy5yZWFkO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHRoaXMuX2Rlc3Ryb3kgPSBvcHRpb25zLmRlc3Ryb3k7XG4gIH1cblxuICBTdHJlYW0uY2FsbCh0aGlzKTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlLnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICghdGhpcy5fcmVhZGFibGVTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoZSB1c2VyIGlzIGV4cGxpY2l0bHlcbiAgICAvLyBtYW5hZ2luZyBkZXN0cm95ZWRcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICB9XG59KTtcblxuUmVhZGFibGUucHJvdG90eXBlLmRlc3Ryb3kgPSBkZXN0cm95SW1wbC5kZXN0cm95O1xuUmVhZGFibGUucHJvdG90eXBlLl91bmRlc3Ryb3kgPSBkZXN0cm95SW1wbC51bmRlc3Ryb3k7XG5SZWFkYWJsZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICB0aGlzLnB1c2gobnVsbCk7XG4gIGNiKGVycik7XG59O1xuXG4vLyBNYW51YWxseSBzaG92ZSBzb21ldGhpbmcgaW50byB0aGUgcmVhZCgpIGJ1ZmZlci5cbi8vIFRoaXMgcmV0dXJucyB0cnVlIGlmIHRoZSBoaWdoV2F0ZXJNYXJrIGhhcyBub3QgYmVlbiBoaXQgeWV0LFxuLy8gc2ltaWxhciB0byBob3cgV3JpdGFibGUud3JpdGUoKSByZXR1cm5zIHRydWUgaWYgeW91IHNob3VsZFxuLy8gd3JpdGUoKSBzb21lIG1vcmUuXG5SZWFkYWJsZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcpIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHNraXBDaHVua0NoZWNrO1xuXG4gIGlmICghc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGlmICh0eXBlb2YgY2h1bmsgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuY29kaW5nIHx8IHN0YXRlLmRlZmF1bHRFbmNvZGluZztcbiAgICAgIGlmIChlbmNvZGluZyAhPT0gc3RhdGUuZW5jb2RpbmcpIHtcbiAgICAgICAgY2h1bmsgPSBCdWZmZXIuZnJvbShjaHVuaywgZW5jb2RpbmcpO1xuICAgICAgICBlbmNvZGluZyA9ICcnO1xuICAgICAgfVxuICAgICAgc2tpcENodW5rQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBza2lwQ2h1bmtDaGVjayA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gcmVhZGFibGVBZGRDaHVuayh0aGlzLCBjaHVuaywgZW5jb2RpbmcsIGZhbHNlLCBza2lwQ2h1bmtDaGVjayk7XG59O1xuXG4vLyBVbnNoaWZ0IHNob3VsZCAqYWx3YXlzKiBiZSBzb21ldGhpbmcgZGlyZWN0bHkgb3V0IG9mIHJlYWQoKVxuUmVhZGFibGUucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgcmV0dXJuIHJlYWRhYmxlQWRkQ2h1bmsodGhpcywgY2h1bmssIG51bGwsIHRydWUsIGZhbHNlKTtcbn07XG5cbmZ1bmN0aW9uIHJlYWRhYmxlQWRkQ2h1bmsoc3RyZWFtLCBjaHVuaywgZW5jb2RpbmcsIGFkZFRvRnJvbnQsIHNraXBDaHVua0NoZWNrKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGVyO1xuICAgIGlmICghc2tpcENodW5rQ2hlY2spIGVyID0gY2h1bmtJbnZhbGlkKHN0YXRlLCBjaHVuayk7XG4gICAgaWYgKGVyKSB7XG4gICAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5vYmplY3RNb2RlIHx8IGNodW5rICYmIGNodW5rLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0eXBlb2YgY2h1bmsgIT09ICdzdHJpbmcnICYmICFzdGF0ZS5vYmplY3RNb2RlICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihjaHVuaykgIT09IEJ1ZmZlci5wcm90b3R5cGUpIHtcbiAgICAgICAgY2h1bmsgPSBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFkZFRvRnJvbnQpIHtcbiAgICAgICAgaWYgKHN0YXRlLmVuZEVtaXR0ZWQpIHN0cmVhbS5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignc3RyZWFtLnVuc2hpZnQoKSBhZnRlciBlbmQgZXZlbnQnKSk7ZWxzZSBhZGRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmVuZGVkKSB7XG4gICAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignc3RyZWFtLnB1c2goKSBhZnRlciBFT0YnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChzdGF0ZS5kZWNvZGVyICYmICFlbmNvZGluZykge1xuICAgICAgICAgIGNodW5rID0gc3RhdGUuZGVjb2Rlci53cml0ZShjaHVuayk7XG4gICAgICAgICAgaWYgKHN0YXRlLm9iamVjdE1vZGUgfHwgY2h1bmsubGVuZ3RoICE9PSAwKSBhZGRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgZmFsc2UpO2Vsc2UgbWF5YmVSZWFkTW9yZShzdHJlYW0sIHN0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghYWRkVG9Gcm9udCkge1xuICAgICAgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZWVkTW9yZURhdGEoc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBhZGRDaHVuayhzdHJlYW0sIHN0YXRlLCBjaHVuaywgYWRkVG9Gcm9udCkge1xuICBpZiAoc3RhdGUuZmxvd2luZyAmJiBzdGF0ZS5sZW5ndGggPT09IDAgJiYgIXN0YXRlLnN5bmMpIHtcbiAgICBzdHJlYW0uZW1pdCgnZGF0YScsIGNodW5rKTtcbiAgICBzdHJlYW0ucmVhZCgwKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB1cGRhdGUgdGhlIGJ1ZmZlciBpbmZvLlxuICAgIHN0YXRlLmxlbmd0aCArPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICBpZiAoYWRkVG9Gcm9udCkgc3RhdGUuYnVmZmVyLnVuc2hpZnQoY2h1bmspO2Vsc2Ugc3RhdGUuYnVmZmVyLnB1c2goY2h1bmspO1xuXG4gICAgaWYgKHN0YXRlLm5lZWRSZWFkYWJsZSkgZW1pdFJlYWRhYmxlKHN0cmVhbSk7XG4gIH1cbiAgbWF5YmVSZWFkTW9yZShzdHJlYW0sIHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2h1bmtJbnZhbGlkKHN0YXRlLCBjaHVuaykge1xuICB2YXIgZXI7XG4gIGlmICghX2lzVWludDhBcnJheShjaHVuaykgJiYgdHlwZW9mIGNodW5rICE9PSAnc3RyaW5nJyAmJiBjaHVuayAhPT0gdW5kZWZpbmVkICYmICFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG5vbi1zdHJpbmcvYnVmZmVyIGNodW5rJyk7XG4gIH1cbiAgcmV0dXJuIGVyO1xufVxuXG4vLyBpZiBpdCdzIHBhc3QgdGhlIGhpZ2ggd2F0ZXIgbWFyaywgd2UgY2FuIHB1c2ggaW4gc29tZSBtb3JlLlxuLy8gQWxzbywgaWYgd2UgaGF2ZSBubyBkYXRhIHlldCwgd2UgY2FuIHN0YW5kIHNvbWVcbi8vIG1vcmUgYnl0ZXMuICBUaGlzIGlzIHRvIHdvcmsgYXJvdW5kIGNhc2VzIHdoZXJlIGh3bT0wLFxuLy8gc3VjaCBhcyB0aGUgcmVwbC4gIEFsc28sIGlmIHRoZSBwdXNoKCkgdHJpZ2dlcmVkIGFcbi8vIHJlYWRhYmxlIGV2ZW50LCBhbmQgdGhlIHVzZXIgY2FsbGVkIHJlYWQobGFyZ2VOdW1iZXIpIHN1Y2ggdGhhdFxuLy8gbmVlZFJlYWRhYmxlIHdhcyBzZXQsIHRoZW4gd2Ugb3VnaHQgdG8gcHVzaCBtb3JlLCBzbyB0aGF0IGFub3RoZXJcbi8vICdyZWFkYWJsZScgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQuXG5mdW5jdGlvbiBuZWVkTW9yZURhdGEoc3RhdGUpIHtcbiAgcmV0dXJuICFzdGF0ZS5lbmRlZCAmJiAoc3RhdGUubmVlZFJlYWRhYmxlIHx8IHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcmsgfHwgc3RhdGUubGVuZ3RoID09PSAwKTtcbn1cblxuUmVhZGFibGUucHJvdG90eXBlLmlzUGF1c2VkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nID09PSBmYWxzZTtcbn07XG5cbi8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuUmVhZGFibGUucHJvdG90eXBlLnNldEVuY29kaW5nID0gZnVuY3Rpb24gKGVuYykge1xuICBpZiAoIVN0cmluZ0RlY29kZXIpIFN0cmluZ0RlY29kZXIgPSByZXF1aXJlKCdzdHJpbmdfZGVjb2Rlci8nKS5TdHJpbmdEZWNvZGVyO1xuICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihlbmMpO1xuICB0aGlzLl9yZWFkYWJsZVN0YXRlLmVuY29kaW5nID0gZW5jO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIERvbid0IHJhaXNlIHRoZSBod20gPiA4TUJcbnZhciBNQVhfSFdNID0gMHg4MDAwMDA7XG5mdW5jdGlvbiBjb21wdXRlTmV3SGlnaFdhdGVyTWFyayhuKSB7XG4gIGlmIChuID49IE1BWF9IV00pIHtcbiAgICBuID0gTUFYX0hXTTtcbiAgfSBlbHNlIHtcbiAgICAvLyBHZXQgdGhlIG5leHQgaGlnaGVzdCBwb3dlciBvZiAyIHRvIHByZXZlbnQgaW5jcmVhc2luZyBod20gZXhjZXNzaXZlbHkgaW5cbiAgICAvLyB0aW55IGFtb3VudHNcbiAgICBuLS07XG4gICAgbiB8PSBuID4+PiAxO1xuICAgIG4gfD0gbiA+Pj4gMjtcbiAgICBuIHw9IG4gPj4+IDQ7XG4gICAgbiB8PSBuID4+PiA4O1xuICAgIG4gfD0gbiA+Pj4gMTY7XG4gICAgbisrO1xuICB9XG4gIHJldHVybiBuO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGhvd011Y2hUb1JlYWQobiwgc3RhdGUpIHtcbiAgaWYgKG4gPD0gMCB8fCBzdGF0ZS5sZW5ndGggPT09IDAgJiYgc3RhdGUuZW5kZWQpIHJldHVybiAwO1xuICBpZiAoc3RhdGUub2JqZWN0TW9kZSkgcmV0dXJuIDE7XG4gIGlmIChuICE9PSBuKSB7XG4gICAgLy8gT25seSBmbG93IG9uZSBidWZmZXIgYXQgYSB0aW1lXG4gICAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgc3RhdGUubGVuZ3RoKSByZXR1cm4gc3RhdGUuYnVmZmVyLmhlYWQuZGF0YS5sZW5ndGg7ZWxzZSByZXR1cm4gc3RhdGUubGVuZ3RoO1xuICB9XG4gIC8vIElmIHdlJ3JlIGFza2luZyBmb3IgbW9yZSB0aGFuIHRoZSBjdXJyZW50IGh3bSwgdGhlbiByYWlzZSB0aGUgaHdtLlxuICBpZiAobiA+IHN0YXRlLmhpZ2hXYXRlck1hcmspIHN0YXRlLmhpZ2hXYXRlck1hcmsgPSBjb21wdXRlTmV3SGlnaFdhdGVyTWFyayhuKTtcbiAgaWYgKG4gPD0gc3RhdGUubGVuZ3RoKSByZXR1cm4gbjtcbiAgLy8gRG9uJ3QgaGF2ZSBlbm91Z2hcbiAgaWYgKCFzdGF0ZS5lbmRlZCkge1xuICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIHN0YXRlLmxlbmd0aDtcbn1cblxuLy8geW91IGNhbiBvdmVycmlkZSBlaXRoZXIgdGhpcyBtZXRob2QsIG9yIHRoZSBhc3luYyBfcmVhZChuKSBiZWxvdy5cblJlYWRhYmxlLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgZGVidWcoJ3JlYWQnLCBuKTtcbiAgbiA9IHBhcnNlSW50KG4sIDEwKTtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIG5PcmlnID0gbjtcblxuICBpZiAobiAhPT0gMCkgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gZmFsc2U7XG5cbiAgLy8gaWYgd2UncmUgZG9pbmcgcmVhZCgwKSB0byB0cmlnZ2VyIGEgcmVhZGFibGUgZXZlbnQsIGJ1dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYSBidW5jaCBvZiBkYXRhIGluIHRoZSBidWZmZXIsIHRoZW4ganVzdCB0cmlnZ2VyXG4gIC8vIHRoZSAncmVhZGFibGUnIGV2ZW50IGFuZCBtb3ZlIG9uLlxuICBpZiAobiA9PT0gMCAmJiBzdGF0ZS5uZWVkUmVhZGFibGUgJiYgKHN0YXRlLmxlbmd0aCA+PSBzdGF0ZS5oaWdoV2F0ZXJNYXJrIHx8IHN0YXRlLmVuZGVkKSkge1xuICAgIGRlYnVnKCdyZWFkOiBlbWl0UmVhZGFibGUnLCBzdGF0ZS5sZW5ndGgsIHN0YXRlLmVuZGVkKTtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmVuZGVkKSBlbmRSZWFkYWJsZSh0aGlzKTtlbHNlIGVtaXRSZWFkYWJsZSh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG4gPSBob3dNdWNoVG9SZWFkKG4sIHN0YXRlKTtcblxuICAvLyBpZiB3ZSd2ZSBlbmRlZCwgYW5kIHdlJ3JlIG5vdyBjbGVhciwgdGhlbiBmaW5pc2ggaXQgdXAuXG4gIGlmIChuID09PSAwICYmIHN0YXRlLmVuZGVkKSB7XG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgZW5kUmVhZGFibGUodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBBbGwgdGhlIGFjdHVhbCBjaHVuayBnZW5lcmF0aW9uIGxvZ2ljIG5lZWRzIHRvIGJlXG4gIC8vICpiZWxvdyogdGhlIGNhbGwgdG8gX3JlYWQuICBUaGUgcmVhc29uIGlzIHRoYXQgaW4gY2VydGFpblxuICAvLyBzeW50aGV0aWMgc3RyZWFtIGNhc2VzLCBzdWNoIGFzIHBhc3N0aHJvdWdoIHN0cmVhbXMsIF9yZWFkXG4gIC8vIG1heSBiZSBhIGNvbXBsZXRlbHkgc3luY2hyb25vdXMgb3BlcmF0aW9uIHdoaWNoIG1heSBjaGFuZ2VcbiAgLy8gdGhlIHN0YXRlIG9mIHRoZSByZWFkIGJ1ZmZlciwgcHJvdmlkaW5nIGVub3VnaCBkYXRhIHdoZW5cbiAgLy8gYmVmb3JlIHRoZXJlIHdhcyAqbm90KiBlbm91Z2guXG4gIC8vXG4gIC8vIFNvLCB0aGUgc3RlcHMgYXJlOlxuICAvLyAxLiBGaWd1cmUgb3V0IHdoYXQgdGhlIHN0YXRlIG9mIHRoaW5ncyB3aWxsIGJlIGFmdGVyIHdlIGRvXG4gIC8vIGEgcmVhZCBmcm9tIHRoZSBidWZmZXIuXG4gIC8vXG4gIC8vIDIuIElmIHRoYXQgcmVzdWx0aW5nIHN0YXRlIHdpbGwgdHJpZ2dlciBhIF9yZWFkLCB0aGVuIGNhbGwgX3JlYWQuXG4gIC8vIE5vdGUgdGhhdCB0aGlzIG1heSBiZSBhc3luY2hyb25vdXMsIG9yIHN5bmNocm9ub3VzLiAgWWVzLCBpdCBpc1xuICAvLyBkZWVwbHkgdWdseSB0byB3cml0ZSBBUElzIHRoaXMgd2F5LCBidXQgdGhhdCBzdGlsbCBkb2Vzbid0IG1lYW5cbiAgLy8gdGhhdCB0aGUgUmVhZGFibGUgY2xhc3Mgc2hvdWxkIGJlaGF2ZSBpbXByb3Blcmx5LCBhcyBzdHJlYW1zIGFyZVxuICAvLyBkZXNpZ25lZCB0byBiZSBzeW5jL2FzeW5jIGFnbm9zdGljLlxuICAvLyBUYWtlIG5vdGUgaWYgdGhlIF9yZWFkIGNhbGwgaXMgc3luYyBvciBhc3luYyAoaWUsIGlmIHRoZSByZWFkIGNhbGxcbiAgLy8gaGFzIHJldHVybmVkIHlldCksIHNvIHRoYXQgd2Uga25vdyB3aGV0aGVyIG9yIG5vdCBpdCdzIHNhZmUgdG8gZW1pdFxuICAvLyAncmVhZGFibGUnIGV0Yy5cbiAgLy9cbiAgLy8gMy4gQWN0dWFsbHkgcHVsbCB0aGUgcmVxdWVzdGVkIGNodW5rcyBvdXQgb2YgdGhlIGJ1ZmZlciBhbmQgcmV0dXJuLlxuXG4gIC8vIGlmIHdlIG5lZWQgYSByZWFkYWJsZSBldmVudCwgdGhlbiB3ZSBuZWVkIHRvIGRvIHNvbWUgcmVhZGluZy5cbiAgdmFyIGRvUmVhZCA9IHN0YXRlLm5lZWRSZWFkYWJsZTtcbiAgZGVidWcoJ25lZWQgcmVhZGFibGUnLCBkb1JlYWQpO1xuXG4gIC8vIGlmIHdlIGN1cnJlbnRseSBoYXZlIGxlc3MgdGhhbiB0aGUgaGlnaFdhdGVyTWFyaywgdGhlbiBhbHNvIHJlYWQgc29tZVxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwIHx8IHN0YXRlLmxlbmd0aCAtIG4gPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgZG9SZWFkID0gdHJ1ZTtcbiAgICBkZWJ1ZygnbGVuZ3RoIGxlc3MgdGhhbiB3YXRlcm1hcmsnLCBkb1JlYWQpO1xuICB9XG5cbiAgLy8gaG93ZXZlciwgaWYgd2UndmUgZW5kZWQsIHRoZW4gdGhlcmUncyBubyBwb2ludCwgYW5kIGlmIHdlJ3JlIGFscmVhZHlcbiAgLy8gcmVhZGluZywgdGhlbiBpdCdzIHVubmVjZXNzYXJ5LlxuICBpZiAoc3RhdGUuZW5kZWQgfHwgc3RhdGUucmVhZGluZykge1xuICAgIGRvUmVhZCA9IGZhbHNlO1xuICAgIGRlYnVnKCdyZWFkaW5nIG9yIGVuZGVkJywgZG9SZWFkKTtcbiAgfSBlbHNlIGlmIChkb1JlYWQpIHtcbiAgICBkZWJ1ZygnZG8gcmVhZCcpO1xuICAgIHN0YXRlLnJlYWRpbmcgPSB0cnVlO1xuICAgIHN0YXRlLnN5bmMgPSB0cnVlO1xuICAgIC8vIGlmIHRoZSBsZW5ndGggaXMgY3VycmVudGx5IHplcm8sIHRoZW4gd2UgKm5lZWQqIGEgcmVhZGFibGUgZXZlbnQuXG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAvLyBjYWxsIGludGVybmFsIHJlYWQgbWV0aG9kXG4gICAgdGhpcy5fcmVhZChzdGF0ZS5oaWdoV2F0ZXJNYXJrKTtcbiAgICBzdGF0ZS5zeW5jID0gZmFsc2U7XG4gICAgLy8gSWYgX3JlYWQgcHVzaGVkIGRhdGEgc3luY2hyb25vdXNseSwgdGhlbiBgcmVhZGluZ2Agd2lsbCBiZSBmYWxzZSxcbiAgICAvLyBhbmQgd2UgbmVlZCB0byByZS1ldmFsdWF0ZSBob3cgbXVjaCBkYXRhIHdlIGNhbiByZXR1cm4gdG8gdGhlIHVzZXIuXG4gICAgaWYgKCFzdGF0ZS5yZWFkaW5nKSBuID0gaG93TXVjaFRvUmVhZChuT3JpZywgc3RhdGUpO1xuICB9XG5cbiAgdmFyIHJldDtcbiAgaWYgKG4gPiAwKSByZXQgPSBmcm9tTGlzdChuLCBzdGF0ZSk7ZWxzZSByZXQgPSBudWxsO1xuXG4gIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIG4gPSAwO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmxlbmd0aCAtPSBuO1xuICB9XG5cbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIElmIHdlIGhhdmUgbm90aGluZyBpbiB0aGUgYnVmZmVyLCB0aGVuIHdlIHdhbnQgdG8ga25vd1xuICAgIC8vIGFzIHNvb24gYXMgd2UgKmRvKiBnZXQgc29tZXRoaW5nIGludG8gdGhlIGJ1ZmZlci5cbiAgICBpZiAoIXN0YXRlLmVuZGVkKSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuXG4gICAgLy8gSWYgd2UgdHJpZWQgdG8gcmVhZCgpIHBhc3QgdGhlIEVPRiwgdGhlbiBlbWl0IGVuZCBvbiB0aGUgbmV4dCB0aWNrLlxuICAgIGlmIChuT3JpZyAhPT0gbiAmJiBzdGF0ZS5lbmRlZCkgZW5kUmVhZGFibGUodGhpcyk7XG4gIH1cblxuICBpZiAocmV0ICE9PSBudWxsKSB0aGlzLmVtaXQoJ2RhdGEnLCByZXQpO1xuXG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBvbkVvZkNodW5rKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmVuZGVkKSByZXR1cm47XG4gIGlmIChzdGF0ZS5kZWNvZGVyKSB7XG4gICAgdmFyIGNodW5rID0gc3RhdGUuZGVjb2Rlci5lbmQoKTtcbiAgICBpZiAoY2h1bmsgJiYgY2h1bmsubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5idWZmZXIucHVzaChjaHVuayk7XG4gICAgICBzdGF0ZS5sZW5ndGggKz0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG4gICAgfVxuICB9XG4gIHN0YXRlLmVuZGVkID0gdHJ1ZTtcblxuICAvLyBlbWl0ICdyZWFkYWJsZScgbm93IHRvIG1ha2Ugc3VyZSBpdCBnZXRzIHBpY2tlZCB1cC5cbiAgZW1pdFJlYWRhYmxlKHN0cmVhbSk7XG59XG5cbi8vIERvbid0IGVtaXQgcmVhZGFibGUgcmlnaHQgYXdheSBpbiBzeW5jIG1vZGUsIGJlY2F1c2UgdGhpcyBjYW4gdHJpZ2dlclxuLy8gYW5vdGhlciByZWFkKCkgY2FsbCA9PiBzdGFjayBvdmVyZmxvdy4gIFRoaXMgd2F5LCBpdCBtaWdodCB0cmlnZ2VyXG4vLyBhIG5leHRUaWNrIHJlY3Vyc2lvbiB3YXJuaW5nLCBidXQgdGhhdCdzIG5vdCBzbyBiYWQuXG5mdW5jdGlvbiBlbWl0UmVhZGFibGUoc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgc3RhdGUubmVlZFJlYWRhYmxlID0gZmFsc2U7XG4gIGlmICghc3RhdGUuZW1pdHRlZFJlYWRhYmxlKSB7XG4gICAgZGVidWcoJ2VtaXRSZWFkYWJsZScsIHN0YXRlLmZsb3dpbmcpO1xuICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgaWYgKHN0YXRlLnN5bmMpIHByb2Nlc3NOZXh0VGljayhlbWl0UmVhZGFibGVfLCBzdHJlYW0pO2Vsc2UgZW1pdFJlYWRhYmxlXyhzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRSZWFkYWJsZV8oc3RyZWFtKSB7XG4gIGRlYnVnKCdlbWl0IHJlYWRhYmxlJyk7XG4gIHN0cmVhbS5lbWl0KCdyZWFkYWJsZScpO1xuICBmbG93KHN0cmVhbSk7XG59XG5cbi8vIGF0IHRoaXMgcG9pbnQsIHRoZSB1c2VyIGhhcyBwcmVzdW1hYmx5IHNlZW4gdGhlICdyZWFkYWJsZScgZXZlbnQsXG4vLyBhbmQgY2FsbGVkIHJlYWQoKSB0byBjb25zdW1lIHNvbWUgZGF0YS4gIHRoYXQgbWF5IGhhdmUgdHJpZ2dlcmVkXG4vLyBpbiB0dXJuIGFub3RoZXIgX3JlYWQobikgY2FsbCwgaW4gd2hpY2ggY2FzZSByZWFkaW5nID0gdHJ1ZSBpZlxuLy8gaXQncyBpbiBwcm9ncmVzcy5cbi8vIEhvd2V2ZXIsIGlmIHdlJ3JlIG5vdCBlbmRlZCwgb3IgcmVhZGluZywgYW5kIHRoZSBsZW5ndGggPCBod20sXG4vLyB0aGVuIGdvIGFoZWFkIGFuZCB0cnkgdG8gcmVhZCBzb21lIG1vcmUgcHJlZW1wdGl2ZWx5LlxuZnVuY3Rpb24gbWF5YmVSZWFkTW9yZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVhZGluZ01vcmUpIHtcbiAgICBzdGF0ZS5yZWFkaW5nTW9yZSA9IHRydWU7XG4gICAgcHJvY2Vzc05leHRUaWNrKG1heWJlUmVhZE1vcmVfLCBzdHJlYW0sIHN0YXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXliZVJlYWRNb3JlXyhzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBsZW4gPSBzdGF0ZS5sZW5ndGg7XG4gIHdoaWxlICghc3RhdGUucmVhZGluZyAmJiAhc3RhdGUuZmxvd2luZyAmJiAhc3RhdGUuZW5kZWQgJiYgc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyaykge1xuICAgIGRlYnVnKCdtYXliZVJlYWRNb3JlIHJlYWQgMCcpO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICAgIGlmIChsZW4gPT09IHN0YXRlLmxlbmd0aClcbiAgICAgIC8vIGRpZG4ndCBnZXQgYW55IGRhdGEsIHN0b3Agc3Bpbm5pbmcuXG4gICAgICBicmVhaztlbHNlIGxlbiA9IHN0YXRlLmxlbmd0aDtcbiAgfVxuICBzdGF0ZS5yZWFkaW5nTW9yZSA9IGZhbHNlO1xufVxuXG4vLyBhYnN0cmFjdCBtZXRob2QuICB0byBiZSBvdmVycmlkZGVuIGluIHNwZWNpZmljIGltcGxlbWVudGF0aW9uIGNsYXNzZXMuXG4vLyBjYWxsIGNiKGVyLCBkYXRhKSB3aGVyZSBkYXRhIGlzIDw9IG4gaW4gbGVuZ3RoLlxuLy8gZm9yIHZpcnR1YWwgKG5vbi1zdHJpbmcsIG5vbi1idWZmZXIpIHN0cmVhbXMsIFwibGVuZ3RoXCIgaXMgc29tZXdoYXRcbi8vIGFyYml0cmFyeSwgYW5kIHBlcmhhcHMgbm90IHZlcnkgbWVhbmluZ2Z1bC5cblJlYWRhYmxlLnByb3RvdHlwZS5fcmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ19yZWFkKCkgaXMgbm90IGltcGxlbWVudGVkJykpO1xufTtcblxuUmVhZGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoZGVzdCwgcGlwZU9wdHMpIHtcbiAgdmFyIHNyYyA9IHRoaXM7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgc3dpdGNoIChzdGF0ZS5waXBlc0NvdW50KSB7XG4gICAgY2FzZSAwOlxuICAgICAgc3RhdGUucGlwZXMgPSBkZXN0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgc3RhdGUucGlwZXMgPSBbc3RhdGUucGlwZXMsIGRlc3RdO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHN0YXRlLnBpcGVzLnB1c2goZGVzdCk7XG4gICAgICBicmVhaztcbiAgfVxuICBzdGF0ZS5waXBlc0NvdW50ICs9IDE7XG4gIGRlYnVnKCdwaXBlIGNvdW50PSVkIG9wdHM9JWonLCBzdGF0ZS5waXBlc0NvdW50LCBwaXBlT3B0cyk7XG5cbiAgdmFyIGRvRW5kID0gKCFwaXBlT3B0cyB8fCBwaXBlT3B0cy5lbmQgIT09IGZhbHNlKSAmJiBkZXN0ICE9PSBwcm9jZXNzLnN0ZG91dCAmJiBkZXN0ICE9PSBwcm9jZXNzLnN0ZGVycjtcblxuICB2YXIgZW5kRm4gPSBkb0VuZCA/IG9uZW5kIDogdW5waXBlO1xuICBpZiAoc3RhdGUuZW5kRW1pdHRlZCkgcHJvY2Vzc05leHRUaWNrKGVuZEZuKTtlbHNlIHNyYy5vbmNlKCdlbmQnLCBlbmRGbik7XG5cbiAgZGVzdC5vbigndW5waXBlJywgb251bnBpcGUpO1xuICBmdW5jdGlvbiBvbnVucGlwZShyZWFkYWJsZSwgdW5waXBlSW5mbykge1xuICAgIGRlYnVnKCdvbnVucGlwZScpO1xuICAgIGlmIChyZWFkYWJsZSA9PT0gc3JjKSB7XG4gICAgICBpZiAodW5waXBlSW5mbyAmJiB1bnBpcGVJbmZvLmhhc1VucGlwZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHVucGlwZUluZm8uaGFzVW5waXBlZCA9IHRydWU7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbmVuZCgpIHtcbiAgICBkZWJ1Zygnb25lbmQnKTtcbiAgICBkZXN0LmVuZCgpO1xuICB9XG5cbiAgLy8gd2hlbiB0aGUgZGVzdCBkcmFpbnMsIGl0IHJlZHVjZXMgdGhlIGF3YWl0RHJhaW4gY291bnRlclxuICAvLyBvbiB0aGUgc291cmNlLiAgVGhpcyB3b3VsZCBiZSBtb3JlIGVsZWdhbnQgd2l0aCBhIC5vbmNlKClcbiAgLy8gaGFuZGxlciBpbiBmbG93KCksIGJ1dCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlcGVhdGVkbHkgaXNcbiAgLy8gdG9vIHNsb3cuXG4gIHZhciBvbmRyYWluID0gcGlwZU9uRHJhaW4oc3JjKTtcbiAgZGVzdC5vbignZHJhaW4nLCBvbmRyYWluKTtcblxuICB2YXIgY2xlYW5lZFVwID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgZGVidWcoJ2NsZWFudXAnKTtcbiAgICAvLyBjbGVhbnVwIGV2ZW50IGhhbmRsZXJzIG9uY2UgdGhlIHBpcGUgaXMgYnJva2VuXG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZHJhaW4nLCBvbmRyYWluKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ3VucGlwZScsIG9udW5waXBlKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcbiAgICBzcmMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIHVucGlwZSk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgb25kYXRhKTtcblxuICAgIGNsZWFuZWRVcCA9IHRydWU7XG5cbiAgICAvLyBpZiB0aGUgcmVhZGVyIGlzIHdhaXRpbmcgZm9yIGEgZHJhaW4gZXZlbnQgZnJvbSB0aGlzXG4gICAgLy8gc3BlY2lmaWMgd3JpdGVyLCB0aGVuIGl0IHdvdWxkIGNhdXNlIGl0IHRvIG5ldmVyIHN0YXJ0XG4gICAgLy8gZmxvd2luZyBhZ2Fpbi5cbiAgICAvLyBTbywgaWYgdGhpcyBpcyBhd2FpdGluZyBhIGRyYWluLCB0aGVuIHdlIGp1c3QgY2FsbCBpdCBub3cuXG4gICAgLy8gSWYgd2UgZG9uJ3Qga25vdywgdGhlbiBhc3N1bWUgdGhhdCB3ZSBhcmUgd2FpdGluZyBmb3Igb25lLlxuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluICYmICghZGVzdC5fd3JpdGFibGVTdGF0ZSB8fCBkZXN0Ll93cml0YWJsZVN0YXRlLm5lZWREcmFpbikpIG9uZHJhaW4oKTtcbiAgfVxuXG4gIC8vIElmIHRoZSB1c2VyIHB1c2hlcyBtb3JlIGRhdGEgd2hpbGUgd2UncmUgd3JpdGluZyB0byBkZXN0IHRoZW4gd2UnbGwgZW5kIHVwXG4gIC8vIGluIG9uZGF0YSBhZ2Fpbi4gSG93ZXZlciwgd2Ugb25seSB3YW50IHRvIGluY3JlYXNlIGF3YWl0RHJhaW4gb25jZSBiZWNhdXNlXG4gIC8vIGRlc3Qgd2lsbCBvbmx5IGVtaXQgb25lICdkcmFpbicgZXZlbnQgZm9yIHRoZSBtdWx0aXBsZSB3cml0ZXMuXG4gIC8vID0+IEludHJvZHVjZSBhIGd1YXJkIG9uIGluY3JlYXNpbmcgYXdhaXREcmFpbi5cbiAgdmFyIGluY3JlYXNlZEF3YWl0RHJhaW4gPSBmYWxzZTtcbiAgc3JjLm9uKCdkYXRhJywgb25kYXRhKTtcbiAgZnVuY3Rpb24gb25kYXRhKGNodW5rKSB7XG4gICAgZGVidWcoJ29uZGF0YScpO1xuICAgIGluY3JlYXNlZEF3YWl0RHJhaW4gPSBmYWxzZTtcbiAgICB2YXIgcmV0ID0gZGVzdC53cml0ZShjaHVuayk7XG4gICAgaWYgKGZhbHNlID09PSByZXQgJiYgIWluY3JlYXNlZEF3YWl0RHJhaW4pIHtcbiAgICAgIC8vIElmIHRoZSB1c2VyIHVucGlwZWQgZHVyaW5nIGBkZXN0LndyaXRlKClgLCBpdCBpcyBwb3NzaWJsZVxuICAgICAgLy8gdG8gZ2V0IHN0dWNrIGluIGEgcGVybWFuZW50bHkgcGF1c2VkIHN0YXRlIGlmIHRoYXQgd3JpdGVcbiAgICAgIC8vIGFsc28gcmV0dXJuZWQgZmFsc2UuXG4gICAgICAvLyA9PiBDaGVjayB3aGV0aGVyIGBkZXN0YCBpcyBzdGlsbCBhIHBpcGluZyBkZXN0aW5hdGlvbi5cbiAgICAgIGlmICgoc3RhdGUucGlwZXNDb3VudCA9PT0gMSAmJiBzdGF0ZS5waXBlcyA9PT0gZGVzdCB8fCBzdGF0ZS5waXBlc0NvdW50ID4gMSAmJiBpbmRleE9mKHN0YXRlLnBpcGVzLCBkZXN0KSAhPT0gLTEpICYmICFjbGVhbmVkVXApIHtcbiAgICAgICAgZGVidWcoJ2ZhbHNlIHdyaXRlIHJlc3BvbnNlLCBwYXVzZScsIHNyYy5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKTtcbiAgICAgICAgc3JjLl9yZWFkYWJsZVN0YXRlLmF3YWl0RHJhaW4rKztcbiAgICAgICAgaW5jcmVhc2VkQXdhaXREcmFpbiA9IHRydWU7XG4gICAgICB9XG4gICAgICBzcmMucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgZGVzdCBoYXMgYW4gZXJyb3IsIHRoZW4gc3RvcCBwaXBpbmcgaW50byBpdC5cbiAgLy8gaG93ZXZlciwgZG9uJ3Qgc3VwcHJlc3MgdGhlIHRocm93aW5nIGJlaGF2aW9yIGZvciB0aGlzLlxuICBmdW5jdGlvbiBvbmVycm9yKGVyKSB7XG4gICAgZGVidWcoJ29uZXJyb3InLCBlcik7XG4gICAgdW5waXBlKCk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBpZiAoRUVsaXN0ZW5lckNvdW50KGRlc3QsICdlcnJvcicpID09PSAwKSBkZXN0LmVtaXQoJ2Vycm9yJywgZXIpO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIG91ciBlcnJvciBoYW5kbGVyIGlzIGF0dGFjaGVkIGJlZm9yZSB1c2VybGFuZCBvbmVzLlxuICBwcmVwZW5kTGlzdGVuZXIoZGVzdCwgJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgLy8gQm90aCBjbG9zZSBhbmQgZmluaXNoIHNob3VsZCB0cmlnZ2VyIHVucGlwZSwgYnV0IG9ubHkgb25jZS5cbiAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gICAgdW5waXBlKCk7XG4gIH1cbiAgZGVzdC5vbmNlKCdjbG9zZScsIG9uY2xvc2UpO1xuICBmdW5jdGlvbiBvbmZpbmlzaCgpIHtcbiAgICBkZWJ1Zygnb25maW5pc2gnKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIHVucGlwZSgpO1xuICB9XG4gIGRlc3Qub25jZSgnZmluaXNoJywgb25maW5pc2gpO1xuXG4gIGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBkZWJ1ZygndW5waXBlJyk7XG4gICAgc3JjLnVucGlwZShkZXN0KTtcbiAgfVxuXG4gIC8vIHRlbGwgdGhlIGRlc3QgdGhhdCBpdCdzIGJlaW5nIHBpcGVkIHRvXG4gIGRlc3QuZW1pdCgncGlwZScsIHNyYyk7XG5cbiAgLy8gc3RhcnQgdGhlIGZsb3cgaWYgaXQgaGFzbid0IGJlZW4gc3RhcnRlZCBhbHJlYWR5LlxuICBpZiAoIXN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncGlwZSByZXN1bWUnKTtcbiAgICBzcmMucmVzdW1lKCk7XG4gIH1cblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmZ1bmN0aW9uIHBpcGVPbkRyYWluKHNyYykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGF0ZSA9IHNyYy5fcmVhZGFibGVTdGF0ZTtcbiAgICBkZWJ1ZygncGlwZU9uRHJhaW4nLCBzdGF0ZS5hd2FpdERyYWluKTtcbiAgICBpZiAoc3RhdGUuYXdhaXREcmFpbikgc3RhdGUuYXdhaXREcmFpbi0tO1xuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluID09PSAwICYmIEVFbGlzdGVuZXJDb3VudChzcmMsICdkYXRhJykpIHtcbiAgICAgIHN0YXRlLmZsb3dpbmcgPSB0cnVlO1xuICAgICAgZmxvdyhzcmMpO1xuICAgIH1cbiAgfTtcbn1cblxuUmVhZGFibGUucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIChkZXN0KSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciB1bnBpcGVJbmZvID0geyBoYXNVbnBpcGVkOiBmYWxzZSB9O1xuXG4gIC8vIGlmIHdlJ3JlIG5vdCBwaXBpbmcgYW55d2hlcmUsIHRoZW4gZG8gbm90aGluZy5cbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDApIHJldHVybiB0aGlzO1xuXG4gIC8vIGp1c3Qgb25lIGRlc3RpbmF0aW9uLiAgbW9zdCBjb21tb24gY2FzZS5cbiAgaWYgKHN0YXRlLnBpcGVzQ291bnQgPT09IDEpIHtcbiAgICAvLyBwYXNzZWQgaW4gb25lLCBidXQgaXQncyBub3QgdGhlIHJpZ2h0IG9uZS5cbiAgICBpZiAoZGVzdCAmJiBkZXN0ICE9PSBzdGF0ZS5waXBlcykgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAoIWRlc3QpIGRlc3QgPSBzdGF0ZS5waXBlcztcblxuICAgIC8vIGdvdCBhIG1hdGNoLlxuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG4gICAgaWYgKGRlc3QpIGRlc3QuZW1pdCgndW5waXBlJywgdGhpcywgdW5waXBlSW5mbyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzbG93IGNhc2UuIG11bHRpcGxlIHBpcGUgZGVzdGluYXRpb25zLlxuXG4gIGlmICghZGVzdCkge1xuICAgIC8vIHJlbW92ZSBhbGwuXG4gICAgdmFyIGRlc3RzID0gc3RhdGUucGlwZXM7XG4gICAgdmFyIGxlbiA9IHN0YXRlLnBpcGVzQ291bnQ7XG4gICAgc3RhdGUucGlwZXMgPSBudWxsO1xuICAgIHN0YXRlLnBpcGVzQ291bnQgPSAwO1xuICAgIHN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGRlc3RzW2ldLmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuICAgIH1yZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHRyeSB0byBmaW5kIHRoZSByaWdodCBvbmUuXG4gIHZhciBpbmRleCA9IGluZGV4T2Yoc3RhdGUucGlwZXMsIGRlc3QpO1xuICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gdGhpcztcblxuICBzdGF0ZS5waXBlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICBzdGF0ZS5waXBlc0NvdW50IC09IDE7XG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKSBzdGF0ZS5waXBlcyA9IHN0YXRlLnBpcGVzWzBdO1xuXG4gIGRlc3QuZW1pdCgndW5waXBlJywgdGhpcywgdW5waXBlSW5mbyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBzZXQgdXAgZGF0YSBldmVudHMgaWYgdGhleSBhcmUgYXNrZWQgZm9yXG4vLyBFbnN1cmUgcmVhZGFibGUgbGlzdGVuZXJzIGV2ZW50dWFsbHkgZ2V0IHNvbWV0aGluZ1xuUmVhZGFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2LCBmbikge1xuICB2YXIgcmVzID0gU3RyZWFtLnByb3RvdHlwZS5vbi5jYWxsKHRoaXMsIGV2LCBmbik7XG5cbiAgaWYgKGV2ID09PSAnZGF0YScpIHtcbiAgICAvLyBTdGFydCBmbG93aW5nIG9uIG5leHQgdGljayBpZiBzdHJlYW0gaXNuJ3QgZXhwbGljaXRseSBwYXVzZWRcbiAgICBpZiAodGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nICE9PSBmYWxzZSkgdGhpcy5yZXN1bWUoKTtcbiAgfSBlbHNlIGlmIChldiA9PT0gJ3JlYWRhYmxlJykge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gICAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkICYmICFzdGF0ZS5yZWFkYWJsZUxpc3RlbmluZykge1xuICAgICAgc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcgPSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gZmFsc2U7XG4gICAgICBpZiAoIXN0YXRlLnJlYWRpbmcpIHtcbiAgICAgICAgcHJvY2Vzc05leHRUaWNrKG5SZWFkaW5nTmV4dFRpY2ssIHRoaXMpO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgZW1pdFJlYWRhYmxlKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuUmVhZGFibGUucHJvdG90eXBlLmFkZExpc3RlbmVyID0gUmVhZGFibGUucHJvdG90eXBlLm9uO1xuXG5mdW5jdGlvbiBuUmVhZGluZ05leHRUaWNrKHNlbGYpIHtcbiAgZGVidWcoJ3JlYWRhYmxlIG5leHR0aWNrIHJlYWQgMCcpO1xuICBzZWxmLnJlYWQoMCk7XG59XG5cbi8vIHBhdXNlKCkgYW5kIHJlc3VtZSgpIGFyZSByZW1uYW50cyBvZiB0aGUgbGVnYWN5IHJlYWRhYmxlIHN0cmVhbSBBUElcbi8vIElmIHRoZSB1c2VyIHVzZXMgdGhlbSwgdGhlbiBzd2l0Y2ggaW50byBvbGQgbW9kZS5cblJlYWRhYmxlLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIGlmICghc3RhdGUuZmxvd2luZykge1xuICAgIGRlYnVnKCdyZXN1bWUnKTtcbiAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTtcbiAgICByZXN1bWUodGhpcywgc3RhdGUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gcmVzdW1lKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5yZXN1bWVTY2hlZHVsZWQpIHtcbiAgICBzdGF0ZS5yZXN1bWVTY2hlZHVsZWQgPSB0cnVlO1xuICAgIHByb2Nlc3NOZXh0VGljayhyZXN1bWVfLCBzdHJlYW0sIHN0YXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXN1bWVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5yZWFkaW5nKSB7XG4gICAgZGVidWcoJ3Jlc3VtZSByZWFkIDAnKTtcbiAgICBzdHJlYW0ucmVhZCgwKTtcbiAgfVxuXG4gIHN0YXRlLnJlc3VtZVNjaGVkdWxlZCA9IGZhbHNlO1xuICBzdGF0ZS5hd2FpdERyYWluID0gMDtcbiAgc3RyZWFtLmVtaXQoJ3Jlc3VtZScpO1xuICBmbG93KHN0cmVhbSk7XG4gIGlmIChzdGF0ZS5mbG93aW5nICYmICFzdGF0ZS5yZWFkaW5nKSBzdHJlYW0ucmVhZCgwKTtcbn1cblxuUmVhZGFibGUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygnY2FsbCBwYXVzZSBmbG93aW5nPSVqJywgdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nKTtcbiAgaWYgKGZhbHNlICE9PSB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncGF1c2UnKTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBmbG93KHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIGRlYnVnKCdmbG93Jywgc3RhdGUuZmxvd2luZyk7XG4gIHdoaWxlIChzdGF0ZS5mbG93aW5nICYmIHN0cmVhbS5yZWFkKCkgIT09IG51bGwpIHt9XG59XG5cbi8vIHdyYXAgYW4gb2xkLXN0eWxlIHN0cmVhbSBhcyB0aGUgYXN5bmMgZGF0YSBzb3VyY2UuXG4vLyBUaGlzIGlzICpub3QqIHBhcnQgb2YgdGhlIHJlYWRhYmxlIHN0cmVhbSBpbnRlcmZhY2UuXG4vLyBJdCBpcyBhbiB1Z2x5IHVuZm9ydHVuYXRlIG1lc3Mgb2YgaGlzdG9yeS5cblJlYWRhYmxlLnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgcGF1c2VkID0gZmFsc2U7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBkZWJ1Zygnd3JhcHBlZCBlbmQnKTtcbiAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhc3RhdGUuZW5kZWQpIHtcbiAgICAgIHZhciBjaHVuayA9IHN0YXRlLmRlY29kZXIuZW5kKCk7XG4gICAgICBpZiAoY2h1bmsgJiYgY2h1bmsubGVuZ3RoKSBzZWxmLnB1c2goY2h1bmspO1xuICAgIH1cblxuICAgIHNlbGYucHVzaChudWxsKTtcbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZGF0YScpO1xuICAgIGlmIChzdGF0ZS5kZWNvZGVyKSBjaHVuayA9IHN0YXRlLmRlY29kZXIud3JpdGUoY2h1bmspO1xuXG4gICAgLy8gZG9uJ3Qgc2tpcCBvdmVyIGZhbHN5IHZhbHVlcyBpbiBvYmplY3RNb2RlXG4gICAgaWYgKHN0YXRlLm9iamVjdE1vZGUgJiYgKGNodW5rID09PSBudWxsIHx8IGNodW5rID09PSB1bmRlZmluZWQpKSByZXR1cm47ZWxzZSBpZiAoIXN0YXRlLm9iamVjdE1vZGUgJiYgKCFjaHVuayB8fCAhY2h1bmsubGVuZ3RoKSkgcmV0dXJuO1xuXG4gICAgdmFyIHJldCA9IHNlbGYucHVzaChjaHVuayk7XG4gICAgaWYgKCFyZXQpIHtcbiAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICBzdHJlYW0ucGF1c2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHByb3h5IGFsbCB0aGUgb3RoZXIgbWV0aG9kcy5cbiAgLy8gaW1wb3J0YW50IHdoZW4gd3JhcHBpbmcgZmlsdGVycyBhbmQgZHVwbGV4ZXMuXG4gIGZvciAodmFyIGkgaW4gc3RyZWFtKSB7XG4gICAgaWYgKHRoaXNbaV0gPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygc3RyZWFtW2ldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzW2ldID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBzdHJlYW1bbWV0aG9kXS5hcHBseShzdHJlYW0sIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9KGkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb3h5IGNlcnRhaW4gaW1wb3J0YW50IGV2ZW50cy5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCBrUHJveHlFdmVudHMubGVuZ3RoOyBuKyspIHtcbiAgICBzdHJlYW0ub24oa1Byb3h5RXZlbnRzW25dLCBzZWxmLmVtaXQuYmluZChzZWxmLCBrUHJveHlFdmVudHNbbl0pKTtcbiAgfVxuXG4gIC8vIHdoZW4gd2UgdHJ5IHRvIGNvbnN1bWUgc29tZSBtb3JlIGJ5dGVzLCBzaW1wbHkgdW5wYXVzZSB0aGVcbiAgLy8gdW5kZXJseWluZyBzdHJlYW0uXG4gIHNlbGYuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICAgIGRlYnVnKCd3cmFwcGVkIF9yZWFkJywgbik7XG4gICAgaWYgKHBhdXNlZCkge1xuICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICBzdHJlYW0ucmVzdW1lKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBzZWxmO1xufTtcblxuLy8gZXhwb3NlZCBmb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5LlxuUmVhZGFibGUuX2Zyb21MaXN0ID0gZnJvbUxpc3Q7XG5cbi8vIFBsdWNrIG9mZiBuIGJ5dGVzIGZyb20gYW4gYXJyYXkgb2YgYnVmZmVycy5cbi8vIExlbmd0aCBpcyB0aGUgY29tYmluZWQgbGVuZ3RocyBvZiBhbGwgdGhlIGJ1ZmZlcnMgaW4gdGhlIGxpc3QuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGZyb21MaXN0KG4sIHN0YXRlKSB7XG4gIC8vIG5vdGhpbmcgYnVmZmVyZWRcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHJldDtcbiAgaWYgKHN0YXRlLm9iamVjdE1vZGUpIHJldCA9IHN0YXRlLmJ1ZmZlci5zaGlmdCgpO2Vsc2UgaWYgKCFuIHx8IG4gPj0gc3RhdGUubGVuZ3RoKSB7XG4gICAgLy8gcmVhZCBpdCBhbGwsIHRydW5jYXRlIHRoZSBsaXN0XG4gICAgaWYgKHN0YXRlLmRlY29kZXIpIHJldCA9IHN0YXRlLmJ1ZmZlci5qb2luKCcnKTtlbHNlIGlmIChzdGF0ZS5idWZmZXIubGVuZ3RoID09PSAxKSByZXQgPSBzdGF0ZS5idWZmZXIuaGVhZC5kYXRhO2Vsc2UgcmV0ID0gc3RhdGUuYnVmZmVyLmNvbmNhdChzdGF0ZS5sZW5ndGgpO1xuICAgIHN0YXRlLmJ1ZmZlci5jbGVhcigpO1xuICB9IGVsc2Uge1xuICAgIC8vIHJlYWQgcGFydCBvZiBsaXN0XG4gICAgcmV0ID0gZnJvbUxpc3RQYXJ0aWFsKG4sIHN0YXRlLmJ1ZmZlciwgc3RhdGUuZGVjb2Rlcik7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBFeHRyYWN0cyBvbmx5IGVub3VnaCBidWZmZXJlZCBkYXRhIHRvIHNhdGlzZnkgdGhlIGFtb3VudCByZXF1ZXN0ZWQuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGZyb21MaXN0UGFydGlhbChuLCBsaXN0LCBoYXNTdHJpbmdzKSB7XG4gIHZhciByZXQ7XG4gIGlmIChuIDwgbGlzdC5oZWFkLmRhdGEubGVuZ3RoKSB7XG4gICAgLy8gc2xpY2UgaXMgdGhlIHNhbWUgZm9yIGJ1ZmZlcnMgYW5kIHN0cmluZ3NcbiAgICByZXQgPSBsaXN0LmhlYWQuZGF0YS5zbGljZSgwLCBuKTtcbiAgICBsaXN0LmhlYWQuZGF0YSA9IGxpc3QuaGVhZC5kYXRhLnNsaWNlKG4pO1xuICB9IGVsc2UgaWYgKG4gPT09IGxpc3QuaGVhZC5kYXRhLmxlbmd0aCkge1xuICAgIC8vIGZpcnN0IGNodW5rIGlzIGEgcGVyZmVjdCBtYXRjaFxuICAgIHJldCA9IGxpc3Quc2hpZnQoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZXN1bHQgc3BhbnMgbW9yZSB0aGFuIG9uZSBidWZmZXJcbiAgICByZXQgPSBoYXNTdHJpbmdzID8gY29weUZyb21CdWZmZXJTdHJpbmcobiwgbGlzdCkgOiBjb3B5RnJvbUJ1ZmZlcihuLCBsaXN0KTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBDb3BpZXMgYSBzcGVjaWZpZWQgYW1vdW50IG9mIGNoYXJhY3RlcnMgZnJvbSB0aGUgbGlzdCBvZiBidWZmZXJlZCBkYXRhXG4vLyBjaHVua3MuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGNvcHlGcm9tQnVmZmVyU3RyaW5nKG4sIGxpc3QpIHtcbiAgdmFyIHAgPSBsaXN0LmhlYWQ7XG4gIHZhciBjID0gMTtcbiAgdmFyIHJldCA9IHAuZGF0YTtcbiAgbiAtPSByZXQubGVuZ3RoO1xuICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgIHZhciBzdHIgPSBwLmRhdGE7XG4gICAgdmFyIG5iID0gbiA+IHN0ci5sZW5ndGggPyBzdHIubGVuZ3RoIDogbjtcbiAgICBpZiAobmIgPT09IHN0ci5sZW5ndGgpIHJldCArPSBzdHI7ZWxzZSByZXQgKz0gc3RyLnNsaWNlKDAsIG4pO1xuICAgIG4gLT0gbmI7XG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIGlmIChuYiA9PT0gc3RyLmxlbmd0aCkge1xuICAgICAgICArK2M7XG4gICAgICAgIGlmIChwLm5leHQpIGxpc3QuaGVhZCA9IHAubmV4dDtlbHNlIGxpc3QuaGVhZCA9IGxpc3QudGFpbCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0LmhlYWQgPSBwO1xuICAgICAgICBwLmRhdGEgPSBzdHIuc2xpY2UobmIpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgICsrYztcbiAgfVxuICBsaXN0Lmxlbmd0aCAtPSBjO1xuICByZXR1cm4gcmV0O1xufVxuXG4vLyBDb3BpZXMgYSBzcGVjaWZpZWQgYW1vdW50IG9mIGJ5dGVzIGZyb20gdGhlIGxpc3Qgb2YgYnVmZmVyZWQgZGF0YSBjaHVua3MuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cbmZ1bmN0aW9uIGNvcHlGcm9tQnVmZmVyKG4sIGxpc3QpIHtcbiAgdmFyIHJldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuKTtcbiAgdmFyIHAgPSBsaXN0LmhlYWQ7XG4gIHZhciBjID0gMTtcbiAgcC5kYXRhLmNvcHkocmV0KTtcbiAgbiAtPSBwLmRhdGEubGVuZ3RoO1xuICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgIHZhciBidWYgPSBwLmRhdGE7XG4gICAgdmFyIG5iID0gbiA+IGJ1Zi5sZW5ndGggPyBidWYubGVuZ3RoIDogbjtcbiAgICBidWYuY29weShyZXQsIHJldC5sZW5ndGggLSBuLCAwLCBuYik7XG4gICAgbiAtPSBuYjtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgaWYgKG5iID09PSBidWYubGVuZ3RoKSB7XG4gICAgICAgICsrYztcbiAgICAgICAgaWYgKHAubmV4dCkgbGlzdC5oZWFkID0gcC5uZXh0O2Vsc2UgbGlzdC5oZWFkID0gbGlzdC50YWlsID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QuaGVhZCA9IHA7XG4gICAgICAgIHAuZGF0YSA9IGJ1Zi5zbGljZShuYik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgKytjO1xuICB9XG4gIGxpc3QubGVuZ3RoIC09IGM7XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG5cbiAgLy8gSWYgd2UgZ2V0IGhlcmUgYmVmb3JlIGNvbnN1bWluZyBhbGwgdGhlIGJ5dGVzLCB0aGVuIHRoYXQgaXMgYVxuICAvLyBidWcgaW4gbm9kZS4gIFNob3VsZCBuZXZlciBoYXBwZW4uXG4gIGlmIChzdGF0ZS5sZW5ndGggPiAwKSB0aHJvdyBuZXcgRXJyb3IoJ1wiZW5kUmVhZGFibGUoKVwiIGNhbGxlZCBvbiBub24tZW1wdHkgc3RyZWFtJyk7XG5cbiAgaWYgKCFzdGF0ZS5lbmRFbWl0dGVkKSB7XG4gICAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuICAgIHByb2Nlc3NOZXh0VGljayhlbmRSZWFkYWJsZU5ULCBzdGF0ZSwgc3RyZWFtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRSZWFkYWJsZU5UKHN0YXRlLCBzdHJlYW0pIHtcbiAgLy8gQ2hlY2sgdGhhdCB3ZSBkaWRuJ3QgZ2V0IG9uZSBsYXN0IHVuc2hpZnQuXG4gIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiBzdGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICBzdGF0ZS5lbmRFbWl0dGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0ucmVhZGFibGUgPSBmYWxzZTtcbiAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaCh4cywgZikge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGYoeHNbaV0sIGkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluZGV4T2YoeHMsIHgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoeHNbaV0gPT09IHgpIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3JlYWRhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgcHJvY2Vzc05leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy1uZXh0aWNrLWFyZ3MnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG4vLyB1bmRvY3VtZW50ZWQgY2IoKSBBUEksIG5lZWRlZCBmb3IgY29yZSwgbm90IGZvciBwdWJsaWMgQVBJXG5mdW5jdGlvbiBkZXN0cm95KGVyciwgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgcmVhZGFibGVEZXN0cm95ZWQgPSB0aGlzLl9yZWFkYWJsZVN0YXRlICYmIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkO1xuICB2YXIgd3JpdGFibGVEZXN0cm95ZWQgPSB0aGlzLl93cml0YWJsZVN0YXRlICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkO1xuXG4gIGlmIChyZWFkYWJsZURlc3Ryb3llZCB8fCB3cml0YWJsZURlc3Ryb3llZCkge1xuICAgIGlmIChjYikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9IGVsc2UgaWYgKGVyciAmJiAoIXRoaXMuX3dyaXRhYmxlU3RhdGUgfHwgIXRoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkKSkge1xuICAgICAgcHJvY2Vzc05leHRUaWNrKGVtaXRFcnJvck5ULCB0aGlzLCBlcnIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB3ZSBzZXQgZGVzdHJveWVkIHRvIHRydWUgYmVmb3JlIGZpcmluZyBlcnJvciBjYWxsYmFja3MgaW4gb3JkZXJcbiAgLy8gdG8gbWFrZSBpdCByZS1lbnRyYW5jZSBzYWZlIGluIGNhc2UgZGVzdHJveSgpIGlzIGNhbGxlZCB3aXRoaW4gY2FsbGJhY2tzXG5cbiAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvLyBpZiB0aGlzIGlzIGEgZHVwbGV4IHN0cmVhbSBtYXJrIHRoZSB3cml0YWJsZSBwYXJ0IGFzIGRlc3Ryb3llZCBhcyB3ZWxsXG4gIGlmICh0aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgdGhpcy5fZGVzdHJveShlcnIgfHwgbnVsbCwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmICghY2IgJiYgZXJyKSB7XG4gICAgICBwcm9jZXNzTmV4dFRpY2soZW1pdEVycm9yTlQsIF90aGlzLCBlcnIpO1xuICAgICAgaWYgKF90aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgICAgIF90aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjYikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1bmRlc3Ryb3koKSB7XG4gIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmRFbWl0dGVkID0gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5lbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5maW5pc2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1pdEVycm9yTlQoc2VsZiwgZXJyKSB7XG4gIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGVzdHJveTogZGVzdHJveSxcbiAgdW5kZXN0cm95OiB1bmRlc3Ryb3lcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvaW50ZXJuYWwvc3RyZWFtcy9kZXN0cm95LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcblxudmFyIGlzRW5jb2RpbmcgPSBCdWZmZXIuaXNFbmNvZGluZyB8fCBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgZW5jb2RpbmcgPSAnJyArIGVuY29kaW5nO1xuICBzd2l0Y2ggKGVuY29kaW5nICYmIGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOmNhc2UgJ3V0ZjgnOmNhc2UgJ3V0Zi04JzpjYXNlICdhc2NpaSc6Y2FzZSAnYmluYXJ5JzpjYXNlICdiYXNlNjQnOmNhc2UgJ3VjczInOmNhc2UgJ3Vjcy0yJzpjYXNlICd1dGYxNmxlJzpjYXNlICd1dGYtMTZsZSc6Y2FzZSAncmF3JzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9ub3JtYWxpemVFbmNvZGluZyhlbmMpIHtcbiAgaWYgKCFlbmMpIHJldHVybiAndXRmOCc7XG4gIHZhciByZXRyaWVkO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jKSB7XG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuICd1dGY4JztcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiAndXRmMTZsZSc7XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuICdsYXRpbjEnO1xuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBlbmM7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAocmV0cmllZCkgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgICAgICAgZW5jID0gKCcnICsgZW5jKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXRyaWVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIERvIG5vdCBjYWNoZSBgQnVmZmVyLmlzRW5jb2RpbmdgIHdoZW4gY2hlY2tpbmcgZW5jb2RpbmcgbmFtZXMgYXMgc29tZVxuLy8gbW9kdWxlcyBtb25rZXktcGF0Y2ggaXQgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIGVuY29kaW5nc1xuZnVuY3Rpb24gbm9ybWFsaXplRW5jb2RpbmcoZW5jKSB7XG4gIHZhciBuZW5jID0gX25vcm1hbGl6ZUVuY29kaW5nKGVuYyk7XG4gIGlmICh0eXBlb2YgbmVuYyAhPT0gJ3N0cmluZycgJiYgKEJ1ZmZlci5pc0VuY29kaW5nID09PSBpc0VuY29kaW5nIHx8ICFpc0VuY29kaW5nKGVuYykpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmMpO1xuICByZXR1cm4gbmVuYyB8fCBlbmM7XG59XG5cbi8vIFN0cmluZ0RlY29kZXIgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBlZmZpY2llbnRseSBzcGxpdHRpbmcgYSBzZXJpZXMgb2Zcbi8vIGJ1ZmZlcnMgaW50byBhIHNlcmllcyBvZiBKUyBzdHJpbmdzIHdpdGhvdXQgYnJlYWtpbmcgYXBhcnQgbXVsdGktYnl0ZVxuLy8gY2hhcmFjdGVycy5cbmV4cG9ydHMuU3RyaW5nRGVjb2RlciA9IFN0cmluZ0RlY29kZXI7XG5mdW5jdGlvbiBTdHJpbmdEZWNvZGVyKGVuY29kaW5nKSB7XG4gIHRoaXMuZW5jb2RpbmcgPSBub3JtYWxpemVFbmNvZGluZyhlbmNvZGluZyk7XG4gIHZhciBuYjtcbiAgc3dpdGNoICh0aGlzLmVuY29kaW5nKSB7XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICB0aGlzLnRleHQgPSB1dGYxNlRleHQ7XG4gICAgICB0aGlzLmVuZCA9IHV0ZjE2RW5kO1xuICAgICAgbmIgPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgICB0aGlzLmZpbGxMYXN0ID0gdXRmOEZpbGxMYXN0O1xuICAgICAgbmIgPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHRoaXMudGV4dCA9IGJhc2U2NFRleHQ7XG4gICAgICB0aGlzLmVuZCA9IGJhc2U2NEVuZDtcbiAgICAgIG5iID0gMztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLndyaXRlID0gc2ltcGxlV3JpdGU7XG4gICAgICB0aGlzLmVuZCA9IHNpbXBsZUVuZDtcbiAgICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgdGhpcy5sYXN0VG90YWwgPSAwO1xuICB0aGlzLmxhc3RDaGFyID0gQnVmZmVyLmFsbG9jVW5zYWZlKG5iKTtcbn1cblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmIChidWYubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gIHZhciByO1xuICB2YXIgaTtcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHtcbiAgICByID0gdGhpcy5maWxsTGFzdChidWYpO1xuICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiAnJztcbiAgICBpID0gdGhpcy5sYXN0TmVlZDtcbiAgICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgfSBlbHNlIHtcbiAgICBpID0gMDtcbiAgfVxuICBpZiAoaSA8IGJ1Zi5sZW5ndGgpIHJldHVybiByID8gciArIHRoaXMudGV4dChidWYsIGkpIDogdGhpcy50ZXh0KGJ1ZiwgaSk7XG4gIHJldHVybiByIHx8ICcnO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gdXRmOEVuZDtcblxuLy8gUmV0dXJucyBvbmx5IGNvbXBsZXRlIGNoYXJhY3RlcnMgaW4gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLnRleHQgPSB1dGY4VGV4dDtcblxuLy8gQXR0ZW1wdHMgdG8gY29tcGxldGUgYSBwYXJ0aWFsIG5vbi1VVEYtOCBjaGFyYWN0ZXIgdXNpbmcgYnl0ZXMgZnJvbSBhIEJ1ZmZlclxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZmlsbExhc3QgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIHRoaXMubGFzdE5lZWQpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsIDAsIHRoaXMubGFzdFRvdGFsKTtcbiAgfVxuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIGJ1Zi5sZW5ndGgpO1xuICB0aGlzLmxhc3ROZWVkIC09IGJ1Zi5sZW5ndGg7XG59O1xuXG4vLyBDaGVja3MgdGhlIHR5cGUgb2YgYSBVVEYtOCBieXRlLCB3aGV0aGVyIGl0J3MgQVNDSUksIGEgbGVhZGluZyBieXRlLCBvciBhXG4vLyBjb250aW51YXRpb24gYnl0ZS5cbmZ1bmN0aW9uIHV0ZjhDaGVja0J5dGUoYnl0ZSkge1xuICBpZiAoYnl0ZSA8PSAweDdGKSByZXR1cm4gMDtlbHNlIGlmIChieXRlID4+IDUgPT09IDB4MDYpIHJldHVybiAyO2Vsc2UgaWYgKGJ5dGUgPj4gNCA9PT0gMHgwRSkgcmV0dXJuIDM7ZWxzZSBpZiAoYnl0ZSA+PiAzID09PSAweDFFKSByZXR1cm4gNDtcbiAgcmV0dXJuIC0xO1xufVxuXG4vLyBDaGVja3MgYXQgbW9zdCAzIGJ5dGVzIGF0IHRoZSBlbmQgb2YgYSBCdWZmZXIgaW4gb3JkZXIgdG8gZGV0ZWN0IGFuXG4vLyBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyLiBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzICgyLCAzLCBvciA0KVxuLy8gbmVlZGVkIHRvIGNvbXBsZXRlIHRoZSBVVEYtOCBjaGFyYWN0ZXIgKGlmIGFwcGxpY2FibGUpIGFyZSByZXR1cm5lZC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0luY29tcGxldGUoc2VsZiwgYnVmLCBpKSB7XG4gIHZhciBqID0gYnVmLmxlbmd0aCAtIDE7XG4gIGlmIChqIDwgaSkgcmV0dXJuIDA7XG4gIHZhciBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAxO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSkgcmV0dXJuIDA7XG4gIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHNlbGYubGFzdE5lZWQgPSBuYiAtIDI7XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIGlmICgtLWogPCBpKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkge1xuICAgICAgaWYgKG5iID09PSAyKSBuYiA9IDA7ZWxzZSBzZWxmLmxhc3ROZWVkID0gbmIgLSAzO1xuICAgIH1cbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8vIFZhbGlkYXRlcyBhcyBtYW55IGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciBhc1xuLy8gbmVlZGVkIG9yIGFyZSBhdmFpbGFibGUuIElmIHdlIHNlZSBhIG5vbi1jb250aW51YXRpb24gYnl0ZSB3aGVyZSB3ZSBleHBlY3Rcbi8vIG9uZSwgd2UgXCJyZXBsYWNlXCIgdGhlIHZhbGlkYXRlZCBjb250aW51YXRpb24gYnl0ZXMgd2UndmUgc2VlbiBzbyBmYXIgd2l0aFxuLy8gVVRGLTggcmVwbGFjZW1lbnQgY2hhcmFjdGVycyAoJ1xcdWZmZmQnKSwgdG8gbWF0Y2ggdjgncyBVVEYtOCBkZWNvZGluZ1xuLy8gYmVoYXZpb3IuIFRoZSBjb250aW51YXRpb24gYnl0ZSBjaGVjayBpcyBpbmNsdWRlZCB0aHJlZSB0aW1lcyBpbiB0aGUgY2FzZVxuLy8gd2hlcmUgYWxsIG9mIHRoZSBjb250aW51YXRpb24gYnl0ZXMgZm9yIGEgY2hhcmFjdGVyIGV4aXN0IGluIHRoZSBzYW1lIGJ1ZmZlci5cbi8vIEl0IGlzIGFsc28gZG9uZSB0aGlzIHdheSBhcyBhIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZSBpbnN0ZWFkIG9mIHVzaW5nIGFcbi8vIGxvb3AuXG5mdW5jdGlvbiB1dGY4Q2hlY2tFeHRyYUJ5dGVzKHNlbGYsIGJ1ZiwgcCkge1xuICBpZiAoKGJ1ZlswXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgc2VsZi5sYXN0TmVlZCA9IDA7XG4gICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCk7XG4gIH1cbiAgaWYgKHNlbGYubGFzdE5lZWQgPiAxICYmIGJ1Zi5sZW5ndGggPiAxKSB7XG4gICAgaWYgKChidWZbMV0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgc2VsZi5sYXN0TmVlZCA9IDE7XG4gICAgICByZXR1cm4gJ1xcdWZmZmQnLnJlcGVhdChwICsgMSk7XG4gICAgfVxuICAgIGlmIChzZWxmLmxhc3ROZWVkID4gMiAmJiBidWYubGVuZ3RoID4gMikge1xuICAgICAgaWYgKChidWZbMl0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICBzZWxmLmxhc3ROZWVkID0gMjtcbiAgICAgICAgcmV0dXJuICdcXHVmZmZkJy5yZXBlYXQocCArIDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXIuXG5mdW5jdGlvbiB1dGY4RmlsbExhc3QoYnVmKSB7XG4gIHZhciBwID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICB2YXIgciA9IHV0ZjhDaGVja0V4dHJhQnl0ZXModGhpcywgYnVmLCBwKTtcbiAgaWYgKHIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHI7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn1cblxuLy8gUmV0dXJucyBhbGwgY29tcGxldGUgVVRGLTggY2hhcmFjdGVycyBpbiBhIEJ1ZmZlci4gSWYgdGhlIEJ1ZmZlciBlbmRlZCBvbiBhXG4vLyBwYXJ0aWFsIGNoYXJhY3RlciwgdGhlIGNoYXJhY3RlcidzIGJ5dGVzIGFyZSBidWZmZXJlZCB1bnRpbCB0aGUgcmVxdWlyZWRcbi8vIG51bWJlciBvZiBieXRlcyBhcmUgYXZhaWxhYmxlLlxuZnVuY3Rpb24gdXRmOFRleHQoYnVmLCBpKSB7XG4gIHZhciB0b3RhbCA9IHV0ZjhDaGVja0luY29tcGxldGUodGhpcywgYnVmLCBpKTtcbiAgaWYgKCF0aGlzLmxhc3ROZWVkKSByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSk7XG4gIHRoaXMubGFzdFRvdGFsID0gdG90YWw7XG4gIHZhciBlbmQgPSBidWYubGVuZ3RoIC0gKHRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIDAsIGVuZCk7XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpLCBlbmQpO1xufVxuXG4vLyBGb3IgVVRGLTgsIGEgcmVwbGFjZW1lbnQgY2hhcmFjdGVyIGZvciBlYWNoIGJ1ZmZlcmVkIGJ5dGUgb2YgYSAocGFydGlhbClcbi8vIGNoYXJhY3RlciBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgb3V0cHV0LlxuZnVuY3Rpb24gdXRmOEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyAnXFx1ZmZmZCcucmVwZWF0KHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIHJldHVybiByO1xufVxuXG4vLyBVVEYtMTZMRSB0eXBpY2FsbHkgbmVlZHMgdHdvIGJ5dGVzIHBlciBjaGFyYWN0ZXIsIGJ1dCBldmVuIGlmIHdlIGhhdmUgYW4gZXZlblxuLy8gbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBlbmQgb24gYSBsZWFkaW5nL2hpZ2hcbi8vIHN1cnJvZ2F0ZS4gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBuZXh0IHR3byBieXRlcyBpbiBvcmRlciB0b1xuLy8gZGVjb2RlIHRoZSBsYXN0IGNoYXJhY3RlciBwcm9wZXJseS5cbmZ1bmN0aW9uIHV0ZjE2VGV4dChidWYsIGkpIHtcbiAgaWYgKChidWYubGVuZ3RoIC0gaSkgJSAyID09PSAwKSB7XG4gICAgdmFyIHIgPSBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpKTtcbiAgICBpZiAocikge1xuICAgICAgdmFyIGMgPSByLmNoYXJDb2RlQXQoci5sZW5ndGggLSAxKTtcbiAgICAgIGlmIChjID49IDB4RDgwMCAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICB0aGlzLmxhc3ROZWVkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0VG90YWwgPSA0O1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDE7XG4gIHRoaXMubGFzdFRvdGFsID0gMjtcbiAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpLCBidWYubGVuZ3RoIC0gMSk7XG59XG5cbi8vIEZvciBVVEYtMTZMRSB3ZSBkbyBub3QgZXhwbGljaXRseSBhcHBlbmQgc3BlY2lhbCByZXBsYWNlbWVudCBjaGFyYWN0ZXJzIGlmIHdlXG4vLyBlbmQgb24gYSBwYXJ0aWFsIGNoYXJhY3Rlciwgd2Ugc2ltcGx5IGxldCB2OCBoYW5kbGUgdGhhdC5cbmZ1bmN0aW9uIHV0ZjE2RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgdmFyIGVuZCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgICByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ3V0ZjE2bGUnLCAwLCBlbmQpO1xuICB9XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUZXh0KGJ1ZiwgaSkge1xuICB2YXIgbiA9IChidWYubGVuZ3RoIC0gaSkgJSAzO1xuICBpZiAobiA9PT0gMCkgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSk7XG4gIHRoaXMubGFzdE5lZWQgPSAzIC0gbjtcbiAgdGhpcy5sYXN0VG90YWwgPSAzO1xuICBpZiAobiA9PT0gMSkge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGksIGJ1Zi5sZW5ndGggLSBuKTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ2Jhc2U2NCcsIDAsIDMgLSB0aGlzLmxhc3ROZWVkKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFBhc3MgYnl0ZXMgb24gdGhyb3VnaCBmb3Igc2luZ2xlLWJ5dGUgZW5jb2RpbmdzIChlLmcuIGFzY2lpLCBsYXRpbjEsIGhleClcbmZ1bmN0aW9uIHNpbXBsZVdyaXRlKGJ1Zikge1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVFbmQoYnVmKSB7XG4gIHJldHVybiBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9zdHJpbmdfZGVjb2Rlci9saWIvc3RyaW5nX2RlY29kZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIHRyYW5zZm9ybSBzdHJlYW0gaXMgYSByZWFkYWJsZS93cml0YWJsZSBzdHJlYW0gd2hlcmUgeW91IGRvXG4vLyBzb21ldGhpbmcgd2l0aCB0aGUgZGF0YS4gIFNvbWV0aW1lcyBpdCdzIGNhbGxlZCBhIFwiZmlsdGVyXCIsXG4vLyBidXQgdGhhdCdzIG5vdCBhIGdyZWF0IG5hbWUgZm9yIGl0LCBzaW5jZSB0aGF0IGltcGxpZXMgYSB0aGluZyB3aGVyZVxuLy8gc29tZSBiaXRzIHBhc3MgdGhyb3VnaCwgYW5kIG90aGVycyBhcmUgc2ltcGx5IGlnbm9yZWQuICAoVGhhdCB3b3VsZFxuLy8gYmUgYSB2YWxpZCBleGFtcGxlIG9mIGEgdHJhbnNmb3JtLCBvZiBjb3Vyc2UuKVxuLy9cbi8vIFdoaWxlIHRoZSBvdXRwdXQgaXMgY2F1c2FsbHkgcmVsYXRlZCB0byB0aGUgaW5wdXQsIGl0J3Mgbm90IGFcbi8vIG5lY2Vzc2FyaWx5IHN5bW1ldHJpYyBvciBzeW5jaHJvbm91cyB0cmFuc2Zvcm1hdGlvbi4gIEZvciBleGFtcGxlLFxuLy8gYSB6bGliIHN0cmVhbSBtaWdodCB0YWtlIG11bHRpcGxlIHBsYWluLXRleHQgd3JpdGVzKCksIGFuZCB0aGVuXG4vLyBlbWl0IGEgc2luZ2xlIGNvbXByZXNzZWQgY2h1bmsgc29tZSB0aW1lIGluIHRoZSBmdXR1cmUuXG4vL1xuLy8gSGVyZSdzIGhvdyB0aGlzIHdvcmtzOlxuLy9cbi8vIFRoZSBUcmFuc2Zvcm0gc3RyZWFtIGhhcyBhbGwgdGhlIGFzcGVjdHMgb2YgdGhlIHJlYWRhYmxlIGFuZCB3cml0YWJsZVxuLy8gc3RyZWFtIGNsYXNzZXMuICBXaGVuIHlvdSB3cml0ZShjaHVuayksIHRoYXQgY2FsbHMgX3dyaXRlKGNodW5rLGNiKVxuLy8gaW50ZXJuYWxseSwgYW5kIHJldHVybnMgZmFsc2UgaWYgdGhlcmUncyBhIGxvdCBvZiBwZW5kaW5nIHdyaXRlc1xuLy8gYnVmZmVyZWQgdXAuICBXaGVuIHlvdSBjYWxsIHJlYWQoKSwgdGhhdCBjYWxscyBfcmVhZChuKSB1bnRpbFxuLy8gdGhlcmUncyBlbm91Z2ggcGVuZGluZyByZWFkYWJsZSBkYXRhIGJ1ZmZlcmVkIHVwLlxuLy9cbi8vIEluIGEgdHJhbnNmb3JtIHN0cmVhbSwgdGhlIHdyaXR0ZW4gZGF0YSBpcyBwbGFjZWQgaW4gYSBidWZmZXIuICBXaGVuXG4vLyBfcmVhZChuKSBpcyBjYWxsZWQsIGl0IHRyYW5zZm9ybXMgdGhlIHF1ZXVlZCB1cCBkYXRhLCBjYWxsaW5nIHRoZVxuLy8gYnVmZmVyZWQgX3dyaXRlIGNiJ3MgYXMgaXQgY29uc3VtZXMgY2h1bmtzLiAgSWYgY29uc3VtaW5nIGEgc2luZ2xlXG4vLyB3cml0dGVuIGNodW5rIHdvdWxkIHJlc3VsdCBpbiBtdWx0aXBsZSBvdXRwdXQgY2h1bmtzLCB0aGVuIHRoZSBmaXJzdFxuLy8gb3V0cHV0dGVkIGJpdCBjYWxscyB0aGUgcmVhZGNiLCBhbmQgc3Vic2VxdWVudCBjaHVua3MganVzdCBnbyBpbnRvXG4vLyB0aGUgcmVhZCBidWZmZXIsIGFuZCB3aWxsIGNhdXNlIGl0IHRvIGVtaXQgJ3JlYWRhYmxlJyBpZiBuZWNlc3NhcnkuXG4vL1xuLy8gVGhpcyB3YXksIGJhY2stcHJlc3N1cmUgaXMgYWN0dWFsbHkgZGV0ZXJtaW5lZCBieSB0aGUgcmVhZGluZyBzaWRlLFxuLy8gc2luY2UgX3JlYWQgaGFzIHRvIGJlIGNhbGxlZCB0byBzdGFydCBwcm9jZXNzaW5nIGEgbmV3IGNodW5rLiAgSG93ZXZlcixcbi8vIGEgcGF0aG9sb2dpY2FsIGluZmxhdGUgdHlwZSBvZiB0cmFuc2Zvcm0gY2FuIGNhdXNlIGV4Y2Vzc2l2ZSBidWZmZXJpbmdcbi8vIGhlcmUuICBGb3IgZXhhbXBsZSwgaW1hZ2luZSBhIHN0cmVhbSB3aGVyZSBldmVyeSBieXRlIG9mIGlucHV0IGlzXG4vLyBpbnRlcnByZXRlZCBhcyBhbiBpbnRlZ2VyIGZyb20gMC0yNTUsIGFuZCB0aGVuIHJlc3VsdHMgaW4gdGhhdCBtYW55XG4vLyBieXRlcyBvZiBvdXRwdXQuICBXcml0aW5nIHRoZSA0IGJ5dGVzIHtmZixmZixmZixmZn0gd291bGQgcmVzdWx0IGluXG4vLyAxa2Igb2YgZGF0YSBiZWluZyBvdXRwdXQuICBJbiB0aGlzIGNhc2UsIHlvdSBjb3VsZCB3cml0ZSBhIHZlcnkgc21hbGxcbi8vIGFtb3VudCBvZiBpbnB1dCwgYW5kIGVuZCB1cCB3aXRoIGEgdmVyeSBsYXJnZSBhbW91bnQgb2Ygb3V0cHV0LiAgSW5cbi8vIHN1Y2ggYSBwYXRob2xvZ2ljYWwgaW5mbGF0aW5nIG1lY2hhbmlzbSwgdGhlcmUnZCBiZSBubyB3YXkgdG8gdGVsbFxuLy8gdGhlIHN5c3RlbSB0byBzdG9wIGRvaW5nIHRoZSB0cmFuc2Zvcm0uICBBIHNpbmdsZSA0TUIgd3JpdGUgY291bGRcbi8vIGNhdXNlIHRoZSBzeXN0ZW0gdG8gcnVuIG91dCBvZiBtZW1vcnkuXG4vL1xuLy8gSG93ZXZlciwgZXZlbiBpbiBzdWNoIGEgcGF0aG9sb2dpY2FsIGNhc2UsIG9ubHkgYSBzaW5nbGUgd3JpdHRlbiBjaHVua1xuLy8gd291bGQgYmUgY29uc3VtZWQsIGFuZCB0aGVuIHRoZSByZXN0IHdvdWxkIHdhaXQgKHVuLXRyYW5zZm9ybWVkKSB1bnRpbFxuLy8gdGhlIHJlc3VsdHMgb2YgdGhlIHByZXZpb3VzIHRyYW5zZm9ybWVkIGNodW5rIHdlcmUgY29uc3VtZWQuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07XG5cbnZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudXRpbC5pbmhlcml0cyhUcmFuc2Zvcm0sIER1cGxleCk7XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0YXRlKHN0cmVhbSkge1xuICB0aGlzLmFmdGVyVHJhbnNmb3JtID0gZnVuY3Rpb24gKGVyLCBkYXRhKSB7XG4gICAgcmV0dXJuIGFmdGVyVHJhbnNmb3JtKHN0cmVhbSwgZXIsIGRhdGEpO1xuICB9O1xuXG4gIHRoaXMubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICB0aGlzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuICB0aGlzLndyaXRlY2h1bmsgPSBudWxsO1xuICB0aGlzLndyaXRlZW5jb2RpbmcgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBhZnRlclRyYW5zZm9ybShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIHZhciB0cyA9IHN0cmVhbS5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuXG4gIHZhciBjYiA9IHRzLndyaXRlY2I7XG5cbiAgaWYgKCFjYikge1xuICAgIHJldHVybiBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3dyaXRlIGNhbGxiYWNrIGNhbGxlZCBtdWx0aXBsZSB0aW1lcycpKTtcbiAgfVxuXG4gIHRzLndyaXRlY2h1bmsgPSBudWxsO1xuICB0cy53cml0ZWNiID0gbnVsbDtcblxuICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpIHN0cmVhbS5wdXNoKGRhdGEpO1xuXG4gIGNiKGVyKTtcblxuICB2YXIgcnMgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIHJzLnJlYWRpbmcgPSBmYWxzZTtcbiAgaWYgKHJzLm5lZWRSZWFkYWJsZSB8fCBycy5sZW5ndGggPCBycy5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgc3RyZWFtLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybShvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2Zvcm0pKSByZXR1cm4gbmV3IFRyYW5zZm9ybShvcHRpb25zKTtcblxuICBEdXBsZXguY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZSA9IG5ldyBUcmFuc2Zvcm1TdGF0ZSh0aGlzKTtcblxuICB2YXIgc3RyZWFtID0gdGhpcztcblxuICAvLyBzdGFydCBvdXQgYXNraW5nIGZvciBhIHJlYWRhYmxlIGV2ZW50IG9uY2UgZGF0YSBpcyB0cmFuc2Zvcm1lZC5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuXG4gIC8vIHdlIGhhdmUgaW1wbGVtZW50ZWQgdGhlIF9yZWFkIG1ldGhvZCwgYW5kIGRvbmUgdGhlIG90aGVyIHRoaW5nc1xuICAvLyB0aGF0IFJlYWRhYmxlIHdhbnRzIGJlZm9yZSB0aGUgZmlyc3QgX3JlYWQgY2FsbCwgc28gdW5zZXQgdGhlXG4gIC8vIHN5bmMgZ3VhcmQgZmxhZy5cbiAgdGhpcy5fcmVhZGFibGVTdGF0ZS5zeW5jID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nKSB0aGlzLl90cmFuc2Zvcm0gPSBvcHRpb25zLnRyYW5zZm9ybTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mbHVzaCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmx1c2ggPSBvcHRpb25zLmZsdXNoO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgd3JpdGFibGUgc2lkZSBmaW5pc2hlcywgdGhlbiBmbHVzaCBvdXQgYW55dGhpbmcgcmVtYWluaW5nLlxuICB0aGlzLm9uY2UoJ3ByZWZpbmlzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ZsdXNoID09PSAnZnVuY3Rpb24nKSB0aGlzLl9mbHVzaChmdW5jdGlvbiAoZXIsIGRhdGEpIHtcbiAgICAgIGRvbmUoc3RyZWFtLCBlciwgZGF0YSk7XG4gICAgfSk7ZWxzZSBkb25lKHN0cmVhbSk7XG4gIH0pO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nKSB7XG4gIHRoaXMuX3RyYW5zZm9ybVN0YXRlLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcbiAgcmV0dXJuIER1cGxleC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBlbmNvZGluZyk7XG59O1xuXG4vLyBUaGlzIGlzIHRoZSBwYXJ0IHdoZXJlIHlvdSBkbyBzdHVmZiFcbi8vIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb24gaW4gaW1wbGVtZW50YXRpb24gY2xhc3Nlcy5cbi8vICdjaHVuaycgaXMgYW4gaW5wdXQgY2h1bmsuXG4vL1xuLy8gQ2FsbCBgcHVzaChuZXdDaHVuaylgIHRvIHBhc3MgYWxvbmcgdHJhbnNmb3JtZWQgb3V0cHV0XG4vLyB0byB0aGUgcmVhZGFibGUgc2lkZS4gIFlvdSBtYXkgY2FsbCAncHVzaCcgemVybyBvciBtb3JlIHRpbWVzLlxuLy9cbi8vIENhbGwgYGNiKGVycilgIHdoZW4geW91IGFyZSBkb25lIHdpdGggdGhpcyBjaHVuay4gIElmIHlvdSBwYXNzXG4vLyBhbiBlcnJvciwgdGhlbiB0aGF0J2xsIHB1dCB0aGUgaHVydCBvbiB0aGUgd2hvbGUgb3BlcmF0aW9uLiAgSWYgeW91XG4vLyBuZXZlciBjYWxsIGNiKCksIHRoZW4geW91J2xsIG5ldmVyIGdldCBhbm90aGVyIGNodW5rLlxuVHJhbnNmb3JtLnByb3RvdHlwZS5fdHJhbnNmb3JtID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdfdHJhbnNmb3JtKCkgaXMgbm90IGltcGxlbWVudGVkJyk7XG59O1xuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlO1xuICB0cy53cml0ZWNiID0gY2I7XG4gIHRzLndyaXRlY2h1bmsgPSBjaHVuaztcbiAgdHMud3JpdGVlbmNvZGluZyA9IGVuY29kaW5nO1xuICBpZiAoIXRzLnRyYW5zZm9ybWluZykge1xuICAgIHZhciBycyA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gICAgaWYgKHRzLm5lZWRUcmFuc2Zvcm0gfHwgcnMubmVlZFJlYWRhYmxlIHx8IHJzLmxlbmd0aCA8IHJzLmhpZ2hXYXRlck1hcmspIHRoaXMuX3JlYWQocnMuaGlnaFdhdGVyTWFyayk7XG4gIH1cbn07XG5cbi8vIERvZXNuJ3QgbWF0dGVyIHdoYXQgdGhlIGFyZ3MgYXJlIGhlcmUuXG4vLyBfdHJhbnNmb3JtIGRvZXMgYWxsIHRoZSB3b3JrLlxuLy8gVGhhdCB3ZSBnb3QgaGVyZSBtZWFucyB0aGF0IHRoZSByZWFkYWJsZSBzaWRlIHdhbnRzIG1vcmUgZGF0YS5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICB2YXIgdHMgPSB0aGlzLl90cmFuc2Zvcm1TdGF0ZTtcblxuICBpZiAodHMud3JpdGVjaHVuayAhPT0gbnVsbCAmJiB0cy53cml0ZWNiICYmICF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB0cy50cmFuc2Zvcm1pbmcgPSB0cnVlO1xuICAgIHRoaXMuX3RyYW5zZm9ybSh0cy53cml0ZWNodW5rLCB0cy53cml0ZWVuY29kaW5nLCB0cy5hZnRlclRyYW5zZm9ybSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gbWFyayB0aGF0IHdlIG5lZWQgYSB0cmFuc2Zvcm0sIHNvIHRoYXQgYW55IGRhdGEgdGhhdCBjb21lcyBpblxuICAgIC8vIHdpbGwgZ2V0IHByb2Nlc3NlZCwgbm93IHRoYXQgd2UndmUgYXNrZWQgZm9yIGl0LlxuICAgIHRzLm5lZWRUcmFuc2Zvcm0gPSB0cnVlO1xuICB9XG59O1xuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBEdXBsZXgucHJvdG90eXBlLl9kZXN0cm95LmNhbGwodGhpcywgZXJyLCBmdW5jdGlvbiAoZXJyMikge1xuICAgIGNiKGVycjIpO1xuICAgIF90aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZG9uZShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIGlmIChlcikgcmV0dXJuIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcblxuICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpIHN0cmVhbS5wdXNoKGRhdGEpO1xuXG4gIC8vIGlmIHRoZXJlJ3Mgbm90aGluZyBpbiB0aGUgd3JpdGUgYnVmZmVyLCB0aGVuIHRoYXQgbWVhbnNcbiAgLy8gdGhhdCBub3RoaW5nIG1vcmUgd2lsbCBldmVyIGJlIHByb3ZpZGVkXG4gIHZhciB3cyA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHRzID0gc3RyZWFtLl90cmFuc2Zvcm1TdGF0ZTtcblxuICBpZiAod3MubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgdHJhbnNmb3JtIGRvbmUgd2hlbiB3cy5sZW5ndGggIT0gMCcpO1xuXG4gIGlmICh0cy50cmFuc2Zvcm1pbmcpIHRocm93IG5ldyBFcnJvcignQ2FsbGluZyB0cmFuc2Zvcm0gZG9uZSB3aGVuIHN0aWxsIHRyYW5zZm9ybWluZycpO1xuXG4gIHJldHVybiBzdHJlYW0ucHVzaChudWxsKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3RyYW5zZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL21lc3NhZ2UtdHlwZXNcIjtcclxuaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi9pZC1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgVGFiSWQgfSBmcm9tIFwiLi9jb21tb24tdHlwZXNcIjtcclxuaW1wb3J0IHsgQ2hyYWdFcnJvciB9IGZyb20gXCIuL2Vycm9yc1wiXHJcbmltcG9ydCB7IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzIH0gZnJvbSBcIi4vc2VyaWFsaXplZC1waGlzaGluZy1zb3VyY2Utc2l0ZXNcIjtcclxuaW1wb3J0IHsgRW1wdHlPYmplY3QgfSBmcm9tIFwiLi9lbXB0eS1vYmplY3RcIjtcclxuaW1wb3J0IHsgSTE4bk1lc3NhZ2VzIH0gZnJvbSBcIi4vaTE4blwiO1xyXG5pbXBvcnQgeyBNYXliZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IFZlcnNpb25TdXBwb3J0U3RhdHVzIH0gZnJvbSBcIi4vcHJvdG9jb2wtdmVyc2lvbnNcIjtcclxuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tIFwiLi9zdHJpbmctdXRpbHNcIjtcclxuaW1wb3J0IHsgaXNPYmplY3QsIGlzQm9vbGVhbiwgaXNOdW1iZXIsIGlzQXJyYXkgfSBmcm9tIFwiLi90eXBlLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBTZXJpYWxpemVkQnJvd3NlckluZm8gPSB7XHJcbiAgICBicm93c2VyOiBzdHJpbmcsXHJcbiAgICB1cmxIb3N0bmFtZTogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEgPSB7XHJcbiAgICBjaHJvbWU6IGJvb2xlYW4sXHJcbiAgICBmaXJlZm94OiBib29sZWFuLFxyXG4gICAgZWRnZTogYm9vbGVhblxyXG59XHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEyID0ge1xyXG4gICAgY2hyb21lOiBib29sZWFuLFxyXG4gICAgZmlyZWZveDogYm9vbGVhbixcclxuICAgIGVkZ2U6IGJvb2xlYW4sXHJcbiAgICBlZGdlQ2hyb21pdW06IGJvb2xlYW5cclxufVxyXG5leHBvcnQgdHlwZSBTZXJpYWxpemVkSXNFbmFibGVkRGF0YSA9IFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEgfCBTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxMjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEodmFsdWU6IGFueSk6IHZhbHVlIGlzIFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEge1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJlxyXG4gICAgICAgIGlzQm9vbGVhbih2YWx1ZS5jaHJvbWUpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmZpcmVmb3gpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmVkZ2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxMih2YWx1ZTogYW55KTogdmFsdWUgaXMgU2VyaWFsaXplZElzRW5hYmxlZERhdGFWMTIge1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJlxyXG4gICAgICAgIGlzQm9vbGVhbih2YWx1ZS5jaHJvbWUpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmZpcmVmb3gpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmVkZ2UpICYmXHJcbiAgICAgICAgaXNCb29sZWFuKHZhbHVlLmVkZ2VDaHJvbWl1bSk7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWROYXZpZ2F0aW9uVG9rZW4gPSBzdHJpbmd8bnVtYmVyfFtzdHJpbmd8bnVtYmVyXTtcclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5hdmlnYXRpb24gPSBTZXJpYWxpemVkTmF2aWdhdGlvblRva2VuW107XHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWROYXZNZXRhZGF0YSA9IHtcclxuICAgIHByZWNlZGVuY2U6IG51bWJlcixcclxuICAgIGFsbG93PzogYm9vbGVhbixcclxuICAgIGJsb2NrPzogYm9vbGVhbixcclxuICAgIG5hdmlnYXRlVG86IG51bWJlcixcclxuICAgIHJlcXVpcmVzVXNlckNsaWNrPzogbnVtYmVyXHJcbn07XHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWROYXZTZXFEYXRhID0ge1xyXG4gICAgc2VxOiBTZXJpYWxpemVkTmF2aWdhdGlvbltdLFxyXG4gICAgbWV0YWRhdGE6IFNlcmlhbGl6ZWROYXZNZXRhZGF0YVxyXG59O1xyXG5leHBvcnQgdHlwZSBTZXJpYWxpemVkUGhpc2hpbmdOYXZTZXFEYXRhID0ge1xyXG4gICAgdmVyc2lvbjogbnVtYmVyLFxyXG4gICAgYnVpbHRpblJ1bGVzUHJlY2VkZW5jZTogbnVtYmVyLFxyXG4gICAgc2VxczogU2VyaWFsaXplZE5hdlNlcURhdGFbXVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YSh2YWx1ZTogYW55KTogdmFsdWUgaXMgU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YSB7XHJcbiAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmXHJcbiAgICAgICAgaXNOdW1iZXIodmFsdWUudmVyc2lvbikgJiZcclxuICAgICAgICBpc051bWJlcih2YWx1ZS5idWlsdGluUnVsZXNQcmVjZWRlbmNlKSAmJlxyXG4gICAgICAgIGlzQXJyYXkodmFsdWUuc2Vxcyk7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc1Y3ID0ge1xyXG4gICAgY2hyb21lOiBzdHJpbmdbXSxcclxuICAgIGZpcmVmb3g6IHN0cmluZ1tdLFxyXG4gICAgZWRnZTogc3RyaW5nW11cclxufTtcclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjEyID0ge1xyXG4gICAgY2hyb21lOiBzdHJpbmdbXSxcclxuICAgIGZpcmVmb3g6IHN0cmluZ1tdLFxyXG4gICAgZWRnZTogc3RyaW5nW10sXHJcbiAgICBlZGdlQ2hyb21pdW06IHN0cmluZ1tdXHJcbn07XHJcbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscyA9IFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc1Y3IHwgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjEyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjcodmFsdWU6IGFueSk6IHZhbHVlIGlzIFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc1Y3IHtcclxuICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiZcclxuICAgICAgICBpc0FycmF5KHZhbHVlLmNocm9tZSkgJiZcclxuICAgICAgICBpc0FycmF5KHZhbHVlLmZpcmVmb3gpICYmXHJcbiAgICAgICAgaXNBcnJheSh2YWx1ZS5lZGdlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjEyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBTZXJpYWxpemVkTmV3VGFiUGFnZVVybHNWMTIge1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJlxyXG4gICAgICAgIGlzQXJyYXkodmFsdWUuY2hyb21lKSAmJlxyXG4gICAgICAgIGlzQXJyYXkodmFsdWUuZmlyZWZveCkgJiZcclxuICAgICAgICBpc0FycmF5KHZhbHVlLmVkZ2UpICYmXHJcbiAgICAgICAgaXNBcnJheSh2YWx1ZS5lZGdlQ2hyb21pdW0pO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNZXNzYWdlUGF5bG9hZCA9IEhhbmRzaGFrZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYXVuY2hCcm93c2VyUmVxdWVzdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYXVuY2hCcm93c2VyUmVzcG9uc2VWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnUmVxdWVzdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRydXN0VXJsVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvd25sb2FkQ29tcGxldGVWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nTWVzc2FnZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRVc2VyVHJ1c3RlZE9yaWdpblYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRVc2VyVW50cnVzdGVkT3JpZ2luVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlbHBlckVycm9yVjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvcm1hbnRTdGF0ZUNoYW5nZWRWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXh0ZW5zaW9uUmVhZHlWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXh0ZXJuYWxBcHBMaW5rUmVxdWVzdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbEFwcExpbmtSZXNwb25zZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJc0ZpbGVVUkxUcnVzdGVkUmVxdWVzdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJc0ZpbGVVUkxUcnVzdGVkUmVzcG9uc2VWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2tlZEZpbGVSZXF1ZXN0VjEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsb2NrZWRGaWxlUmVzcG9uc2VWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9wdXBEYXRhUmVxdWVzdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3B1cERhdGFSZXNwb25zZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDbGVhclJlbWVtYmVyZWREZWNpc2lvbnNWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2tlZFBhZ2VTdHJpbmdzUmVxdWVzdFYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCbG9ja2VkUGFnZVN0cmluZ3NSZXNwb25zZVYxIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFydGJlYXRWMSB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5hYmxlZEZlYXR1cmVzUmVxdWVzdFYyIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmFibGVkRmVhdHVyZXNSZXNwb25zZVYyIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDbGVhclJlbWVtYmVyZWRPcmlnaW5WMyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3B0aW9uc0RhdGFSZXF1ZXN0VjMgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNEYXRhUmVzcG9uc2VWMyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnQ2hhbmdlZFYzIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXB1dGF0aW9uQ2hhbmdlZFYzIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjQgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJsb2NrZWRQYWdlRGF0YVJlcXVlc3RWNCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmxvY2tlZFBhZ2VEYXRhUmVzcG9uc2VWNCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnQ2hhbmdlZFY1IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3B1cERhdGFSZXNwb25zZVY1IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCbG9ja2VkUGFnZURhdGFSZXNwb25zZVY2IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcnVzdFVybFY2IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjcgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRydXN0VXJsVjggfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvbnRBc2tBZ2FpblY4IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjggfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvcHVwRGF0YVJlc3BvbnNlVjkgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvbnRBc2tBZ2FpblY5IHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWdDaGFuZ2VkVjkgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0b3BIZWxwZXJWMTAgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkZ2VBY2tWMTAgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZE9mU3RyZWFtVjEwIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFydGJlYXRWMTAgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWMTEgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZ0NoYW5nZWRWMTI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUYWJNZXNzYWdlIHtcclxuICAgIHJlYWRvbmx5IHRhYklkOiBUYWJJZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVGFiTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlUGF5bG9hZCk6IG1lc3NhZ2UgaXMgSVRhYk1lc3NhZ2Uge1xyXG4gICAgcmV0dXJuIChtZXNzYWdlIGFzIElUYWJNZXNzYWdlKS50YWJJZCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJZE1lc3NhZ2Uge1xyXG4gICAgcmVhZG9ubHkgaWQ6IElkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSXNJZE1lc3NhZ2UobWVzc2FnZTogb2JqZWN0KTogbWVzc2FnZSBpcyBJSWRNZXNzYWdlIHtcclxuICAgIHJldHVybiAobWVzc2FnZSBhcyBJSWRNZXNzYWdlKS5pZCAhPT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGF1bmNoQnJvd3NlclJlcXVlc3RWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB1cmxTcGVjOiBzdHJpbmcsIHJlYWRvbmx5IGlkOiBJZCkgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYXVuY2hCcm93c2VyUmVzcG9uc2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcmVhZG9ubHkgdXJsU3BlYzogc3RyaW5nLFxyXG4gICAgICAgICAgICByZWFkb25seSBpZDogSWQsXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGRpZExhdW5jaDogYm9vbGVhbikgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYW5kc2hha2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB2ZXJzaW9ucyA6IHN0cmluZ1tdKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maWdSZXF1ZXN0VjEge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgcGhpc2hpbmdTb3VyY2VTaXRlc1ZlcnNpb246IG51bWJlcixcclxuICAgICAgICByZWFkb25seSBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXNWZXJzaW9uOiBudW1iZXIsXHJcbiAgICAgICAgcmVhZG9ubHkgYnJvd3NlckluZm86IFNlcmlhbGl6ZWRCcm93c2VySW5mbykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYxPFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgcmVhZG9ubHkgYmxvY2tlZFBhZ2VTdHJpbmdzOiBFbXB0eU9iamVjdCwgLy8gRGVwcmVjYXRlZFxyXG4gICAgICAgIHJlYWRvbmx5IHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgIHJlYWRvbmx5IHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICByZWFkb25seSB0cnVzdGVkU2l0ZXMgOiBzdHJpbmdbXSxcclxuICAgICAgICByZWFkb25seSB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgIHJlYWRvbmx5IHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgIHJlYWRvbmx5IHVzZXJVbnRydXN0ZWRPcmlnaW5zIDogc3RyaW5nW10sXHJcbiAgICAgICAgcmVhZG9ubHkgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4pIHsgfVxyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpZ0NoYW5nZWRWMSA9IEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjE8U2VyaWFsaXplZElzRW5hYmxlZERhdGFWMT47XHJcblxyXG5leHBvcnQgdHlwZSBTaXRlQW5kRXhwaXJ5ID0gW3N0cmluZywgbnVtYmVyXTtcclxuZXhwb3J0IGNsYXNzIFJlcHV0YXRpb25DaGFuZ2VkVjMge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgaW5kZXggOiBudW1iZXIsXHJcbiAgICAgICAgcmVhZG9ubHkgdG90YWwgOiBudW1iZXIsXHJcbiAgICAgICAgcmVhZG9ubHkgcmVwdXRhYmxlU2l0ZXM6IFNpdGVBbmRFeHBpcnlbXSkgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcnVzdFVybFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IG5hdmlnYXRlVG9VcmxTcGVjOiBzdHJpbmcsXHJcbiAgICAgICAgcmVhZG9ubHkgYmxvY2tlZFVybFNwZWM6IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSB0cnVzdFVybDogYm9vbGVhbixcclxuICAgICAgICByZWFkb25seSByZW1lbWJlckRlY2lzaW9uOiBib29sZWFuKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERvd25sb2FkQ29tcGxldGVWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB1cmxTcGVjOiBzdHJpbmcsIHJlYWRvbmx5IGZpbGVTcGVjOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBMb2dMZXZlbCB7XHJcbiAgICBJbmZvLFxyXG4gICAgRXJyb3JcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ01lc3NhZ2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBsZXZlbCA6IExvZ0xldmVsLCByZWFkb25seSBtZXNzYWdlIDogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlbHBlckVycm9yVjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3JUeXBlOiBDaHJhZ0Vycm9yLCByZWFkb25seSBlcnJvck1lc3NhZ2U6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb3JtYW50U3RhdGVDaGFuZ2VkVjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaXNEb3JtYW50OiBib29sZWFuKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblJlYWR5VjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgdGFiSWQ6IFRhYklkKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVybmFsQXBwTGlua1JlcXVlc3RWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBsaW5rU3BlYzogc3RyaW5nLCByZWFkb25seSBleHRlcm5hbEFwcE5hbWU6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbEFwcExpbmtSZXNwb25zZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG5hdmlnYXRlVG9TcGVjOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWRkVXNlclRydXN0ZWRPcmlnaW5WMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvcmlnaW4gOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWRkVXNlclVudHJ1c3RlZE9yaWdpblYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9yaWdpbiA6IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJc0ZpbGVVUkxUcnVzdGVkUmVxdWVzdFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBJZCwgcmVhZG9ubHkgZmlsZVVybFNwZWM6IHN0cmluZykge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElzRmlsZVVSTFRydXN0ZWRSZXNwb25zZVYxIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBJZCwgcmVhZG9ubHkgZmlsZVVybFNwZWM6IHN0cmluZywgcmVhZG9ubHkgaXNUcnVzdGVkOiBib29sZWFuKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlZEZpbGVSZXF1ZXN0VjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgZmlsZVVybFNwZWM6IHN0cmluZykge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2NrZWRGaWxlUmVzcG9uc2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBmaWxlVXJsU3BlYzogc3RyaW5nLCByZWFkb25seSBpc1RydXN0ZWQ6IGJvb2xlYW4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cERhdGFSZXF1ZXN0VjEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9wdXBEYXRhUmVzcG9uc2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBwb3B1cE1lc3NhZ2U6IEkxOG5NZXNzYWdlcyxcclxuICAgICAgICByZWFkb25seSBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENsZWFyUmVtZW1iZXJlZERlY2lzaW9uc1YxIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2NrZWRQYWdlU3RyaW5nc1JlcXVlc3RWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBjb250ZW50VHlwZTogTWF5YmU8c3RyaW5nPikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsb2NrZWRQYWdlU3RyaW5nc1Jlc3BvbnNlVjEge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgdGl0bGU6IHN0cmluZywgcmVhZG9ubHkgcXVlc3Rpb246IHN0cmluZykge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlYXJ0YmVhdFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVuYWJsZWRGZWF0dXJlc1JlcXVlc3RWMiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBpZDogSWQsXHJcbiAgICAgICAgcmVhZG9ubHkgcmVzcG9uZEltbWVkaWF0ZWx5OiBib29sZWFuKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW5hYmxlZEZlYXR1cmVzUmVzcG9uc2VWMiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBpZDogSWQsXHJcbiAgICAgICAgcmVhZG9ubHkgbGlua1Byb3RlY3Rpb246IGJvb2xlYW4sXHJcbiAgICAgICAgcmVhZG9ubHkgZmlsZVVSTFByb3RlY3Rpb246IGJvb2xlYW4sXHJcbiAgICAgICAgcmVhZG9ubHkgcGRmUHJvdGVjdGlvbjogYm9vbGVhbixcclxuICAgICAgICByZWFkb25seSBkb3dubG9hZFByb3RlY3Rpb246IGJvb2xlYW4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJlbWVtYmVyZWRPcmlnaW5UeXBlcyB7XHJcbiAgICBUcnVzdGVkLFxyXG4gICAgVW50cnVzdGVkXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGVhclJlbWVtYmVyZWRPcmlnaW5WMyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByZWFkb25seSBvcmlnaW46IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSB0eXBlOiBSZW1lbWJlcmVkT3JpZ2luVHlwZXMpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zRGF0YVJlcXVlc3RWMyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPcHRpb25zRGF0YVJlc3BvbnNlVjMge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcmVhZG9ubHkgc3VwcG9ydFN0YXR1czogVmVyc2lvblN1cHBvcnRTdGF0dXMsXHJcbiAgICAgICAgcmVhZG9ubHkgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgcmVhZG9ubHkgdXNlclRydXN0ZWRPcmlnaW5zOiBzdHJpbmdbXSxcclxuICAgICAgICByZWFkb25seSB1c2VyVW50cnVzdGVkT3JpZ2luczogc3RyaW5nW10pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYzPFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4gZXh0ZW5kcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYxPFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZDogVFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3M6IEVtcHR5T2JqZWN0LCAvLyBEZXByZWNhdGVkXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IHByaW9yaXRpc2VUcnVzdGVkU2l0ZXM6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgaXNFbmFibGVkLFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3MsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFYzID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWMzxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY0PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4gZXh0ZW5kcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYzPFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZDogVFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3M6IEVtcHR5T2JqZWN0LCAvLyBEZXByZWNhdGVkXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IHByb21wdEZvclVuY2F0ZWdvcml6ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgaXNFbmFibGVkLFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3MsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXMpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFY0ID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWNDxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2VkUGFnZURhdGFSZXF1ZXN0VjQge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgY29udGVudFR5cGU6IE1heWJlPHN0cmluZz4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2VkUGFnZURhdGFSZXNwb25zZVY0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IHRpdGxlOiBzdHJpbmcsXHJcbiAgICAgICAgcmVhZG9ubHkgcXVlc3Rpb246IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSByZW1lbWJlckRlY2lzaW9uc0RlZmF1bHQ6IGJvb2xlYW4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY1PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4gZXh0ZW5kcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY0PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZDogVFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3M6IEVtcHR5T2JqZWN0LCAvLyBEZXByZWNhdGVkXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgaXNFbmFibGVkLFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3MsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlnQ2hhbmdlZFY1ID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWNTxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cERhdGFSZXNwb25zZVY1IGV4dGVuZHMgUG9wdXBEYXRhUmVzcG9uc2VWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcG9wdXBNZXNzYWdlOiBJMThuTWVzc2FnZXMsXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBpc0VudGVycHJpc2VQcm9kdWN0OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIocG9wdXBNZXNzYWdlLCBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcilcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2VkUGFnZURhdGFSZXNwb25zZVY2IGV4dGVuZHMgQmxvY2tlZFBhZ2VEYXRhUmVzcG9uc2VWNCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICAgICAgcXVlc3Rpb246IHN0cmluZyxcclxuICAgICAgICAgICAgcmVhZG9ubHkgb3BlbmVkU2VjdXJlRXhwbGFuYXRpb246IHN0cmluZyxcclxuICAgICAgICAgICAgcmVtZW1iZXJEZWNpc2lvbnNEZWZhdWx0OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIodGl0bGUsIHF1ZXN0aW9uLCByZW1lbWJlckRlY2lzaW9uc0RlZmF1bHQpO1xyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRydXN0VXJsVjYgZXh0ZW5kcyBUcnVzdFVybFYxIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvVXJsU3BlYzogc3RyaW5nLFxyXG4gICAgICAgICAgICBibG9ja2VkVXJsU3BlYzogc3RyaW5nLFxyXG4gICAgICAgICAgICB0cnVzdFVybDogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVtZW1iZXJEZWNpc2lvbjogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgY29udGVudFR5cGU6IE1heWJlPHN0cmluZz4pIHtcclxuICAgICAgICBzdXBlcihuYXZpZ2F0ZVRvVXJsU3BlYywgYmxvY2tlZFVybFNwZWMsIHRydXN0VXJsLCByZW1lbWJlckRlY2lzaW9uKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY3PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YSwgVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscz4gZXh0ZW5kcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY1PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YT4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZDogVFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZVN0cmluZ3M6IEVtcHR5T2JqZWN0LCAvLyBEZXByZWNhdGVkXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IG5ld1RhYlBhZ2VVcmxzOiBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzfEVtcHR5T2JqZWN0KSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZCxcclxuICAgICAgICAgICAgYmxvY2tlZFBhZ2VTdHJpbmdzLFxyXG4gICAgICAgICAgICBwaGlzaGluZ1NvdXJjZVNpdGVzLFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdW50cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyLFxyXG4gICAgICAgICAgICBwcmlvcml0aXNlVHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICBwcm9tcHRGb3JVbmNhdGVnb3JpemVkLFxyXG4gICAgICAgICAgICBpc0VudGVycHJpc2VQcm9kdWN0KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpZ0NoYW5nZWRWNyA9IEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjc8U2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSwgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjc+O1xyXG5cclxuZXhwb3J0IGNsYXNzIFRydXN0VXJsVjggZXh0ZW5kcyBUcnVzdFVybFY2IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBuYXZpZ2F0ZVRvVXJsU3BlYzogc3RyaW5nLFxyXG4gICAgICAgICAgICBibG9ja2VkVXJsU3BlYzogc3RyaW5nLFxyXG4gICAgICAgICAgICB0cnVzdFVybDogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVtZW1iZXJEZWNpc2lvbjogYm9vbGVhbixcclxuICAgICAgICAgICAgcmVhZG9ubHkgZG9udEFza0FnYWluOiBib29sZWFuLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogTWF5YmU8c3RyaW5nPikge1xyXG4gICAgICAgIHN1cGVyKG5hdmlnYXRlVG9VcmxTcGVjLCBibG9ja2VkVXJsU3BlYywgdHJ1c3RVcmwsIHJlbWVtYmVyRGVjaXNpb24sIGNvbnRlbnRUeXBlKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb250QXNrQWdhaW5WOCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY4PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YSwgVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscz4gZXh0ZW5kcyBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY3PFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YSwgVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscz4ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIGlzRW5hYmxlZDogVFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ1NvdXJjZVNpdGVzOiBTZXJpYWxpemVkUGhpc2hpbmdTb3VyY2VTaXRlc3xFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgcGhpc2hpbmdOYXZpZ2F0aW9uU2VxdWVuY2VzOiBTZXJpYWxpemVkUGhpc2hpbmdOYXZTZXFEYXRhfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICB0cnVzdGVkU2l0ZXMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdW50cnVzdGVkU2l0ZXMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJVbnRydXN0ZWRPcmlnaW5zIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyOiBib29sZWFuLFxyXG4gICAgICAgICAgICBwcmlvcml0aXNlVHJ1c3RlZFNpdGVzOiBib29sZWFuLFxyXG4gICAgICAgICAgICBwcm9tcHRGb3JVbmNhdGVnb3JpemVkOiBib29sZWFuLFxyXG4gICAgICAgICAgICBpc0VudGVycHJpc2VQcm9kdWN0OiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBpc0NvbnN1bWVyUHJvZHVjdDogYm9vbGVhbixcclxuICAgICAgICAgICAgbmV3VGFiUGFnZVVybHM6IFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IGJsb2NrZWRQYWdlTGVhcm5Nb3JlVVJMOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgaXNFbmFibGVkLFxyXG4gICAgICAgICAgICB7fSwgLy8gYmxvY2tlZFBhZ2VTdHJpbmdzIGlzIGRlcHJlY3RlZCBidXQgaXQncyBhd2t3YXJkIHRvIHJlbW92ZSBiZWNhdXNlIG1lc3NhZ2VzIGluaGVyaXQgZnJvbSBwcmV2aW91cyB2ZXJzaW9uc1xyXG4gICAgICAgICAgICBwaGlzaGluZ1NvdXJjZVNpdGVzLFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdW50cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyLFxyXG4gICAgICAgICAgICBwcmlvcml0aXNlVHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICBwcm9tcHRGb3JVbmNhdGVnb3JpemVkLFxyXG4gICAgICAgICAgICBpc0VudGVycHJpc2VQcm9kdWN0LFxyXG4gICAgICAgICAgICBuZXdUYWJQYWdlVXJscylcclxuICAgIH1cclxufVxyXG5leHBvcnQgdHlwZSBDb25maWdDaGFuZ2VkVjggPSBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFY4PFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhVjEsIFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc1Y3PjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cERhdGFSZXNwb25zZVY5IGV4dGVuZHMgUG9wdXBEYXRhUmVzcG9uc2VWNSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcG9wdXBNZXNzYWdlOiBJMThuTWVzc2FnZXMsXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyOiBib29sZWFuLFxyXG4gICAgICAgICAgICBpc0VudGVycHJpc2VQcm9kdWN0OiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBkb250QXNrQWdhaW46IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihwb3B1cE1lc3NhZ2UsIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyLCBpc0VudGVycHJpc2VQcm9kdWN0KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRG9udEFza0FnYWluVjkgZXh0ZW5kcyBEb250QXNrQWdhaW5WOCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBkb250QXNrQWdhaW46IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWOTxUU2VyaWFsaXplZElzRW5hYmxlZERhdGEsIFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHM+IGV4dGVuZHMgRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWODxUU2VyaWFsaXplZElzRW5hYmxlZERhdGEsIFRTZXJpYWxpemVkTmV3VGFiUGFnZVVybHM+IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgcGhpc2hpbmdTb3VyY2VTaXRlczogU2VyaWFsaXplZFBoaXNoaW5nU291cmNlU2l0ZXN8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlczogU2VyaWFsaXplZFBoaXNoaW5nTmF2U2VxRGF0YXxFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVudHJ1c3RlZFNpdGVzIDogc3RyaW5nW10sXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICBvcGVuUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlcjogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJpb3JpdGlzZVRydXN0ZWRTaXRlczogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJvbXB0Rm9yVW5jYXRlZ29yaXplZDogYm9vbGVhbixcclxuICAgICAgICAgICAgaXNFbnRlcnByaXNlUHJvZHVjdDogYm9vbGVhbixcclxuICAgICAgICAgICAgaXNDb25zdW1lclByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIG5ld1RhYlBhZ2VVcmxzOiBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBibG9ja2VkUGFnZUxlYXJuTW9yZVVSTDogc3RyaW5nLFxyXG4gICAgICAgICAgICByZWFkb25seSBkb250QXNrQWdhaW46IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgaXNFbmFibGVkLFxyXG4gICAgICAgICAgICBwaGlzaGluZ1NvdXJjZVNpdGVzLFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXMsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdW50cnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHVzZXJUcnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMsXHJcbiAgICAgICAgICAgIG9wZW5QaGlzaGluZ0xpbmtzSW5TZWN1cmVCcm93c2VyLFxyXG4gICAgICAgICAgICBwcmlvcml0aXNlVHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICBwcm9tcHRGb3JVbmNhdGVnb3JpemVkLFxyXG4gICAgICAgICAgICBpc0VudGVycHJpc2VQcm9kdWN0LFxyXG4gICAgICAgICAgICBpc0NvbnN1bWVyUHJvZHVjdCxcclxuICAgICAgICAgICAgbmV3VGFiUGFnZVVybHMsXHJcbiAgICAgICAgICAgIGJsb2NrZWRQYWdlTGVhcm5Nb3JlVVJMKVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpZ0NoYW5nZWRWOSA9IEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjk8U2VyaWFsaXplZElzRW5hYmxlZERhdGFWMSwgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjc+O1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3BIZWxwZXJWMTAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRWRnZUFja1YxMCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbmRPZlN0cmVhbVYxMCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIZWFydGJlYXRWMTAgZXh0ZW5kcyBIZWFydGJlYXRWMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZCA6IElkKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gRG9uJ3QgZXh0ZW50IFBvcHVwRGF0YVJlc3BvbnNlVjkgc2luY2UgUGhpc2hpbmdMaW5rc0luU2VjdXJlQnJvd3NlciBhbmQgZG9udEFza0FnYWluIGhhdmUgYmVlbiBkZXByZWNhdGVkXHJcbmV4cG9ydCBjbGFzcyBQb3B1cERhdGFSZXNwb25zZVYxMSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcmVhZG9ubHkgcG9wdXBNZXNzYWdlOiBJMThuTWVzc2FnZXMsXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IHNob3dDbGVhclJlbWVtYmVyZWREZWNpc2lvbnNJbmZvOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBpc0VudGVycHJpc2VQcm9kdWN0OiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBoZWxwTGlua1VSTDogc3RyaW5nKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFByb2R1Y3RTdGF0dXNlcyB7XHJcbiAgICBFbmFibGVkLFxyXG4gICAgRGlzYWJsZWQsXHJcbiAgICBJbml0UmVxdWlyZWQsXHJcbiAgICBVbmxpY2Vuc2VkLFxyXG4gICAgVW5rbm93blxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWMTE8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjk8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgaXNFbmFibGVkOiBUU2VyaWFsaXplZElzRW5hYmxlZERhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ1NvdXJjZVNpdGVzfEVtcHR5T2JqZWN0LFxyXG4gICAgICAgICAgICBwaGlzaGluZ05hdmlnYXRpb25TZXF1ZW5jZXM6IFNlcmlhbGl6ZWRQaGlzaGluZ05hdlNlcURhdGF8RW1wdHlPYmplY3QsXHJcbiAgICAgICAgICAgIHRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyA6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICB1c2VyVHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgdXNlclVudHJ1c3RlZE9yaWdpbnMgOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3Q6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGlzQ29uc3VtZXJQcm9kdWN0OiBib29sZWFuLFxyXG4gICAgICAgICAgICBuZXdUYWJQYWdlVXJsczogVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc3xFbXB0eU9iamVjdCxcclxuICAgICAgICAgICAgYmxvY2tlZFBhZ2VMZWFybk1vcmVVUkw6IHN0cmluZyxcclxuICAgICAgICAgICAgZG9udEFza0FnYWluOiBib29sZWFuLFxyXG4gICAgICAgICAgICByZWFkb25seSBzZWN1cmVCcm93c2VyUmVkaXJlY3RUcnVzdGVkU2l0ZXM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHJlYWRvbmx5IHByb2R1Y3RTdGF0dXM6IFByb2R1Y3RTdGF0dXNlcykge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nU291cmNlU2l0ZXMsXHJcbiAgICAgICAgICAgIHBoaXNoaW5nTmF2aWdhdGlvblNlcXVlbmNlcyxcclxuICAgICAgICAgICAgdHJ1c3RlZFNpdGVzLFxyXG4gICAgICAgICAgICB1bnRydXN0ZWRTaXRlcyxcclxuICAgICAgICAgICAgdXNlclRydXN0ZWRPcmlnaW5zLFxyXG4gICAgICAgICAgICB1c2VyVW50cnVzdGVkT3JpZ2lucyxcclxuICAgICAgICAgICAgb3BlblBoaXNoaW5nTGlua3NJblNlY3VyZUJyb3dzZXIsXHJcbiAgICAgICAgICAgIHByaW9yaXRpc2VUcnVzdGVkU2l0ZXMsXHJcbiAgICAgICAgICAgIHByb21wdEZvclVuY2F0ZWdvcml6ZWQsXHJcbiAgICAgICAgICAgIGlzRW50ZXJwcmlzZVByb2R1Y3QsXHJcbiAgICAgICAgICAgIGlzQ29uc3VtZXJQcm9kdWN0LFxyXG4gICAgICAgICAgICBuZXdUYWJQYWdlVXJscyxcclxuICAgICAgICAgICAgYmxvY2tlZFBhZ2VMZWFybk1vcmVVUkwsXHJcbiAgICAgICAgICAgIGRvbnRBc2tBZ2FpbilcclxuICAgIH1cclxufVxyXG5leHBvcnQgdHlwZSBDb25maWdDaGFuZ2VkVjExID0gRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWMTE8U2VyaWFsaXplZElzRW5hYmxlZERhdGFWMTIsIFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJsc1YxMj47XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaWJsZUNvbmZpZ0NoYW5nZWRWMTI8VFNlcmlhbGl6ZWRJc0VuYWJsZWREYXRhLCBUU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzPiBleHRlbmRzIEV4dGVuc2libGVDb25maWdDaGFuZ2VkVjExPFRTZXJpYWxpemVkSXNFbmFibGVkRGF0YSwgVFNlcmlhbGl6ZWROZXdUYWJQYWdlVXJscz4ge1xyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpZ0NoYW5nZWRWMTIgPSBFeHRlbnNpYmxlQ29uZmlnQ2hhbmdlZFYxMjxTZXJpYWxpemVkSXNFbmFibGVkRGF0YVYxMiwgU2VyaWFsaXplZE5ld1RhYlBhZ2VVcmxzVjEyPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHJlYWRvbmx5IHR5cGU6IE1lc3NhZ2VUeXBlLFxyXG4gICAgICAgIHJlYWRvbmx5IHBheWxvYWQ6IE1lc3NhZ2VQYXlsb2FkKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lc3NhZ2VUb1N0cmluZyhtZXNzYWdlOiBNZXNzYWdlKTogc3RyaW5nIHtcclxuICAgIC8vIExvZyB0aGUgcmVwdXRhYmxlIHNpdGVzIGxpc3QgY29uY2lzZWx5IHNpbmNlIGl0J3MgdmVyeSBsb25nLlxyXG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gTWVzc2FnZVR5cGUucmVwdXRhdGlvbkNoYW5nZWRWMykge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQgYXMgUmVwdXRhdGlvbkNoYW5nZWRWMztcclxuICAgICAgICBsZXQgc3RyID0gYE9iamVjdHtcXG5cXHRgICtcclxuICAgICAgICAgICAgICAgICAgYHR5cGU6ICR7TWVzc2FnZVR5cGUucmVwdXRhdGlvbkNoYW5nZWRWM30sXFxuXFx0YCArXHJcbiAgICAgICAgICAgICAgICAgIGBwYXlsb2FkOiBPYmplY3R7XFxuXFx0XFx0XFx0YCArXHJcbiAgICAgICAgICAgICAgICAgIGBpbmRleDogJHtwYXlsb2FkLmluZGV4fSxcXG5cXHRcXHRcXHRgICtcclxuICAgICAgICAgICAgICAgICAgYHRvdGFsOiAke3BheWxvYWQudG90YWx9LFxcblxcdFxcdFxcdGAgK1xyXG4gICAgICAgICAgICAgICAgICBgcmVwdXRhYmxlU2l0ZTogWyBgO1xyXG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcGF5bG9hZC5yZXB1dGFibGVTaXRlcykge1xyXG4gICAgICAgICAgICBzdHIgKz0gYFske2VudHJ5WzBdfSwke2VudHJ5WzFdfV0sIGBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyICs9IFwiXSxcXG5cXHR9LFxcbn1cIlxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0b1N0cmluZyhtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9tZXNzYWdlcy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgaXNNZXNzYWdlVHlwZSB9IGZyb20gXCIuL21lc3NhZ2UtdHlwZXNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL21lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tIFwiLi9udW1iZXItdXRpbHNcIjtcclxuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcIi4vZXZlbnQtZGlzcGF0Y2hlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU1lc3NhZ2UoZW5jb2RlZE1lc3NhZ2U6IG9iamVjdCk6IE1heWJlPE1lc3NhZ2U+IHtcclxuICAgIGxldCBtZXNzYWdlID0gZW5jb2RlZE1lc3NhZ2UgYXMgTWVzc2FnZTtcclxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIFRyeSBwYXJzaW5nIHRoZSBlbmNvZGVkTWVzc2FnZSBhcyBhIHN0cmluZyBpbnN0ZWFkIG9mIGFuIG9iamVjdCBpZiBjYXN0aW5nXHJcbiAgICAgICAgLy8gdG8gdGhlIE1lc3NhZ2UgdHlwZSBmYWlscy4gVGhpcyBpcyByZXF1aXJlZCBmb3IgZGVjb2RpbmcgbWVzc2FnZXMgaW4gRWRnZS5cclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5wYXJzZShlbmNvZGVkTWVzc2FnZS50b1N0cmluZygpKTtcclxuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzTnVtYmVyKG1lc3NhZ2UudHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc01lc3NhZ2VUeXBlKG1lc3NhZ2UudHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGVjb2RlZEV2ZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IE1lc3NhZ2UpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VEZWNvZGVyIHtcclxuICAgIG9uTWVzc2FnZURlY29kZWQ6IEV2ZW50RGlzcGF0Y2hlcjxNZXNzYWdlRGVjb2RlZEV2ZW50PjtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1kZWNvZGVyLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBkb09uY2UgfSBmcm9tIFwiLi9vbmNlXCI7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgSGFuZGxlRXZlbnQ8RXZlbnQ+ID0gKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXI8RXZlbnQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZlbnRIYW5kbGVyOiBIYW5kbGVFdmVudDxFdmVudD4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMucHVzaChldmVudEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25lU2hvdEV2ZW50SGFuZGxlcihldmVudEhhbmRsZXI6IEhhbmRsZUV2ZW50PEV2ZW50Pik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25lU2hvdEV2ZW50SGFuZGxlcnMucHVzaChldmVudEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVFdmVudCBvZiB0aGlzLmV2ZW50SGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZUV2ZW50IG9mIHRoaXMub25lU2hvdEV2ZW50SGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uZVNob3RFdmVudEhhbmRsZXJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBldmVudEhhbmRsZXJzID0gbmV3IEFycmF5PEhhbmRsZUV2ZW50PEV2ZW50Pj4oKTtcclxuICAgIHByaXZhdGUgb25lU2hvdEV2ZW50SGFuZGxlcnMgPSBuZXcgQXJyYXk8SGFuZGxlRXZlbnQ8RXZlbnQ+PigpO1xyXG59XHJcblxyXG4vLyBDb25kaXRpb25EaXNwYXRjaGVyIGlzIGEgc3BlY2lhbGlzZWQgRXZlbnREaXNwYXRjaGVyIGRlc2lnbmVkIHRvIG5vdGlmeVxyXG4vLyBsaXN0ZW5lcnMgYSBzaW5nbGUgdGltZSB3aGVuIGEgY29uZGl0aW9uIGlzIHNldC4gVW5saWtlIEV2ZW50RGlzcGF0Y2hlcixcclxuLy8gYSBsaXN0ZW5lciB3aGljaCByZWdpc3RlcnMgbGF0ZSBkb2Vzbid0IG1pc3MgYW55dGhpbmcgYW5kIGlzIGltbWVkaWF0ZWx5XHJcbi8vIG5vdGlmaWVkIHRoYXQgdGhlIGNvbmRpdGlvbiBpcyBhbHJlYWR5IHNhdGlzaWZlZC5cclxuZXhwb3J0IHR5cGUgSGFuZGxlQ29uZGl0aW9uID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25EaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcmVnaXN0ZXJDb25kaXRpb25MaXN0ZW5lcihjb25kaXRpb25IYW5kbGVyOiBIYW5kbGVDb25kaXRpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgY29uZGl0aW9uSGFuZGxlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uSGFuZGxlcnMucHVzaChjb25kaXRpb25IYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29uZGl0aW9uID0gZG9PbmNlKCgpID0+IHt0aGlzLnNldENvbmRpdGlvbkltcGwoKX0pO1xyXG5cclxuICAgIHByaXZhdGUgc2V0Q29uZGl0aW9uSW1wbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVDb25kaXRpb24gb2YgdGhpcy5jb25kaXRpb25IYW5kbGVycykge1xyXG4gICAgICAgICAgICBoYW5kbGVDb25kaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25IYW5kbGVycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uZGl0aW9uID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGNvbmRpdGlvbkhhbmRsZXJzID0gbmV3IEFycmF5PEhhbmRsZUNvbmRpdGlvbj4oKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXZlbnQtZGlzcGF0Y2hlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UsIE1lc3NhZ2VQYXlsb2FkIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVNZXNzYWdlKHR5cGU6IE1lc3NhZ2VUeXBlLCBwYXlsb2FkOiBNZXNzYWdlUGF5bG9hZCk6IE1lc3NhZ2Uge1xyXG4gICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9O1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLWVuY29kZXIudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IGlzSW5SYW5nZSB9IGZyb20gXCIuL251bWJlci11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGVudW0gQ2hyYWdFcnJvciB7XHJcbiAgICBub3RFbmFibGVkLFxyXG4gICAgaGVscGVyUG9ydEVycm9yLFxyXG4gICAgbGF1bmNoQnJvd3NlckZhaWxlZCxcclxuICAgIHRydXN0RG93bmxvYWRGYWlsZWQsXHJcbiAgICBoYW5kc2hha2VFcnJvcixcclxuICAgIHVua25vd25FcnJvcixcclxuICAgIHJlY292ZXJlZEZyb21FcnJvcixcclxuICAgIGlzMzJiaXRGaXJlZm94LFxyXG4gICAgaGVscGVyVW5yZXNwb25zaXZlXHJcbn1cclxuXHJcbi8vIEhhdmUgc2VwZXJhdGUgZW51bSBmb3IgbWluIGFuZCBtYXggc28gdGhhdCBlYWNoIENocmFnRXJyb3IgdmFsdWUgY29ycmVzcG9uZHNcclxuLy8gdG8gYSB1bmlxdWUgbmFtZS4gT3RoZXJ3aXNlIFwiQ2hyYWdFcnJvci5ub3RFbmFibGVkXCIgbWF5IGJlIGxvZ2dlZCBhc1xyXG4vLyBcIkNocmFnRXJyb3IubWluXCIuXHJcbmVudW0gQ2hyYWdFcnJvckxpbWl0cyB7XHJcbiAgICBtaW4gPSBDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsXHJcbiAgICBtYXggPSBDaHJhZ0Vycm9yLmhlbHBlclVucmVzcG9uc2l2ZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJhZ0Vycm9yKHR5cGU6IENocmFnRXJyb3IpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc0luUmFuZ2UodHlwZSwgQ2hyYWdFcnJvckxpbWl0cy5taW4sIENocmFnRXJyb3JMaW1pdHMubWF4KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRXJyb3IodmFsdWU6IGFueSk6IHZhbHVlIGlzIEVycm9yIHtcclxuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEVycm9yO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9lcnJvcnMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IFVSTCwgcGFyc2VVcmwsIFVSTFRvU3RyaW5nIH0gZnJvbSBcIi4vdXJsLXV0aWxzXCI7XHJcbmltcG9ydCB7IGZpbmREb2N1bWVudFVybCwgZmluZFVSTERvY3VtZW50UXVlcnlQYXJhbSwgZmluZERvY3VtZW50UXVlcnlQYXJhbSB9IGZyb20gXCIuL3VybC1wYXJzZS11dGlsc1wiO1xyXG5pbXBvcnQgeyBPcHRpb25OYW1lcyB9IGZyb20gXCIuL2V4dGVybmFsLWFwcC1saW5rLXBhZ2Utb3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBub25lLCBNYXliZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IEV4dGVybmFsQXBwTGlua0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9leHRlcm5hbC1hcHAtbGluay1jb250cm9sbGVyXCI7XHJcblxyXG5jbGFzcyBPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGxpbmtVUkw6IFVSTCwgcmVhZG9ubHkgZXh0ZXJuYWxBcHBOYW1lOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZU9wdGlvbnMod2luZG93OiBXaW5kb3cpOiBNYXliZTxPcHRpb25zPiB7XHJcbiAgICBjb25zdCBkb2N1bWVudFVSTCA9IGZpbmREb2N1bWVudFVybCh3aW5kb3cpO1xyXG4gICAgaWYgKG5vbmUoZG9jdW1lbnRVUkwpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IGxpbmtVUkwgPSBmaW5kVVJMRG9jdW1lbnRRdWVyeVBhcmFtKGRvY3VtZW50VVJMLCBPcHRpb25OYW1lcy5saW5rU3BlYyk7XHJcbiAgICBpZiAobm9uZShsaW5rVVJMKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBleHRlcm5hbEFwcE5hbWUgPSBmaW5kRG9jdW1lbnRRdWVyeVBhcmFtKGRvY3VtZW50VVJMLCBPcHRpb25OYW1lcy5leHRlcm5hbEFwcE5hbWUpO1xyXG4gICAgaWYgKG5vbmUoZXh0ZXJuYWxBcHBOYW1lKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IE9wdGlvbnMobGlua1VSTCwgZXh0ZXJuYWxBcHBOYW1lKTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzU0OTc2XHJcbmZ1bmN0aW9uIGluaXRDaHJvbWVSdW50aW1lKCkge1xyXG4gICAgY29uc3QgcnVudGltZSA9IGNocm9tZS5ydW50aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWluKHdpbmRvdzogV2luZG93KSB7XHJcbiAgICBpbml0Q2hyb21lUnVudGltZSgpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyh3aW5kb3cpO1xyXG4gICAgaWYgKG5vbmUob3B0aW9ucykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcclxuICAgIGNvbnN0IGxpbmtTcGVjID0gVVJMVG9TdHJpbmcob3B0aW9ucy5saW5rVVJMKTtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gbGlua1NwZWM7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEV4dGVybmFsQXBwTGlua0NvbnRyb2xsZXIoZG9jdW1lbnQsIG9wdGlvbnMubGlua1VSTCwgb3B0aW9ucy5leHRlcm5hbEFwcE5hbWUpO1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgbWFpbih3aW5kb3cpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tYWluLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBNYXliZSwgc29tZSwgbm9uZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IEhhc2ggfSBmcm9tIFwiLi9oYXNoXCI7XHJcbmltcG9ydCB7IG11cm11ckhhc2ggfSBmcm9tIFwiLi9tdXJtdXItaGFzaFwiO1xyXG5pbXBvcnQgeyBVUkwsIFVSTE9yU3BlYywgcGFyc2VVcmwgfSBmcm9tIFwiLi91cmwtdXRpbHNcIjtcclxuaW1wb3J0IHsgSGFzaFNldCB9IGZyb20gXCIuL2hhc2gtbWFwXCI7XHJcbmltcG9ydCB7IGxvZywgbG9nRXJyb3IgfSBmcm9tIFwiLi9sb2dcIjtcclxuaW1wb3J0IHsgUWxvYmJlclRydWUsIFFsb2JiZXIgfSBmcm9tIFwicWxvYmJlclwiO1xyXG5pbXBvcnQgeyBTaXRlQW5kRXhwaXJ5IH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuXHJcbmNvbnN0IGV4Y2x1c2lvblByZWZpeCA9IFwiXlwiO1xyXG5cclxuLy8gUmVndWxhciBleHByZXNzaW9uIGZyb20gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNwYWdlLTUwXHJcbmNvbnN0IHdpbGRjYXJkU3BlY1JlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oKFteOi8/I10rKTopPygvLyhbXi8/I10qKSk/KFtePyNdKikoXFxcXD8oW14jXSopKT8oIyguKikpP1wiKTtcclxuXHJcbmVudW0gV2lsZGNhcmRTcGVjR3JvdXAge1xyXG4gICAgU2NoZW1lID0gMSxcclxuICAgIEhvc3RBbmRQb3J0ID0gNFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3JpZ2luUGFyc2VPcHRpb25zIHtcclxuICAgIHJlYWRvbmx5IGFsbG93Tm9uV2ViU2FmZVNjaGVtZXMgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd0ZpbGVTY2hlbWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlYWRvbmx5IGFsbG93Q2hyb21lU2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dFZGdlU2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dBYm91dFNjaGVtZSA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlYWRvbmx5IGFsbG93Q2hyb21lRXh0ZW5zaW9uU2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dGaXJlZm94RXh0ZW5zaW9uU2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dFZGdlRXh0ZW5zaW9uU2NoZW1lIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVhZG9ubHkgYWxsb3dXaWxkY2FyZHMgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWFkb25seSBhbGxvd01pc3NpbmdXaWxkY2FyZFNjaGVtZSA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlYWRvbmx5IGFsbG93VHJhaWxpbmdXaWxkY2FyZHMgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM/IDogUGFydGlhbDxPcmlnaW5QYXJzZU9wdGlvbnM+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9yaWdpbkhhc2hPcHRpb25zIHtcclxuICAgIHJlYWRvbmx5IHNlZWQgOiBIYXNoID0gMDtcclxuICAgIHJlYWRvbmx5IGlnbm9yZUh0dHBIdHRwc0RpZmZlcmVuY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlYWRvbmx5IGlnbm9yZVBvcnQgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM/IDogUGFydGlhbDxPcmlnaW5IYXNoT3B0aW9ucz4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBTY2hlbWUge1xyXG4gICAgSFRUUCA9IFwiaHR0cDpcIixcclxuICAgIEhUVFBTID0gXCJodHRwczpcIixcclxuICAgIEZUUCA9IFwiZnRwOlwiLFxyXG4gICAgRlRQUyA9IFwiZnRwczpcIixcclxuICAgIFdTID0gXCJ3czpcIixcclxuICAgIFdTUyA9IFwid3NzOlwiLFxyXG4gICAgRklMRSA9IFwiZmlsZTpcIixcclxuICAgIENIUk9NRSA9IFwiY2hyb21lOlwiLFxyXG4gICAgRURHRSA9IFwiZWRnZTpcIixcclxuICAgIEFCT1VUID0gXCJhYm91dDpcIixcclxuICAgIEpBVkFTQ1JJUFQgPSBcImphdmFzY3JpcHQ6XCIsXHJcbiAgICBDSFJPTUVfRVhURU5TSU9OID0gXCJjaHJvbWUtZXh0ZW5zaW9uOlwiLFxyXG4gICAgRklSRUZPWF9FWFRFTlNJT04gPSBcIm1vei1leHRlbnNpb246XCIsXHJcbiAgICBFREdFX0VYVEVOU0lPTiA9IFwibXMtYnJvd3Nlci1leHRlbnNpb246XCIsXHJcbiAgICBXSUxEQ0FSRF9PTkUgPSBcIis6XCIsXHJcbiAgICBXSUxEQ0FSRF9TT01FID0gXCIqOlwiXHJcbn1cclxuXHJcbmNvbnN0IG1hdGNoZXJPcHRpb25zID0ge1xyXG4gICAgc2VwYXJhdG9yOiBcIi5cIixcclxuICAgIHdpbGRjYXJkX29uZTogU2NoZW1lLldJTERDQVJEX09ORVswXSxcclxuICAgIHdpbGRjYXJkX3NvbWU6IFNjaGVtZS5XSUxEQ0FSRF9TT01FWzBdLFxyXG4gICAgY2FjaGVfYWRkczogZmFsc2VcclxufTtcclxuXHJcbmNvbnN0IHRyYWlsaW5nV2lsZGNhcmRzID0gW1xyXG4gICAgbWF0Y2hlck9wdGlvbnMuc2VwYXJhdG9yICsgbWF0Y2hlck9wdGlvbnMud2lsZGNhcmRfb25lLFxyXG4gICAgbWF0Y2hlck9wdGlvbnMuc2VwYXJhdG9yICsgbWF0Y2hlck9wdGlvbnMud2lsZGNhcmRfc29tZVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gaXNXZWJTYWZlU2NoZW1lKHNjaGVtZTogTWF5YmU8U2NoZW1lPik6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoIChzY2hlbWUpIHtcclxuICAgICAgICBjYXNlIFNjaGVtZS5IVFRQOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBjYXNlIFNjaGVtZS5IVFRQUzpcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQb3J0ID0gbnVtYmVyO1xyXG5jb25zdCBzdGFuZGFyZFBvcnRzID0gbmV3IE1hcDxTY2hlbWUsIFBvcnQ+KFtcclxuICAgIFtTY2hlbWUuSFRUUCwgODBdLCBbU2NoZW1lLkhUVFBTLCA0NDNdXSk7XHJcblxyXG5leHBvcnQgY2xhc3MgT3JpZ2luIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzY2hlbWU6IFNjaGVtZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaG9zdDogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBwb3J0OiBNYXliZTxQb3J0PikgeyB9XHJcblxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9ydCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnNjaGVtZX0vLyR7dGhpcy5ob3N0fWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuc2NoZW1lfS8vJHt0aGlzLmhvc3R9OiR7dGhpcy5wb3J0fWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvRGlzcGxheVN0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3N0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lT3JpZ2luKGE6IE1heWJlPE9yaWdpbj4sIGI6IE1heWJlPE9yaWdpbj4sIG9wdGlvbnMgPSBuZXcgT3JpZ2luSGFzaE9wdGlvbnMoKSkge1xyXG4gICAgaWYgKG5vbmUoYSkgfHwgbm9uZShiKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2NoZW1lQSA9IGEuc2NoZW1lO1xyXG4gICAgbGV0IHNjaGVtZUIgPSBiLnNjaGVtZTtcclxuICAgIGlmIChvcHRpb25zLmlnbm9yZUh0dHBIdHRwc0RpZmZlcmVuY2UpIHtcclxuICAgICAgICBpZiAoc2NoZW1lQSA9PT0gU2NoZW1lLkhUVFApIHtcclxuICAgICAgICAgICAgc2NoZW1lQSA9IFNjaGVtZS5IVFRQUztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNjaGVtZUIgPT09IFNjaGVtZS5IVFRQKSB7XHJcbiAgICAgICAgICAgIHNjaGVtZUIgPSBTY2hlbWUuSFRUUFM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNjaGVtZUEgIT09IHNjaGVtZUIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYS5ob3N0ICE9PSBiLmhvc3QpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5pZ25vcmVQb3J0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoYS5wb3J0ID09PSB1bmRlZmluZWQgJiYgYi5wb3J0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYS5wb3J0ICE9PSB1bmRlZmluZWQgJiYgYi5wb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYS5wb3J0ID09PSB1bmRlZmluZWQgJiYgYi5wb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBhLnBvcnQgPT09IGIucG9ydDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hPcmlnaW4ob3JpZ2luOiBPcmlnaW4sIG9wdGlvbnMgPSBuZXcgT3JpZ2luSGFzaE9wdGlvbnMoKSk6IEhhc2gge1xyXG4gICAgbGV0IGhhc2ggPSBvcHRpb25zLnNlZWQ7XHJcbiAgICBsZXQgc2NoZW1lID0gb3JpZ2luLnNjaGVtZTtcclxuICAgIGlmIChvcHRpb25zLmlnbm9yZUh0dHBIdHRwc0RpZmZlcmVuY2UgJiYgKHNjaGVtZSA9PT0gU2NoZW1lLkhUVFApKSB7XHJcbiAgICAgICAgc2NoZW1lID0gU2NoZW1lLkhUVFBTO1xyXG4gICAgfVxyXG4gICAgaGFzaCA9IG11cm11ckhhc2goc2NoZW1lLCBoYXNoKTtcclxuICAgIGhhc2ggPSBtdXJtdXJIYXNoKG9yaWdpbi5ob3N0LCBoYXNoKTtcclxuICAgIGlmICghb3B0aW9ucy5pZ25vcmVQb3J0ICYmIChvcmlnaW4ucG9ydCAhPT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgIGhhc2ggPSBtdXJtdXJIYXNoKG9yaWdpbi5wb3J0LCBoYXNoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVNjaGVtZShwcm90b2NvbDogc3RyaW5nLCBvcHRpb25zOiBPcmlnaW5QYXJzZU9wdGlvbnMpOiBNYXliZTxTY2hlbWU+IHtcclxuICAgIGxldCBzY2hlbWU6IE1heWJlPFNjaGVtZT4gPSB1bmRlZmluZWQ7XHJcbiAgICBzd2l0Y2ggKHByb3RvY29sLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICBjYXNlIFNjaGVtZS5IVFRQOlxyXG4gICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuSFRUUDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTY2hlbWUuSFRUUFM6XHJcbiAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5IVFRQUztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTY2hlbWUuRklMRTpcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dGaWxlU2NoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuRklMRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5DSFJPTUU6XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93Q2hyb21lU2NoZW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuQ0hST01FO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkVER0U6XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93RWRnZVNjaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLkVER0U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTY2hlbWUuQUJPVVQ6XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93QWJvdXRTY2hlbWUpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5BQk9VVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5DSFJPTUVfRVhURU5TSU9OOlxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hbGxvd0Nocm9tZUV4dGVuc2lvblNjaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLkNIUk9NRV9FWFRFTlNJT047XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTY2hlbWUuRklSRUZPWF9FWFRFTlNJT046XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93RmlyZWZveEV4dGVuc2lvblNjaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLkZJUkVGT1hfRVhURU5TSU9OO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU2NoZW1lLkVER0VfRVhURU5TSU9OOlxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hbGxvd0VkZ2VFeHRlbnNpb25TY2hlbWUpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVtZSA9IFNjaGVtZS5FREdFX0VYVEVOU0lPTjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNjaGVtZS5XSUxEQ0FSRF9PTkU6XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFsbG93V2lsZGNhcmRzKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlbWUgPSBTY2hlbWUuV0lMRENBUkRfT05FO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICBjYXNlIFNjaGVtZS5XSUxEQ0FSRF9TT01FOlxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hbGxvd1dpbGRjYXJkcykge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1lID0gU2NoZW1lLldJTERDQVJEX1NPTUU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNXZWJTYWZlU2NoZW1lKHNjaGVtZSkpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKCgoc2NoZW1lID09PSBTY2hlbWUuV0lMRENBUkRfT05FKSB8fFxyXG4gICAgICAgICAoc2NoZW1lID09PSBTY2hlbWUuV0lMRENBUkRfU09NRSkpICYmXHJcbiAgICAgICAgb3B0aW9ucy5hbGxvd1dpbGRjYXJkcykge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWU7XHJcbiAgICB9IGVsc2UgaWYgKChzY2hlbWUgPT09IFNjaGVtZS5GSUxFKSAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0ZpbGVTY2hlbWUpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIGlmICgoc2NoZW1lID09PSBTY2hlbWUuQ0hST01FX0VYVEVOU0lPTikgJiZcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dDaHJvbWVFeHRlbnNpb25TY2hlbWUpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIGlmICgoc2NoZW1lID09PSBTY2hlbWUuRklSRUZPWF9FWFRFTlNJT04pICYmXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmFsbG93RmlyZWZveEV4dGVuc2lvblNjaGVtZSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWU7XHJcbiAgICB9IGVsc2UgaWYgKChzY2hlbWUgPT09IFNjaGVtZS5FREdFX0VYVEVOU0lPTikgJiZcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dFZGdlRXh0ZW5zaW9uU2NoZW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtZTtcclxuICAgIH0gZWxzZSBpZiAoKHNjaGVtZSA9PT0gU2NoZW1lLkNIUk9NRSkgJiZcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dDaHJvbWVTY2hlbWUpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1lO1xyXG4gICAgfSBlbHNlIGlmICgoc2NoZW1lID09PSBTY2hlbWUuRURHRSkgJiZcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dFZGdlU2NoZW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtZTtcclxuICAgIH0gZWxzZSBpZiAoKHNjaGVtZSA9PT0gU2NoZW1lLkFCT1VUKSAmJlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0Fib3V0U2NoZW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtZTtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5hbGxvd05vbldlYlNhZmVTY2hlbWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luUmFuZ2UodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbikgJiYgKHZhbHVlIDw9IG1heCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlUG9ydChwb3J0U3RyaW5nOiBzdHJpbmcsIHNjaGVtZTogU2NoZW1lKTogTWF5YmU8UG9ydD4ge1xyXG4gICAgY29uc3QgbWluUG9ydCA9IDA7XHJcbiAgICBjb25zdCBtYXhQb3J0ID0gKDIgPDwgMTYpIC0gMTtcclxuXHJcbiAgICBpZiAoaXNFbXB0eShwb3J0U3RyaW5nKSkge1xyXG4gICAgICAgIHJldHVybiBzdGFuZGFyZFBvcnRzLmdldChzY2hlbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJhZGl4ID0gMTA7XHJcbiAgICBjb25zdCBwb3J0ID0gcGFyc2VJbnQocG9ydFN0cmluZywgcmFkaXgpO1xyXG5cclxuICAgIGlmICghaXNJblJhbmdlKHBvcnQsIG1pblBvcnQsIG1heFBvcnQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvcnQgJHtwb3J0fWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvcnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9yaWdpbih1cmxPclNwZWM6IFVSTE9yU3BlYywgb3B0aW9ucyA9IG5ldyBPcmlnaW5QYXJzZU9wdGlvbnMoKSk6IE1heWJlPE9yaWdpbj4ge1xyXG4gICAgaWYgKHVybE9yU3BlYyBpbnN0YW5jZW9mIFVSTCkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZU9yaWdpbkZyb21VUkwodXJsT3JTcGVjLCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlT3JpZ2luRnJvbVNwZWModXJsT3JTcGVjLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VPcmlnaW5Gcm9tVVJMKHVybDogVVJMLCBvcHRpb25zOiBPcmlnaW5QYXJzZU9wdGlvbnMpOiBNYXliZTxPcmlnaW4+IHtcclxuICAgIGNvbnN0IHNjaGVtZSA9IHBhcnNlU2NoZW1lKHVybC5wcm90b2NvbCwgb3B0aW9ucyk7XHJcbiAgICBpZiAoc2NoZW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBwb3J0ID0gcGFyc2VQb3J0KHVybC5wb3J0LCBzY2hlbWUpO1xyXG4gICAgICAgIHJldHVybiBuZXcgT3JpZ2luKHNjaGVtZSwgdXJsLmhvc3RuYW1lLCBwb3J0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZU9yaWdpbkZyb21TcGVjKHNwZWM6IHN0cmluZywgb3B0aW9uczogT3JpZ2luUGFyc2VPcHRpb25zKTogTWF5YmU8T3JpZ2luPiB7XHJcbiAgICBpZiAob3B0aW9ucy5hbGxvd1dpbGRjYXJkcykge1xyXG4gICAgICAgIGlmICghc3BlYy5pbmNsdWRlcyhcIjovL1wiKSAmJiBvcHRpb25zLmFsbG93TWlzc2luZ1dpbGRjYXJkU2NoZW1lKSB7XHJcbiAgICAgICAgICAgIHNwZWMgPSBTY2hlbWUuV0lMRENBUkRfT05FICsgXCIvL1wiICsgc3BlYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gd2lsZGNhcmRTcGVjUmVnZXguZXhlYyhzcGVjKTtcclxuICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlZ0V4cEV4ZWNBcnJheSBpcyBkZWZpbmVkIGluY29ycmVjdGx5IHNvIHdlIGhhdmUgdG8gY2hlY2sgZm9yIHVuZGVmaW5lZCBvdXJzZWx2ZXM6XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzk2M1xyXG4gICAgICAgIGNvbnN0IG1heWJlU2NoZW1lID0gbWF0Y2hbV2lsZGNhcmRTcGVjR3JvdXAuU2NoZW1lXTtcclxuICAgICAgICBpZiAobWF5YmVTY2hlbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzY2hlbWUgPSBwYXJzZVNjaGVtZShtYXliZVNjaGVtZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKHNjaGVtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtYXliZUhvc3RBbmRQb3J0ID0gbWF0Y2hbV2lsZGNhcmRTcGVjR3JvdXAuSG9zdEFuZFBvcnRdO1xyXG4gICAgICAgIGlmIChtYXliZUhvc3RBbmRQb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaG9zdEFuZFBvcnQgPSBtYXliZUhvc3RBbmRQb3J0LnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgY29uc3QgaG9zdCA9IGhvc3RBbmRQb3J0WzBdO1xyXG4gICAgICAgIGlmIChpc0VtcHR5KGhvc3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBvcnQgPSBwYXJzZVBvcnQoaG9zdEFuZFBvcnQubGVuZ3RoID4gMSA/IGhvc3RBbmRQb3J0WzFdIDogJycsIHNjaGVtZSk7XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1RyYWlsaW5nV2lsZGNhcmRzKSB7XHJcbiAgICAgICAgICAgIC8vIFRyYWlsaW5nIHdpbGRjYXJkcyByaXNrIG1hdGNoaW5nIHNvbWV0aGluZyBsaWtlIGdvb2dsZS5jb20uZXZpbCBieSBtaXN0YWtlXHJcbiAgICAgICAgICAgIGlmICh0cmFpbGluZ1dpbGRjYXJkcy5zb21lKHRyYWlsaW5nV2lsZGNhcmQgPT4gaG9zdC5sZW5ndGggPj0gdHJhaWxpbmdXaWxkY2FyZC5sZW5ndGggJiYgaG9zdC5lbmRzV2l0aCh0cmFpbGluZ1dpbGRjYXJkKSkpIHtcclxuICAgICAgICAgICAgICAgIGxvZ0Vycm9yKG5ldyBFcnJvcihgUnVsZSBVUkwgaG9zdG5hbWUgZW5kcyBpbiB0cmFpbGluZyB3aWxkY2FyZDogJHtzcGVjfWApKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgT3JpZ2luKHNjaGVtZSwgaG9zdCwgcG9ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsID0gcGFyc2VVcmwoc3BlYyk7XHJcbiAgICBpZiAodXJsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlT3JpZ2luRnJvbVVSTCh1cmwsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZU9yaWdpblNldChvcHRpb25zID0gbmV3IE9yaWdpbkhhc2hPcHRpb25zKCkpOiBIYXNoU2V0PE9yaWdpbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBIYXNoU2V0PE9yaWdpbj4oXHJcbiAgICAgICAgKG9yaWdpbiA6IE9yaWdpbikgPT4gaGFzaE9yaWdpbihvcmlnaW4sIG9wdGlvbnMpLFxyXG4gICAgICAgIChhIDogT3JpZ2luLCBiIDogT3JpZ2luKSA9PiBpc1NhbWVPcmlnaW4oYSwgYiwgb3B0aW9ucykpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VPcmlnaW5TZXQoc3BlY0xpc3Q6IHN0cmluZ1tdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3B0aW9ucyA9IG5ldyBPcmlnaW5IYXNoT3B0aW9ucygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IG5ldyBPcmlnaW5QYXJzZU9wdGlvbnMoKSk6IEhhc2hTZXQ8T3JpZ2luPiB7XHJcbiAgICBjb25zdCBzcGVjU2V0ID0gbWFrZU9yaWdpblNldChzZXRPcHRpb25zKTtcclxuICAgIGZvciAoY29uc3Qgc3BlYyBvZiBzcGVjTGlzdCkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHBhcnNlT3JpZ2luKHNwZWMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChvcmlnaW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzcGVjU2V0LmFkZChvcmlnaW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzcGVjU2V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b3BpY0Zvck9yaWdpbihvcmlnaW4gOiBPcmlnaW4pIDogc3RyaW5nIHtcclxuICAgIGxldCBzY2hlbWUgPSBvcmlnaW4uc2NoZW1lO1xyXG4gICAgaWYgKHNjaGVtZSA9PT0gU2NoZW1lLldJTERDQVJEX1NPTUUpIHtcclxuICAgICAgICBzY2hlbWUgPSBTY2hlbWUuV0lMRENBUkRfT05FO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNjaGVtZS5zbGljZSgwLCAtMSkgKyBtYXRjaGVyT3B0aW9ucy5zZXBhcmF0b3IgKyBvcmlnaW4uaG9zdDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9yaWdpbk1hdGNoZXIge1xyXG4gICAgYWRkKG9yaWdpbiA6IE9yaWdpbikgOiBPcmlnaW5NYXRjaGVyIHtcclxuICAgICAgICBjb25zdCB0b3BpYyA9IHRvcGljRm9yT3JpZ2luKG9yaWdpbik7XHJcbiAgICAgICAgdGhpcy5tYXRjaGVyLmFkZCh0b3BpYyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZXhjbHVkZShvcmlnaW4gOiBPcmlnaW4pIDogT3JpZ2luTWF0Y2hlciB7XHJcbiAgICAgICAgY29uc3QgdG9waWMgPSB0b3BpY0Zvck9yaWdpbihvcmlnaW4pO1xyXG4gICAgICAgIHRoaXMuZXhjbHVkZV9tYXRjaGVyLmFkZCh0b3BpYyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKG9yaWdpbiA6IE9yaWdpbikgOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0b3BpYyA9IHRvcGljRm9yT3JpZ2luKG9yaWdpbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlci50ZXN0KHRvcGljKSAmJiAhdGhpcy5leGNsdWRlX21hdGNoZXIudGVzdCh0b3BpYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYXRjaGVyIDogUWxvYmJlclRydWUgPSBuZXcgUWxvYmJlclRydWUobWF0Y2hlck9wdGlvbnMpO1xyXG4gICAgcHJpdmF0ZSBleGNsdWRlX21hdGNoZXIgOiBRbG9iYmVyVHJ1ZSA9IG5ldyBRbG9iYmVyVHJ1ZShtYXRjaGVyT3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9yaWdpbk1hdGNoZXIoc3BlY0xpc3QgOiBzdHJpbmdbXSwgb3B0aW9ucyA9IG5ldyBPcmlnaW5QYXJzZU9wdGlvbnMoKSkgOiBPcmlnaW5NYXRjaGVyIHtcclxuICAgIGlmIChzcGVjTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbG9nKGBtYWtpbmcgbWF0Y2hlciBmcm9tICR7c3BlY0xpc3QubGVuZ3RofSBlbnRyaWVzYCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtYXRjaGVyID0gbmV3IE9yaWdpbk1hdGNoZXIoKTtcclxuICAgIGZvciAoY29uc3Qgc3BlYyBvZiBzcGVjTGlzdCkge1xyXG4gICAgICAgIGlmIChzcGVjLnN0YXJ0c1dpdGgoZXhjbHVzaW9uUHJlZml4KSkge1xyXG4gICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBwYXJzZU9yaWdpbihzcGVjLnN1YnN0cihleGNsdXNpb25QcmVmaXgubGVuZ3RoKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChvcmlnaW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlci5leGNsdWRlKG9yaWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBwYXJzZU9yaWdpbihzcGVjLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVyLmFkZChvcmlnaW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNwZWNMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsb2coJ2ZpbmlzaGVkIG1ha2luZyBtYXRjaGVyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF0Y2hlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9yaWdpbkV4cGlyeU1hdGNoZXIge1xyXG4gICAgYWRkKG9yaWdpbiA6IE9yaWdpbiwgZXhwaXJ5IDogbnVtYmVyKSA6IE9yaWdpbkV4cGlyeU1hdGNoZXIge1xyXG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNGb3JPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICB0aGlzLm1hdGNoZXIuYWRkKHRvcGljLCBleHBpcnkpO1xyXG4gICAgICAgIC8vIE5vdGU6IGxvZ2dpbmcgaGVyZSBmb3IgZWFjaCBlbnRyeSBzbG93cyBkb3duIGFkZGluZyA1MDAwIG9yaWdpbnMgZnJvbSAxMDBtcyB0byA3cyFcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoYXMob3JpZ2luIDogT3JpZ2luKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNGb3JPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICBjb25zdCBleHBpcmllcyA9IHRoaXMubWF0Y2hlci5tYXRjaCh0b3BpYyk7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKSAvIDEwMDA7IC8vIGV4cGlyaWVzIGFyZSBzZWNvbmRzXHJcbiAgICAgICAgLy8gTG9vayBmb3IgYW55IG1hdGNoaW5nIHJlcHV0YXRpb24gZW50cmllcyBmb3IgdGhlIG9yaWdpbiB3aGljaCBoYXZlbid0IGV4cGlyZWRcclxuICAgICAgICBmb3IgKGNvbnN0IGV4cGlyeSBvZiBleHBpcmllcykge1xyXG4gICAgICAgICAgICBpZiAoZXhwaXJ5ID4gbm93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYXRjaGVyIDogUWxvYmJlcjxudW1iZXI+ID0gbmV3IFFsb2JiZXI8bnVtYmVyPihtYXRjaGVyT3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9yaWdpbkV4cGlyeU1hdGNoZXIoc3BlY0xpc3QgOiBTaXRlQW5kRXhwaXJ5W10sIG9wdGlvbnMgPSBuZXcgT3JpZ2luUGFyc2VPcHRpb25zKCkpIDogT3JpZ2luRXhwaXJ5TWF0Y2hlciB7XHJcbiAgICBpZiAoc3BlY0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxvZyhgbWFraW5nIGV4cGlyeSBtYXRjaGVyIGZyb20gJHtzcGVjTGlzdC5sZW5ndGh9IGVudHJpZXNgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1hdGNoZXIgPSBuZXcgT3JpZ2luRXhwaXJ5TWF0Y2hlcigpO1xyXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKSAvIDEwMDA7IC8vIGV4cGlyaWVzIGFyZSBzZWNvbmRzXHJcbiAgICBmb3IgKGNvbnN0IFtzcGVjLCBleHBpcnldIG9mIHNwZWNMaXN0KSB7XHJcbiAgICAgICAgaWYgKGV4cGlyeSA+IG5vdykge1xyXG4gICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBwYXJzZU9yaWdpbihzcGVjLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKG9yaWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVyLmFkZChvcmlnaW4sIGV4cGlyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc3BlY0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxvZygnZmluaXNoZWQgbWFraW5nIGV4cGlyeSBtYXRjaGVyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF0Y2hlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9yaWdpbkdyb3VwZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIGFkZEZyb21TcGVjTGlzdChzcGVjTGlzdCA6IHN0cmluZ1tdLCBncm91cCA6IHN0cmluZywgb3B0aW9ucyA9IG5ldyBPcmlnaW5QYXJzZU9wdGlvbnMoKSkgOiBPcmlnaW5Hcm91cGVyIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHNwZWMgb2Ygc3BlY0xpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRGcm9tU3BlYyhzcGVjLCBncm91cCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEZyb21TcGVjKHNwZWMgOiBzdHJpbmcsIGdyb3VwIDogc3RyaW5nLCBvcHRpb25zID0gbmV3IE9yaWdpblBhcnNlT3B0aW9ucygpKSA6IE9yaWdpbkdyb3VwZXIge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHBhcnNlT3JpZ2luKHNwZWMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChzb21lKG9yaWdpbikpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQob3JpZ2luLCBncm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChvcmlnaW4gOiBPcmlnaW4sIGdyb3VwIDogc3RyaW5nKSA6IE9yaWdpbkdyb3VwZXIge1xyXG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNGb3JPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICB0aGlzLmdyb3VwZXIuYWRkKHRvcGljLCBncm91cCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgbWF0Y2gob3JpZ2luIDogT3JpZ2luKSA6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCB0b3BpYyA9IHRvcGljRm9yT3JpZ2luKG9yaWdpbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBlci5tYXRjaCh0b3BpYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBncm91cGVyID0gbmV3IFFsb2JiZXI8c3RyaW5nPihtYXRjaGVyT3B0aW9ucyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9vcmlnaW4udHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50RGF0ZVRpbWVTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2RhdGUtdXRpbHMudHMiLCIvKmpzbGludCBub2RlOiB0cnVlKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9xbG9iYmVyJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9xbG9iYmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiMgcWxvYmJlciZuYnNwOyZuYnNwOyZuYnNwO1shW0J1aWxkIFN0YXR1c10oaHR0cHM6Ly90cmF2aXMtY2kub3JnL2RhdmVkb2VzZGV2L3Fsb2JiZXIucG5nKV0oaHR0cHM6Ly90cmF2aXMtY2kub3JnL2RhdmVkb2VzZGV2L3Fsb2JiZXIpIFshW0NvdmVyYWdlIFN0YXR1c10oaHR0cHM6Ly9jb3ZlcmFsbHMuaW8vcmVwb3MvZGF2ZWRvZXNkZXYvcWxvYmJlci9iYWRnZS5wbmc/YnJhbmNoPW1hc3RlcildKGh0dHBzOi8vY292ZXJhbGxzLmlvL3IvZGF2ZWRvZXNkZXYvcWxvYmJlcj9icmFuY2g9bWFzdGVyKSBbIVtOUE0gdmVyc2lvbl0oaHR0cHM6Ly9iYWRnZS5mdXJ5LmlvL2pzL3Fsb2JiZXIucG5nKV0oaHR0cDovL2JhZGdlLmZ1cnkuaW8vanMvcWxvYmJlcilcblxuTm9kZS5qcyBnbG9iYmluZyBmb3IgYW1xcC1saWtlIHRvcGljcy5cblxuRXhhbXBsZTpcblxuYGBgamF2YXNjcmlwdFxudmFyIFFsb2JiZXIgPSByZXF1aXJlKCdxbG9iYmVyJykuUWxvYmJlcjtcbnZhciBtYXRjaGVyID0gbmV3IFFsb2JiZXIoKTtcbm1hdGNoZXIuYWRkKCdmb28uKicsICdpdCBtYXRjaGVkIScpO1xuYXNzZXJ0LmRlZXBFcXVhbChtYXRjaGVyLm1hdGNoKCdmb28uYmFyJyksIFsnaXQgbWF0Y2hlZCEnXSk7XG5hc3NlcnQobWF0Y2hlci50ZXN0KCdmb28uYmFyJywgJ2l0IG1hdGNoZWQhJykpO1xuYGBgXG5cblRoZSBBUEkgaXMgZGVzY3JpYmVkIFtoZXJlXSgjdGFibGVvZmNvbnRlbnRzKS5cblxucWxvYmJlciBpcyBpbXBsZW1lbnRlZCB1c2luZyBhIHRyaWUsIGFzIGRlc2NyaWJlZCBpbiB0aGUgUmFiYml0TVEgYmxvZyBwb3N0cyBbaGVyZV0oaHR0cDovL3d3dy5yYWJiaXRtcS5jb20vYmxvZy8yMDEwLzA5LzE0L3ZlcnktZmFzdC1hbmQtc2NhbGFibGUtdG9waWMtcm91dGluZy1wYXJ0LTEvKSBhbmQgW2hlcmVdKGh0dHA6Ly93d3cucmFiYml0bXEuY29tL2Jsb2cvMjAxMS8wMy8yOC92ZXJ5LWZhc3QtYW5kLXNjYWxhYmxlLXRvcGljLXJvdXRpbmctcGFydC0yLykuXG5cbiMjIEluc3RhbGxhdGlvblxuXG5gYGBzaGVsbFxubnBtIGluc3RhbGwgcWxvYmJlclxuYGBgXG5cbiMjIEFub3RoZXIgRXhhbXBsZVxuXG5BIG1vcmUgYWR2YW5jZWQgZXhhbXBsZSB1c2luZyB0b3BpY3MgZnJvbSB0aGUgW1JhYmJpdE1RIHRvcGljIHR1dG9yaWFsXShodHRwOi8vd3d3LnJhYmJpdG1xLmNvbS90dXRvcmlhbHMvdHV0b3JpYWwtZml2ZS1weXRob24uaHRtbCk6XG5cbmBgYGphdmFzY3JpcHRcbnZhciBtYXRjaGVyID0gbmV3IFFsb2JiZXIoKTtcbm1hdGNoZXIuYWRkKCcqLm9yYW5nZS4qJywgJ1ExJyk7XG5tYXRjaGVyLmFkZCgnKi4qLnJhYmJpdCcsICdRMicpO1xubWF0Y2hlci5hZGQoJ2xhenkuIycsICdRMicpO1xuYXNzZXJ0LmRlZXBFcXVhbChbJ3F1aWNrLm9yYW5nZS5yYWJiaXQnLFxuICAgICAgICAgICAgICAgICAgJ2xhenkub3JhbmdlLmVsZXBoYW50JyxcbiAgICAgICAgICAgICAgICAgICdxdWljay5vcmFuZ2UuZm94JyxcbiAgICAgICAgICAgICAgICAgICdsYXp5LmJyb3duLmZveCcsXG4gICAgICAgICAgICAgICAgICAnbGF6eS5waW5rLnJhYmJpdCcsXG4gICAgICAgICAgICAgICAgICAncXVpY2suYnJvd24uZm94JyxcbiAgICAgICAgICAgICAgICAgICdvcmFuZ2UnLFxuICAgICAgICAgICAgICAgICAgJ3F1aWNrLm9yYW5nZS5tYWxlLnJhYmJpdCcsXG4gICAgICAgICAgICAgICAgICAnbGF6eS5vcmFuZ2UubWFsZS5yYWJiaXQnXS5tYXAoZnVuY3Rpb24gKHRvcGljKVxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVyLm1hdGNoKHRvcGljKS5zb3J0KCk7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgW1snUTEnLCAnUTInXSxcbiAgICAgICAgICAgICAgICAgIFsnUTEnLCAnUTInXSxcbiAgICAgICAgICAgICAgICAgIFsnUTEnXSxcbiAgICAgICAgICAgICAgICAgIFsnUTInXSxcbiAgICAgICAgICAgICAgICAgIFsnUTInLCAnUTInXSxcbiAgICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICAgIFsnUTInXV0pO1xuYGBgXG5cbiMjIExpY2VuY2VcblxuW01JVF0oTElDRU5DRSlcblxuIyMgVGVzdHNcblxucWxvYmJlciBwYXNzZXMgdGhlIFtSYWJiaXRNUSB0b3BpYyB0ZXN0c10oaHR0cHM6Ly9naXRodWIuY29tL3JhYmJpdG1xL3JhYmJpdG1xLXNlcnZlci9ibG9iL21hc3Rlci9zcmMvcmFiYml0X3Rlc3RzLmVybCkgKEkgY29udmVydGVkIHRoZW0gZnJvbSBFcmxhbmcgdG8gSmF2YXNjcmlwdCkuXG5cblRvIHJ1biB0aGUgdGVzdHM6XG5cbmBgYHNoZWxsXG5ncnVudCB0ZXN0XG5gYGBcblxuIyMgTGludFxuXG5gYGBzaGVsbFxuZ3J1bnQgbGludFxuYGBgXG5cbiMjIENvZGUgQ292ZXJhZ2VcblxuYGBgc2hlbGxcbmdydW50IGNvdmVyYWdlXG5gYGBcblxuW0luc3RhbmJ1bF0oaHR0cDovL2dvdHdhcmxvc3QuZ2l0aHViLmlvL2lzdGFuYnVsLykgcmVzdWx0cyBhcmUgYXZhaWxhYmxlIFtoZXJlXShodHRwOi8vcmF3Z2l0LmRhdmVkb2VzZGV2LmNvbS9kYXZlZG9lc2Rldi9xbG9iYmVyL21hc3Rlci9jb3ZlcmFnZS9sY292LXJlcG9ydC9pbmRleC5odG1sKS5cblxuQ292ZXJhbGxzIHBhZ2UgaXMgW2hlcmVdKGh0dHBzOi8vY292ZXJhbGxzLmlvL3IvZGF2ZWRvZXNkZXYvcWxvYmJlcikuXG5cbiMjIEJlbmNobWFya3NcblxuYGBgc2hlbGxcbmdydW50IGJlbmNoXG5gYGBcblxucWxvYmJlciBpcyBhbHNvIGJlbmNobWFya2VkIGluIFthc2NvbHRhdG9yaV0oaHR0cHM6Ly9naXRodWIuY29tL21jb2xsaW5hL2FzY29sdGF0b3JpKS5cblxuIyBBUElcbiovXG5cbi8qanNsaW50IG5vZGU6IHRydWUsIG5vbWVuOiB0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuQ3JlYXRlcyBhIG5ldyBxbG9iYmVyLlxuXG5AY29uc3RydWN0b3JcbkBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQ29uZmlndXJlcyB0aGUgcWxvYmJlci4gVXNlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbi0gYHtTdHJpbmd9IHNlcGFyYXRvcmAgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHNlcGFyYXRpbmcgd29yZHMgaW4gdG9waWNzLiBEZWZhdWx0cyB0byAnLicuIE1RVFQgdXNlcyAnLycgYXMgdGhlIHNlcGFyYXRvciwgZm9yIGV4YW1wbGUuXG5cbi0gYHtTdHJpbmd9IHdpbGRjYXJkX29uZWAgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIG1hdGNoaW5nIGV4YWN0bHkgb25lIHdvcmQgaW4gYSB0b3BpYy4gRGVmYXVsdHMgdG8gJyonLiBNUVRUIHVzZXMgJysnLCBmb3IgZXhhbXBsZS5cblxuLSBge1N0cmluZ30gd2lsZGNhcmRfc29tZWAgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIG1hdGNoaW5nIHplcm8gb3IgbW9yZSB3b3JkcyBpbiBhIHRvcGljLiBEZWZhdWx0cyB0byAnIycuIE1RVFQgdXNlcyAnIycgdG9vLlxuXG4tIGB7Qm9vbGVhbn0gY2FjaGVfYWRkc2AgV2hldGhlciB0byBjYWNoZSB0b3BpY3Mgd2hlbiBhZGRpbmcgdG9waWMgbWF0Y2hlcnMuIFRoaXMgd2lsbCBtYWtlIGFkZGluZyBtdWx0aXBsZSBtYXRjaGVycyBmb3IgdGhlIHNhbWUgdG9waWMgZmFzdGVyIGF0IHRoZSBjb3N0IG9mIGV4dHJhIG1lbW9yeSB1c2FnZS4gRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiovXG5mdW5jdGlvbiBRbG9iYmVyIChvcHRpb25zKVxue1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy5fc2VwYXJhdG9yID0gb3B0aW9ucy5zZXBhcmF0b3IgfHwgJy4nO1xuICAgIHRoaXMuX3dpbGRjYXJkX29uZSA9IG9wdGlvbnMud2lsZGNhcmRfb25lIHx8ICcqJztcbiAgICB0aGlzLl93aWxkY2FyZF9zb21lID0gb3B0aW9ucy53aWxkY2FyZF9zb21lIHx8ICcjJztcbiAgICB0aGlzLl90cmllID0gbmV3IE1hcCgpO1xuICAgIGlmIChvcHRpb25zLmNhY2hlX2FkZHMpXG4gICAge1xuICAgICAgICB0aGlzLl9zaG9ydGN1dHMgPSBuZXcgTWFwKCk7XG4gICAgfVxufVxuXG5RbG9iYmVyLnByb3RvdHlwZS5faW5pdGlhbF92YWx1ZSA9IGZ1bmN0aW9uICh2YWwpXG57XG4gICAgcmV0dXJuIFt2YWxdO1xufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX2FkZF92YWx1ZSA9IGZ1bmN0aW9uICh2YWxzLCB2YWwpXG57XG4gICAgdmFsc1t2YWxzLmxlbmd0aF0gPSB2YWw7XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fYWRkX3ZhbHVlcyA9IGZ1bmN0aW9uIChkZXN0LCBvcmlnaW4pXG57XG4gICAgdmFyIGksIGRlc3RMZW5ndGggPSBkZXN0Lmxlbmd0aCwgb3JpZ2luTGVuZ3RoID0gb3JpZ2luLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBvcmlnaW5MZW5ndGg7IGkgKz0gMSlcbiAgICB7XG4gICAgICAgIGRlc3RbZGVzdExlbmd0aCArIGldID0gb3JpZ2luW2ldO1xuICAgIH1cbn07XG5cblFsb2JiZXIucHJvdG90eXBlLl9yZW1vdmVfdmFsdWUgPSBmdW5jdGlvbiAodmFscywgdmFsKVxue1xuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IHZhbHMubGFzdEluZGV4T2YodmFsKTtcblxuICAgIGlmIChpbmRleCA+PSAwKVxuICAgIHtcbiAgICAgICAgdmFscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxzLmxlbmd0aCA9PT0gMDtcbn07XG5cblFsb2JiZXIucHJvdG90eXBlLl9hZGQgPSBmdW5jdGlvbiAodmFsLCBpLCB3b3Jkcywgc3ViX3RyaWUpXG57XG4gICAgdmFyIHN0LCB3b3JkO1xuXG4gICAgaWYgKGkgPT09IHdvcmRzLmxlbmd0aClcbiAgICB7XG4gICAgICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHRoaXMuX3NlcGFyYXRvcik7XG4gICAgICAgIFxuICAgICAgICBpZiAoc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZF92YWx1ZShzdCwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0ID0gdGhpcy5faW5pdGlhbF92YWx1ZSh2YWwpO1xuICAgICAgICAgICAgc3ViX3RyaWUuc2V0KHRoaXMuX3NlcGFyYXRvciwgc3QpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3Q7XG4gICAgfVxuXG4gICAgd29yZCA9IHdvcmRzW2ldO1xuICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHdvcmQpO1xuICAgIFxuICAgIGlmICghc3QpXG4gICAge1xuICAgICAgICBzdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgc3ViX3RyaWUuc2V0KHdvcmQsIHN0KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRoaXMuX2FkZCh2YWwsIGkgKyAxLCB3b3Jkcywgc3QpO1xufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX3JlbW92ZSA9IGZ1bmN0aW9uICh2YWwsIGksIHdvcmRzLCBzdWJfdHJpZSlcbntcbiAgICB2YXIgc3QsIHdvcmQsIHI7XG5cbiAgICBpZiAoaSA9PT0gd29yZHMubGVuZ3RoKVxuICAgIHtcbiAgICAgICAgc3QgPSBzdWJfdHJpZS5nZXQodGhpcy5fc2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc3QgJiYgdGhpcy5fcmVtb3ZlX3ZhbHVlKHN0LCB2YWwpKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJfdHJpZS5kZWxldGUodGhpcy5fc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB3b3JkID0gd29yZHNbaV07XG4gICAgc3QgPSBzdWJfdHJpZS5nZXQod29yZCk7XG5cbiAgICBpZiAoIXN0KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHIgPSB0aGlzLl9yZW1vdmUodmFsLCBpICsgMSwgd29yZHMsIHN0KTtcblxuICAgIGlmIChzdC5zaXplID09PSAwKVxuICAgIHtcbiAgICAgICAgc3ViX3RyaWUuZGVsZXRlKHdvcmQpO1xuICAgIH1cblxuICAgIHJldHVybiByO1xufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX21hdGNoX3NvbWUgPSBmdW5jdGlvbiAodiwgaSwgd29yZHMsIHN0LCBjdHgpXG57XG4gICAgdmFyIGosIHc7XG5cbiAgICBmb3IgKHcgb2Ygc3Qua2V5cygpKVxuICAgIHtcbiAgICAgICAgaWYgKHcgIT09IHRoaXMuX3NlcGFyYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yIChqID0gaTsgaiA8IHdvcmRzLmxlbmd0aDsgaiArPSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLl9tYXRjaCh2LCBqLCB3b3Jkcywgc3QsIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2O1xufTtcblxuUWxvYmJlci5wcm90b3R5cGUuX21hdGNoID0gZnVuY3Rpb24gKHYsIGksIHdvcmRzLCBzdWJfdHJpZSwgY3R4KVxue1xuICAgIHZhciB3b3JkLCBzdDtcblxuICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHRoaXMuX3dpbGRjYXJkX3NvbWUpO1xuXG4gICAgaWYgKHN0KVxuICAgIHtcbiAgICAgICAgLy8gaW4gdGhlIGNvbW1vbiBjYXNlIHRoZXJlIHdpbGwgYmUgbm8gbW9yZSBsZXZlbHMuLi5cbiAgICAgICAgdiA9IHRoaXMuX21hdGNoX3NvbWUodiwgaSwgd29yZHMsIHN0LCBjdHgpO1xuICAgICAgICAvLyBhbmQgd2UnbGwgZW5kIHVwIG1hdGNoaW5nIHRoZSByZXN0IG9mIHRoZSB3b3JkczpcbiAgICAgICAgdiA9IHRoaXMuX21hdGNoKHYsIHdvcmRzLmxlbmd0aCwgd29yZHMsIHN0LCBjdHgpO1xuICAgIH1cblxuICAgIGlmIChpID09PSB3b3Jkcy5sZW5ndGgpXG4gICAge1xuICAgICAgICBzdCA9IHN1Yl90cmllLmdldCh0aGlzLl9zZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHYuZGVzdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRfdmFsdWVzKHYuZGVzdCwgdi5zb3VyY2UsIGN0eCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkX3ZhbHVlcyh2LmRlc3QsIHN0LCBjdHgpO1xuICAgICAgICAgICAgICAgIHYgPSB2LmRlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2LnNvdXJjZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2LmRlc3QgPSB2LnNvdXJjZTtcbiAgICAgICAgICAgICAgICB2LnNvdXJjZSA9IHN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZF92YWx1ZXModiwgc3QsIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgd29yZCA9IHdvcmRzW2ldO1xuXG4gICAgICAgIGlmICgod29yZCAhPT0gdGhpcy5fd2lsZGNhcmRfb25lKSAmJiAod29yZCAhPT0gdGhpcy5fd2lsZGNhcmRfc29tZSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHdvcmQpO1xuXG4gICAgICAgICAgICBpZiAoc3QpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuX21hdGNoKHYsIGkgKyAxLCB3b3Jkcywgc3QsIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod29yZClcbiAgICAgICAge1xuICAgICAgICAgICAgc3QgPSBzdWJfdHJpZS5nZXQodGhpcy5fd2lsZGNhcmRfb25lKTtcblxuICAgICAgICAgICAgaWYgKHN0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLl9tYXRjaCh2LCBpICsgMSwgd29yZHMsIHN0LCBjdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHY7XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fbWF0Y2gyID0gZnVuY3Rpb24gKHYsIHRvcGljLCBjdHgpXG57XG4gICAgdmFyIHZhbHMgPSB0aGlzLl9tYXRjaChcbiAgICB7XG4gICAgICAgIHNvdXJjZTogdlxuICAgIH0sIDAsIHRvcGljLnNwbGl0KHRoaXMuX3NlcGFyYXRvciksIHRoaXMuX3RyaWUsIGN0eCk7XG5cbiAgICByZXR1cm4gdmFscy5zb3VyY2UgfHwgdmFscztcbn07XG5cblFsb2JiZXIucHJvdG90eXBlLl90ZXN0X3NvbWUgPSBmdW5jdGlvbiAodiwgaSwgd29yZHMsIHN0KVxue1xuICAgIHZhciBqLCB3O1xuXG4gICAgZm9yICh3IG9mIHN0LmtleXMoKSlcbiAgICB7XG4gICAgICAgIGlmICh3ICE9PSB0aGlzLl9zZXBhcmF0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvciAoaiA9IGk7IGogPCB3b3Jkcy5sZW5ndGg7IGogKz0gMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGVzdCh2LCBqLCB3b3Jkcywgc3QpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5RbG9iYmVyLnByb3RvdHlwZS5fdGVzdCA9IGZ1bmN0aW9uICh2LCBpLCB3b3Jkcywgc3ViX3RyaWUpXG57XG4gICAgdmFyIHdvcmQsIHN0O1xuXG4gICAgc3QgPSBzdWJfdHJpZS5nZXQodGhpcy5fd2lsZGNhcmRfc29tZSk7XG5cbiAgICBpZiAoc3QpXG4gICAge1xuICAgICAgICAgICAgLy8gaW4gdGhlIGNvbW1vbiBjYXNlIHRoZXJlIHdpbGwgYmUgbm8gbW9yZSBsZXZlbHMuLi5cbiAgICAgICAgaWYgKHRoaXMuX3Rlc3Rfc29tZSh2LCBpLCB3b3Jkcywgc3QpIHx8XG4gICAgICAgICAgICAvLyBhbmQgd2UnbGwgZW5kIHVwIG1hdGNoaW5nIHRoZSByZXN0IG9mIHRoZSB3b3JkczpcbiAgICAgICAgICAgIHRoaXMuX3Rlc3Qodiwgd29yZHMubGVuZ3RoLCB3b3Jkcywgc3QpKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSB3b3Jkcy5sZW5ndGgpXG4gICAge1xuICAgICAgICBzdCA9IHN1Yl90cmllLmdldCh0aGlzLl9zZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzdCAmJiB0aGlzLnRlc3RfdmFsdWVzKHN0LCB2KSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgd29yZCA9IHdvcmRzW2ldO1xuXG4gICAgICAgIGlmICgod29yZCAhPT0gdGhpcy5fd2lsZGNhcmRfb25lKSAmJiAod29yZCAhPT0gdGhpcy5fd2lsZGNhcmRfc29tZSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0ID0gc3ViX3RyaWUuZ2V0KHdvcmQpO1xuXG4gICAgICAgICAgICBpZiAoc3QgJiYgdGhpcy5fdGVzdCh2LCBpICsgMSwgd29yZHMsIHN0KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdCA9IHN1Yl90cmllLmdldCh0aGlzLl93aWxkY2FyZF9vbmUpO1xuXG4gICAgICAgICAgICBpZiAoc3QgJiYgdGhpcy5fdGVzdCh2LCBpICsgMSwgd29yZHMsIHN0KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuQWRkIGEgdG9waWMgbWF0Y2hlciB0byB0aGUgcWxvYmJlci5cblxuTm90ZSB5b3UgY2FuIG1hdGNoIG1vcmUgdGhhbiBvbmUgdmFsdWUgYWdhaW5zdCBhIHRvcGljIGJ5IGNhbGxpbmcgYGFkZGAgbXVsdGlwbGUgdGltZXMgd2l0aCB0aGUgc2FtZSB0b3BpYyBhbmQgZGlmZmVyZW50IHZhbHVlcy5cblxuQHBhcmFtIHtTdHJpbmd9IHRvcGljIFRoZSB0b3BpYyB0byBtYXRjaCBhZ2FpbnN0LlxuQHBhcmFtIHtBbnl9IHZhbCBUaGUgdmFsdWUgdG8gcmV0dXJuIGlmIHRoZSB0b3BpYyBpcyBtYXRjaGVkLlxuQHJldHVybiB7UWxvYmJlcn0gVGhlIHFsb2JiZXIgKGZvciBjaGFpbmluZykuXG4qL1xuUWxvYmJlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRvcGljLCB2YWwpXG57XG4gICAgdmFyIHNob3J0Y3V0ID0gdGhpcy5fc2hvcnRjdXRzICYmIHRoaXMuX3Nob3J0Y3V0cy5nZXQodG9waWMpO1xuICAgIGlmIChzaG9ydGN1dClcbiAgICB7XG4gICAgICAgIHRoaXMuX2FkZF92YWx1ZShzaG9ydGN1dCwgdmFsKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgc2hvcnRjdXQgPSB0aGlzLl9hZGQodmFsLCAwLCB0b3BpYy5zcGxpdCh0aGlzLl9zZXBhcmF0b3IpLCB0aGlzLl90cmllKTtcbiAgICAgICAgaWYgKHRoaXMuX3Nob3J0Y3V0cylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRzLnNldCh0b3BpYywgc2hvcnRjdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG5SZW1vdmUgYSB0b3BpYyBtYXRjaGVyIGZyb20gdGhlIHFsb2JiZXIuXG5cbkBwYXJhbSB7U3RyaW5nfSB0b3BpYyBUaGUgdG9waWMgdGhhdCdzIGJlaW5nIG1hdGNoZWQgYWdhaW5zdC5cbkBwYXJhbSB7QW55fSBbdmFsXSBUaGUgdmFsdWUgdGhhdCdzIGJlaW5nIG1hdGNoZWQuIElmIHlvdSBkb24ndCBzcGVjaWZ5IGB2YWxgIHRoZW4gYWxsIG1hdGNoZXJzIGZvciBgdG9waWNgIGFyZSByZW1vdmVkLlxuQHJldHVybiB7UWxvYmJlcn0gVGhlIHFsb2JiZXIgKGZvciBjaGFpbmluZykuXG4qL1xuUWxvYmJlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRvcGljLCB2YWwpXG57XG4gICAgaWYgKHRoaXMuX3JlbW92ZSh2YWwsIDAsIHRvcGljLnNwbGl0KHRoaXMuX3NlcGFyYXRvciksIHRoaXMuX3RyaWUpICYmIHRoaXMuX3Nob3J0Y3V0cylcbiAgICB7XG4gICAgICAgIHRoaXMuX3Nob3J0Y3V0cy5kZWxldGUodG9waWMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuTWF0Y2ggYSB0b3BpYy5cblxuQHBhcmFtIHtTdHJpbmd9IHRvcGljIFRoZSB0b3BpYyB0byBtYXRjaCBhZ2FpbnN0LlxuQHJldHVybiB7QXJyYXl9IExpc3Qgb2YgdmFsdWVzIHRoYXQgbWF0Y2hlZCB0aGUgdG9waWMuIFRoaXMgbWF5IGNvbnRhaW4gZHVwbGljYXRlcy4gVXNlIGEgW2BRbG9iYmVyRGVkdXBgXSgjcWxvYmJlcmRlZHVwb3B0aW9ucykgaWYgeW91IGRvbid0IHdhbnQgZHVwbGljYXRlcy5cbiovXG5RbG9iYmVyLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uICh0b3BpYywgY3R4KVxue1xuICAgIHJldHVybiB0aGlzLl9tYXRjaDIoW10sIHRvcGljLCBjdHgpO1xufTtcblxuLyoqXG5UZXN0IHdoZXRoZXIgYSB0b3BpYyBtYXRjaCBjb250YWlucyBhIHZhbHVlLiBGYXN0ZXIgdGhhbiBjYWxsaW5nIFtgbWF0Y2hgXSgjcWxvYmJlcnByb3RvdHlwZW1hdGNodG9waWMpIGFuZCBzZWFyY2hpbmcgdGhlIHJlc3VsdCBmb3IgdGhlIHZhbHVlLiBWYWx1ZXMgYXJlIHRlc3RlZCB1c2luZyBbYHRlc3RfdmFsdWVzYF0oI3Fsb2JiZXJwcm90b3R5cGV0ZXN0X3ZhbHVlc3ZhbHMtdmFsKS5cblxuQHBhcmFtIHtTdHJpbmd9IHRvcGljIFRoZSB0b3BpYyB0byBtYXRjaCBhZ2FpbnN0LlxuQHBhcmFtIHtBbnl9IHZhbCBUaGUgdmFsdWUgYmVpbmcgdGVzdGVkIGZvci5cbkByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgbWF0Y2hpbmcgYWdhaW5zdCBgdG9waWNgIGNvbnRhaW5zIGB2YWxgLlxuKi9cblFsb2JiZXIucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAodG9waWMsIHZhbClcbntcbiAgICByZXR1cm4gdGhpcy5fdGVzdCh2YWwsIDAsIHRvcGljLnNwbGl0KHRoaXMuX3NlcGFyYXRvciksIHRoaXMuX3RyaWUpO1xufTtcblxuLyoqXG5UZXN0IHdoZXRoZXIgdmFsdWVzIGZvdW5kIGluIGEgbWF0Y2ggY29udGFpbiBhIHZhbHVlIHBhc3NlZCB0byBbYHRlc3RgXSgjcWxvYmJlcnByb3RvdHlwZXRlc3R0b3BpYy12YWwpLiBZb3UgY2FuIG92ZXJyaWRlIHRoaXMgdG8gcHJvdmlkZSBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbi4gRGVmYXVsdHMgdG8gdXNpbmcgYGluZGV4T2ZgLlxuXG5AcGFyYW0ge0FycmF5fSB2YWxzIFRoZSB2YWx1ZXMgZm91bmQgd2hpbGUgbWF0Y2hpbmcuXG5AcGFyYW0ge0FueX0gdmFsIFRoZSB2YWx1ZSBiZWluZyB0ZXN0ZWQgZm9yLlxuQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBgdmFsc2AgY29udGFpbnMgYHZhbGAuXG4qL1xuUWxvYmJlci5wcm90b3R5cGUudGVzdF92YWx1ZXMgPSBmdW5jdGlvbiAodmFscywgdmFsKVxue1xuICAgIHJldHVybiB2YWxzLmluZGV4T2YodmFsKSA+PSAwO1xufTtcblxuLyoqXG5SZXNldCB0aGUgcWxvYmJlci5cblxuUmVtb3ZlcyBhbGwgdG9waWMgbWF0Y2hlcnMgZnJvbSB0aGUgcWxvYmJlci5cblxuQHJldHVybiB7UWxvYmJlcn0gVGhlIHFsb2JiZXIgKGZvciBjaGFpbmluZykuXG4qL1xuUWxvYmJlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKVxue1xuICAgIHRoaXMuX3RyaWUuY2xlYXIoKTtcbiAgICBpZiAodGhpcy5fc2hvcnRjdXRzKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2hvcnRjdXRzLmNsZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9yIGRlYnVnZ2luZ1xuUWxvYmJlci5wcm90b3R5cGUuZ2V0X3RyaWUgPSBmdW5jdGlvbiAoKVxue1xuICAgIHJldHVybiB0aGlzLl90cmllO1xufTtcblxuLyoqXG5WaXNpdCBlYWNoIG5vZGUgaW4gdGhlIHFsb2JiZXIncyB0cmllIGluIHR1cm4uXG5cbkByZXR1cm4ge0l0ZXJhdG9yfSBBbiBpdGVyYXRvciBvbiB0aGUgdHJpZS4gVGhlIGl0ZXJhdG9yIHJldHVybnMgb2JqZWN0cyB3aGljaCwgaWYgZmVkIChpbiB0aGUgc2FtZSBvcmRlcikgdG8gdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5IFtgZ2V0X3Jlc3RvcmVyYF0oI3Fsb2JiZXJwcm90b3R5cGVnZXRfcmVzdG9yZXJvcHRpb25zKSBvbiBhIGRpZmZlcmVudCBxbG9iYmVyLCB3aWxsIGJ1aWxkIHRoYXQgcWxvYmJlcidzIHRyaWUgdG8gdGhlIHNhbWUgc3RhdGUuIFRoZSBvYmplY3RzIGNhbiBiZSBzZXJpYWxpemVkIHVzaW5nIGBKU09OLnN0cmluZ2lmeWAsIF9pZl8gdGhlIHZhbHVlcyB5b3Ugc3RvcmUgaW4gdGhlIHFsb2JiZXIgYXJlIGFsc28gc2VyaWFsaXphYmxlLlxuKi9cblFsb2JiZXIucHJvdG90eXBlLnZpc2l0ID0gZnVuY3Rpb24qICgpXG57XG4gICAgbGV0IGl0ZXJhdG9ycyA9IFtdLFxuICAgICAgICBpdGVyYXRvciA9IHRoaXMuX3RyaWUuZW50cmllcygpLFxuICAgICAgICBpID0gMDtcblxuICAgIHdoaWxlICh0cnVlKVxuICAgIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHlpZWxkIHsgdHlwZTogJ3N0YXJ0X2VudHJpZXMnIH07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV4dCA9IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICBpZiAobmV4dC5kb25lKVxuICAgICAgICB7XG4gICAgICAgICAgICB5aWVsZCB7IHR5cGU6ICdlbmRfZW50cmllcycgfTtcblxuICAgICAgICAgICAgbGV0IHByZXYgPSBpdGVyYXRvcnMucG9wKCk7XG4gICAgICAgICAgICBpZiAocHJldiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgW2l0ZXJhdG9yLCBpXSA9IHByZXY7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBba2V5LCB2YWx1ZV0gPSBuZXh0LnZhbHVlO1xuICAgICAgICB5aWVsZCB7IHR5cGU6ICdlbnRyeScsIGk6IGkrKywga2V5OiBrZXkgfTtcblxuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLl9zZXBhcmF0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHlpZWxkIHsgdHlwZTogJ3N0YXJ0X3ZhbHVlcycgfTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdmFsdWUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB7IHR5cGU6ICd2YWx1ZScsIGk6IGorKywgdmFsdWU6IHYgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeWllbGQgeyB0eXBlOiAndmFsdWUnLCBpOiAwLCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeWllbGQgeyB0eXBlOiAnZW5kX3ZhbHVlcycgfTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlcmF0b3JzLnB1c2goW2l0ZXJhdG9yLCBpXSk7XG4gICAgICAgIGl0ZXJhdG9yID0gdmFsdWUuZW50cmllcygpO1xuICAgICAgICBpID0gMDtcbiAgICB9XG59O1xuXG4vKipcbkdldCBhIGZ1bmN0aW9uIHdoaWNoIGNhbiByZXN0b3JlIHRoZSBxbG9iYmVyJ3MgdHJpZSB0byBhIHN0YXRlIHlvdSByZXRyaWV2ZWRcbmJ5IGNhbGxpbmcgW2B2aXNpdGBdKCNxbG9iYmVycHJvdG90eXBldmlzaXQpIG9uIHRoaXMgb3IgYW5vdGhlciBxbG9iYmVyLlxuXG5AcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIE9wdGlvbnMgZm9yIHJlc3RvcmluZyB0aGUgdHJpZS5cbi0gYHtCb29sZWFufSBjYWNoZV9hZGRzYCBXaGV0aGVyIHRvIGNhY2hlIHRvcGljcyB3aGVuIHJlYnVpbGRpbmcgdGhlIHRyaWUuIFRoaXMgb25seSBhcHBsaWVzIGlmIHlvdSBhbHNvIHBhc3NlZCBgY2FjaGVfYWRkc2AgYXMgdHJ1ZSBpbiB0aGUgW2NvbnN0cnVjdG9yXSgjcWxvYmJlcm9wdGlvbnMpLlxuXG5AcmV0dXJuIHtGdW5jdGlvbn0gRnVuY3Rpb24gdG8gY2FsbCBpbiBvcmRlciB0byByZWJ1aWxkIHRoZSBxbG9iYmVyJ3MgdHJpZS4gWW91IHNob3VsZCBjYWxsIHRoaXMgcmVwZWF0ZWRseSB3aXRoIHRoZSBvYmplY3RzIHlvdSByZWNlaXZlZCBmcm9tIGEgY2FsbCB0byBbYHZpc2l0YF0oI3Fsb2JiZXJwcm90b3R5cGV2aXNpdCkuIElmIHlvdSBzZXJpYWxpemVkIHRoZSBvYmplY3RzLCByZW1lbWJlciB0byBkZXNlcmlhbGl6ZSB0aGVtIGZpcnN0IChlLmcuIHdpdGggYEpTT04ucGFyc2VgKSFcbiovXG5RbG9iYmVyLnByb3RvdHlwZS5nZXRfcmVzdG9yZXIgPSBmdW5jdGlvbiAob3B0aW9ucylcbntcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGxldCBzdHMgPSBbXSxcbiAgICAgICAgZW50cnkgPSB0aGlzLl90cmllLFxuICAgICAgICBwYXRoID0gJyc7XG5cbiAgICByZXR1cm4gKG9iaikgPT5cbiAgICB7XG4gICAgICAgIHN3aXRjaCAob2JqLnR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgJ2VudHJ5JzpcbiAgICAgICAgICAgICAgICBlbnRyeSA9IGVudHJ5IHx8IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBzdHMucHVzaChbZW50cnksIG9iai5rZXksIHBhdGhdKTtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IGVudHJ5LmdldChvYmoua2V5KTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jYWNoZV9hZGRzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGgpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggKz0gdGhpcy5fc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gb2JqLmtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRfdmFsdWUoZW50cnksIG9iai52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5ID0gdGhpcy5faW5pdGlhbF92YWx1ZShvYmoudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZW5kX2VudHJpZXMnOlxuICAgICAgICAgICAgICAgIGlmIChlbnRyeSAmJiAoZW50cnkuc2l6ZSA9PT0gMCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuXG4gICAgICAgICAgICBjYXNlICdlbmRfdmFsdWVzJzpcbiAgICAgICAgICAgICAgICBsZXQgcHJldiA9IHN0cy5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtwcmV2X2VudHJ5LCBrZXksIHByZXZfcGF0aF0gPSBwcmV2O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNhY2hlX2FkZHMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydGN1dHMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqLnR5cGUgPT09ICdlbmRfdmFsdWVzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRjdXRzLnNldChwcmV2X3BhdGgsIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZfZW50cnkuc2V0KGtleSwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5ID0gcHJldl9lbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHByZXZfcGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuLyoqXG5DcmVhdGVzIGEgbmV3IGRlLWR1cGxpY2F0aW5nIHFsb2JiZXIuXG5cbkluaGVyaXRzIGZyb20gW2BRbG9iYmVyYF0oI3Fsb2JiZXJvcHRpb25zKS5cblxuQGNvbnN0cnVjdG9yXG5AcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFNhbWUgb3B0aW9ucyBhcyBRbG9iYmVyLlxuKi9cbmZ1bmN0aW9uIFFsb2JiZXJEZWR1cCAob3B0aW9ucylcbntcbiAgICBRbG9iYmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbnV0aWwuaW5oZXJpdHMoUWxvYmJlckRlZHVwLCBRbG9iYmVyKTtcblxuUWxvYmJlckRlZHVwLnByb3RvdHlwZS5faW5pdGlhbF92YWx1ZSA9IGZ1bmN0aW9uICh2YWwpXG57XG4gICAgcmV0dXJuIG5ldyBTZXQoKS5hZGQodmFsKTtcbn07XG5cblFsb2JiZXJEZWR1cC5wcm90b3R5cGUuX2FkZF92YWx1ZSA9IGZ1bmN0aW9uICh2YWxzLCB2YWwpXG57XG4gICAgdmFscy5hZGQodmFsKTtcbn07XG5cblFsb2JiZXJEZWR1cC5wcm90b3R5cGUuX2FkZF92YWx1ZXMgPSBmdW5jdGlvbiAoZGVzdCwgb3JpZ2luKVxue1xuICAgIG9yaWdpbi5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpXG4gICAge1xuICAgICAgICBkZXN0LmFkZCh2YWwpO1xuICAgIH0pO1xufTtcblxuUWxvYmJlckRlZHVwLnByb3RvdHlwZS5fcmVtb3ZlX3ZhbHVlID0gZnVuY3Rpb24gKHZhbHMsIHZhbClcbntcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxzLmRlbGV0ZSh2YWwpO1xuICAgIHJldHVybiB2YWxzLnNpemUgPT09IDA7XG59O1xuXG4vKipcblRlc3Qgd2hldGhlciB2YWx1ZXMgZm91bmQgaW4gYSBtYXRjaCBjb250YWluIGEgdmFsdWUgcGFzc2VkIHRvIFtgdGVzdGBdKCNxbG9iYmVycHJvdG90eXBldGVzdHRvcGljX3ZhbCkuIFlvdSBjYW4gb3ZlcnJpZGUgdGhpcyB0byBwcm92aWRlIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uLiBEZWZhdWx0cyB0byB1c2luZyBgaGFzYC5cblxuQHBhcmFtIHtTZXR9IHZhbHMgVGhlIHZhbHVlcyBmb3VuZCB3aGlsZSBtYXRjaGluZyAoW0VTNiBTZXRdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1zZXQtb2JqZWN0cykpLlxuQHBhcmFtIHtBbnl9IHZhbCBUaGUgdmFsdWUgYmVpbmcgdGVzdGVkIGZvci5cbkByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgYHZhbHNgIGNvbnRhaW5zIGB2YWxgLlxuKi9cblFsb2JiZXJEZWR1cC5wcm90b3R5cGUudGVzdF92YWx1ZXMgPSBmdW5jdGlvbiAodmFscywgdmFsKVxue1xuICAgIHJldHVybiB2YWxzLmhhcyh2YWwpO1xufTtcblxuLyoqXG5NYXRjaCBhIHRvcGljLlxuXG5AcGFyYW0ge1N0cmluZ30gdG9waWMgVGhlIHRvcGljIHRvIG1hdGNoIGFnYWluc3QuXG5AcmV0dXJuIHtTZXR9IFtFUzYgU2V0XShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtc2V0LW9iamVjdHMpIG9mIHZhbHVlcyB0aGF0IG1hdGNoZWQgdGhlIHRvcGljLlxuKi9cblFsb2JiZXJEZWR1cC5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAodG9waWMsIGN0eClcbntcbiAgICByZXR1cm4gdGhpcy5fbWF0Y2gyKG5ldyBTZXQoKSwgdG9waWMsIGN0eCk7XG59O1xuXG4vKipcbkNyZWF0ZXMgYSBuZXcgcWxvYmJlciB3aGljaCBvbmx5IHN0b3JlcyB0aGUgdmFsdWUgYHRydWVgLlxuXG5XaGF0ZXZlciB2YWx1ZSB5b3UgW2BhZGRgXSgjcWxvYmJlcnByb3RvdHlwZWFkZHRvcGljLXZhbCkgdG8gdGhpcyBxbG9iYmVyXG4oZXZlbiBgdW5kZWZpbmVkYCksIGEgc2luZ2xlLCBkZS1kdXBsaWNhdGVkIGB0cnVlYCB3aWxsIGJlIHN0b3JlZC4gVXNlIHRoaXNcbnFsb2JiZXIgaWYgeW91IG9ubHkgbmVlZCB0byB0ZXN0IHdoZXRoZXIgdG9waWNzIG1hdGNoLCBub3QgYWJvdXQgdGhlIHZhbHVlc1xudGhleSBtYXRjaCB0by5cblxuSW5oZXJpdHMgZnJvbSBbYFFsb2JiZXJgXSgjcWxvYmJlcm9wdGlvbnMpLlxuXG5AY29uc3RydWN0b3JcbkBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gU2FtZSBvcHRpb25zIGFzIFFsb2JiZXIuXG4qL1xuZnVuY3Rpb24gUWxvYmJlclRydWUgKG9wdGlvbnMpXG57XG4gICAgUWxvYmJlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG51dGlsLmluaGVyaXRzKFFsb2JiZXJUcnVlLCBRbG9iYmVyKTtcblxuUWxvYmJlclRydWUucHJvdG90eXBlLl9pbml0aWFsX3ZhbHVlID0gZnVuY3Rpb24gKClcbntcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cblFsb2JiZXJUcnVlLnByb3RvdHlwZS5fYWRkX3ZhbHVlID0gZnVuY3Rpb24gKClcbntcbn07XG5cblFsb2JiZXJUcnVlLnByb3RvdHlwZS5fcmVtb3ZlX3ZhbHVlID0gZnVuY3Rpb24gKClcbntcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuVGhpcyBvdmVycmlkZSBvZiBbYHRlc3RfdmFsdWVzYF0oI3Fsb2JiZXJwcm90b3R5cGV0ZXN0X3ZhbHVlc3ZhbHMtdmFsKSBhbHdheXNcbnJldHVybnMgYHRydWVgLiBXaGVuIHlvdSBjYWxsIFtgdGVzdGBdKCNxbG9iYmVycHJvdG90eXBldGVzdHRvcGljLXZhbCkgb24gYVxuYFFsb2JiZXJUcnVlYCBpbnN0YW5jZSwgdGhlIHZhbHVlIHlvdSBwYXNzIGlzIGlnbm9yZWQgc2luY2UgaXQgb25seSBjYXJlc1xud2hldGhlciBhIHRvcGljIGlzIG1hdGNoZWQuXG5cbkByZXR1cm4ge0Jvb2xlYW59IEFsd2F5cyBgdHJ1ZWAuXG4qL1xuUWxvYmJlclRydWUucHJvdG90eXBlLnRlc3RfdmFsdWVzID0gZnVuY3Rpb24gKClcbntcbiAgICByZXR1cm4gdHJ1ZTsgICAgXG59O1xuXG4vKipcbk1hdGNoIGEgdG9waWMuXG5cblNpbmNlIGBRbG9iYmVyVHJ1ZWAgb25seSBjYXJlcyB3aGV0aGVyIGEgdG9waWMgaXMgbWF0Y2hlZCBhbmQgbm90IGFib3V0IHZhbHVlc1xuaXQgbWF0Y2hlcyB0bywgdGhpcyBvdmVycmlkZSBvZiBbYG1hdGNoYF0oI3Fsb2JiZXJwcm90b3R5cGVtYXRjaHRvcGljKSBqdXN0XG5jYWxscyBbYHRlc3RgXSgjcWxvYmJlcnByb3RvdHlwZXRlc3R0b3BpYy12YWwpICh3aXRoIHZhbHVlIGB1bmRlZmluZWRgKS5cblxuQHBhcmFtIHtTdHJpbmd9IHRvcGljIFRoZSB0b3BpYyB0byBtYXRjaCBhZ2FpbnN0LlxuQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciB0aGUgYFFsb2JiZXJUcnVlYCBpbnN0YW5jZSBtYXRjaGVzIHRoZSB0b3BpYy5cbiovXG5RbG9iYmVyVHJ1ZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAodG9waWMsIGN0eClcbntcbiAgICByZXR1cm4gdGhpcy50ZXN0KHRvcGljLCBjdHgpO1xufTtcblxubGV0IHN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG4vKipcbkNyZWF0ZXMgYSBuZXcgW2BSZWFkYWJsZWBdKGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC12OC54L2RvY3MvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9jbGFzc19zdHJlYW1fcmVhZGFibGUpIHN0cmVhbSwgaW4gb2JqZWN0IG1vZGUsIHdoaWNoIGNhbGxzIFtgdmlzaXRgXSgjcWxvYmJlcnByb3RvdHlwZXZpc2l0KSBvbiBhIHFsb2JiZXIgdG8gZ2VuZXJhdGUgaXRzIGRhdGEuXG5cbllvdSBjb3VsZCBbYHBpcGVgXShodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QtdjgueC9kb2NzL2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fcmVhZGFibGVfcGlwZV9kZXN0aW5hdGlvbl9vcHRpb25zKSB0aGlzIHRvIGEgW2BKU09OU3RyZWFtLnN0cmluZ2lmeWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9KU09OU3RyZWFtI2pzb25zdHJlYW1zdHJpbmdpZnlvcGVuLXNlcC1jbG9zZSkgc3RyZWFtLCBmb3IgaW5zdGFuY2UsIHRvIHNlcmlhbGl6ZSB0aGUgcWxvYmJlciB0byBKU09OLiBTZWUgW3RoaXMgdGVzdF0odGVzdC9qc29uLmpzI0wxNCkgZm9yIGFuIGV4YW1wbGUuXG5cbkluaGVyaXRzIGZyb20gW2BSZWFkYWJsZWBdKGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC12OC54L2RvY3MvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9jbGFzc19zdHJlYW1fcmVhZGFibGUpLlxuXG5AY29uc3RydWN0b3JcblxuQHBhcmFtIHtRbG9iYmVyfSBxbG9iYmVyIFRoZSBxbG9iYmVyIHRvIGNhbGwgW2B2aXNpdGBdKCNxbG9iYmVycHJvdG90eXBldmlzaXQpIG9uLlxuKi9cbmZ1bmN0aW9uIFZpc2l0b3JTdHJlYW0gKHFsb2JiZXIpXG57XG4gICAgc3RyZWFtLlJlYWRhYmxlLmNhbGwodGhpcywgeyBvYmplY3RNb2RlOiB0cnVlIH0pO1xuICAgIHRoaXMuX2l0ZXJhdG9yID0gcWxvYmJlci52aXNpdCgpO1xufVxuXG51dGlsLmluaGVyaXRzKFZpc2l0b3JTdHJlYW0sIHN0cmVhbS5SZWFkYWJsZSk7XG5cblZpc2l0b3JTdHJlYW0ucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKClcbntcbiAgICB3aGlsZSAodHJ1ZSlcbiAgICB7XG4gICAgICAgIGxldCB7IGRvbmUsIHZhbHVlIH0gPSB0aGlzLl9pdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChudWxsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnB1c2godmFsdWUpKVxuICAgICAgICB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuQ3JlYXRlcyBhIG5ldyBbYFdyaXRhYmxlYF0oaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0LXY4LngvZG9jcy9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX2NsYXNzX3N0cmVhbV93cml0YWJsZSkgc3RyZWFtLCBpbiBvYmplY3QgbW9kZSwgd2hpY2ggcGFzc2VzIGRhdGEgd3JpdHRlbiB0byBpdCBpbnRvIHRoZSBmdW5jdGlvbiByZXR1cm5lZCBieSBjYWxsaW5nIFtgZ2V0X3Jlc3RvcmVyYF0oI3Fsb2JiZXJwcm90b3R5cGVnZXRfcmVzdG9yZXJvcHRpb25zKSBvbiBhIHFsb2JiZXIuXG5cbllvdSBjb3VsZCBbYHBpcGVgXShodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QtdjgueC9kb2NzL2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fcmVhZGFibGVfcGlwZV9kZXN0aW5hdGlvbl9vcHRpb25zKSBhIFtgSlNPTlN0cmVhbS5wYXJzZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9KU09OU3RyZWFtI2pzb25zdHJlYW1wYXJzZXBhdGgpIHN0cmVhbSB0byB0aGlzLCBmb3IgaW5zdGFuY2UsIHRvIGRlc2VyaWFsaXplIHRoZSBxbG9iYmVyIGZyb20gSlNPTi4gU2VlIFt0aGlzIHRlc3RdKHRlc3QvanNvbi5qcyNMMzMpIGZvciBhbiBleGFtcGxlLlxuXG5Jbmhlcml0cyBmcm9tIFtgV3JpdGFibGVgXShodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QtdjgueC9kb2NzL2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fY2xhc3Nfc3RyZWFtX3dyaXRhYmxlKS5cblxuQGNvbnN0cnVjdG9yXG5cbkBwYXJhbSB7UWxvYmJlcn0gcWxvYmJlciBUaGUgcWxvYmJlciB0byBjYWxsIFtgZ2V0X3Jlc3RvcmVyYF0oI3Fsb2JiZXJwcm90b3R5cGVnZXRfcmVzdG9yZXJvcHRpb25zKSBvbi5cbiovXG5mdW5jdGlvbiBSZXN0b3JlclN0cmVhbSAocWxvYmJlcilcbntcbiAgICBzdHJlYW0uV3JpdGFibGUuY2FsbCh0aGlzLCB7IG9iamVjdE1vZGU6IHRydWUgfSk7XG4gICAgdGhpcy5fcmVzdG9yZXIgPSBxbG9iYmVyLmdldF9yZXN0b3JlcigpO1xufVxuXG51dGlsLmluaGVyaXRzKFJlc3RvcmVyU3RyZWFtLCBzdHJlYW0uV3JpdGFibGUpO1xuXG5SZXN0b3JlclN0cmVhbS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKHZhbHVlLCBfLCBjYilcbntcbiAgICB0aGlzLl9yZXN0b3Jlcih2YWx1ZSk7XG4gICAgY2IoKTtcbn07XG5cbmV4cG9ydHMuUWxvYmJlciA9IFFsb2JiZXI7XG5leHBvcnRzLlFsb2JiZXJEZWR1cCA9IFFsb2JiZXJEZWR1cDtcbmV4cG9ydHMuUWxvYmJlclRydWUgPSBRbG9iYmVyVHJ1ZTtcbmV4cG9ydHMuVmlzaXRvclN0cmVhbSA9IFZpc2l0b3JTdHJlYW07XG5leHBvcnRzLlJlc3RvcmVyU3RyZWFtID0gUmVzdG9yZXJTdHJlYW07XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3Fsb2JiZXIvbGliL3Fsb2JiZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKGlzVW5kZWZpbmVkKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvdXRpbC9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtO1xuXG52YXIgRUUgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5pbmhlcml0cyhTdHJlYW0sIEVFKTtcblN0cmVhbS5SZWFkYWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9yZWFkYWJsZS5qcycpO1xuU3RyZWFtLldyaXRhYmxlID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLmpzJyk7XG5TdHJlYW0uRHVwbGV4ID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtL2R1cGxleC5qcycpO1xuU3RyZWFtLlRyYW5zZm9ybSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS90cmFuc2Zvcm0uanMnKTtcblN0cmVhbS5QYXNzVGhyb3VnaCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaC5qcycpO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjQueFxuU3RyZWFtLlN0cmVhbSA9IFN0cmVhbTtcblxuXG5cbi8vIG9sZC1zdHlsZSBzdHJlYW1zLiAgTm90ZSB0aGF0IHRoZSBwaXBlIG1ldGhvZCAodGhlIG9ubHkgcmVsZXZhbnRcbi8vIHBhcnQgb2YgdGhpcyBjbGFzcykgaXMgb3ZlcnJpZGRlbiBpbiB0aGUgUmVhZGFibGUgY2xhc3MuXG5cbmZ1bmN0aW9uIFN0cmVhbSgpIHtcbiAgRUUuY2FsbCh0aGlzKTtcbn1cblxuU3RyZWFtLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24oZGVzdCwgb3B0aW9ucykge1xuICB2YXIgc291cmNlID0gdGhpcztcblxuICBmdW5jdGlvbiBvbmRhdGEoY2h1bmspIHtcbiAgICBpZiAoZGVzdC53cml0YWJsZSkge1xuICAgICAgaWYgKGZhbHNlID09PSBkZXN0LndyaXRlKGNodW5rKSAmJiBzb3VyY2UucGF1c2UpIHtcbiAgICAgICAgc291cmNlLnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc291cmNlLm9uKCdkYXRhJywgb25kYXRhKTtcblxuICBmdW5jdGlvbiBvbmRyYWluKCkge1xuICAgIGlmIChzb3VyY2UucmVhZGFibGUgJiYgc291cmNlLnJlc3VtZSkge1xuICAgICAgc291cmNlLnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Qub24oJ2RyYWluJywgb25kcmFpbik7XG5cbiAgLy8gSWYgdGhlICdlbmQnIG9wdGlvbiBpcyBub3Qgc3VwcGxpZWQsIGRlc3QuZW5kKCkgd2lsbCBiZSBjYWxsZWQgd2hlblxuICAvLyBzb3VyY2UgZ2V0cyB0aGUgJ2VuZCcgb3IgJ2Nsb3NlJyBldmVudHMuICBPbmx5IGRlc3QuZW5kKCkgb25jZS5cbiAgaWYgKCFkZXN0Ll9pc1N0ZGlvICYmICghb3B0aW9ucyB8fCBvcHRpb25zLmVuZCAhPT0gZmFsc2UpKSB7XG4gICAgc291cmNlLm9uKCdlbmQnLCBvbmVuZCk7XG4gICAgc291cmNlLm9uKCdjbG9zZScsIG9uY2xvc2UpO1xuICB9XG5cbiAgdmFyIGRpZE9uRW5kID0gZmFsc2U7XG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgaWYgKHR5cGVvZiBkZXN0LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIGRlc3QuZGVzdHJveSgpO1xuICB9XG5cbiAgLy8gZG9uJ3QgbGVhdmUgZGFuZ2xpbmcgcGlwZXMgd2hlbiB0aGVyZSBhcmUgZXJyb3JzLlxuICBmdW5jdGlvbiBvbmVycm9yKGVyKSB7XG4gICAgY2xlYW51cCgpO1xuICAgIGlmIChFRS5saXN0ZW5lckNvdW50KHRoaXMsICdlcnJvcicpID09PSAwKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkIHN0cmVhbSBlcnJvciBpbiBwaXBlLlxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZXJyb3InLCBvbmVycm9yKTtcbiAgZGVzdC5vbignZXJyb3InLCBvbmVycm9yKTtcblxuICAvLyByZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgdGhhdCB3ZXJlIGFkZGVkLlxuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZHJhaW4nLCBvbmRyYWluKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBjbGVhbnVwKTtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIGNsZWFudXApO1xuICB9XG5cbiAgc291cmNlLm9uKCdlbmQnLCBjbGVhbnVwKTtcbiAgc291cmNlLm9uKCdjbG9zZScsIGNsZWFudXApO1xuXG4gIGRlc3Qub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5lbWl0KCdwaXBlJywgc291cmNlKTtcblxuICAvLyBBbGxvdyBmb3IgdW5peC1saWtlIHVzYWdlOiBBLnBpcGUoQikucGlwZShDKVxuICByZXR1cm4gZGVzdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gKGI2NC5sZW5ndGggKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIoKGxlbiAqIDMgLyA0KSAtIHBsYWNlSG9sZGVycylcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gbGVuIC0gNCA6IGxlblxuXG4gIHZhciBMID0gMFxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICsgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gdXRpbCAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbmZ1bmN0aW9uIGNvcHlCdWZmZXIoc3JjLCB0YXJnZXQsIG9mZnNldCkge1xuICBzcmMuY29weSh0YXJnZXQsIG9mZnNldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCdWZmZXJMaXN0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdWZmZXJMaXN0KTtcblxuICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gICAgdGhpcy50YWlsID0gbnVsbDtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2KSB7XG4gICAgdmFyIGVudHJ5ID0geyBkYXRhOiB2LCBuZXh0OiBudWxsIH07XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkgdGhpcy50YWlsLm5leHQgPSBlbnRyeTtlbHNlIHRoaXMuaGVhZCA9IGVudHJ5O1xuICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgICsrdGhpcy5sZW5ndGg7XG4gIH07XG5cbiAgQnVmZmVyTGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIHVuc2hpZnQodikge1xuICAgIHZhciBlbnRyeSA9IHsgZGF0YTogdiwgbmV4dDogdGhpcy5oZWFkIH07XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgICB0aGlzLmhlYWQgPSBlbnRyeTtcbiAgICArK3RoaXMubGVuZ3RoO1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gc2hpZnQoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgdmFyIHJldCA9IHRoaXMuaGVhZC5kYXRhO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtlbHNlIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXh0O1xuICAgIC0tdGhpcy5sZW5ndGg7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBCdWZmZXJMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiBqb2luKHMpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgICB2YXIgcmV0ID0gJycgKyBwLmRhdGE7XG4gICAgd2hpbGUgKHAgPSBwLm5leHQpIHtcbiAgICAgIHJldCArPSBzICsgcC5kYXRhO1xuICAgIH1yZXR1cm4gcmV0O1xuICB9O1xuXG4gIEJ1ZmZlckxpc3QucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdChuKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gQnVmZmVyLmFsbG9jKDApO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRoaXMuaGVhZC5kYXRhO1xuICAgIHZhciByZXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobiA+Pj4gMCk7XG4gICAgdmFyIHAgPSB0aGlzLmhlYWQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChwKSB7XG4gICAgICBjb3B5QnVmZmVyKHAuZGF0YSwgcmV0LCBpKTtcbiAgICAgIGkgKz0gcC5kYXRhLmxlbmd0aDtcbiAgICAgIHAgPSBwLm5leHQ7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgcmV0dXJuIEJ1ZmZlckxpc3Q7XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvaW50ZXJuYWwvc3RyZWFtcy9CdWZmZXJMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlcHJlY2F0ZTtcblxuLyoqXG4gKiBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICogUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLm5vRGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLnRocm93RGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gZGVwcmVjYXRlZCBmdW5jdGlvbnNcbiAqIHdpbGwgdGhyb3cgYW4gRXJyb3Igd2hlbiBpbnZva2VkLlxuICpcbiAqIElmIGBsb2NhbFN0b3JhZ2UudHJhY2VEZXByZWNhdGlvbiA9IHRydWVgIGlzIHNldCwgdGhlbiBkZXByZWNhdGVkIGZ1bmN0aW9uc1xuICogd2lsbCBpbnZva2UgYGNvbnNvbGUudHJhY2UoKWAgaW5zdGVhZCBvZiBgY29uc29sZS5lcnJvcigpYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBkZXByZWNhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgLSB0aGUgc3RyaW5nIHRvIHByaW50IHRvIHRoZSBjb25zb2xlIHdoZW4gYGZuYCBpcyBpbnZva2VkXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGEgbmV3IFwiZGVwcmVjYXRlZFwiIHZlcnNpb24gb2YgYGZuYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZXByZWNhdGUgKGZuLCBtc2cpIHtcbiAgaWYgKGNvbmZpZygnbm9EZXByZWNhdGlvbicpKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAoY29uZmlnKCd0aHJvd0RlcHJlY2F0aW9uJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZygndHJhY2VEZXByZWNhdGlvbicpKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgYGxvY2FsU3RvcmFnZWAgZm9yIGJvb2xlYW4gdmFsdWVzIGZvciB0aGUgZ2l2ZW4gYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvbmZpZyAobmFtZSkge1xuICAvLyBhY2Nlc3NpbmcgZ2xvYmFsLmxvY2FsU3RvcmFnZSBjYW4gdHJpZ2dlciBhIERPTUV4Y2VwdGlvbiBpbiBzYW5kYm94ZWQgaWZyYW1lc1xuICB0cnkge1xuICAgIGlmICghZ2xvYmFsLmxvY2FsU3RvcmFnZSkgcmV0dXJuIGZhbHNlO1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB2YWwgPSBnbG9iYWwubG9jYWxTdG9yYWdlW25hbWVdO1xuICBpZiAobnVsbCA9PSB2YWwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIFN0cmluZyh2YWwpLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3V0aWwtZGVwcmVjYXRlL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIHBhc3N0aHJvdWdoIHN0cmVhbS5cbi8vIGJhc2ljYWxseSBqdXN0IHRoZSBtb3N0IG1pbmltYWwgc29ydCBvZiBUcmFuc2Zvcm0gc3RyZWFtLlxuLy8gRXZlcnkgd3JpdHRlbiBjaHVuayBnZXRzIG91dHB1dCBhcy1pcy5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3NUaHJvdWdoO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9fc3RyZWFtX3RyYW5zZm9ybScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoUGFzc1Rocm91Z2gsIFRyYW5zZm9ybSk7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhc3NUaHJvdWdoKSkgcmV0dXJuIG5ldyBQYXNzVGhyb3VnaChvcHRpb25zKTtcblxuICBUcmFuc2Zvcm0uY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuUGFzc1Rocm91Z2gucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihudWxsLCBjaHVuayk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV93cml0YWJsZS5qcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS93cml0YWJsZS1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2R1cGxleC1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhZGFibGUnKS5UcmFuc2Zvcm1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbm9kZV9tb2R1bGVzL3N0cmVhbS1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhZGFibGUnKS5QYXNzVGhyb3VnaFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBNYXliZSwgc29tZSwgbm9uZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IE9yaWdpbiwgcGFyc2VPcmlnaW4gfSBmcm9tIFwiLi9vcmlnaW5cIjtcclxuaW1wb3J0IHsgVVJMLCBwYXJzZVVybCB9IGZyb20gXCIuL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBwYXJzZU51bWJlciB9IGZyb20gXCIuL251bWJlci11dGlsc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREb2N1bWVudFVybCh3aW5kb3cgOiBXaW5kb3cpIDogTWF5YmU8VVJMPiB7XHJcbiAgICByZXR1cm4gcGFyc2VVcmwod2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xyXG59XHJcblxyXG4vLyBUaGlzIGlzbid0IGEgcGVyZmVjdCBzZWFyY2ggcGFyYW0gZ2V0dGVyIGJ1dCBpdCBzaG91bGQgYmUgZmluZSBmb3IgZGVjb2RpbmdcclxuLy8gb3VyIGJsb2NrZWQgcGFnZSBhbmQgZXh0ZXJuYWwgYXBwIGxpbmsgcGFnZSBVUkxzLlxyXG5mdW5jdGlvbiBnZXRRdWVyeVBhcmFtRnJvbVNlYXJjaChzZWFyY2g6IHN0cmluZywgcXVlcnlQYXJhbTogc3RyaW5nKSA6IHN0cmluZ3xudWxsIHtcclxuICAgIC8vIFJlbW92ZSB0aGUgbGVhZGluZyBcIj9cIi5cclxuICAgIGNvbnN0IHBhcmFtc1N0cmluZyA9IHNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblxyXG4gICAgLy8gU3BsaXQgdGhlIHBhcmFtcyBzdHJpbmcgdXAgaW50byBcImtleT12YWx1ZVwiIHN0cmluZ3MuXHJcbiAgICBjb25zdCBwYXJhbXMgPSBwYXJhbXNTdHJpbmcuc3BsaXQoXCImXCIpXHJcblxyXG4gICAgLy8gU3BsaXQgZWFjaCBcImtleT12YWx1ZVwiIHN0cmluZyBpbnRvIGEga2V5IHZhbHVlIHBhaXIuXHJcbiAgICBmb3IgKGNvbnN0IHBhaXJTdHJpbmcgb2YgcGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFpciA9IHBhaXJTdHJpbmcuc3BsaXQoXCI9XCIpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgZGVjb2RlZCBrZXkgbWF0Y2hlcyB0aGUgcXVlcnkgcGFyYW0gd2UncmUgbG9va2luZyBmb3IgdGhlblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgZGVjb2RlZCB2YWx1ZS5cclxuICAgICAgICBpZiAoZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pID09PSBxdWVyeVBhcmFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gbnVsbCBpZiBbcXVlcnlQYXJhbV0gaXNuJ3QgZm91bmQgYmVjYXVzZSB0aGF0J3Mgd2hhdFxyXG4gICAgLy8gVVJMU2VhcmNoUGFyYW1zLmdldCgpIGRvZXMuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREb2N1bWVudFF1ZXJ5UGFyYW0oZG9jdW1lbnRVcmwgOiBNYXliZTxVUkw+LCBxdWVyeVBhcmFtIDogc3RyaW5nKSA6IE1heWJlPHN0cmluZz4ge1xyXG4gICAgaWYgKG5vbmUoZG9jdW1lbnRVcmwpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRWRnZSBkb2Vzbid0IGltcGxlbWVudCBVUkwuc2VhcmNoUGFyYW1zIHNvIHdlIG11c3QgYmUgcHJlcGFyZWQgdG8gZGVjb2RlXHJcbiAgICAvLyBVUkwuc2VhcmNoIG91cnNlbHZlcy5cclxuICAgIGxldCB2YWx1ZSA9IG51bGw7XHJcbiAgICBpZiAoZG9jdW1lbnRVcmwuc2VhcmNoUGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyBBcyBvZiBSZWRzdG9uZSA0IEVkZ2Ugc3VwcG9ydHMgdGhlIFVSTFNlYXJjaFBhcmFtcyB0eXBlIHNvIHRyeSB0aGF0LlxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoZG9jdW1lbnRVcmwuc2VhcmNoKTtcclxuICAgICAgICAgICAgdmFsdWUgPSBzZWFyY2hQYXJhbXMuZ2V0KHF1ZXJ5UGFyYW0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBnZXRRdWVyeVBhcmFtRnJvbVNlYXJjaChkb2N1bWVudFVybC5zZWFyY2gsIHF1ZXJ5UGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPSBkb2N1bWVudFVybC5zZWFyY2hQYXJhbXMuZ2V0KHF1ZXJ5UGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kVVJMRG9jdW1lbnRRdWVyeVBhcmFtKGRvY3VtZW50VXJsIDogTWF5YmU8VVJMPiwgcXVlcnlQYXJhbTogc3RyaW5nKSA6IE1heWJlPFVSTD4ge1xyXG4gICAgY29uc3QgcXVlcnlQYXJhbVZhbHVlID0gZmluZERvY3VtZW50UXVlcnlQYXJhbShkb2N1bWVudFVybCwgcXVlcnlQYXJhbSk7XHJcbiAgICBpZiAobm9uZShxdWVyeVBhcmFtVmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZVVybChxdWVyeVBhcmFtVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZE51bWJlckRvY3VtZW50UXVlcnlQYXJhbShkb2N1bWVudFVybDogTWF5YmU8VVJMPiwgcXVlcnlQYXJhbU5hbWU6IHN0cmluZykgOiBNYXliZTxudW1iZXI+IHtcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1WYWx1ZSA9IGZpbmREb2N1bWVudFF1ZXJ5UGFyYW0oZG9jdW1lbnRVcmwsIHF1ZXJ5UGFyYW1OYW1lKTtcclxuICAgIGlmIChub25lKHF1ZXJ5UGFyYW1WYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlTnVtYmVyKHF1ZXJ5UGFyYW1WYWx1ZSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi91cmwtcGFyc2UtdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmV4cG9ydCBlbnVtIE9wdGlvbk5hbWVzIHtcclxuICAgIGxpbmtTcGVjID0gXCJsaW5rU3BlY1wiLFxyXG4gICAgZXh0ZXJuYWxBcHBOYW1lID0gXCJleHRlcm5hbEFwcE5hbWVcIlxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvZXh0ZXJuYWwtYXBwLWxpbmstcGFnZS1vcHRpb25zLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBHZW5lcmljTWVzc2FnZVJvdXRlciB9IGZyb20gXCIuL21lc3NhZ2Utcm91dGVyXCI7XHJcbmltcG9ydCB7IEdlbmVyaWNNZXNzYWdlUG9ydENoYW5uZWwsIE5lZ290aWF0aW9uIH0gZnJvbSBcIi4vbWVzc2FnZS1wb3J0LWNoYW5uZWxcIjtcclxuaW1wb3J0IHsgbWFrZVByb21pc2UgfSBmcm9tIFwiLi9wcm9taXNlLXV0aWxzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBFeHRlcm5hbEFwcExpbmtSZXF1ZXN0VjEsIEV4dGVybmFsQXBwTGlua1Jlc3BvbnNlVjEsIE1lc3NhZ2UsIE1lc3NhZ2VQYXlsb2FkIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVNlbmRlciB9IGZyb20gXCIuL21lc3NhZ2Utc2VuZGVyXCI7XHJcbmltcG9ydCB7IFVSTFRvU3RyaW5nLCBwYXJzZVVybCB9IGZyb20gXCIuL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBub25lIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgbG9nLCBsb2dFcnJvciB9ICBmcm9tIFwiLi9sb2dcIjtcclxuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tIFwiLi9zdHJpbmctdXRpbHNcIjtcclxuaW1wb3J0IHsgaG9zdENvbnN0YW50cyB9IGZyb20gXCIuL2hvc3QtY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV4dGVuc2lvblBvcnRDb250cm9sbGVyIH0gZnJvbSBcIi4vZXh0ZW5zaW9uLXBvcnQtY29udHJvbGxlclwiXHJcbmltcG9ydCB7IG5hdmlnYXRlRG9jdW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbEFwcExpbmtDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBwcml2YXRlIGxpbmtVUkw6IFVSTCwgcHJpdmF0ZSBleHRlcm5hbEFwcE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uUG9ydENvbnRyb2xsZXIgPSBuZXcgRXh0ZW5zaW9uUG9ydENvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICAgICBob3N0Q29uc3RhbnRzLmV4dGVybmFsQXBwTGlua1BhZ2VQb3J0TmFtZSwgXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm9uRXh0ZW5zaW9uUmVhZHkoKSk7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25Qb3J0Q29udHJvbGxlci5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKFxyXG4gICAgICAgICAgICBNZXNzYWdlVHlwZS5leHRlcm5hbEFwcExpbmtSZXNwb25zZVYxLFxyXG4gICAgICAgICAgICAobWVzc2FnZSkgPT4gdGhpcy5oYW5kbGVSZXNwb25zZShtZXNzYWdlKSk7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25Qb3J0Q29udHJvbGxlci5jb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kTWVzc2FnZSh0eXBlOiBNZXNzYWdlVHlwZSwgcGF5bG9hZDogTWVzc2FnZVBheWxvYWQpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblBvcnRDb250cm9sbGVyLnNlbmRNZXNzYWdlKHR5cGUsIHBheWxvYWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGUodXJsOiBVUkwpIHtcclxuICAgICAgICBsb2coYEV4dGVybmFsQXBwTGlua0NvbnRyb2xsZXIubmF2aWdhdGU6ICR7dG9TdHJpbmcoe1xyXG4gICAgICAgICAgICBsaW5rVVJMOiB0aGlzLmxpbmtVUkwsXHJcbiAgICAgICAgICAgIGV4dGVybmFsQXBwTmFtZTogdGhpcy5leHRlcm5hbEFwcE5hbWUsXHJcbiAgICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgfSl9YCk7XHJcblxyXG4gICAgICAgIG5hdmlnYXRlRG9jdW1lbnQodGhpcy5kb2N1bWVudCwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRSZXF1ZXN0KCkge1xyXG4gICAgICAgIGxvZyhgRXh0ZXJuYWxBcHBMaW5rQ29udHJvbGxlci5zZW5kUmVxdWVzdDogJHt0b1N0cmluZyh7XHJcbiAgICAgICAgICAgIGxpbmtVUkw6IHRoaXMubGlua1VSTCxcclxuICAgICAgICAgICAgZXh0ZXJuYWxBcHBOYW1lOiB0aGlzLmV4dGVybmFsQXBwTmFtZSxcclxuICAgICAgICB9KX1gKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIE1lc3NhZ2VUeXBlLmV4dGVybmFsQXBwTGlua1JlcXVlc3RWMSwgXHJcbiAgICAgICAgICAgICAgICBuZXcgRXh0ZXJuYWxBcHBMaW5rUmVxdWVzdFYxKFVSTFRvU3RyaW5nKHRoaXMubGlua1VSTCksIHRoaXMuZXh0ZXJuYWxBcHBOYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkV4dGVuc2lvblJlYWR5KCkge1xyXG4gICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IG1lc3NhZ2UucGF5bG9hZCBhcyBFeHRlcm5hbEFwcExpbmtSZXNwb25zZVYxO1xyXG5cclxuICAgICAgICBsb2coYEV4dGVybmFsQXBwTGlua0NvbnRyb2xsZXIuaGFuZGxlUmVzcG9uc2U6ICR7dG9TdHJpbmcoe1xyXG4gICAgICAgICAgICBsaW5rVVJMOiB0aGlzLmxpbmtVUkwsXHJcbiAgICAgICAgICAgIGV4dGVybmFsQXBwTmFtZTogdGhpcy5leHRlcm5hbEFwcE5hbWUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRlVG9TcGVjOiByZXNwb25zZS5uYXZpZ2F0ZVRvU3BlY1xyXG4gICAgICAgIH0pfWApO1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSBwYXJzZVVybChyZXNwb25zZS5uYXZpZ2F0ZVRvU3BlYyk7XHJcbiAgICAgICAgaWYgKG5vbmUodXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF2aWdhdGUodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBleHRlbnNpb25Qb3J0Q29udHJvbGxlcjogRXh0ZW5zaW9uUG9ydENvbnRyb2xsZXI7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZXh0ZXJuYWwtYXBwLWxpbmstY29udHJvbGxlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTWF5YmUsIHNvbWUsIGlzRXF1YWwsIG5vbmUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHk8VD4oYXJyYXk6IFRbXSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA9PT0gMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQ+KGFycmF5OiBUW10pOiBUIHtcclxuICAgIHJldHVybiBhcnJheVswXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZDxUPihhcnJheTogVFtdKTogVCB7XHJcbiAgICByZXR1cm4gYXJyYXlbMV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGFycmF5OiBUW10pOiBUIHtcclxuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc3Q8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc2xpY2UoMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluczxUPihhcnJheTogVFtdLCBlbGVtZW50OiBUKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihlbGVtZW50KSAhPT0gLTE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5QXJyYXk8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XHJcbiAgICBjb25zdCBpZGVudGl0eSA9ICh2YWx1ZTogVCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYXJyYXkubWFwKGlkZW50aXR5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsdWU6IGFueSk6IHZhbHVlIGlzIEFycmF5PGFueT4ge1xyXG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdBcnJheTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWU6IFQpOiBBcnJheTxUPiB7XHJcbiAgICBjb25zdCBhcnJheSA9IG5ldyBBcnJheTxUPigpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xyXG4gICAgICAgIGFycmF5LnB1c2godmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4PFQ+KGFycmF5OiBUW10sIHZhbHVlOiBUKTogTWF5YmU8bnVtYmVyPiB7XHJcbiAgICBjb25zdCBub3RGb3VuZCA9IC0xO1xyXG4gICAgY29uc3QgaW5kZXggPSBhcnJheS5pbmRleE9mKHZhbHVlKTtcclxuICAgIGlmIChpbmRleCA9PT0gbm90Rm91bmQpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEFsbEluZGljZXM8VD4oYXJyYXk6IFRbXSwgcHJlZGljYXRlOiAoZWxlbWVudDogVCkgPT4gYm9vbGVhbik6IG51bWJlcltdIHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgYXJyYXkuZm9yRWFjaCgoZWxlbWVudDogVCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGlmIChwcmVkaWNhdGUoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHRzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZUFycmF5czxUPihhOiBUW10sIGI6IFRbXSwgY29tcGFyZTogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4gPSBpc0VxdWFsKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGVuZ3RoID0gYS5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKCFjb21wYXJlKGFbaV0sIGJbaV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhczxUPihhcnJheTogVFtdLCB2YWx1ZTogVCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHNvbWUoZmluZEluZGV4KGFycmF5LCB2YWx1ZSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZFVuaXF1ZTxUPihhcnJheTogVFtdLCBwcmVkaWNhdGU6IChlbGVtZW50OiBUKSA9PiBib29sZWFuKTogTWF5YmU8VD4ge1xyXG4gICAgY29uc3QgbWF0Y2hpbmdFbGVtZW50cyA9IGFycmF5LmZpbHRlcihwcmVkaWNhdGUpO1xyXG4gICAgaWYgKG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBmaXJzdChtYXRjaGluZ0VsZW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1heWJlRmlyc3Q8VD4oYXJyYXk6IE1heWJlPFRbXT4pOiBNYXliZTxUPiB7XHJcbiAgICBpZiAobm9uZShhcnJheSkpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpcnN0KGFycmF5KTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vYXJyYXktdXRpbHMudHMiLCJleHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL3R5cGUtdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUhvc3RDb25zdGFudHMge1xyXG4gICAgaG9zdEhlbHBlcklkOiBzdHJpbmc7XHJcbiAgICBibG9ja2VkUGFnZTogc3RyaW5nO1xyXG4gICAgZXh0ZXJuYWxBcHBMaW5rUGFnZTogc3RyaW5nO1xyXG4gICAgaG9sZGluZ1BhZ2U6IHN0cmluZyxcclxuICAgIGJsb2NrZWRGaWxlUGFnZTogc3RyaW5nO1xyXG4gICAgcGFnZVRyYWNrZXJQb3J0TmFtZTogc3RyaW5nO1xyXG4gICAgZXh0ZXJuYWxBcHBMaW5rUGFnZVBvcnROYW1lOiBzdHJpbmc7XHJcbiAgICBlZGdlRXh0ZXJuYWxBcHBMaW5rUXVlcnlLZXk6IHN0cmluZztcclxuICAgIGVkZ2VFeHRlcm5hbEFwcExpbmtRdWVyeVZhbHVlOiBzdHJpbmc7XHJcbiAgICBibG9ja2VkUGFnZVBvcnROYW1lOiBzdHJpbmc7XHJcbiAgICBibG9ja2VkRmlsZVBhZ2VQb3J0TmFtZTogc3RyaW5nO1xyXG4gICAgcG9wdXBQb3J0TmFtZTogc3RyaW5nO1xyXG4gICAgb3B0aW9uc1BvcnROYW1lOiBzdHJpbmc7XHJcbiAgICBtYXhBZ2VQYWdlRXZlbnQ6IG51bWJlcjtcclxuICAgIHBvc3Rwb25lbWVudFRpbWVvdXQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhvc3RDb25zdGFudHM6IElIb3N0Q29uc3RhbnRzID0ge1xyXG4gICAgaG9zdEhlbHBlcklkOiBcImNvbS5icm9taXVtLmhvc3RoZWxwZXJcIixcclxuICAgIGJsb2NrZWRQYWdlOiBcImJsb2NrZWQtcGFnZS5odG1sXCIsXHJcbiAgICBleHRlcm5hbEFwcExpbmtQYWdlOiBcImV4dGVybmFsLWFwcC1saW5rLXBhZ2UtdjEuaHRtbFwiLFxyXG4gICAgaG9sZGluZ1BhZ2U6IFwiaG9sZGluZy1wYWdlLmh0bWxcIixcclxuICAgIGVkZ2VFeHRlcm5hbEFwcExpbmtRdWVyeUtleTogXCJkMWIzMGU2OC04M2JlLTRiNmUtOWMyYS1jMWM0Y2E1MDJlOGJcIixcclxuICAgIGVkZ2VFeHRlcm5hbEFwcExpbmtRdWVyeVZhbHVlOiBcIjBcIixcclxuICAgIGJsb2NrZWRGaWxlUGFnZTogXCJibG9ja2VkLWZpbGUtcGFnZS5odG1sXCIsXHJcbiAgICBwYWdlVHJhY2tlclBvcnROYW1lOiBcImNvbS5icm9taXVtLnBhZ2UudHJhY2tlclwiLFxyXG4gICAgZXh0ZXJuYWxBcHBMaW5rUGFnZVBvcnROYW1lOiBcImNvbS5icm9taXVtLmV4dGVybmFsLmFwcC5saW5rLnBhZ2VcIixcclxuICAgIGJsb2NrZWRQYWdlUG9ydE5hbWU6IFwiY29tLmJyb21pdW0uYmxvY2tlZC5wYWdlXCIsXHJcbiAgICBibG9ja2VkRmlsZVBhZ2VQb3J0TmFtZTogXCJjb20uYnJvbWl1bS5ibG9ja2VkLmZpbGUucGFnZVwiLFxyXG4gICAgcG9wdXBQb3J0TmFtZTogXCJjb20uYnJvbWl1bS5wb3B1cFwiLFxyXG4gICAgb3B0aW9uc1BvcnROYW1lOiBcImNvbS5icm9taXVtLm9wdGlvbnNcIixcclxuICAgIG1heEFnZVBhZ2VFdmVudDogMTAwMCxcclxuICAgIHBvc3Rwb25lbWVudFRpbWVvdXQ6IDUwMDBcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2hvc3QvaG9zdC1jb25zdGFudHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IEdlbmVyaWNNZXNzYWdlUm91dGVyLCBIYW5kbGVNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZS1yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbCwgTmVnb3RpYXRpb24gfSBmcm9tIFwiLi9tZXNzYWdlLXBvcnQtY2hhbm5lbFwiO1xyXG5pbXBvcnQgeyBtYWtlUHJvbWlzZSB9IGZyb20gXCIuL3Byb21pc2UtdXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IEV4dGVybmFsQXBwTGlua1JlcXVlc3RWMSwgRXh0ZXJuYWxBcHBMaW5rUmVzcG9uc2VWMSwgTWVzc2FnZSwgTWVzc2FnZVBheWxvYWQgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIi4vbWVzc2FnZS1zZW5kZXJcIjtcclxuaW1wb3J0IHsgVVJMVG9TdHJpbmcsIHBhcnNlVXJsIH0gZnJvbSBcIi4vdXJsLXV0aWxzXCI7XHJcbmltcG9ydCB7IG5vbmUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5pbXBvcnQgeyBsb2csIGxvZ0Vycm9yIH0gIGZyb20gXCIuL2xvZ1wiO1xyXG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gXCIuL3N0cmluZy11dGlsc1wiO1xyXG5pbXBvcnQgeyBob3N0Q29uc3RhbnRzIH0gZnJvbSBcIi4vaG9zdC1jb25zdGFudHNcIjtcclxuXHJcbmVudW0gQ29ubmVjdGlvblN0YXRlIHtcclxuICAgIGRpc2Nvbm5lY3RlZCxcclxuICAgIGNvbm5lY3RpbmcsXHJcbiAgICBjb25uZWN0ZWQsXHJcbiAgICBleHRlbnNpb25SZWFkeVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBPbkV4dGVuc2lvblJlYWR5ID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25Qb3J0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcnROYW1lOiBzdHJpbmcsIHByaXZhdGUgb25FeHRlbnNpb25SZWFkeTogT25FeHRlbnNpb25SZWFkeSkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihcclxuICAgICAgICAgICAgTWVzc2FnZVR5cGUuZXh0ZW5zaW9uUmVhZHlWMSxcclxuICAgICAgICAgICAgKG1lc3NhZ2UpID0+IHRoaXMuaGFuZGxlRXh0ZW5zaW9uUmVhZHkobWVzc2FnZSkpO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uQ2hhbm5lbCA9IHRoaXMuY3JlYXRlRXh0ZW5zaW9uQ2hhbm5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmNvbm5lY3Rpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uQ2hhbm5lbC5jb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIodHlwZTogTWVzc2FnZVR5cGUsIGhhbmRsZXI6IEhhbmRsZU1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VSb3V0ZXIucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcih0eXBlLCBoYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTWVzc2FnZSh0eXBlOiBNZXNzYWdlVHlwZSwgcGF5bG9hZDogTWVzc2FnZVBheWxvYWQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlU2VuZGVyID0gdGhpcy5leHRlbnNpb25DaGFubmVsLm1lc3NhZ2VTZW5kZXI7XHJcbiAgICAgICAgbWVzc2FnZVNlbmRlci5zZW5kTWVzc2FnZSh0eXBlLCBwYXlsb2FkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUb1BvcnQoKTogUHJvbWlzZTxjaHJvbWUucnVudGltZS5Qb3J0PiB7XHJcbiAgICAgICAgcmV0dXJuIG1ha2VQcm9taXNlKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNocm9tZS5ydW50aW1lLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wb3J0TmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUV4dGVuc2lvbkNoYW5uZWwoKTogR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljTWVzc2FnZVBvcnRDaGFubmVsKFxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BvcnQoKSxcclxuICAgICAgICAgICAgKHBvcnQpID0+IHRoaXMub25FeHRlbnNpb25Db25uZWN0ZWQocG9ydCksXHJcbiAgICAgICAgICAgIChwb3J0KSA9PiB0aGlzLm9uRXh0ZW5zaW9uRGlzY29ubmVjdGVkKHBvcnQpLFxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VSb3V0ZXIsXHJcbiAgICAgICAgICAgIE5lZ290aWF0aW9uLk5vbmVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjb25uZWN0VG9FeHRlbnNpb24oKSB7XHJcbiAgICAgICAgbG9nKGBFeHRlbnNpb25Qb3J0Q29udHJvbGxlci5yZWNvbm5lY3RUb0V4dGVuc2lvbjogJHt0b1N0cmluZyh7XHJcbiAgICAgICAgICAgIHBvcnROYW1lOiB0aGlzLnBvcnROYW1lLFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IHRoaXMuY29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgfSl9YCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmNvbm5lY3Rpbmc7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25DaGFubmVsID0gdGhpcy5jcmVhdGVFeHRlbnNpb25DaGFubmVsKCk7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25DaGFubmVsLmNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUV4dGVuc2lvblJlYWR5KG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICBsb2coYEV4dGVuc2lvblBvcnRDb250cm9sbGVyLmhhbmRsZUV4dGVuc2lvblJlYWR5OiAke3RvU3RyaW5nKHtcclxuICAgICAgICAgICAgcG9ydE5hbWU6IHRoaXMucG9ydE5hbWUsXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogdGhpcy5jb25uZWN0aW9uU3RhdGVcclxuICAgICAgICB9KX1gKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuZXh0ZW5zaW9uUmVhZHk7XHJcbiAgICAgICAgdGhpcy5vbkV4dGVuc2lvblJlYWR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkV4dGVuc2lvbkNvbm5lY3RlZChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KSB7XHJcbiAgICAgICAgbG9nKGBFeHRlbnNpb25Qb3J0Q29udHJvbGxlci5vbkV4dGVuc2lvbkNvbm5lY3RlZDogJHt0b1N0cmluZyh7XHJcbiAgICAgICAgICAgIHBvcnROYW1lOiB0aGlzLnBvcnROYW1lLFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IHRoaXMuY29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgfSl9YCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXh0ZW5zaW9uRGlzY29ubmVjdGVkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpIHtcclxuICAgICAgICBsb2coYEV4dGVuc2lvblBvcnRDb250cm9sbGVyLm9uRXh0ZW5zaW9uRGlzY29ubmVjdGVkOiAke3RvU3RyaW5nKHtcclxuICAgICAgICAgICAgcG9ydE5hbWU6IHRoaXMucG9ydE5hbWVcclxuICAgICAgICB9KX1gKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBDb25uZWN0aW9uU3RhdGUuZXh0ZW5zaW9uUmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RUb0V4dGVuc2lvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VSb3V0ZXIgPSBuZXcgR2VuZXJpY01lc3NhZ2VSb3V0ZXIoKTtcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uQ2hhbm5lbDogR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbDtcclxuICAgIHByaXZhdGUgY29ubmVjdGlvblN0YXRlID0gQ29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZDtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vZXh0ZW5zaW9uLXBvcnQtY29udHJvbGxlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjaHJvbWVcIi8+XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vbWVzc2FnZS10eXBlc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuaW1wb3J0IHsgZGVjb2RlTWVzc2FnZSwgSU1lc3NhZ2VEZWNvZGVyLCBNZXNzYWdlRGVjb2RlZEV2ZW50IH0gZnJvbSBcIi4vbWVzc2FnZS1kZWNvZGVyXCI7XHJcbmltcG9ydCB7IElNZXNzYWdlUmVjZWl2ZXIgfSBmcm9tIFwiLi9tZXNzYWdlLXJlY2VpdmVyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGlzcGF0Y2hlciB9IGZyb20gXCIuL2V2ZW50LWRpc3BhdGNoZXJcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEhhbmRsZU1lc3NhZ2UgPSAobWVzc2FnZTogTWVzc2FnZSkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSGFuZGxlUG9ydE1lc3NhZ2UgPSAocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCwgbWVzc2FnZTogTWVzc2FnZSkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSGFuZGxlSW52YWxpZE1lc3NhZ2UgPSAocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCwgaW52YWxpZE1lc3NhZ2U6IG9iamVjdCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgT25VbmhhbmRsZWRNZXNzYWdlID0gKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQsIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHZvaWQ7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVJbnZhbGlkTWVzc2FnZShwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0LCBpbnZhbGlkTWVzc2FnZTogb2JqZWN0KSB7XHJcbiAgICBjb25zb2xlLmxvZyhgaGFuZGxlSW52YWxpZE1lc3NhZ2U6IGludmFsaWRNZXNzYWdlOiAke2ludmFsaWRNZXNzYWdlfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblVuaGFuZGxlZE1lc3NhZ2UocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCwgbWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5sb2coYG9uVW5oYW5kbGVkTWVzc2FnZTogbWVzc2FnZTogJHttZXNzYWdlfWApO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlUm91dGVyIGV4dGVuZHMgSU1lc3NhZ2VSZWNlaXZlciB7XHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVNZXNzYWdlKTogdm9pZDtcclxuICAgIHJlZ2lzdGVyUG9ydE1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVQb3J0TWVzc2FnZSk6IHZvaWQ7XHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIE1lc3NhZ2VSb3V0ZXIgaW1wbGVtZW50cyBJTWVzc2FnZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaGFuZGxlSW52YWxpZE1lc3NhZ2U6IEhhbmRsZUludmFsaWRNZXNzYWdlLCBwcm90ZWN0ZWQgb25VbmhhbmRsZWRNZXNzYWdlOiBPblVuaGFuZGxlZE1lc3NhZ2UpIHsgfVxyXG5cclxuICAgIGFic3RyYWN0IG9uTWVzc2FnZVJlY2VpdmVkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQsIGVuY29kZWRNZXNzYWdlOiBvYmplY3QpIDogdm9pZDtcclxuXHJcbiAgICByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVNZXNzYWdlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclBvcnRNZXNzYWdlSGFuZGxlcih0eXBlLCAocG9ydCwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyUG9ydE1lc3NhZ2VIYW5kbGVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBoYW5kbGVNZXNzYWdlOiBIYW5kbGVQb3J0TWVzc2FnZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VIYW5kbGVycyA9IHRoaXMubWVzc2FnZUhhbmRsZXJzLmdldCh0eXBlKTtcclxuICAgICAgICBpZiAobWVzc2FnZUhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlSGFuZGxlcnMuc2V0KHR5cGUsIFtoYW5kbGVNZXNzYWdlXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWVzc2FnZUhhbmRsZXJzLnB1c2goaGFuZGxlTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBtZXNzYWdlSGFuZGxlcnMgPSBuZXcgTWFwPE1lc3NhZ2VUeXBlLCBIYW5kbGVQb3J0TWVzc2FnZVtdPigpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2VuZXJpY01lc3NhZ2VSb3V0ZXIgZXh0ZW5kcyBNZXNzYWdlUm91dGVyIGltcGxlbWVudHMgSU1lc3NhZ2VEZWNvZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKGhhbmRsZUludmFsaWRNZXNzYWdlLCBvblVuaGFuZGxlZE1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWVzc2FnZVJlY2VpdmVkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQsIGVuY29kZWRNZXNzYWdlOiBvYmplY3QpIDogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBkZWNvZGVNZXNzYWdlKGVuY29kZWRNZXNzYWdlKTtcclxuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW52YWxpZE1lc3NhZ2UocG9ydCwgZW5jb2RlZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25NZXNzYWdlRGVjb2RlZC5kaXNwYXRjaEV2ZW50KG5ldyBNZXNzYWdlRGVjb2RlZEV2ZW50KG1lc3NhZ2UpKTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlSGFuZGxlcnMgPSB0aGlzLm1lc3NhZ2VIYW5kbGVycy5nZXQobWVzc2FnZS50eXBlKTtcclxuICAgICAgICBpZiAobWVzc2FnZUhhbmRsZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblVuaGFuZGxlZE1lc3NhZ2UocG9ydCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVNZXNzYWdlIG9mIG1lc3NhZ2VIYW5kbGVycykge1xyXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlKHBvcnQsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1lc3NhZ2VEZWNvZGVkID0gbmV3IEV2ZW50RGlzcGF0Y2hlcjxNZXNzYWdlRGVjb2RlZEV2ZW50PigpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLXJvdXRlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuZXhwb3J0IHR5cGUgQWN0aW9uID0gKCkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkb09uY2UoYWN0aW9uOiBBY3Rpb24pOiBBY3Rpb24ge1xyXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkb25lKSB7XHJcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL29uY2UudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY2hyb21lXCIvPlxyXG5pbXBvcnQgeyBNZXNzYWdlU2VuZGVyIH0gZnJvbSBcIi4vbWVzc2FnZS1zZW5kZXJcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSwgSGFuZHNoYWtlVjEsIG1lc3NhZ2VUb1N0cmluZyB9IGZyb20gXCIuL21lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlLCBpc0ZyZXF1ZW50bHlTZW50TWVzc2FnZVR5cGUsIGlzRWRnZUFja1dvcmthcm91bmQgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IGVuY29kZU1lc3NhZ2UgfSBmcm9tIFwiLi9tZXNzYWdlLWVuY29kZXJcIjtcclxuaW1wb3J0IHsgZGVjb2RlTWVzc2FnZSB9IGZyb20gXCIuL21lc3NhZ2UtZGVjb2RlclwiO1xyXG5pbXBvcnQgeyBNYXliZSwgbm9uZSwgc29tZSB9IGZyb20gXCIuL21heWJlXCI7XHJcbmltcG9ydCB7IElNZXNzYWdlUmVjZWl2ZXIgfSBmcm9tIFwiLi9tZXNzYWdlLXJlY2VpdmVyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGlzcGF0Y2hlciB9IGZyb20gXCIuL2V2ZW50LWRpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgSUhhbmRzaGFrZXIsIEhhbmRzaGFrZW5FdmVudCB9IGZyb20gXCIuL2hhbmRzaGFrZXJcIjtcclxuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tIFwiLi9zdHJpbmctdXRpbHNcIjtcclxuaW1wb3J0IHsgaXNFcnJvciB9IGZyb20gXCIuL2Vycm9yc1wiO1xyXG5pbXBvcnQgeyBwb3J0VG9TdHJpbmcgfSBmcm9tIFwiLi9wb3J0LXV0aWxzXCI7XHJcbmltcG9ydCB7IHN1cHBvcnRlZFByb3RvY29sVmVyc2lvbnMsIFByb3RvY29sVmVyc2lvbiwgc2hvdWxkTG9nTWVzc2FnZSB9IGZyb20gXCIuL3Byb3RvY29sLXZlcnNpb25zXCI7XHJcbmltcG9ydCB7IElDb25uZWN0aW9uLCBDb25uZWN0aW9uU3RhdGUsIENvbm5lY3Rpb25TdGF0ZUNoYW5nZWRFdmVudCB9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIjtcclxuaW1wb3J0IHsgbG9nLCBsb2dFcnJvciB9IGZyb20gXCIuL2xvZ1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgT25Db25uZWN0ID0gKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIE9uRGlzY29ubmVjdCA9IChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBPblBvcnRFcnJvciA9IChlOiBFcnJvcikgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgT25OZWdvdGlhdGlvbkVycm9yID0gKGU6IEVycm9yKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGVudW0gTmVnb3RpYXRpb24ge1xyXG4gICAgTm9uZSxcclxuICAgIE5lZ290aWF0ZVByb3RvY29sVmVyc2lvblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlUG9ydENoYW5uZWwgZXh0ZW5kcyBJSGFuZHNoYWtlciwgSUNvbm5lY3Rpb24ge1xyXG4gICAgY29ubmVjdCgpOiB2b2lkO1xyXG4gICAgZGlzY29ubmVjdCgpOiB2b2lkO1xyXG4gICAgc2VuZE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSk6IGJvb2xlYW47XHJcbiAgICByZWFkb25seSBtZXNzYWdlU2VuZGVyOiBNZXNzYWdlU2VuZGVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVBvcnRDaGFubmVsIGltcGxlbWVudHMgSU1lc3NhZ2VQb3J0Q2hhbm5lbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSBjb25uZWN0VG9Qb3J0OiBQcm9taXNlPGNocm9tZS5ydW50aW1lLlBvcnQ+LFxyXG4gICAgICAgICAgICBwcml2YXRlIG9uQ29ubmVjdDogT25Db25uZWN0LFxyXG4gICAgICAgICAgICBwcml2YXRlIG9uRGlzY29ubmVjdDogT25EaXNjb25uZWN0LFxyXG4gICAgICAgICAgICBwcml2YXRlIG9uUG9ydEVycm9yOiBPblBvcnRFcnJvcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBvbk5lZ290aWF0aW9uRXJyb3I6IE9uTmVnb3RpYXRpb25FcnJvcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBtZXNzYWdlUm91dGVyOiBJTWVzc2FnZVJlY2VpdmVyLFxyXG4gICAgICAgICAgICBwcml2YXRlIG5lZ290aWF0aW9uIDogTmVnb3RpYXRpb24pIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VTZW5kZXIgPSBuZXcgTWVzc2FnZVNlbmRlcigobWVzc2FnZSkgPT4gdGhpcy5zZW5kTWVzc2FnZShtZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXNjb25uZWN0UG9ydChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KSB7XHJcbiAgICAgICAgcG9ydC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVEaXNjb25uZWN0KHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlUG9ydENoYW5uZWwuY29ubmVjdFwiKTtcclxuICAgICAgICBpZiAodGhpcy5jb25uU3RhdGUgIT09IENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZXNzYWdlUG9ydENoYW5uZWwuY29ubmVjdCBjYWxsZWQgd2l0aCBjb25uU3RhdGUgPT0gJHt0aGlzLmNvbm5TdGF0ZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZztcclxuICAgICAgICB0aGlzLmNvbm5lY3RUb1BvcnQudGhlbigocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uU3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RQb3J0KHBvcnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKGVuY29kZU1lc3NhZ2UsIHBvcnQpID0+IHRoaXMub25NZXNzYWdlKGVuY29kZU1lc3NhZ2UsIHBvcnQpKTtcclxuICAgICAgICAgICAgdGhpcy5wb3J0Lm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigocG9ydCkgPT4gdGhpcy5oYW5kbGVEaXNjb25uZWN0KHBvcnQpKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmVnb3RpYXRpb24gPT09IE5lZ290aWF0aW9uLk5lZ290aWF0ZVByb3RvY29sVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuSGFuZHNoYWtpbmc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kc2hha2UgPSBuZXcgSGFuZHNoYWtlVjEoc3VwcG9ydGVkUHJvdG9jb2xWZXJzaW9ucyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZW5jb2RlTWVzc2FnZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgaGFuZHNoYWtlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZWRNZXNzYWdlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbm5lY3QodGhpcy5wb3J0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYE1lc3NhZ2VQb3J0Q2hhbm5lbC5jb25uZWN0OiBjb25uU3RhdGUgPT0gJHt0aGlzLmNvbm5TdGF0ZX1gKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY29ublN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5TdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkhhbmRzaGFraW5nOlxyXG4gICAgICAgICAgICAgICAgaWYgKHNvbWUodGhpcy5wb3J0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdFBvcnQodGhpcy5wb3J0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDpcclxuICAgICAgICAgICAgICAgIGlmIChzb21lKHRoaXMucG9ydCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RQb3J0KHRoaXMucG9ydClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAobm9uZSh0aGlzLnBvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlUG9ydENoYW5uZWwucG9zdE1lc3NhZ2U6IHRoaXMucG9ydCA9PT0gdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNGcmVxdWVudGx5U2VudE1lc3NhZ2VUeXBlKG1lc3NhZ2UudHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKGBNZXNzYWdlUG9ydENoYW5uZWwucG9zdE1lc3NhZ2U6IG1lc3NhZ2U6ICR7bWVzc2FnZVRvU3RyaW5nKG1lc3NhZ2UpfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucG9ydC5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0Vycm9yKGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUG9ydEVycm9yKGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYFVua25vd24gZXJyb3IgY2F1Z2h0IGluIHBvc3RNZXNzYWdlOiAke3RvU3RyaW5nKGUpfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblBvcnRFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kUXVldWVkTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIHRoaXMubWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcXVldWVNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5TdGF0ZSA9PT0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVldWVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWVzc2FnZShlbmNvZGVkTWVzc2FnZTogb2JqZWN0LCBwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ublN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuSGFuZHNoYWtpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coYE1lc3NhZ2VQb3J0Q2hhbm5lbC5vbk1lc3NhZ2U6IG1lc3NhZ2U6ICR7dG9TdHJpbmcoZW5jb2RlZE1lc3NhZ2UpfSBwb3J0OiAke3BvcnRUb1N0cmluZyhwb3J0KX1gKTtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBkZWNvZGVNZXNzYWdlKGVuY29kZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKG5vbmUobWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNob3VsZCB0aGlzIGNhbGwgb25Qb3J0RXJyb3I/IEl0IG1pZ2h0IG5vdCBiZSBzZXJpb3VzIGVub3VnaC5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9nRXJyb3IobmV3IEVycm9yKCdNZXNzYWdlUG9ydENoYW5uZWwub25NZXNzYWdlOiBpbnZhbGlkIG1lc3NhZ2UnKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNFZGdlQWNrV29ya2Fyb3VuZChtZXNzYWdlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFZGdlIGFjayBtZXNzYWdlIHdvcmthcm91bmRcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgIT09IE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTmVnb3RpYXRpb25FcnJvcihuZXcgRXJyb3IoYE1lc3NhZ2UgYmVmb3JlIGhhbmRzaGFrZW46ICR7bWVzc2FnZS50eXBlfWApKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChub25lKHRoaXMucG9ydCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Qb3J0RXJyb3IobmV3IEVycm9yKFwiTWVzc2FnZVBvcnRDaGFubmVsLm9uTWVzc2FnZTogdGhpcy5wb3J0ID09PSB1bmRlZmluZWRcIikpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZHNoYWtlID0gbWVzc2FnZS5wYXlsb2FkIGFzIEhhbmRzaGFrZVYxO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdXBwb3J0ZWRWZXJzaW9uIG9mIHN1cHBvcnRlZFByb3RvY29sVmVyc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHNoYWtlLnZlcnNpb25zLmluZGV4T2Yoc3VwcG9ydGVkVmVyc2lvbikgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWdvdGlhdGVkVmVyc2lvbiA9IHN1cHBvcnRlZFZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGBOZWdvdGlhdGVkIHByb3RvY29sIHZlcnNpb246ICR7dGhpcy5fbmVnb3RpYXRlZFZlcnNpb259YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFF1ZXVlZE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ublN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZW4uZGlzcGF0Y2hFdmVudChuZXcgSGFuZHNoYWtlbkV2ZW50KHRoaXMuX25lZ290aWF0ZWRWZXJzaW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Db25uZWN0KHRoaXMucG9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk5lZ290aWF0aW9uRXJyb3IobmV3IEVycm9yKGBObyBzdXBwb3J0ZWQgdmVyc2lvbiByZWNlaXZlZCBpbiBoYW5kc2hha2U6ICR7aGFuZHNoYWtlLnZlcnNpb25zfWApKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbm5TdGF0ZSA9PSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVJvdXRlci5vbk1lc3NhZ2VSZWNlaXZlZChwb3J0LCBlbmNvZGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRGlzY29ubmVjdChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ublN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uU3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkO1xyXG4gICAgICAgIHRoaXMucG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zb2xlLmxvZyhgTWVzc2FnZVBvcnRDaGFubmVsLmhhbmRsZURpc2Nvbm5lY3Q6IHBvcnQ6ICR7cG9ydFRvU3RyaW5nKHBvcnQpfWApO1xyXG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0KHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvdWxkTG9nTWVzc2FnZSgpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBXZSBzaG91bGQgYWx3YXlzIGxvZyBmcm9tIGludHJhLWV4dGVuc2lvbiBNZXNzYWdlUG9ydENoYW5uZWxzIHN1Y2ggYXMgdGhvc2UgZm9yIHRoZSBwb3B1cCBvciBibG9ja2luZyBwYWdlXHJcbiAgICAgICAgaWYgKHRoaXMubmVnb3RpYXRpb24gPT09IE5lZ290aWF0aW9uLk5vbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPbmx5IGxvZyBmb3IgdGhlIEhvc3RIZWxwZXIgY2hhbm5lbCBpZiB3ZSdyZSBvbiBhbiBvbGQgcHJvdG9jb2wgdmVyc2lvbiBiZWZvcmUgdGhlIGhlbHBlciBzdGFydGVkIGxvZ2dpbmdcclxuICAgICAgICByZXR1cm4gc29tZSh0aGlzLm5lZ290aWF0ZWRWZXJzaW9uKSAmJiBzaG91bGRMb2dNZXNzYWdlKHRoaXMubmVnb3RpYXRlZFZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2cobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkTG9nTWVzc2FnZSgpKSB7XHJcbiAgICAgICAgICAgIGxvZyhtZXNzYWdlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxvZ0Vycm9yKGVycm9yOiBFcnJvcikge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZExvZ01lc3NhZ2UoKSkge1xyXG4gICAgICAgICAgICBsb2dFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGNvbm5TdGF0ZSgpOiBDb25uZWN0aW9uU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXQgY29ublN0YXRlKG5ld1N0YXRlKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLl9jb25uU3RhdGU7XHJcbiAgICAgICAgdGhpcy5fY29ublN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgdGhpcy5vbkNvbm5lY3Rpb25TdGF0ZUNoYW5nZWQuZGlzcGF0Y2hFdmVudChuZXcgQ29ubmVjdGlvblN0YXRlQ2hhbmdlZEV2ZW50KG9sZFN0YXRlLCBuZXdTdGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0hhbmRzaGFrZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ublN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuZWdvdGlhdGVkVmVyc2lvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmVnb3RpYXRlZFZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbm5lY3Rpb25TdGF0ZSgpOiBDb25uZWN0aW9uU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5TdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWFkb25seSBtZXNzYWdlU2VuZGVyOiBNZXNzYWdlU2VuZGVyO1xyXG4gICAgcmVhZG9ubHkgb25IYW5kc2hha2VuID0gbmV3IEV2ZW50RGlzcGF0Y2hlcjxIYW5kc2hha2VuRXZlbnQ+KCk7XHJcbiAgICByZWFkb25seSBvbkNvbm5lY3Rpb25TdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnREaXNwYXRjaGVyPENvbm5lY3Rpb25TdGF0ZUNoYW5nZWRFdmVudD4oKTtcclxuXHJcbiAgICBwcml2YXRlIHBvcnQ6IE1heWJlPGNocm9tZS5ydW50aW1lLlBvcnQ+O1xyXG4gICAgcHJpdmF0ZSBtZXNzYWdlcyA9IG5ldyBBcnJheTxNZXNzYWdlPigpO1xyXG4gICAgcHJpdmF0ZSBfY29ublN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcclxuICAgIHByaXZhdGUgX25lZ290aWF0ZWRWZXJzaW9uOiBNYXliZTxQcm90b2NvbFZlcnNpb24+ID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2VuZXJpY01lc3NhZ2VQb3J0Q2hhbm5lbCBleHRlbmRzIE1lc3NhZ2VQb3J0Q2hhbm5lbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjb25uZWN0VG9Qb3J0OiBQcm9taXNlPGNocm9tZS5ydW50aW1lLlBvcnQ+LFxyXG4gICAgICAgIG9uQ29ubmVjdDogT25Db25uZWN0LFxyXG4gICAgICAgIG9uRGlzY29ubmVjdDogT25EaXNjb25uZWN0LFxyXG4gICAgICAgIG1lc3NhZ2VSb3V0ZXI6IElNZXNzYWdlUmVjZWl2ZXIsXHJcbiAgICAgICAgbmVnb3RpYXRpb24gOiBOZWdvdGlhdGlvbikge1xyXG4gICAgICAgICAgICBzdXBlcihjb25uZWN0VG9Qb3J0LFxyXG4gICAgICAgICAgICAgICAgb25Db25uZWN0LFxyXG4gICAgICAgICAgICAgICAgb25EaXNjb25uZWN0LFxyXG4gICAgICAgICAgICAgICAgKGU6IEVycm9yKSA9PiB7IGNvbnNvbGUuZXJyb3IoZSkgfSxcclxuICAgICAgICAgICAgICAgIChlOiBFcnJvcikgPT4geyBjb25zb2xlLmVycm9yKGUpIH0sXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlUm91dGVyLFxyXG4gICAgICAgICAgICAgICAgbmVnb3RpYXRpb24pO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9tZXNzYWdlLXBvcnQtY2hhbm5lbC50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VQYXlsb2FkLCBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZXNcIjtcclxuaW1wb3J0IHsgZW5jb2RlTWVzc2FnZSB9IGZyb20gXCIuL21lc3NhZ2UtZW5jb2RlclwiO1xyXG5cclxudHlwZSBTZW5kTWVzc2FnZSA9IChtZXNzYWdlOiBNZXNzYWdlKSA9PiBib29sZWFuO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZW5kZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkb1NlbmRNZXNzYWdlOiBTZW5kTWVzc2FnZSkgeyB9XHJcblxyXG4gICAgc2VuZE1lc3NhZ2UodHlwZTogTWVzc2FnZVR5cGUsIHBheWxvYWQ6IE1lc3NhZ2VQYXlsb2FkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVuY29kZU1lc3NhZ2UodHlwZSwgcGF5bG9hZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9TZW5kTWVzc2FnZShtZXNzYWdlKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vbWVzc2FnZS1zZW5kZXIudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IEV2ZW50RGlzcGF0Y2hlciB9IGZyb20gXCIuL2V2ZW50LWRpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTWF5YmUgfSBmcm9tIFwiLi9tYXliZVwiO1xyXG5pbXBvcnQgeyBQcm90b2NvbFZlcnNpb24gfSBmcm9tIFwiLi9wcm90b2NvbC12ZXJzaW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhhbmRzaGFrZW5FdmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBuZWdvdGlhdGVkVmVyc2lvbiA6IFByb3RvY29sVmVyc2lvbikgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUhhbmRzaGFrZXIge1xyXG4gICAgcmVhZG9ubHkgb25IYW5kc2hha2VuIDogRXZlbnREaXNwYXRjaGVyPEhhbmRzaGFrZW5FdmVudD47XHJcbiAgICBpc0hhbmRzaGFrZW4gOiBib29sZWFuO1xyXG4gICAgbmVnb3RpYXRlZFZlcnNpb24gOiBNYXliZTxQcm90b2NvbFZlcnNpb24+O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vaGFuZHNoYWtlci50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjaHJvbWVcIi8+XHJcbmltcG9ydCB7IE1heWJlLCBub25lIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgaXNWYWxpZFRhYklkIH0gZnJvbSBcIi4vdGFiLXV0aWxzXCI7XHJcbmltcG9ydCB7IFRhYklkLCBGcmFtZUlkIH0gZnJvbSBcIi4vY29tbW9uLXR5cGVzXCI7XHJcbmltcG9ydCB7IFVSTCwgcGFyc2VVcmwgfSBmcm9tIFwiLi91cmwtdXRpbHNcIjtcclxuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tIFwiLi9zdHJpbmctdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkUG9ydFRhYklkKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpOiBNYXliZTxUYWJJZD4ge1xyXG4gICAgY29uc3Qgc2VuZGVyID0gcG9ydC5zZW5kZXI7XHJcbiAgICBpZiAobm9uZShzZW5kZXIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhYiA9IHNlbmRlci50YWI7XHJcbiAgICBpZiAobm9uZSh0YWIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhYklkID0gdGFiLmlkO1xyXG4gICAgaWYgKG5vbmUodGFiSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmICghaXNWYWxpZFRhYklkKHRhYklkKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFiSWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkUG9ydFBhZ2VVcmwocG9ydDogY2hyb21lLnJ1bnRpbWUuUG9ydCk6IE1heWJlPFVSTD4ge1xyXG4gICAgY29uc3Qgc2VuZGVyID0gcG9ydC5zZW5kZXI7XHJcbiAgICBpZiAobm9uZShzZW5kZXIpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXJsU3BlYyA9IHNlbmRlci51cmw7XHJcbiAgICBpZiAobm9uZSh1cmxTcGVjKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHVybCA9IHBhcnNlVXJsKHVybFNwZWMpO1xyXG4gICAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQb3J0VGFiVXJsKHBvcnQ6IGNocm9tZS5ydW50aW1lLlBvcnQpOiBNYXliZTxVUkw+IHtcclxuICAgIGNvbnN0IHNlbmRlciA9IHBvcnQuc2VuZGVyO1xyXG4gICAgaWYgKG5vbmUoc2VuZGVyKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0YWIgPSBzZW5kZXIudGFiO1xyXG4gICAgaWYgKG5vbmUodGFiKSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmxTcGVjID0gdGFiLnVybDtcclxuICAgIGlmIChub25lKHVybFNwZWMpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IHVybCA9IHBhcnNlVXJsKHVybFNwZWMpO1xyXG4gICAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQb3J0RnJhbWVJZChwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KTogTWF5YmU8RnJhbWVJZD4ge1xyXG4gICAgY29uc3Qgc2VuZGVyID0gcG9ydC5zZW5kZXI7XHJcbiAgICBpZiAobm9uZShzZW5kZXIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZW5kZXIuZnJhbWVJZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvcnRUb1N0cmluZyhwb3J0OiBjaHJvbWUucnVudGltZS5Qb3J0KTogc3RyaW5nIHtcclxuICAgIC8vIFRoZSBwb3J0IGNhbiBiZSB1bmRlZmluZWQgaW4gTWVzc2FnZVBvcnRDaGFubmVsLmhhbmRsZURpc2Nvbm5lY3QgaW4gRWRnZS5cclxuICAgIGlmIChwb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0b1N0cmluZyh7XHJcbiAgICAgICAgbmFtZTogcG9ydC5uYW1lLFxyXG4gICAgICAgIHRhYklkOiByZWFkUG9ydFRhYklkKHBvcnQpLFxyXG4gICAgICAgIGZyYW1lSWQ6IHJlYWRQb3J0RnJhbWVJZChwb3J0KSxcclxuICAgICAgICBwYWdlVXJsOiByZWFkUG9ydFBhZ2VVcmwocG9ydClcclxuICAgIH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9wb3J0LXV0aWxzLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBUYWJJZCwgV2luZG93SWQgfSBmcm9tIFwiLi9jb21tb24tdHlwZXNcIjtcclxuaW1wb3J0IHsgSGFzaCB9IGZyb20gXCIuL2hhc2hcIjtcclxuaW1wb3J0IHsgbXVybXVySGFzaCB9IGZyb20gXCIuL211cm11ci1oYXNoXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFdpbmRvd0lkKHdpbmRvd0lkOiBXaW5kb3dJZCkge1xyXG4gICAgcmV0dXJuIHdpbmRvd0lkICE9PSBjaHJvbWUud2luZG93cy5XSU5ET1dfSURfTk9ORTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRUYWJJZCh0YWJJZDogVGFiSWQpIHtcclxuICAgIHJldHVybiB0YWJJZCAhPT0gY2hyb21lLnRhYnMuVEFCX0lEX05PTkU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNoVGFiSWQodGFiSWQ6IFRhYklkLCBzZWVkOiBIYXNoID0gMCk6IEhhc2gge1xyXG4gICAgcmV0dXJuIG11cm11ckhhc2godGFiSWQsIHNlZWQpO1xyXG59IFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVRhYklkKGE6IFRhYklkLCBiOiBUYWJJZCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFpc1ZhbGlkVGFiSWQoYSkgfHwgIWlzVmFsaWRUYWJJZChiKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBhID09PSBiO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi90YWItdXRpbHMudHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmltcG9ydCB7IG1ha2VTdHJpbmdIYXNoTWFwIH0gZnJvbSBcIi4vc3RyaW5nLXV0aWxzXCI7XHJcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSBcIi4vcmFuZ2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9tZXNzYWdlLXR5cGVzXCI7XHJcbmltcG9ydCB7IG5vbmUsIHNvbWUsIE1heWJlIH0gZnJvbSBcIi4vbWF5YmVcIjtcclxuaW1wb3J0IHsgQ2hyYWdFcnJvciB9IGZyb20gXCIuL2Vycm9yc1wiO1xyXG5cclxuZXhwb3J0IGVudW0gUHJvdG9jb2xWZXJzaW9uIHtcclxuICAgIHYxID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOC0wMjpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246aW5pdGlhbFwiLFxyXG4gICAgdjIgPSBcInRhZzpicm9taXVtLmNvbSwyMDE4LTA2OnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2MlwiLFxyXG4gICAgdjMgPSBcInRhZzpicm9taXVtLmNvbSwyMDE4LTA3OnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2M1wiLFxyXG4gICAgdjQgPSBcInRhZzpicm9taXVtLmNvbSwyMDE4LTA4OnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2NFwiLFxyXG4gICAgdjUgPSBcInRhZzpicm9taXVtLmNvbSwyMDE4LTExOnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2NVwiLFxyXG4gICAgdjYgPSBcInRhZzpicm9taXVtLmNvbSwyMDE4LTEyOnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2NlwiLFxyXG4gICAgdjcgPSBcInRhZzpicm9taXVtLmNvbSwyMDE5LTAxOnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2N1wiLFxyXG4gICAgdjggPSBcInRhZzpicm9taXVtLmNvbSwyMDE5LTA2OnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2OFwiLFxyXG4gICAgdjkgPSBcInRhZzpicm9taXVtLmNvbSwyMDE5LTA3OnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2OVwiLFxyXG4gICAgdjEwID0gXCJ0YWc6YnJvbWl1bS5jb20sMjAxOS0wOTpwcm90b2NvbHM6Z29vZ2xlLWNocm9tZS1leHRlbnNpb246djEwXCIsXHJcbiAgICB2MTEgPSBcInRhZzpicm9taXVtLmNvbSwyMDE5LTEwOnByb3RvY29sczpnb29nbGUtY2hyb21lLWV4dGVuc2lvbjp2MTFcIixcclxuICAgIHYxMiA9IFwidGFnOmJyb21pdW0uY29tLDIwMTktMTE6cHJvdG9jb2xzOmdvb2dsZS1jaHJvbWUtZXh0ZW5zaW9uOnYxMlwiLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkUHJvdG9jb2xWZXJzaW9ucyA9IFtcclxuICAgIFByb3RvY29sVmVyc2lvbi52MTIsXHJcbiAgICBQcm90b2NvbFZlcnNpb24udjExLFxyXG4gICAgUHJvdG9jb2xWZXJzaW9uLnYxMCxcclxuICAgIFByb3RvY29sVmVyc2lvbi52OSxcclxuICAgIFByb3RvY29sVmVyc2lvbi52OCxcclxuICAgIFByb3RvY29sVmVyc2lvbi52NyxcclxuICAgIFByb3RvY29sVmVyc2lvbi52NixcclxuICAgIFByb3RvY29sVmVyc2lvbi52NSxcclxuICAgIFByb3RvY29sVmVyc2lvbi52NCxcclxuICAgIFByb3RvY29sVmVyc2lvbi52MyxcclxuICAgIFByb3RvY29sVmVyc2lvbi52MixcclxuICAgIFByb3RvY29sVmVyc2lvbi52MVxyXG5dO1xyXG5cclxuY29uc3Qgc3VwcG9ydGVkTWVzc2FnZVR5cGVzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHN1cHBvcnRlZE1lc3NhZ2VSYW5nZXMgPSBtYWtlU3RyaW5nSGFzaE1hcDxSYW5nZT4oKTtcclxuICAgIHN1cHBvcnRlZE1lc3NhZ2VSYW5nZXMucHV0TWFueShbXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52MSwgbmV3IFJhbmdlKE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxLCBNZXNzYWdlVHlwZS5oZWFydGJlYXRWMSldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjIsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUuZW5hYmxlZEZlYXR1cmVzUmVzcG9uc2VWMildLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjMsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUucmVwdXRhdGlvbkNoYW5nZWRWMyldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjQsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUuYmxvY2tlZFBhZ2VEYXRhUmVzcG9uc2VWNCldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjUsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUucG9wdXBEYXRhUmVzcG9uc2VWNSldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjYsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUudHJ1c3RVcmxWNildLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjcsIG5ldyBSYW5nZShNZXNzYWdlVHlwZS5oYW5kc2hha2VWMSwgTWVzc2FnZVR5cGUuY29uZmlnQ2hhbmdlZFY3KV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52OCwgbmV3IFJhbmdlKE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxLCBNZXNzYWdlVHlwZS5jb25maWdDaGFuZ2VkVjgpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY5LCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLmNvbmZpZ0NoYW5nZWRWOSldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEwLCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLmhlYXJ0YmVhdFYxMCldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjExLCBuZXcgUmFuZ2UoTWVzc2FnZVR5cGUuaGFuZHNoYWtlVjEsIE1lc3NhZ2VUeXBlLmNvbmZpZ0NoYW5nZWRWMTEpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYxMiwgbmV3IFJhbmdlKE1lc3NhZ2VUeXBlLmhhbmRzaGFrZVYxLCBNZXNzYWdlVHlwZS5jb25maWdDaGFuZ2VkVjEyKV0sXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBzdXBwb3J0ZWRNZXNzYWdlUmFuZ2VzO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWVzc2FnZVR5cGVTdXBwb3J0ZWQobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlLCBwcm90b2NvbFZlcnNpb246IFByb3RvY29sVmVyc2lvbikge1xyXG4gICAgY29uc3QgcmFuZ2UgPSBzdXBwb3J0ZWRNZXNzYWdlVHlwZXMuZ2V0KHByb3RvY29sVmVyc2lvbik7XHJcbiAgICBpZiAobm9uZShyYW5nZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFuZ2UuY29udGFpbnMobWVzc2FnZVR5cGUpO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBWZXJzaW9uU3VwcG9ydFN0YXR1cyB7XHJcbiAgICBub3RIYW5kc2hha2VuLFxyXG4gICAgc3VwcG9ydGVkLFxyXG4gICAgdW5zdXBwb3J0ZWRcclxufVxyXG5cclxuY29uc3Qgc3VwcG9ydGVkRXJyb3JzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHN1cHBvcnRlZEVycm9ycyA9IG1ha2VTdHJpbmdIYXNoTWFwPFJhbmdlPigpO1xyXG4gICAgc3VwcG9ydGVkRXJyb3JzLnB1dE1hbnkoW1xyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEsIG5ldyBSYW5nZShDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsIENocmFnRXJyb3IucmVjb3ZlcmVkRnJvbUVycm9yKV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52MiwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5yZWNvdmVyZWRGcm9tRXJyb3IpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnYzLCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLnJlY292ZXJlZEZyb21FcnJvcildLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjQsIG5ldyBSYW5nZShDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsIENocmFnRXJyb3IucmVjb3ZlcmVkRnJvbUVycm9yKV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52NSwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5yZWNvdmVyZWRGcm9tRXJyb3IpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY2LCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLnJlY292ZXJlZEZyb21FcnJvcildLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjcsIG5ldyBSYW5nZShDaHJhZ0Vycm9yLm5vdEVuYWJsZWQsIENocmFnRXJyb3IuaXMzMmJpdEZpcmVmb3gpXSxcclxuICAgICAgICBbUHJvdG9jb2xWZXJzaW9uLnY4LCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLmlzMzJiaXRGaXJlZm94KV0sXHJcbiAgICAgICAgW1Byb3RvY29sVmVyc2lvbi52OSwgbmV3IFJhbmdlKENocmFnRXJyb3Iubm90RW5hYmxlZCwgQ2hyYWdFcnJvci5pczMyYml0RmlyZWZveCldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEwLCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLmhlbHBlclVucmVzcG9uc2l2ZSldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjExLCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLmhlbHBlclVucmVzcG9uc2l2ZSldLFxyXG4gICAgICAgIFtQcm90b2NvbFZlcnNpb24udjEyLCBuZXcgUmFuZ2UoQ2hyYWdFcnJvci5ub3RFbmFibGVkLCBDaHJhZ0Vycm9yLmhlbHBlclVucmVzcG9uc2l2ZSldLFxyXG4gICAgXSk7XHJcbiAgICByZXR1cm4gc3VwcG9ydGVkRXJyb3JzO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRXJyb3JTdXBwb3J0ZWQoZXJyb3I6IENocmFnRXJyb3IsIHByb3RvY29sVmVyc2lvbjogUHJvdG9jb2xWZXJzaW9uKSB7XHJcbiAgICBjb25zdCByYW5nZSA9IHN1cHBvcnRlZEVycm9ycy5nZXQocHJvdG9jb2xWZXJzaW9uKTtcclxuICAgIGlmIChub25lKHJhbmdlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiByYW5nZS5jb250YWlucyhlcnJvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRMb2dNZXNzYWdlKHByb3RvY29sVmVyc2lvbjogUHJvdG9jb2xWZXJzaW9uKSB7XHJcbiAgICByZXR1cm4gIWlzTWVzc2FnZVR5cGVTdXBwb3J0ZWQoTWVzc2FnZVR5cGUuc3RvcEhlbHBlclYxMCwgcHJvdG9jb2xWZXJzaW9uKTtcclxufVxyXG5cclxuZW51bSBIZWxwUGFnZVZlcnNpb24ge1xyXG4gICAgdjQxNSA9IFwidjQuMS41XCIsXHJcbiAgICB2NDE4MSA9IFwidjQuMS44LjFcIixcclxuICAgIG1heEhlbHBQYWdlVmVyc2lvbiA9IHY0MTgxXHJcbn07XHJcblxyXG5jb25zdCBzdXBwb3J0ZWRIZWxwUGFnZVZlcnNpb25zID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHN1cHBvcnRlZEhlbHBQYWdlVmVyc2lvbnMgPSBtYWtlU3RyaW5nSGFzaE1hcDxzdHJpbmc+KCk7XHJcbiAgICBzdXBwb3J0ZWRIZWxwUGFnZVZlcnNpb25zLnB1dE1hbnkoW1xyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52MSwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52MiwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52MywgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52NCwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52NSwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52NiwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52NywgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52OCwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52OSwgSGVscFBhZ2VWZXJzaW9uLnY0MTVdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52MTAsIEhlbHBQYWdlVmVyc2lvbi52NDE1XSxcclxuICAgICAgIFtQcm90b2NvbFZlcnNpb24udjExLCBIZWxwUGFnZVZlcnNpb24udjQxODFdLFxyXG4gICAgICAgW1Byb3RvY29sVmVyc2lvbi52MTIsIEhlbHBQYWdlVmVyc2lvbi52NDE4MV0sXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBzdXBwb3J0ZWRIZWxwUGFnZVZlcnNpb25zO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhlbHBQYWdlVmVyc2lvbihwcm90b2NvbFZlcnNpb246IE1heWJlPFByb3RvY29sVmVyc2lvbj4pIHtcclxuICAgIGlmIChzb21lKHByb3RvY29sVmVyc2lvbikpIHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRWZXJzaW9uID0gc3VwcG9ydGVkSGVscFBhZ2VWZXJzaW9ucy5nZXQocHJvdG9jb2xWZXJzaW9uKTtcclxuICAgICAgICBpZiAoc29tZShzdXBwb3J0ZWRWZXJzaW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkVmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBXZSBuZWVkIGEgdmVyc2lvbiBzdHJpbmcgdG8gbWFrZSBhIHZhbGlkIGhlbHAgbGluayBVUkwgc28gd2UgY2FuJ3QganVzdCByZXR1cm4gfHVuZGVmaW5lZHwgaGVyZVxyXG4gICAgcmV0dXJuIEhlbHBQYWdlVmVyc2lvbi5tYXhIZWxwUGFnZVZlcnNpb247XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvaG9zdC9wcm90b2NvbC12ZXJzaW9ucy50cyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBCcm9taXVtLCBJbmMuXHJcbi8vIFVzZSBvZiB0aGUgQnJvbWl1bSwgSW5jLiBzb2Z0d2FyZSByZXF1aXJlcyBhIGxpY2Vuc2UgYWdyZWVtZW50IHdpdGggQnJvbWl1bSwgSW5jLiBvciBhbiBhdXRob3JpemVkIHJlc2VsbGVyLlxyXG5cclxuaW1wb3J0IHsgaXNJblJhbmdlIH0gZnJvbSBcIi4vbnVtYmVyLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFuZ2Uge1xyXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbWluOiBudW1iZXIsIHJlYWRvbmx5IG1heDogbnVtYmVyKSB7fVxyXG5cclxuICAgIGNvbnRhaW5zKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaXNJblJhbmdlKHZhbHVlLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDOi9qZW5raW5zL3dvcmtzcGFjZS9jYW1fc2J4X2FsbF9tYXN0ZXJfc2lnbmVkL3NieC1hbGwtc2lnbmVkL2xpYi9jb21tb24vcmFuZ2UudHMiLCJpbXBvcnQgeyBFdmVudERpc3BhdGNoZXIgfSBmcm9tIFwiLi9ldmVudC1kaXNwYXRjaGVyXCI7XHJcblxyXG5leHBvcnQgZW51bSBDb25uZWN0aW9uU3RhdGUge1xyXG4gICAgQ29ubmVjdGluZyxcclxuICAgIEhhbmRzaGFraW5nLFxyXG4gICAgQ29ubmVjdGVkLFxyXG4gICAgRGlzY29ubmVjdGluZyxcclxuICAgIERpc2Nvbm5lY3RlZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvblN0YXRlQ2hhbmdlZEV2ZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9sZFN0YXRlOiBDb25uZWN0aW9uU3RhdGUsIHJlYWRvbmx5IG5ld1N0YXRlOiBDb25uZWN0aW9uU3RhdGUpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbm5lY3Rpb24ge1xyXG4gICAgcmVhZG9ubHkgb25Db25uZWN0aW9uU3RhdGVDaGFuZ2VkOiBFdmVudERpc3BhdGNoZXI8Q29ubmVjdGlvblN0YXRlQ2hhbmdlZEV2ZW50PjtcclxuICAgIHJlYWRvbmx5IGNvbm5lY3Rpb25TdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2Nvbm5lY3Rpb24udHMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggQnJvbWl1bSwgSW5jLlxyXG4vLyBVc2Ugb2YgdGhlIEJyb21pdW0sIEluYy4gc29mdHdhcmUgcmVxdWlyZXMgYSBsaWNlbnNlIGFncmVlbWVudCB3aXRoIEJyb21pdW0sIEluYy4gb3IgYW4gYXV0aG9yaXplZCByZXNlbGxlci5cclxuXHJcbmV4cG9ydCB0eXBlIEZhY3Rvcnk8VD4gPSAoKSA9PiBUO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQcm9taXNlPFQ+KGZhY3Rvcnk6IEZhY3Rvcnk8VD4pOiBQcm9taXNlPFQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWN0b3J5KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFJlc29sdmVyPFQ+ID0gKHZhbHVlOiBUKSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBBc3luY0ZhY3Rvcnk8VD4gPSAocmVzb2x2ZTogUmVzb2x2ZXI8VD4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVByb21pc2VBc3luYzxUPihmYWN0b3J5OiBBc3luY0ZhY3Rvcnk8VD4pOiBQcm9taXNlPFQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZmFjdG9yeShyZXNvbHZlKTtcclxuICAgIH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEM6L2plbmtpbnMvd29ya3NwYWNlL2NhbV9zYnhfYWxsX21hc3Rlcl9zaWduZWQvc2J4LWFsbC1zaWduZWQvbGliL2NvbW1vbi9wcm9taXNlLXV0aWxzLnRzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IEJyb21pdW0sIEluYy5cclxuLy8gVXNlIG9mIHRoZSBCcm9taXVtLCBJbmMuIHNvZnR3YXJlIHJlcXVpcmVzIGEgbGljZW5zZSBhZ3JlZW1lbnQgd2l0aCBCcm9taXVtLCBJbmMuIG9yIGFuIGF1dGhvcml6ZWQgcmVzZWxsZXIuXHJcblxyXG5pbXBvcnQgeyBVUkwsIFVSTFRvU3RyaW5nIH0gZnJvbSBcIi4vdXJsLXV0aWxzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVEb2N1bWVudChkb2N1bWVudDogRG9jdW1lbnQsIHVybDogVVJMKSB7XHJcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gVVJMVG9TdHJpbmcodXJsKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQzovamVua2lucy93b3Jrc3BhY2UvY2FtX3NieF9hbGxfbWFzdGVyX3NpZ25lZC9zYngtYWxsLXNpZ25lZC9saWIvY29tbW9uL2RvbS11dGlscy50cyJdLCJzb3VyY2VSb290IjoiIn0=