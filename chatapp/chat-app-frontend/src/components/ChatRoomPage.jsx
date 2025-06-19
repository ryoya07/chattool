import { useState, useEffect } from 'react';
import styles from "./ChatRoomPage.module.css";
import { useParams, useSearchParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';

const ChatRoomPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username');
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');

    // ルーム名取得
    useEffect(() => {
        fetch(`http://localhost:8080/chatrooms/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setRoomName(data.name))
            .catch(err => console.error('ルーム取得失敗', err));
    }, [id]);

    // メッセージ一覧取得
    useEffect(() => {
        fetch(`http://localhost:8080/messages/room/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error('メッセージ取得失敗', err));
    }, [id]);

    // WebSocket接続
    const [client, setClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("🟢 WebSocket接続成功");

                stompClient.subscribe(`/topic/room/${id}`, (message) => {
                    const body = JSON.parse(message.body);
                    setMessages(prev => [...prev, body]);
                });
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, [id]);

    // メッセージ送信
    const handleSendMessage = () => {
        if (client && client.connected) {
            client.publish({
                destination: `/app/chat.send/${id}`,
                body: JSON.stringify({
                    roomId: id,
                    content: message,
                    username: username || "匿名"
                })
            });
            setMessage('');
        } else {
            console.warn("WebSocket未接続");
            setStatus("送信失敗（WebSocket未接続）");
        }
    };
    
    return (
        <div className={styles.chatRoomPage}>
            <h2>チャットルーム: {roomName}</h2>
            <h3>メッセージ一覧:</h3>
            <ul>
                {messages.map((msg) => (
                <li key={msg.id}>
                    <div style={{ textAlign: "left", marginBottom: "10px" }}>
                        {msg.timestamp && (
                        <span style={{ fontSize: "0.85rem", color: "#aaa", display: "block" }}>
                            {new Date(msg.timestamp).toLocaleString()}
                        </span>
                        )}
                        <strong>{msg.username || "匿名"}</strong>: {msg.content}
                    </div>
                </li>
                ))}
            </ul>
            <p style={{marginTop: "20px", fontWeight:"bold"}}>
                {roomName}へのメッセージを送信
            </p>
            <div className="input-group">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="メッセージを入力"
                />
                <button onClick={handleSendMessage}>送信</button>
            </div>
            {status && <p>{status}</p>}
        </div>
    );
};

export default ChatRoomPage;
