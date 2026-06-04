"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/room/index"], {

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/room/index!./src/pages/room/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/room/index!./src/pages/room/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ RoomPage; }
  /* harmony export */
});
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_SeatArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/SeatArea */ "./src/components/SeatArea/index.tsx");
/* harmony import */ var _components_HandCards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/HandCards */ "./src/components/HandCards/index.tsx");
/* harmony import */ var _components_ActionButtons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/ActionButtons */ "./src/components/ActionButtons/index.tsx");
/* harmony import */ var _components_CardRevealPopup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/CardRevealPopup */ "./src/components/CardRevealPopup/index.tsx");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/api */ "./src/services/api.ts");
/* harmony import */ var _services_websocket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/websocket */ "./src/services/websocket.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../types */ "./src/types/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
















      function RoomPage() {
        var _roomData$seats$find$, _roomData$seats, _roomData$seats$find$2, _roomData$seats2;
        var router = (0, _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
        var _router$params = router.params,
          roomIdStr = _router$params.roomId,
          roomCodeStr = _router$params.roomCode,
          nicknameParam = _router$params.nickname;
        var roomId = Number(roomIdStr);
        var roomCode = roomCodeStr || '';
        var myNickname = decodeURIComponent(nicknameParam || '');
        var currentUserId = (0, _utils__WEBPACK_IMPORTED_MODULE_9__.getCurrentUserId)();
        var _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
          _useState2 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(_useState, 2),
          roomData = _useState2[0],
          setRoomData = _useState2[1];
        var _useState3 = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
          _useState4 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(_useState3, 2),
          loading = _useState4[0],
          setLoading = _useState4[1];
        var _useState5 = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
          _useState6 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(_useState5, 2),
          dealing = _useState6[0],
          setDealing = _useState6[1];
        var _useState7 = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
          _useState8 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(_useState7, 2),
          popupDeal = _useState8[0],
          setPopupDeal = _useState8[1];

        // 标记用户是否已主动退出，防止 ROOM_DISMISSED 回调重复 navigateBack
        var exitingRef = (0, react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
        var isHost = (roomData === null || roomData === void 0 ? void 0 : roomData.hostUserId) === currentUserId;
        var currentSeat = (_roomData$seats$find$ = roomData === null || roomData === void 0 || (_roomData$seats = roomData.seats) === null || _roomData$seats === void 0 || (_roomData$seats = _roomData$seats.find(function (s) {
          return s.userId === currentUserId;
        })) === null || _roomData$seats === void 0 ? void 0 : _roomData$seats.seatNumber) !== null && _roomData$seats$find$ !== void 0 ? _roomData$seats$find$ : 0;
        var myCards = (_roomData$seats$find$2 = roomData === null || roomData === void 0 || (_roomData$seats2 = roomData.seats) === null || _roomData$seats2 === void 0 || (_roomData$seats2 = _roomData$seats2.find(function (s) {
          return s.userId === currentUserId;
        })) === null || _roomData$seats2 === void 0 ? void 0 : _roomData$seats2.cards) !== null && _roomData$seats$find$2 !== void 0 ? _roomData$seats$find$2 : [];

        // ==================== 初始化 ====================
        (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
          if (!roomId) return;
          var loadRoom = /*#__PURE__*/function () {
            var _ref = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee() {
              var res, _t;
              return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context) {
                while (1) switch (_context.p = _context.n) {
                  case 0:
                    _context.p = 0;
                    _context.n = 1;
                    return (0, _services_api__WEBPACK_IMPORTED_MODULE_6__.getRoomDetail)(roomId);
                  case 1:
                    res = _context.v;
                    if (res.code === 200 && res.data) {
                      setRoomData(res.data);
                    }
                    _context.n = 3;
                    break;
                  case 2:
                    _context.p = 2;
                    _t = _context.v;
                  case 3:
                    _context.p = 3;
                    setLoading(false);
                    return _context.f(3);
                  case 4:
                    return _context.a(2);
                }
              }, _callee, null, [[0, 2, 3, 4]]);
            }));
            return function loadRoom() {
              return _ref.apply(this, arguments);
            };
          }();
          loadRoom();
          _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.connect(roomId, currentUserId);
          var handleWsMessage = function handleWsMessage(data) {
            // ROOM_DISMISSED 等消息的 data 不完整（seats 为 null），跳过以免渲染崩溃
            if (!data.seats) return;
            console.log('[Room] WS更新');
            setRoomData(data);
            setDealing(false);

            // 如果有发牌弹窗信息，展示弹窗
            if (data.lastDeal) {
              setPopupDeal(data.lastDeal);
              setTimeout(function () {
                return setPopupDeal(null);
              }, 5000);
            }
          };
          _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.on('*', handleWsMessage);

          // 监听房间解散
          var handleDismissed = function handleDismissed(data) {
            // 如果用户已主动退出，跳过（避免重复跳转）
            if (exitingRef.current) return;
            (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('房间已解散', 'none');
            setTimeout(function () {
              return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().redirectTo({
                url: '/pages/index/index'
              });
            }, 1500);
          };
          _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.on(_types__WEBPACK_IMPORTED_MODULE_8__.WS_TYPE.ROOM_DISMISSED, handleDismissed);
          return function () {
            _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.off('*', handleWsMessage);
            _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.off(_types__WEBPACK_IMPORTED_MODULE_8__.WS_TYPE.ROOM_DISMISSED, handleDismissed);
            _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.disconnect();
          };
        }, [roomId]);

        // ==================== 操作处理 ====================

        var handleDealCard = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee2() {
          var res, _t2;
          return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!(!roomId || !isHost)) {
                  _context2.n = 1;
                  break;
                }
                (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('仅房主可以发牌', 'error');
                return _context2.a(2);
              case 1:
                setDealing(true);
                _context2.p = 2;
                _context2.n = 3;
                return (0, _services_api__WEBPACK_IMPORTED_MODULE_6__.dealOneCard)(roomId, currentUserId);
              case 3:
                res = _context2.v;
                if (res.code === 200 && res.data) {
                  setRoomData(res.data);
                  // 展示弹窗
                  if (res.data.lastDeal) {
                    setPopupDeal(res.data.lastDeal);
                    setTimeout(function () {
                      return setPopupDeal(null);
                    }, 5000);
                  }
                  setDealing(false);
                } else {
                  (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)(res.message || '发牌失败', 'error');
                  setDealing(false);
                }
                _context2.n = 5;
                break;
              case 4:
                _context2.p = 4;
                _t2 = _context2.v;
                (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('发牌请求失败', 'error');
                setDealing(false);
              case 5:
                return _context2.a(2);
            }
          }, _callee2, null, [[2, 4]]);
        })), [roomId, isHost, currentUserId]);
        var handleReset = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee4() {
          return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (!(!roomId || !isHost)) {
                  _context4.n = 1;
                  break;
                }
                (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('仅房主可以重置', 'error');
                return _context4.a(2);
              case 1:
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
                  title: '确认重置',
                  content: '将清空所有手牌并重新洗牌，确定继续？',
                  success: function () {
                    var _success = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee3(modalRes) {
                      var res, _t3;
                      return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context3) {
                        while (1) switch (_context3.p = _context3.n) {
                          case 0:
                            if (!modalRes.confirm) {
                              _context3.n = 4;
                              break;
                            }
                            _context3.p = 1;
                            _context3.n = 2;
                            return (0, _services_api__WEBPACK_IMPORTED_MODULE_6__.resetGame)(roomId, currentUserId);
                          case 2:
                            res = _context3.v;
                            if (res.code === 200 && res.data) {
                              setRoomData(res.data);
                              (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('已重置', 'success');
                            } else (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)(res.message || '重置失败', 'error');
                            _context3.n = 4;
                            break;
                          case 3:
                            _context3.p = 3;
                            _t3 = _context3.v;
                            (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('重置请求失败', 'error');
                          case 4:
                            return _context3.a(2);
                        }
                      }, _callee3, null, [[1, 3]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 2:
                return _context4.a(2);
            }
          }, _callee4);
        })), [roomId, isHost, currentUserId]);
        var handleTransferHost = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
          var _ref4 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee6(toUserId) {
            return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  if (!(!roomId || !isHost)) {
                    _context6.n = 1;
                    break;
                  }
                  (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('仅房主可以转让', 'error');
                  return _context6.a(2);
                case 1:
                  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
                    title: '确认转让房主',
                    content: '确定将房主转让给该玩家吗？',
                    success: function () {
                      var _success2 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee5(modalRes) {
                        var res, _t4;
                        return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context5) {
                          while (1) switch (_context5.p = _context5.n) {
                            case 0:
                              if (!modalRes.confirm) {
                                _context5.n = 4;
                                break;
                              }
                              _context5.p = 1;
                              _context5.n = 2;
                              return (0, _services_api__WEBPACK_IMPORTED_MODULE_6__.transferHost)(roomId, currentUserId, toUserId);
                            case 2:
                              res = _context5.v;
                              if (res.code === 200 && res.data) {
                                setRoomData(res.data);
                                (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('房主已转让', 'success');
                              } else (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)(res.message || '转让失败', 'error');
                              _context5.n = 4;
                              break;
                            case 3:
                              _context5.p = 3;
                              _t4 = _context5.v;
                              (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('转让请求失败', 'error');
                            case 4:
                              return _context5.a(2);
                          }
                        }, _callee5, null, [[1, 3]]);
                      }));
                      function success(_x3) {
                        return _success2.apply(this, arguments);
                      }
                      return success;
                    }()
                  });
                case 2:
                  return _context6.a(2);
              }
            }, _callee6);
          }));
          return function (_x2) {
            return _ref4.apply(this, arguments);
          };
        }(), [roomId, isHost, currentUserId]);
        var handleChangeSeat = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
          var _ref5 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee7(targetSeat) {
            var res, _t5;
            return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context7) {
              while (1) switch (_context7.p = _context7.n) {
                case 0:
                  if (roomId) {
                    _context7.n = 1;
                    break;
                  }
                  return _context7.a(2);
                case 1:
                  _context7.p = 1;
                  _context7.n = 2;
                  return (0, _services_api__WEBPACK_IMPORTED_MODULE_6__.changeSeat)(roomId, currentUserId, targetSeat);
                case 2:
                  res = _context7.v;
                  if (res.code === 200 && res.data) {
                    setRoomData(res.data);
                    (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)("\u5DF2\u6362\u5230\u5EA7\u4F4D".concat(targetSeat), 'success');
                  } else (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)(res.message || '换座失败', 'error');
                  _context7.n = 4;
                  break;
                case 3:
                  _context7.p = 3;
                  _t5 = _context7.v;
                  (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('换座请求失败', 'error');
                case 4:
                  return _context7.a(2);
              }
            }, _callee7, null, [[1, 3]]);
          }));
          return function (_x4) {
            return _ref5.apply(this, arguments);
          };
        }(), [roomId, currentUserId]);
        var handleExitRoom = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee9() {
          return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                if (roomId) {
                  _context9.n = 1;
                  break;
                }
                return _context9.a(2);
              case 1:
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
                  title: '确认退出',
                  content: '确定退出房间吗？退出后将清理你的相关数据。',
                  success: function () {
                    var _success3 = (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee8(modalRes) {
                      var res, _t6;
                      return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context8) {
                        while (1) switch (_context8.p = _context8.n) {
                          case 0:
                            if (!modalRes.confirm) {
                              _context8.n = 4;
                              break;
                            }
                            // 先标记正在退出，防止 handleDismissed 重复 navigateBack
                            exitingRef.current = true;
                            _context8.p = 1;
                            _context8.n = 2;
                            return (0, _services_api__WEBPACK_IMPORTED_MODULE_6__.exitRoom)(roomId, currentUserId);
                          case 2:
                            res = _context8.v;
                            if (res.code === 200) {
                              // 先主动断开 WebSocket（设置 intentionalClose 标记，防止后续重连）
                              _services_websocket__WEBPACK_IMPORTED_MODULE_7__.wsManager.disconnect();
                              (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('已退出房间', 'success');
                              setTimeout(function () {
                                return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().redirectTo({
                                  url: '/pages/index/index'
                                });
                              }, 1000);
                            } else {
                              // API 失败，重置退出标记
                              exitingRef.current = false;
                              (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)(res.message || '退出失败', 'error');
                            }
                            _context8.n = 4;
                            break;
                          case 3:
                            _context8.p = 3;
                            _t6 = _context8.v;
                            exitingRef.current = false;
                            (0, _utils__WEBPACK_IMPORTED_MODULE_9__.showToast)('退出请求失败', 'error');
                          case 4:
                            return _context8.a(2);
                        }
                      }, _callee8, null, [[1, 3]]);
                    }));
                    function success(_x5) {
                      return _success3.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 2:
                return _context9.a(2);
            }
          }, _callee9);
        })), [roomId, currentUserId]);

        // ==================== 渲染 ====================
        if (loading) {
          return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "room-page",
            children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: "loading",
              children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "loading-text",
                children: "\u52A0\u8F7D\u4E2D\u2026"
              })
            })
          });
        }
        if (!roomData) {
          return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "room-page",
            children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: "error-box",
              children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "error-text",
                children: "\u623F\u95F4\u6570\u636E\u52A0\u8F7D\u5931\u8D25"
              })
            })
          });
        }
        return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
          className: "room-page",
          children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "room-header",
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: "room-info",
              children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "room-code-label",
                children: "\u623F\u95F4\u53F7"
              }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "room-code",
                selectable: true,
                children: roomData.roomCode
              })]
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: "room-stats",
              children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "stat-item",
                children: ["\uD83D\uDC65 ", roomData.seats.filter(function (s) {
                  return s.userId;
                }).length, "/", roomData.maxSeats]
              }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "stat-item",
                children: roomData.status === 1 ? '发牌中' : '等待中'
              })]
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: "host-info",
              children: isHost ? /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "host-badge-text",
                children: "\uD83D\uDC51 \u623F\u4E3B"
              }) : /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "normal-text",
                children: ["\uD83D\uDCCD \u5EA7\u4F4D", currentSeat]
              })
            })]
          }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_SeatArea__WEBPACK_IMPORTED_MODULE_2__["default"], {
            seats: roomData.seats,
            currentUserId: currentUserId,
            hostUserId: roomData.hostUserId,
            disabled: true
          }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_HandCards__WEBPACK_IMPORTED_MODULE_3__["default"], {
            cards: myCards,
            title: "".concat(myNickname, "\u7684\u624B\u724C")
          }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_ActionButtons__WEBPACK_IMPORTED_MODULE_4__["default"], {
            isHost: isHost,
            seats: roomData.seats,
            currentUserId: currentUserId,
            currentSeat: currentSeat,
            onDealCard: handleDealCard,
            onReset: handleReset,
            onTransferHost: handleTransferHost,
            onChangeSeat: handleChangeSeat,
            onExitRoom: handleExitRoom,
            dealing: dealing
          }), popupDeal && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_CardRevealPopup__WEBPACK_IMPORTED_MODULE_5__["default"], {
            dealInfo: popupDeal,
            onClose: function onClose() {
              return setPopupDeal(null);
            }
          }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: "room-footer",
            children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              className: "footer-text",
              children: ["\u5F53\u524D\u53D1\u724C\u6307\u9488 \u2192 \u5EA7\u4F4D", roomData.currentSeatIndex]
            })
          })]
        });
      }

      /***/
}),

