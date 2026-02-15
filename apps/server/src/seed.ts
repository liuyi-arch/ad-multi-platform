/**
 * 数据库种子脚本
 * 将 Mock 数据写入 MongoDB
 */

import 'dotenv/config';
import { connectDB, disconnectDB } from './config';
import { AdModel } from './modules/ad/ad.model';

// 合并两端的 Mock 数据
const SEED_ADS = [
    // 来自 admin-web mockData
    {
        title: '2024新年科技展：智能硬件全球首发周',
        description: '夏季电子产品促销活动，包含所有移动终端与配件',
        status: 'PENDING',
        bid: 1250,
        heat: 8400,
        date: '2023年10月24日',
        createDate: '2023年10月24日',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2Z9XMrIS8eVgvvzkiFUKIGdCRWlWljnBuUdenlg33k8aCmeO8PLq14TipXescE0w84DnW9Ti_A7GBEh_xHyafa1XI5l1M29PKMQK5HSkXc3qQFdyp7dYcNiiie6U33p2cYEQyunOy7bZaCcLGrM5kdotgbEOG8VQzWOb3IRys39zaXqwmU30dM_IZfa44DmbIIDpnpbPZgWt8DFPhFtyAxtY4aBdPbuzdrY14KHhNB-xlnxy4ft6XTFMnDUBZutBJv-ethdIjNI',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        category: '科技',
        brand: 'Tech Global',
        publisher: 'Alex Rivera',
        landingPage: 'https://tech-showcase-2024.com/global-launch',
        engagement: 85,
    },
    {
        title: '都市街头时装系列：秋季灵感特辑',
        description: '全球服饰发布，针对年轻潮流群体',
        status: 'APPROVED',
        bid: 2800,
        heat: 12200,
        date: '2023年10月22日',
        createDate: '2023年10月22日',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLAH4hLf81rPqer3HVDynKJes34Weo6h_XkF8Ui1RTf5rty5bsy50XS7U8BRH9bYjStjNnjV4G4Fxo67VPs_N70gdpi8oEKn8pN7t_1ysyOcTLJle5w220tojKQJrRnVH1wUcNP9rGA1WO3HAdCfe_kI6m7HH6E4Qg3776JGvkeOb9GzN92V689PhGHqRt5ULS4nO7qxa9qz3QiQ8DunCa9LhUDJFnaox0q1Wj2FYBOJQQsHiQaBWj4WB1q_7msM65_PfXNxuMCc',
        imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
        category: '时尚',
        brand: 'Urban Vibes',
        publisher: 'Alex Rivera',
        landingPage: 'https://urban-vibes.com',
        engagement: 92,
    },
    {
        title: '午夜美食推广：24小时不打烊的味蕾狂欢',
        description: '本地餐厅周，聚集超过50家精品餐饮店',
        status: 'REJECTED',
        bid: 450,
        heat: 1500,
        date: '2023年10月20日',
        createDate: '2023年10月20日',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL-EhJMNccjRF1btQGECU6OCif69hpuiY39FghWyeKb7tqOjYe8uQDb87_17jktY3TWxzSzmnHIrCXMGtL2_UEXzELINvLiJsfsPdSKcBYfSVxeXWUSebIzJ2Kb4KHhzsNEv-0VGfUy9eoaTDUsaB5vQPhjcrWAqbkEr2P1HqG0DaI_fjYqqWoWdXD8nPruWaesg4IcDsLJ4Y6hgQIX3tEqtieDyAILWHJnFBhYHIgdx1u9ODd_6TMfbTF1yGfYFnFhd4iCqKn9_g',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
        category: '餐饮',
        brand: 'Gourmet Night',
        publisher: 'Alex Rivera',
        landingPage: 'https://gourmet-night.com',
        engagement: 45,
        rejectionReason: '广告内容不符合平台规范',
    },
    // 来自 advertiser-web mockData
    {
        title: '2024夏季系列：沙滩漫步者',
        description: '采用顶级轻薄面料，为您带来清凉舒爽的夏日海滩穿着体验。',
        status: 'APPROVED',
        bid: 12.50,
        heat: 8421,
        createDate: '2024年01月01日',
        date: '2024年01月01日',
        category: '电子商务',
        imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
        publisher: '市场营销部',
        landingPage: '#',
    },
    {
        title: '新一代 Pro Max 智能手机',
        description: '搭载最新处理器，超长续航与卓越摄像性能的完美结合。',
        status: 'APPROVED',
        bid: 18.80,
        heat: 12200,
        createDate: '2024年01月05日',
        date: '2024年01月05日',
        category: '科技',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
        publisher: '科技推广组',
        landingPage: '#',
    },
    {
        title: '天际线豪华顶层公寓',
        description: '坐拥360度城市全景，奢华内饰，尽享现代都市生活巅峰。',
        status: 'APPROVED',
        bid: 45.00,
        heat: 5100,
        createDate: '2024年01月10日',
        date: '2024年01月10日',
        category: '房地产',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
        publisher: '置业地产',
        landingPage: '#',
    },
    {
        title: '手工皮艺钱包',
        description: '选用顶级牛皮，纯手工缝制，随时间流逝愈发有韵味。',
        status: 'REJECTED',
        bid: 3.50,
        heat: 1200,
        createDate: '2024年02月01日',
        date: '2024年02月01日',
        category: '皮具',
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80',
        publisher: '匠心工坊',
        landingPage: '#',
        rejectionReason: '文案包含敏感词汇。',
    },
    {
        title: '有机冷压果汁',
        description: '无添加，零农残，锁住新鲜蔬果的每一滴营养。',
        status: 'PENDING',
        bid: 7.20,
        heat: 4500,
        createDate: '2024年02月05日',
        date: '2024年02月05日',
        category: '食品饮料',
        imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
        publisher: '健康生活',
        landingPage: '#',
    },
    {
        title: '智能运动手表 X',
        description: '全天候健康监测，多种运动模式，您的私人健康教练。',
        status: 'APPROVED',
        bid: 9.80,
        heat: 15600,
        createDate: '2024年01月25日',
        date: '2024年01月25日',
        category: '智能穿戴',
        imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
        publisher: '极客运动',
        landingPage: '#',
    },
    {
        title: '极简北欧风沙发',
        description: '舒适坐感，环保面料，打造您的宁静居家空间。',
        status: 'APPROVED',
        bid: 28.00,
        heat: 6700,
        createDate: '2024年02月10日',
        date: '2024年02月10日',
        category: '家居',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
        publisher: '家装设计',
        landingPage: '#',
    },
    {
        title: '无线降噪耳机',
        description: '沉浸式音频体验，主动降噪，听见每一个细节。',
        status: 'APPROVED',
        bid: 19.90,
        heat: 11000,
        createDate: '2024年02月20日',
        date: '2024年02月20日',
        category: '数码',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        publisher: '声学实验室',
        landingPage: '#',
    },
    {
        title: '户外越野跑鞋',
        description: '防滑抓地，耐磨透气，助您征服复杂地形。',
        status: 'APPROVED',
        bid: 11.80,
        heat: 7600,
        createDate: '2024年03月10日',
        date: '2024年03月10日',
        category: '户外',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        publisher: '探险装备',
        landingPage: '#',
    },
];

const seed = async () => {
    console.log('🌱 Starting database seed...');

    await connectDB();

    // 清空现有数据
    await AdModel.deleteMany({});
    console.log('  Cleared existing ads');

    // 插入种子数据
    const result = await AdModel.insertMany(SEED_ADS);
    console.log(`  ✅ Inserted ${result.length} ads`);

    await disconnectDB();
    console.log('🌱 Seed completed!');
};

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
