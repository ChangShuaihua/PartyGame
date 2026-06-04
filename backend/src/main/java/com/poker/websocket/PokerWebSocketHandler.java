package com.poker.websocket;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * 扑克游戏 WebSocket 处理器
 * 客户端通过 URL: ws://host:8080/ws/poker?roomId=xxx&userId=xxx 连接
 */
@Slf4j
@Component
public class PokerWebSocketHandler extends TextWebSocketHandler {

    private final WebSocketSessionManager sessionManager;

    public PokerWebSocketHandler(WebSocketSessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String roomIdStr = getQueryParam(session, "roomId");
        String userId = getQueryParam(session, "userId");

        if (roomIdStr == null || userId == null) {
            log.warn("WebSocket连接缺少参数: roomId={}, userId={}", roomIdStr, userId);
            try {
                session.close(CloseStatus.BAD_DATA);
            } catch (Exception ignored) {}
            return;
        }

        Long roomId = Long.valueOf(roomIdStr);
        sessionManager.addSession(roomId, session);
        log.info("WebSocket连接建立: roomId={}, userId={}, sessionId={}", roomId, userId, session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // 前端发来的消息目前仅用于心跳保活，业务消息走 REST 接口
        String payload = message.getPayload();
        log.debug("收到WebSocket消息: {}", payload);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessionManager.removeSession(session);
        log.info("WebSocket连接关闭: sessionId={}, status={}", session.getId(), status);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        log.error("WebSocket传输错误: sessionId={}", session.getId(), exception);
        sessionManager.removeSession(session);
    }

    /**
     * 从 WebSocket 连接 URL 中提取查询参数
     */
    private String getQueryParam(WebSocketSession session, String paramName) {
        String query = session.getUri() != null ? session.getUri().getQuery() : null;
        if (query == null) return null;
        for (String pair : query.split("&")) {
            String[] kv = pair.split("=", 2);
            if (kv.length == 2 && kv[0].equals(paramName)) {
                return kv[1];
            }
        }
        return null;
    }
}
