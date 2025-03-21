import { useEffect, useRef, useState, useCallback } from 'react';
import { useRoomId } from '../context/RoomIdContext';
import { useUserId } from '../context/UserIdContext';
import { toast } from 'sonner';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export interface WebSocketMessage {
    type: string;
    payload: any;
}

export function useWebSocket() {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { setCurrentRoomId } = useRoomId();
    const { setUserId } : any  = useUserId();

    const sendMessage = useCallback((message: any) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            toast.error('WebSocket is not connected');
        }
    }, []);

    const connect = useCallback(() => {
        ws.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? '');

        ws.current.onopen = () => {
            setConnectionStatus('connected');
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
        };

        ws.current.onclose = () => {
            setConnectionStatus('disconnected');
            reconnectTimeoutRef.current = setTimeout(connect, 6000);
        };

        ws.current.onerror = () => {
            toast.error('WebSocket error');
            setConnectionStatus('disconnected');
        };

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'roomCreated') {
                toast.success('Room Created Successfully');
                setCurrentRoomId(message.payload.roomId);
            }
            if (message.type === 'roomJoined') {
                setUserId(message.payload.user_id);
                toast.success('Room Joined Successfully');
            }
            setLastMessage(message);
        };
    }, [setCurrentRoomId, setUserId]);

    useEffect(() => {
        connect();
        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [connect]);

    return { connectionStatus, lastMessage, sendMessage };
}