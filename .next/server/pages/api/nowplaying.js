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
exports.id = "pages/api/nowplaying";
exports.ids = ["pages/api/nowplaying"];
exports.modules = {

/***/ "spotify-web-api-node":
/*!***************************************!*\
  !*** external "spotify-web-api-node" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("spotify-web-api-node");

/***/ }),

/***/ "(api)/./src/pages/api/nowplaying.ts":
/*!*************************************!*\
  !*** ./src/pages/api/nowplaying.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! spotify-web-api-node */ \"spotify-web-api-node\");\n/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0__);\n\nconst api = new (spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0___default())({\n    clientId: process.env.SPOTIFY_ID,\n    clientSecret: process.env.SPOTIFY_SECRET,\n    redirectUri: process.env.SPOTIFY_REDIRECT\n});\nconst handler = async (req, res)=>{\n    try {\n        api.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);\n        const data = await api.refreshAccessToken();\n        api.setAccessToken(data.body[\"access_token\"]);\n        const recentTracks = await api.getMyRecentlyPlayedTracks({\n            limit: 1\n        });\n        res.status(200).json(recentTracks.body.items[0].track);\n    } catch (err) {\n        console.log(\"Something went wrong!\", err);\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vd3BsYXlpbmcudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ2dEO0FBRWhELE1BQU1DLEdBQUcsR0FBRyxJQUFJRCw2REFBYSxDQUFDO0lBQzFCRSxRQUFRLEVBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0lBQy9CQyxZQUFZLEVBQUNILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxjQUFjO0lBQ3ZDQyxXQUFXLEVBQUNMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxnQkFBZ0I7Q0FDM0MsQ0FBQztBQUVGLE1BQU1DLE9BQU8sR0FBRyxPQUFNQyxHQUFtQixFQUFFQyxHQUFvQixHQUFLO0lBRWhFLElBQUk7UUFDQVgsR0FBRyxDQUFDWSxlQUFlLENBQUNWLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVSxxQkFBcUIsQ0FBQztRQUN0RCxNQUFNQyxJQUFJLEdBQUcsTUFBTWQsR0FBRyxDQUFDZSxrQkFBa0IsRUFBRTtRQUMxQ2YsR0FBRyxDQUFDZ0IsY0FBYyxDQUFDRixJQUFJLENBQUNHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU3QyxNQUFNQyxZQUFZLEdBQUcsTUFBTWxCLEdBQUcsQ0FBQ21CLHlCQUF5QixDQUFDO1lBQ3REQyxLQUFLLEVBQUUsQ0FBQztTQUFFLENBQUM7UUFDWFQsR0FBRyxDQUFDVSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ0osWUFBWSxDQUFDRCxJQUFJLENBQUNNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO0tBQzdELENBQ0QsT0FBT0MsR0FBRyxFQUFFO1FBQ1JDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHVCQUF1QixFQUFFRixHQUFHLENBQUM7S0FDNUM7Q0FDSjtBQUVELGlFQUFlaEIsT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL2FkYW1wYW5nLWNvbS8uL3NyYy9wYWdlcy9hcGkvbm93cGxheWluZy50cz9mZjg4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IFNwb3RpZnlXZWJBcGkgZnJvbSAnc3BvdGlmeS13ZWItYXBpLW5vZGUnXG5cbmNvbnN0IGFwaSA9IG5ldyBTcG90aWZ5V2ViQXBpKHtcbiAgICBjbGllbnRJZDpwcm9jZXNzLmVudi5TUE9USUZZX0lELFxuICAgIGNsaWVudFNlY3JldDpwcm9jZXNzLmVudi5TUE9USUZZX1NFQ1JFVCxcbiAgICByZWRpcmVjdFVyaTpwcm9jZXNzLmVudi5TUE9USUZZX1JFRElSRUNUXG59KTtcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSA9PiB7XG5cbiAgICB0cnkge1xuICAgICAgICBhcGkuc2V0UmVmcmVzaFRva2VuKHByb2Nlc3MuZW52LlNQT1RJRllfUkVGUkVTSF9UT0tFTilcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGFwaS5yZWZyZXNoQWNjZXNzVG9rZW4oKVxuICAgICAgICAgYXBpLnNldEFjY2Vzc1Rva2VuKGRhdGEuYm9keVsnYWNjZXNzX3Rva2VuJ10pXG5cbiAgICAgICAgIGNvbnN0IHJlY2VudFRyYWNrcyA9IGF3YWl0IGFwaS5nZXRNeVJlY2VudGx5UGxheWVkVHJhY2tzKHtcbiAgICAgICAgICAgIGxpbWl0OiAxIH0pXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZWNlbnRUcmFja3MuYm9keS5pdGVtc1swXS50cmFjaylcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmchJywgZXJyKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlclxuIl0sIm5hbWVzIjpbIlNwb3RpZnlXZWJBcGkiLCJhcGkiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJTUE9USUZZX0lEIiwiY2xpZW50U2VjcmV0IiwiU1BPVElGWV9TRUNSRVQiLCJyZWRpcmVjdFVyaSIsIlNQT1RJRllfUkVESVJFQ1QiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwic2V0UmVmcmVzaFRva2VuIiwiU1BPVElGWV9SRUZSRVNIX1RPS0VOIiwiZGF0YSIsInJlZnJlc2hBY2Nlc3NUb2tlbiIsInNldEFjY2Vzc1Rva2VuIiwiYm9keSIsInJlY2VudFRyYWNrcyIsImdldE15UmVjZW50bHlQbGF5ZWRUcmFja3MiLCJsaW1pdCIsInN0YXR1cyIsImpzb24iLCJpdGVtcyIsInRyYWNrIiwiZXJyIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/nowplaying.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/nowplaying.ts"));
module.exports = __webpack_exports__;

})();