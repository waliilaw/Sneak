import React, { useState, useEffect, useRef } from 'react';
import { useRoomId } from '@/context/RoomIdContext';
import { useUserId } from '@/context/UserIdContext';
import { useWebSocket } from '@/hooks/useWebSocket';
import { toast } from 'sonner';

interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    isCurrentUser: boolean;
}

export default function ChatRoom() {
    const { currentRoomId } = useRoomId();
    const { userId } : any  = useUserId();
    const { connectionStatus, lastMessage, sendMessage } = useWebSocket();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessage?.type === 'chat') {
            const newMessage: Message = {
                id: Date.now().toString(),
                sender: lastMessage.payload.sender,
                content: lastMessage.payload.content,
                timestamp: new Date(),
                isCurrentUser: lastMessage.payload.sender === userId
            };
            setMessages(prev => [...prev, newMessage]);
        }
    }, [lastMessage, userId]);

    const handleSendMessage = () => {
        if (inputMessage.trim() && connectionStatus === 'connected') {
            sendMessage({
                type: 'chat',
                payload: {
                    roomId: currentRoomId,
                    content: inputMessage.trim(),
                    sender: userId
                }
            });
            setInputMessage('');
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                        msg.isCurrentUser
                            ? "bg-emerald text-white dark:bg-light-yellow dark:text-emerald rounded-tr-none"
                            : "glass rounded-tl-none"
                    }`}>
                        {!msg.isCurrentUser && (
                            <p className="text-xs font-medium text-emerald dark:text-light-yellow mb-1">{msg.sender}</p>
                        )}
                        <p className="break-words">{msg.content}</p>
                        <p className="text-xs text-right mt-1 opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}