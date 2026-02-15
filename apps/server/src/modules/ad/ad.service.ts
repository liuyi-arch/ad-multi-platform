/**
 * 广告业务逻辑层
 * 处理广告相关的业务逻辑
 */

import adRepository, { AdQueryParams } from './ad.repository';
import { IAdDocument } from './ad.model';
import { broadcast } from '../../config/websocket';

export class AdService {
    /**
     * 获取广告列表
     */
    async getList(params: AdQueryParams) {
        return adRepository.findMany(params);
    }

    /**
     * 根据 ID 获取广告
     */
    async getById(id: string) {
        const ad = await adRepository.findById(id);
        if (!ad) {
            const error: any = new Error('广告不存在');
            error.status = 404;
            throw error;
        }
        return ad;
    }

    /**
     * 创建广告
     */
    async create(data: Partial<IAdDocument>) {
        // 默认设置状态为 PENDING
        const adData = {
            ...data,
            status: 'PENDING',
            heat: data.heat || 0,
            engagement: data.engagement || 0,
            date: data.date || new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
            createDate: data.createDate || new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        };
        const ad = await adRepository.create(adData);
        broadcast({ type: 'AD_CREATED', payload: JSON.parse(JSON.stringify(ad)) });
        return ad;
    }

    /**
     * 更新广告
     */
    async update(id: string, data: Partial<IAdDocument>) {
        const ad = await adRepository.update(id, data);
        if (!ad) {
            const error: any = new Error('广告不存在');
            error.status = 404;
            throw error;
        }
        broadcast({ type: 'AD_UPDATED', payload: JSON.parse(JSON.stringify(ad)) });
        return ad;
    }

    /**
     * 删除广告
     */
    async delete(id: string) {
        const ad = await adRepository.delete(id);
        if (!ad) {
            const error: any = new Error('广告不存在');
            error.status = 404;
            throw error;
        }
        broadcast({ type: 'AD_DELETED', payload: { id } });
        return ad;
    }
}

export default new AdService();