/***/ "./src/components/ActionButtons/index.tsx":
/*!************************************************!*\
  !*** ./src/components/ActionButtons/index.tsx ***!
  \************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ ActionButtons; }
        /* harmony export */
});
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);



      function ActionButtons(_ref) {
        var isHost = _ref.isHost,
          seats = _ref.seats,
          currentUserId = _ref.currentUserId,
          currentSeat = _ref.currentSeat,
          onDealCard = _ref.onDealCard,
          onReset = _ref.onReset,
          onTransferHost = _ref.onTransferHost,
          onChangeSeat = _ref.onChangeSeat,
          onExitRoom = _ref.onExitRoom,
          dealing = _ref.dealing;
        var transferTargets = seats.filter(function (s) {
          return s.userId && s.userId !== currentUserId;
        });
        var emptySeats = seats.filter(function (s) {
          return !s.userId && s.seatNumber !== currentSeat;
        });
        return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "action-buttons",
          children: [isHost && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "host-actions",
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "action-label",
              children: "\uD83D\uDC51 \u623F\u4E3B\u64CD\u4F5C"
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "btn btn-primary",
              onClick: onDealCard,
              disabled: dealing,
              children: "\uD83C\uDCCF \u53D1\u4E00\u5F20\u724C"
            }), transferTargets.length > 0 && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "transfer-group",
              children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                className: "group-label",
                children: "\u8F6C\u8BA9\u623F\u4E3B\u7ED9\uFF1A"
              }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                className: "transfer-list",
                children: transferTargets.map(function (target) {
                  return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                    className: "btn btn-transfer btn-sm",
                    onClick: function onClick() {
                      return onTransferHost(target.userId);
                    },
                    children: target.nickname || "\u5EA7\u4F4D".concat(target.seatNumber)
                  }, target.seatNumber);
                })
              })]
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "btn btn-danger",
              onClick: onReset,
              children: "\uD83D\uDD04 \u91CD\u65B0\u53D1\u724C\uFF08\u91CD\u7F6E\uFF09"
            })]
          }), emptySeats.length > 0 && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "player-actions",
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "action-label",
              children: "\uD83D\uDEB6 \u6362\u5EA7"
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "seat-change-list",
              children: emptySeats.map(function (s) {
                return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                  className: "btn btn-outline btn-sm",
                  onClick: function onClick() {
                    return onChangeSeat(s.seatNumber);
                  },
                  children: ["\u6362\u5230\u5EA7\u4F4D", s.seatNumber]
                }, s.seatNumber);
              })
            })]
          }), !isHost && emptySeats.length === 0 && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "no-actions",
            children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              className: "no-actions-text",
              children: "\u7B49\u5F85\u623F\u4E3B\u53D1\u724C\u2026"
            })
          }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "exit-section",
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "exit-divider"
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "btn btn-exit",
              onClick: onExitRoom,
              children: "\uD83D\uDEAA \u9000\u51FA\u623F\u95F4"
            })]
          })]
        });
      }

      /***/
}),

