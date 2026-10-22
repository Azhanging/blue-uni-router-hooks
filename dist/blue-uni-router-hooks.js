/*!
 * 
 * blue-uni-router-hooks.js 1.0.1
 * (c) 2016-2026 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-uni-router-hooks
 * time:Thu, 22 Oct 2026 14:29:00 GMT
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

function preventRouterNext(s) {
    if (typeof s === "string")
        return true;
    if (s instanceof Error)
        return true;
    if (s === false)
        return true;
    if (typeof s === "object" && s !== null && !Array.isArray(s))
        return true;
    return false;
}
var RouterBefore = /** @class */ (function () {
    function RouterBefore() {
        this.beforeHooks = [];
    }
    RouterBefore.prototype.listen = function (nextHook) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(nextHook))
            this.beforeHooks.push(nextHook);
    };
    RouterBefore.prototype.run = function (to, from, next) {
        var hooks = this.beforeHooks;
        var index = 0;
        var finished = false;
        // 统一出口：无论成功/失败/中断，只出一次
        var finish = function (status) {
            if (finished)
                return;
            finished = true;
            if (!Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(next))
                return; // 风险3：next 非函数不崩
            try {
                next(status);
            }
            catch (e) {
                // 风险2：next 自身抛错不吞、不破坏流程，异步上报
                setTimeout(function () { throw e; }, 0);
            }
        };
        // 迭代驱动，彻底消除递归栈溢出
        var step = function () {
            var _loop_1 = function () {
                var current = hooks[index];
                if (!Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(current)) {
                    index++;
                    return "continue";
                }
                var called = false;
                var handler = function (status) {
                    if (called || finished)
                        return;
                    called = true;
                    if (preventRouterNext(status) || index === hooks.length - 1) {
                        finish(status);
                    }
                    else {
                        index++;
                        step(); // 仅在异步/中断时再入，深度 = 异步守卫数
                    }
                };
                try {
                    var ret = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["hook"])(null, current, [to, from, handler]);
                    // 风险1：异步守卫 reject 转 next(error)，不再 unhandledRejection
                    if (ret && typeof ret.then === "function") {
                        ret.catch(function (err) { return handler(err instanceof Error ? err : new Error(String(err))); });
                    }
                }
                catch (err) {
                    handler(err);
                }
                return { value: void 0 };
            };
            while (index < hooks.length) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            finish(); // 队列走完
        };
        step();
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

var RouterAfter = /** @class */ (function () {
    function RouterAfter() {
        this.afterHooks = [];
    }
    RouterAfter.prototype.listen = function (afterHook) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(afterHook))
            this.afterHooks.push(afterHook);
    };
    RouterAfter.prototype.run = function (to, from) {
        this.afterHooks.forEach(function (h) {
            try {
                var ret = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["hook"])(null, h, [to, from]);
                if (ret && typeof ret.then === "function") {
                    ret.catch(function (err) { return console.error("[router-after] async error:", err); });
                }
            }
            catch (err) {
                console.error("[router-after] sync error:", err);
            }
        });
    };
    return RouterAfter;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=blue-uni-router-hooks.js.map