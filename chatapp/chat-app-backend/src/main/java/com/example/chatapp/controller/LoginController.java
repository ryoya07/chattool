package com.example.chatapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000") // ReactからのCORSを許可
public class LoginController {

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        System.out.println("🚀 POST /login にアクセスあり！");

        String email = loginData.get("email");
        String password = loginData.get("password");

        // 仮認証処理（メールとパスワードの一致を確認）
        if ("test@example.com".equals(email) && "password123".equals(password)) {
            return ResponseEntity.ok(Map.of("message", "ようこそ！"));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "ログイン失敗"));
        }
    }
}
