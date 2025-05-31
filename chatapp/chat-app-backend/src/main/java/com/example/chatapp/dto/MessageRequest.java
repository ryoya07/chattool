
package com.example.chatapp.dto;

public class MessageRequest {
    private String content;
    private String username;
    private Long roomId;

    // Getter / Setter
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
}
