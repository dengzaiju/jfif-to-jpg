import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { R2Service } from './utils/r2';

interface Env {
  ENVIRONMENT?: string;
  IMAGES_BUCKET: any; // R2Bucket类型在Cloudflare Workers环境中可用
}

const app = new Hono<{ Bindings: Env }>();

// 中间件
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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
    const file = formData.get('file') as File;
    
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

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Upload failed' }, 500);
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

  } catch (error) {
    console.error('Download error:', error);
    return c.json({ error: 'Download failed' }, 500);
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