/***/ "./src/components/CardRevealPopup/index.tsx":
/*!**************************************************!*\
  !*** ./src/components/CardRevealPopup/index.tsx ***!
  \**************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ CardRevealPopup; }
        /* harmony export */
});
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




      /**
       * 发牌弹窗组件
       * 显示：哪位玩家获得了哪张牌
       * 3 秒后自动消失，也可点击关闭
       */
      function CardRevealPopup(_ref) {
        var dealInfo = _ref.dealInfo,
          onClose = _ref.onClose;
        return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
          className: "card-popup-overlay",
          onClick: onClose,
          children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
            className: "card-popup",
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "popup-title",
              children: "\uD83C\uDFB4 \u53D1\u724C\u7ED3\u679C"
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
              className: "popup-card-display",
              children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                className: "popup-card-value",
                style: {
                  color: (0, _utils__WEBPACK_IMPORTED_MODULE_0__.getCardColor)(dealInfo.card)
                },
                children: dealInfo.card
              })
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "popup-card-meaning",
              children: (0, _utils__WEBPACK_IMPORTED_MODULE_0__.getCardMeaning)(dealInfo.card)
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "popup-receiver",
              children: dealInfo.toNickname
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "popup-seat",
              children: ["\u5EA7\u4F4D ", dealInfo.seatNumber]
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
              className: "popup-close-btn",
              onClick: onClose,
              children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                className: "popup-close-text",
                children: "\u77E5\u9053\u4E86"
              })
            })]
          })
        });
      }

      /***/
}),

