import React, { useEffect } from 'react';
import { useWebSocket, useAdsStore } from '@repo/hooks';

/**
 * WebSocket 管理组件
 * 负责分发来自后端的实时更新消息
 */
const WebSocketManager: React.FC = () => {
    const { syncActions } = useAdsStore();

    const { isConnected } = useWebSocket({
        onMessage: (message) => {
            console.log('📬 WebSocket message received:', message.type);

            switch (message.type) {
                case 'AD_CREATED':
                    syncActions.handleCreated(message.payload);
                    break;
                case 'AD_UPDATED':
                case 'AD_STATUS_CHANGED':
                    syncActions.handleUpdated(message.payload);
                    break;
                case 'AD_DELETED':
                    syncActions.handleDeleted(message.payload.id);
                    break;
                case 'CONNECTED':
                    console.log('✅ Connected to WebSocket server');
                    break;
                default:
                    console.log('❓ Unknown WS message type:', message.type);
            }
        }
    });

    // 可以在开发环境下显示连接状态
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🔌 WebSocket connection status: ${isConnected ? 'Connected' : 'Disconnected'}`);
        }
    }, [isConnected]);

    return null; // 此组件不渲染任何 UI
};

export default WebSocketManager;
