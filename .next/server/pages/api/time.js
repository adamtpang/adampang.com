"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/time";
exports.ids = ["pages/api/time"];
exports.modules = {

/***/ "(api)/./src/pages/api/time.ts":
/*!*******************************!*\
  !*** ./src/pages/api/time.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst handler = async (req, res1)=>{\n    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0`).then((res)=>res.json()\n    );\n    res1.status(200).json(response);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3RpbWUudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU1BLE9BQU8sR0FBRyxPQUFPQyxHQUFtQixFQUFFQyxJQUFvQixHQUFLO0lBQ25FLE1BQU1DLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQzFCLENBQUMsNkVBQTZFLENBQUMsQ0FDaEYsQ0FBQ0MsSUFBSSxDQUFDLENBQUNILEdBQUcsR0FBS0EsR0FBRyxDQUFDSSxJQUFJLEVBQUU7SUFBQSxDQUFDO0lBRTNCSixJQUFHLENBQUNLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0QsSUFBSSxDQUFDSCxRQUFRLENBQUMsQ0FBQztDQUNoQztBQUVELGlFQUFlSCxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZGFtcGFuZy1jb20vLi9zcmMvcGFnZXMvYXBpL3RpbWUudHM/NTY2YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5zdW5yaXNlLXN1bnNldC5vcmcvanNvbj9sYXQ9MzYuNzIwMTYwMCZsbmc9LTQuNDIwMzQwMCZmb3JtYXR0ZWQ9MGBcbiAgKS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xuXG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3BvbnNlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7XG4iXSwibmFtZXMiOlsiaGFuZGxlciIsInJlcSIsInJlcyIsInJlc3BvbnNlIiwiZmV0Y2giLCJ0aGVuIiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/time.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/time.ts"));
module.exports = __webpack_exports__;

})();