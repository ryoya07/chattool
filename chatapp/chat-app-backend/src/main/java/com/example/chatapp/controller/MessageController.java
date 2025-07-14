package com.example.chatapp.controller;

import com.example.chatapp.dto.MessageRequest;
import com.example.chatapp.entity.ChatRoom;
import com.example.chatapp.entity.Message;
import com.example.chatapp.repository.ChatRoomRepository;
import com.example.chatapp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @PostMapping("/send")
    public Message sendMessage(@RequestBody MessageRequest request, HttpSession session) {
        Message message = new Message();
        message.setContent(request.getContent());
        message.setUsername(request.getUsername());
        message.setTimestamp(LocalDateTime.now());

        // ChatRoomエンティティを取得してセット
        ChatRoom chatRoom = chatRoomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("チャットルームが見つかりません"));
        message.setChatRoom(chatRoom);

        return messageRepository.save(message);
    }

    @GetMapping("/room/{roomId}")
    public List<Message> getMessagesByRoom(@PathVariable Long roomId) {
        return messageRepository.findByChatRoomId(roomId);
    }
}
