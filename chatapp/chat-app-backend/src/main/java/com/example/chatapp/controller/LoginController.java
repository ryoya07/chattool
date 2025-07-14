package com.example.chatapp.controller;

import com.example.chatapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession; 
import java.util.Collections;


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

                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authToken);

                session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);
                SecurityContextHolder.setContext(context);

                return ResponseEntity.ok(Map.of(
                    "message", "ログイン成功！",
                    "username", user.getUsername()
                ));
                } else {
                    return ResponseEntity
                            .status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("message", "パスワードが違います"));
                }
            })
            .orElseGet(() -> ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "ユーザーが見つかりません")));
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
