package com.poker;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 扑克发牌游戏 - 启动类
 */
@SpringBootApplication
@MapperScan("com.poker.mapper")
public class PokerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PokerApplication.class, args);
        System.out.println("====================================");
        System.out.println("  扑克发牌游戏服务启动成功！");
        System.out.println("  http://localhost:8080");
        System.out.println("====================================");
    }
}
