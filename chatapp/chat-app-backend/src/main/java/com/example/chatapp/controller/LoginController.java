package com.example.chatapp.controller;

import com.example.chatapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession; 

import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        return userService.findByEmail(email)
                .map(user -> {
                    if (user.getPassword().equals(password)) {
                        session.setAttribute("user", user);
                        return ResponseEntity.ok(Map.of(
                            "message","ログイン成功！",
                            "username", user.getUsername()
                        )); // ログイン成功
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "パスワードが違います")); // パスワードが間違っている
                    }
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "ユーザーが見つかりません"))); // ユーザーが見つからない
    }

    @GetMapping("/me")
        public ResponseEntity<?> getCurrentUser(HttpSession session) {
            Object user = session.getAttribute("user");
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

    @PostMapping("/logout")
        public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
            request.getSession(false).invalidate();
            return ResponseEntity.ok().build();
        }
}
