package com.example.chatapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatAppBackendApplication {

    public static void main(String[] args) {
        System.out.println("💡 Spring Boot 起動開始！");
        SpringApplication.run(ChatAppBackendApplication.class, args);
        System.out.println("✅ 起動完了！");
    }

}

