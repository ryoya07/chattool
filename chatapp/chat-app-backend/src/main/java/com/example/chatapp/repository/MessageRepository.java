package com.example.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.chatapp.model.Message;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRoomId(Long roomId);
}
