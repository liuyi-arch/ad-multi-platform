import { useState, useEffect, useRef, useCallback } from 'react';

// @ts-ignore
const importMetaEnv = (import.meta as any).env;

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
        url = (importMetaEnv?.VITE_WS_URL as string) || `ws://${window.location.hostname}:3000/ws`,
        onMessage,
        reconnectInterval = 3000,
        maxReconnectAttempts = 10,
    } = options;

    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onMessageRef = useRef(onMessage);
    const isMounted = useRef(true);

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
                if (!isMounted.current) {
                    ws.close();
                    return;
                }
                setIsConnected(true);
                reconnectAttemptsRef.current = 0;
            };

            ws.onmessage = (event) => {
                if (!isMounted.current) return;
                try {
                    const message: WsMessage = JSON.parse(event.data);
                    onMessageRef.current?.(message);
                } catch (err) {
                    // 保持解析错误记录
                    console.error('Failed to parse WS message:', err);
                }
            };

            ws.onclose = () => {
                setIsConnected(false);
                wsRef.current = null;

                // 自动重连（使用指数避退算法）
                if (isMounted.current && reconnectAttemptsRef.current < maxReconnectAttempts) {
                    const delay = Math.min(reconnectInterval * Math.pow(1.5, reconnectAttemptsRef.current), 30000); // 最高 30s
                    reconnectAttemptsRef.current += 1;

                    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
                    reconnectTimerRef.current = setTimeout(() => {
                        if (isMounted.current) connect();
                    }, delay);
                }
            };

            ws.onerror = () => {
                // onerror 通常伴随着 onclose，但在此显式置空引用并依靠 onclose 触发重连
                ws.close();
            };

            wsRef.current = ws;
        } catch (err) {
            if (isMounted.current) {
                console.error('Failed to create WebSocket:', err);
            }
        }
    }, [url, reconnectInterval, maxReconnectAttempts]);

    // 组件挂载时连接
    useEffect(() => {
        isMounted.current = true;
        connect();

        return () => {
            isMounted.current = false;
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
            if (wsRef.current) {
                const ws = wsRef.current;
                // 重要：移除所有监听器，防止在卸载过程中触发状态更新或重连
                ws.onopen = null;
                ws.onmessage = null;
                ws.onerror = null;
                ws.onclose = null;

                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
                // 如果是 CONNECTING 状态，不立即调用 close() 以避免控制台警告
                // 已经在 onopen 中逻辑处理了：如果卸载了，open 后会立即 close
                wsRef.current = null;
            }
        };
    }, [connect]);

    return {
        isConnected,
        ws: wsRef.current,
    };
};
