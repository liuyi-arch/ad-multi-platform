import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * WebSocket 消息类型
 */
export interface WsMessage {
    type: 'AD_STATUS_CHANGED' | 'AD_CREATED' | 'AD_DELETED' | 'AD_UPDATED' | 'CONNECTED';
    payload: any;
}

interface UseWebSocketOptions {
    url?: string;
    onMessage?: (message: WsMessage) => void;
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
}

/**
 * WebSocket Hook
 * 自动连接、重连、心跳检测
 */
export const useWebSocket = (options: UseWebSocketOptions = {}) => {
    const {
        url = `ws://${window.location.hostname}:3000/ws`,
        onMessage,
        reconnectInterval = 3000,
        maxReconnectAttempts = 10,
    } = options;

    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onMessageRef = useRef(onMessage);

    // 保持 onMessage 回调最新
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    const connect = useCallback(() => {
        // 避免重复连接
        if (wsRef.current?.readyState === WebSocket.OPEN ||
            wsRef.current?.readyState === WebSocket.CONNECTING) {
            return;
        }

        try {
            const ws = new WebSocket(url);

            ws.onopen = () => {
                console.log('🔌 WebSocket connected');
                setIsConnected(true);
                reconnectAttemptsRef.current = 0;
            };

            ws.onmessage = (event) => {
                try {
                    const message: WsMessage = JSON.parse(event.data);
                    onMessageRef.current?.(message);
                } catch (err) {
                    console.error('Failed to parse WS message:', err);
                }
            };

            ws.onclose = () => {
                console.log('🔌 WebSocket disconnected');
                setIsConnected(false);
                wsRef.current = null;

                // 自动重连（指数退避）
                if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                    const delay = reconnectInterval * Math.pow(1.5, reconnectAttemptsRef.current);
                    reconnectAttemptsRef.current += 1;
                    console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current})`);
                    reconnectTimerRef.current = setTimeout(connect, delay);
                }
            };

            ws.onerror = (err) => {
                console.error('WebSocket error:', err);
            };

            wsRef.current = ws;
        } catch (err) {
            console.error('Failed to create WebSocket:', err);
        }
    }, [url, reconnectInterval, maxReconnectAttempts]);

    // 组件挂载时连接
    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connect]);

    return {
        isConnected,
        ws: wsRef.current,
    };
};
