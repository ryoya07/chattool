package com.example.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.chatapp.model.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
