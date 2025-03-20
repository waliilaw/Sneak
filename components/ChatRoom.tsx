import React, { useEffect } from 'react';
import { useRoomId } from '@/context/RoomIdContext';
import { useUserId } from '@/context/UserIdContext';
import useWebSocket from '@/hooks/useWebSocket';

const ChatRoom: React.FC = () => {
  const { roomId } : any  = useRoomId();
  const { userId } : any = useUserId();
  const { socket, messages } = useWebSocket(`ws://your-websocket-url/${roomId}`);

  const handleSendMessage = (message: string) => {
    if (socket) {
      socket.send(JSON.stringify({ sender: userId, content: message }));
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg : any , index : any ) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
};

export default ChatRoom; 