/***/ "./src/components/HandCards/index.tsx":
/*!********************************************!*\
  !*** ./src/components/HandCards/index.tsx ***!
  \********************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ HandCards; }
        /* harmony export */
});
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




      /**
       * 玩家手牌区组件
       * 展示当前登录玩家的所有手牌
       */
      function HandCards(_ref) {
        var cards = _ref.cards,
          _ref$title = _ref.title,
          title = _ref$title === void 0 ? '我的手牌' : _ref$title;
        if (!cards || cards.length === 0) {
          return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
            className: "hand-cards-empty",
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "empty-title",
              children: title
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "empty-hint",
              children: "\u6682\u65E0\u624B\u724C\uFF0C\u7B49\u5F85\u623F\u4E3B\u53D1\u724C\u2026"
            })]
          });
        }
        return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
          className: "hand-cards",
          children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
            className: "hand-cards-header",
            children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "hand-title",
              children: title
            }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "hand-count",
              children: [cards.length, "\u5F20"]
            })]
          }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.ScrollView, {
            className: "cards-scroll",
            scrollX: true,
            children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
              className: "cards-list",
              children: cards.map(function (card, index) {
                return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
                  className: "card-item",
                  style: {
                    borderColor: (0, _utils__WEBPACK_IMPORTED_MODULE_0__.getCardColor)(card),
                    transform: "rotate(".concat((index - cards.length / 2) * 2, "deg)")
                  },
                  children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    className: "card-value",
                    style: {
                      color: (0, _utils__WEBPACK_IMPORTED_MODULE_0__.getCardColor)(card)
                    },
                    children: card
                  })
                }, index);
              })
            })
          })]
        });
      }

      /***/
}),

