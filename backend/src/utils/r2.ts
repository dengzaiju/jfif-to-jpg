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

export class R2Service {
  private bucket: R2Bucket;

  constructor(bucket: R2Bucket) {
    this.bucket = bucket;
  }

  /**
   * 上传文件到R2存储
   */
  async uploadFile(key: string, file: ArrayBuffer, contentType: string): Promise<void> {
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
  async downloadFile(key: string): Promise<ArrayBuffer | null> {
    const object = await this.bucket.get(key);
    if (!object) return null;
    return await object.arrayBuffer();
  }

  /**
   * 删除R2存储中的文件
   */
  async deleteFile(key: string): Promise<void> {
    await this.bucket.delete(key);
  }

  /**
   * 获取文件信息
   */
  async getFileInfo(key: string): Promise<R2File | null> {
    const object = await this.bucket.head(key);
    if (!object) return null;

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
  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string | null> {
    const object = await this.bucket.head(key);
    if (!object) return null;

    // TODO: 实现真正的预签名URL生成
    // 需要使用 Cloudflare R2 的 API 来生成预签名URL
    return null;
  }

  /**
   * 列出存储桶中的文件
   */
  async listFiles(prefix?: string, limit: number = 100): Promise<R2File[]> {
    const objects = await this.bucket.list({ prefix, limit });
    return objects.objects.map((obj: any) => ({
      key: obj.key,
      size: obj.size,
      uploaded: new Date(obj.uploaded),
      httpMetadata: obj.httpMetadata,
    }));
  }
} 