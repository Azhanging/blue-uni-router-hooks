/*!
 * 
 * blue-uni-router-hooks.js 1.0.0
 * (c) 2016-2023 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-uni-router-hooks
 * time:Tue, 25 Jul 2023 16:40:03 GMT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["blueUniRouterHooks"] = factory();
	else
		root["blueUniRouterHooks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "./static";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router_before__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RouterBefore", function() { return _router_before__WEBPACK_IMPORTED_MODULE_0__["RouterBefore"]; });

/* harmony import */ var _router_after__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RouterAfter", function() { return _router_after__WEBPACK_IMPORTED_MODULE_1__["RouterAfter"]; });





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouterBefore", function() { return RouterBefore; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/*
 * 处理路由下一跳
 * */

function preventRouterNext(nextStatus) {
    return (typeof nextStatus === "string" ||
        nextStatus instanceof Error ||
        nextStatus === false);
}
var RouterBefore = /** @class */ (function () {
    function RouterBefore() {
        this.beforeHooks = [];
    }
    //添加到队里
    RouterBefore.prototype.listen = function (nextHook) {
        this.beforeHooks.push(nextHook);
    };
    //下一步的数据处理
    RouterBefore.prototype.run = function (to, from, next, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        var beforeHooks = this.beforeHooks;
        //四种情况，path，false，Error参照官方文档中的next处理
        // true 或者 undefined（没有返回值） 走默认的next()处理
        //当前的nextHook
        var currentBeforeHook = beforeHooks[index];
        //hook处理
        var hookHandler = function (status) {
            //需要阻止处理了
            if (preventRouterNext(status)) {
                next(status);
            }
            else {
                //没有后续了
                if (index === beforeHooks.length - 1) {
                    next(status);
                }
                else {
                    _this.run(to, from, next, index + 1);
                }
            }
        };
        //fn处理
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(currentBeforeHook)) {
            Object(_tools__WEBPACK_IMPORTED_MODULE_0__["hook"])(null, currentBeforeHook, [
                to,
                from,
                function (status) {
                    hookHandler(status);
                },
            ]);
        }
        else {
            hookHandler(currentBeforeHook);
        }
    };
    return RouterBefore;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hook", function() { return hook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
function hook(context, cb, args) {
    if (args === void 0) { args = []; }
    if (isFunction(cb)) {
        return cb.apply(context, args);
    }
    return cb;
}
function isFunction(cb) {
    return typeof cb === "function";
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouterAfter", function() { return RouterAfter; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

//路由after hook
var RouterAfter = /** @class */ (function () {
    function RouterAfter() {
        this.afterHooks = [];
    }
    //添加订阅
    RouterAfter.prototype.listen = function (afterHook) {
        this.afterHooks.push(afterHook);
    };
    //分发订阅
    RouterAfter.prototype.run = function (to, from) {
        this.afterHooks.forEach(function (currentAfterHook) {
            Object(_tools__WEBPACK_IMPORTED_MODULE_0__["hook"])(null, currentAfterHook, [to, from]);
        });
    };
    return RouterAfter;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=blue-uni-router-hooks.js.map