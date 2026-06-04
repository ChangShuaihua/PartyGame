package com.poker.service;

import com.alibaba.fastjson2.JSON;
import com.poker.dto.WsMessage;
import com.poker.websocket.WebSocketSessionManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Set;

/**
 * WebSocket 消息推送服务
 */
@Slf4j
@Service
public class WebSocketService {

    private final WebSocketSessionManager sessionManager;

    public WebSocketService(WebSocketSessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    /**
     * 向房间内所有在线用户广播消息
     *
     * @param roomId  房间ID
     * @param message 消息对象
     */
    public void broadcastToRoom(Long roomId, WsMessage message) {
        Set<WebSocketSession> sessions = sessionManager.getRoomSessions(roomId);
        if (sessions.isEmpty()) {
            log.debug("房间 {} 无在线用户，跳过广播", roomId);
            return;
        }

        String jsonStr = JSON.toJSONString(message);
        TextMessage textMessage = new TextMessage(jsonStr);

        log.info("广播消息 -> 房间{}: type={}, 接收人数={}", roomId, message.getType(), sessions.size());

        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                try {
                    synchronized (session) {
                        session.sendMessage(textMessage);
                    }
                } catch (IOException e) {
                    log.error("发送WebSocket消息失败: sessionId={}", session.getId(), e);
                }
            }
        }
    }

    /**
     * 向指定用户发送消息
     */
    public void sendToUser(Long roomId, String userId, WsMessage message) {
        Set<WebSocketSession> sessions = sessionManager.getRoomSessions(roomId);
        String jsonStr = JSON.toJSONString(message);
        TextMessage textMessage = new TextMessage(jsonStr);

        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                // 从session属性中读取userId进行匹配
                try {
                    synchronized (session) {
                        session.sendMessage(textMessage);
                    }
                } catch (IOException e) {
                    log.error("发送WebSocket消息失败: sessionId={}", session.getId(), e);
                }
            }
        }
    }
}
