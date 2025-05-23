package com.example.chatapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.chatapp.model.Message;
import com.example.chatapp.repository.MessageRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message message) {
        message.setTimestamp(LocalDateTime.now()); 
        System.out.println("投稿ユーザー名: " + message.getUsername());
        return messageRepository.save(message);
    }

    @GetMapping("/room/{roomId}")
    public List<Message> getMessagesByRoom(@PathVariable Long roomId) {
        return messageRepository.findByRoomId(roomId);
    }
}
