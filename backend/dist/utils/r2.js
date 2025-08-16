export class R2Service {
    bucket;
    constructor(bucket) {
        this.bucket = bucket;
    }
    /**
     * 上传文件到R2存储
     */
    async uploadFile(key, file, contentType) {
        await this.bucket.put(key, file, {
            httpMetadata: {
                contentType,
                cacheControl: 'public, max-age=3600',
            },
        });
    }
    /**
     * 从R2存储下载文件
     */
    async downloadFile(key) {
        const object = await this.bucket.get(key);
        if (!object)
            return null;
        return await object.arrayBuffer();
    }
    /**
     * 删除R2存储中的文件
     */
    async deleteFile(key) {
        await this.bucket.delete(key);
    }
    /**
     * 获取文件信息
     */
    async getFileInfo(key) {
        const object = await this.bucket.head(key);
        if (!object)
            return null;
        return {
            key: object.key,
            size: object.size,
            uploaded: new Date(object.uploaded),
            httpMetadata: object.httpMetadata,
        };
    }
    /**
     * 生成预签名URL用于直接访问文件
     * 注意：Cloudflare R2的预签名URL需要通过API生成
     * 这里暂时返回null，实际使用时需要通过Cloudflare的API生成
     */
    async getSignedUrl(key, expiresIn = 3600) {
        const object = await this.bucket.head(key);
        if (!object)
            return null;
        // TODO: 实现真正的预签名URL生成
        // 需要使用 Cloudflare R2 的 API 来生成预签名URL
        return null;
    }
    /**
     * 列出存储桶中的文件
     */
    async listFiles(prefix, limit = 100) {
        const objects = await this.bucket.list({ prefix, limit });
        return objects.objects.map(obj => ({
            key: obj.key,
            size: obj.size,
            uploaded: new Date(obj.uploaded),
            httpMetadata: obj.httpMetadata,
        }));
    }
}
//# sourceMappingURL=r2.js.map