/***/ "./src/components/SeatArea/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/SeatArea/index.tsx ***!
  \*******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ SeatArea; }
        /* harmony export */
});
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




      /**
       * 座位布局区组件
       * 6个座位围成一圈，展示每个座位的玩家和手牌
       */
      function SeatArea(_ref) {
        var seats = _ref.seats,
          currentUserId = _ref.currentUserId,
          hostUserId = _ref.hostUserId,
          onSeatClick = _ref.onSeatClick,
          disabled = _ref.disabled;
        // 座位布局位置：一圈6个位置
        //   [1]
        // [6] [2]
        // [5] [3]
        //   [4]
        var positionClass = ['', 'top', 'top-right', 'bottom-right', 'bottom', 'bottom-left', 'top-left'];
        var handleSeatClick = function handleSeatClick(seat) {
          if (disabled) return;
          if (seat.userId) return; // 已有人，不可点击（除非是换座模式）
          onSeatClick === null || onSeatClick === void 0 || onSeatClick(seat.seatNumber);
        };
        return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
          className: "seat-area",
          children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
            className: "table-center",
            children: /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
              className: "table-text",
              children: "\uD83C\uDCCF \u724C\u684C"
            })
          }), seats.map(function (seat) {
            var isMe = seat.userId === currentUserId;
            var isHost = seat.userId === hostUserId;
            var isEmpty = !seat.userId;
            var posClass = positionClass[seat.seatNumber] || '';
            return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
              className: "seat seat-".concat(posClass, " ").concat(isEmpty ? 'seat-empty' : 'seat-occupied', " ").concat(isMe ? 'seat-me' : '', " ").concat(disabled ? '' : 'seat-clickable'),
              onClick: function onClick() {
                return handleSeatClick(seat);
              },
              children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
                className: "seat-number",
                children: ["\u5EA7\u4F4D", seat.seatNumber]
              }), isEmpty ?
                /*#__PURE__*/
                /* 空座位 */
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
                  className: "seat-empty-hint",
                  children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    className: "empty-icon",
                    children: "\uFF0B"
                  }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    className: "empty-text",
                    children: "\u7A7A\u4F4D"
                  })]
                }) :
                /*#__PURE__*/
                /* 已落座玩家 */
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
                  className: "seat-player",
                  children: [/*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
                    className: "player-avatar",
                    children: [isHost && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                      className: "host-badge",
                      children: "\uD83D\uDC51"
                    }), isMe && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                      className: "me-badge",
                      children: "\u2B50"
                    })]
                  }), /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                    className: "player-name",
                    style: {
                      fontSize: '20rpx'
                    },
                    children: isMe ? "\u6211(".concat(seat.nickname, ")") : seat.nickname || "\u5EA7\u4F4D".concat(seat.seatNumber)
                  }), seat.cards && seat.cards.length > 0 && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
                    className: "seat-card-preview",
                    children: [seat.cards.slice(-5).map(function (card, idx) {
                      return /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                        className: "mini-card",
                        style: {
                          color: (0, _utils__WEBPACK_IMPORTED_MODULE_0__.getCardColor)(card),
                          fontSize: '18rpx'
                        },
                        children: card
                      }, idx);
                    }), seat.cards.length > 5 && /*#__PURE__*/(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
                      className: "more-cards",
                      style: {
                        fontSize: '16rpx'
                      },
                      children: ["+", seat.cards.length - 5]
                    })]
                  })]
                })]
            }, seat.seatNumber);
          })]
        });
      }

      /***/
}),

