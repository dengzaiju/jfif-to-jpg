import { R2Bucket } from '@cloudflare/workers-types';
export interface R2File {
    key: string;
    size: number;
    uploaded: Date;
    httpMetadata?: {
        contentType?: string;
        contentEncoding?: string;
    };
}
export declare class R2Service {
    private bucket;
    constructor(bucket: R2Bucket);
    /**
     * 上传文件到R2存储
     */
    uploadFile(key: string, file: ArrayBuffer, contentType: string): Promise<void>;
    /**
     * 从R2存储下载文件
     */
    downloadFile(key: string): Promise<ArrayBuffer | null>;
    /**
     * 删除R2存储中的文件
     */
    deleteFile(key: string): Promise<void>;
    /**
     * 获取文件信息
     */
    getFileInfo(key: string): Promise<R2File | null>;
    /**
     * 生成预签名URL用于直接访问文件
     * 注意：Cloudflare R2的预签名URL需要通过API生成
     * 这里暂时返回null，实际使用时需要通过Cloudflare的API生成
     */
    getSignedUrl(key: string, expiresIn?: number): Promise<string | null>;
    /**
     * 列出存储桶中的文件
     */
    listFiles(prefix?: string, limit?: number): Promise<R2File[]>;
}
//# sourceMappingURL=r2.d.ts.map