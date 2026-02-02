
import { AdItem, AdStatus, StatItem } from './types/index';

export const MOCK_STATS: StatItem[] = [
  { label: '总广告数', value: '1,284', trend: '+12%', isPositive: true, icon: 'ads_click', colorClass: 'bg-blue-50 text-primary' },
  { label: '投放中广告', value: '856', trend: '+5%', isPositive: true, icon: 'check_circle', colorClass: 'bg-emerald-50 text-emerald-600' },
  { label: '总曝光量', value: '1.2M', trend: '+18.4%', isPositive: true, icon: 'visibility', colorClass: 'bg-purple-50 text-purple-600' },
  { label: '平均点击率 (CTR)', value: '3.2%', trend: '-2.1%', isPositive: false, icon: 'touch_app', colorClass: 'bg-orange-50 text-orange-600' }
];

export const MOCK_ADS: AdItem[] = [
  {
    id: 'AD-9421-XB',
    title: '2024新年科技展：智能硬件全球首发周',
    description: '夏季电子产品促销活动，包含所有移动终端与配件',
    status: AdStatus.PENDING,
    bid: 1250,
    heat: '8.4k',
    date: '2023年10月24日',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2Z9XMrIS8eVgvvzkiFUKIGdCRWlWljnBuUdenlg33k8aCmeO8PLq14TipXescE0w84DnW9Ti_A7GBEh_xHyafa1XI5l1M29PKMQK5HSkXc3qQFdyp7dYcNiiie6U33p2cYEQyunOy7bZaCcLGrM5kdotgbEOG8VQzWOb3IRys39zaXqwmU30dM_IZfa44DmbIIDpnpbPZgWt8DFPhFtyAxtY4aBdPbuzdrY14KHhNB-xlnxy4ft6XTFMnDUBZutBJv-ethdIjNI',
    category: '科技',
    brand: 'Tech Global',
    publisher: 'Alex Rivera',
    landingPage: 'https://tech-showcase-2024.com/global-launch',
    engagement: 85
  },
  {
    id: 'AD-8812-PL',
    title: '都市街头时装系列：秋季灵感特辑',
    description: '全球服饰发布，针对年轻潮流群体',
    status: AdStatus.ACTIVE,
    bid: 2800,
    heat: '12.2k',
    date: '2023年10月22日',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLAH4hLf81rPqer3HVDynKJes34Weo6h_XkF8Ui1RTf5rty5bsy50XS7U8BRH9bYjStjNnjV4G4Fxo67VPs_N70gdpi8oEKn8pN7t_1ysyOcTLJle5w220tojKQJrRnVH1wUcNP9rGA1WO3HAdCfe_kI6m7HH6E4Qg3776JGvkeOb9GzN92V689PhGHqRt5ULS4nO7qxa9qz3QiQ8DunCa9LhUDJFnaox0q1Wj2FYBOJQQsHiQaBWj4WB1q_7msM65_PfXNxuMCc',
    category: '时尚',
    brand: 'Urban Vibes',
    publisher: 'Alex Rivera',
    landingPage: 'https://urban-vibes.com',
    engagement: 92
  },
  {
    id: 'AD-7531-TR',
    title: '午夜美食推广：24小时不打烊的味蕾狂欢',
    description: '本地餐厅周，聚集超过50家精品餐饮店',
    status: AdStatus.REJECTED,
    bid: 450,
    heat: '1.5k',
    date: '2023年10月20日',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL-EhJMNccjRF1btQGECU6OCif69hpuiY39FghWyeKb7tqOjYe8uQDb87_17jktY3TWxzSzmnHIrCXMGtL2_UEXzELINvLiJsfsPdSKcBYfSVxeXWUSebIzJ2Kb4KHhzsNEv-0VGfUy9eoaTDUsaB5vQPhjcrWAqbkEr2P1HqG0DaI_fjYqqWoWdXD8nPruWaesg4IcDsLJ4Y6hgQIX3tEqtieDyAILWHJnFBhYHIgdx1u9ODd_6TMfbTF1yGfYFnFhd4iCqKn9_g',
    category: '餐饮',
    brand: 'Gourmet Night',
    publisher: 'Alex Rivera',
    landingPage: 'https://gourmet-night.com',
    engagement: 45
  }
];

export const CHART_DATA = [
  { name: '10月1日', value: 400 },
  { name: '10月7日', value: 300 },
  { name: '10月14日', value: 600 },
  { name: '10月21日', value: 800 },
  { name: '10月28日', value: 500 },
  { name: '10月30日', value: 700 }
];

export const PIE_DATA = [
  { name: '零售', value: 40, color: '#2563eb' },
  { name: '餐饮', value: 25, color: '#10b981' },
  { name: '娱乐', value: 20, color: '#a855f7' },
  { name: '科技', value: 15, color: '#fb923c' }
];
