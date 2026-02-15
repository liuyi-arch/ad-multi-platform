/**
 * WebSocket 服务
 * 管理 WebSocket 连接和消息广播
 */

import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

// WebSocket 消息类型
export interface WsMessage {
    type: 'AD_STATUS_CHANGED' | 'AD_CREATED' | 'AD_DELETED' | 'AD_UPDATED';
    payload: any;
}

let wss: WebSocketServer | null = null;

/**
 * 初始化 WebSocket 服务器
 */
export const initWebSocket = (server: HttpServer): WebSocketServer => {
    wss = new WebSocketServer({ server, path: '/ws' });

    console.log('🔌 WebSocket server initialized on /ws');

    wss.on('connection', (ws: WebSocket) => {
        console.log('📱 Client connected, total:', wss?.clients.size);

        // 心跳检测
        const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.ping();
            }
        }, 30000);

        ws.on('pong', () => {
            // 客户端仍然活跃
        });

        ws.on('close', () => {
            clearInterval(pingInterval);
            console.log('📱 Client disconnected, total:', wss?.clients.size);
        });

        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
            clearInterval(pingInterval);
        });

        // 发送欢迎消息
        ws.send(JSON.stringify({
            type: 'CONNECTED',
            payload: { message: 'WebSocket connected' },
        }));
    });

    return wss;
};

/**
 * 向所有连接的客户端广播消息
 */
export const broadcast = (message: WsMessage): void => {
    if (!wss) {
        console.warn('WebSocket server not initialized');
        return;
    }

    const data = JSON.stringify(message);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });

    console.log(`📡 Broadcasting ${message.type} to ${wss.clients.size} clients`);
};

/**
 * 获取 WebSocket 服务器实例
 */
export const getWss = (): WebSocketServer | null => wss;
