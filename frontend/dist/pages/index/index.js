"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./src/pages/index/index.tsx":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./src/pages/index/index.tsx ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ IndexPage; }
/* harmony export */ });
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api */ "./src/services/api.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);










function IndexPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    roomCode = _useState2[0],
    setRoomCode = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    nickname = _useState4[0],
    setNickname = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(6),
    _useState6 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState5, 2),
    maxSeats = _useState6[0],
    setMaxSeats = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState0 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState9, 2),
    myRoom = _useState0[0],
    setMyRoom = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRecentRoom)()),
    _useState10 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState1, 2),
    recentRoom = _useState10[0],
    setRecentRoom = _useState10[1];
  var userId = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getCurrentUserId)();

  // 页面加载时检查用户是否已有房间
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var checkMyRoom = /*#__PURE__*/function () {
      var _ref = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee() {
        var res, _t;
        return (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return (0,_services_api__WEBPACK_IMPORTED_MODULE_2__.getMyRoom)(userId);
            case 1:
              res = _context.v;
              if (res.code === 200 && res.data) {
                setMyRoom(res.data);
              }
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function checkMyRoom() {
        return _ref.apply(this, arguments);
      };
    }();
    checkMyRoom();
  }, [userId]);

  /** 跳转到房间页（redirectTo 减少页面栈） */
  var goToRoom = function goToRoom(roomId, roomCode, nick) {
    var url = "/pages/room/index?roomId=".concat(roomId, "&roomCode=").concat(roomCode, "&nickname=").concat(encodeURIComponent(nick));
    // 保存最近房间到本地
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.saveRecentRoom)({
      roomId: roomId,
      roomCode: roomCode,
      nickname: nick,
      timestamp: Date.now()
    });
    setRecentRoom((0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRecentRoom)());
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().redirectTo({
      url: url
    });
  };

  /** 创建房间 */
  var handleCreateRoom = /*#__PURE__*/function () {
    var _ref2 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee2() {
      var res, room, _t2;
      return (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (nickname.trim()) {
              _context2.n = 1;
              break;
            }
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('请先设置昵称', 'error');
            return _context2.a(2);
          case 1:
            setLoading(true);
            _context2.p = 2;
            _context2.n = 3;
            return (0,_services_api__WEBPACK_IMPORTED_MODULE_2__.createRoom)(userId, maxSeats);
          case 3:
            res = _context2.v;
            if (res.code === 200 && res.data) {
              room = res.data;
              (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)("\u623F\u95F4\u521B\u5EFA\u6210\u529F\uFF01\u623F\u95F4\u53F7: ".concat(room.roomCode), 'success');
              goToRoom(room.roomId, room.roomCode, nickname.trim());
            } else {
              (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)(res.message || '创建失败', 'error');
            }
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('网络错误，请重试', 'error');
          case 5:
            _context2.p = 5;
            setLoading(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4, 5, 6]]);
    }));
    return function handleCreateRoom() {
      return _ref2.apply(this, arguments);
    };
  }();

  /** 加入房间 */
  var handleJoinRoom = /*#__PURE__*/function () {
    var _ref3 = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee3() {
      var roomRes, room, emptySeat, joinRes, _t3;
      return (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(!roomCode || roomCode.length !== 6)) {
              _context3.n = 1;
              break;
            }
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('请输入6位房间号', 'error');
            return _context3.a(2);
          case 1:
            if (nickname.trim()) {
              _context3.n = 2;
              break;
            }
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('请先设置昵称', 'error');
            return _context3.a(2);
          case 2:
            setLoading(true);
            _context3.p = 3;
            _context3.n = 4;
            return (0,_services_api__WEBPACK_IMPORTED_MODULE_2__.getRoomByCode)(roomCode);
          case 4:
            roomRes = _context3.v;
            if (!(roomRes.code !== 200 || !roomRes.data)) {
              _context3.n = 5;
              break;
            }
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('房间不存在', 'error');
            return _context3.a(2);
          case 5:
            room = roomRes.data;
            emptySeat = room.seats.find(function (s) {
              return !s.userId;
            });
            if (emptySeat) {
              _context3.n = 6;
              break;
            }
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('房间已满', 'error');
            return _context3.a(2);
          case 6:
            _context3.n = 7;
            return (0,_services_api__WEBPACK_IMPORTED_MODULE_2__.joinRoom)(roomCode, userId, emptySeat.seatNumber, nickname.trim());
          case 7:
            joinRes = _context3.v;
            if (joinRes.code === 200 && joinRes.data) {
              (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)("\u52A0\u5165\u6210\u529F\uFF01\u5EA7\u4F4D".concat(emptySeat.seatNumber), 'success');
              goToRoom(room.roomId, roomCode, nickname.trim());
            } else if (joinRes.message && joinRes.message.includes('已在该房间内')) {
              // 用户已在房间内（如小程序崩溃重开），直接跳回房间
              goToRoom(room.roomId, roomCode, nickname.trim());
            } else {
              (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)(joinRes.message || '加入失败', 'error');
            }
            _context3.n = 9;
            break;
          case 8:
            _context3.p = 8;
            _t3 = _context3.v;
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showToast)('网络错误，请重试', 'error');
          case 9:
            _context3.p = 9;
            setLoading(false);
            return _context3.f(9);
          case 10:
            return _context3.a(2);
        }
      }, _callee3, null, [[3, 8, 9, 10]]);
    }));
    return function handleJoinRoom() {
      return _ref3.apply(this, arguments);
    };
  }();

  /** 返回我的房间 */
  var handleBackToRoom = function handleBackToRoom() {
    var _myRoom$seats$find;
    if (!myRoom) return;
    goToRoom(myRoom.roomId, myRoom.roomCode, ((_myRoom$seats$find = myRoom.seats.find(function (s) {
      return s.userId === userId;
    })) === null || _myRoom$seats$find === void 0 ? void 0 : _myRoom$seats$find.nickname) || nickname || '');
  };

  /** 通过最近房间快速加入 */
  var handleQuickJoin = function handleQuickJoin() {
    if (!recentRoom) return;
    setRoomCode(recentRoom.roomCode);
    setNickname(recentRoom.nickname);
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.clearRecentRoom)();
    setRecentRoom(null);
  };
  var seatRange = Array.from({
    length: 9
  }, function (_, i) {
    return i + 2;
  }); // 2-10

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: "index-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "title",
        children: "\uD83C\uDCCF \u6700\u7231\u7684\u5341\u4E09\u9497"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "subtitle",
        children: "\u5C0F\u534E\u534E\u7684\u9152\u684C\u5C0F\u6E38\u620F"
      })]
    }), myRoom && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "section my-room-section",
      onClick: handleBackToRoom,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "section-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-icon",
          children: "\uD83C\uDFE0"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-title",
          children: "\u8FD4\u56DE\u6211\u7684\u623F\u95F4"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "return-arrow",
          children: "\u2192"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "section-desc",
        children: ["\u623F\u95F4\u53F7 ", myRoom.roomCode, " \xB7 ", myRoom.seats.filter(function (s) {
          return s.userId;
        }).length, "/", myRoom.maxSeats, "\u4EBA", myRoom.hostUserId === userId ? ' · 👑 房主' : '']
      })]
    }), !myRoom && recentRoom && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "section recent-room-section",
      onClick: handleQuickJoin,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "section-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-icon",
          children: "\uD83D\uDD50"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-title",
          children: "\u4E0A\u6B21\u8FDB\u5165\u7684\u623F\u95F4"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "section-desc",
        children: ["\u623F\u95F4\u53F7 ", recentRoom.roomCode, " \xB7 \u6635\u79F0 ", recentRoom.nickname]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "recent-hint",
        children: "\u70B9\u51FB\u81EA\u52A8\u586B\u5165"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "section-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-icon",
          children: "\u270F\uFE0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-title",
          children: "\u8BBE\u7F6E\u6635\u79F0"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
        className: "nickname-input",
        type: "text",
        maxlength: 12,
        placeholder: "\u8F93\u5165\u4F60\u7684\u6635\u79F0\uFF08\u5FC5\u586B\uFF09",
        placeholderClass: "input-placeholder",
        value: nickname,
        onInput: function onInput(e) {
          return setNickname(e.detail.value);
        }
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "section-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-icon",
          children: "\uD83C\uDFD7\uFE0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-title",
          children: "\u521B\u5EFA\u65B0\u623F\u95F4"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "section-desc",
        children: "\u521B\u5EFA\u623F\u95F4\uFF0C\u81EA\u52A8\u6210\u4E3A\u623F\u4E3B"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "picker-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "picker-label",
          children: "\u623F\u95F4\u4EBA\u6570\u4E0A\u9650\uFF1A"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Picker, {
          mode: "selector",
          range: seatRange,
          value: seatRange.indexOf(maxSeats),
          onChange: function onChange(e) {
            return setMaxSeats(seatRange[Number(e.detail.value)]);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: "picker-value",
            children: [maxSeats, " \u4EBA"]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Button, {
        className: "btn-create",
        onClick: handleCreateRoom,
        loading: loading,
        disabled: loading,
        children: "\u521B\u5EFA\u623F\u95F4"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "divider",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "divider-line"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "divider-text",
        children: "\u6216"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "divider-line"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "section-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-icon",
          children: "\uD83D\uDEAA"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "section-title",
          children: "\u52A0\u5165\u5DF2\u6709\u623F\u95F4"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "section-desc",
        children: "\u8F93\u51656\u4F4D\u623F\u95F4\u53F7\uFF0C\u52A0\u5165\u597D\u53CB\u521B\u5EFA\u7684\u623F\u95F4"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
        className: "room-code-input",
        type: "number",
        maxlength: 6,
        placeholder: "\u8BF7\u8F93\u51656\u4F4D\u623F\u95F4\u53F7",
        placeholderClass: "input-placeholder",
        value: roomCode,
        onInput: function onInput(e) {
          return setRoomCode(e.detail.value);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Button, {
        className: "btn-join",
        onClick: handleJoinRoom,
        loading: loading,
        disabled: loading || roomCode.length !== 6,
        children: "\u52A0\u5165\u623F\u95F4"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "user-info",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "user-label",
        children: "\u5F53\u524D\u7528\u6237ID:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "user-value",
        children: userId.slice(-8)
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/index/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/index/index.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./src/pages/index/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/index/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/index/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map