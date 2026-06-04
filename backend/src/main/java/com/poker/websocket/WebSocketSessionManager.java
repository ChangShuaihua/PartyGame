package com.poker.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * WebSocket 会话管理器
 * 维护房间ID -> 会话集合的映射
 */
@Slf4j
@Component
public class WebSocketSessionManager {

    /**
     * roomId -> 该房间内所有在线用户的 WebSocket 会话集合
     */
    private final Map<Long, Set<WebSocketSession>> roomSessions = new ConcurrentHashMap<>();

    /**
     * sessionId -> roomId 反向映射，便于会话关闭时清理
     */
    private final Map<String, Long> sessionRoomMap = new ConcurrentHashMap<>();

    /**
     * 用户加入房间，注册会话
     */
    public void addSession(Long roomId, WebSocketSession session) {
        roomSessions.computeIfAbsent(roomId, k -> new CopyOnWriteArraySet<>()).add(session);
        sessionRoomMap.put(session.getId(), roomId);
        log.info("WebSocket会话加入房间: roomId={}, sessionId={}, 当前房间在线人数={}",
                roomId, session.getId(), roomSessions.get(roomId).size());
    }

    /**
     * 移除会话
     */
    public void removeSession(WebSocketSession session) {
        Long roomId = sessionRoomMap.remove(session.getId());
        if (roomId != null) {
            Set<WebSocketSession> sessions = roomSessions.get(roomId);
            if (sessions != null) {
                sessions.remove(session);
                if (sessions.isEmpty()) {
                    roomSessions.remove(roomId);
                }
            }
            log.info("WebSocket会话离开房间: roomId={}, sessionId={}", roomId, session.getId());
        }
    }

    /**
     * 获取指定房间内的所有会话
     */
    public Set<WebSocketSession> getRoomSessions(Long roomId) {
        return roomSessions.getOrDefault(roomId, Set.of());
    }

    /**
     * 获取房间在线人数
     */
    public int getRoomOnlineCount(Long roomId) {
        Set<WebSocketSession> sessions = roomSessions.get(roomId);
        return sessions == null ? 0 : sessions.size();
    }
}
