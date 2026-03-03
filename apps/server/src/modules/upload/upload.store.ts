/**
 * 上传状态存储
 * 基于内存 Map 维护哈希到 URL 的映射（可替换为 Redis/数据库）
 * 以及分片上传的进度记录
 */

interface ChunkRecord {
    hash: string;
    total: number;
    filename: string;
    type: 'video' | 'image';
    uploadedChunks: Set<number>;
    createdAt: Date;
}

class UploadStore {
    /** hash → url 映射，用于秒传 */
    private readonly hashToUrl = new Map<string, string>();

    /** hash → 分片记录，用于断点续传 */
    private readonly chunkRecords = new Map<string, ChunkRecord>();

    // ──────────── 秒传相关 ────────────

    getUrlByHash(hash: string): string | undefined {
        return this.hashToUrl.get(hash);
    }

    registerHash(hash: string, url: string): void {
        this.hashToUrl.set(hash, url);
    }

    // ──────────── 断点续传相关 ────────────

    initChunkRecord(
        hash: string,
        total: number,
        filename: string,
        type: 'video' | 'image'
    ): ChunkRecord {
        if (!this.chunkRecords.has(hash)) {
            this.chunkRecords.set(hash, {
                hash,
                total,
                filename,
                type,
                uploadedChunks: new Set(),
                createdAt: new Date(),
            });
        }
        return this.chunkRecords.get(hash)!;
    }

    markChunkUploaded(hash: string, index: number): void {
        const record = this.chunkRecords.get(hash);
        if (record) {
            record.uploadedChunks.add(index);
        }
    }

    getUploadedChunks(hash: string): number[] {
        const record = this.chunkRecords.get(hash);
        return record ? Array.from(record.uploadedChunks) : [];
    }

    getChunkRecord(hash: string): ChunkRecord | undefined {
        return this.chunkRecords.get(hash);
    }

    deleteChunkRecord(hash: string): void {
        this.chunkRecords.delete(hash);
    }

    isChunkAllUploaded(hash: string): boolean {
        const record = this.chunkRecords.get(hash);
        if (!record) return false;
        return record.uploadedChunks.size >= record.total;
    }
}

export const uploadStore = new UploadStore();
export default uploadStore;
