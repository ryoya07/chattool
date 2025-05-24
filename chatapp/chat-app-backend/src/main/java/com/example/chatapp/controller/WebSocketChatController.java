package com.example.chatapp.controller;

import com.example.chatapp.model.Message;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class WebSocketChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.send/{roomId}") // クライアントからの送信先
    public void sendMessage(@DestinationVariable Long roomId, Message message) {
        message.setTimestamp(LocalDateTime.now());
        messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
    }
}
