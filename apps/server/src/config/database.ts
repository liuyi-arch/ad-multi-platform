/**
 * 数据库配置
 * MongoDB + Mongoose 连接管理
 */

import mongoose from 'mongoose';

export const databaseConfig = {
    // MongoDB 连接 URL (从环境变量读取)
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/advertise-wall',

    // 连接选项
    options: {
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },
};

/**
 * 连接 MongoDB
 */
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(databaseConfig.url, databaseConfig.options);
        console.log('✅ MongoDB connected successfully');

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};

/**
 * 断开 MongoDB 连接
 */
export const disconnectDB = async (): Promise<void> => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
};
