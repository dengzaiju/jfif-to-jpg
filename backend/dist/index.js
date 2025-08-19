import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { R2Service } from './utils/r2';
const app = new Hono();
// 中间件
app.use('*', logger());
// 自定义CORS中间件，确保OPTIONS请求正确处理
app.use('*', async (c, next) => {
    const origin = c.req.header('Origin');
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
    if (origin && allowedOrigins.includes(origin)) {
        c.header('Access-Control-Allow-Origin', origin);
    }
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    c.header('Access-Control-Allow-Credentials', 'true');
    c.header('Access-Control-Max-Age', '86400');
    // 处理预检请求
    if (c.req.method === 'OPTIONS') {
        return c.text('', 200);
    }
    await next();
});
// 健康检查
app.get('/', (c) => {
    return c.json({
        status: 'ok',
        message: 'JFIF to JPG Converter API',
        version: '1.0.0',
        environment: c.env.ENVIRONMENT || 'development'
    });
});
// API路由
app.get('/api/health', (c) => {
    return c.json({ status: 'healthy' });
});
// 文件上传API
app.post('/api/upload', async (c) => {
    try {
        const formData = await c.req.formData();
        const file = formData.get('file');
        if (!file) {
            return c.json({ error: 'No file provided' }, 400);
        }
        // 验证文件类型
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/jfif', 'image/png', 'image/bmp', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return c.json({ error: 'Invalid file type' }, 400);
        }
        // 验证文件大小 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            return c.json({ error: 'File too large' }, 400);
        }
        const r2Service = new R2Service(c.env.IMAGES_BUCKET);
        const fileKey = `uploads/${Date.now()}-${file.name}`;
        // 上传文件到R2
        await r2Service.uploadFile(fileKey, await file.arrayBuffer(), file.type);
        return c.json({
            success: true,
            fileKey,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            message: 'File uploaded successfully'
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        return c.json({ error: 'Upload failed' }, 500);
    }
});
// 图片转换API
app.post('/api/convert', async (c) => {
    try {
        const body = await c.req.json();
        const { fileKey, targetFormat, quality, width, height } = body;
        if (!fileKey) {
            return c.json({ error: 'File key is required' }, 400);
        }
        const r2Service = new R2Service(c.env.IMAGES_BUCKET);
        // 下载原文件
        const originalFile = await r2Service.downloadFile(fileKey);
        if (!originalFile) {
            return c.json({ error: 'Original file not found' }, 400);
        }
        // 获取文件信息
        const fileInfo = await r2Service.getFileInfo(fileKey);
        if (!fileInfo) {
            return c.json({ error: 'File info not found' }, 400);
        }
        // 生成转换后的文件key
        const fileName = fileKey.split('/').pop()?.split('.')[0] || 'converted';
        const convertedFileKey = `converted/${Date.now()}-${fileName}.${targetFormat || 'jpg'}`;
        // 这里应该调用Sharp.js进行图片转换
        // 由于Workers环境限制，我们暂时返回模拟的转换结果
        // 实际项目中需要使用Cloudflare Images或外部图片处理服务
        // 模拟转换过程
        const convertedFile = originalFile; // 实际应该是转换后的文件
        // 上传转换后的文件
        const contentType = `image/${targetFormat || 'jpeg'}`;
        await r2Service.uploadFile(convertedFileKey, convertedFile, contentType);
        return c.json({
            success: true,
            originalFileKey: fileKey,
            convertedFileKey,
            targetFormat: targetFormat || 'jpg',
            quality: quality || 80,
            width: width || 'auto',
            height: height || 'auto',
            message: 'Image converted successfully'
        });
    }
    catch (error) {
        console.error('Conversion error:', error);
        return c.json({ error: 'Conversion failed' }, 500);
    }
});
// 批量转换API
app.post('/api/batch', async (c) => {
    try {
        const body = await c.req.json();
        const { files, targetFormat, quality } = body;
        if (!files || !Array.isArray(files) || files.length === 0) {
            return c.json({ error: 'Files array is required' }, 400);
        }
        if (files.length > 20) {
            return c.json({ error: 'Maximum 20 files allowed' }, 400);
        }
        const batchId = `batch-${Date.now()}`;
        const results = [];
        // 处理每个文件
        for (const file of files) {
            try {
                const result = await c.env.IMAGES_BUCKET.get(file.fileKey);
                if (result) {
                    // 模拟转换过程
                    const convertedFileKey = `converted/${Date.now()}-${file.fileName}.${targetFormat || 'jpg'}`;
                    results.push({
                        originalFile: file,
                        convertedFileKey,
                        status: 'success'
                    });
                }
            }
            catch (error) {
                results.push({
                    originalFile: file,
                    status: 'failed',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
        return c.json({
            success: true,
            batchId,
            totalFiles: files.length,
            results,
            message: 'Batch conversion completed'
        });
    }
    catch (error) {
        console.error('Batch conversion error:', error);
        return c.json({ error: 'Batch conversion failed' }, 500);
    }
});
// 转换状态查询API
app.get('/api/status/:id', async (c) => {
    try {
        const id = c.req.param('id');
        // 这里应该查询实际的转换状态
        // 暂时返回模拟状态
        return c.json({
            id,
            status: 'completed',
            progress: 100,
            message: 'Conversion completed'
        });
    }
    catch (error) {
        console.error('Status query error:', error);
        return c.json({ error: 'Status query failed' }, 500);
    }
});
// 文件下载API
app.get('/api/download/:fileKey', async (c) => {
    try {
        const fileKey = c.req.param('fileKey');
        const r2Service = new R2Service(c.env.IMAGES_BUCKET);
        const fileData = await r2Service.downloadFile(fileKey);
        if (!fileData) {
            return c.json({ error: 'File not found' }, 404);
        }
        const fileInfo = await r2Service.getFileInfo(fileKey);
        const contentType = fileInfo?.httpMetadata?.contentType || 'application/octet-stream';
        return new Response(fileData, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${fileKey.split('/').pop()}"`,
            },
        });
    }
    catch (error) {
        console.error('Download error:', error);
        return c.json({ error: 'Download failed' }, 500);
    }
});
// 文件列表API
app.get('/api/files', async (c) => {
    try {
        const r2Service = new R2Service(c.env.IMAGES_BUCKET);
        const files = await r2Service.listFiles('uploads/', 100);
        return c.json({
            success: true,
            files: files.map(file => ({
                key: file.key,
                size: file.size,
                uploaded: file.uploaded,
                type: file.httpMetadata?.contentType || 'unknown'
            }))
        });
    }
    catch (error) {
        console.error('File list error:', error);
        return c.json({ error: 'Failed to list files' }, 500);
    }
});
// 文件删除API
app.delete('/api/file/:fileKey', async (c) => {
    try {
        const fileKey = c.req.param('fileKey');
        const r2Service = new R2Service(c.env.IMAGES_BUCKET);
        await r2Service.deleteFile(fileKey);
        return c.json({
            success: true,
            message: 'File deleted successfully'
        });
    }
    catch (error) {
        console.error('File deletion error:', error);
        return c.json({ error: 'File deletion failed' }, 500);
    }
});
// 错误处理
app.onError((err, c) => {
    console.error('Error:', err);
    return c.json({ error: 'Internal Server Error' }, 500);
});
// 404处理
app.notFound((c) => {
    return c.json({ error: 'Not Found' }, 404);
});
export default app;
//# sourceMappingURL=index.js.map