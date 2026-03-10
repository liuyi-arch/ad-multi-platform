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
        url = (() => {
            const envWsUrl = importMetaEnv?.VITE_WS_URL as string | undefined;
            if (envWsUrl) {
                // 如果是相对路径 (如 '/ws')，需转换为绝对 ws:// URL
                if (envWsUrl.startsWith('ws://') || envWsUrl.startsWith('wss://')) {
                    return envWsUrl;
                }
                // 相对路径转绝对路径
                const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                const path = envWsUrl.startsWith('/') ? envWsUrl : `/${envWsUrl}`;
                return `${protocol}//${window.location.host}${path}`;
            }
            // 无环境变量时，使用当前 host（通过 Nginx 网关代理 /ws）
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            return `${protocol}//${window.location.host}/ws`;
        })(),
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

                // 自动重连（指数退避）
                if (isMounted.current && reconnectAttemptsRef.current < maxReconnectAttempts) {
                    const delay = reconnectInterval * Math.pow(1.5, reconnectAttemptsRef.current);
                    reconnectAttemptsRef.current += 1;
                    reconnectTimerRef.current = setTimeout(connect, delay);
                }
            };

            ws.onerror = () => {
                // 移除通用报错日志
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
