import React from 'react';
import { useWebSocket, useAdsStore } from '@repo/hooks';

/**
 * WebSocket 管理组件
 * 负责分发来自后端的实时更新消息
 */
export const WebSocketManager: React.FC = () => {
    const { syncActions } = useAdsStore();

    useWebSocket({
        onMessage: (message) => {
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
                default:
                    break;
            }
        }
    });

    return null; // 此组件不渲染任何 UI
};
