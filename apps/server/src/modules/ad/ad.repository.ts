/**
 * 广告数据访问层
 * 使用 Mongoose 操作 MongoDB
 */

import { AdModel, IAdDocument } from './ad.model';

export interface AdQueryParams {
    page?: number;
    pageSize?: number;
    status?: string;
    category?: string;
    keyword?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export class AdRepository {
    /**
     * 查询广告列表（支持分页、筛选、搜索）
     */
    async findMany(params: AdQueryParams = {}): Promise<PaginatedResult<IAdDocument>> {
        const {
            page = 1,
            pageSize = 20,
            status,
            category,
            keyword,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = params;

        // 构建查询条件
        const filter: any = {};
        if (status) filter.status = status;
        if (category) filter.category = category;
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ];
        }

        const skip = (page - 1) * pageSize;
        const sort: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        const [items, total] = await Promise.all([
            AdModel.find(filter).sort(sort).skip(skip).limit(pageSize),
            AdModel.countDocuments(filter),
        ]);

        return {
            items,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    /**
     * 根据 ID 查询广告
     */
    async findById(id: string): Promise<IAdDocument | null> {
        return AdModel.findById(id);
    }

    /**
     * 创建广告
     */
    async create(data: Partial<IAdDocument>): Promise<IAdDocument> {
        return AdModel.create(data);
    }

    /**
     * 更新广告
     */
    async update(id: string, data: Partial<IAdDocument>): Promise<IAdDocument | null> {
        return AdModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    /**
     * 删除广告
     */
    async delete(id: string): Promise<IAdDocument | null> {
        return AdModel.findByIdAndDelete(id);
    }

    /**
     * 统计数量
     */
    async count(filter: any = {}): Promise<number> {
        return AdModel.countDocuments(filter);
    }
}

export default new AdRepository();
