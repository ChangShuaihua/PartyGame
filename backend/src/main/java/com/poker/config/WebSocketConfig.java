package com.poker.config;

import com.poker.websocket.PokerWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * WebSocket 配置
 * 注册 WebSocket 处理器，路径：/ws/poker
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final PokerWebSocketHandler pokerWebSocketHandler;

    public WebSocketConfig(PokerWebSocketHandler pokerWebSocketHandler) {
        this.pokerWebSocketHandler = pokerWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(pokerWebSocketHandler, "/ws/poker")
                .setAllowedOrigins("*");  // 开发阶段允许所有来源
    }
}
