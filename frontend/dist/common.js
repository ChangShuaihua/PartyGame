"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeSeat: function() { return /* binding */ changeSeat; },
/* harmony export */   createRoom: function() { return /* binding */ createRoom; },
/* harmony export */   dealOneCard: function() { return /* binding */ dealOneCard; },
/* harmony export */   exitRoom: function() { return /* binding */ exitRoom; },
/* harmony export */   getMyRoom: function() { return /* binding */ getMyRoom; },
/* harmony export */   getRoomByCode: function() { return /* binding */ getRoomByCode; },
/* harmony export */   getRoomDetail: function() { return /* binding */ getRoomDetail; },
/* harmony export */   joinRoom: function() { return /* binding */ joinRoom; },
/* harmony export */   resetGame: function() { return /* binding */ resetGame; },
/* harmony export */   transferHost: function() { return /* binding */ transferHost; }
/* harmony export */ });
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);



var BASE_URL = 'http://192.168.20.16:8080';
function request(_x, _x2, _x3) {
  return _request.apply(this, arguments);
}
/** 创建房间（maxSeats: 2-10） */
function _request() {
  _request = (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee(url, method, data) {
    var res, _t;
    return (0,D_shuzimali_AICoding_test4_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().request({
            url: "".concat(BASE_URL).concat(url),
            method: method,
            data: data,
            header: {
              'Content-Type': 'application/json'
            }
          });
        case 1:
          res = _context.v;
          return _context.a(2, res.data);
        case 2:
          _context.p = 2;
          _t = _context.v;
          console.error('API请求失败:', url, _t);
          throw _t;
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return _request.apply(this, arguments);
}
function createRoom(userId) {
  var maxSeats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return request('/api/room/create', 'POST', {
    userId: userId,
    maxSeats: maxSeats
  });
}

/** 加入房间（nickname 必填） */
function joinRoom(roomCode, userId, seatNumber, nickname) {
  return request('/api/room/join', 'POST', {
    roomCode: roomCode,
    userId: userId,
    seatNumber: seatNumber,
    nickname: nickname
  });
}

/** 查询房间详情 */
function getRoomDetail(roomId) {
  return request('/api/room/detail', 'GET', {
    roomId: roomId
  });
}

/** 按房间号查询 */
function getRoomByCode(roomCode) {
  return request('/api/room/detail-by-code', 'GET', {
    roomCode: roomCode
  });
}

/** 换座 */
function changeSeat(roomId, userId, targetSeat) {
  return request('/api/room/change-seat', 'POST', {
    roomId: roomId,
    userId: userId,
    targetSeat: targetSeat
  });
}

/** 转让房主 */
function transferHost(roomId, fromUserId, toUserId) {
  return request('/api/room/transfer-host', 'POST', {
    roomId: roomId,
    fromUserId: fromUserId,
    toUserId: toUserId
  });
}

/** 退出房间 */
function exitRoom(roomId, userId) {
  return request('/api/room/exit', 'POST', {
    roomId: roomId,
    userId: userId
  });
}

/** 查询用户当前所在的房间 */
function getMyRoom(userId) {
  return request('/api/room/my-room', 'GET', {
    userId: userId
  });
}

/** 发一张牌 */
function dealOneCard(roomId, hostUserId) {
  return request('/api/poker/deal-one', 'POST', {
    roomId: roomId,
    hostUserId: hostUserId
  });
}

/** 一键重置 */
function resetGame(roomId, hostUserId) {
  return request('/api/poker/reset', 'POST', {
    roomId: roomId,
    hostUserId: hostUserId
  });
}

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearRecentRoom: function() { return /* binding */ clearRecentRoom; },
/* harmony export */   getCardColor: function() { return /* binding */ getCardColor; },
/* harmony export */   getCardMeaning: function() { return /* binding */ getCardMeaning; },
/* harmony export */   getCurrentUserId: function() { return /* binding */ getCurrentUserId; },
/* harmony export */   getRecentRoom: function() { return /* binding */ getRecentRoom; },
/* harmony export */   saveRecentRoom: function() { return /* binding */ saveRecentRoom; },
/* harmony export */   showToast: function() { return /* binding */ showToast; }
/* harmony export */ });
/* unused harmony export formatCard */
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);


/**
 * 获取当前用户ID（模拟微信openid）
 * 实际项目中通过 Taro.login() 获取 code，再通过后端换取 openid
 */
function getCurrentUserId() {
  // 先用本地存储的ID，没有则生成临时ID
  var userId = '';
  try {
    userId = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync('poker_user_id') || '';
  } catch (e) {
    /* ignore */
  }
  if (!userId) {
    userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync('poker_user_id', userId);
    } catch (e) {
      /* ignore */
    }
  }
  return userId;
}

/**
 * Toast 提示
 */
function showToast(title) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
    title: title,
    icon: icon,
    duration: 2000
  });
}

/**
 * 牌面颜色（红心/方块=红色，黑桃/梅花=黑色，Joker=红色）
 */
function getCardColor(card) {
  if (card === '小王' || card === '大王') {
    return '#e74c3c'; // Joker 红色
  }
  if (card.includes('♥') || card.includes('♦')) {
    return '#e74c3c'; // 红色花色
  }
  return '#2c3e50'; // 黑色花色
}

/**
 * 格式化牌面显示
 */
function formatCard(card) {
  return card;
}

/** 牌面含义映射表 */
var CARD_MEANING_MAP = {
  '大王': '挡酒牌 🛡️',
  '小王': '挡酒牌 🛡️',
  'A': '命令牌 👉',
  '2': '小姐牌 👩',
  '3': '逛三园牌 🌳',
  '4': '挑战牌 ⚔️',
  '5': '照相机牌 📷',
  '6': '柳树扭扭牌 🌿',
  '7': '逢7过牌 🔢',
  '8': '厕所牌 🚻',
  '9': '自罚牌 🍺',
  '10': '神经病牌 🤪',
  'J': '左边喝牌 👈',
  'Q': '右边喝牌 👉',
  'K': '定量牌 📏'
};

/**
 * 根据牌面获取酒桌游戏含义
 */
function getCardMeaning(card) {
  var rank;
  if (card === '大王' || card === '小王') {
    rank = card;
  } else {
    // 去掉末尾花色符号，如 "A♠" → "A", "10♥" → "10"
    rank = card.slice(0, -1);
  }
  return CARD_MEANING_MAP[rank] || '';
}

/** 最近房间缓存结构 */

var RECENT_ROOM_KEY = 'poker_recent_room';

/** 保存最近进入的房间信息 */
function saveRecentRoom(room) {
  try {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(RECENT_ROOM_KEY, JSON.stringify(room));
  } catch (e) {/* ignore */}
}

/** 读取最近进入的房间信息 */
function getRecentRoom() {
  try {
    var raw = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(RECENT_ROOM_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/** 清除最近房间记录 */
function clearRecentRoom() {
  try {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync(RECENT_ROOM_KEY);
  } catch (e) {/* ignore */}
}

/***/ })

}]);
//# sourceMappingURL=common.js.map