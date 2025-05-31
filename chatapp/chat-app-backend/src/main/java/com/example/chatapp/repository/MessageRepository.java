package com.example.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoomId(Long chatRoomId);

}
