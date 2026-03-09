import 'dotenv/config';
import http from 'http';
import app from './app';
import { connectDB } from './config';
import { initWebSocket } from './config/websocket';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // 先连接数据库
    await connectDB();

    // 创建 HTTP server
    const server = http.createServer(app.callback());

    // 初始化 WebSocket 服务器（复用同一个 HTTP server）
    initWebSocket(server);

    server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🔌 WebSocket available at ws://localhost:${PORT}/ws`);
    });
};

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