/***/ "./src/pages/room/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/room/index.tsx ***!
  \**********************************/
/***/ (function (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_room_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/room/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/room/index!./src/pages/room/index.tsx");


      var config = {};



      var taroOption = (0, _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_room_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/room/index', { root: { cn: [] } }, config || {})
      if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_room_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_room_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
        taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_room_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
      }
      var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_room_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


      /***/
}),

/***/ "./src/services/websocket.ts":
/*!***********************************!*\
  !*** ./src/services/websocket.ts ***!
  \***********************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wsManager: function () { return /* binding */ wsManager; }
        /* harmony export */
});
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);




      // WebSocket 服务器地址
      var WS_BASE_URL = 'ws://192.168.20.16:8080';

      /** 连接超时时间（毫秒） */
      var CONNECT_TIMEOUT = 10000;

      /**
       * WebSocket 连接管理器
       *
       * Taro 4 微信小程序 WebSocket 必须使用全局事件监听：
       * Taro.onSocketOpen / onSocketMessage / onSocketClose / onSocketError
       * 而不是 SocketTask 实例方法
       */
      var WebSocketManager = /*#__PURE__*/function () {
        function WebSocketManager() {
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, WebSocketManager);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "roomId", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "userId", '');
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "listeners", new Map());
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "reconnectTimer", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "heartbeatTimer", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "connectTimer", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "connecting", false);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "connected", false);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "socketOpened", false);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "intentionalClose", false);
          // 事件处理函数引用（用于移除监听）
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onOpenHandler", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onMessageHandler", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onCloseHandler", null);
          (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "onErrorHandler", null);
        }
        return (0, D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_3__["default"])(WebSocketManager, [{
          key: "connect",
          value:
            /**
             * 连接到房间 WebSocket
             * Taro 4: 先注册全局事件监听，再调用 connectSocket
             */
            function connect(roomId, userId) {
              var _this = this;
              // 如果已经连接到同一个房间，直接复用
              if (this.connected && this.socketOpened && this.roomId === roomId && this.userId === userId) {
                console.log('[WebSocket] 复用已有连接, roomId=%d', roomId);
                return;
              }

              // 防止并发建连
              if (this.connecting) {
                console.log('[WebSocket] 正在连接中，本次调用被忽略');
                return;
              }

              // 清理旧连接（同步：设置标志 + 移除监听器；异步：closeSocket）
              this.disconnect();
              this.roomId = roomId;
              this.userId = userId;
              this.connecting = true;
              this.intentionalClose = false;
              this.socketOpened = false;
              var url = "".concat(WS_BASE_URL, "/ws/poker?roomId=").concat(roomId, "&userId=").concat(userId);
              console.log('[WebSocket] 连接中...', url);

              // 1. 注册全局事件监听
              this.onOpenHandler = function (res) {
                console.log('[WebSocket] 连接已打开', res);
                _this.clearConnectTimeout();
                _this.connecting = false;
                _this.connected = true;
                _this.socketOpened = true;
                _this.startHeartbeat();
              };
              this.onMessageHandler = function (res) {
                try {
                  var message = JSON.parse(res.data);
                  console.log('[WebSocket] 收到消息:', message.type);
                  _this.handleMessage(message);
                } catch (e) {
                  console.error('[WebSocket] 消息解析失败', e);
                }
              };
              this.onCloseHandler = function (res) {
                console.log('[WebSocket] 连接关闭', res.code, res.reason);
                _this.connected = false;
                _this.socketOpened = false;
                _this.stopHeartbeat();
                // 仅当非主动关闭 AND 仍在同一房间时重连
                if (!_this.intentionalClose && _this.roomId) {
                  _this.scheduleReconnect();
                }
              };
              this.onErrorHandler = function (err) {
                console.error('[WebSocket] 连接错误', err);
                _this.connected = false;
                _this.socketOpened = false;
                _this.stopHeartbeat();
                // 仅当非主动关闭时重连
                if (!_this.intentionalClose && _this.roomId) {
                  _this.scheduleReconnect();
                }
              };

              // 注册全局 WebSocket 事件
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().onSocketOpen(this.onOpenHandler);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().onSocketMessage(this.onMessageHandler);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().onSocketClose(this.onCloseHandler);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().onSocketError(this.onErrorHandler);

              // 2. 发起连接
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().connectSocket({
                url: url,
                success: function success() {
                  console.log('[WebSocket] connectSocket 调用成功');
                },
                fail: function fail(err) {
                  console.error('[WebSocket] connectSocket 调用失败', err);
                  _this.clearConnectTimeout();
                  _this.connecting = false;
                  _this.scheduleReconnect();
                }
              });

              // 3. 连接超时兜底：防止 onOpen 丢失导致 connecting 永久为 true
              this.connectTimer = setTimeout(function () {
                if (_this.connecting) {
                  console.warn('[WebSocket] 连接超时(%dms)，强制重置状态', CONNECT_TIMEOUT);
                  _this.connecting = false;
                }
              }, CONNECT_TIMEOUT);
            }

          /**
           * 断开连接（同步清理状态 + 异步关闭 Socket）
           * 主动关闭时会设置 intentionalClose 标记，防止 onClose 触发自动重连
           */
        }, {
          key: "disconnect",
          value: function disconnect() {
            // 1. 先标记为主动关闭——即使 onCloseHandler 已在事件队列中也会跳过重连
            this.intentionalClose = true;

            // 2. 清理定时器
            this.stopHeartbeat();
            this.clearReconnect();
            this.clearConnectTimeout();

            // 3. 保存关闭前的连接状态，然后更新
            var wasOpened = this.socketOpened;
            this.connected = false;
            this.socketOpened = false;

            // 4. 移除全局事件监听（部分 Taro 版本未提供 offSocket* 方法，做兼容处理）
            try {
              if (this.onOpenHandler) {
                if (typeof (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketOpen) === 'function') _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketOpen(this.onOpenHandler);
              }
            } catch (e) {/* ignore */ }
            try {
              if (this.onMessageHandler) {
                if (typeof (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketMessage) === 'function') _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketMessage(this.onMessageHandler);
              }
            } catch (e) {/* ignore */ }
            try {
              if (this.onCloseHandler) {
                if (typeof (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketClose) === 'function') _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketClose(this.onCloseHandler);
              }
            } catch (e) {/* ignore */ }
            try {
              if (this.onErrorHandler) {
                if (typeof (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketError) === 'function') _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().offSocketError(this.onErrorHandler);
              }
            } catch (e) {/* ignore */ }
            // 无论卸载是否成功，都清空引用，防止被复用
            this.onOpenHandler = null;
            this.onMessageHandler = null;
            this.onCloseHandler = null;
            this.onErrorHandler = null;

            // 5. 仅当 Socket 确实打开过才关闭（避免"not connected"报错）
            if (wasOpened) {
              try {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().closeSocket({});
              } catch (e) {/* ignore */ }
            }

            // 6. 最后清空房间信息、释放连接锁
            this.roomId = null;
            this.connecting = false;
          }

          /**
           * 注册消息监听
           * @param type 消息类型，传 '*' 监听所有
           * @param callback 回调函数
           */
        }, {
          key: "on",
          value: function on(type, callback) {
            if (!this.listeners.has(type)) {
              this.listeners.set(type, new Set());
            }
            this.listeners.get(type).add(callback);
          }

          /**
           * 取消监听
           */
        }, {
          key: "off",
          value: function off(type, callback) {
            var cbs = this.listeners.get(type);
            if (cbs) {
              cbs.delete(callback);
            }
          }

          /**
           * 处理收到的 WebSocket 消息
           */
        }, {
          key: "handleMessage",
          value: function handleMessage(message) {
            var roomData = message.data;

            // 触发特定类型监听
            var typeCallbacks = this.listeners.get(message.type);
            if (typeCallbacks) {
              typeCallbacks.forEach(function (cb) {
                return cb(roomData);
              });
            }

            // 触发通配符监听（* 匹配所有类型）
            var allCallbacks = this.listeners.get('*');
            if (allCallbacks) {
              allCallbacks.forEach(function (cb) {
                return cb(roomData);
              });
            }
          }

          /**
           * 心跳保活：每 30 秒发送 PING
           */
        }, {
          key: "startHeartbeat",
          value: function startHeartbeat() {
            var _this2 = this;
            this.heartbeatTimer = setInterval(function () {
              if (_this2.connected) {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().sendSocketMessage({
                  data: JSON.stringify({
                    type: 'PING'
                  }),
                  fail: function fail() {
                    console.warn('[WebSocket] 心跳发送失败');
                  }
                });
              }
            }, 30000);
          }
        }, {
          key: "stopHeartbeat",
          value: function stopHeartbeat() {
            if (this.heartbeatTimer) {
              clearInterval(this.heartbeatTimer);
              this.heartbeatTimer = null;
            }
          }

          /**
           * 断线重连：5 秒后自动重连
           */
        }, {
          key: "scheduleReconnect",
          value: function scheduleReconnect() {
            var _this3 = this;
            if (this.reconnectTimer) return;
            console.log('[WebSocket] 5秒后尝试重连...');
            this.reconnectTimer = setTimeout(function () {
              _this3.reconnectTimer = null;
              if (_this3.roomId && _this3.userId) {
                console.log('[WebSocket] 正在重连...');
                _this3.connect(_this3.roomId, _this3.userId);
              }
            }, 5000);
          }
        }, {
          key: "clearReconnect",
          value: function clearReconnect() {
            if (this.reconnectTimer) {
              clearTimeout(this.reconnectTimer);
              this.reconnectTimer = null;
            }
          }
        }, {
          key: "clearConnectTimeout",
          value: function clearConnectTimeout() {
            if (this.connectTimer) {
              clearTimeout(this.connectTimer);
              this.connectTimer = null;
            }
          }
        }]);
      }(); // 导出单例
      var wsManager = new WebSocketManager();

      /***/
}),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WS_TYPE: function () { return /* binding */ WS_TYPE; }
        /* harmony export */
});
      // ============================================
      // 类型定义
      // ============================================

      /** 发牌弹窗信息 */

      /** 座位信息 */

      /** 房间详情 */

      /** 后端统一返回格式 */

      /** WebSocket 消息 */

      /** 消息类型常量 */
      var WS_TYPE = {
        DEAL_CARD: 'DEAL_CARD',
        CHANGE_SEAT: 'CHANGE_SEAT',
        TRANSFER_HOST: 'TRANSFER_HOST',
        RESET: 'RESET',
        JOIN_ROOM: 'JOIN_ROOM',
        LEAVE_ROOM: 'LEAVE_ROOM',
        ROOM_DISMISSED: 'ROOM_DISMISSED',
        ROOM_UPDATE: 'ROOM_UPDATE'
      };

      /***/
}),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ _classCallCheck; }
        /* harmony export */
});
      function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
      }


      /***/
}),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ _createClass; }
        /* harmony export */
});
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

      function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
          var o = r[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, (0, _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o.key), o);
        }
      }
      function _createClass(e, r, t) {
        return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
          writable: !1
        }), e;
      }


      /***/
}),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ _defineProperty; }
        /* harmony export */
});
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

      function _defineProperty(e, r, t) {
        return (r = (0, _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[r] = t, e;
      }


      /***/
}),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ toPrimitive; }
        /* harmony export */
});
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

      function toPrimitive(t, r) {
        if ("object" != (0, _typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var i = e.call(t, r || "default");
          if ("object" != (0, _typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      }


      /***/
}),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ toPropertyKey; }
        /* harmony export */
});
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


      function toPropertyKey(t) {
        var i = (0, _toPrimitive_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, "string");
        return "symbol" == (0, _typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(i) ? i : i + "";
      }


      /***/
}),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ _typeof; }
        /* harmony export */
});
      function _typeof(o) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, _typeof(o);
      }


      /***/
})

},
/******/ function (__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function (moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro", "vendors", "common"], function () { return __webpack_exec__("./src/pages/room/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
  /******/
}
]);
//# sourceMappingURL=index.js.map